import React, { useState, useEffect } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  CalendarOff,
  UserPlus,
  Clock,
  Briefcase,
  TrendingUp,
  FileCheck,
  Building2,
  RefreshCw,
  AlertCircle,
  ArrowRight,
  Filter,
  CheckCircle2,
  PieChart as PieChartIcon,
  Calendar,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import dashboardService from '../../services/dashboardService';
import { useToast } from '../../hooks/useToast';
import { formatNumber } from '../../utils/formatters';

const PIE_COLORS = ['#10b981', '#ef4444', '#f59e0b'];

export default function HrDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('ALL');

  const { showToast } = useToast();

  const fetchHrData = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await dashboardService.getHrDashboard();
      setData(result);
    } catch (err) {
      console.error('Failed to load HR dashboard:', err);
      const msg = err.response?.data?.detail || 'Failed to retrieve HR workforce metrics.';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHrData();
  }, []);

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
          <div className="h-72 bg-white border border-slate-200 rounded-xl" />
          <div className="h-72 bg-white border border-slate-200 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="p-8 bg-rose-50 border border-rose-200 rounded-2xl text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-600 mx-auto" />
        <div className="space-y-1">
          <h3 className="text-base font-bold text-rose-900">HR Workforce Data Unavailable</h3>
          <p className="text-xs text-rose-700">{error}</p>
        </div>
        <Button size="sm" onClick={fetchHrData}>
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          <span>Retry Loading</span>
        </Button>
      </div>
    );
  }

  const { kpis, attendance_overview, hiring_trends, department_distribution, recent_employees, pending_requests } =
    data || {};

  // Donut chart dataset
  const attendancePieData = [
    { name: 'Present', value: attendance_overview?.present || 0 },
    { name: 'Absent', value: attendance_overview?.absent || 0 },
    { name: 'On Leave', value: attendance_overview?.on_leave || 0 },
  ];

  const filteredEmployees =
    filterDepartment === 'ALL'
      ? recent_employees || []
      : (recent_employees || []).filter((e) => e.department === filterDepartment);

  const departmentsList = Array.from(new Set((recent_employees || []).map((e) => e.department))).filter(Boolean);

  return (
    <div className="space-y-6 font-sans">
      {/* Page Title & HR Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold uppercase tracking-wider border border-emerald-200/60">
              Human Resources View
            </span>
            <span className="text-xs text-slate-400">Live Workforce & Hiring Operations</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Workforce & Operations Center
          </h1>
          <p className="text-xs text-slate-500">
            Monitoring headcount, attendance health, pending leave requests, and hiring pipelines.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={fetchHrData} disabled={loading}>
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Total Employees */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Headcount</span>
            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {kpis?.total_employees || 0}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Active workforce</span>
          </div>
        </div>

        {/* Present Today */}
        <div className="bg-white p-4 rounded-xl border border-emerald-200/60 shadow-sm bg-gradient-to-b from-white to-emerald-50/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-800">Present Today</span>
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-emerald-700 tracking-tight">
              {kpis?.present_today || 0}
            </span>
            <span className="text-[11px] text-emerald-600 block mt-0.5">
              {kpis?.attendance_rate || 0}% turnout rate
            </span>
          </div>
        </div>

        {/* Absent Today */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Absent Today</span>
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <UserX className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-rose-600 tracking-tight">
              {kpis?.absent_today || 0}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Unexcused</span>
          </div>
        </div>

        {/* On Leave */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">On Leave</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <CalendarOff className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-amber-600 tracking-tight">
              {kpis?.on_leave_today || 0}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Approved absence</span>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Pending Leaves</span>
            <div className="p-1.5 rounded-lg bg-brand-50 text-brand-600">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-brand-700 tracking-tight">
              {kpis?.pending_leave_requests || 0}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Requires review</span>
          </div>
        </div>

        {/* New Joiners This Month */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">New Joiners</span>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <UserPlus className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-purple-700 tracking-tight">
              {kpis?.new_joiners_this_month || 0}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Joined this month</span>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid: Attendance Donut + 6-Month Hiring Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Breakdown Donut */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Today's Attendance Health</h2>
              <p className="text-xs text-slate-500">Proportional breakdown of active roster status</p>
            </div>
            <div className="p-1.5 bg-slate-100 rounded-lg text-slate-600">
              <PieChartIcon className="w-4 h-4" />
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendancePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {attendancePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val, name) => [`${val} staff`, name]}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(val) => <span className="text-xs text-slate-600 font-medium">{val}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 6-Month Hiring Trends Bar Chart */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Workforce Onboarding Trend</h2>
              <p className="text-xs text-slate-500">New employees joined over the past 6 months</p>
            </div>
            <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hiring_trends || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value) => [`${value} new hires`, 'Hired']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="joiners" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="New Joiners" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables Section: Recent Joiners & Pending Leave Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Employees Table with Department Filter */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-slate-600" />
                <h3 className="text-sm font-semibold text-slate-900">Recent Employee Roster</h3>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
                >
                  <option value="ALL">All Departments</option>
                  {departmentsList.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                  <tr>
                    <th className="py-2.5 px-4">Employee</th>
                    <th className="py-2.5 px-3">Department</th>
                    <th className="py-2.5 px-3">Designation</th>
                    <th className="py-2.5 px-3">Joined</th>
                    <th className="py-2.5 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredEmployees.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        No employees found matching filter.
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-medium text-slate-900">
                          <div>{emp.full_name}</div>
                          <span className="text-[10px] text-slate-400 font-mono">{emp.employee_code}</span>
                        </td>
                        <td className="py-3 px-3 text-slate-600">{emp.department}</td>
                        <td className="py-3 px-3 text-slate-500">{emp.designation}</td>
                        <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">{emp.date_of_joining}</td>
                        <td className="py-3 px-4 text-right">
                          <Badge variant={emp.status === 'ACTIVE' ? 'success' : 'neutral'} size="sm">
                            {emp.status}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pending Leave Requests */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-semibold text-slate-900">Pending Leave Approvals</h3>
              </div>
              <Badge variant="warning" size="sm">
                {pending_requests?.length || 0} Pending
              </Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                  <tr>
                    <th className="py-2.5 px-4">Employee</th>
                    <th className="py-2.5 px-3">Leave Type</th>
                    <th className="py-2.5 px-3">Period</th>
                    <th className="py-2.5 px-3">Days</th>
                    <th className="py-2.5 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {(!pending_requests || pending_requests.length === 0) ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                        No pending leave requests awaiting approval.
                      </td>
                    </tr>
                  ) : (
                    pending_requests.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-medium text-slate-900">
                          {req.employee_name}
                          {req.reason && <p className="text-[11px] text-slate-400 truncate max-w-xs">{req.reason}</p>}
                        </td>
                        <td className="py-3 px-3 text-slate-600">{req.leave_type}</td>
                        <td className="py-3 px-3 text-slate-500 text-[11px]">
                          {req.start_date} – {req.end_date}
                        </td>
                        <td className="py-3 px-3 font-semibold text-slate-800">{req.total_days}d</td>
                        <td className="py-3 px-4 text-right">
                          <Badge variant="warning" size="sm">
                            {req.status}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 text-right">
            <span className="text-[11px] text-slate-500">
              Department managers can approve/reject directly from their Team Manager portal.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}