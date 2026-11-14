import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'How does PeopleSphere enforce multi-tenant isolation? Is data shared?',
    a: 'PeopleSphere employs strict row-level tenant isolation enforced at the database repository layer through TenantAwareRepository. Every database query, insert, update, and delete is scoped to the organization_id extracted from the cryptographically verified JWT token. Organization A can never query or mutate records owned by Organization B under any circumstance.'
  },
  {
    q: 'Can PeopleSphere handle university faculty appointments, sabbaticals, and semester breaks?',
    a: 'Yes. PeopleSphere College Edition is purpose-built for academic institutions. It features specialized department chair hierarchies, faculty tenure classifications, research sabbatical leaves, exam valuation duty tracking, and semester calendar synchronizations.'
  },
  {
    q: 'How does the payroll engine integrate with attendance records?',
    a: 'During a payroll pay run, PeopleSphere calculates the exact payable days for each employee by reading their biometric attendance records, approved paid leaves, and unexcused absences. Unpaid leaves automatically trigger prorated wage deductions using Decimal-precision financial math.'
  },
  {
    q: 'What does "Immutable Finalized Payroll" mean?',
    a: 'Once an authorized HR or Admin user approves and finalizes a monthly payroll period, the system creates an immutable financial snapshot locked with is_locked = True. Future changes to salary components or employee rates will never retroactively modify a finalized historical payroll pay run.'
  },
  {
    q: 'Can we restrict attendance check-in to office Wi-Fi or campus IP ranges?',
    a: 'Yes. In Organization Settings, administrators can toggle IP restriction and provide a list of permitted static IP ranges or office subnets. Alternatively, remote check-in can be permitted with browser geolocation and client device logging for field employees.'
  },
  {
    q: 'How are payslips generated and distributed to employees?',
    a: 'Payslips are generated as publication-ready vector PDF documents using the ReportLab engine. Employees can securely download their payslips from their self-service portal, with every download event recorded in the tamper-evident audit log.'
  },
  {
    q: 'What user roles are available in PeopleSphere?',
    a: 'PeopleSphere ships with four built-in system roles: Organization Admin, HR Officer, Manager / Department Head, and Employee / Faculty. Organizations can also define custom roles and granular permission combinations across departments.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white border-b border-slate-200/70">
      <div className="max-w-4xl mx-auto px-6 text-left">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="text-xs font-semibold text-brand-600 tracking-wider uppercase">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything you need to know about PeopleSphere.
          </h2>
          <p className="text-sm text-slate-600 font-normal leading-relaxed">
            Have questions about architecture, compliance, or rollouts? Here are answers to common questions from enterprise buyers and academic registrars.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200/90 bg-white overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between space-x-4 hover:bg-slate-50/70 transition-colors focus:outline-none"
                >
                  <span className="text-sm font-bold text-slate-900 leading-snug">
                    {faq.q}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600">
                    {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
