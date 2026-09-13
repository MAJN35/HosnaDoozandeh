import React from 'react';
import { Language } from '../types';
import { personalInfo } from '../data/cvData';
import { SkeuButton } from './SkeuButton';
import {
  FileDown,
  Mail,
  MapPin,
  Award,
  BookOpen,
  Building2,
  ChevronDown,
  CheckCircle,
} from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenResumeModal }) => {
  const isFa = lang === 'fa';

  return (
    <section id="about" className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-slate-200/60 bg-linear-to-b from-white via-slate-50/50 to-[#F8F9FA]">
      
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-slate-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Info Column */}
          <div className="lg:col-span-8 flex flex-col items-start space-y-6">
            
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/80 text-blue-800 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>
                {isFa
                  ? 'عضو هیئت مدیره و مؤسس مجتمع مدارس هما'
                  : 'Board Member & Founder, Homa Schools Complex'}
              </span>
            </div>

            {/* Main Name & Title */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {personalInfo.name[lang]}
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-blue-700 leading-snug">
                {personalInfo.title[lang]}
              </p>
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                {personalInfo.subtitle[lang]}
              </p>
            </div>

            {/* Executive Bio */}
            <p className="text-sm sm:text-base leading-relaxed text-slate-700 text-justify max-w-3xl">
              {personalInfo.bio[lang]}
            </p>

            {/* Contact Info Pills (Email & Location only) */}
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-blue-400 hover:text-blue-700 transition-colors shadow-xs"
                id="hero-email-badge"
              >
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>{personalInfo.contact.email}</span>
              </a>

              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{personalInfo.contact.location[lang]}</span>
              </div>
            </div>

            {/* Skeuomorphic Action Buttons Bar */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {/* Download Resume Button */}
              <SkeuButton
                variant="primary"
                size="lg"
                icon={<FileDown className="w-5 h-5" />}
                onClick={onOpenResumeModal}
                id="hero-download-cv-btn"
              >
                {isFa ? 'دانلود و چاپ رزومه' : 'Download Full CV'}
              </SkeuButton>

              {/* View Projects CTA */}
              <SkeuButton
                variant="secondary"
                size="lg"
                asLink
                href="#projects"
                icon={<ChevronDown className="w-4 h-4" />}
                iconPosition="right"
                id="hero-view-projects-btn"
              >
                {isFa ? 'مشاهده پروژه‌ها' : 'View Projects'}
              </SkeuButton>

              {/* Contact Button */}
              <SkeuButton
                variant="dark"
                size="lg"
                asLink
                href="#contact"
                icon={<Mail className="w-4 h-4" />}
                id="hero-contact-cta-btn"
              >
                {isFa ? 'ارسال پیام' : 'Contact Me'}
              </SkeuButton>
            </div>

          </div>

          {/* Profile Picture Column */}
          <div className="lg:col-span-4 flex flex-col items-center">
            
            {/* Skeuomorphic Portrait Frame */}
            <div className="relative p-2.5 sm:p-3 rounded-3xl bg-linear-to-b from-white via-slate-100 to-slate-200/90 shadow-[inset_0_1px_0_#FFFFFF,0_10px_28px_rgba(15,23,42,0.12)] border border-slate-300/80">
              
              <div className="w-64 sm:w-72 aspect-3/4 rounded-2xl overflow-hidden relative shadow-inner border border-slate-200 bg-slate-100">
                <img
                  src={personalInfo.contact.photoUrl}
                  alt={personalInfo.name[lang]}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                
                {/* Subtle bottom gradient overlay for readability */}
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950/80 via-slate-900/30 to-transparent p-4 text-white">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <CheckCircle className="w-3.5 h-3.5 fill-amber-400 text-slate-900" />
                    <span>{personalInfo.name[lang]}</span>
                  </div>
                  <p className="text-[11px] text-slate-200 mt-0.5 line-clamp-1">
                    {personalInfo.title[lang]}
                  </p>
                </div>
              </div>

              {/* Decorative side badge */}
              <div className="absolute -bottom-3 -right-3 sm:-right-4 px-3.5 py-1.5 rounded-xl bg-linear-to-b from-amber-400 to-amber-500 text-amber-950 font-bold text-xs shadow-md border border-amber-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>{isFa ? 'مؤسس ۳ مقطع تحصیلی' : 'Founded 3 Tiers'}</span>
              </div>
            </div>

            {/* Quick credentials caption */}
            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>
                  {isFa
                    ? 'کارشناسی ارشد روان‌سنجی | کارشناسی مدیریت آموزشی'
                    : 'M.Sc. Psychometrics | B.A. Educational Management'}
                </span>
              </p>
            </div>

          </div>

        </div>

        {/* High-Level Impact Metrics Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {personalInfo.keyMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="skeu-card p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center transition-transform hover:-translate-y-0.5"
              >
                <span className="text-2xl sm:text-3xl font-extrabold text-blue-700 tracking-tight font-mono">
                  {metric.value}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                  {metric.label[lang]}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
