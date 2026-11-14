import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import DashboardShell from './pages/DashboardShell';
import ModulePlaceholder from './pages/ModulePlaceholder';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardShell />} />
          <Route
            path="employees"
            element={
              <ModulePlaceholder
                title="Employee & Faculty Management"
                description="Centralized records for employees, faculty, departments, designations, profiles, and compliance documents."
                moduleNumber="7"
                nextPhase="Phase 5"
              />
            }
          />
          <Route
            path="attendance"
            element={
              <ModulePlaceholder
                title="Attendance & Biometric Management"
                description="Daily clock-in/out, biometric capture, working hours, late marks, half-days, and correction workflows."
                moduleNumber="8"
                nextPhase="Phase 6"
              />
            }
          />
          <Route
            path="shifts"
            element={
              <ModulePlaceholder
                title="Shift & Rotation Management"
                description="Shift templates, day/night schedules, rotational rosters, grace periods, and employee assignments."
                moduleNumber="9"
                nextPhase="Phase 6"
              />
            }
          />
          <Route
            path="leave"
            element={
              <ModulePlaceholder
                title="Leave Administration & Approvals"
                description="Custom leave types, annual quotas, accrual policies, carry-forward, and multi-tier approval chains."
                moduleNumber="11"
                nextPhase="Phase 7"
              />
            }
          />
          <Route
            path="salary"
            element={
              <ModulePlaceholder
                title="Salary Structure Management"
                description="CTC breakdowns, earnings, deduction components, statutory rules, and employee assignments."
                moduleNumber="13"
                nextPhase="Phase 8"
              />
            }
          />
          <Route
            path="payroll"
            element={
              <ModulePlaceholder
                title="Payroll Processing Engine"
                description="One-click pay runs, attendance integration, gross-to-net calculations, and immutable payroll locking."
                moduleNumber="14"
                nextPhase="Phase 8"
              />
            }
          />
          <Route
            path="reports"
            element={
              <ModulePlaceholder
                title="Payslips & Workforce Reports"
                description="ReportLab PDF payslip generation, compliance filings, attendance logs, and workforce metrics."
                moduleNumber="15"
                nextPhase="Phase 9"
              />
            }
          />
          <Route
            path="settings"
            element={
              <ModulePlaceholder
                title="Organization Settings"
                description="Fiscal calendars, work week definitions, attendance policies, and organization branding."
                moduleNumber="4"
                nextPhase="Phase 3"
              />
            }
          />
          <Route
            path="audit"
            element={
              <ModulePlaceholder
                title="Audit Trail & System Security"
                description="Comprehensive audit logging of all sensitive administrative actions, logins, and payroll changes."
                moduleNumber="18"
                nextPhase="Phase 10"
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
