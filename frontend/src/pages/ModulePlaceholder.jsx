import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layers, ArrowRight } from 'lucide-react';

export default function ModulePlaceholder({ title, description, moduleNumber, nextPhase }) {
  const location = useLocation();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-subtle text-center space-y-4">
        <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mx-auto">
          <Layers className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
            Module {moduleNumber} • Architecture Scaffold
          </span>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            {description}
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 max-w-md mx-auto text-left space-y-1 font-mono">
          <div>Route: <span className="text-brand-600">{location.pathname}</span></div>
          <div>Database Tables: Ready & Verified in MySQL 8.0</div>
          <div>Scheduled Development: <span className="font-semibold">{nextPhase}</span></div>
        </div>
      </div>
    </div>
  );
}
