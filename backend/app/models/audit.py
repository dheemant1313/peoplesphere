from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TenantMixin


class AuditLog(Base, TenantMixin):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)

    action = Column(String(50), nullable=False, index=True)  # CREATE, UPDATE, DELETE, LOGIN, LOGOUT, APPROVE, REJECT, PROCESS
    entity_name = Column(String(100), nullable=False, index=True)  # Employee, Attendance, LeaveRequest, PayrollPeriod, etc.
    entity_id = Column(String(100), nullable=True)
    old_values = Column(Text, nullable=True)  # JSON formatted snapshot
    new_values = Column(Text, nullable=True)  # JSON formatted snapshot
    ip_address = Column(String(50), nullable=True)
    user_agent = Column(String(255), nullable=True)
    created_at = Column(DateTime, server_default=func.now(), nullable=False, index=True)

    user = relationship("User")
