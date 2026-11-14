import React, { useState } from 'react';
import { 
  GraduationCap, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Clock, 
  CalendarDays, 
  CreditCard,
  FileCheck2,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SolutionsSection() {
  const [activeTab, setActiveTab] = useState('college'); // 'college' or 'company'

  return (
    <section id="solutions" className="py-24 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-6 text-left">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="text-xs font-semibold text-brand-600 tracking-wider uppercase">
            Tailored Industry Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built for the distinct demands of Higher Education & Corporate Enterprises.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Whether administering a multi-faculty university campus or scaling a corporate workforce across multiple branches, PeopleSphere delivers specialized policy engines out-of-the-box.
          </p>
        </div>

        {/* Segment Switcher Tabs */}
        <div className="flex items-center space-x-2 p-1 bg-slate-200/80 rounded-xl max-w-md mb-10">
          <button
            onClick={() => setActiveTab('college')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'college'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-brand-600" />
            <span>Colleges & Universities</span>
          </button>
          <button
            onClick={() => setActiveTab('company')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'company'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-brand-600" />
            <span>Corporate & Private Companies</span>
          </button>
        </div>

        {/* Content Box */}
        {activeTab === 'college' ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Academic Workforce Edition</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Streamlined Academic Administration for Higher Education
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Academic campuses operate on unique calendars, diverse faculty classifications, and strict accreditation criteria. PeopleSphere harmonizes faculty appointments, semester schedules, exam duties, and staff payroll under one secure umbrella.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-xs font-bold text-slate-900 flex items-center space-x-2">
                      <Users className="w-3.5 h-3.5 text-brand-600" />
                      <span>Faculty & Staff Hierarchy</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Distinct profiles for Deans, HODs, Tenured Professors, Adjunct Lecturers, and Lab Assistants.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-xs font-bold text-slate-900 flex items-center space-x-2">
                      <CalendarDays className="w-3.5 h-3.5 text-brand-600" />
                      <span>Academic Leave & Sabbatical</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Configurable policies for research sabbaticals, exam evaluation duty, and semester vacation periods.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-xs font-bold text-slate-900 flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-brand-600" />
                      <span>Multi-Building Attendance</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Biometric wall terminals and campus Wi-Fi clock-in points for classrooms, labs, and admin wings.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-xs font-bold text-slate-900 flex items-center space-x-2">
                      <CreditCard className="w-3.5 h-3.5 text-brand-600" />
                      <span>Grant & Salary Processing</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Special academic allowances, research grants, tenure stipends, and automated PDF payslip generation.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/register?type=college"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-600 text-white rounded-lg text-xs font-semibold hover:bg-brand-700 transition-colors shadow-sm"
                  >
                    <span>Onboard Your College</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Illustration Card */}
              <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-xl space-y-4 shadow-enterprise">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold">St. John's University</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">CAMPUS ID #UNIV-02</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-800/80 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="text-slate-200 font-medium">Faculty of Medicine & Science</div>
                      <div className="text-[10px] text-slate-400">142 Teaching Faculty • 68 Staff</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono">
                      ACTIVE
                    </span>
                  </div>

                  <div className="p-3 bg-slate-800/80 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="text-slate-200 font-medium">Faculty of Humanities & Law</div>
                      <div className="text-[10px] text-slate-400">114 Teaching Faculty • 38 Staff</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono">
                      ACTIVE
                    </span>
                  </div>

                  <div className="p-3 bg-slate-800/80 rounded-lg space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Semester Exam Duty Leave</span>
                      <span className="text-emerald-400 font-semibold">100% Reconciled</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-slate-400 text-center border-t border-slate-800 font-mono">
                  Multi-faculty payroll and accreditation ready
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-800 border border-brand-200/60">
                  <Building2 className="w-3.5 h-3.5 text-brand-600" />
                  <span>Enterprise Corporate Edition</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  High-Velocity Workforce Operations for Modern Enterprises
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Fast-moving corporate environments demand dynamic shift scheduling, swift multi-level approvals, granular permission delegation, and zero-defect payroll processing with audit locks.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-xs font-bold text-slate-900 flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-brand-600" />
                      <span>24/7 & Rotational Shifts</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Day, night, rotating shifts, automated grace periods, and late penalty calculations.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-xs font-bold text-slate-900 flex items-center space-x-2">
                      <FileCheck2 className="w-3.5 h-3.5 text-brand-600" />
                      <span>Multi-Tier Approval Chains</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Manager, team lead, and HR approval sequences with automatic escalation rules.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-xs font-bold text-slate-900 flex items-center space-x-2">
                      <CreditCard className="w-3.5 h-3.5 text-brand-600" />
                      <span>Automated Direct Pay Runs</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Statutory tax deductions, insurance deductions, bonus allocations, and bank export files.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-xs font-bold text-slate-900 flex items-center space-x-2">
                      <Award className="w-3.5 h-3.5 text-brand-600" />
                      <span>Executive BI Analytics</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Departmental labor costs, headcount forecasting, and turnover velocity tracking.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/register?type=company"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-600 text-white rounded-lg text-xs font-semibold hover:bg-brand-700 transition-colors shadow-sm"
                  >
                    <span>Onboard Your Company</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Illustration Card */}
              <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-xl space-y-4 shadow-enterprise">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-brand-400" />
                    <span className="text-xs font-semibold">Apex Corporate Technologies</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">TENANT ORG-CORP-01</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-800/80 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="text-slate-200 font-medium">Headquarters & Engineering</div>
                      <div className="text-[10px] text-slate-400">182 Engineers • 98.4% Clock-in Rate</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-brand-950 text-brand-400 font-mono">
                      ONLINE
                    </span>
                  </div>

                  <div className="p-3 bg-slate-800/80 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="text-slate-200 font-medium">Operations & Customer Success</div>
                      <div className="text-[10px] text-slate-400">66 Support Staff • Rotational 24/7</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-brand-950 text-brand-400 font-mono">
                      3 SHIFTS
                    </span>
                  </div>

                  <div className="p-3 bg-slate-800/80 rounded-lg space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Monthly Payroll Audit Lock</span>
                      <span className="text-emerald-400 font-semibold">Immutable Finalized</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-slate-400 text-center border-t border-slate-800 font-mono">
                  SOC-2 compliant tenant isolation guaranteed
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
