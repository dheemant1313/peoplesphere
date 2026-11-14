import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Input } from '../../components/forms/Input';
import { Button } from '../../components/common/Button';
import { useToast } from '../../hooks/useToast';

export default function ContactSection() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orgName: '',
    orgType: 'COMPANY',
    headcount: '100-500',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid work email';
    }
    if (!formData.orgName.trim()) errs.orgName = 'Organization name is required';
    if (!formData.message.trim()) errs.message = 'Please provide a brief message';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast('Thank you! Our solutions architect will contact you within 24 hours.', 'success');
      setFormData({
        name: '',
        email: '',
        orgName: '',
        orgType: 'COMPANY',
        headcount: '100-500',
        message: '',
      });
    }, 750);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-6 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-semibold text-brand-600 tracking-wider uppercase">
              Get in Touch
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Ready to modernize your workforce management?
            </h2>
            <p className="text-sm text-slate-600 font-normal leading-relaxed">
              Speak with a PeopleSphere solutions architect to discuss your college or enterprise requirements, schedule an executive demonstration, or request a custom deployment.
            </p>

            <div className="space-y-4 pt-4 text-xs text-slate-700">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-slate-200/80 shadow-xs">
                <Mail className="w-4 h-4 text-brand-600 shrink-0" />
                <span>solutions@peoplesphere.io</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-slate-200/80 shadow-xs">
                <Phone className="w-4 h-4 text-brand-600 shrink-0" />
                <span>+1 (800) 555-PEOPLE (736-753)</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-slate-200/80 shadow-xs">
                <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                <span>500 Howard Street, Suite 300, San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-subtle">
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Inquiry Received</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Thank you for your interest in PeopleSphere HRMS. Our enterprise specialist will reach out to you within one business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs font-semibold text-brand-600 hover:text-brand-700 underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Name *"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      error={errors.name}
                    />
                    <Input
                      label="Work Email *"
                      type="email"
                      placeholder="jane@university.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      error={errors.email}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Organization / College Name *"
                      placeholder="St. Jude Institute"
                      value={formData.orgName}
                      onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                      error={errors.orgName}
                    />
                    <div className="space-y-1 text-left">
                      <label className="block text-xs font-semibold text-slate-700">
                        Organization Type
                      </label>
                      <select
                        value={formData.orgType}
                        onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      >
                        <option value="COMPANY">Corporate / Private Company</option>
                        <option value="COLLEGE">College / University</option>
                        <option value="NON_PROFIT">Non-Profit / NGO</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-semibold text-slate-700">
                      Message / Workforce Requirements *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your faculty, employee headcount, shifts, or current payroll setup..."
                      className={`w-full px-3 py-2 text-xs bg-white border rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500 ${
                        errors.message ? 'border-red-300 focus:ring-red-500' : 'border-slate-300'
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-[11px] text-red-600 font-medium">{errors.message}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" isLoading={loading}>
                    <Send className="w-3.5 h-3.5 mr-2" />
                    <span>Submit Demo Request</span>
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
