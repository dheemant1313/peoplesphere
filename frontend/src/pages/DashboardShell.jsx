import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  CalendarCheck, 
  CreditCard, 
  Database, 
  Server, 
  ShieldCheck, 
  Layers, 
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { getHealthCheck } from '../services/api';

export default function DashboardShell() {
  const { orgType } = useOutletContext();
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHealthCheck();
      setHealthData(data);
    } catch (err) {
      setError(err.message || 'Failed to reach API server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200/60 mb-2">
            <Sparkles className="w-3 h-3" />
            <span>PeopleSphere Enterprise Foundation</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            {orgType === 'CORPORATE' ? 'Apex Corporate Technologies' : 'St. John’s University & Medical College'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            "People First. Management Smarter." — Phase 1 Architecture Foundation is active.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchHealth}
            className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm flex items-center space-x-1.5"
          >
            <span>Refresh Diagnostics</span>
          </button>
          <div className="px-3.5 py-2 text-xs font-medium text-white bg-slate-900 rounded-lg shadow-sm flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Tenant Workspace: Isolated</span>
          </div>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              {orgType === 'CORPORATE' ? 'Total Employees' : 'Total Faculty & Staff'}
            </span>
            <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900">
              {orgType === 'CORPORATE' ? '248' : '412'}
            </span>
            <span className="text-xs text-emerald-600 font-medium flex items-center">
              +12 this mo.
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400">
            Across {orgType === 'CORPORATE' ? '6 Departments' : '8 Academic Faculties'}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Clocked-In Today</span>
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900">
              {orgType === 'CORPORATE' ? '236' : '395'}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              (95.2% rate)
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400">
            Server-side timestamp & biometric log
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Pending Leave Requests</span>
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900">14</span>
            <span className="text-xs text-amber-600 font-medium">
              Awaiting manager action
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400">
            Multi-level approval workflow
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Current Payroll Period</span>
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900">May 2026</span>
            <span className="text-xs text-purple-600 font-medium">
              Cycle Open
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400">
            Immutable snapshot on finalization
          </div>
        </div>
      </div>

      {/* Backend & Database Live Diagnostics Panel */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Server className="w-4 h-4 text-brand-600" />
            <h2 className="text-sm font-semibold text-slate-800">
              Backend API & MySQL 8.0 Live Connection Diagnostics
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            ENDPOINT: /api/v1/health
          </span>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-8 text-sm text-slate-500 space-x-2">
              <div className="w-4 h-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Connecting to PeopleSphere backend service...</span>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
              <div>
                <div className="font-semibold">Backend Connection Alert</div>
                <div className="text-xs mt-1">{error}</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* MySQL Status */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 flex items-center space-x-1.5">
                    <Database className="w-3.5 h-3.5 text-brand-600" />
                    <span>Database Engine</span>
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                    {healthData?.database?.connected ? 'CONNECTED' : 'DISCONNECTED'}
                  </span>
                </div>
                <div className="text-lg font-bold text-slate-900">
                  {healthData?.database?.database}
                </div>
                <div className="text-xs text-slate-500 space-y-1 pt-1 border-t border-slate-200/80 font-mono">
                  <div>Host: {healthData?.database?.host}:{healthData?.database?.port}</div>
                  <div>Query Latency: <span className="text-emerald-600 font-semibold">{healthData?.database?.latency_ms} ms</span></div>
                  <div>Engine: MySQL 8.0 Community Server</div>
                </div>
              </div>

              {/* FastAPI App Status */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 flex items-center space-x-1.5">
                    <Server className="w-3.5 h-3.5 text-brand-600" />
                    <span>Application Framework</span>
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-100 text-brand-800">
                    FASTAPI {healthData?.version}
                  </span>
                </div>
                <div className="text-lg font-bold text-slate-900">
                  {healthData?.project}
                </div>
                <div className="text-xs text-slate-500 space-y-1 pt-1 border-t border-slate-200/80 font-mono">
                  <div>Environment: {healthData?.environment}</div>
                  <div>Uptime: {healthData?.uptime_seconds}s</div>
                  <div>CORS & Security: Active</div>
                </div>
              </div>

              {/* Database Schema & Models Status */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5 text-brand-600" />
                    <span>Alembic Migrations</span>
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                    HEAD (APPLIED)
                  </span>
                </div>
                <div className="text-lg font-bold text-slate-900">
                  {healthData?.registered_tables_count} Tables Active
                </div>
                <div className="text-xs text-slate-500 space-y-1 pt-1 border-t border-slate-200/80 font-mono">
                  <div>Revision: 9ff88be700f1</div>
                  <div>Tenant Isolation: Enforced</div>
                  <div>Soft Delete & Audits: Registered</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Architecture & Phase Roadmap Checklist */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle">
        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>PeopleSphere HRMS — Foundation Architecture Status</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 flex items-start space-x-3">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-800">Multi-Tenant Isolation Architecture</div>
              <div className="text-slate-500 mt-0.5">
                Organizations, settings, and database records use server-side tenant isolation. organization_id is never trusted blindly from user input.
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 flex items-start space-x-3">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-800">MySQL 8.0 & Alembic Relational Schema</div>
              <div className="text-slate-500 mt-0.5">
                28 fully-normalized tables created with foreign keys, indexes, decimal math types, and soft deletion support.
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 flex items-start space-x-3">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-800">FastAPI REST API Core & Health Probes</div>
              <div className="text-slate-500 mt-0.5">
                Versioned /api/v1 router, centralized exception formatting, Swagger/OpenAPI docs, and live MySQL query latency monitoring.
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 flex items-start space-x-3">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-800">Enterprise UI Design System Shell</div>
              <div className="text-slate-500 mt-0.5">
                Tailwind CSS enterprise palette (Deep Navy, Slate, Muted Blue), Inter typography, responsive sidebar, and organization switcher.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
