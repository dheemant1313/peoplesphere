import React from 'react';
import { 
  Building2, 
  Users, 
  Clock, 
  FileSpreadsheet, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Create Your Organization',
    description: 'Set up your dedicated multi-tenant workspace with customized fiscal year start, currency, default shifts, and organization branding in seconds.',
    icon: Building2,
    badge: 'TENANT ONBOARDING'
  },
  {
    step: '02',
    title: 'Configure Your Workforce',
    description: 'Import staff or academic faculty members, assign them to departments and designations, designate reporting managers, and attach salary structures.',
    icon: Users,
    badge: 'STRUCTURE SETUP'
  },
  {
    step: '03',
    title: 'Run Daily Operations',
    description: 'Employees clock in with biometric terminals or web portals. Managers review leave requests and attendance logs with automated policy checks.',
    icon: Clock,
    badge: 'DAILY AUTOMATION'
  },
  {
    step: '04',
    title: 'Finalize Payroll & Payslips',
    description: 'Execute attendance-linked payroll runs with one click. Lock immutable audit snapshots and automatically publish high-resolution PDF payslips.',
    icon: FileSpreadsheet,
    badge: 'PAYROLL FINALIZATION'
  }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-6 text-left">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-16">
          <div className="text-xs font-semibold text-brand-600 tracking-wider uppercase">
            Seamless Implementation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How PeopleSphere powers your organization in four steps.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Eliminate complex month-long ERP rollouts. PeopleSphere gets your workforce operational in hours, not quarters.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-200/90 bg-white shadow-subtle hover:border-slate-300 hover:shadow transition-all space-y-4 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black font-mono text-slate-300 group-hover:text-brand-600 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {item.badge}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 pt-1">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
