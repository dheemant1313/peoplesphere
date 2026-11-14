import secrets
from datetime import datetime, timedelta, timezone
from typing import Optional, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.core.config import settings
from app.core.exceptions import (
    AuthenticationException,
    BadRequestException,
    ConflictException,
    NotFoundException,
    PermissionDeniedException,
)
from app.core.security import (
    create_access_token,
    create_refresh_token,
    get_password_hash,
    verify_password,
    decode_token,
)
from app.models.organization import Organization, OrganizationSetting
from app.models.user import User, Role, Permission
from app.models.auth_tokens import RefreshToken, PasswordResetToken, UserInvitation
from app.schemas.auth import (
    OrganizationRegisterRequest,
    UserLoginRequest,
    UserProfileResponse,
    RoleBrief,
    OrganizationBrief,
    TokenResponse,
    AuthSuccessResponse,
)


class AuthService:
    def __init__(self, db: Session):
        self.db = db

    def register_organization(self, data: OrganizationRegisterRequest) -> AuthSuccessResponse:
        """Provision a new multi-tenant organization, organization settings, and admin account."""
        # Generate slug and unique code
        base_slug = data.org_name.lower().strip()
        slug = "".join(c if c.isalnum() else "-" for c in base_slug).strip("-")
        code = f"{slug.upper()[:10]}-{secrets.token_hex(2).upper()}"

        existing_org = self.db.query(Organization).filter(
            (Organization.slug == slug) | (Organization.contact_email == data.contact_email)
        ).first()
        if existing_org:
            raise ConflictException("An organization with this name or email already exists")

        # 1. Create Organization
        org = Organization(
            name=data.org_name,
            code=code,
            slug=slug,
            org_type=data.org_type,
            domain=data.domain,
            logo_url=data.logo_url,
            address=data.address,
            contact_email=data.contact_email,
            contact_phone=data.contact_phone,
            is_active=True,
        )
        self.db.add(org)
        self.db.flush()

        # 2. Create Organization Settings
        org_settings = OrganizationSetting(
            organization_id=org.id,
            timezone=data.timezone,
            currency=data.currency,
            fiscal_year_start=data.fiscal_year_start,
            work_week_start=data.work_week_start,
            weekend_days=data.weekend_days,
            allow_remote_checkin=data.allow_remote_checkin,
        )
        self.db.add(org_settings)
        self.db.flush()

        # 3. Fetch or ensure Organization Admin role
        admin_role = self.db.query(Role).filter(Role.slug == "organization-admin").first()
        if not admin_role:
            admin_role = Role(
                name="ORGANIZATION_ADMIN",
                slug="organization-admin",
                description="Organization Administrator",
                is_system_role=True,
            )
            self.db.add(admin_role)
            self.db.flush()

        # 4. Create Administrator User
        admin_user = User(
            organization_id=org.id,
            email=data.admin_email,
            hashed_password=get_password_hash(data.admin_password),
            first_name=data.admin_first_name,
            last_name=data.admin_last_name,
            role_id=admin_role.id,
            is_active=True,
            is_verified=True,
        )
        self.db.add(admin_user)
        self.db.flush()

        # 5. Generate and store JWT Tokens
        access_token = create_access_token(
            subject=admin_user.id,
            organization_id=org.id,
            role="organization-admin"
        )
        refresh_token_str = create_refresh_token(subject=admin_user.id)
        
        # Store refresh token record in MySQL
        refresh_record = RefreshToken(
            user_id=admin_user.id,
            token=refresh_token_str,
            expires_at=datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
            is_revoked=False,
        )
        self.db.add(refresh_record)
        self.db.commit()

        user_profile = self._build_user_profile(admin_user)
        return AuthSuccessResponse(
            token=TokenResponse(
                access_token=access_token,
                refresh_token=refresh_token_str,
                expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            ),
            user=user_profile,
            message="Organization registered and provisioned successfully"
        )

    def login(self, creds: UserLoginRequest) -> AuthSuccessResponse:
        """Authenticate user against MySQL database, verify password hash, and return tokens."""
        user = self.db.query(User).filter(
            User.email == creds.email,
            User.is_deleted == False
        ).first()

        if not user or not verify_password(creds.password, user.hashed_password):
            raise AuthenticationException("Invalid email or password")

        if not user.is_active:
            raise PermissionDeniedException("User account is inactive or disabled")

        if not user.organization or not user.organization.is_active:
            raise PermissionDeniedException("Organization workspace is deactivated")

        role_slug = user.role.slug if user.role else "employee"

        # Generate tokens
        access_token = create_access_token(
            subject=user.id,
            organization_id=user.organization_id,
            role=role_slug
        )
        refresh_token_str = create_refresh_token(subject=user.id)

        # Store refresh token
        refresh_record = RefreshToken(
            user_id=user.id,
            token=refresh_token_str,
            expires_at=datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
            is_revoked=False,
        )
        self.db.add(refresh_record)
        user.last_login_at = datetime.now(timezone.utc)
        self.db.commit()

        user_profile = self._build_user_profile(user)
        return AuthSuccessResponse(
            token=TokenResponse(
                access_token=access_token,
                refresh_token=refresh_token_str,
                expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            ),
            user=user_profile,
            message="Logged in successfully"
        )

    def refresh_tokens(self, refresh_token_str: str) -> TokenResponse:
        """Rotate refresh token: revoke current token and issue fresh access + refresh tokens."""
        # Check DB record
        record = self.db.query(RefreshToken).filter(
            RefreshToken.token == refresh_token_str
        ).first()

        if not record or record.is_revoked:
            raise AuthenticationException("Refresh token is invalid or has been revoked")

        if record.expires_at < datetime.now(timezone.utc).replace(tzinfo=None):
            raise AuthenticationException("Refresh token has expired")

        user = self.db.query(User).filter(User.id == record.user_id, User.is_deleted == False).first()
        if not user or not user.is_active:
            raise AuthenticationException("User account is no longer valid")

        # Revoke old refresh token (Rotation)
        record.is_revoked = True

        # Issue new tokens
        role_slug = user.role.slug if user.role else "employee"
        new_access = create_access_token(
            subject=user.id,
            organization_id=user.organization_id,
            role=role_slug
        )
        new_refresh_str = create_refresh_token(subject=user.id)

        new_record = RefreshToken(
            user_id=user.id,
            token=new_refresh_str,
            expires_at=datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
            is_revoked=False,
        )
        self.db.add(new_record)
        self.db.commit()

        return TokenResponse(
            access_token=new_access,
            refresh_token=new_refresh_str,
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        )

    def logout(self, refresh_token_str: Optional[str]) -> bool:
        """Revoke refresh token on logout."""
        if refresh_token_str:
            record = self.db.query(RefreshToken).filter(
                RefreshToken.token == refresh_token_str
            ).first()
            if record:
                record.is_revoked = True
                self.db.commit()
        return True

    def create_password_reset(self, email: str) -> str:
        """Generate a single-use password reset token with 1-hour expiration."""
        user = self.db.query(User).filter(User.email == email, User.is_deleted == False).first()
        if not user:
            # Return dummy token for security timing prevention
            return secrets.token_urlsafe(32)

        token = secrets.token_urlsafe(32)
        reset_obj = PasswordResetToken(
            user_id=user.id,
            token=token,
            expires_at=datetime.now(timezone.utc) + timedelta(hours=1),
            is_used=False,
        )
        self.db.add(reset_obj)
        self.db.commit()
        return token

    def reset_password(self, token: str, new_password: str) -> bool:
        """Validate single-use reset token and update user password."""
        reset_obj = self.db.query(PasswordResetToken).filter(
            PasswordResetToken.token == token
        ).first()

        if not reset_obj or reset_obj.is_used:
            raise BadRequestException("Password reset link is invalid or has already been used")

        if reset_obj.expires_at < datetime.now(timezone.utc).replace(tzinfo=None):
            raise BadRequestException("Password reset link has expired")

        user = self.db.query(User).filter(User.id == reset_obj.user_id).first()
        if not user:
            raise NotFoundException("User not found")

        user.hashed_password = get_password_hash(new_password)
        reset_obj.is_used = True
        self.db.commit()
        return True

    def create_user_invitation(self, inviter: User, email: str, role_slug: str) -> UserInvitation:
        """Create single-use employee invitation. Prevents public self-assignment or role escalation."""
        # Ensure target role exists
        target_role = self.db.query(Role).filter(Role.slug == role_slug).first()
        if not target_role:
            raise BadRequestException(f"Role '{role_slug}' does not exist")

        # Check existing user
        existing_user = self.db.query(User).filter(
            User.email == email,
            User.organization_id == inviter.organization_id
        ).first()
        if existing_user:
            raise ConflictException("A user with this email already exists in this organization")

        token = secrets.token_urlsafe(32)
        invitation = UserInvitation(
            organization_id=inviter.organization_id,
            email=email,
            role_id=target_role.id,
            token=token,
            expires_at=datetime.now(timezone.utc) + timedelta(days=7),
            is_accepted=False,
            invited_by_id=inviter.id,
        )
        self.db.add(invitation)
        self.db.commit()
        self.db.refresh(invitation)
        return invitation

    def validate_invitation(self, token: str) -> UserInvitation:
        """Validate token and return invitation record."""
        inv = self.db.query(UserInvitation).filter(UserInvitation.token == token).first()
        if not inv or inv.is_accepted:
            raise BadRequestException("Invitation is invalid or has already been accepted")
        if inv.expires_at < datetime.now(timezone.utc).replace(tzinfo=None):
            raise BadRequestException("Invitation has expired")
        return inv

    def accept_invitation(self, token: str, first_name: str, last_name: str, password: str) -> UserProfileResponse:
        """Accept employee invitation and provision user account."""
        inv = self.validate_invitation(token)

        user = User(
            organization_id=inv.organization_id,
            email=inv.email,
            hashed_password=get_password_hash(password),
            first_name=first_name,
            last_name=last_name,
            role_id=inv.role_id,
            is_active=True,
            is_verified=True,
        )
        self.db.add(user)
        inv.is_accepted = True
        self.db.commit()
        self.db.refresh(user)

        return self._build_user_profile(user)

    def _build_user_profile(self, user: User) -> UserProfileResponse:
        role_brief = None
        if user.role:
            perms = [p.code for p in user.role.permissions] if hasattr(user.role, "permissions") else []
            role_brief = RoleBrief(
                id=user.role.id,
                name=user.role.name,
                slug=user.role.slug,
                permissions=perms
            )

        org_brief = None
        if user.organization:
            settings_obj = user.organization.settings
            org_brief = OrganizationBrief(
                id=user.organization.id,
                name=user.organization.name,
                code=user.organization.code,
                slug=user.organization.slug,
                org_type=user.organization.org_type,
                currency=settings_obj.currency if settings_obj else "USD",
                timezone=settings_obj.timezone if settings_obj else "UTC",
            )

        return UserProfileResponse(
            id=user.id,
            email=user.email,
            first_name=user.first_name,
            last_name=user.last_name,
            phone=user.phone,
            avatar_url=user.avatar_url,
            is_active=user.is_active,
            is_verified=user.is_verified,
            is_superuser=user.is_superuser,
            role=role_brief,
            organization=org_brief,
        )
