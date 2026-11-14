import React, { useState } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import SolutionsSection from './SolutionsSection';
import HowItWorksSection from './HowItWorksSection';
import BenefitsSection from './BenefitsSection';
import FaqSection from './FaqSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import { PolicyModal } from '../../components/common/PolicyModal';

export default function LandingPage() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    type: 'privacy'
  });

  const handleOpenPrivacy = () => {
    setModalState({
      isOpen: true,
      title: 'PeopleSphere HRMS — Privacy Policy & Data Governance',
      type: 'privacy'
    });
  };

  const handleOpenTerms = () => {
    setModalState({
      isOpen: true,
      title: 'PeopleSphere HRMS — Enterprise Terms of Service',
      type: 'terms'
    });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, title: '', type: 'privacy' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-brand-500 selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <div id="home">
        <HeroSection />
      </div>

      {/* 6 Core Feature Pillars */}
      <FeaturesSection />

      {/* College & University vs Corporate Company Solutions */}
      <SolutionsSection />

      {/* 4-Step How It Works */}
      <HowItWorksSection />

      {/* Proven Enterprise Benefits & ROI Metrics */}
      <BenefitsSection />

      {/* Accordion FAQ */}
      <FaqSection />

      {/* Validated Contact / Demo Request Form */}
      <ContactSection />

      {/* Global Footer */}
      <Footer onOpenPrivacy={handleOpenPrivacy} onOpenTerms={handleOpenTerms} />

      {/* Interactive Policy & Terms Modal */}
      <PolicyModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        title={modalState.title}
        type={modalState.type}
      />
    </div>
  );
}
