import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Clock,
  CalendarDays,
  FileCheck,
  CreditCard,
  FileSpreadsheet,
  Settings,
  ShieldAlert,
  Layers,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }) {
  const { user, hasRole } = useAuth();
  const location = useLocation();

  const isRoleAdmin = hasRole(['organization-admin', 'platform_admin']);
  const isRoleHr = hasRole(['hr']);
  const isRoleManager = hasRole(['manager']);
  const isRoleEmployee = hasRole(['employee']);

  // Role-specific navigation items
  let navItems = [];

  if (isRoleAdmin || isRoleHr) {
    navItems = [
      { name: 'Dashboard', href: '/app', icon: LayoutDashboard, end: true },
      { name: 'Employees & Faculty', href: '/app/employees', icon: Users, badge: '12' },
      { name: 'Attendance & Clock-in', href: '/app/attendance', icon: Clock },
      { name: 'Shifts & Schedules', href: '/app/shifts', icon: CalendarDays },
      { name: 'Leave & Approvals', href: '/app/leave', icon: FileCheck, badge: '2' },
      { name: 'Salary & Structures', href: '/app/salary', icon: Layers },
      { name: 'Payroll Processing', href: '/app/payroll', icon: CreditCard },
      { name: 'Payslips & Reports', href: '/app/reports', icon: FileSpreadsheet },
      { name: 'Organization Settings', href: '/app/settings', icon: Settings },
      ...(isRoleAdmin ? [{ name: 'Audit & Compliance', href: '/app/audit', icon: ShieldAlert }] : []),
    ];
  } else if (isRoleManager) {
    navItems = [
      { name: 'Dashboard', href: '/app', icon: LayoutDashboard, end: true },
      { name: 'Team Attendance', href: '/app/attendance', icon: Clock },
      { name: 'Shift Schedules', href: '/app/shifts', icon: CalendarDays },
      { name: 'Leave Approvals', href: '/app/leave', icon: FileCheck, badge: '1' },
      { name: 'Team Directory', href: '/app/employees', icon: Users },
      { name: 'My Payslips', href: '/app/reports', icon: FileSpreadsheet },
    ];
  } else {
    // Employee
    navItems = [
      { name: 'Dashboard', href: '/app', icon: LayoutDashboard, end: true },
      { name: 'My Attendance', href: '/app/attendance', icon: Clock },
      { name: 'My Shift Roster', href: '/app/shifts', icon: CalendarDays },
      { name: 'Leave Requests', href: '/app/leave', icon: FileCheck },
      { name: 'My Payslips', href: '/app/reports', icon: FileSpreadsheet },
    ];
  }

  const renderNavList = (isMobile = false) => (
    <nav className="p-3 space-y-1.5 flex-1 overflow-y-auto">
      <div
        className={`px-3 pt-2 pb-1 text-[10px] font-semibold text-slate-400 tracking-wider uppercase flex items-center justify-between ${
          collapsed && !isMobile ? 'justify-center' : ''
        }`}
      >
        {(!collapsed || isMobile) ? (
          <>
            <span>Workforce Suite</span>
            <Link
              to="/"
              className="text-[10px] text-brand-400 hover:text-brand-300 flex items-center space-x-0.5 normal-case font-normal"
            >
              <span>Site</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </Link>
          </>
        ) : (
          <span className="text-[9px] text-slate-500 font-mono">•••</span>
        )}
      </div>

      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.end
          ? location.pathname === item.href
          : location.pathname.startsWith(item.href);

        return (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.end}
            onClick={isMobile ? onCloseMobile : undefined}
            title={collapsed && !isMobile ? item.name : undefined}
            className={`group relative flex items-center ${
              collapsed && !isMobile ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2.5'
            } rounded-xl text-xs font-medium transition-all ${
              isActive
                ? 'bg-brand-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
            }`}
          >
            {/* Active Left Indicator Bar */}
            {isActive && (
              <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-white rounded-r-full" />
            )}

            <div className={`flex items-center ${collapsed && !isMobile ? 'justify-center' : 'space-x-3'}`}>
              <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />
              {(!collapsed || isMobile) && <span className="truncate">{item.name}</span>}
            </div>

            {(!collapsed || isMobile) && item.badge && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-medium ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {item.badge}
              </span>
            )}
          </NavLink>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* 1. DESKTOP SIDEBAR */}
      <aside
        className={`hidden md:flex flex-col justify-between bg-slate-900 text-slate-300 border-r border-slate-800 select-none transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40">
            <Link to="/" className="flex items-center space-x-3 overflow-hidden group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md font-bold text-sm tracking-tight shrink-0">
                PS
              </div>
              {!collapsed && (
                <div className="transition-opacity duration-200">
                  <div className="text-white font-semibold text-sm tracking-tight flex items-center space-x-1">
                    <span>PeopleSphere</span>
                    <span className="text-[9px] px-1.5 py-0.2 bg-brand-500/20 text-brand-300 font-mono rounded">
                      HRMS
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-normal truncate">
                    People First. Smarter.
                  </div>
                </div>
              )}
            </Link>

            {/* Collapse Toggle Button */}
            <button
              onClick={onToggleCollapse}
              className={`p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${
                collapsed ? 'mx-auto' : ''
              }`}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Items */}
          {renderNavList(false)}
        </div>

        {/* Footer Tenant Info */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/30 text-xs">
          {!collapsed ? (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">System Status</span>
                <span className="text-emerald-400 font-mono text-[9px] bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-800/50">
                  Active
                </span>
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {user?.organization?.name || 'Enterprise Tenant'}
              </div>
            </div>
          ) : (
            <div className="flex justify-center" title={user?.organization?.name || 'Tenant'}>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          )}
        </div>
      </aside>

      {/* 2. MOBILE DRAWER (OVERLAY) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Drawer content */}
          <div className="relative w-72 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div>
              <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40">
                <Link to="/" onClick={onCloseMobile} className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md font-bold text-sm tracking-tight">
                    PS
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm tracking-tight flex items-center space-x-1">
                      <span>PeopleSphere</span>
                      <span className="text-[9px] px-1.5 py-0.2 bg-brand-500/20 text-brand-300 font-mono rounded">
                        HRMS
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400">People First. Smarter.</div>
                  </div>
                </Link>

                <button
                  onClick={onCloseMobile}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {renderNavList(true)}
            </div>

            <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 text-xs">
              <div className="text-slate-300 font-medium">{user?.first_name} {user?.last_name}</div>
              <div className="text-[11px] text-slate-400 truncate">{user?.email}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}