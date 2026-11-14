import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onOpenPrivacy, onOpenTerms }) {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800 text-left font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-brand-600 text-white font-bold text-sm flex items-center justify-center">
                PS
              </div>
              <span className="font-bold text-base text-white tracking-tight">PeopleSphere HRMS</span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              "People First. Management Smarter." The unified workforce, attendance, leave, and payroll platform purpose-built for colleges, universities, and commercial enterprises.
            </p>

            <div className="flex items-center space-x-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Multi-Tenant Architecture • MySQL 8.0 • Fast REST APIs</span>
            </div>
          </div>

          {/* Column 1: Platform Modules */}
          <div className="space-y-3 text-xs">
            <div className="font-semibold text-white tracking-wider uppercase text-[11px]">
              Platform Modules
            </div>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/employees" className="hover:text-white transition-colors">Employee Management</Link></li>
              <li><Link to="/attendance" className="hover:text-white transition-colors">Attendance & Biometrics</Link></li>
              <li><Link to="/shifts" className="hover:text-white transition-colors">Shift Rostering</Link></li>
              <li><Link to="/leave" className="hover:text-white transition-colors">Leave Approvals</Link></li>
              <li><Link to="/payroll" className="hover:text-white transition-colors">Payroll Processing</Link></li>
              <li><Link to="/reports" className="hover:text-white transition-colors">ReportLab PDF Payslips</Link></li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-3 text-xs">
            <div className="font-semibold text-white tracking-wider uppercase text-[11px]">
              Solutions
            </div>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#solutions" className="hover:text-white transition-colors">Higher Education</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Medical & Dental Colleges</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Corporate Enterprises</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Private Companies</a></li>
              <li><a href="#benefits" className="hover:text-white transition-colors">Enterprise ROI</a></li>
            </ul>
          </div>

          {/* Column 3: Trust & Legal */}
          <div className="space-y-3 text-xs">
            <div className="font-semibold text-white tracking-wider uppercase text-[11px]">
              Governance & Legal
            </div>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={onOpenPrivacy} className="hover:text-white transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={onOpenTerms} className="hover:text-white transition-colors text-left">Terms of Service</button></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Security Architecture</a></li>
              <li><Link to="/audit" className="hover:text-white transition-colors">Audit Logging</Link></li>
              <li><a href="/api/v1/health" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">API System Status</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} PeopleSphere HRMS. All rights reserved.
          </div>
          <div className="flex items-center space-x-1">
            <span>Built for higher education and enterprise workforce operations.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
