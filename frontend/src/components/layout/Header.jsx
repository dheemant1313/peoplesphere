import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  GraduationCap, 
  Bell, 
  Activity, 
  ChevronDown, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck 
} from 'lucide-react';
import { getHealthCheck } from '../../services/api';

export default function Header({ currentOrgType, setOrgType }) {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const checkStatus = async () => {
      try {
        const data = await getHealthCheck();
        if (isMounted) {
          setHealth(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setHealth({ status: 'offline', database: { connected: false } });
          setLoading(false);
        }
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-10">
      {/* Left: Organization context switcher */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200/80">
          <button
            onClick={() => setOrgType('CORPORATE')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              currentOrgType === 'CORPORATE'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-brand-600" />
            <span>Apex Corporate Corp</span>
          </button>
          <button
            onClick={() => setOrgType('COLLEGE')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              currentOrgType === 'COLLEGE'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-brand-600" />
            <span>St. John's University</span>
          </button>
        </div>

        <span className="text-xs text-slate-400 font-mono hidden md:inline">
          TENANT ID: {currentOrgType === 'CORPORATE' ? 'ORG-CORP-01' : 'ORG-UNIV-02'}
        </span>
      </div>

      {/* Right: Health pill, notifications, user profile */}
      <div className="flex items-center space-x-4">
        {/* Backend & DB Health Indicator */}
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs">
          <span className="relative flex h-2 w-2">
            {health?.database?.connected ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </>
            ) : (
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            )}
          </span>
          <span className="text-slate-600 font-medium">
            {loading ? 'Checking...' : health?.database?.connected ? 'MySQL 8.0 Connected' : 'Connecting DB...'}
          </span>
          {health?.database?.latency_ms !== undefined && (
            <span className="text-slate-400 text-[10px] font-mono">
              ({health.database.latency_ms}ms)
            </span>
          )}
        </div>

        {/* Notifications */}
        <button 
          aria-label="Notifications"
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-500 rounded-full"></span>
        </button>

        {/* User Badge */}
        <div className="flex items-center space-x-3 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-medium text-xs">
            AD
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-slate-800 leading-tight">Admin Director</div>
            <div className="text-[10px] text-slate-500 flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-brand-600" />
              <span>Org Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
