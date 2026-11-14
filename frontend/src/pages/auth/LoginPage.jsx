import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, Building2 } from 'lucide-react';
import { Input } from '../../components/forms/Input';
import { Button } from '../../components/common/Button';
import { useToast } from '../../hooks/useToast';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@apexcorp.io');
  const [password, setPassword] = useState('ApexAdmin@2026');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Authenticated successfully as Organization Admin', 'success');
      navigate('/');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white rounded-xl border border-slate-200 p-8 max-w-sm w-full shadow-subtle space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-brand-600 text-white font-bold text-base flex items-center justify-center mx-auto shadow-sm">
            PS
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Sign in to PeopleSphere</h2>
          <p className="text-xs text-slate-500">
            Access your organization's workforce workspace
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Work Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
          />

          <Button type="submit" className="w-full" isLoading={loading}>
            Sign In
          </Button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
          Demo login: <span className="font-mono text-slate-700">admin@apexcorp.io</span>
        </div>
      </div>
    </div>
  );
}
