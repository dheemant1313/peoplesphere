import React from 'react';
import { NavLink, Link } from 'react-router-dom';
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
  ExternalLink
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/app', icon: LayoutDashboard, end: true },
  { name: 'Employees & Faculty', href: '/app/employees', icon: Users, badge: '28' },
  { name: 'Attendance & Clock-in', href: '/app/attendance', icon: Clock },
  { name: 'Shifts & Schedules', href: '/app/shifts', icon: CalendarDays },
  { name: 'Leave & Approvals', href: '/app/leave', icon: FileCheck },
  { name: 'Salary & Structures', href: '/app/salary', icon: Layers },
  { name: 'Payroll Processing', href: '/app/payroll', icon: CreditCard },
  { name: 'Payslips & Reports', href: '/app/reports', icon: FileSpreadsheet },
  { name: 'Organization Settings', href: '/app/settings', icon: Settings },
  { name: 'Audit & Compliance', href: '/app/audit', icon: ShieldAlert },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div>
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center text-white shadow-sm font-bold text-sm tracking-tighter">
              PS
            </div>
            <div>
              <div className="text-white font-semibold text-sm tracking-tight flex items-center space-x-1">
                <span>PeopleSphere</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-brand-500/20 text-brand-400 font-mono rounded">HRMS</span>
              </div>
              <div className="text-[10px] text-slate-400 font-normal">
                People First. Smarter.
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1">
          <div className="px-3 pt-2 pb-1 text-[11px] font-semibold text-slate-400 tracking-wider uppercase flex items-center justify-between">
            <span>Workforce Suite</span>
            <Link to="/" className="text-[10px] text-brand-400 hover:text-brand-300 flex items-center space-x-0.5 normal-case font-normal">
              <span>Website</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </Link>
          </div>
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.end}
              className={({ isActive }) =>
                `group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`
              }
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-4 h-4 shrink-0 transition-colors" />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/30 text-xs text-slate-400">
        <div className="flex items-center justify-between mb-1">
          <span className="text-slate-400">Architecture</span>
          <span className="text-emerald-400 font-mono text-[10px] bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-800/50">
            Phase 2 Ready
          </span>
        </div>
        <div className="text-[11px] text-slate-400">
          FastAPI + MySQL 8.0 + React
        </div>
      </div>
    </aside>
  );
}
