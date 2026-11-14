# PeopleSphere HRMS — SDP / PBL Project Submission Guide

**Project Name:** PeopleSphere HRMS  
**Tagline:** *"People First. Management Smarter."*  
**Architecture:** Enterprise Multi-Tenant Full-Stack Workforce & Payroll Management System  
**Repository:** [https://github.com/dheemant1313/peoplesphere](https://github.com/dheemant1313/peoplesphere)

---

## 1. Project Directory Structure

```
sdp pbl/
├── backend/                  # FastAPI 0.115 backend application
│   ├── app/
│   │   ├── api/v1/           # REST endpoints (auth, dashboard, employees, departments, etc.)
│   │   ├── core/             # Database connection, JWT security, permissions, dependencies
│   │   ├── db/               # Multi-tenant demo seeding scripts and migration utilities
│   │   ├── models/           # 28 normalized SQLAlchemy 2.x relational models
│   │   ├── schemas/          # Pydantic v2 validation models
│   │   └── services/         # Business logic layer (auth, dashboard analytics, workforce)
│   ├── tests/                # Automated pytest suite (18/18 passing)
│   ├── requirements.txt      # Python dependencies
│   └── run_backend.py        # Uvicorn entrypoint with reload watcher
│
├── frontend/                 # React 18 + Vite modern Single Page Application
│   ├── src/
│   │   ├── components/       # Common UI elements, layouts, tables, modals
│   │   ├── context/          # AuthContext (JWT & RBAC state), ToastContext
│   │   ├── pages/
│   │   │   ├── auth/         # Login, Org Onboarding, Forgot/Reset Password, Invitations
│   │   │   ├── dashboard/    # 4 Role Dashboards (Admin, HR, Manager, Employee)
│   │   │   └── public/       # Enterprise SaaS Landing Page
│   │   ├── services/         # Axios API clients
│   │   └── App.jsx           # Master router with RBAC route protection
│   └── package.json          # Node dependencies (Recharts, GSAP, Lucide React, Tailwind)
│
├── database/                 # Database migrations and backup
│   ├── init.sql              # Database initialization
│   └── peoplesphere_complete_backup.sql # FULL SQL Dump (Schema + Multi-Tenant Seed Data)
│
├── docs/                     # Architectural documents & design specifications
├── scripts/                  # Convenience startup scripts for Windows PowerShell
├── README.md                 # Complete project documentation
├── start_backend.bat         # 1-Click launcher for FastAPI server (Port 8001)
├── start_frontend.bat        # 1-Click launcher for Vite dev server (Port 5174)
└── start_mysql.bat           # 1-Click launcher for MySQL daemon (Port 3307)
```

---

## 2. Quick Start / How to Run

### Step A: Database Setup (MySQL 8.0)
1. Ensure MySQL Server 8.0+ is installed.
2. Import the complete database dump into MySQL:
   ```bash
   mysql -u root -p < database/peoplesphere_complete_backup.sql
   ```
   *(Or connect to port `3307` if running the custom local daemon)*.

### Step B: Backend Server
1. Open terminal in `backend/`:
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   python run_backend.py
   ```
2. The FastAPI documentation and health check will be live at:
   - API Root: `http://127.0.0.1:8001/`
   - Interactive Swagger Docs: `http://127.0.0.1:8001/docs`

### Step C: Frontend Client
1. Open terminal in `frontend/`:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. Open your web browser at:
   - Application URL: `http://127.0.0.1:5174/`

---

## 3. Demo Credentials (Ready for Viva / Evaluation)

### Tenant 1: Apex Corporate Technologies (Corporate SaaS)
| Role | Email | Password | Vantage Point |
| :--- | :--- | :--- | :--- |
| **Executive Admin** | `admin@apexcorp.io` | `ApexAdmin@2026` | Full organizational oversight, Recharts KPIs, payroll, audit logs |
| **Human Resources** | `hr@apexcorp.io` | `ClaireHR@2026` | Headcount, hiring trends, attendance health, leave approvals |
| **Department Manager**| `manager@apexcorp.io` | `MarcusMgr@2026` | Team roster, live shift status, approve/reject team leave |
| **Employee Self-Service** | `employee@apexcorp.io`| `SarahEmp@2026` | Personal portal, **Clock-In / Clock-Out**, leave balance, payslips |

### Tenant 2: St. John's University (Higher Education / Academic)
| Role | Email | Password | Vantage Point |
| :--- | :--- | :--- | :--- |
| **Dean / College Admin** | `dean@stjohns.edu` | `DeanAdmin@2026` | Faculty management, academic staff attendance, semester pay runs |

---

## 4. Key Highlights for Evaluation & Grading

1. **True Full-Stack Integration:** Not a mock prototype; every dashboard metric, attendance record, and leave approval queries live MySQL tables via SQLAlchemy 2.0 with Decimal precision for financial records.
2. **Strict Multi-Tenant Isolation:** Complete isolation between organizations enforced cryptographically via JWT `org_id` claims.
3. **Role-Based Access Control (RBAC):** 4 distinct role dashboards with granular permissions (`employee.create`, `attendance.correct`, `payroll.process`, etc.).
4. **Interactive Quick Actions:**
   - Real-time **Clock-In / Clock-Out** action with live hours calculation.
   - One-click **Approve** and **Reject** leave requests with immediate quota balance deductions.
   - Interactive role view switcher allowing evaluators to preview all 4 roles on the fly.
5. **Interactive Recharts Visualizations:** Responsive area charts, donut charts, grouped expenditure bars, and leave quota progress bars.
6. **Automated Test Coverage:** 18 passing pytest unit & integration tests covering authentication, tenant isolation, models, and dashboard metrics.
