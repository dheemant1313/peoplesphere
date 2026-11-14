import React, { useState } from 'react';
import { Mail, UserPlus, Check, Copy, X, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { Input } from '../forms/Input';
import { useToast } from '../../hooks/useToast';
import authService from '../../services/authService';

export default function InviteUserModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [roleSlug, setRoleSlug] = useState('employee');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inviteResult, setInviteResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSendInvite = async (e) => {
    e.preventDefault();
    setError('');
    setInviteResult(null);

    if (!email.trim()) {
      setError('Please provide a valid work email.');
      return;
    }

    setLoading(true);
    try {
      const result = await authService.createInvitation({
        email: email.trim(),
        roleSlug,
      });
      setInviteResult(result);
      showToast(`Invitation created for ${email}!`, 'success');
    } catch (err) {
      console.error('Invite creation error:', err);
      const msg = err.response?.data?.message || err.response?.data?.detail || 'Failed to create user invitation.';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const inviteUrl = inviteResult?.token
    ? `${window.location.origin}/invite/${inviteResult.token}`
    : '';

  const handleCopyLink = () => {
    if (!inviteUrl) return;
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    showToast('Invitation link copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setEmail('');
    setRoleSlug('employee');
    setInviteResult(null);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-md w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Invite Team Member</h3>
              <p className="text-[11px] text-slate-500">
                Grant role-based workspace access to an employee or faculty
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              handleReset();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start space-x-2 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {inviteResult ? (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs text-emerald-900">
              <div className="font-semibold flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Single-Use Invitation Generated</span>
              </div>
              <p className="text-emerald-800 text-[11px]">
                Share this secure activation link with <strong>{inviteResult.email || email}</strong>:
              </p>
              <div className="p-2 bg-white rounded-lg border border-emerald-300 font-mono text-[10px] break-all select-all text-slate-800">
                {inviteUrl}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button type="button" className="flex-1" onClick={handleCopyLink}>
                {copied ? <Check className="w-4 h-4 mr-1.5" /> : <Copy className="w-4 h-4 mr-1.5" />}
                <span>{copied ? 'Copied Link' : 'Copy Invitation Link'}</span>
              </Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                Invite Another
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSendInvite} className="space-y-4">
            <Input
              label="Recipient Work Email *"
              type="email"
              placeholder="colleague@institution.edu or employee@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Assigned System Role *
              </label>
              <select
                value={roleSlug}
                onChange={(e) => setRoleSlug(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              >
                <option value="employee">Employee / Faculty (Personal profile, leaves, attendance)</option>
                <option value="manager">Manager / Department Head (Team approvals, roster schedules)</option>
                <option value="hr">HR Administrator (Workforce onboarding, leave policies, payroll)</option>
              </select>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  handleReset();
                  onClose();
                }}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={loading}>
                <span>Generate Invitation</span>
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
