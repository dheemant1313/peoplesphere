import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { Input } from '../../components/forms/Input';
import { Button } from '../../components/common/Button';
import { useToast } from '../../hooks/useToast';
import authService from '../../services/authService';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get('token') || '';

  const [token, setToken] = useState(tokenFromUrl);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [tokenFromUrl]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!token.trim()) {
      setErrorMessage('A valid password reset token is required.');
      return;
    }
    if (!password || password.length < 8) {
      setErrorMessage('New password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword(token.trim(), password);
      setSuccess(true);
      showToast('Password has been successfully updated.', 'success');
      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch (err) {
      console.error('Reset password error:', err);
      const msg =
        err.response?.data?.message ||
        'Password reset failed. The token may be expired or already used.';
      setErrorMessage(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 max-w-md w-full shadow-subtle space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-brand-600 text-white font-bold text-base flex items-center justify-center mx-auto shadow-sm">
            PS
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Set New Password</h2>
          <p className="text-xs text-slate-500">
            Create a secure password for your PeopleSphere account
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start space-x-2 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {success ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="text-xs text-emerald-900 font-semibold">Password Successfully Updated</div>
            <p className="text-xs text-emerald-800">
              Your password has been changed. Redirecting to sign in...
            </p>
            <div className="pt-2">
              <Button size="sm" className="w-full" onClick={() => navigate('/login')}>
                Sign In Now
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <Input
              label="Reset Security Token *"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste token received in email or system prompt"
              required
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                New Password (minimum 8 characters) *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full px-3 py-2 pr-10 text-xs border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Input
              label="Confirm New Password *"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />

            <Button type="submit" className="w-full" size="lg" isLoading={loading}>
              <span>Update Password</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="pt-2 text-center">
              <Link to="/login" className="text-xs font-semibold text-slate-600 hover:text-slate-900">
                Cancel and return to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
