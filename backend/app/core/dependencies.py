from typing import Generator, List, Optional
from fastapi import Depends, Header, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import jwt
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.database import get_db
from app.core.exceptions import AuthenticationException, PermissionDeniedException, NotFoundException
from app.core.security import decode_token
from app.models.user import User
from app.models.organization import Organization

security_scheme = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_scheme),
    db: Session = Depends(get_db)
) -> User:
    """Validate Bearer JWT and return the authenticated user."""
    if not credentials or not credentials.credentials:
        raise AuthenticationException("Authorization header with Bearer token is required")

    token = credentials.credentials
    try:
        payload = decode_token(token)
    except jwt.ExpiredSignatureError:
        raise AuthenticationException("Access token has expired")
    except (jwt.InvalidTokenError, Exception):
        raise AuthenticationException("Invalid authentication token")

    user_id = payload.get("sub")
    if not user_id:
        raise AuthenticationException("Token payload missing user identity")

    user = db.query(User).filter(User.id == int(user_id), User.is_deleted == False).first()
    if not user:
        raise NotFoundException("User associated with token not found")

    if not user.is_active:
        raise PermissionDeniedException("User account is inactive or disabled")

    return user


def get_current_tenant_organization(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Organization:
    """Enforce server-side tenant isolation derived directly from authenticated user identity."""
    org = db.query(Organization).filter(
        Organization.id == current_user.organization_id,
        Organization.is_deleted == False
    ).first()
    
    if not org:
        raise NotFoundException("Organization associated with user not found")
    if not org.is_active:
        raise PermissionDeniedException("Organization workspace is deactivated")

    return org


def require_roles(allowed_roles: List[str]):
    """Role-based authorization dependency factory."""
    def role_checker(current_user: User = Depends(get_current_user)) -> User:
        user_role_slug = current_user.role.slug if current_user.role else "EMPLOYEE"
        if user_role_slug not in allowed_roles and not current_user.is_superuser:
            raise PermissionDeniedException(
                f"Role '{user_role_slug}' is not authorized to access this resource"
            )
        return current_user

    return role_checker
