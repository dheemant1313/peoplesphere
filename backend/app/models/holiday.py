from sqlalchemy import Boolean, Column, Date, ForeignKey, Integer, String, Text, UniqueConstraint
from app.core.database import Base
from app.models.base import TimestampMixin, TenantMixin, SoftDeleteMixin


class Holiday(Base, TimestampMixin, TenantMixin, SoftDeleteMixin):
    __tablename__ = "holidays"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    date = Column(Date, nullable=False, index=True)
    description = Column(Text, nullable=True)
    is_optional = Column(Boolean, default=False, nullable=False)  # Floating holiday
    applies_to_department_id = Column(Integer, ForeignKey("departments.id", ondelete="CASCADE"), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)

    __table_args__ = (
        UniqueConstraint("date", "organization_id", name="uq_holiday_date_org"),
    )
