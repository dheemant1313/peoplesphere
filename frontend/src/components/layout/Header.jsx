import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  Monitor,
  CheckCircle2,
  AlertCircle,
  Building2,
  GraduationCap,
  ChevronDown,
  UserPlus,
  LogOut,
  User,
  Settings,
  ShieldCheck,
  Clock,
  FileCheck,
  Check,
  X,
  CreditCard,
  Users,
} from 'lucide-react';
import { getHealthCheck } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import InviteUserModal from '../common/InviteUserModal';

export default function Header({ sidebarCollapsed, onToggleSidebar, onOpenMobile, theme, onThemeChange }) {
  const [health, setHealth] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Leave Request',
      description: 'Sarah Jenkins requested 2 days of Casual Leave.',
      time: '12m ago',
      unread: true,
      icon: FileCheck,
      color: 'text-amber-500 bg-amber-50',
    },
    {
      id: 2,
      title: 'October Payroll Finalized',
      description: 'All 12 payslips generated and published.',
      time: '1h ago',
      unread: true,
      icon: CreditCard,
      color: 'text-emerald-500 bg-emerald-50',
    },
    {
      id: 3,
      title: 'Daily Attendance Report',
      description: 'Attendance rate reached 85.7% today.',
      time: '3h ago',
      unread: false,
      icon: Clock,
      color: 'text-brand-500 bg-brand-50',
    },
  ]);

  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const themeRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, hasRole, hasPermission } = useAuth();

  // Health check polling
  useEffect(() => {
    let isMounted = true;
    const checkStatus = async () => {
      try {
        const data = await getHealthCheck();
        if (isMounted) setHealth(data);
      } catch (err) {
        if (isMounted) setHealth({ status: 'offline', database: { connected: false } });
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 20000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Keyboard shortcut Ctrl+K or Cmd+K for global search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(e.target)) {
        setThemeOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    navigate('/login');
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  const userInitials = user?.first_name
    ? `${user.first_name[0]}${user.last_name ? user.last_name[0] : ''}`.toUpperCase()
    : 'PS';

  const canInvite = hasRole(['organization-admin', 'platform_admin', 'hr']) || hasPermission('employee.create');

  // Breadcrumbs generation
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/app') return [{ name: 'PeopleSphere', href: '/app' }, { name: 'Dashboard' }];
    if (path.includes('employees'))
      return [{ name: 'PeopleSphere', href: '/app' }, { name: 'Workforce' }, { name: 'Employees & Faculty' }];
    if (path.includes('attendance'))
      return [{ name: 'PeopleSphere', href: '/app' }, { name: 'Operations' }, { name: 'Attendance & Clock-in' }];
    if (path.includes('shifts'))
      return [{ name: 'PeopleSphere', href: '/app' }, { name: 'Operations' }, { name: 'Shifts & Rosters' }];
    if (path.includes('leave'))
      return [{ name: 'PeopleSphere', href: '/app' }, { name: 'Leave Management' }, { name: 'Requests & Quotas' }];
    if (path.includes('salary'))
      return [{ name: 'PeopleSphere', href: '/app' }, { name: 'Compensation' }, { name: 'Salary Structures' }];
    if (path.includes('payroll'))
      return [{ name: 'PeopleSphere', href: '/app' }, { name: 'Finance' }, { name: 'Payroll Engine' }];
    if (path.includes('reports'))
      return [{ name: 'PeopleSphere', href: '/app' }, { name: 'Reports' }, { name: 'Payslips & Filings' }];
    if (path.includes('settings'))
      return [{ name: 'PeopleSphere', href: '/app' }, { name: 'Configuration' }, { name: 'Settings' }];
    if (path.includes('audit'))
      return [{ name: 'PeopleSphere', href: '/app' }, { name: 'Security' }, { name: 'Audit Trail' }];
    return [{ name: 'PeopleSphere', href: '/app' }, { name: 'Workspace' }];
  };

  const breadcrumbs = getBreadcrumbs();

  // Search quick links
  const searchQuickLinks = [
    { title: 'Dashboard Overview', path: '/app', category: 'Navigation' },
    { title: 'Employee Directory', path: '/app/employees', category: 'Workforce' },
    { title: 'Attendance Logs & Shifts', path: '/app/attendance', category: 'Operations' },
    { title: 'Leave Approvals', path: '/app/leave', category: 'Leave' },
    { title: 'Payroll Run & Payslips', path: '/app/payroll', category: 'Finance' },
    { title: 'System Security Audit Logs', path: '/app/audit', category: 'Governance' },
  ].filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between z-20 font-sans shadow-xs">
        {/* Left Section: Mobile Menu Button + Breadcrumbs */}
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Mobile hamburger button */}
          <button
            onClick={onOpenMobile}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 md:hidden"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-1.5 text-xs text-slate-500">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.name}>
                {idx > 0 && <span className="text-slate-300">/</span>}
                {crumb.href ? (
                  <Link
                    to={crumb.href}
                    className="hover:text-slate-900 font-medium text-slate-500 transition-colors"
                  >
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="font-semibold text-slate-900">{crumb.name}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Right Section: Global Search, Health, Notifications, Theme, Profile */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Global Search Button */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 text-xs transition-colors shadow-2xs"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline-block text-[10px] font-mono px-1 py-0.2 bg-white border border-slate-200 rounded text-slate-500">
              ⌘K
            </kbd>
          </button>

          {/* Database Health Pill */}
          <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
            <span
              className={`w-2 h-2 rounded-full ${
                health?.database?.connected ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
            />
            <span>{health?.database?.connected ? 'MySQL 8.0 Live' : 'DB Disconnected'}</span>
          </div>

          {/* Notifications Popover */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 relative transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-xs text-slate-900">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] bg-rose-100 text-rose-700 font-semibold rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-brand-600 hover:text-brand-700 font-medium"
                    >
                      Mark read
                    </button>
                  )}
                </div>

                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {notifications.map((n) => {
                    const Icon = n.icon;
                    return (
                      <div
                        key={n.id}
                        className={`p-3 flex items-start space-x-3 hover:bg-slate-50 transition-colors ${
                          n.unread ? 'bg-brand-50/20' : ''
                        }`}
                      >
                        <div className={`p-2 rounded-lg shrink-0 ${n.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-900 truncate">{n.title}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{n.description}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Theme Selector */}
          <div className="relative" ref={themeRef}>
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Theme settings"
            >
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {themeOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-50 text-xs">
                <button
                  onClick={() => {
                    onThemeChange('light');
                    setThemeOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg ${
                    theme === 'light' ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Sun className="w-3.5 h-3.5" />
                    <span>Light</span>
                  </div>
                  {theme === 'light' && <Check className="w-3.5 h-3.5 text-brand-600" />}
                </button>

                <button
                  onClick={() => {
                    onThemeChange('slate');
                    setThemeOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg ${
                    theme === 'slate' ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Slate</span>
                  </div>
                  {theme === 'slate' && <Check className="w-3.5 h-3.5 text-brand-600" />}
                </button>

                <button
                  onClick={() => {
                    onThemeChange('dark');
                    setThemeOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg ${
                    theme === 'dark' ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Moon className="w-3.5 h-3.5" />
                    <span>Dark</span>
                  </div>
                  {theme === 'dark' && <Check className="w-3.5 h-3.5 text-brand-600" />}
                </button>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
            >
              <div className="w-7 h-7 rounded-lg bg-brand-600 text-white font-semibold text-xs flex items-center justify-center shadow-xs">
                {userInitials}
              </div>
              <div className="hidden sm:block text-left text-xs">
                <div className="font-semibold text-slate-800 leading-tight">
                  {user?.first_name || 'Admin'}
                </div>
                <div className="text-[10px] text-slate-400 capitalize">
                  {user?.roles?.[0]?.name || 'Workforce'}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 text-xs divide-y divide-slate-100">
                <div className="p-2 space-y-1">
                  <div className="font-semibold text-slate-900 text-sm">
                    {user?.first_name} {user?.last_name}
                  </div>
                  <div className="text-slate-500 text-[11px] truncate">{user?.email}</div>
                  <div className="pt-1 flex items-center space-x-1.5">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-brand-50 text-brand-700 font-medium border border-brand-200/60">
                      {user?.roles?.[0]?.name || 'Administrator'}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate">
                      {user?.organization?.name}
                    </span>
                  </div>
                </div>

                <div className="py-1">
                  {canInvite && (
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        setInviteModalOpen(true);
                      }}
                      className="w-full flex items-center space-x-2.5 px-2.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-brand-600 rounded-lg transition-colors text-left"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-slate-400" />
                      <span>Invite Employee</span>
                    </button>
                  )}
                  <Link
                    to="/app/settings"
                    onClick={() => setProfileOpen(false)}
                    className="w-full flex items-center space-x-2.5 px-2.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-brand-600 rounded-lg transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>Organization Settings</span>
                  </Link>
                </div>

                <div className="pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2.5 px-2.5 py-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-left font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Search Palette Modal (Cmd+K) */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-3 border-b border-slate-200 flex items-center space-x-2.5">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search modules, features, or workforce records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2 max-h-72 overflow-y-auto divide-y divide-slate-50">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                Quick Navigation
              </div>
              {searchQuickLinks.map((item) => (
                <button
                  key={item.title}
                  onClick={() => {
                    setSearchModalOpen(false);
                    navigate(item.path);
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left transition-colors"
                >
                  <span className="text-xs font-medium text-slate-800">{item.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{item.category}</span>
                </button>
              ))}
            </div>

            <div className="p-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Press <kbd className="px-1 bg-white border rounded">ESC</kbd> to close</span>
              <span>PeopleSphere HRMS v1.0</span>
            </div>
          </div>
        </div>
      )}

      {/* Invite User Modal */}
      {inviteModalOpen && (
        <InviteUserModal isOpen={inviteModalOpen} onClose={() => setInviteModalOpen(false)} />
      )}
    </>
  );
}