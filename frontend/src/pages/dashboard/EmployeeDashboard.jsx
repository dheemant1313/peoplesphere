import React, { useState, useEffect } from 'react';
import {
  Clock,
  LogIn,
  LogOut,
  CalendarCheck,
  CreditCard,
  CalendarDays,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Download,
  Info,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import dashboardService from '../../services/dashboardService';
import { useToast } from '../../hooks/useToast';
import { formatCurrency } from '../../utils/formatters';

export default function EmployeeDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clockLoading, setClockLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const { showToast } = useToast();

  // Digital clock timer for top card
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchEmployeeData = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await dashboardService.getEmployeeDashboard();
      setData(result);
    } catch (err) {
      console.error('Failed to load employee dashboard:', err);
      const msg = err.response?.data?.detail || 'Failed to retrieve your self-service dashboard.';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const handleClockIn = async () => {
    setClockLoading(true);
    try {
      const res = await dashboardService.clockIn();
      showToast(res.message || 'Clock-in recorded successfully! Have a great day.', 'success');
      await fetchEmployeeData();
    } catch (err) {
      console.error('Clock-in failed:', err);
      showToast(err.response?.data?.detail || 'Clock-in failed. Please try again.', 'error');
    } finally {
      setClockLoading(false);
    }
  };

  const handleClockOut = async () => {
    setClockLoading(true);
    try {
      const res = await dashboardService.clockOut();
      showToast(res.message || 'Clock-out recorded. Have a great evening!', 'success');
      await fetchEmployeeData();
    } catch (err) {
      console.error('Clock-out failed:', err);
      showToast(err.response?.data?.detail || 'Clock-out failed. Please try again.', 'error');
    } finally {
      setClockLoading(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-28 bg-white border border-slate-200 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-64 bg-white border border-slate-200 rounded-xl" />
          <div className="h-64 bg-white border border-slate-200 rounded-xl" />
          <div className="h-64 bg-white border border-slate-200 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="p-8 bg-rose-50 border border-rose-200 rounded-2xl text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-600 mx-auto" />
        <div className="space-y-1">
          <h3 className="text-base font-bold text-rose-900">Self-Service Dashboard Unavailable</h3>
          <p className="text-xs text-rose-700">{error}</p>
        </div>
        <Button size="sm" onClick={fetchEmployeeData}>
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          <span>Retry Loading</span>
        </Button>
      </div>
    );
  }

  const { welcome, today_attendance, leave_balances, recent_leave_applications, latest_payslip, upcoming_holidays } =
    data || {};

  const getAttendanceStatusBadge = (status) => {
    switch (status) {
      case 'PRESENT':
        return <Badge variant="success">Clocked In / Present</Badge>;
      case 'LATE':
        return <Badge variant="warning">Clocked In (Late)</Badge>;
      case 'HALF_DAY':
        return <Badge variant="warning">Half Day</Badge>;
      case 'ON_LEAVE':
        return <Badge variant="info">On Approved Leave</Badge>;
      case 'NOT_CHECKED_IN':
        return <Badge variant="neutral">Not Checked In</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getLeaveStatusBadge = (status) => {
    switch (status) {
      case 'APPROVED':
        return <Badge variant="success" size="sm">Approved</Badge>;
      case 'PENDING':
        return <Badge variant="warning" size="sm">Pending Approval</Badge>;
      case 'REJECTED':
        return <Badge variant="error" size="sm">Rejected</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Personalized Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium bg-brand-500/20 text-brand-300 border border-brand-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Employee Self-Service Portal</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              {welcome?.greeting}, {welcome?.employee_name}!
            </h1>
            <p className="text-xs md:text-sm text-slate-300 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>{welcome?.department}</span>
              <span className="text-slate-500">•</span>
              <span>{welcome?.designation}</span>
              <span className="text-slate-500">•</span>
              <span className="font-mono text-brand-300">{welcome?.employee_code}</span>
            </p>
          </div>

          {/* Live Clock & Date Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 text-right self-start md:self-auto min-w-[200px]">
            <div className="text-2xl font-mono font-bold tracking-wider text-white">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="text-xs text-slate-300 mt-0.5">{welcome?.today_formatted}</div>
          </div>
        </div>
      </div>

      {/* Main Row: Clock-In/Out Action Widget (Left) + Leave Balances Grid (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Action Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-brand-600" />
                <h2 className="text-base font-bold text-slate-900">Today's Attendance</h2>
              </div>
              {getAttendanceStatusBadge(today_attendance?.status)}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-medium text-slate-400 block">Check-In</span>
                <span className="text-base font-semibold text-slate-800 font-mono mt-0.5 block">
                  {today_attendance?.check_in_time || '—:—'}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-medium text-slate-400 block">Check-Out</span>
                <span className="text-base font-semibold text-slate-800 font-mono mt-0.5 block">
                  {today_attendance?.check_out_time || '—:—'}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-500 pt-1">
              Logged Hours Today:{' '}
              <strong className="text-slate-800 font-mono font-bold">
                {today_attendance?.working_hours?.toFixed(2) || '0.00'} hrs
              </strong>
            </div>
          </div>

          {/* Interactive Clock Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            {today_attendance?.can_clock_in && (
              <button
                onClick={handleClockIn}
                disabled={clockLoading}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-sm transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <LogIn className="w-4 h-4" />
                <span>{clockLoading ? 'Recording Clock-In...' : 'Clock In Now'}</span>
              </button>
            )}

            {today_attendance?.can_clock_out && (
              <button
                onClick={handleClockOut}
                disabled={clockLoading}
                className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm shadow-sm transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <LogOut className="w-4 h-4" />
                <span>{clockLoading ? 'Recording Clock-Out...' : 'Clock Out Now'}</span>
              </button>
            )}

            {!today_attendance?.can_clock_in && !today_attendance?.can_clock_out && (
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                Daily attendance completed for today.
              </div>
            )}
          </div>
        </div>

        {/* Leave Balances Grid (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Annual Leave Quota</h2>
              <p className="text-xs text-slate-500">Allocated allowances, used days, and real-time remaining balances</p>
            </div>
            <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              Year {new Date().getFullYear()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {(!leave_balances || leave_balances.length === 0) ? (
              <div className="col-span-3 text-center py-8 text-slate-400 text-xs">
                No leave allocations assigned to this profile yet.
              </div>
            ) : (
              leave_balances.map((b) => {
                const usedPct = b.allocated > 0 ? Math.min(100, Math.round((b.used / b.allocated) * 100)) : 0;
                return (
                  <div
                    key={b.leave_type_id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-900">{b.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-700">
                        {b.code}
                      </span>
                    </div>

                    <div className="flex items-baseline space-x-1.5">
                      <span className="text-3xl font-bold text-slate-900">{b.balance}</span>
                      <span className="text-xs text-slate-500 font-medium">/ {b.allocated} days</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-brand-600 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${usedPct}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>{b.used} used</span>
                        {b.pending > 0 && <span className="text-amber-600">{b.pending} pending</span>}
                        <span>{b.balance} left</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Secondary Row: Recent Leave Applications (Left) + Latest Payslip & Holidays (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leave Applications (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-brand-600" />
                <h3 className="text-sm font-semibold text-slate-900">Recent Leave Applications</h3>
              </div>
              <span className="text-xs text-slate-400">My Leave History</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                  <tr>
                    <th className="py-2.5 px-4">Leave Type</th>
                    <th className="py-2.5 px-3">Date Range</th>
                    <th className="py-2.5 px-3">Days</th>
                    <th className="py-2.5 px-3">Reason</th>
                    <th className="py-2.5 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {(!recent_leave_applications || recent_leave_applications.length === 0) ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        You have not submitted any leave requests yet.
                      </td>
                    </tr>
                  ) : (
                    recent_leave_applications.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-900">{req.leave_type}</td>
                        <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                          {req.start_date} – {req.end_date}
                        </td>
                        <td className="py-3 px-3 font-semibold text-slate-800">{req.total_days}d</td>
                        <td className="py-3 px-3 text-slate-500 max-w-xs truncate">{req.reason || '—'}</td>
                        <td className="py-3 px-4 text-right">{getLeaveStatusBadge(req.status)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Latest Payslip Summary & Holidays */}
        <div className="space-y-6">
          {/* Latest Payslip Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-brand-600" />
                <h3 className="text-sm font-semibold text-slate-900">Latest Payslip</h3>
              </div>
              <Badge variant="success" size="sm">Published</Badge>
            </div>

            {latest_payslip ? (
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-xs font-semibold text-slate-900">{latest_payslip.period_name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Ref: {latest_payslip.payslip_number} • Issued: {latest_payslip.generated_at}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
                    <span className="text-[10px] text-emerald-800 font-medium block">Take-Home (Net)</span>
                    <span className="text-base font-bold text-emerald-700 font-mono block mt-0.5">
                      {formatCurrency(latest_payslip.net_pay)}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-medium block">Gross Earnings</span>
                    <span className="text-sm font-semibold text-slate-800 font-mono block mt-0.5">
                      {formatCurrency(latest_payslip.gross_pay)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs">
                No finalized payslip records published for your account yet.
              </div>
            )}
          </div>

          {/* Upcoming Holidays */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CalendarDays className="w-4 h-4 text-brand-600" />
                <h3 className="text-sm font-semibold text-slate-900">Upcoming Holidays</h3>
              </div>
              <span className="text-[11px] text-slate-400">Calendar</span>
            </div>

            <div className="space-y-2">
              {(!upcoming_holidays || upcoming_holidays.length === 0) ? (
                <p className="text-xs text-slate-400 text-center py-4">No upcoming holidays scheduled.</p>
              ) : (
                upcoming_holidays.map((h) => (
                  <div
                    key={h.id}
                    className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-800">{h.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{h.date}</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-brand-50 text-brand-700 font-semibold rounded-full border border-brand-200/60">
                      {h.days_away === 0 ? 'Today' : `in ${h.days_away}d`}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}