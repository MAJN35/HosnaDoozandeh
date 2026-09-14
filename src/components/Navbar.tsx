import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { useSiteContent } from '../context/ContentContext';
import { FileDown, Globe, Menu, X, Lock } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenResumeModal: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenResumeModal,
  onOpenAdmin,
}) => {
  const { content, setActiveView } = useSiteContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isFa = lang === 'fa';

  const navLinks = [
    { href: '#about', label: { fa: 'درباره من', en: 'About Me' } },
    { href: '#philosophy', label: { fa: 'فلسفه آموزشی', en: 'Leadership Philosophy' } },
    { href: '#journey', label: { fa: 'مسیر حرفه‌ای', en: 'Professional Journey' } },
    { href: '#achievements', label: { fa: 'دستاوردها', en: 'Achievements' } },
    { href: '#gallery', label: { fa: 'فعالیت‌ها', en: 'Activities' } },
    { href: '#contact', label: { fa: 'تماس', en: 'Contact' } },
  ];

  const handleAdminClick = () => {
    if (onOpenAdmin) {
      onOpenAdmin();
    } else {
      window.location.hash = '#admin';
      setActiveView('admin');
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-4 inset-x-3 sm:inset-x-6 max-w-6xl mx-auto z-50"
    >
      {/* Floating Soft Physical Bar */}
      <div className="bg-[#EDF4FA]/92 backdrop-blur-xl border border-white/80 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-[-8px_-8px_20px_rgba(255,255,255,0.95),8px_10px_24px_rgba(175,195,222,0.38),inset_0_1px_1px_rgba(255,255,255,0.95)] flex items-center justify-between transition-all duration-300">
        
        {/* Name / Brand Identity */}
        <a href="#about" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden neu-circle-node p-0.5 shrink-0 transition-transform group-hover:scale-105">
            <img
              src={content?.hero?.photoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'}
              alt={content?.hero?.name?.[lang] || content?.hero?.name?.fa || ''}
              className="w-full h-full object-cover rounded-full object-top"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-light text-base sm:text-lg text-[#243B5D] tracking-tight">
                {content?.hero?.name?.[lang] || content?.hero?.name?.fa || (isFa ? 'حسنا دوزنده' : 'Hosna Doozandeh')}
              </span>
              <span className="hidden md:inline-block text-[11px] text-[#71839A] font-light px-2 py-0.5 rounded-full neu-pill">
                {isFa ? 'مدیر دبیرستان دخترانه' : 'High School Principal'}
              </span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-normal text-[#71839A] hover:text-[#243B5D] hover:bg-[#E5EEF7]/70 transition-all duration-200"
            >
              {link.label[lang]}
            </a>
          ))}
        </nav>

        {/* Action Buttons: Admin, Language Switch & Official Resume Modal */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Admin Page Lock Button */}
          <button
            onClick={handleAdminClick}
            className="neu-button p-2 sm:px-2.5 sm:py-1.5 rounded-full text-xs font-normal text-[#71839A] hover:text-[#243B5D] flex items-center gap-1.5 cursor-pointer transition-colors"
            title={isFa ? 'ورود به پنل مدیریت محتوا' : 'Admin Content Editor'}
            id="nav-admin-btn"
            aria-label="Admin Page"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden xl:inline text-[11px] font-light">{isFa ? 'مدیریت' : 'Admin'}</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="neu-button px-3 py-1.5 rounded-full text-xs font-normal text-[#243B5D] flex items-center gap-1.5 cursor-pointer"
            aria-label="Toggle Language"
            id="nav-lang-toggle-btn"
          >
            <Globe className="w-3.5 h-3.5 text-[#71839A]" />
            <span className="text-[11px]">{isFa ? 'EN' : 'فا'}</span>
          </button>

          {/* Official Resume Preview Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenResumeModal}
            className="neu-button-primary px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-light flex items-center gap-1.5 cursor-pointer shadow-xs"
            id="nav-resume-btn"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isFa ? 'رزومه رسمی' : 'Official CV'}</span>
          </motion.button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden neu-button p-2 rounded-full text-[#243B5D] flex items-center justify-center cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Soft Neumorphic Panel) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mt-2 p-5 bg-[#EDF4FA]/96 backdrop-blur-2xl border border-white/80 rounded-[32px] shadow-[-8px_-8px_20px_rgba(255,255,255,0.95),8px_10px_24px_rgba(175,195,222,0.4)]"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-2xl text-sm font-normal text-[#243B5D] hover:bg-[#E5EEF7] transition-colors flex items-center justify-between"
                >
                  <span>{link.label[lang]}</span>
                  <span className="text-xs text-[#71839A]">←</span>
                </a>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/60 flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    onToggleLang();
                    setMobileMenuOpen(false);
                  }}
                  className="neu-button flex-1 py-2 rounded-full text-xs font-normal text-[#243B5D] flex items-center justify-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-[#71839A]" />
                  <span>{isFa ? 'English Version' : 'نسخه فارسی'}</span>
                </button>

                <button
                  onClick={() => {
                    onOpenResumeModal();
                    setMobileMenuOpen(false);
                  }}
                  className="neu-button-primary flex-1 py-2 rounded-full text-xs font-light flex items-center justify-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>{isFa ? 'دریافت رزومه' : 'Official CV'}</span>
                </button>
              </div>

              {/* Mobile Admin Link */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleAdminClick();
                }}
                className="neu-button w-full py-2 rounded-full text-xs font-light text-[#526987] flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-[#71839A]" />
                <span>{isFa ? 'ورود به پنل مدیریت محتوا' : 'Admin Content Editor'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
