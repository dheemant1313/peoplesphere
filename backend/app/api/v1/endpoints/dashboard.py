"""
Role-Based Dashboard API Endpoints for PeopleSphere HRMS.
"""
from datetime import date
from typing import Any, Dict, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user, require_roles
from app.models.user import User
from app.services.dashboard_service import DashboardService

router = APIRouter()


class LeaveActionRequest(BaseModel):
    action: str  # APPROVE or REJECT
    comments: Optional[str] = None


@router.get("/admin", summary="Executive & Organization Admin Dashboard")
def get_admin_dashboard(
    date_from: Optional[date] = Query(None, description="Start date for analytics filter"),
    date_to: Optional[date] = Query(None, description="End date for analytics filter"),
    department_id: Optional[int] = Query(None, description="Filter by department"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Returns aggregated KPIs, attendance trends, department distribution,
    payroll history, and administrative activity tables.
    Restricted to Organization Administrators and Platform Admins.
    """
    if current_user.role.slug not in ("organization-admin", "platform_admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access restricted to Organization Administrators."
        )

    service = DashboardService(db=db, organization_id=current_user.organization_id)
    return service.get_admin_dashboard(date_from=date_from, date_to=date_to, department_id=department_id)


@router.get("/hr", summary="Human Resources Workforce Dashboard")
def get_hr_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Returns workforce headcount, daily attendance breakdown, hiring trends,
    leave utilization, and salary processing summary.
    Restricted to HR Specialists and Organization Admins.
    """
    if current_user.role.slug not in ("hr", "organization-admin", "platform_admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access restricted to HR and Organization Administrators."
        )

    service = DashboardService(db=db, organization_id=current_user.organization_id)
    return service.get_hr_dashboard()


@router.get("/manager", summary="Department & Team Manager Dashboard")
def get_manager_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Returns team-scoped attendance roster, pending leave approvals from team members,
    and upcoming organizational holidays.
    Restricted to Department Managers, HR, and Organization Admins.
    """
    if current_user.role.slug not in ("manager", "hr", "organization-admin", "platform_admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access restricted to Department Managers."
        )

    service = DashboardService(db=db, organization_id=current_user.organization_id)
    return service.get_manager_dashboard(current_user_id=current_user.id)


@router.get("/employee", summary="Employee Self-Service Dashboard")
def get_employee_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Returns personalized employee welcome, today's clock-in status, working hours,
    leave balances, leave applications status, and latest finalized payslip.
    Accessible to all authenticated users.
    """
    service = DashboardService(db=db, organization_id=current_user.organization_id)
    return service.get_employee_dashboard(current_user_id=current_user.id)


@router.post("/employee/clock-in", summary="Quick Attendance Clock-In")
def employee_clock_in(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Records official check-in timestamp and creates/updates today's attendance record.
    """
    service = DashboardService(db=db, organization_id=current_user.organization_id)
    client_ip = request.client.host if request.client else "127.0.0.1"
    try:
        return service.clock_in(user_id=current_user.id, ip_address=client_ip)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post("/employee/clock-out", summary="Quick Attendance Clock-Out")
def employee_clock_out(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Records official check-out timestamp and calculates today's working hours.
    """
    service = DashboardService(db=db, organization_id=current_user.organization_id)
    client_ip = request.client.host if request.client else "127.0.0.1"
    try:
        return service.clock_out(user_id=current_user.id, ip_address=client_ip)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post("/leave-approvals/{leave_request_id}/action", summary="Approve or Reject Leave Request")
def action_leave_request(
    leave_request_id: int,
    payload: LeaveActionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Allows Managers, HR, or Admins to approve or reject a pending leave request.
    """
    if current_user.role.slug not in ("manager", "hr", "organization-admin", "platform_admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to approve or reject leave requests."
        )

    service = DashboardService(db=db, organization_id=current_user.organization_id)
    try:
        return service.action_leave_request(
            leave_request_id=leave_request_id,
            action=payload.action,
            approver_user_id=current_user.id,
            comments=payload.comments,
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
