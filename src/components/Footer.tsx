import React from 'react';
import { Language } from '../types';
import { personalInfo } from '../data/cvData';
import { SkeuButton } from './SkeuButton';
import { ArrowUp, Mail, FileDown, MapPin } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onOpenResumeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenResumeModal }) => {
  const isFa = lang === 'fa';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 py-12 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
          
          {/* Brand Info with Profile Avatar */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl overflow-hidden border border-slate-200 shadow-xs shrink-0">
              <img
                src={personalInfo.contact.photoUrl}
                alt={personalInfo.name[lang]}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-base">
                {personalInfo.name[lang]}
              </p>
              <p className="text-xs text-slate-500">
                {personalInfo.title[lang]}
              </p>
            </div>
          </div>

          {/* Skeuomorphic Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <SkeuButton
              variant="secondary"
              size="sm"
              icon={<FileDown className="w-4 h-4" />}
              onClick={onOpenResumeModal}
              id="footer-download-cv-btn"
            >
              {isFa ? 'دانلود رزومه' : 'Download CV'}
            </SkeuButton>

            <a
              href={`mailto:${personalInfo.contact.email}`}
              className="skeu-button-secondary p-2.5 rounded-xl text-blue-600 hover:text-blue-800 flex items-center gap-1.5 text-xs font-semibold"
              aria-label="Email"
              title="Email"
              id="footer-email-link"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">{personalInfo.contact.email}</span>
            </a>

            <button
              onClick={scrollToTop}
              className="skeu-button-secondary p-2.5 rounded-xl text-slate-600 hover:text-slate-950 cursor-pointer"
              aria-label="Scroll to top"
              title={isFa ? 'بازگشت به بالا' : 'Back to top'}
              id="footer-scroll-top-btn"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Sub-footer Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            {isFa
              ? 'تمامی حقوق برای حسنا دوزنده محفوظ است.'
              : 'All rights reserved © Hosna Doozandeh.'}
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{personalInfo.contact.location[lang]}</span>
            </span>
            <span>•</span>
            <a href={`mailto:${personalInfo.contact.email}`} className="hover:text-blue-600 transition-colors">
              {personalInfo.contact.email}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
