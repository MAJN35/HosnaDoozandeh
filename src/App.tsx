/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language } from './types';
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

export default function App() {
  const [lang, setLang] = useState<Language>('fa');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col bg-[#E8F0F8] text-[#243B5D] selection:bg-[#D5E3F0] selection:text-[#1B3252] transition-colors duration-300">
      
      {/* Floating Soft Neumorphic Navigation Bar */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
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
