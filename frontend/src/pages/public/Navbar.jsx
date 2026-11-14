import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scrollspy logic
      const sections = ['features', 'solutions', 'how-it-works', 'benefits', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== '/landing') {
      window.location.href = `/landing#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Features', id: 'features' },
    { name: 'Solutions', id: 'solutions' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Benefits', id: 'benefits' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-subtle py-3.5'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/landing" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-sm flex items-center justify-center tracking-tight shadow-sm transition-transform group-hover:scale-105">
            PS
          </div>
          <div className="text-left">
            <div className="font-bold text-slate-900 text-sm tracking-tight flex items-center space-x-1.5">
              <span>PeopleSphere</span>
              <span className="text-[9px] px-1.5 py-0.5 bg-brand-50 text-brand-700 font-mono rounded border border-brand-200/60 font-semibold">
                HRMS
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-normal leading-none">
              People First. Smarter.
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeSection === link.id
                  ? 'text-brand-600 bg-brand-50/70 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center space-x-3">
          <Link
            to="/login"
            className="px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-medium rounded-lg transition-all shadow-sm flex items-center space-x-1.5"
          >
            <span>Get Started Free</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className={`block px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                  activeSection === link.id
                    ? 'text-brand-600 bg-brand-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-xs font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-xs font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm flex items-center justify-center space-x-1.5"
            >
              <span>Get Started Free</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
