import React, { useState } from 'react';
import { Language } from '../types';
import { personalInfo } from '../data/cvData';
import { SkeuButton } from './SkeuButton';
import { FileDown, Globe, Menu, X, Mail } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenResumeModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isFa = lang === 'fa';

  const navLinks = [
    { href: '#about', label: { fa: 'درباره من', en: 'About' } },
    { href: '#experience', label: { fa: 'سوابق مدیریتی', en: 'Experience' } },
    { href: '#projects', label: { fa: 'پروژه‌ها و دستاوردها', en: 'Projects' } },
    { href: '#skills', label: { fa: 'مهارت‌ها و شایستگی‌ها', en: 'Skills' } },
    { href: '#research', label: { fa: 'تحصیلات و مقالات', en: 'Research & Education' } },
    { href: '#contact', label: { fa: 'تماس و ارتباط', en: 'Contact' } },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Name & Title Brand */}
        <a href="#about" className="flex items-center gap-3.5 group">
          <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_3px_6px_rgba(0,0,0,0.15)] border border-slate-200 transition-transform group-hover:scale-105 shrink-0 bg-slate-100">
            <img
              src={personalInfo.contact.photoUrl}
              alt={personalInfo.name[lang]}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg text-slate-900 tracking-tight leading-tight">
              {personalInfo.name[lang]}
            </span>
            <span className="text-xs text-slate-500 font-medium line-clamp-1 max-w-[220px] sm:max-w-xs">
              {personalInfo.title[lang]}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-blue-600 transition-colors py-1"
            >
              {link.label[lang]}
            </a>
          ))}
        </nav>

        {/* Action Controls: Language Toggle & Skeuomorphic Resume Button */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Skeuomorphic Language Switcher */}
          <button
            onClick={onToggleLang}
            id="lang-toggle-btn"
            className="skeu-button-secondary px-3 py-1.5 text-xs font-bold rounded-xl flex items-center gap-2 text-slate-700 cursor-pointer"
            title={isFa ? 'تغییر زبان به انگلیسی' : 'Switch language to Persian'}
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>{isFa ? 'EN (English)' : 'فارسی (FA)'}</span>
          </button>

          {/* Skeuomorphic Download Resume Button */}
          <SkeuButton
            variant="primary"
            size="sm"
            icon={<FileDown className="w-4 h-4" />}
            onClick={onOpenResumeModal}
            id="nav-download-resume-btn"
          >
            {isFa ? 'دانلود رزومه' : 'Download CV'}
          </SkeuButton>

          {/* Quick Contact Icon Button */}
          <SkeuButton
            variant="dark"
            size="sm"
            asLink
            href="#contact"
            icon={<Mail className="w-4 h-4" />}
            id="nav-contact-btn"
          >
            {isFa ? 'تماس' : 'Contact'}
          </SkeuButton>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onToggleLang}
            className="skeu-button-secondary p-2 rounded-xl text-slate-700"
            aria-label="Toggle language"
          >
            <span className="text-xs font-bold">{isFa ? 'EN' : 'فا'}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="skeu-button-secondary p-2 rounded-xl text-slate-700"
            aria-label="Open menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-5 py-4 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 pb-3 border-b border-slate-100">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-blue-600 font-semibold text-sm py-1.5"
              >
                {link.label[lang]}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2.5 pt-1">
            <SkeuButton
              variant="primary"
              size="md"
              icon={<FileDown className="w-4 h-4" />}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="w-full justify-center"
            >
              {isFa ? 'مشاهده و دانلود رزومه' : 'View & Download CV'}
            </SkeuButton>
            <SkeuButton
              variant="secondary"
              size="md"
              asLink
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full justify-center"
            >
              {isFa ? 'فرم تماس و پیام' : 'Contact Form'}
            </SkeuButton>
          </div>
        </div>
      )}
    </header>
  );
};
