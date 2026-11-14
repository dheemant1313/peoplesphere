from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin, SoftDeleteMixin


class Organization(Base, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(255), nullable=False, index=True)
    code = Column(String(50), unique=True, nullable=False, index=True)
    slug = Column(String(100), unique=True, nullable=False, index=True)
    org_type = Column(String(50), default="COMPANY", nullable=False)  # COMPANY, COLLEGE, UNIVERSITY, ENTERPRISE
    domain = Column(String(255), nullable=True)
    logo_url = Column(String(500), nullable=True)
    address = Column(Text, nullable=True)
    contact_email = Column(String(255), nullable=False)
    contact_phone = Column(String(50), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)

    # Relationships
    settings = relationship("OrganizationSetting", back_populates="organization", uselist=False, cascade="all, delete-orphan")
    users = relationship("User", back_populates="organization", cascade="all, delete-orphan")
    departments = relationship("Department", back_populates="organization", cascade="all, delete-orphan")
    designations = relationship("Designation", back_populates="organization", cascade="all, delete-orphan")
    employees = relationship("Employee", back_populates="organization", cascade="all, delete-orphan")


class OrganizationSetting(Base, TimestampMixin):
    __tablename__ = "organization_settings"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    organization_id = Column(Integer, ForeignKey("organizations.id", ondelete="CASCADE"), unique=True, nullable=False)
    
    fiscal_year_start = Column(String(10), default="04-01", nullable=False)  # MM-DD
    work_week_start = Column(String(20), default="Monday", nullable=False)
    weekend_days = Column(String(100), default="Saturday,Sunday", nullable=False)
    currency = Column(String(10), default="USD", nullable=False)
    timezone = Column(String(50), default="UTC", nullable=False)
    date_format = Column(String(20), default="YYYY-MM-DD", nullable=False)
    auto_attendance_approval = Column(Boolean, default=False, nullable=False)
    allow_remote_checkin = Column(Boolean, default=True, nullable=False)
    ip_restriction_enabled = Column(Boolean, default=False, nullable=False)
    allowed_ip_ranges = Column(Text, nullable=True)

    # Relationship
    organization = relationship("Organization", back_populates="settings")
