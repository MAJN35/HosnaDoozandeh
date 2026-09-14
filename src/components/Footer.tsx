import React from 'react';
import { Language } from '../types';
import { useSiteContent } from '../context/ContentContext';
import { ArrowUp, Mail, FileDown, Lock } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onOpenResumeModal: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenResumeModal, onOpenAdmin }) => {
  const { content, setActiveView } = useSiteContent();
  const isFa = lang === 'fa';
  const { hero, contact } = content;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminClick = () => {
    if (onOpenAdmin) {
      onOpenAdmin();
    } else {
      window.location.hash = '#admin';
      setActiveView('admin');
    }
  };

  return (
    <footer className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Floating Soft Neumorphic Bar */}
      <div className="neu-panel-soft p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand Details */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full overflow-hidden neu-circle-node p-0.5 shrink-0">
            <img
              src={hero?.photoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'}
              alt={hero?.name?.[lang] || hero?.name?.fa || ''}
              className="w-full h-full object-cover rounded-full object-top"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-light text-base text-[#243B5D]">
                {hero?.name?.[lang] || hero?.name?.fa || (isFa ? 'حسنا دوزنده' : 'Hosna Doozandeh')}
              </span>
              <span className="text-[11px] font-light text-[#71839A] px-2 py-0.5 rounded-full neu-pill">
                {hero?.role?.[lang] || hero?.role?.fa || (isFa ? 'مدیر دبیرستان دخترانه' : 'High School Principal')}
              </span>
            </div>
            <p className="text-xs font-light text-[#71839A] mt-0.5">
              {(hero?.complexBadge?.[lang] || hero?.complexBadge?.fa || (isFa ? 'مجتمع مدارس هما' : 'Homa Schools'))} • {isFa ? 'آموزش و پرورش منطقه ۵ تهران' : 'District 5 Tehran'}
            </p>
          </div>
        </div>

        {/* Action Controls: Resume Modal, Email, Admin & Back to top */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenResumeModal}
            className="neu-button px-4 py-2 rounded-full text-xs font-normal text-[#243B5D] flex items-center gap-1.5 cursor-pointer"
            id="footer-resume-btn"
          >
            <FileDown className="w-3.5 h-3.5 text-[#71839A]" />
            <span>{isFa ? 'رزومه رسمی' : 'Official CV'}</span>
          </button>

          <a
            href={`mailto:${contact.email}`}
            className="neu-button p-2.5 rounded-full text-[#71839A] hover:text-[#243B5D] cursor-pointer"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={handleAdminClick}
            className="neu-button p-2.5 rounded-full text-[#71839A] hover:text-[#243B5D] cursor-pointer"
            aria-label="Admin Page"
            title={isFa ? 'ویرایش و مدیریت محتوا' : 'Content Admin Editor'}
          >
            <Lock className="w-4 h-4" />
          </button>

          <button
            onClick={scrollToTop}
            className="neu-button p-2.5 rounded-full text-[#71839A] hover:text-[#243B5D] cursor-pointer"
            aria-label={isFa ? 'بازگشت به ابتدای صفحه' : 'Back to top'}
            title={isFa ? 'بازگشت به بالا' : 'Back to top'}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Domain & Copyright Subtitle */}
      <div className="mt-6 text-center text-xs font-light text-[#71839A] flex flex-col sm:flex-row items-center justify-center gap-2">
        <span>
          {isFa
            ? 'تمامی حقوق محفوظ است © ۱۴۰۴ حسنا دوزنده'
            : 'All rights reserved © 2026 Hosna Doozandeh'}
        </span>
        <span className="hidden sm:inline text-[#8FA8C8]">•</span>
        <span className="font-mono text-[11px]">{contact.website}</span>
      </div>
    </footer>
  );
};
