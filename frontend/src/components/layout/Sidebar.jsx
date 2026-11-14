import React from 'react';
import { NavLink } from 'react-router-dom';
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
  ChevronRight
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Employees & Faculty', href: '/employees', icon: Users, badge: '28' },
  { name: 'Attendance & Clock-in', href: '/attendance', icon: Clock },
  { name: 'Shifts & Schedules', href: '/shifts', icon: CalendarDays },
  { name: 'Leave & Approvals', href: '/leave', icon: FileCheck },
  { name: 'Salary & Structures', href: '/salary', icon: Layers },
  { name: 'Payroll Processing', href: '/payroll', icon: CreditCard },
  { name: 'Payslips & Reports', href: '/reports', icon: FileSpreadsheet },
  { name: 'Organization Settings', href: '/settings', icon: Settings },
  { name: 'Audit & Compliance', href: '/audit', icon: ShieldAlert },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div>
        <div className="h-16 px-6 flex items-center space-x-3 border-b border-slate-800/80 bg-slate-950/40">
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
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1">
          <div className="px-3 pt-2 pb-1 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
            Workforce Management
          </div>
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
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
            Phase 1 Ready
          </span>
        </div>
        <div className="text-[11px] text-slate-400">
          FastAPI + MySQL 8.0 + React
        </div>
      </div>
    </aside>
  );
}
