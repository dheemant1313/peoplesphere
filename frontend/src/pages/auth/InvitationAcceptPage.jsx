import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Building2, ShieldCheck, ArrowRight, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '../../components/forms/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/useToast';
import authService from '../../services/authService';

export default function InvitationAcceptPage() {
  const { token } = useParams();
  const [invitation, setInvitation] = useState(null);
  const [isValidating, setIsValidating] = useState(true);
  const [validationError, setValidationError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    async function validateToken() {
      if (!token) {
        setValidationError('No invitation token provided in URL.');
        setIsValidating(false);
        return;
      }

      try {
        const data = await authService.getInvitation(token);
        setInvitation(data);
      } catch (err) {
        console.error('Validation error:', err);
        const msg =
          err.response?.data?.message ||
          'This invitation link is invalid, expired, or has already been accepted.';
        setValidationError(msg);
      } finally {
        setIsValidating(false);
      }
    }

    validateToken();
  }, [token]);

  const handleAccept = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!firstName.trim() || !lastName.trim()) {
      setSubmitError('First name and last name are required.');
      return;
    }
    if (!password || password.length < 8) {
      setSubmitError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setSubmitError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await authService.acceptInvitation(token, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        password,
      });

      setIsAccepted(true);
      showToast('Account activated! Signing you in...', 'success');

      // Auto sign-in
      try {
        await login(invitation.email, password);
        setTimeout(() => {
          navigate('/app');
        }, 1500);
      } catch {
        navigate('/login');
      }
    } catch (err) {
      console.error('Accept error:', err);
      const msg = err.response?.data?.message || 'Failed to accept invitation. Please try again.';
      setSubmitError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (isValidating) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-10 h-10 rounded-xl bg-brand-600/10 border border-brand-200 flex items-center justify-center animate-pulse">
          <div className="w-4 h-4 rounded-full bg-brand-600 animate-spin" />
        </div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Validating invitation token...
        </p>
      </div>
    );
  }

  if (validationError) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 max-w-md w-full text-center space-y-5 shadow-subtle">
          <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">Invitation Expired or Invalid</h2>
            <p className="text-xs text-slate-500">{validationError}</p>
          </div>
          <div className="pt-2">
            <Button className="w-full" onClick={() => navigate('/login')}>
              Go to Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isAccepted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 max-w-md w-full text-center space-y-5 shadow-subtle animate-in zoom-in-95 duration-200">
          <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">Account Activated!</h2>
            <p className="text-xs text-slate-500">
              Welcome to <strong>{invitation.organization_name}</strong>. Taking you into your workspace...
            </p>
          </div>
          <div className="pt-2">
            <Button className="w-full" onClick={() => navigate('/app')}>
              Open Workspace
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 max-w-md w-full shadow-subtle space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-brand-600 text-white font-bold text-base flex items-center justify-center mx-auto shadow-sm">
            PS
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Join Your Team</h2>
          <p className="text-xs text-slate-500">
            Accept invitation to access your organization's workspace
          </p>
        </div>

        {/* Invitation Context Card */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Organization:</span>
            <span className="font-semibold text-slate-900">{invitation?.organization_name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Invited Email:</span>
            <span className="font-mono text-slate-800">{invitation?.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Role:</span>
            <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-brand-100 text-brand-700 uppercase font-semibold">
              {invitation?.role_slug}
            </span>
          </div>
        </div>

        {submitError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start space-x-2 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleAccept} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First Name *"
              placeholder="Alex"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <Input
              label="Last Name *"
              placeholder="Morgan"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Choose Password (minimum 8 characters) *
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
            label="Confirm Password *"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••••••"
            required
          />

          <Button type="submit" className="w-full" size="lg" isLoading={loading}>
            <span>Activate Account & Sign In</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
}
