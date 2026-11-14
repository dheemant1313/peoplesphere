from sqlalchemy import Boolean, Column, Date, DateTime, ForeignKey, Integer, Numeric, String, Text, UniqueConstraint
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin, TenantMixin, SoftDeleteMixin


class PayrollPeriod(Base, TimestampMixin, TenantMixin, SoftDeleteMixin):
    __tablename__ = "payroll_periods"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)  # e.g., "April 2026"
    start_date = Column(Date, nullable=False, index=True)
    end_date = Column(Date, nullable=False, index=True)
    total_days = Column(Integer, nullable=False)
    working_days = Column(Integer, nullable=False)
    status = Column(String(30), default="DRAFT", nullable=False, index=True)  # DRAFT, PROCESSING, APPROVED, FINALIZED, PAID

    processed_by = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    approved_by = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    processed_at = Column(DateTime, nullable=True)

    records = relationship("PayrollRecord", back_populates="period", cascade="all, delete-orphan")

    __table_args__ = (
        UniqueConstraint("name", "organization_id", name="uq_payroll_period_org"),
    )


class PayrollRecord(Base, TimestampMixin, TenantMixin, SoftDeleteMixin):
    __tablename__ = "payroll_records"

    id = Column(Integer, primary_key=True, autoincrement=True)
    payroll_period_id = Column(Integer, ForeignKey("payroll_periods.id", ondelete="CASCADE"), nullable=False, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="RESTRICT"), nullable=False, index=True)

    # Attendance summary for payroll calculation
    days_present = Column(Numeric(5, 1), default=0.0, nullable=False)
    days_absent = Column(Numeric(5, 1), default=0.0, nullable=False)
    paid_leave_days = Column(Numeric(5, 1), default=0.0, nullable=False)
    unpaid_leave_days = Column(Numeric(5, 1), default=0.0, nullable=False)
    payable_days = Column(Numeric(5, 1), default=0.0, nullable=False)

    # Immutable financial snapshot
    base_salary = Column(Numeric(12, 2), nullable=False)
    gross_pay = Column(Numeric(12, 2), nullable=False)
    total_deductions = Column(Numeric(12, 2), nullable=False)
    net_pay = Column(Numeric(12, 2), nullable=False)

    status = Column(String(30), default="DRAFT", nullable=False, index=True)  # DRAFT, APPROVED, FINALIZED, PAID
    payment_date = Column(Date, nullable=True)
    payment_method = Column(String(50), default="BANK_TRANSFER", nullable=False)
    transaction_ref = Column(String(100), nullable=True)
    is_locked = Column(Boolean, default=False, nullable=False)  # Immutable snapshot lock

    period = relationship("PayrollPeriod", back_populates="records")
    employee = relationship("Employee", back_populates="payroll_records")
    items = relationship("PayrollItem", back_populates="record", cascade="all, delete-orphan")
    payslip = relationship("Payslip", back_populates="record", uselist=False, cascade="all, delete-orphan")

    __table_args__ = (
        UniqueConstraint("payroll_period_id", "employee_id", name="uq_payroll_period_employee"),
    )


class PayrollItem(Base, TimestampMixin, TenantMixin):
    __tablename__ = "payroll_items"

    id = Column(Integer, primary_key=True, autoincrement=True)
    payroll_record_id = Column(Integer, ForeignKey("payroll_records.id", ondelete="CASCADE"), nullable=False, index=True)

    component_name = Column(String(100), nullable=False)
    component_code = Column(String(50), nullable=False)
    item_type = Column(String(20), nullable=False)  # EARNING, DEDUCTION
    amount = Column(Numeric(12, 2), nullable=False)
    calculation_basis = Column(String(255), nullable=True)

    record = relationship("PayrollRecord", back_populates="items")


class Payslip(Base, TimestampMixin, TenantMixin):
    __tablename__ = "payslips"

    id = Column(Integer, primary_key=True, autoincrement=True)
    payroll_record_id = Column(Integer, ForeignKey("payroll_records.id", ondelete="CASCADE"), unique=True, nullable=False)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False, index=True)

    payslip_number = Column(String(100), unique=True, nullable=False, index=True)
    file_url = Column(String(500), nullable=True)
    generated_at = Column(DateTime, nullable=False)
    download_count = Column(Integer, default=0, nullable=False)
    is_published = Column(Boolean, default=False, nullable=False)

    record = relationship("PayrollRecord", back_populates="payslip")
    employee = relationship("Employee")
