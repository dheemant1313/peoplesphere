import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Building2,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Settings,
  UserCheck,
  Globe,
  Clock,
  Coins,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Input } from '../../components/forms/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/useToast';
import authService from '../../services/authService';

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') === 'college' ? 'COLLEGE' : 'COMPANY';

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [onboardSuccess, setOnboardSuccess] = useState(false);

  const navigate = useNavigate();
  const { setAuthSession } = useAuth();
  const { showToast } = useToast();

  // Wizard state
  const [formData, setFormData] = useState({
    // Step 1: Organization Details
    org_name: '',
    org_type: initialType,
    contact_email: '',
    contact_phone: '',
    address: '',
    logo_url: '',
    domain: '',

    // Step 2: Administrator Profile
    admin_first_name: '',
    admin_last_name: '',
    admin_email: '',
    admin_password: '',
    admin_password_confirm: '',

    // Step 3: Organizational Settings & Policies
    timezone: 'UTC',
    currency: 'USD',
    fiscal_year_start: '01-01',
    work_week_start: 'Monday',
    weekend_days: 'Saturday,Sunday',
    allow_remote_checkin: true,
  });

  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!formData.org_name.trim()) errs.org_name = 'Organization name is required';
      if (!formData.contact_email.trim()) {
        errs.contact_email = 'Contact email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_email)) {
        errs.contact_email = 'Valid email is required';
      }
    } else if (step === 2) {
      if (!formData.admin_first_name.trim()) errs.admin_first_name = 'First name is required';
      if (!formData.admin_last_name.trim()) errs.admin_last_name = 'Last name is required';
      if (!formData.admin_email.trim()) {
        errs.admin_email = 'Admin email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.admin_email)) {
        errs.admin_email = 'Valid email is required';
      }
      if (!formData.admin_password || formData.admin_password.length < 8) {
        errs.admin_password = 'Password must be at least 8 characters';
      }
      if (formData.admin_password !== formData.admin_password_confirm) {
        errs.admin_password_confirm = 'Passwords do not match';
      }
    } else if (step === 3) {
      if (!formData.timezone) errs.timezone = 'Timezone is required';
      if (!formData.currency) errs.currency = 'Currency is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    setErrorMessage('');
    if (validateStep(currentStep)) {
      // Auto-fill admin email from org email if empty
      if (currentStep === 1 && !formData.admin_email) {
        setFormData((prev) => ({ ...prev, admin_email: prev.contact_email }));
      }
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setErrorMessage('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmitOnboarding = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      setErrorMessage('Please review all previous steps for errors.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        org_name: formData.org_name.trim(),
        org_type: formData.org_type,
        contact_email: formData.contact_email.trim(),
        contact_phone: formData.contact_phone.trim() || undefined,
        address: formData.address.trim() || undefined,
        logo_url: formData.logo_url.trim() || undefined,
        domain: formData.domain.trim() || undefined,

        admin_first_name: formData.admin_first_name.trim(),
        admin_last_name: formData.admin_last_name.trim(),
        admin_email: formData.admin_email.trim(),
        admin_password: formData.admin_password,

        timezone: formData.timezone,
        currency: formData.currency,
        fiscal_year_start: formData.fiscal_year_start,
        work_week_start: formData.work_week_start,
        weekend_days: formData.weekend_days,
        allow_remote_checkin: formData.allow_remote_checkin,
      };

      const result = await authService.register(payload);
      setOnboardSuccess(true);
      showToast(`Workspace "${formData.org_name}" created successfully!`, 'success');

      // Initialize session directly
      if (result.token && result.user) {
        setAuthSession({ token: result.token, user: result.user });
      }

      setTimeout(() => {
        navigate('/app');
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.detail ||
        'Registration failed. An organization with this name or email may already exist.';
      setErrorMessage(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Organization', icon: Building2 },
    { number: 2, title: 'Administrator', icon: UserCheck },
    { number: 3, title: 'Policies & Locale', icon: Settings },
    { number: 4, title: 'Review & Provision', icon: ShieldCheck },
  ];

  if (onboardSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 max-w-md w-full text-center space-y-6 shadow-subtle animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="text-[11px] font-semibold tracking-wider text-emerald-600 uppercase bg-emerald-50 px-2.5 py-1 rounded-full">
              Workspace Active
            </span>
            <h2 className="text-xl font-bold text-slate-900">Welcome to PeopleSphere</h2>
            <p className="text-xs text-slate-500">
              <strong>{formData.org_name}</strong> has been provisioned with isolated multi-tenant schemas. Redirecting you to the management dashboard...
            </p>
          </div>
          <div className="pt-2">
            <Button className="w-full" onClick={() => navigate('/app')}>
              Go to Workspace Dashboard Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 max-w-xl w-full shadow-subtle space-y-6 text-left">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white font-bold text-base flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              PS
            </div>
          </Link>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Create Organization Workspace
          </h2>
          <p className="text-xs text-slate-500">
            Provision dedicated workforce management for your enterprise or college
          </p>
        </div>

        {/* Step indicator */}
        <div className="grid grid-cols-4 gap-2 pt-2 border-b border-slate-100 pb-5">
          {steps.map((st) => {
            const Icon = st.icon;
            const isCompleted = currentStep > st.number;
            const isCurrent = currentStep === st.number;
            return (
              <div key={st.number} className="flex flex-col items-center space-y-1.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-semibold transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : isCurrent
                      ? 'bg-brand-600 text-white shadow-sm ring-4 ring-brand-100'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span
                  className={`text-[10px] font-semibold text-center truncate max-w-[70px] ${
                    isCurrent ? 'text-brand-600' : isCompleted ? 'text-emerald-700' : 'text-slate-400'
                  }`}
                >
                  {st.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start space-x-2 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: Organization Details */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in-50 duration-200">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Organization Category *
              </label>
              <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, org_type: 'COMPANY' })}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                    formData.org_type === 'COMPANY'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-brand-600" />
                  <span>Corporate / Company</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, org_type: 'COLLEGE' })}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                    formData.org_type === 'COLLEGE'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-brand-600" />
                  <span>College / University</span>
                </button>
              </div>
            </div>

            <Input
              label={formData.org_type === 'COLLEGE' ? 'Institution / University Name *' : 'Company Name *'}
              placeholder={formData.org_type === 'COLLEGE' ? 'St. Augustine University' : 'Vanguard Technologies Ltd'}
              value={formData.org_name}
              onChange={(e) => setFormData({ ...formData, org_name: e.target.value })}
              error={errors.org_name}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Official Work Email *"
                type="email"
                placeholder="contact@organization.edu"
                value={formData.contact_email}
                onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                error={errors.contact_email}
                required
              />
              <Input
                label="Official Phone"
                placeholder="+1 (555) 019-2834"
                value={formData.contact_phone}
                onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
              />
            </div>

            <Input
              label="Headquarters / Campus Address"
              placeholder="100 Innovation Way, Suite 400, New York, NY"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Logo Image URL (Optional)"
                placeholder="https://domain.com/logo.png"
                value={formData.logo_url}
                onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
              />
              <Input
                label="Web Domain (Optional)"
                placeholder="vanguardtech.io"
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* STEP 2: Administrator Account */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in-50 duration-200">
            <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl text-xs text-brand-900">
              This account will be provisioned as the master <strong>ORGANIZATION_ADMIN</strong> with complete supervisory control.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First Name *"
                placeholder="Eleanor"
                value={formData.admin_first_name}
                onChange={(e) => setFormData({ ...formData, admin_first_name: e.target.value })}
                error={errors.admin_first_name}
                required
              />
              <Input
                label="Last Name *"
                placeholder="Vance"
                value={formData.admin_last_name}
                onChange={(e) => setFormData({ ...formData, admin_last_name: e.target.value })}
                error={errors.admin_last_name}
                required
              />
            </div>

            <Input
              label="Admin Login Email *"
              type="email"
              placeholder="eleanor.vance@company.io"
              value={formData.admin_email}
              onChange={(e) => setFormData({ ...formData, admin_email: e.target.value })}
              error={errors.admin_email}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Master Password *"
                type="password"
                placeholder="Minimum 8 characters"
                value={formData.admin_password}
                onChange={(e) => setFormData({ ...formData, admin_password: e.target.value })}
                error={errors.admin_password}
                required
              />
              <Input
                label="Confirm Password *"
                type="password"
                placeholder="Repeat password"
                value={formData.admin_password_confirm}
                onChange={(e) => setFormData({ ...formData, admin_password_confirm: e.target.value })}
                error={errors.admin_password_confirm}
                required
              />
            </div>
          </div>
        )}

        {/* STEP 3: Policies & Locale */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in-50 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Timezone *</label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                >
                  <option value="UTC">UTC (Universal Coordinated Time)</option>
                  <option value="America/New_York">America/New_York (EST / EDT)</option>
                  <option value="America/Chicago">America/Chicago (CST / CDT)</option>
                  <option value="America/Los_Angeles">America/Los_Angeles (PST / PDT)</option>
                  <option value="Europe/London">Europe/London (GMT / BST)</option>
                  <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
                  <option value="Asia/Dubai">Asia/Dubai (GST +4:00)</option>
                  <option value="Asia/Singapore">Asia/Singapore (SGT +8:00)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Payroll Currency *</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                >
                  <option value="USD">USD ($) — United States Dollar</option>
                  <option value="INR">INR (₹) — Indian Rupee</option>
                  <option value="EUR">EUR (€) — Euro</option>
                  <option value="GBP">GBP (£) — British Pound</option>
                  <option value="AED">AED (د.إ) — UAE Dirham</option>
                  <option value="CAD">CAD ($) — Canadian Dollar</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Work Week Start</label>
                <select
                  value={formData.work_week_start}
                  onChange={(e) => setFormData({ ...formData, work_week_start: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="Monday">Monday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Weekend Days</label>
                <select
                  value={formData.weekend_days}
                  onChange={(e) => setFormData({ ...formData, weekend_days: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="Saturday,Sunday">Saturday & Sunday (5-day work week)</option>
                  <option value="Sunday">Sunday only (6-day work week)</option>
                  <option value="Friday,Saturday">Friday & Saturday (Middle East standard)</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center space-x-2.5 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={formData.allow_remote_checkin}
                  onChange={(e) => setFormData({ ...formData, allow_remote_checkin: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500/30"
                />
                <div className="text-xs">
                  <div className="font-semibold text-slate-800">Allow Remote Attendance Clock-In</div>
                  <div className="text-slate-500">
                    Permit verified employees and faculty to check in remotely or via mobile.
                  </div>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* STEP 4: Review & Provision */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-in fade-in-50 duration-200">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Organization Summary
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono uppercase bg-brand-100 text-brand-700 font-semibold">
                  {formData.org_type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Organization Name</span>
                  <span className="font-semibold text-slate-800">{formData.org_name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Contact Email</span>
                  <span className="font-semibold text-slate-800 font-mono text-[11px] truncate block">
                    {formData.contact_email}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Administrator</span>
                  <span className="font-semibold text-slate-800">
                    {formData.admin_first_name} {formData.admin_last_name}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Admin Login</span>
                  <span className="font-semibold text-slate-800 font-mono text-[11px] truncate block">
                    {formData.admin_email}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Timezone</span>
                  <span className="font-semibold text-slate-800">{formData.timezone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Currency</span>
                  <span className="font-semibold text-slate-800">{formData.currency}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start space-x-2 text-xs text-emerald-900">
              <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                Upon clicking provision, your dedicated tenant identifier will be created with default roles, permissions, and salary structures.
              </span>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {currentStep > 1 ? (
            <Button type="button" variant="outline" size="sm" onClick={handleBack} disabled={loading}>
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Back</span>
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <Button type="button" size="sm" onClick={handleNext}>
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          ) : (
            <Button
              type="button"
              size="sm"
              onClick={handleSubmitOnboarding}
              isLoading={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <span>Provision Workspace</span>
              <Sparkles className="w-3.5 h-3.5 ml-1" />
            </Button>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Already registered?</span>
          <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700 hover:underline">
            Sign In to Workspace
          </Link>
        </div>
      </div>
    </div>
  );
}
