import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';
import { Input } from '../../components/forms/Input';
import { Button } from '../../components/common/Button';
import { useToast } from '../../hooks/useToast';
import authService from '../../services/authService';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resetToken, setResetToken] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { showToast } = useToast();

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email.trim()) {
      setErrorMessage('Please enter your work email.');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.forgotPassword(email.trim());
      setIsSubmitted(true);
      if (response.reset_token) {
        setResetToken(response.reset_token);
      }
      showToast('Password reset link generated successfully.', 'success');
    } catch (err) {
      console.error('Forgot password error:', err);
      const msg = err.response?.data?.message || 'Failed to request password reset. Please verify your email.';
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
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Reset Your Password</h2>
          <p className="text-xs text-slate-500">
            Enter your work email to receive password reset instructions
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start space-x-2 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isSubmitted ? (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 text-xs text-emerald-900">
              <div className="flex items-center space-x-2 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Reset Token Generated</span>
              </div>
              <p className="text-emerald-800">
                If an account exists for <strong>{email}</strong>, a password reset token has been issued.
              </p>
              {resetToken && (
                <div className="pt-2 border-t border-emerald-200 space-y-2">
                  <div className="text-[11px] font-mono bg-white p-2.5 rounded-lg border border-emerald-300 break-all text-slate-800 select-all">
                    {resetToken}
                  </div>
                  <Link
                    to={`/reset-password?token=${resetToken}`}
                    className="inline-flex items-center space-x-1.5 font-semibold text-brand-600 hover:text-brand-700 text-xs"
                  >
                    <span>Proceed directly to Reset Password page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            <Link to="/login" className="block text-center text-xs font-semibold text-slate-600 hover:text-slate-900">
              ← Return to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleRequestReset} className="space-y-4">
            <Input
              label="Work Email *"
              type="email"
              placeholder="name@company.com or faculty@institution.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />

            <Button type="submit" className="w-full" size="lg" isLoading={loading}>
              <span>Generate Reset Link</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="pt-2 text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
