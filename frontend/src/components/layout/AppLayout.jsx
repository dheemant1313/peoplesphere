import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('ps_sidebar_collapsed') === 'true';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ps_theme') || 'light';
  });

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('ps_sidebar_collapsed', String(next));
      return next;
    });
  };

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('ps_theme', newTheme);
  };

  const orgType = user?.organization?.org_type || 'CORPORATE';

  return (
    <div
      className={`flex h-screen w-full overflow-hidden font-sans ${
        theme === 'dark'
          ? 'bg-slate-950 text-slate-100 dark'
          : theme === 'slate'
          ? 'bg-slate-900 text-slate-100'
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Sidebar with Desktop Collapse + Mobile Drawer */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={toggleSidebar}
          onOpenMobile={() => setMobileMenuOpen(true)}
          theme={theme}
          onThemeChange={toggleTheme}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet context={{ orgType, theme }} />
        </main>
      </div>
    </div>
  );
}