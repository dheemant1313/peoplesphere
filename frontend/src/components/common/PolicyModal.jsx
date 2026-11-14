import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

export function PolicyModal({ isOpen, onClose, title, type }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-slate-200 max-w-2xl w-full p-6 space-y-4 shadow-xl text-left">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            {type === 'privacy' ? (
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            ) : (
              <FileText className="w-5 h-5 text-brand-600" />
            )}
            <h3 className="text-base font-bold text-slate-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto pr-2 text-xs text-slate-600 space-y-3 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p className="font-semibold text-slate-800">1. Data Ownership and Multi-Tenant Isolation</p>
              <p>
                PeopleSphere operates under a strict multi-tenant architecture. All employee records, attendance logs, leave balances, and financial compensation data remain the exclusive property of your organization. Every database operation enforces strict tenant isolation based on cryptographic JWT identities.
              </p>
              <p className="font-semibold text-slate-800">2. Biometric and Attendance Privacy</p>
              <p>
                Biometric punch data, GPS coordinates for remote check-ins, and network IP addresses are retained strictly for attendance audit verification. Raw biometric templates are processed client-side or on-premises where mandated by law.
              </p>
              <p className="font-semibold text-slate-800">3. Payroll and Financial Snapshot Integrity</p>
              <p>
                Financial compensation details and generated payslips are stored with strict role-based access. Once finalized, immutable historical payroll records cannot be modified without an explicit tamper-evident audit log event.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-slate-800">1. Subscription and Workspace Terms</p>
              <p>
                By establishing an organization tenant on PeopleSphere HRMS, your authorized administrator agrees to govern user access and permission roles in accordance with institutional labor and statutory employment standards.
              </p>
              <p className="font-semibold text-slate-800">2. Role-Based Administrative Responsibilities</p>
              <p>
                Organization Admins and HR Officers are responsible for assigning appropriate roles (Admin, HR, Manager, Employee) and maintaining the accuracy of salary components, working week definitions, and tax deduction configurations.
              </p>
              <p className="font-semibold text-slate-800">3. Service Level and Audit Guarantees</p>
              <p>
                PeopleSphere maintains 99.9% application uptime, connection-pooled database failover, and comprehensive audit trails for all sensitive personnel and payroll actions.
              </p>
            </>
          )}
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
