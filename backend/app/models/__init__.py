"""SQLAlchemy Models Registry for PeopleSphere HRMS."""
from app.core.database import Base
from app.models.base import TimestampMixin, TenantMixin, SoftDeleteMixin
from app.models.organization import Organization, OrganizationSetting
from app.models.user import User, Role, Permission, RolePermission
from app.models.employee import Department, Designation, Employee, EmployeeDocument
from app.models.shift import Shift, EmployeeShiftAssignment
from app.models.attendance import Attendance, AttendanceCorrection
from app.models.holiday import Holiday
from app.models.leave import LeaveType, LeavePolicy, LeaveBalance, LeaveRequest, LeaveApproval
from app.models.salary import SalaryStructure, SalaryComponent, EmployeeSalaryAssignment
from app.models.payroll import PayrollPeriod, PayrollRecord, PayrollItem, Payslip
from app.models.notification import Notification, NotificationPreference
from app.models.audit import AuditLog

__all__ = [
    "Base",
    "TimestampMixin",
    "TenantMixin",
    "SoftDeleteMixin",
    "Organization",
    "OrganizationSetting",
    "User",
    "Role",
    "Permission",
    "RolePermission",
    "Department",
    "Designation",
    "Employee",
    "EmployeeDocument",
    "Shift",
    "EmployeeShiftAssignment",
    "Attendance",
    "AttendanceCorrection",
    "Holiday",
    "LeaveType",
    "LeavePolicy",
    "LeaveBalance",
    "LeaveRequest",
    "LeaveApproval",
    "SalaryStructure",
    "SalaryComponent",
    "EmployeeSalaryAssignment",
    "PayrollPeriod",
    "PayrollRecord",
    "PayrollItem",
    "Payslip",
    "Notification",
    "NotificationPreference",
    "AuditLog",
]
