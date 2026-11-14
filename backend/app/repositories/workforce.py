from typing import List, Optional
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.employee import Department, Designation, Employee
from app.models.attendance import Attendance
from app.models.leave import LeaveRequest, LeaveBalance
from app.models.payroll import PayrollPeriod, PayrollRecord
from app.repositories.tenant_repository import TenantAwareRepository


class DepartmentRepository(TenantAwareRepository[Department]):
    def __init__(self, db: Session, organization_id: int):
        super().__init__(Department, db, organization_id)

    def get_by_code(self, code: str) -> Optional[Department]:
        query = select(Department).filter(
            Department.code == code,
            Department.organization_id == self.organization_id,
            Department.is_deleted == False
        )
        return self.db.execute(query).scalar_one_or_none()


class EmployeeRepository(TenantAwareRepository[Employee]):
    def __init__(self, db: Session, organization_id: int):
        super().__init__(Employee, db, organization_id)

    def get_by_code(self, employee_code: str) -> Optional[Employee]:
        query = select(Employee).filter(
            Employee.employee_code == employee_code,
            Employee.organization_id == self.organization_id,
            Employee.is_deleted == False
        )
        return self.db.execute(query).scalar_one_or_none()

    def get_by_email(self, work_email: str) -> Optional[Employee]:
        query = select(Employee).filter(
            Employee.work_email == work_email,
            Employee.organization_id == self.organization_id,
            Employee.is_deleted == False
        )
        return self.db.execute(query).scalar_one_or_none()


class AttendanceRepository(TenantAwareRepository[Attendance]):
    def __init__(self, db: Session, organization_id: int):
        super().__init__(Attendance, db, organization_id)

    def get_by_employee_and_date(self, employee_id: int, date) -> Optional[Attendance]:
        query = select(Attendance).filter(
            Attendance.employee_id == employee_id,
            Attendance.date == date,
            Attendance.organization_id == self.organization_id,
            Attendance.is_deleted == False
        )
        return self.db.execute(query).scalar_one_or_none()


class LeaveRepository(TenantAwareRepository[LeaveRequest]):
    def __init__(self, db: Session, organization_id: int):
        super().__init__(LeaveRequest, db, organization_id)

    def get_pending_requests(self) -> List[LeaveRequest]:
        query = select(LeaveRequest).filter(
            LeaveRequest.status == "PENDING",
            LeaveRequest.organization_id == self.organization_id,
            LeaveRequest.is_deleted == False
        )
        return list(self.db.execute(query).scalars().all())


class PayrollRepository(TenantAwareRepository[PayrollPeriod]):
    def __init__(self, db: Session, organization_id: int):
        super().__init__(PayrollPeriod, db, organization_id)

    def get_active_period(self) -> Optional[PayrollPeriod]:
        query = select(PayrollPeriod).filter(
            PayrollPeriod.status.in_(["DRAFT", "PROCESSING"]),
            PayrollPeriod.organization_id == self.organization_id,
            PayrollPeriod.is_deleted == False
        ).order_by(PayrollPeriod.start_date.desc())
        return self.db.execute(query).scalar_one_or_none()
