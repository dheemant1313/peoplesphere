import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Building2, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react';
import { Input } from '../../components/forms/Input';
import { Button } from '../../components/common/Button';
import { useToast } from '../../hooks/useToast';

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') === 'college' ? 'COLLEGE' : 'COMPANY';

  const [orgType, setOrgType] = useState(initialType);
  const [formData, setFormData] = useState({
    orgName: '',
    orgSlug: '',
    adminName: '',
    email: '',
    password: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleOrgNameChange = (e) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData({ ...formData, orgName: name, orgSlug: slug });
  };

  const validate = () => {
    const errs = {};
    if (!formData.orgName.trim()) errs.orgName = 'Organization name is required';
    if (!formData.adminName.trim()) errs.adminName = 'Admin full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid work email';
    }
    if (!formData.password || formData.password.length < 8) {
      errs.password = 'Password must be at least 8 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast(`Workspace "${formData.orgName}" provisioned successfully!`, 'success');
      navigate('/');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 max-w-lg w-full shadow-subtle space-y-6 text-left">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-brand-600 text-white font-bold text-base flex items-center justify-center mx-auto shadow-sm">
            PS
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Create Your Organization Workspace
          </h2>
          <p className="text-xs text-slate-500">
            Set up multi-tenant PeopleSphere HRMS for your institution or company
          </p>
        </div>

        {/* Org Type Selector */}
        <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setOrgType('COMPANY')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
              orgType === 'COMPANY'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-brand-600" />
            <span>Company / Corp</span>
          </button>
          <button
            type="button"
            onClick={() => setOrgType('COLLEGE')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
              orgType === 'COLLEGE'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-brand-600" />
            <span>College / University</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-4">
            <Input
              label={orgType === 'COLLEGE' ? 'College / University Name *' : 'Company Name *'}
              placeholder={orgType === 'COLLEGE' ? 'Harvard Medical College' : 'Acme Technologies Inc.'}
              value={formData.orgName}
              onChange={handleOrgNameChange}
              error={errors.orgName}
              required
            />

            <div>
              <Input
                label="Workspace URL Subdomain"
                placeholder="acme-corp"
                value={formData.orgSlug}
                onChange={(e) => setFormData({ ...formData, orgSlug: e.target.value })}
                helperText={formData.orgSlug ? `URL: https://${formData.orgSlug}.peoplesphere.io` : ''}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Administrator Full Name *"
                placeholder="Dr. Robert Hayes"
                value={formData.adminName}
                onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                error={errors.adminName}
                required
              />
              <Input
                label="Official Work Email *"
                type="email"
                placeholder="admin@institution.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
                required
              />
            </div>

            <Input
              label="Master Password *"
              type="password"
              placeholder="Minimum 8 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              required
            />
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full" size="lg" isLoading={loading}>
              <span>Launch Isolated Workspace</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Already registered?</span>
          <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
            Sign In to Workspace
          </Link>
        </div>
      </div>
    </div>
  );
}
