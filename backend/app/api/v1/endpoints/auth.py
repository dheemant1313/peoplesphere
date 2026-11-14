from typing import Any
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import get_current_user, require_roles
from app.models.user import User
from app.services.auth_service import AuthService
from app.schemas.auth import (
    OrganizationRegisterRequest,
    UserLoginRequest,
    RefreshTokenRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    InviteUserRequest,
    AcceptInvitationRequest,
    AuthSuccessResponse,
    TokenResponse,
    UserProfileResponse,
)

router = APIRouter()


@router.post(
    "/register",
    response_model=AuthSuccessResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register and Provision New Organization Workspace",
    description="Multi-tenant onboarding wizard: provisions Organization, Settings, and creates the Admin account."
)
def register_organization(
    data: OrganizationRegisterRequest,
    db: Session = Depends(get_db)
) -> AuthSuccessResponse:
    service = AuthService(db)
    return service.register_organization(data)


@router.post(
    "/login",
    response_model=AuthSuccessResponse,
    status_code=status.HTTP_200_OK,
    summary="Authenticate User",
    description="Validates credentials against MySQL, returns access and refresh JWT tokens."
)
def login(
    creds: UserLoginRequest,
    db: Session = Depends(get_db)
) -> AuthSuccessResponse:
    service = AuthService(db)
    return service.login(creds)


@router.post(
    "/refresh",
    response_model=TokenResponse,
    status_code=status.HTTP_200_OK,
    summary="Rotate Refresh Token",
    description="Rotates the refresh token (revoking the prior token) and issues fresh access and refresh tokens."
)
def refresh_tokens(
    data: RefreshTokenRequest,
    db: Session = Depends(get_db)
) -> TokenResponse:
    service = AuthService(db)
    return service.refresh_tokens(data.refresh_token)


@router.post(
    "/logout",
    status_code=status.HTTP_200_OK,
    summary="Logout User",
    description="Revokes the active refresh token and terminates the session."
)
def logout(
    data: RefreshTokenRequest,
    db: Session = Depends(get_db)
) -> Any:
    service = AuthService(db)
    service.logout(data.refresh_token)
    return {"message": "Logged out successfully"}


@router.get(
    "/me",
    response_model=UserProfileResponse,
    status_code=status.HTTP_200_OK,
    summary="Get Current Authenticated User",
    description="Returns the profile, role, permissions, and tenant details of the authenticated caller."
)
def get_current_user_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> UserProfileResponse:
    service = AuthService(db)
    return service._build_user_profile(current_user)


@router.post(
    "/forgot-password",
    status_code=status.HTTP_200_OK,
    summary="Request Password Reset Link",
    description="Issues a single-use, 1-hour expiration password reset token."
)
def forgot_password(
    data: ForgotPasswordRequest,
    db: Session = Depends(get_db)
) -> Any:
    service = AuthService(db)
    token = service.create_password_reset(data.email)
    return {
        "message": "If the account exists, a password reset token has been generated",
        "reset_token": token  # Returned directly for ease of API verification and dev environment
    }


@router.post(
    "/reset-password",
    status_code=status.HTTP_200_OK,
    summary="Reset Password with Token",
    description="Consumes a single-use reset token and securely hashes the new password."
)
def reset_password(
    data: ResetPasswordRequest,
    db: Session = Depends(get_db)
) -> Any:
    service = AuthService(db)
    service.reset_password(data.token, data.new_password)
    return {"message": "Password reset successfully. You may now log in with your new password."}


@router.post(
    "/invitations",
    status_code=status.HTTP_201_CREATED,
    summary="Invite New Employee or Faculty",
    description="Authorized Admin and HR users generate a secure invitation link."
)
def create_invitation(
    data: InviteUserRequest,
    current_user: User = Depends(require_roles(["organization-admin", "hr"])),
    db: Session = Depends(get_db)
) -> Any:
    service = AuthService(db)
    invitation = service.create_user_invitation(current_user, data.email, data.role_slug)
    return {
        "message": f"Invitation created for {data.email}",
        "token": invitation.token,
        "expires_at": invitation.expires_at,
    }


@router.get(
    "/invitations/{token}",
    status_code=status.HTTP_200_OK,
    summary="Validate Invitation Token",
    description="Inspects an invitation token before displaying the acceptance form."
)
def validate_invitation(
    token: str,
    db: Session = Depends(get_db)
) -> Any:
    service = AuthService(db)
    inv = service.validate_invitation(token)
    return {
        "valid": True,
        "email": inv.email,
        "organization_id": inv.organization_id,
        "role_name": inv.role.name if inv.role else "Employee",
    }


@router.post(
    "/invitations/{token}/accept",
    response_model=UserProfileResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Accept Employee Invitation",
    description="Single-use acceptance of invitation, creating user account and activating profile."
)
def accept_invitation(
    token: str,
    data: AcceptInvitationRequest,
    db: Session = Depends(get_db)
) -> UserProfileResponse:
    service = AuthService(db)
    return service.accept_invitation(token, data.first_name, data.last_name, data.password)
