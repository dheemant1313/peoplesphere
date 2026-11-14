# PeopleSphere HRMS — Architecture & Multi-Tenant Design Document

> **Version:** 1.0.0  
> **Tagline:** *"People First. Management Smarter."*

---

## 1. High-Level Architecture Overview

PeopleSphere HRMS employs a unified **multi-tenant architecture** with shared-process, shared-database, and strict row-level data isolation.

```
                    ┌─────────────────────────┐
                    │   React 18 + Vite SPA   │
                    │  (Tailwind Enterprise)  │
                    └────────────┬────────────┘
                                 │ HTTPS / JSON (Bearer JWT)
                                 ▼
                    ┌─────────────────────────┐
                    │     FastAPI Gateway     │
                    │  (/api/v1 - REST APIs)  │
                    └────────────┬────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
         ▼                       ▼                       ▼
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│  Authentication  │   │  Tenant Isolation│   │  RBAC Permission │
│ & Token Security │   │    Middleware    │   │  Authorization   │
└────────┬─────────┘   └────────┬─────────┘   └────────┬─────────┘
         │                      │                      │
         └──────────────────────┼──────────────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │    Repository Layer     │
                    │ (TenantAwareRepository) │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │     SQLAlchemy 2.0      │
                    │     Alembic DDL         │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │        MySQL 8.0        │
                    │ (peoplesphere_db UTF8)  │
                    └─────────────────────────┘
```

---

## 2. Multi-Tenant Isolation Pattern

1. **Authentication Token as Single Source of Truth:**
   - When a user logs in, their issued JWT contains their `sub` (User ID), `org_id` (Tenant ID), and `role` (Role Slug).
   - In all protected endpoints, the backend extracts the tenant identity solely from the decoded cryptographic token.
   - Client requests attempting to inject or overwrite `organization_id` in headers or URL bodies are explicitly ignored or rejected.

2. **Repository-Level Tenant Scoping:**
   - Every tenant-owned entity inherits from `TenantMixin` and is managed through `TenantAwareRepository`.
   - Every `SELECT`, `UPDATE`, and `DELETE` automatically adds `WHERE organization_id = :current_tenant_id`.
   - Cross-tenant data leaks are structurally eliminated at the data-access layer.

---

## 3. Role-Based Access Control (RBAC)

The system defines 4 primary system roles and dynamic custom roles:
1. **ORGANIZATION_ADMIN**: Workspace settings, department setup, user provisioning, global policy controls.
2. **HR**: Full employee lifecycle, attendance reconciliation, leave administration, salary structuring, and monthly payroll finalization.
3. **MANAGER**: Team view, shift scheduling, and multi-tier approval chains for team leave requests.
4. **EMPLOYEE**: Employee self-service (ESS), clock-in/out, personal leave balances, and immutable payslip downloads.

---

## 4. Financial & Audit Guarantees

- **Decimal Financial Math:** All salaries, gross pay, deductions, and tax withholdings use `Numeric(12, 2)` (Python `Decimal`) to eliminate floating-point precision errors.
- **Immutable Payroll Snapshots:** When a payroll run is finalized, an immutable snapshot is recorded with `is_locked = True`. Modifications to past salary structures do not alter historical records.
- **Audit Logging:** Every sensitive administrative action is logged to `audit_logs` with timestamps, actor IDs, IP addresses, and state diffs.
