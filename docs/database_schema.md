# PeopleSphere HRMS — Relational Database Schema Data Dictionary

Database: **MySQL 8.0+**  
Default Schema: `peoplesphere_db`  
Charset: `utf8mb4`  
Collation: `utf8mb4_unicode_ci`  

---

## Entity Modules & Table Registry

### 1. Multi-Tenant Core
- **`organizations`**: Master tenant records (Colleges, Universities, Corporate Enterprises).
- **`organization_settings`**: Fiscal calendars, work week definitions, attendance thresholds, IP whitelists.

### 2. User & Access Control (RBAC)
- **`users`**: User identities, authentication hashes (bcrypt), active flags.
- **`roles`**: System templates and tenant-specific role definitions.
- **`permissions`**: Fine-grained feature permissions.
- **`role_permissions`**: Many-to-many role-to-permission mapping.

### 3. Workforce Management
- **`departments`**: Organizational hierarchy, parent/child branches, department heads.
- **`designations`**: Job titles, seniority levels, grades.
- **`employees`**: Comprehensive staff and faculty records, work emails, employment types, bank details, emergency contacts.
- **`employee_documents`**: Verification documents, IDs, resumes, contracts.

### 4. Time, Shifts & Attendance
- **`shifts`**: Shift policies, start/end times, grace periods, half-day/full-day criteria.
- **`employee_shift_assignments`**: Active shift assignment windows for staff.
- **`attendance`**: Daily biometric and timestamp records, working hours, late arrivals, early exits.
- **`attendance_corrections`**: Discrepancy correction requests and manager approvals.
- **`holidays`**: Public, university, and optional/floating holidays.

### 5. Leave & Approval Workflow
- **`leave_types`**: Paid/unpaid leave definitions (Casual, Sick, Earned, Maternity, Sabbatical).
- **`leave_policies`**: Consecutiveness rules, notice periods, negative balance rules.
- **`leave_balances`**: Real-time quota, accrued, used, and carry-forward balances per employee per year.
- **`leave_requests`**: Employee applications, half-day flags, date spans.
- **`leave_approvals`**: Multi-level hierarchical approvals with manager remarks.

### 6. Compensation & Payroll
- **`salary_structures`**: Salary grading templates.
- **`salary_components`**: Configurable earnings (Basic, HRA) and deductions (PF, Tax).
- **`employee_salary_assignments`**: Employee base pay assignments.
- **`payroll_periods`**: Monthly or bi-weekly pay run batches.
- **`payroll_records`**: Individual employee pay calculations with attendance tie-in.
- **`payroll_items`**: Breakdown itemizations for each earning and deduction.
- **`payslips`**: Immutable published payslip tokens and file references.

### 7. Communications & Governance
- **`notifications`**: In-app notifications with action links.
- **`notification_preferences`**: User-customized channel and alert toggles.
- **`audit_logs`**: Tamper-evident administrative audit logs with state diffs.
- **`alembic_version`**: DDL migration tracking.
