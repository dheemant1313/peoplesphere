"""
Comprehensive Demo Data Seeder for PeopleSphere HRMS.
Populates realistic, connected multi-tenant records for:
1. Apex Corporate Technologies (Corporate Company)
2. St. John's University (Higher Education / College)
"""
import sys
import logging
from datetime import date, datetime, timedelta, timezone
from decimal import Decimal

from app.core.database import SessionLocal
from app.core.security import get_password_hash
from app.models.organization import Organization, OrganizationSetting
from app.models.user import User, Role, Permission, RolePermission
from app.models.employee import Department, Designation, Employee
from app.models.shift import Shift, EmployeeShiftAssignment
from app.models.attendance import Attendance, AttendanceCorrection
from app.models.holiday import Holiday
from app.models.leave import LeaveType, LeavePolicy, LeaveBalance, LeaveRequest, LeaveApproval
from app.models.salary import SalaryStructure, SalaryComponent, EmployeeSalaryAssignment
from app.models.payroll import PayrollPeriod, PayrollRecord, PayrollItem, Payslip
from app.models.audit import AuditLog

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("peoplesphere.seed")


def seed_all():
    db = SessionLocal()
    try:
        logger.info("Starting PeopleSphere demo database seeding...")

        # -------------------------------------------------------------
        # 1. Ensure Roles exist
        # -------------------------------------------------------------
        roles_data = [
            ("Organization Admin", "organization-admin", "Full executive and administrative control"),
            ("HR Administrator", "hr", "Workforce onboarding, leave administration, and payroll"),
            ("Department Manager", "manager", "Team management, attendance approval, and rosters"),
            ("Standard Employee", "employee", "Self-service attendance, leaves, and payslips"),
        ]
        role_map = {}
        for name, slug, desc in roles_data:
            role = db.query(Role).filter(Role.slug == slug).first()
            if not role:
                role = Role(name=name, slug=slug, description=desc, is_system_role=True)
                db.add(role)
                db.flush()
            role_map[slug] = role

        db.commit()

        # -------------------------------------------------------------
        # 2. SEED APEX CORPORATE TECHNOLOGIES (Tenant 1)
        # -------------------------------------------------------------
        apex_org = db.query(Organization).filter(Organization.id == 1).first()
        if not apex_org:
            apex_org = Organization(
                id=1,
                name="Apex Corporate Technologies",
                code="APEX-CORP-01",
                slug="apexcorp",
                org_type="COMPANY",
                domain="apexcorp.io",
                contact_email="admin@apexcorp.io",
                contact_phone="+1 (555) 019-2834",
                address="100 Silicon Way, Tech Park, Suite 500, Austin, TX",
                is_active=True,
            )
            db.add(apex_org)
            db.flush()

        apex_settings = db.query(OrganizationSetting).filter(OrganizationSetting.organization_id == 1).first()
        if not apex_settings:
            apex_settings = OrganizationSetting(
                organization_id=1,
                timezone="America/Chicago",
                currency="USD",
                fiscal_year_start="01-01",
                work_week_start="Monday",
                weekend_days="Saturday,Sunday",
                allow_remote_checkin=True,
            )
            db.add(apex_settings)
            db.flush()

        # Users for Apex
        apex_users_data = [
            ("admin@apexcorp.io", "Arthur", "Pendleton", "organization-admin", "ApexAdmin@2026"),
            ("hr@apexcorp.io", "Claire", "Higgins", "hr", "ClaireHR@2026"),
            ("manager@apexcorp.io", "Marcus", "Vance", "manager", "MarcusMgr@2026"),
            ("employee@apexcorp.io", "Sarah", "Jenkins", "employee", "SarahEmp@2026"),
        ]
        apex_users = {}
        for email, fn, ln, rslug, pwd in apex_users_data:
            u = db.query(User).filter(User.email == email).first()
            if not u:
                u = User(
                    email=email,
                    hashed_password=get_password_hash(pwd),
                    first_name=fn,
                    last_name=ln,
                    organization_id=1,
                    role_id=role_map[rslug].id,
                    is_active=True,
                    is_verified=True,
                )
                db.add(u)
                db.flush()
            else:
                u.hashed_password = get_password_hash(pwd)
                u.role_id = role_map[rslug].id
                db.flush()
            apex_users[email] = u

        db.commit()

        # Departments for Apex
        depts_data = [
            ("Engineering", "ENG", "Core software development and platform engineering"),
            ("Product & Design", "PRD", "Product management, UI/UX research, and systems design"),
            ("Human Resources", "HRD", "Talent acquisition, employee experience, and compliance"),
            ("Finance & Operations", "FIN", "Corporate accounting, financial planning, and legal"),
            ("Sales & Marketing", "SLS", "Global enterprise sales and developer relations"),
        ]
        apex_depts = {}
        for name, code, desc in depts_data:
            d = db.query(Department).filter(Department.organization_id == 1, Department.code == code).first()
            if not d:
                d = Department(organization_id=1, name=name, code=code, description=desc)
                db.add(d)
                db.flush()
            apex_depts[code] = d

        # Designations for Apex
        desigs_data = [
            ("Engineering Manager", "ENG-MGR", "ENG", "M3"),
            ("Lead Software Architect", "LEAD-ARCH", "ENG", "L4"),
            ("Senior Software Engineer", "SR-ENG", "ENG", "L3"),
            ("Software Engineer", "JR-ENG", "ENG", "L2"),
            ("Lead Product Designer", "PRD-DES", "PRD", "L3"),
            ("HR Director", "HR-DIR", "HRD", "M3"),
            ("HR Generalist", "HR-GEN", "HRD", "L2"),
            ("Chief Financial Officer", "CFO", "FIN", "EXEC"),
            ("Senior Accountant", "SR-ACC", "FIN", "L3"),
            ("Enterprise Account Executive", "ACC-EXEC", "SLS", "L3"),
        ]
        apex_desigs = {}
        for name, code, dcode, lvl in desigs_data:
            desig = db.query(Designation).filter(Designation.organization_id == 1, Designation.code == code).first()
            if not desig:
                desig = Designation(
                    organization_id=1,
                    name=name,
                    code=code,
                    department_id=apex_depts[dcode].id,
                    level=lvl,
                )
                db.add(desig)
                db.flush()
            apex_desigs[code] = desig

        # Shifts
        gen_shift = db.query(Shift).filter(Shift.organization_id == 1, Shift.code == "GEN").first()
        if not gen_shift:
            gen_shift = Shift(
                organization_id=1,
                name="General Standard Shift",
                code="GEN",
                start_time="09:00:00",
                end_time="18:00:00",
                grace_period_minutes=15,
                half_day_hours=4,
                full_day_hours=8,
                is_default=True,
            )
            db.add(gen_shift)
            db.flush()

        # Employees for Apex
        employees_seed = [
            # user_email, emp_code, fn, ln, dept_code, desig_code, manager_email, salary_annual
            ("admin@apexcorp.io", "APEX-0001", "Arthur", "Pendleton", "FIN", "CFO", None, 185000),
            ("hr@apexcorp.io", "APEX-0002", "Claire", "Higgins", "HRD", "HR-DIR", "admin@apexcorp.io", 135000),
            ("manager@apexcorp.io", "APEX-0003", "Marcus", "Vance", "ENG", "ENG-MGR", "admin@apexcorp.io", 160000),
            ("employee@apexcorp.io", "APEX-0004", "Sarah", "Jenkins", "ENG", "SR-ENG", "manager@apexcorp.io", 125000),
            (None, "APEX-0005", "David", "Kim", "ENG", "LEAD-ARCH", "manager@apexcorp.io", 145000),
            (None, "APEX-0006", "Priya", "Sharma", "ENG", "SR-ENG", "manager@apexcorp.io", 120000),
            (None, "APEX-0007", "James", "Wilson", "ENG", "JR-ENG", "manager@apexcorp.io", 95000),
            (None, "APEX-0008", "Elena", "Rostova", "PRD", "PRD-DES", "admin@apexcorp.io", 115000),
            (None, "APEX-0009", "Thomas", "Wright", "FIN", "SR-ACC", "admin@apexcorp.io", 105000),
            (None, "APEX-0010", "Aisha", "Patel", "SLS", "ACC-EXEC", "admin@apexcorp.io", 110000),
            (None, "APEX-0011", "Lucas", "Meyer", "ENG", "JR-ENG", "manager@apexcorp.io", 90000),
            (None, "APEX-0012", "Hannah", "Abbott", "HRD", "HR-GEN", "hr@apexcorp.io", 80000),
        ]

        emp_objs = {}
        for uemail, code, fn, ln, dcode, descode, mgremail, _ in employees_seed:
            emp = db.query(Employee).filter(Employee.organization_id == 1, Employee.employee_code == code).first()
            uid = apex_users[uemail].id if uemail and uemail in apex_users else None
            if not emp:
                emp = Employee(
                    organization_id=1,
                    user_id=uid,
                    employee_code=code,
                    first_name=fn,
                    last_name=ln,
                    work_email=uemail or f"{fn.lower()}.{ln.lower()}@apexcorp.io",
                    department_id=apex_depts[dcode].id,
                    designation_id=apex_desigs[descode].id,
                    date_of_joining=date(2024, 1, 15),
                    employment_type="FULL_TIME",
                    status="ACTIVE",
                )
                db.add(emp)
                db.flush()
            emp_objs[code] = emp

        # Set manager relationships
        marcus_emp = emp_objs["APEX-0003"]
        arthur_emp = emp_objs["APEX-0001"]
        for _, code, _, _, _, _, mgremail, _ in employees_seed:
            emp = emp_objs[code]
            if mgremail == "manager@apexcorp.io":
                emp.manager_id = marcus_emp.id
            elif mgremail == "admin@apexcorp.io":
                emp.manager_id = arthur_emp.id
        db.flush()

        # Update department manager
        apex_depts["ENG"].manager_id = marcus_emp.id
        db.flush()

        # Leave Types
        lt_data = [
            ("Casual Leave", "CL", 12.0, False),
            ("Sick Leave", "SL", 10.0, True),
            ("Paid Annual Leave", "PL", 18.0, True),
            ("Parental / Maternity", "ML", 90.0, False),
        ]
        apex_ltypes = {}
        for name, code, default_days, cf in lt_data:
            lt = db.query(LeaveType).filter(LeaveType.organization_id == 1, LeaveType.code == code).first()
            if not lt:
                lt = LeaveType(
                    organization_id=1,
                    name=name,
                    code=code,
                    default_days_per_year=Decimal(str(default_days)),
                    carry_forward_limit=Decimal("5.0") if cf else Decimal("0.0"),
                    is_paid=True,
                    requires_approval=True,
                )
                db.add(lt)
                db.flush()
            apex_ltypes[code] = lt

        # Seed Leave Balances for all Apex employees
        curr_year = datetime.now(timezone.utc).year
        for emp in emp_objs.values():
            for code, lt in apex_ltypes.items():
                lb = db.query(LeaveBalance).filter(
                    LeaveBalance.organization_id == 1,
                    LeaveBalance.employee_id == emp.id,
                    LeaveBalance.leave_type_id == lt.id,
                    LeaveBalance.year == curr_year,
                ).first()
                if not lb:
                    lb = LeaveBalance(
                        organization_id=1,
                        employee_id=emp.id,
                        leave_type_id=lt.id,
                        year=curr_year,
                        allocated_days=lt.default_days_per_year,
                        used_days=Decimal("2.0") if code == "CL" else Decimal("1.0"),
                        pending_days=Decimal("1.0") if emp.id == emp_objs["APEX-0004"].id and code == "PL" else Decimal("0.0"),
                        carry_forwarded_days=Decimal("2.0") if code == "PL" else Decimal("0.0"),
                    )
                    db.add(lb)
        db.flush()

        # Seed Pending and Historical Leave Requests
        sarah_emp = emp_objs["APEX-0004"]
        david_emp = emp_objs["APEX-0005"]
        priya_emp = emp_objs["APEX-0006"]

        existing_req = db.query(LeaveRequest).filter(LeaveRequest.organization_id == 1).first()
        if not existing_req:
            # 1. Pending request from Sarah Jenkins to Marcus Vance
            req1 = LeaveRequest(
                organization_id=1,
                employee_id=sarah_emp.id,
                leave_type_id=apex_ltypes["PL"].id,
                start_date=date.today() + timedelta(days=5),
                end_date=date.today() + timedelta(days=7),
                total_days=Decimal("3.0"),
                is_half_day=False,
                reason="Annual family vacation and family gathering",
                status="PENDING",
            )
            db.add(req1)

            # 2. Pending request from Priya Sharma
            req2 = LeaveRequest(
                organization_id=1,
                employee_id=priya_emp.id,
                leave_type_id=apex_ltypes["CL"].id,
                start_date=date.today() + timedelta(days=2),
                end_date=date.today() + timedelta(days=2),
                total_days=Decimal("1.0"),
                is_half_day=False,
                reason="Personal administrative appointment",
                status="PENDING",
            )
            db.add(req2)

            # 3. Approved request from David Kim (Historical)
            req3 = LeaveRequest(
                organization_id=1,
                employee_id=david_emp.id,
                leave_type_id=apex_ltypes["SL"].id,
                start_date=date.today() - timedelta(days=10),
                end_date=date.today() - timedelta(days=9),
                total_days=Decimal("2.0"),
                is_half_day=False,
                reason="Viral fever recovery",
                status="APPROVED",
            )
            db.add(req3)
            db.flush()

            # Leave approval record for req3
            appr = LeaveApproval(
                organization_id=1,
                leave_request_id=req3.id,
                approver_id=marcus_emp.id,
                level=1,
                status="APPROVED",
                comments="Approved, get well soon.",
                approved_at=datetime.now(timezone.utc) - timedelta(days=11),
            )
            db.add(appr)

        # Seed Today's & Past 14 Days Attendance Records
        today = date.today()
        for day_offset in range(14, -1, -1):
            check_date = today - timedelta(days=day_offset)
            is_weekend = check_date.weekday() in (5, 6)
            if is_weekend:
                continue

            for i, emp in enumerate(emp_objs.values()):
                att = db.query(Attendance).filter(
                    Attendance.organization_id == 1,
                    Attendance.employee_id == emp.id,
                    Attendance.date == check_date,
                ).first()

                if not att:
                    # Realistic distribution
                    if day_offset == 0:
                        # Today's attendance
                        if i == 0:  # Arthur
                            status, wh, late = "PRESENT", Decimal("7.5"), False
                        elif i == 1:  # Claire
                            status, wh, late = "PRESENT", Decimal("7.8"), False
                        elif i == 2:  # Marcus
                            status, wh, late = "PRESENT", Decimal("8.0"), False
                        elif i == 3:  # Sarah (Logged in employee)
                            status, wh, late = "PRESENT", Decimal("6.2"), False
                        elif i == 4:  # David
                            status, wh, late = "LATE", Decimal("6.5"), True
                        elif i == 5:  # Priya
                            status, wh, late = "HALF_DAY", Decimal("4.0"), False
                        elif i == 6:  # James
                            status, wh, late = "ON_LEAVE", Decimal("0.0"), False
                        elif i == 7:  # Elena
                            status, wh, late = "ABSENT", Decimal("0.0"), False
                        else:
                            status, wh, late = "PRESENT", Decimal("8.0"), False
                    else:
                        # Past records
                        status = "PRESENT" if (i + day_offset) % 7 != 0 else "LATE" if (i + day_offset) % 5 == 0 else "PRESENT"
                        wh = Decimal("8.0") if status == "PRESENT" else Decimal("7.0") if status == "LATE" else Decimal("0.0")
                        late = (status == "LATE")

                    check_in_dt = datetime.combine(check_date, datetime.min.time()).replace(tzinfo=timezone.utc) + timedelta(hours=9, minutes=10 if late else 0)
                    check_out_dt = check_in_dt + timedelta(hours=float(wh)) if wh > 0 else None

                    att = Attendance(
                        organization_id=1,
                        employee_id=emp.id,
                        date=check_date,
                        shift_id=gen_shift.id,
                        check_in=check_in_dt if wh > 0 else None,
                        check_out=check_out_dt if wh > 0 and day_offset > 0 else None,
                        working_hours=wh,
                        status=status,
                        is_late=late,
                        late_minutes=25 if late else 0,
                    )
                    db.add(att)

        # Seed Payroll Periods & Payslips
        prev_month = (today.replace(day=1) - timedelta(days=1)).replace(day=1)
        prev_month_end = today.replace(day=1) - timedelta(days=1)

        oct_period = db.query(PayrollPeriod).filter(
            PayrollPeriod.organization_id == 1,
            PayrollPeriod.name == f"{prev_month.strftime('%B %Y')} Pay Run",
        ).first()

        if not oct_period:
            oct_period = PayrollPeriod(
                organization_id=1,
                name=f"{prev_month.strftime('%B %Y')} Pay Run",
                start_date=prev_month,
                end_date=prev_month_end,
                total_days=31,
                working_days=22,
                status="FINALIZED",
            )
            db.add(oct_period)
            db.flush()

            # Create payroll record for Sarah Jenkins
            payroll_rec = PayrollRecord(
                organization_id=1,
                payroll_period_id=oct_period.id,
                employee_id=sarah_emp.id,
                days_present=Decimal("22.0"),
                days_absent=Decimal("0.0"),
                paid_leave_days=Decimal("0.0"),
                unpaid_leave_days=Decimal("0.0"),
                payable_days=Decimal("22.0"),
                base_salary=Decimal("6250.00"),
                gross_pay=Decimal("10416.67"),
                total_deductions=Decimal("1979.17"),
                net_pay=Decimal("8437.50"),
                status="FINALIZED",
                is_locked=True,
            )
            db.add(payroll_rec)
            db.flush()

            # Create finalized payslip for Sarah Jenkins
            slip = Payslip(
                organization_id=1,
                payroll_record_id=payroll_rec.id,
                employee_id=sarah_emp.id,
                payslip_number=f"PAY-{oct_period.id:04d}-{sarah_emp.id:04d}",
                generated_at=datetime.now(timezone.utc),
                is_published=True,
            )
            db.add(slip)

        # Seed Holidays
        holidays_data = [
            ("Thanksgiving Day", date(2026, 11, 26), True),
            ("Day After Thanksgiving", date(2026, 11, 27), True),
            ("Christmas Eve", date(2026, 12, 24), True),
            ("Christmas Day", date(2026, 12, 25), True),
            ("New Year's Day", date(2027, 1, 1), True),
            ("Martin Luther King Jr. Day", date(2027, 1, 18), True),
        ]
        for hname, hdate, is_opt in holidays_data:
            h = db.query(Holiday).filter(Holiday.organization_id == 1, Holiday.date == hdate).first()
            if not h:
                h = Holiday(
                    organization_id=1,
                    name=hname,
                    date=hdate,
                    is_optional=not is_opt,
                    description=f"Official corporate holiday for {hname}",
                )
                db.add(h)

        # Seed Recent Audit Logs
        audit_events = [
            (apex_users["admin@apexcorp.io"].id, "LOGIN", "Auth", "User signed in successfully from 127.0.0.1"),
            (apex_users["admin@apexcorp.io"].id, "UPDATE", "Policy", "Updated weekend policy to Saturday, Sunday"),
            (apex_users["manager@apexcorp.io"].id, "APPROVE", "LeaveRequest", "Approved medical leave for David Kim (APEX-0005)"),
            (apex_users["hr@apexcorp.io"].id, "PROCESS", "PayrollPeriod", f"Finalized payroll cycle for {prev_month.strftime('%B %Y')}"),
            (apex_users["admin@apexcorp.io"].id, "CREATE", "UserInvitation", "Created employee invitation for new team hire"),
        ]
        for uid, action, entity_name, desc in audit_events:
            log = AuditLog(
                organization_id=1,
                user_id=uid,
                action=action,
                entity_name=entity_name,
                new_values=desc,
                ip_address="127.0.0.1",
            )
            db.add(log)

        db.commit()
        logger.info("Apex Corporate Technologies demo data successfully seeded.")

        # -------------------------------------------------------------
        # 3. SEED ST. JOHN'S UNIVERSITY (Tenant 2 - College & Faculty)
        # -------------------------------------------------------------
        univ_org = db.query(Organization).filter(Organization.id == 2).first()
        if not univ_org:
            univ_org = Organization(
                id=2,
                name="St. John's University",
                code="STJ-UNIV-02",
                slug="stjohns",
                org_type="COLLEGE",
                domain="stjohns.edu",
                contact_email="dean@stjohns.edu",
                contact_phone="+1 (555) 890-1234",
                address="8000 Utopia Parkway, Queens, NY",
                is_active=True,
            )
            db.add(univ_org)
            db.flush()

        univ_settings = db.query(OrganizationSetting).filter(OrganizationSetting.organization_id == 2).first()
        if not univ_settings:
            univ_settings = OrganizationSetting(
                organization_id=2,
                timezone="America/New_York",
                currency="USD",
                fiscal_year_start="07-01",
                work_week_start="Monday",
                weekend_days="Saturday,Sunday",
                allow_remote_checkin=True,
            )
            db.add(univ_settings)
            db.flush()

        # Dean user
        dean_user = db.query(User).filter(User.email == "dean@stjohns.edu").first()
        if not dean_user:
            dean_user = User(
                email="dean@stjohns.edu",
                hashed_password=get_password_hash("DeanAdmin@2026"),
                first_name="Vincent",
                last_name="Strickland",
                organization_id=2,
                role_id=role_map["organization-admin"].id,
                is_active=True,
                is_verified=True,
            )
            db.add(dean_user)
            db.flush()

        # College Departments
        univ_depts_data = [
            ("Computer Science & Engineering", "CSE", "Undergraduate and postgraduate computer systems"),
            ("School of Medicine", "MED", "Clinical research, pharmacology, and anatomy"),
            ("Department of Humanities", "HUM", "Literature, philosophy, and history"),
            ("Dean of Academic Affairs", "ACAD", "Faculty oversight and institutional accreditation"),
        ]
        for name, code, desc in univ_depts_data:
            d = db.query(Department).filter(Department.organization_id == 2, Department.code == code).first()
            if not d:
                d = Department(organization_id=2, name=name, code=code, description=desc)
                db.add(d)

        db.commit()
        logger.info("St. John's University demo data successfully seeded.")

        logger.info("All demo data seeded successfully!")
    except Exception as e:
        db.rollback()
        logger.error(f"Error seeding demo data: {e}", exc_info=True)
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_all()
