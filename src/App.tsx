/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { ContentProvider, useSiteContent } from './context/ContentContext';
import { ProgressBar } from './components/ProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PhilosophySection } from './components/PhilosophySection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { AchievementsSection } from './components/AchievementsSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { AdminLogin } from './components/Admin/AdminLogin';
import { AdminDashboard } from './components/Admin/AdminDashboard';

function MainSite() {
  const [lang, setLang] = useState<Language>('fa');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const { activeView, isAdminLoggedIn, setActiveView } = useSiteContent();

  useEffect(() => {
    // Synchronize HTML direction and language
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.title =
      lang === 'fa'
        ? 'حسنا دوزنده - مدیر دبیرستان دخترانه هما | وب‌سایت رسمی'
        : 'Hosna Doozandeh - Principal, Homa Girls’ High School | Official Website';
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'fa' ? 'en' : 'fa'));
  };

  const returnToPublicSite = () => {
    window.location.hash = '';
    setActiveView('public');
  };

  // If user navigated to Admin view (#admin or state)
  if (activeView === 'admin') {
    if (!isAdminLoggedIn) {
      return (
        <AdminLogin
          lang={lang}
          onBackToSite={returnToPublicSite}
        />
      );
    }
    return (
      <AdminDashboard
        lang={lang}
        onBackToSite={returnToPublicSite}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#E8F0F8] text-[#243B5D] selection:bg-[#D5E3F0] selection:text-[#1B3252] transition-colors duration-300 relative">
      {/* Scroll Progress Bar at very top */}
      <ProgressBar lang={lang} />

      {/* Floating Soft Neumorphic Navigation Bar */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenAdmin={() => {
          window.location.hash = '#admin';
          setActiveView('admin');
        }}
      />

      {/* Main Structural Flow */}
      <main className="flex-1">
        {/* Floating Hero Panel with Concentric Portrait Dial & Statistic Cards */}
        <Hero
          lang={lang}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />

        {/* Leadership Philosophy (4 Large Raised Control Cards) */}
        <PhilosophySection lang={lang} />

        {/* Professional Journey (Physical Interface Timeline) */}
        <ExperienceTimeline lang={lang} />

        {/* Achievements (Soft Bento-style Surfaces) */}
        <AchievementsSection lang={lang} />

        {/* Gallery & Activities (Asymmetric Editorial Layout) */}
        <GallerySection lang={lang} />

        {/* Testimonials (Translucent Floating Quotes) */}
        <TestimonialsSection lang={lang} />

        {/* Contact Panel (Recessed Neumorphic Controls & Raised Button) */}
        <ContactSection lang={lang} />
      </main>

      {/* Soft Neumorphic Footer */}
      <Footer
        lang={lang}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenAdmin={() => {
          window.location.hash = '#admin';
          setActiveView('admin');
        }}
      />

      {/* Official Resume Sheet Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        defaultLang={lang}
      />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <MainSite />
    </ContentProvider>
  );
}
