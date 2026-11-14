import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  GraduationCap,
  Bell,
  Activity,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  UserPlus,
  LogOut,
  User,
  Settings,
} from 'lucide-react';
import { getHealthCheck } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import InviteUserModal from '../common/InviteUserModal';

export default function Header({ currentOrgType, setOrgType }) {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout, hasRole, hasPermission } = useAuth();

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

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    navigate('/login');
  };

  const userInitials = user?.first_name
    ? `${user.first_name[0]}${user.last_name ? user.last_name[0] : ''}`.toUpperCase()
    : 'PS';

  const canInvite = hasRole(['organization-admin', 'platform_admin', 'hr']) || hasPermission('employee.create');

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-10 font-sans">
        {/* Left: Organization context badge */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200 text-xs">
            {user?.organization?.org_type === 'COLLEGE' || currentOrgType === 'COLLEGE' ? (
              <GraduationCap className="w-4 h-4 text-brand-600 shrink-0" />
            ) : (
              <Building2 className="w-4 h-4 text-brand-600 shrink-0" />
            )}
            <span className="font-semibold text-slate-900 max-w-[200px] truncate">
              {user?.organization?.name || 'PeopleSphere Workspace'}
            </span>
          </div>

          <span className="text-[11px] text-slate-400 font-mono hidden md:inline">
            TENANT: {user?.organization?.code || 'ORG-001'}
          </span>
        </div>

        {/* Right: Health pill, invite button, user profile */}
        <div className="flex items-center space-x-3">
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
              {loading ? 'Checking...' : health?.database?.connected ? 'MySQL 8.0 Live' : 'Connecting DB...'}
            </span>
            {health?.database?.latency_ms !== undefined && (
              <span className="text-slate-400 text-[10px] font-mono">
                ({health.database.latency_ms}ms)
              </span>
            )}
          </div>

          {/* Quick Invite Button for Admin/HR */}
          {canInvite && (
            <button
              onClick={() => setInviteModalOpen(true)}
              className="hidden md:inline-flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors border border-brand-200/60"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Invite Member</span>
            </button>
          )}

          {/* User Profile Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {userInitials}
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-semibold text-slate-800 leading-tight">
                  {user?.full_name || `${user?.first_name || 'User'} ${user?.last_name || ''}`}
                </div>
                <div className="text-[10px] text-slate-500 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-brand-600" />
                  <span>{user?.role?.name || user?.role?.slug || 'Member'}</span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-50 text-xs animate-in fade-in-50 zoom-in-95 duration-100">
                <div className="px-3 py-2 border-b border-slate-100">
                  <div className="font-semibold text-slate-900 truncate">
                    {user?.full_name || `${user?.first_name || ''} ${user?.last_name || ''}`}
                  </div>
                  <div className="text-slate-500 font-mono text-[11px] truncate">{user?.email}</div>
                  <div className="mt-1">
                    <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 uppercase font-semibold">
                      {user?.role?.slug || 'employee'}
                    </span>
                  </div>
                </div>

                {canInvite && (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setInviteModalOpen(true);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-700 flex items-center space-x-2"
                  >
                    <UserPlus className="w-4 h-4 text-brand-600" />
                    <span>Invite Team Member</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/app/settings');
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-700 flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Organization Settings</span>
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 hover:bg-rose-50 text-rose-600 flex items-center space-x-2 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Invite Modal */}
      <InviteUserModal isOpen={inviteModalOpen} onClose={() => setInviteModalOpen(false)} />
    </>
  );
}
