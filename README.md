# PeopleSphere HRMS

> **"People First. Management Smarter."**  
> Complete Enterprise Employee Payroll, Attendance and Leave Management System for Colleges, Universities, and Corporate Enterprises.

---

## 🏛️ System Architecture Overview

PeopleSphere HRMS is architected as a high-performance, modular, multi-tenant system with strict tenant isolation, role-based access control (RBAC), and server-side verification.

- **Frontend**: React 18, Vite, JavaScript, Tailwind CSS, Lucide React, Recharts, GSAP, Axios, React Router v6.
- **Backend**: Python 3.10+, FastAPI, Pydantic v2, SQLAlchemy 2.0 (declarative), Alembic migrations, PyJWT, bcrypt.
- **Database**: MySQL 8.0 Community Server (Normalized schema across 28+ relational tables).
- **Documents & Payslips**: ReportLab PDF generator with immutable finalized snapshotting.
- **Testing**: Pytest, TestClient, Vitest.

---

## 🔌 Default Ports & Endpoints

| Service | Port / URL | Description |
| :--- | :--- | :--- |
| **MySQL Server 8.0** | `127.0.0.1:3307` | Dedicated instance with UTF-8 (`utf8mb4_unicode_ci`) |
| **FastAPI Backend** | `http://127.0.0.1:8001` | Core REST API engine |
| **API Documentation** | `http://127.0.0.1:8001/api/v1/docs` | Interactive Swagger UI / OpenAPI 3.1 |
| **System Diagnostics** | `http://127.0.0.1:8001/api/v1/health` | Live DB connectivity & latency health check |
| **React Frontend** | `http://127.0.0.1:5174` | Enterprise application shell & dashboard |

---

## 📁 Repository Structure

```
peoplesphere/
├── backend/
│   ├── alembic/
│   │   ├── versions/
│   │   │   └── 9ff88be700f1_initial_peoplesphere_schema.py
│   │   └── env.py
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── endpoints/
│   │   │       │   └── health.py
│   │   │       └── router.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   ├── dependencies.py
│   │   │   ├── exceptions.py
│   │   │   └── security.py
│   │   ├── models/
│   │   │   ├── attendance.py
│   │   │   ├── audit.py
│   │   │   ├── base.py
│   │   │   ├── employee.py
│   │   │   ├── holiday.py
│   │   │   ├── leave.py
│   │   │   ├── notification.py
│   │   │   ├── organization.py
│   │   │   ├── payroll.py
│   │   │   ├── salary.py
│   │   │   ├── shift.py
│   │   │   └── user.py
│   │   ├── schemas/
│   │   │   └── health.py
│   │   └── main.py
│   ├── venv/
│   ├── .env
│   ├── alembic.ini
│   ├── requirements.txt
│   ├── run_backend.py
│   └── test_backend.py
├── frontend/
│   ├── public/
│   │   └── logo.svg
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/
│   │   │       ├── AppLayout.jsx
│   │   │       ├── Header.jsx
│   │   │       └── Sidebar.jsx
│   │   ├── pages/
│   │   │   ├── DashboardShell.jsx
│   │   │   └── ModulePlaceholder.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── mysql_data/
├── mysql.ini
├── start_backend.bat
├── start_frontend.bat
└── start_mysql.bat
```

---

## 🚀 Running Commands

### 1. MySQL Server
```powershell
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe" --defaults-file=".\mysql.ini" --console
```

### 2. Backend Server
```powershell
cd backend
.\venv\Scripts\python.exe run_backend.py
```

### 3. Frontend Dev Server
```powershell
cd frontend
npm run dev -- --host 127.0.0.1 --port 5174
```

### 4. Running Migrations
```powershell
cd backend
.\venv\Scripts\alembic.exe upgrade head
```

### 5. Running Automated Backend Tests
```powershell
cd backend
.\venv\Scripts\pytest.exe -v test_backend.py
```
