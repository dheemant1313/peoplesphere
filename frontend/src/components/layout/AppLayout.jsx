import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppLayout() {
  const [orgType, setOrgType] = useState('CORPORATE'); // 'CORPORATE' or 'COLLEGE'

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header currentOrgType={orgType} setOrgType={setOrgType} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet context={{ orgType }} />
        </main>
      </div>
    </div>
  );
}
