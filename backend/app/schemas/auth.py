from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field


class OrganizationRegisterRequest(BaseModel):
    # Step 1: Organization Profile
    org_name: str = Field(..., min_length=2, max_length=255)
    org_type: str = Field("COMPANY", pattern="^(COMPANY|COLLEGE|UNIVERSITY|ENTERPRISE)$")
    domain: Optional[str] = None
    contact_email: EmailStr
    contact_phone: Optional[str] = None
    address: Optional[str] = None
    logo_url: Optional[str] = None

    # Step 2: Administrator Account
    admin_first_name: str = Field(..., min_length=1, max_length=100)
    admin_last_name: str = Field(..., min_length=1, max_length=100)
    admin_email: EmailStr
    admin_password: str = Field(..., min_length=8)

    # Step 3: Organizational Settings & Policies
    timezone: str = Field("UTC")
    currency: str = Field("USD")
    fiscal_year_start: str = Field("01-01")
    work_week_start: str = Field("Monday")
    weekend_days: str = Field("Saturday,Sunday")
    allow_remote_checkin: bool = True


class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str
    remember_me: bool = False


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str = Field(..., min_length=8)


class InviteUserRequest(BaseModel):
    email: EmailStr
    role_slug: str = Field(..., description="Target role: hr, manager, employee")


class AcceptInvitationRequest(BaseModel):
    first_name: str = Field(..., min_length=1)
    last_name: str = Field(..., min_length=1)
    password: str = Field(..., min_length=8)


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int


class RoleBrief(BaseModel):
    id: int
    name: str
    slug: str
    permissions: List[str] = []


class OrganizationBrief(BaseModel):
    id: int
    name: str
    code: str
    slug: str
    org_type: str
    currency: str
    timezone: str


class UserProfileResponse(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str
    phone: Optional[str] = None
    avatar_url: Optional[str] = None
    is_active: bool
    is_verified: bool
    is_superuser: bool
    role: Optional[RoleBrief] = None
    organization: Optional[OrganizationBrief] = None


class AuthSuccessResponse(BaseModel):
    token: TokenResponse
    user: UserProfileResponse
    message: str = "Authenticated successfully"
