from sqlalchemy import Boolean, Column, Date, ForeignKey, Integer, Numeric, String, Text, UniqueConstraint
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin, TenantMixin, SoftDeleteMixin


class SalaryStructure(Base, TimestampMixin, TenantMixin, SoftDeleteMixin):
    __tablename__ = "salary_structures"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    code = Column(String(50), nullable=False)
    description = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)

    components = relationship("SalaryComponent", back_populates="salary_structure", cascade="all, delete-orphan")
    assignments = relationship("EmployeeSalaryAssignment", back_populates="salary_structure")

    __table_args__ = (
        UniqueConstraint("code", "organization_id", name="uq_salary_structure_code_org"),
    )


class SalaryComponent(Base, TimestampMixin, TenantMixin):
    __tablename__ = "salary_components"

    id = Column(Integer, primary_key=True, autoincrement=True)
    salary_structure_id = Column(Integer, ForeignKey("salary_structures.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    code = Column(String(50), nullable=False)  # BASIC, HRA, SPECIAL_ALLOWANCE, PF, TAX, INSURANCE
    component_type = Column(String(20), nullable=False)  # EARNING, DEDUCTION
    calculation_type = Column(String(30), default="FLAT", nullable=False)  # FLAT, PERCENTAGE_OF_BASIC
    percentage_value = Column(Numeric(6, 2), default=0.00, nullable=False)
    default_amount = Column(Numeric(12, 2), default=0.00, nullable=False)
    is_taxable = Column(Boolean, default=True, nullable=False)
    is_statutory = Column(Boolean, default=False, nullable=False)
    display_order = Column(Integer, default=1, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    salary_structure = relationship("SalaryStructure", back_populates="components")


class EmployeeSalaryAssignment(Base, TimestampMixin, TenantMixin, SoftDeleteMixin):
    __tablename__ = "employee_salary_assignments"

    id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), unique=True, nullable=False)
    salary_structure_id = Column(Integer, ForeignKey("salary_structures.id", ondelete="RESTRICT"), nullable=False)
    base_salary = Column(Numeric(12, 2), nullable=False)  # Annual CTC or monthly basic
    effective_from = Column(Date, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    employee = relationship("Employee", back_populates="salary_assignment")
    salary_structure = relationship("SalaryStructure", back_populates="assignments")
