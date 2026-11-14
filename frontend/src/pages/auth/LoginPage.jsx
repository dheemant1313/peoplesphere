import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, Lock, Mail, Building2, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Input } from '../../components/forms/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/useToast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const redirectPath = searchParams.get('redirect') || '/app';
  const sessionExpiredNotice = searchParams.get('session_expired');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email.trim() || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const user = await login(email.trim(), password);
      showToast(`Welcome back, ${user.first_name || user.email}!`, 'success');
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.response?.data?.message || 'Invalid work email or password. Please verify your credentials.';
      setErrorMessage(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 max-w-md w-full shadow-subtle space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white font-bold text-base flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              PS
            </div>
          </Link>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Sign in to PeopleSphere</h2>
          <p className="text-xs text-slate-500">
            Workforce Management for Colleges & Enterprise Companies
          </p>
        </div>

        {/* Session Expired Banner if applicable */}
        {sessionExpiredNotice && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start space-x-2 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>Your session has expired for security. Please sign in again.</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start space-x-2 text-xs text-rose-800 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Work Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@institution.edu or name@company.io"
            required
            autoComplete="username"
          />

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">Password</label>
              <Link
                to="/forgot-password"
                className="text-xs font-medium text-brand-600 hover:text-brand-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                autoComplete="current-password"
                className="w-full px-3 py-2 pr-10 text-xs border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all font-sans"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                tabIndex="-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center space-x-2 cursor-pointer text-slate-600 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500/30"
              />
              <span>Remember me for 30 days</span>
            </label>
          </div>

          <Button type="submit" className="w-full" size="lg" isLoading={loading}>
            <span>Sign In to Workspace</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        {/* Demo Fast Access Pills */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center">
            Quick-Fill Demo Credentials
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemo('admin@apexcorp.io', 'ApexAdmin@2026')}
              className="p-2 text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] transition-colors group"
            >
              <div className="font-semibold text-slate-800 flex items-center justify-between">
                <span>Apex Corporate</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-mono">Company</span>
              </div>
              <div className="text-slate-500 font-mono truncate text-[10px]">admin@apexcorp.io</div>
            </button>

            <button
              type="button"
              onClick={() => fillDemo('dean@stjohns.edu', 'DeanAdmin@2026')}
              className="p-2 text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] transition-colors group"
            >
              <div className="font-semibold text-slate-800 flex items-center justify-between">
                <span>St. John's Univ</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-mono">College</span>
              </div>
              <div className="text-slate-500 font-mono truncate text-[10px]">dean@stjohns.edu</div>
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>New organization?</span>
          <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700 hover:underline">
            Register Workspace
          </Link>
        </div>
      </div>
    </div>
  );
}
