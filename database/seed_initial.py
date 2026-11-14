"""
PeopleSphere HRMS Database Initial Seeding Script.
Populates standard RBAC roles, core system permissions, and sample organization tenants.
"""
import os
import sys

# Ensure backend path is available
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(__file__)), "backend"))

from app.core.database import SessionLocal
from app.core.security import get_password_hash
from app.models.organization import Organization, OrganizationSetting
from app.models.user import Role, Permission, User
from app.models.employee import Department, Designation, Employee


def seed_database():
    db = SessionLocal()
    try:
        print("[*] Checking existing database records...")
        
        # 1. System Roles
        roles_data = [
            ("ORGANIZATION_ADMIN", "organization-admin", "Full administrative authority within the organization tenant"),
            ("HR", "hr", "Human Resources officer with authority over payroll, employees, attendance and leave"),
            ("MANAGER", "manager", "Team lead / Department head who reviews leaves and team attendance"),
            ("EMPLOYEE", "employee", "Standard employee / faculty member with self-service capabilities"),
        ]

        created_roles = {}
        for name, slug, desc in roles_data:
            role = db.query(Role).filter(Role.slug == slug, Role.organization_id == None).first()
            if not role:
                role = Role(name=name, slug=slug, description=desc, is_system_role=True, organization_id=None)
                db.add(role)
                db.flush()
                print(f"    [+] Created System Role: {name}")
            created_roles[slug] = role

        # 2. Permissions
        permissions_data = [
            ("org:manage", "Manage Organization Settings", "Organization"),
            ("dept:manage", "Manage Departments", "Department"),
            ("desig:manage", "Manage Designations", "Designation"),
            ("employee:read", "View Employees", "Employee"),
            ("employee:write", "Create/Edit Employees", "Employee"),
            ("attendance:clock", "Clock In / Clock Out", "Attendance"),
            ("attendance:manage", "Manage Organization Attendance", "Attendance"),
            ("shift:manage", "Manage Shifts & Schedules", "Shift"),
            ("leave:apply", "Apply for Leave", "Leave"),
            ("leave:approve", "Approve/Reject Leave Requests", "Leave"),
            ("salary:manage", "Configure Salary Structures", "Salary"),
            ("payroll:process", "Execute Payroll Pay Runs", "Payroll"),
            ("payslip:download", "Download Payslips", "Payroll"),
            ("reports:view", "Access Workforce Analytics", "Reports"),
            ("audit:view", "Inspect Security Audit Trail", "Audit"),
        ]

        for code, name, module in permissions_data:
            perm = db.query(Permission).filter(Permission.code == code).first()
            if not perm:
                perm = Permission(code=code, name=name, module=module)
                db.add(perm)
                db.flush()

        # 3. Create Demo Organization 1: Apex Corporate Corp
        org_corp = db.query(Organization).filter(Organization.code == "APEX-CORP").first()
        if not org_corp:
            org_corp = Organization(
                name="Apex Corporate Technologies",
                code="APEX-CORP",
                slug="apex-corp",
                org_type="COMPANY",
                domain="apexcorp.io",
                contact_email="admin@apexcorp.io",
                contact_phone="+1-555-019-2834",
                address="100 Innovation Way, Suite 400, San Francisco, CA"
            )
            db.add(org_corp)
            db.flush()

            org_setting = OrganizationSetting(
                organization_id=org_corp.id,
                fiscal_year_start="01-01",
                work_week_start="Monday",
                weekend_days="Saturday,Sunday",
                currency="USD",
                timezone="America/Los_Angeles",
            )
            db.add(org_setting)

            # Admin User for Apex Corp
            user_corp_admin = User(
                organization_id=org_corp.id,
                email="admin@apexcorp.io",
                hashed_password=get_password_hash("ApexAdmin@2026"),
                first_name="Arthur",
                last_name="Pendleton",
                role_id=created_roles["organization-admin"].id,
                is_active=True,
                is_verified=True,
            )
            db.add(user_corp_admin)
            db.flush()
            print("    [+] Seeded Apex Corporate Corp with Admin (admin@apexcorp.io / ApexAdmin@2026)")

        # 4. Create Demo Organization 2: St. John's University (College Tenant)
        org_univ = db.query(Organization).filter(Organization.code == "STJOHN-UNIV").first()
        if not org_univ:
            org_univ = Organization(
                name="St. John's University & Medical College",
                code="STJOHN-UNIV",
                slug="stjohn-univ",
                org_type="COLLEGE",
                domain="stjohns.edu",
                contact_email="registrar@stjohns.edu",
                contact_phone="+1-555-018-9921",
                address="750 University Blvd, Cambridge, MA"
            )
            db.add(org_univ)
            db.flush()

            org_univ_setting = OrganizationSetting(
                organization_id=org_univ.id,
                fiscal_year_start="07-01",
                work_week_start="Monday",
                weekend_days="Sunday",
                currency="USD",
                timezone="America/New_York",
            )
            db.add(org_univ_setting)

            # Dean / Admin User for University
            user_univ_admin = User(
                organization_id=org_univ.id,
                email="dean@stjohns.edu",
                hashed_password=get_password_hash("DeanAdmin@2026"),
                first_name="Eleanor",
                last_name="Vance",
                role_id=created_roles["organization-admin"].id,
                is_active=True,
                is_verified=True,
            )
            db.add(user_univ_admin)
            db.flush()
            print("    [+] Seeded St. John's University with Admin (dean@stjohns.edu / DeanAdmin@2026)")

        db.commit()
        print("[✓] Initial database seeding completed successfully!")
    except Exception as exc:
        db.rollback()
        print(f"[!] Error seeding database: {exc}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
