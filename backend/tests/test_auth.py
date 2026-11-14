import uuid
import pytest
from app.core.database import SessionLocal
from app.models.user import User
from app.core.security import get_password_hash


@pytest.fixture()
def ensure_clean_admin_credentials():
    """Ensure admin@apexcorp.io has password ApexAdmin@2026 after password reset tests."""
    yield
    db = SessionLocal()
    try:
        admin = db.query(User).filter(User.email == "admin@apexcorp.io").first()
        if admin:
            admin.hashed_password = get_password_hash("ApexAdmin@2026")
            db.commit()
    finally:
        db.close()


def test_login_invalid_credentials(client):
    """Attempting login with invalid password must return 401 Unauthorized."""
    response = client.post("/api/v1/auth/login", json={
        "email": "admin@apexcorp.io",
        "password": "WrongPassword123"
    })
    assert response.status_code == 401
    assert "Invalid email or password" in response.json()["message"]


def test_login_valid_credentials_and_token_generation(client):
    """Valid login generates authentic JWT access and refresh tokens."""
    response = client.post("/api/v1/auth/login", json={
        "email": "admin@apexcorp.io",
        "password": "ApexAdmin@2026"
    })
    assert response.status_code == 200
    data = response.json()
    assert "token" in data
    assert data["token"]["access_token"] is not None
    assert data["token"]["refresh_token"] is not None
    assert data["user"]["email"] == "admin@apexcorp.io"
    assert data["user"]["role"]["slug"] == "organization-admin"


def test_get_current_user_me(client):
    """GET /me returns the authentic authenticated profile."""
    # 1. Login to get token
    login_resp = client.post("/api/v1/auth/login", json={
        "email": "admin@apexcorp.io",
        "password": "ApexAdmin@2026"
    })
    token = login_resp.json()["token"]["access_token"]

    # 2. Query /me
    response = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    profile = response.json()
    assert profile["email"] == "admin@apexcorp.io"
    assert profile["organization"]["name"] == "Apex Corporate Technologies"


def test_refresh_token_rotation_and_revocation(client):
    """Rotating a refresh token revokes the old token and issues fresh tokens."""
    # 1. Login
    login_resp = client.post("/api/v1/auth/login", json={
        "email": "admin@apexcorp.io",
        "password": "ApexAdmin@2026"
    })
    old_refresh = login_resp.json()["token"]["refresh_token"]

    # 2. Rotate
    rotate_resp = client.post("/api/v1/auth/refresh", json={"refresh_token": old_refresh})
    assert rotate_resp.status_code == 200
    new_tokens = rotate_resp.json()
    assert new_tokens["access_token"] is not None
    assert new_tokens["refresh_token"] != old_refresh

    # 3. SECURITY TEST: Attempting to reuse the old refresh token MUST be rejected
    reuse_resp = client.post("/api/v1/auth/refresh", json={"refresh_token": old_refresh})
    assert reuse_resp.status_code == 401
    assert "revoked" in reuse_resp.json()["message"].lower()


def test_password_reset_and_reuse_prevention(client, ensure_clean_admin_credentials):
    """Password reset token functions once and cannot be reused."""
    # 1. Request reset token
    req_resp = client.post("/api/v1/auth/forgot-password", json={"email": "admin@apexcorp.io"})
    assert req_resp.status_code == 200
    reset_token = req_resp.json()["reset_token"]

    # 2. Reset password
    reset_resp = client.post("/api/v1/auth/reset-password", json={
        "token": reset_token,
        "new_password": "NewApexAdmin@2026"
    })
    assert reset_resp.status_code == 200

    # 3. REUSE TEST: Attempt to reuse same token
    reuse_resp = client.post("/api/v1/auth/reset-password", json={
        "token": reset_token,
        "new_password": "AnotherPassword@2026"
    })
    assert reuse_resp.status_code == 400
    assert "already been used" in reuse_resp.json()["message"].lower()

    # Re-login with new password to verify update worked
    check_login = client.post("/api/v1/auth/login", json={
        "email": "admin@apexcorp.io",
        "password": "NewApexAdmin@2026"
    })
    assert check_login.status_code == 200


def test_employee_invitation_flow_and_single_use(client):
    """Admin creates employee invitation; employee accepts; token cannot be reused."""
    # 1. Login as Admin
    login_resp = client.post("/api/v1/auth/login", json={
        "email": "admin@apexcorp.io",
        "password": "ApexAdmin@2026"
    })
    admin_token = login_resp.json()["token"]["access_token"]

    # 2. Invite a new team member with unique email
    unique_suffix = uuid.uuid4().hex[:6]
    invite_email = f"newhire_{unique_suffix}@apexcorp.io"
    invite_resp = client.post(
        "/api/v1/auth/invitations",
        json={"email": invite_email, "role_slug": "employee"},
        headers={"Authorization": f"Bearer {admin_token}"}
    )
    assert invite_resp.status_code == 201
    inv_token = invite_resp.json()["token"]

    # 3. Validate invitation
    val_resp = client.get(f"/api/v1/auth/invitations/{inv_token}")
    assert val_resp.status_code == 200
    assert val_resp.json()["valid"] is True
    assert val_resp.json()["email"] == invite_email

    # 4. Accept invitation
    accept_resp = client.post(f"/api/v1/auth/invitations/{inv_token}/accept", json={
        "first_name": "Marcus",
        "last_name": "Vance",
        "password": "SecurePassword@123"
    })
    assert accept_resp.status_code == 201
    assert accept_resp.json()["email"] == invite_email

    # 5. REUSE TEST: Attempt to accept invitation again
    reuse_inv = client.post(f"/api/v1/auth/invitations/{inv_token}/accept", json={
        "first_name": "Marcus",
        "last_name": "Vance",
        "password": "SecurePassword@123"
    })
    assert reuse_inv.status_code == 400
    assert "already been accepted" in reuse_inv.json()["message"].lower()

    # 6. Verify newly created user can log in
    new_user_login = client.post("/api/v1/auth/login", json={
        "email": invite_email,
        "password": "SecurePassword@123"
    })
    assert new_user_login.status_code == 200


def test_cross_role_access_rejection(client):
    """An employee user cannot create invitations (requires Admin or HR)."""
    # 1. Login as Admin to create an employee
    login_resp = client.post("/api/v1/auth/login", json={
        "email": "admin@apexcorp.io",
        "password": "ApexAdmin@2026"
    })
    admin_token = login_resp.json()["token"]["access_token"]

    unique_suffix = uuid.uuid4().hex[:6]
    emp_email = f"emp_guard_{unique_suffix}@apexcorp.io"
    invite_resp = client.post(
        "/api/v1/auth/invitations",
        json={"email": emp_email, "role_slug": "employee"},
        headers={"Authorization": f"Bearer {admin_token}"}
    )
    inv_token = invite_resp.json()["token"]

    client.post(f"/api/v1/auth/invitations/{inv_token}/accept", json={
        "first_name": "Employee",
        "last_name": "Guard",
        "password": "SecureEmpPassword@123"
    })

    # 2. Login as the newly created Employee
    emp_login = client.post("/api/v1/auth/login", json={
        "email": emp_email,
        "password": "SecureEmpPassword@123"
    })
    employee_token = emp_login.json()["token"]["access_token"]

    # 3. Attempt unauthorized invitation creation
    resp = client.post(
        "/api/v1/auth/invitations",
        json={"email": "attacker@apexcorp.io", "role_slug": "organization-admin"},
        headers={"Authorization": f"Bearer {employee_token}"}
    )
    assert resp.status_code == 403
    assert "not authorized" in resp.json()["message"].lower()
