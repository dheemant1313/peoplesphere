import React from 'react';
import { ShieldCheck, Zap, TrendingUp, Lock, CheckCircle2 } from 'lucide-react';

export default function BenefitsSection() {
  const metrics = [
    {
      value: '99.9%',
      label: 'Payroll Accuracy',
      description: 'Decimal-based financial math prevents floating point rounding errors in gross-to-net pay runs.'
    },
    {
      value: '70%',
      label: 'Time Reduction',
      description: 'Automated biometric reconciliation eliminates days spent on manual spreadsheet collation.'
    },
    {
      value: '100%',
      label: 'Immutable Audit Trail',
      description: 'Finalized pay runs and administrative updates are permanently logged with actor and timestamp diffs.'
    },
    {
      value: '< 50ms',
      label: 'API Query Latency',
      description: 'Indexed MySQL 8.0 schema and optimized connection pooling deliver instant enterprise response times.'
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              <Zap className="w-3.5 h-3.5 text-brand-400" />
              <span>Proven Enterprise Reliability</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Designed for accuracy, built for governance.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              When dealing with employee livelihoods, faculty appointments, and regulatory filings, compromises aren't an option. PeopleSphere combines military-grade data isolation with effortless day-to-day usability.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Zero trust multi-tenant isolation guarantees no cross-organization leakage</span>
              </div>
              <div className="flex items-start space-x-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Configurable approval ladders respect departmental Dean and Manager hierarchies</span>
              </div>
              <div className="flex items-start space-x-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Native PDF payslip generation powered by high-performance ReportLab rendering</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-2"
                >
                  <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 tracking-tight">
                    {m.value}
                  </div>
                  <div className="text-sm font-bold text-white">
                    {m.label}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
