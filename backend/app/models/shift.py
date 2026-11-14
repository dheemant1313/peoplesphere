from sqlalchemy import Boolean, Column, Date, ForeignKey, Integer, String, Time, UniqueConstraint
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin, TenantMixin, SoftDeleteMixin


class Shift(Base, TimestampMixin, TenantMixin, SoftDeleteMixin):
    __tablename__ = "shifts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    code = Column(String(50), nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
    grace_period_minutes = Column(Integer, default=15, nullable=False)
    half_day_hours = Column(Integer, default=4, nullable=False)
    full_day_hours = Column(Integer, default=8, nullable=False)
    is_night_shift = Column(Boolean, default=False, nullable=False)
    is_default = Column(Boolean, default=False, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    assignments = relationship("EmployeeShiftAssignment", back_populates="shift", cascade="all, delete-orphan")
    attendance_records = relationship("Attendance", back_populates="shift")

    __table_args__ = (
        UniqueConstraint("code", "organization_id", name="uq_shift_code_org"),
    )


class EmployeeShiftAssignment(Base, TimestampMixin, TenantMixin):
    __tablename__ = "employee_shift_assignments"

    id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False, index=True)
    shift_id = Column(Integer, ForeignKey("shifts.id", ondelete="RESTRICT"), nullable=False, index=True)
    effective_from = Column(Date, nullable=False)
    effective_to = Column(Date, nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)

    employee = relationship("Employee", back_populates="shift_assignments")
    shift = relationship("Shift", back_populates="assignments")
