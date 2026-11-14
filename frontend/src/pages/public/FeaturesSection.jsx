import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  CalendarDays, 
  CreditCard, 
  FileSpreadsheet, 
  BarChart3, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const features = [
  {
    id: 'employee-mgmt',
    icon: Users,
    title: 'Employee & Faculty Management',
    tagline: 'Single source of truth for your entire workforce',
    description: 'Centralize full-time staff, contract workers, faculty deans, adjunct professors, departments, designations, and verification documents within unified digital profiles.',
    highlights: [
      'Comprehensive personal, employment & bank profiles',
      'Department and hierarchical reporting chains',
      'Encrypted digital document repository',
      'Automated onboarding and probation workflows'
    ],
    badge: 'CORE MODULE'
  },
  {
    id: 'attendance-tracking',
    icon: Clock,
    title: 'Attendance & Biometrics',
    tagline: 'Server-timestamped, tamper-proof timekeeping',
    description: 'Eliminate buddy punching and time theft with biometric integration, geo-fenced remote check-ins, automated grace period rules, late marks, and half-day calculations.',
    highlights: [
      'Server-generated timestamps & IP tracking',
      'Automated late arrival and early departure flags',
      'Shift-based working hour reconciliation',
      'Employee discrepancy correction requests'
    ],
    badge: 'REAL-TIME SYNC'
  },
  {
    id: 'leave-admin',
    icon: CalendarDays,
    title: 'Leave & Approval Workflows',
    tagline: 'Frictionless quotas, policies and multi-tier approvals',
    description: 'Configure custom leave categories, annual accruals, carry-forward limits, and multi-tier hierarchical approvals with complete audit logs and calendar overlap prevention.',
    highlights: [
      'Paid, casual, sick, sabbatical & exam duties',
      'Real-time balance quota ledger calculation',
      'Multi-level manager and HR sign-offs',
      'Academic semester vacation policy rules'
    ],
    badge: 'TRANSACTION SAFE'
  },
  {
    id: 'payroll-engine',
    icon: CreditCard,
    title: 'Payroll Processing Engine',
    tagline: 'Attendance-integrated gross-to-net financial calculations',
    description: 'One-click payroll pay runs driven by verified attendance logs, unpaid leave deductions, customizable earning/deduction components, and immutable finalized snapshot locks.',
    highlights: [
      'Exact Decimal financial precision math',
      'Automatic unpaid leave wage prorating',
      'Pre-run validation and gross-to-net preview',
      'Immutable finalized record locking'
    ],
    badge: 'IMMUTABLE AUDIT'
  },
  {
    id: 'payslip-gen',
    icon: FileSpreadsheet,
    title: 'Automated Payslip Generation',
    tagline: 'Professional ReportLab PDF generation and distribution',
    description: 'Generate publication-grade PDF payslips with customized organizational branding, tax breakdowns, employee earnings, attendance summaries, and direct self-service download links.',
    highlights: [
      'Vector ReportLab PDF rendering with branding',
      'Self-service employee download portal',
      'Audit log tracking for every download event',
      'Encrypted distribution via email and web'
    ],
    badge: 'PDF READY'
  },
  {
    id: 'workforce-analytics',
    icon: BarChart3,
    title: 'Workforce Analytics & Reports',
    tagline: 'Executive visibility into headcount and labor expenditure',
    description: 'Empower executive leadership and HR directors with actionable workforce metrics, attendance heatmaps, leave utilization curves, and departmental payroll budgets.',
    highlights: [
      'Departmental headcount & attrition metrics',
      'Attendance trends and absenteeism heatmaps',
      'Leave category exhaustion analytics',
      'CSV, Excel and PDF exportable compliance data'
    ],
    badge: 'EXECUTIVE BI'
  }
];

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(features[0].id);

  return (
    <section id="features" className="py-24 bg-white border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-6 text-left">
        {/* Section Heading */}
        <div className="max-w-2xl space-y-3 mb-16">
          <div className="text-xs font-semibold text-brand-600 tracking-wider uppercase">
            Comprehensive Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineered for every phase of workforce administration.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            From the first day of onboarding to annual payroll audits, PeopleSphere automates routine operations so your HR and management teams can focus on people.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveFeature(item.id)}
                className={`group p-6 rounded-xl border bg-white transition-all duration-200 flex flex-col justify-between ${
                  activeFeature === item.id
                    ? 'border-brand-500 shadow-enterprise ring-1 ring-brand-500/20'
                    : 'border-slate-200/90 shadow-subtle hover:border-slate-300 hover:shadow'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-brand-50 text-slate-700 group-hover:text-brand-600 flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-700 transition-colors">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                      {item.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-start space-x-2 text-[11px] text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 flex items-center text-xs font-medium text-brand-600 opacity-90 group-hover:opacity-100">
                  <span>Explore workflow</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
