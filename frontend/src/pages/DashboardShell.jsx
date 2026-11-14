import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './dashboard/AdminDashboard';
import HrDashboard from './dashboard/HrDashboard';
import ManagerDashboard from './dashboard/ManagerDashboard';
import EmployeeDashboard from './dashboard/EmployeeDashboard';
import { Shield, Users, UserCheck, User, Eye } from 'lucide-react';

export default function DashboardShell() {
  const { user, hasRole } = useAuth();

  // Determine default view based on logged-in user role
  const getDefaultRoleView = () => {
    if (!user) return 'admin';
    const roleSlugs = (user.roles || []).map((r) => (typeof r === 'string' ? r : r.slug || r.name));

    if (roleSlugs.includes('organization-admin') || roleSlugs.includes('platform_admin')) {
      return 'admin';
    }
    if (roleSlugs.includes('hr')) {
      return 'hr';
    }
    if (roleSlugs.includes('manager')) {
      return 'manager';
    }
    if (roleSlugs.includes('employee')) {
      return 'employee';
    }
    return 'admin';
  };

  const [activeRoleView, setActiveRoleView] = useState(getDefaultRoleView());

  // Synchronize default when user loads
  useEffect(() => {
    setActiveRoleView(getDefaultRoleView());
  }, [user]);

  // Check permissions to switch views (Admins & HR can preview any role; Managers can preview employee)
  const canSwitchViews =
    hasRole(['organization-admin', 'platform_admin', 'hr', 'manager']);

  const roleViewOptions = [
    {
      id: 'admin',
      label: 'Executive Admin',
      icon: Shield,
      allowed: hasRole(['organization-admin', 'platform_admin']),
    },
    {
      id: 'hr',
      label: 'HR Workforce',
      icon: Users,
      allowed: hasRole(['organization-admin', 'platform_admin', 'hr']),
    },
    {
      id: 'manager',
      label: 'Team Manager',
      icon: UserCheck,
      allowed: hasRole(['organization-admin', 'platform_admin', 'hr', 'manager']),
    },
    {
      id: 'employee',
      label: 'Employee Self-Service',
      icon: User,
      allowed: true,
    },
  ];

  const availableOptions = roleViewOptions.filter((opt) => opt.allowed);

  return (
    <div className="space-y-6">
      {/* Role View Switcher Banner for privileged roles */}
      {canSwitchViews && availableOptions.length > 1 && (
        <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-600">
            <div className="p-1 rounded bg-brand-50 text-brand-600">
              <Eye className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-800">Role Dashboard Switcher:</span>
            <span className="text-slate-400 hidden md:inline">Preview the system from different operational vantage points</span>
          </div>

          <div className="flex items-center space-x-1 bg-slate-100/90 p-1 rounded-lg border border-slate-200/70 overflow-x-auto">
            {availableOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = activeRoleView === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setActiveRoleView(opt.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                    isActive
                      ? 'bg-white text-brand-700 shadow-xs border border-slate-200/60 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Render the Active Role Dashboard */}
      {activeRoleView === 'admin' && <AdminDashboard />}
      {activeRoleView === 'hr' && <HrDashboard />}
      {activeRoleView === 'manager' && <ManagerDashboard />}
      {activeRoleView === 'employee' && <EmployeeDashboard />}
    </div>
  );
}