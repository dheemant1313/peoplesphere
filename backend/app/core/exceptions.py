from typing import Any, Dict, Optional
from fastapi import HTTPException, status


class PeopleSphereException(HTTPException):
    """Base exception for PeopleSphere application."""
    def __init__(
        self,
        status_code: int,
        detail: str,
        code: str = "ERROR",
        headers: Optional[Dict[str, Any]] = None
    ):
        super().__init__(status_code=status_code, detail=detail, headers=headers)
        self.code = code


class NotFoundException(PeopleSphereException):
    def __init__(self, detail: str = "Resource not found"):
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=detail, code="NOT_FOUND")


class AuthenticationException(PeopleSphereException):
    def __init__(self, detail: str = "Could not validate credentials"):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            code="UNAUTHENTICATED",
            headers={"WWW-Authenticate": "Bearer"}
        )


class PermissionDeniedException(PeopleSphereException):
    def __init__(self, detail: str = "Permission denied for this operation"):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=detail,
            code="PERMISSION_DENIED"
        )


class ConflictException(PeopleSphereException):
    def __init__(self, detail: str = "Resource conflict or duplicate detected"):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail=detail,
            code="CONFLICT"
        )


class BadRequestException(PeopleSphereException):
    def __init__(self, detail: str = "Bad request"):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail,
            code="BAD_REQUEST"
        )
