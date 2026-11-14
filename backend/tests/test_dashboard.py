import pytest
from app.core.security import create_access_token


def test_admin_dashboard_kpis_and_analytics(client):
    """Admin dashboard returns live KPIs, attendance trend, and department counts."""
    # 1. Login as Admin
    login_resp = client.post("/api/v1/auth/login", json={
        "email": "admin@apexcorp.io",
        "password": "ApexAdmin@2026"
    })
    token = login_resp.json()["token"]["access_token"]

    # 2. Query Admin Dashboard
    resp = client.get(
        "/api/v1/dashboard/admin",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp.status_code == 200
    data = resp.json()

    # Validate KPIs
    assert "kpis" in data
    kpis = data["kpis"]
    assert kpis["total_employees"] > 0
    assert kpis["present_today"] >= 0
    assert kpis["absent_today"] >= 0
    assert "monthly_payroll_total" in kpis
    assert "present_rate_pct" in kpis

    # Validate Analytics
    assert "analytics" in data
    analytics = data["analytics"]
    assert "attendance_trend" in analytics
    assert isinstance(analytics["attendance_trend"], list)
    assert len(analytics["attendance_trend"]) > 0
    assert "department_distribution" in analytics
    assert len(analytics["department_distribution"]) > 0

    # Validate Tables
    assert "tables" in data
    assert "recent_employees" in data["tables"]
    assert "pending_requests" in data["tables"]
    assert "recent_activity" in data["tables"]


def test_hr_dashboard_access_and_metrics(client):
    """HR user can access HR dashboard with workforce metrics."""
    # 1. Login as HR
    login_resp = client.post("/api/v1/auth/login", json={
        "email": "hr@apexcorp.io",
        "password": "ClaireHR@2026"
    })
    token = login_resp.json()["token"]["access_token"]

    # 2. Query HR Dashboard
    resp = client.get(
        "/api/v1/dashboard/hr",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp.status_code == 200
    data = resp.json()

    assert "kpis" in data
    assert data["kpis"]["total_employees"] > 0
    assert "attendance_overview" in data
    assert "hiring_trends" in data
    assert isinstance(data["hiring_trends"], list)


def test_manager_dashboard_team_isolation(client):
    """Manager dashboard returns team-scoped attendance and approvals."""
    # 1. Login as Manager (Marcus Vance)
    login_resp = client.post("/api/v1/auth/login", json={
        "email": "manager@apexcorp.io",
        "password": "MarcusMgr@2026"
    })
    token = login_resp.json()["token"]["access_token"]

    # 2. Query Manager Dashboard
    resp = client.get(
        "/api/v1/dashboard/manager",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp.status_code == 200
    data = resp.json()

    assert "kpis" in data
    assert data["kpis"]["team_size"] > 0
    assert "team_attendance_table" in data
    assert isinstance(data["team_attendance_table"], list)
    assert len(data["team_attendance_table"]) > 0

    # Check team members in table have required fields
    member = data["team_attendance_table"][0]
    assert "employee_code" in member
    assert "full_name" in member
    assert "status" in member


def test_employee_dashboard_self_service(client):
    """Employee dashboard returns personal attendance, leave balances, and payslips."""
    # 1. Login as Employee (Sarah Jenkins)
    login_resp = client.post("/api/v1/auth/login", json={
        "email": "employee@apexcorp.io",
        "password": "SarahEmp@2026"
    })
    token = login_resp.json()["token"]["access_token"]

    # 2. Query Employee Dashboard
    resp = client.get(
        "/api/v1/dashboard/employee",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp.status_code == 200
    data = resp.json()

    # Welcome
    assert "welcome" in data
    assert "Sarah Jenkins" in data["welcome"]["employee_name"]
    assert "today_formatted" in data["welcome"]

    # Today's attendance
    assert "today_attendance" in data
    assert "status" in data["today_attendance"]

    # Leave balances
    assert "leave_balances" in data
    assert len(data["leave_balances"]) > 0

    # Upcoming holidays
    assert "upcoming_holidays" in data


def test_unauthorized_role_rejected_from_admin_dashboard(client):
    """A standard employee cannot access the Admin Executive Dashboard (403 Forbidden)."""
    # 1. Login as Employee
    login_resp = client.post("/api/v1/auth/login", json={
        "email": "employee@apexcorp.io",
        "password": "SarahEmp@2026"
    })
    token = login_resp.json()["token"]["access_token"]

    # 2. Attempt to query Admin Dashboard
    resp = client.get(
        "/api/v1/dashboard/admin",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp.status_code == 403
    assert "Access restricted to Organization Administrators" in resp.json()["detail"]


def test_manager_action_leave_request(client):
    """Manager can approve or reject a pending leave request from team members."""
    # 1. Login as Manager
    login_resp = client.post("/api/v1/auth/login", json={
        "email": "manager@apexcorp.io",
        "password": "MarcusMgr@2026"
    })
    token = login_resp.json()["token"]["access_token"]

    # 2. Get pending approvals from manager dashboard
    dash_resp = client.get(
        "/api/v1/dashboard/manager",
        headers={"Authorization": f"Bearer {token}"}
    )
    pending_approvals = dash_resp.json()["pending_leave_approvals"]

    if pending_approvals:
        target_req_id = pending_approvals[0]["id"]
        # Approve the request
        act_resp = client.post(
            f"/api/v1/dashboard/leave-approvals/{target_req_id}/action",
            json={"action": "APPROVE", "comments": "Approved via dashboard quick action"},
            headers={"Authorization": f"Bearer {token}"}
        )
        assert act_resp.status_code == 200
        assert act_resp.json()["status"] == "APPROVED"
