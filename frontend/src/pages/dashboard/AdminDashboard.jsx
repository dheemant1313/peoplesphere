import React, { useState, useEffect } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  CalendarOff,
  Clock,
  CreditCard,
  TrendingUp,
  RefreshCw,
  Building2,
  Calendar,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Skeleton } from '../../components/common/Skeleton';
import dashboardService from '../../services/dashboardService';
import { useToast } from '../../hooks/useToast';

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateFilter, setDateFilter] = useState('14d');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const { showToast } = useToast();

  const fetchDashboard = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await dashboardService.getAdminDashboard({
        department_id: departmentFilter ? parseInt(departmentFilter) : undefined,
      });
      setData(result);
    } catch (err) {
      console.error('Failed to load admin dashboard:', err);
      const msg = err.response?.data?.detail || 'Failed to retrieve administrative metrics.';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [departmentFilter]);

  if (loading && !data) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-28 bg-white border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-1/2" />
              <div className="h-8 bg-slate-200 rounded w-3/4" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-72 bg-white border border-slate-200 rounded-xl p-4" />
          <div className="h-72 bg-white border border-slate-200 rounded-xl p-4" />
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="p-8 bg-rose-50 border border-rose-200 rounded-2xl text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-600 mx-auto" />
        <div className="space-y-1">
          <h3 className="text-base font-bold text-rose-900">Dashboard Unavailable</h3>
          <p className="text-xs text-rose-700">{error}</p>
        </div>
        <Button size="sm" onClick={fetchDashboard}>
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          <span>Retry Loading</span>
        </Button>
      </div>
    );
  }

  const { kpis, analytics, tables } = data || {};

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-50 text-brand-700 font-semibold uppercase tracking-wider border border-brand-200/60">
              Executive View
            </span>
            <span className="text-xs text-slate-400">Live MySQL 8.0 Aggregates</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Enterprise Command Center
          </h1>
          <p className="text-xs text-slate-500">
            Real-time workforce attendance, department distribution, payroll allocations, and governance activity.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start md:self-auto">
          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="">All Departments</option>
            {analytics?.department_distribution?.map((d) => (
              <option key={d.department} value={d.id || ''}>
                {d.department}
              </option>
            ))}
          </select>

          {/* Date Range Selector */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="today">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="14d">Last 14 Days</option>
            <option value="month">This Month</option>
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchDashboard}
            isLoading={loading}
            className="h-8"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* 6 KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total Employees */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-subtle space-y-1 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Staff</span>
            <Users className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">{kpis?.total_employees || 0}</div>
          <div className="text-[10px] text-slate-400">Active roster records</div>
        </div>

        {/* Present Today */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-subtle space-y-1 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">Present</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600 tracking-tight">{kpis?.present_today || 0}</div>
          <div className="text-[10px] text-emerald-700 font-semibold flex items-center">
            <span>{kpis?.present_rate_pct || 0}% attendance rate</span>
          </div>
        </div>

        {/* Absent Today */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-subtle space-y-1 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-700">Absent</span>
            <UserX className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-rose-600 tracking-tight">{kpis?.absent_today || 0}</div>
          <div className="text-[10px] text-slate-400">Unrecorded & absent</div>
        </div>

        {/* On Leave Today */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-subtle space-y-1 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">On Leave</span>
            <CalendarOff className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-600 tracking-tight">{kpis?.on_leave_today || 0}</div>
          <div className="text-[10px] text-slate-400">Approved time-off</div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-subtle space-y-1 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-700">Pending</span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600 tracking-tight">{kpis?.pending_approvals || 0}</div>
          <div className="text-[10px] text-slate-400">Leaves & corrections</div>
        </div>

        {/* Monthly Payroll Total */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-subtle space-y-1 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-700">Payroll Run</span>
            <CreditCard className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-bold text-slate-900 tracking-tight truncate">
            ${kpis?.monthly_payroll_total ? kpis.monthly_payroll_total.toLocaleString() : '0'}
          </div>
          <div className="text-[10px] text-slate-400 truncate">{kpis?.payroll_period_name || 'Active Cycle'}</div>
        </div>
      </div>

      {/* Analytics Row 1: Attendance Trend & Department Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend Chart */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Attendance Trajectory</h2>
              <p className="text-[11px] text-slate-500">Daily present vs late vs absent counts (last 14 days)</p>
            </div>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Live Trend
            </span>
          </div>

          <div className="h-64 w-full">
            {analytics?.attendance_trend && analytics.attendance_trend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.attendance_trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="presentGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="lateGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      fontSize: '11px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area type="monotone" dataKey="present" name="Present" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#presentGrad)" />
                  <Area type="monotone" dataKey="late" name="Late Mark" stroke="#f59e0b" strokeWidth={1.5} fillOpacity={1} fill="url(#lateGrad)" />
                  <Area type="monotone" dataKey="absent" name="Absent" stroke="#ef4444" strokeWidth={1.5} fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                No attendance trend data recorded yet.
              </div>
            )}
          </div>
        </div>

        {/* Department Distribution Chart */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Workforce by Department</h2>
              <p className="text-[11px] text-slate-500">Employee headcount distribution across organization units</p>
            </div>
            <Building2 className="w-4 h-4 text-slate-400" />
          </div>

          <div className="h-64 w-full">
            {analytics?.department_distribution && analytics.department_distribution.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analytics.department_distribution}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="department" tick={{ fontSize: 10, fill: '#334155' }} axisLine={false} tickLine={false} width={110} />
                  <Tooltip
                    formatter={(val) => [`${val} staff`, 'Headcount']}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      fontSize: '11px',
                    }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                No department records configured.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Row 2: Payroll Expenditure & Leave Utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Payroll Expenditure */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Payroll Expenditure Trend</h2>
              <p className="text-[11px] text-slate-500">Gross payout vs statutory deductions and net disbursements</p>
            </div>
            <CreditCard className="w-4 h-4 text-slate-400" />
          </div>

          <div className="h-64 w-full">
            {analytics?.payroll_trend && analytics.payroll_trend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.payroll_trend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => `$${val / 1000}k`}
                  />
                  <Tooltip
                    formatter={(val) => [`$${Number(val).toLocaleString()}`, '']}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      fontSize: '11px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="gross" name="Gross Pay" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="net" name="Net Disbursed" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="deductions" name="Deductions" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                No past payroll records available.
              </div>
            )}
          </div>
        </div>

        {/* Leave Utilization Breakdown */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Leave Quota Utilization</h2>
              <p className="text-[11px] text-slate-500">Allocated vs utilized annual quota by leave category</p>
            </div>
            <Calendar className="w-4 h-4 text-slate-400" />
          </div>

          <div className="h-64 w-full">
            {analytics?.leave_utilization && analytics.leave_utilization.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.leave_utilization} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="leave_type" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(val) => [`${val} days`, '']}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      fontSize: '11px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="used" name="Days Used" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="remaining" name="Remaining Quota" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                No leave allocations recorded.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tables Section: Recent Employees, Pending Requests & Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Employees Table */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-subtle space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Recent Onboarding
            </h3>
            <span className="text-[11px] font-semibold text-brand-600">Last 5</span>
          </div>

          <div className="space-y-2">
            {tables?.recent_employees?.length > 0 ? (
              tables.recent_employees.map((emp) => (
                <div
                  key={emp.id}
                  className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-colors flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-semibold text-slate-900 flex items-center space-x-1.5">
                      <span>{emp.full_name}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                        {emp.employee_code}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {emp.designation} • {emp.department}
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400">{emp.date_of_joining}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-4 text-center">No employee records found.</p>
            )}
          </div>
        </div>

        {/* Pending Requests Table */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-subtle space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Pending Approvals
            </h3>
            <Badge variant="warning">{tables?.pending_requests?.length || 0} Actionable</Badge>
          </div>

          <div className="space-y-2">
            {tables?.pending_requests?.length > 0 ? (
              tables.pending_requests.map((req) => (
                <div
                  key={req.id}
                  className="p-2.5 rounded-xl border border-amber-100 bg-amber-50/30 hover:bg-amber-50/60 transition-colors space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between font-semibold text-slate-900">
                    <span>{req.employee_name}</span>
                    <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                      {req.total_days}d {req.leave_type}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{req.reason}</div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    {req.start_date} – {req.end_date}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-slate-400 space-y-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                <p>All approval queues clear.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Table (Audit Logs) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-subtle space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Governance Audit Log
            </h3>
            <ShieldCheck className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-2">
            {tables?.recent_activity?.length > 0 ? (
              tables.recent_activity.map((act) => (
                <div
                  key={act.id}
                  className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors space-y-0.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800 text-[11px] font-mono uppercase">
                      {act.action}
                    </span>
                    <span className="text-[10px] text-slate-400">{act.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 truncate">{act.description}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-4 text-center">No recent audit logs.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
