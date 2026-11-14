import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Clock, 
  CalendarCheck, 
  CreditCard, 
  CheckCircle2, 
  Lock,
  Building2,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Check user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Subtle coordinated entrance
      gsap.from('.hero-text-item', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
      });

      gsap.from('.hero-preview-window', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="hero-text-item inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/80">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Next-Generation Workforce OS</span>
            </div>

            <h1 className="hero-text-item text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              People Management, <br />
              <span className="text-brand-600">Made Simple.</span>
            </h1>

            <p className="hero-text-item text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              Manage employees, faculty, attendance, shifts, leave applications and payroll through one intelligent workforce platform built for colleges, universities, and corporate companies.
            </p>

            {/* CTAs */}
            <div className="hero-text-item flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/register"
                className="px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/"
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 text-sm font-medium border border-slate-300 rounded-lg shadow-subtle transition-all flex items-center justify-center space-x-2"
              >
                <span>Explore Live Demo</span>
              </Link>
            </div>

            {/* Trust points */}
            <div className="hero-text-item pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Multi-Tenant Isolation</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Colleges & Companies</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Automated Payroll & PDF Payslips</span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Enterprise Dashboard Preview */}
          <div className="lg:col-span-6 lg:pl-4">
            <div className="hero-preview-window bg-white rounded-xl border border-slate-200 shadow-enterprise overflow-hidden">
              {/* Browser Window Bar */}
              <div className="px-4 py-3 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                </div>

                <div className="px-3 py-1 bg-white border border-slate-200 rounded-md text-[11px] text-slate-500 font-mono flex items-center space-x-1.5 shadow-xs">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>app.peoplesphere.io/workforce/overview</span>
                </div>

                <div className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-semibold">
                  LIVE API
                </div>
              </div>

              {/* Dashboard Content Mockup */}
              <div className="p-5 space-y-4 bg-slate-50/40 text-left">
                {/* Header Row in Preview */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-md bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                      PS
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 leading-tight">
                        Apex Corporate Technologies
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Workforce Operations Hub • Tenant ORG-CORP-01
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600 font-medium">
                    May 2026 Pay Cycle
                  </span>
                </div>

                {/* 2-Column KPI Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3.5 rounded-lg border border-slate-200/90 shadow-subtle">
                    <div className="flex items-center justify-between text-slate-500 text-[11px]">
                      <span>Active Employees</span>
                      <Users className="w-3.5 h-3.5 text-brand-600" />
                    </div>
                    <div className="mt-1 flex items-baseline space-x-1.5">
                      <span className="text-xl font-bold text-slate-900">248</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">+6 this month</span>
                    </div>
                    <div className="mt-1 text-[10px] text-slate-400">
                      Engineering, HR, Sales & Ops
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-lg border border-slate-200/90 shadow-subtle">
                    <div className="flex items-center justify-between text-slate-500 text-[11px]">
                      <span>Clocked-in Today</span>
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="mt-1 flex items-baseline space-x-1.5">
                      <span className="text-xl font-bold text-slate-900">236</span>
                      <span className="text-[10px] text-slate-500">(95.2%)</span>
                    </div>
                    <div className="mt-1 text-[10px] text-slate-400">
                      Biometric & remote sync active
                    </div>
                  </div>
                </div>

                {/* Live Action Queue Preview */}
                <div className="bg-white p-3.5 rounded-lg border border-slate-200/90 shadow-subtle space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 flex items-center space-x-1.5">
                      <CalendarCheck className="w-3.5 h-3.5 text-amber-600" />
                      <span>Pending Leave Approval</span>
                    </span>
                    <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/60 font-semibold">
                      1 Awaiting Action
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-md border border-slate-200/80 flex items-center justify-between text-[11px]">
                    <div>
                      <div className="font-semibold text-slate-800">Sarah Jenkins (Sr. Engineer)</div>
                      <div className="text-[10px] text-slate-500">Casual Leave • May 18 - May 20 (3 days)</div>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <button className="px-2 py-1 bg-white border border-slate-300 text-slate-700 rounded text-[10px] font-medium hover:bg-slate-50">
                        Reject
                      </button>
                      <button className="px-2.5 py-1 bg-brand-600 text-white rounded text-[10px] font-medium hover:bg-brand-700">
                        Approve
                      </button>
                    </div>
                  </div>
                </div>

                {/* Payroll Processing Status Pill */}
                <div className="bg-white p-3.5 rounded-lg border border-slate-200/90 shadow-subtle flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-1.5 bg-purple-50 text-purple-600 rounded">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 leading-tight">
                        Payroll Run: May 2026
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Gross: $214,800.00 • Net: $184,250.00
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      LOCKED & VERIFIED
                    </span>
                    <div className="text-[9px] text-slate-400 font-mono mt-0.5">ReportLab PDF Ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
