from sqlalchemy import Boolean, Column, Date, DateTime, ForeignKey, Integer, Numeric, String, Text, UniqueConstraint
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin, TenantMixin, SoftDeleteMixin


class Attendance(Base, TimestampMixin, TenantMixin, SoftDeleteMixin):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False, index=True)
    date = Column(Date, nullable=False, index=True)
    shift_id = Column(Integer, ForeignKey("shifts.id", ondelete="SET NULL"), nullable=True)

    check_in = Column(DateTime, nullable=True)
    check_out = Column(DateTime, nullable=True)
    working_hours = Column(Numeric(5, 2), default=0.00, nullable=False)
    overtime_hours = Column(Numeric(5, 2), default=0.00, nullable=False)

    status = Column(String(30), default="PRESENT", nullable=False, index=True)  # PRESENT, ABSENT, HALF_DAY, LATE, ON_LEAVE, HOLIDAY, WEEKLY_OFF
    is_late = Column(Boolean, default=False, nullable=False)
    late_minutes = Column(Integer, default=0, nullable=False)
    is_early_exit = Column(Boolean, default=False, nullable=False)
    early_exit_minutes = Column(Integer, default=0, nullable=False)

    check_in_ip = Column(String(50), nullable=True)
    check_out_ip = Column(String(50), nullable=True)
    check_in_device = Column(String(255), nullable=True)
    notes = Column(Text, nullable=True)

    employee = relationship("Employee", back_populates="attendance_records")
    shift = relationship("Shift", back_populates="attendance_records")
    corrections = relationship("AttendanceCorrection", back_populates="attendance", cascade="all, delete-orphan")

    __table_args__ = (
        UniqueConstraint("employee_id", "date", name="uq_attendance_employee_date"),
    )


class AttendanceCorrection(Base, TimestampMixin, TenantMixin):
    __tablename__ = "attendance_corrections"

    id = Column(Integer, primary_key=True, autoincrement=True)
    attendance_id = Column(Integer, ForeignKey("attendance.id", ondelete="CASCADE"), nullable=False, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False, index=True)

    requested_check_in = Column(DateTime, nullable=False)
    requested_check_out = Column(DateTime, nullable=True)
    reason = Column(Text, nullable=False)
    status = Column(String(30), default="PENDING", nullable=False, index=True)  # PENDING, APPROVED, REJECTED
    approved_by = Column(Integer, ForeignKey("employees.id", ondelete="SET NULL"), nullable=True)
    approved_at = Column(DateTime, nullable=True)
    remarks = Column(Text, nullable=True)

    attendance = relationship("Attendance", back_populates="corrections")
