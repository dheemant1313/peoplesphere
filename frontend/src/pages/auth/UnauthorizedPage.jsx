import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, LogOut } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export default function UnauthorizedPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const customReason = location.state?.reason;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 max-w-md w-full text-center space-y-6 shadow-subtle">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-semibold tracking-wider text-rose-600 uppercase bg-rose-50 px-2.5 py-1 rounded-full">
            403 Forbidden
          </span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Access Restricted</h2>
          <p className="text-xs text-slate-500">
            {customReason ||
              "Your account role does not possess the permissions required to view or manage this workforce module."}
          </p>
        </div>

        {user && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs text-left">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Logged in as:</span>
              <span className="font-semibold text-slate-900 truncate max-w-[200px]">
                {user.full_name || `${user.first_name || ''} ${user.last_name || ''}` || user.email}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Organization:</span>
              <span className="font-semibold text-slate-800">{user.organization?.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Assigned Role:</span>
              <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-200 text-slate-800 uppercase font-semibold">
                {user.role?.name || user.role?.slug || 'Standard Employee'}
              </span>
            </div>
          </div>
        )}

        <div className="space-y-2 pt-2">
          <Button className="w-full" onClick={() => navigate('/app')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Return to Workspace Dashboard</span>
          </Button>

          <Button variant="outline" className="w-full text-slate-600" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2 text-slate-400" />
            <span>Sign In with Different Account</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
