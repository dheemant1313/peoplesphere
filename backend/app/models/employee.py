from datetime import date
from sqlalchemy import Boolean, Column, Date, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin, TenantMixin, SoftDeleteMixin


class Department(Base, TimestampMixin, TenantMixin, SoftDeleteMixin):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False, index=True)
    code = Column(String(50), nullable=False)
    description = Column(String(255), nullable=True)
    parent_id = Column(Integer, ForeignKey("departments.id", ondelete="SET NULL"), nullable=True)
    manager_id = Column(Integer, ForeignKey("employees.id", ondelete="SET NULL"), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)

    # Relationships
    organization = relationship("Organization", back_populates="departments")
    employees = relationship("Employee", back_populates="department", foreign_keys="Employee.department_id")
    designations = relationship("Designation", back_populates="department")

    __table_args__ = (
        UniqueConstraint("code", "organization_id", name="uq_department_code_org"),
    )


class Designation(Base, TimestampMixin, TenantMixin, SoftDeleteMixin):
    __tablename__ = "designations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False, index=True)
    code = Column(String(50), nullable=False)
    description = Column(String(255), nullable=True)
    level = Column(String(50), nullable=True)  # Grade or seniority level
    department_id = Column(Integer, ForeignKey("departments.id", ondelete="SET NULL"), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)

    # Relationships
    organization = relationship("Organization", back_populates="designations")
    department = relationship("Department", back_populates="designations")
    employees = relationship("Employee", back_populates="designation")

    __table_args__ = (
        UniqueConstraint("code", "organization_id", name="uq_designation_code_org"),
    )


class Employee(Base, TimestampMixin, TenantMixin, SoftDeleteMixin):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), unique=True, nullable=True)
    employee_code = Column(String(50), nullable=False, index=True)

    # Personal info
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    work_email = Column(String(255), nullable=False, index=True)
    personal_email = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=True)
    gender = Column(String(20), nullable=True)
    date_of_birth = Column(Date, nullable=True)
    
    # Employment details
    date_of_joining = Column(Date, nullable=False)
    date_of_exit = Column(Date, nullable=True)
    employment_type = Column(String(50), default="FULL_TIME", nullable=False)  # FULL_TIME, PART_TIME, CONTRACT, FACULTY, ADJUNCT, INTERN
    status = Column(String(50), default="ACTIVE", nullable=False, index=True)  # ACTIVE, PROBATION, ON_LEAVE, NOTICE_PERIOD, TERMINATED, RESIGNED

    # Organizational mapping
    department_id = Column(Integer, ForeignKey("departments.id", ondelete="RESTRICT"), nullable=True, index=True)
    designation_id = Column(Integer, ForeignKey("designations.id", ondelete="RESTRICT"), nullable=True, index=True)
    manager_id = Column(Integer, ForeignKey("employees.id", ondelete="SET NULL"), nullable=True, index=True)

    # Financial / Payroll details
    bank_name = Column(String(100), nullable=True)
    bank_account_no = Column(String(50), nullable=True)
    bank_ifsc_or_routing = Column(String(50), nullable=True)
    tax_id_or_pan = Column(String(50), nullable=True)

    # Emergency & Address
    emergency_contact_name = Column(String(100), nullable=True)
    emergency_contact_phone = Column(String(50), nullable=True)
    address = Column(Text, nullable=True)

    # Relationships
    organization = relationship("Organization", back_populates="employees")
    user = relationship("User", back_populates="employee")
    department = relationship("Department", back_populates="employees", foreign_keys=[department_id])
    designation = relationship("Designation", back_populates="employees")
    manager = relationship("Employee", remote_side=[id], backref="direct_reports")

    documents = relationship("EmployeeDocument", back_populates="employee", cascade="all, delete-orphan")
    shift_assignments = relationship("EmployeeShiftAssignment", back_populates="employee", cascade="all, delete-orphan")
    attendance_records = relationship("Attendance", back_populates="employee", cascade="all, delete-orphan")
    leave_balances = relationship("LeaveBalance", back_populates="employee", cascade="all, delete-orphan")
    leave_requests = relationship("LeaveRequest", back_populates="employee", foreign_keys="LeaveRequest.employee_id", cascade="all, delete-orphan")
    salary_assignment = relationship("EmployeeSalaryAssignment", back_populates="employee", uselist=False, cascade="all, delete-orphan")
    payroll_records = relationship("PayrollRecord", back_populates="employee", cascade="all, delete-orphan")

    __table_args__ = (
        UniqueConstraint("employee_code", "organization_id", name="uq_employee_code_org"),
        UniqueConstraint("work_email", "organization_id", name="uq_employee_work_email_org"),
    )


class EmployeeDocument(Base, TimestampMixin, TenantMixin, SoftDeleteMixin):
    __tablename__ = "employee_documents"

    id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False, index=True)
    document_type = Column(String(50), nullable=False)  # RESUME, ID_PROOF, OFFER_LETTER, DEGREE, CONTRACT
    title = Column(String(255), nullable=False)
    file_url = Column(String(500), nullable=False)
    file_size_bytes = Column(Integer, nullable=True)
    mime_type = Column(String(100), nullable=True)
    verification_status = Column(String(30), default="PENDING", nullable=False)  # PENDING, VERIFIED, REJECTED

    employee = relationship("Employee", back_populates="documents")
