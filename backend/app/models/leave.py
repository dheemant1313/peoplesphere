from sqlalchemy import Boolean, Column, Date, DateTime, ForeignKey, Integer, Numeric, String, Text, UniqueConstraint
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin, TenantMixin, SoftDeleteMixin


class LeaveType(Base, TimestampMixin, TenantMixin, SoftDeleteMixin):
    __tablename__ = "leave_types"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    code = Column(String(50), nullable=False)
    description = Column(String(255), nullable=True)
    is_paid = Column(Boolean, default=True, nullable=False)
    default_days_per_year = Column(Numeric(5, 1), default=12.0, nullable=False)
    carry_forward_limit = Column(Numeric(5, 1), default=0.0, nullable=False)
    requires_approval = Column(Boolean, default=True, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    policies = relationship("LeavePolicy", back_populates="leave_type", cascade="all, delete-orphan")
    balances = relationship("LeaveBalance", back_populates="leave_type", cascade="all, delete-orphan")
    requests = relationship("LeaveRequest", back_populates="leave_type")

    __table_args__ = (
        UniqueConstraint("code", "organization_id", name="uq_leave_type_code_org"),
    )


class LeavePolicy(Base, TimestampMixin, TenantMixin):
    __tablename__ = "leave_policies"

    id = Column(Integer, primary_key=True, autoincrement=True)
    leave_type_id = Column(Integer, ForeignKey("leave_types.id", ondelete="CASCADE"), nullable=False, index=True)
    department_id = Column(Integer, ForeignKey("departments.id", ondelete="CASCADE"), nullable=True, index=True)

    max_consecutive_days = Column(Integer, default=14, nullable=False)
    notice_period_days = Column(Integer, default=2, nullable=False)
    allow_half_day = Column(Boolean, default=True, nullable=False)
    allow_negative_balance = Column(Boolean, default=False, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    leave_type = relationship("LeaveType", back_populates="policies")


class LeaveBalance(Base, TimestampMixin, TenantMixin):
    __tablename__ = "leave_balances"

    id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False, index=True)
    leave_type_id = Column(Integer, ForeignKey("leave_types.id", ondelete="RESTRICT"), nullable=False, index=True)
    year = Column(Integer, nullable=False, index=True)

    allocated_days = Column(Numeric(5, 1), default=0.0, nullable=False)
    used_days = Column(Numeric(5, 1), default=0.0, nullable=False)
    pending_days = Column(Numeric(5, 1), default=0.0, nullable=False)
    carry_forwarded_days = Column(Numeric(5, 1), default=0.0, nullable=False)

    employee = relationship("Employee", back_populates="leave_balances")
    leave_type = relationship("LeaveType", back_populates="balances")

    @property
    def remaining_days(self) -> float:
        return float(self.allocated_days + self.carry_forwarded_days - self.used_days - self.pending_days)

    __table_args__ = (
        UniqueConstraint("employee_id", "leave_type_id", "year", name="uq_employee_leave_year"),
    )


class LeaveRequest(Base, TimestampMixin, TenantMixin, SoftDeleteMixin):
    __tablename__ = "leave_requests"

    id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False, index=True)
    leave_type_id = Column(Integer, ForeignKey("leave_types.id", ondelete="RESTRICT"), nullable=False, index=True)

    start_date = Column(Date, nullable=False, index=True)
    end_date = Column(Date, nullable=False, index=True)
    is_half_day = Column(Boolean, default=False, nullable=False)
    half_day_period = Column(String(20), nullable=True)  # FIRST_HALF, SECOND_HALF
    total_days = Column(Numeric(5, 1), nullable=False)
    reason = Column(Text, nullable=False)

    status = Column(String(30), default="PENDING", nullable=False, index=True)  # PENDING, APPROVED, REJECTED, CANCELLED
    document_url = Column(String(500), nullable=True)

    employee = relationship("Employee", back_populates="leave_requests", foreign_keys=[employee_id])
    leave_type = relationship("LeaveType", back_populates="requests")
    approvals = relationship("LeaveApproval", back_populates="leave_request", cascade="all, delete-orphan")


class LeaveApproval(Base, TimestampMixin, TenantMixin):
    __tablename__ = "leave_approvals"

    id = Column(Integer, primary_key=True, autoincrement=True)
    leave_request_id = Column(Integer, ForeignKey("leave_requests.id", ondelete="CASCADE"), nullable=False, index=True)
    approver_id = Column(Integer, ForeignKey("employees.id", ondelete="RESTRICT"), nullable=False, index=True)
    level = Column(Integer, default=1, nullable=False)
    status = Column(String(30), default="PENDING", nullable=False, index=True)  # PENDING, APPROVED, REJECTED
    comments = Column(Text, nullable=True)
    approved_at = Column(DateTime, nullable=True)

    leave_request = relationship("LeaveRequest", back_populates="approvals")
    approver = relationship("Employee", foreign_keys=[approver_id])
