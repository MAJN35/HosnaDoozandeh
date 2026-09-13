/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ResearchAndEducation } from './components/ResearchAndEducation';
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
        ? 'حسنا دوزنده - پورتفولیو و رزومه حرفه‌ای'
        : 'Hosna Doozandeh - Professional Portfolio & CV';
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'fa' ? 'en' : 'fa'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-900 selection:bg-blue-100 selection:text-blue-900 transition-colors duration-200">
      
      {/* Top Sticky Header */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          lang={lang}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />

        {/* Executive Experience & Organizational Roles */}
        <ExperienceTimeline lang={lang} />

        {/* Professional Projects & Strategic Initiatives */}
        <ProjectsSection lang={lang} />

        {/* Technical Skills & Competencies */}
        <SkillsSection lang={lang} />

        {/* Research Publication & Academic Education */}
        <ResearchAndEducation lang={lang} />

        {/* Contact Form & Social Profiles */}
        <ContactSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* Printable / Downloadable Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        defaultLang={lang}
      />

    </div>
  );
}
