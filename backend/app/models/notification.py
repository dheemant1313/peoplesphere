from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin, TenantMixin


class Notification(Base, TimestampMixin, TenantMixin):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    notification_type = Column(String(30), default="INFO", nullable=False)  # INFO, WARNING, SUCCESS, ACTION_REQUIRED
    link_url = Column(String(500), nullable=True)
    is_read = Column(Boolean, default=False, nullable=False, index=True)
    read_at = Column(DateTime, nullable=True)

    user = relationship("User")


class NotificationPreference(Base, TimestampMixin, TenantMixin):
    __tablename__ = "notification_preferences"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)

    email_notifications = Column(Boolean, default=True, nullable=False)
    in_app_notifications = Column(Boolean, default=True, nullable=False)
    leave_updates = Column(Boolean, default=True, nullable=False)
    payroll_updates = Column(Boolean, default=True, nullable=False)
    attendance_reminders = Column(Boolean, default=True, nullable=False)

    user = relationship("User")

    __table_args__ = (
        UniqueConstraint("user_id", "organization_id", name="uq_user_notif_pref_org"),
    )
