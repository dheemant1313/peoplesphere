import React, { useState, useEffect } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  CalendarOff,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  AlertCircle,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  CalendarDays,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import dashboardService from '../../services/dashboardService';
import { useToast } from '../../hooks/useToast';

export default function ManagerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [rejectModalData, setRejectModalData] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const { showToast } = useToast();

  const fetchManagerData = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await dashboardService.getManagerDashboard();
      setData(result);
    } catch (err) {
      console.error('Failed to load manager dashboard:', err);
      const msg = err.response?.data?.detail || 'Failed to retrieve team dashboard metrics.';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManagerData();
  }, []);

  const handleLeaveAction = async (leaveId, action, comments = '') => {
    setActionLoadingId(leaveId);
    try {
      await dashboardService.actionLeaveRequest(leaveId, action, comments);
      showToast(
        action === 'APPROVED' ? 'Leave request successfully approved!' : 'Leave request rejected.',
        'success'
      );
      setRejectModalData(null);
      setRejectReason('');
      await fetchManagerData();
    } catch (err) {
      console.error('Failed to process leave action:', err);
      showToast(err.response?.data?.detail || 'Action failed. Please try again.', 'error');
    } finally {
      setActionLoadingId(null);
    }
  };

  if (loading && !data) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-28 bg-white border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-1/2" />
              <div className="h-8 bg-slate-200 rounded w-3/4" />
            </div>
          ))}
        </div>
        <div className="h-72 bg-white border border-slate-200 rounded-xl" />
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="p-8 bg-rose-50 border border-rose-200 rounded-2xl text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-600 mx-auto" />
        <div className="space-y-1">
          <h3 className="text-base font-bold text-rose-900">Team Dashboard Unavailable</h3>
          <p className="text-xs text-rose-700">{error}</p>
        </div>
        <Button size="sm" onClick={fetchManagerData}>
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          <span>Retry Loading</span>
        </Button>
      </div>
    );
  }

  const { kpis, team_attendance_table, pending_leave_approvals, upcoming_holidays } = data || {};

  // Filter team attendance table
  const filteredTeam = (team_attendance_table || []).filter((member) => {
    const matchesSearch =
      member.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.employee_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.designation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL'
        ? true
        : statusFilter === 'PRESENT'
        ? ['PRESENT', 'LATE', 'HALF_DAY'].includes(member.status)
        : member.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getAttendanceStatusBadge = (status) => {
    switch (status) {
      case 'PRESENT':
        return <Badge variant="success" size="sm">Present</Badge>;
      case 'LATE':
        return <Badge variant="warning" size="sm">Late</Badge>;
      case 'HALF_DAY':
        return <Badge variant="warning" size="sm">Half-Day</Badge>;
      case 'ON_LEAVE':
        return <Badge variant="info" size="sm">On Leave</Badge>;
      case 'NOT_CHECKED_IN':
        return <Badge variant="neutral" size="sm">Not Checked In</Badge>;
      case 'ABSENT':
        return <Badge variant="error" size="sm">Absent</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold uppercase tracking-wider border border-indigo-200/60">
              Department Manager
            </span>
            <span className="text-xs text-slate-400">Team Operations & Approvals</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Team Management Dashboard
          </h1>
          <p className="text-xs text-slate-500">
            Real-time visibility into your direct reports, live shifts, and pending team requests.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={fetchManagerData} disabled={loading}>
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Team Size */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Assigned Team</span>
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {kpis?.team_size || 0}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Direct reports</span>
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
              {kpis?.attendance_rate || 0}% active
            </span>
          </div>
        </div>

        {/* Absent Today */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Absent / Not In</span>
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <UserX className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-rose-600 tracking-tight">
              {kpis?.absent_today || 0}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Pending check-in</span>
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
            <span className="text-[11px] text-slate-400 block mt-0.5">Approved off</span>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Pending Actions</span>
            <div className="p-1.5 rounded-lg bg-brand-50 text-brand-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-brand-700 tracking-tight">
              {kpis?.pending_approvals || 0}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Awaiting decision</span>
          </div>
        </div>
      </div>

      {/* Pending Leave Approvals Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm font-semibold text-slate-900">Pending Leave Approvals</h2>
            <Badge variant="warning" size="sm">
              {pending_leave_approvals?.length || 0}
            </Badge>
          </div>
          <span className="text-xs text-slate-500">Decisions update employee balances immediately</span>
        </div>

        <div className="divide-y divide-slate-100">
          {(!pending_leave_approvals || pending_leave_approvals.length === 0) ? (
            <div className="p-8 text-center text-slate-400">
              <CheckCircle2 className="w-7 h-7 text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-700">Inbox Zero</p>
              <p className="text-xs text-slate-400 mt-0.5">All team leave requests have been reviewed.</p>
            </div>
          ) : (
            pending_leave_approvals.map((req) => (
              <div
                key={req.id}
                className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-slate-900 text-sm">{req.employee_name}</span>
                    <Badge variant="neutral" size="sm">{req.leave_type}</Badge>
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {req.total_days} {req.total_days === 1 ? 'Day' : 'Days'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center space-x-4">
                    <span>
                      Duration: <strong className="text-slate-700">{req.start_date}</strong> to{' '}
                      <strong className="text-slate-700">{req.end_date}</strong>
                    </span>
                    {req.reason && (
                      <span className="italic text-slate-600">"{req.reason}"</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleLeaveAction(req.id, 'APPROVED')}
                    disabled={actionLoadingId === req.id}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors disabled:opacity-50"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>

                  <button
                    onClick={() => setRejectModalData(req)}
                    disabled={actionLoadingId === req.id}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Grid: Team Attendance Table (Left) + Upcoming Holidays & Team Absences (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Attendance Table (2 cols wide) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Today's Team Roster & Attendance</h3>
                <p className="text-xs text-slate-500">Live shift tracking for department members</p>
              </div>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search member..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500 w-36 sm:w-44"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PRESENT">Present / Active</option>
                  <option value="ON_LEAVE">On Leave</option>
                  <option value="NOT_CHECKED_IN">Not Checked In</option>
                  <option value="ABSENT">Absent</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                  <tr>
                    <th className="py-2.5 px-4">Member</th>
                    <th className="py-2.5 px-3">Designation</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Clock-In</th>
                    <th className="py-2.5 px-3">Clock-Out</th>
                    <th className="py-2.5 px-4 text-right">Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredTeam.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        No team members found matching search/filter.
                      </td>
                    </tr>
                  ) : (
                    filteredTeam.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-medium text-slate-900">
                          <div>{m.full_name}</div>
                          <span className="text-[10px] text-slate-400 font-mono">{m.employee_code}</span>
                        </td>
                        <td className="py-3 px-3 text-slate-600">{m.designation}</td>
                        <td className="py-3 px-3">{getAttendanceStatusBadge(m.status)}</td>
                        <td className="py-3 px-3 font-mono text-[11px] text-slate-600">{m.check_in}</td>
                        <td className="py-3 px-3 font-mono text-[11px] text-slate-600">{m.check_out}</td>
                        <td className="py-3 px-4 text-right font-semibold text-slate-800">
                          {m.working_hours > 0 ? `${m.working_hours.toFixed(1)} hrs` : '—'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Upcoming Holidays & Quick Team Notes */}
        <div className="space-y-6">
          {/* Upcoming Holidays */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CalendarDays className="w-4 h-4 text-brand-600" />
                <h3 className="text-sm font-semibold text-slate-900">Upcoming Holidays</h3>
              </div>
              <span className="text-[11px] text-slate-400">Org Calendar</span>
            </div>

            <div className="space-y-2.5">
              {(!upcoming_holidays || upcoming_holidays.length === 0) ? (
                <p className="text-xs text-slate-400 text-center py-4">No holidays scheduled in the near future.</p>
              ) : (
                upcoming_holidays.map((h) => (
                  <div
                    key={h.id}
                    className="p-3 rounded-lg border border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-800">{h.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{h.date}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] px-2 py-0.5 bg-brand-50 text-brand-700 font-semibold rounded-full border border-brand-200/60">
                        {h.days_away === 0 ? 'Today' : `in ${h.days_away} days`}
                      </span>
                      {h.is_optional && (
                        <span className="block text-[9px] text-slate-400 mt-0.5">Optional</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Manager Best Practice Card */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-indigo-300">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Manager Quick Note</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Timely review of leave requests prevents shift bottlenecks and keeps payroll calculation accurate at month-end.
            </p>
          </div>
        </div>
      </div>

      {/* Rejection Modal */}
      {rejectModalData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center space-x-2 text-rose-600">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-bold text-base text-slate-900">Reject Leave Request</h3>
            </div>
            <p className="text-xs text-slate-600">
              Rejecting request for <strong>{rejectModalData.employee_name}</strong> ({rejectModalData.leave_type},{' '}
              {rejectModalData.total_days} days).
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Reason for rejection (optional):</label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Explain why this request is declined..."
                rows={3}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setRejectModalData(null);
                  setRejectReason('');
                }}
              >
                Cancel
              </Button>
              <button
                onClick={() => handleLeaveAction(rejectModalData.id, 'REJECTED', rejectReason)}
                disabled={actionLoadingId === rejectModalData.id}
                className="px-3.5 py-1.5 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors disabled:opacity-50"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}