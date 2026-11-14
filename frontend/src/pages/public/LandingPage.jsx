import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Building2, GraduationCap, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between font-sans">
      {/* Navbar */}
      <header className="h-20 border-b border-slate-100 px-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-sm">
            PS
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-slate-900">PeopleSphere</span>
            <span className="text-[10px] ml-1.5 px-1.5 py-0.2 bg-brand-50 text-brand-700 font-mono rounded border border-brand-200/60">
              HRMS
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/"
            className="px-4 py-2 bg-brand-600 text-white rounded-lg text-xs font-medium hover:bg-brand-700 transition-colors shadow-sm"
          >
            Open Dashboard
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-20 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200/60">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Enterprise Workforce & Payroll Platform</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
          People Management, Made Simple.
        </h1>

        <p className="text-base text-slate-600 max-w-2xl mx-auto">
          Manage employees, attendance, leave and payroll through one intelligent workforce management platform designed for colleges, universities, and corporate companies.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 bg-brand-600 text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <span>Launch Workspaces</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-6 text-center text-xs text-slate-400">
        PeopleSphere HRMS • "People First. Management Smarter."
      </footer>
    </div>
  );
}
