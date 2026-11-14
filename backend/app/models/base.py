from datetime import datetime
from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, func
from sqlalchemy.orm import declared_attr
from app.core.database import Base


class TimestampMixin:
    """Adds created_at and updated_at timestamps to models."""
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)


class TenantMixin:
    """Enforces organization_id for multi-tenant isolation."""
    @declared_attr
    def organization_id(cls):
        return Column(
            Integer,
            ForeignKey("organizations.id", ondelete="CASCADE"),
            nullable=False,
            index=True
        )


class SoftDeleteMixin:
    """Supports soft deletion for regulatory audit retention."""
    is_deleted = Column(Boolean, default=False, nullable=False, index=True)
    deleted_at = Column(DateTime, nullable=True)
