import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';
import { Button } from '../components/common/Button';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, sessionExpired, clearSessionExpired } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-brand-600/10 border border-brand-200 flex items-center justify-center animate-pulse">
          <div className="w-5 h-5 rounded-lg bg-brand-600 animate-spin" />
        </div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Verifying security credentials...
        </p>
      </div>
    );
  }

  if (sessionExpired) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 max-w-sm w-full text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">Session Expired</h3>
            <p className="text-xs text-slate-500">
              Your security session has expired. Please sign in again to continue accessing your organization workspace.
            </p>
          </div>
          <Button
            className="w-full"
            onClick={() => {
              clearSessionExpired();
              window.location.href = `/login?redirect=${encodeURIComponent(location.pathname)}`;
            }}
          >
            Re-authenticate
          </Button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
}
