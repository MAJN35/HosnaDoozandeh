import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { useSiteContent } from '../context/ContentContext';
import { FileDown, ArrowDown, GraduationCap, ShieldCheck } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenResumeModal }) => {
  const { content } = useSiteContent();
  const isFa = lang === 'fa';
  const hero = content?.hero;

  const eyebrowText = hero?.eyebrow?.[lang] || hero?.eyebrow?.fa || (isFa ? 'مدیریت با نگاه انسانی' : 'Human-Centered Educational Leadership');
  const nameText = hero?.name?.[lang] || hero?.name?.fa || (isFa ? 'حسنا دوزنده' : 'Hosna Doozandeh');
  const roleText = hero?.role?.[lang] || hero?.role?.fa || (isFa ? 'مدیر دبیرستان دخترانه هما (دوره دوم)' : 'Principal, Homa Girls’ High School');
  const specialtyText = hero?.specialty?.[lang] || hero?.specialty?.fa || (isFa ? 'متخصص سنجش و اندازه‌گیری' : 'Psychometrics Specialist');
  const quoteText = hero?.quote?.[lang] || hero?.quote?.fa || '';
  const charterText = hero?.charterText?.[lang] || hero?.charterText?.fa || '';
  const complexBadge = hero?.complexBadge?.[lang] || hero?.complexBadge?.fa || (isFa ? 'مجتمع مدارس هما' : 'Homa Schools');
  const photoUrl = hero?.photoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';
  const stats = hero?.stats || [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      id="about"
      className="pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      {/* Large Floating Hero Panel */}
      <div className="neu-panel p-6 sm:p-10 lg:p-14 relative overflow-hidden transition-all duration-300">
        
        {/* Main Grid: Info Area + Concentric Clock-like Portrait Dial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Main Content (7 cols in LTR/RTL) */}
          <motion.div
            initial={{ opacity: 0, x: isFa ? 25 : -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start space-y-7"
          >
            {/* Soft Eyebrow Pill */}
            <div className="neu-pill px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-xs font-normal text-[#71839A]">
              <span className="w-2 h-2 rounded-full bg-[#8FA8C8] animate-pulse" />
              <span>{eyebrowText}</span>
            </div>

            {/* Name & Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#243B5D] tracking-tight leading-tight">
                {nameText}
              </h1>
              <p className="text-lg sm:text-xl font-normal text-[#71839A]">
                {roleText}
                <span className="mx-2 text-[#8FA8C8]/60 font-light">|</span>
                <span className="text-base font-light text-[#71839A]/90">
                  {specialtyText}
                </span>
              </p>
            </div>

            {/* Educational Philosophy Quote */}
            <blockquote className="border-r-2 rtl:border-r-2 ltr:border-l-2 rtl:border-l-0 border-[#8FA8C8]/40 pr-4 rtl:pr-4 ltr:pl-4 ltr:pr-0 py-1 text-base sm:text-lg text-[#243B5D]/90 font-light leading-relaxed">
              {quoteText}
            </blockquote>

            {/* Action Buttons: Raised Physical Button & Resume Trigger */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#philosophy"
                className="neu-button-primary px-6 sm:px-8 py-3.5 rounded-full text-sm font-light inline-flex items-center gap-2 cursor-pointer shadow-md"
                id="hero-explore-btn"
              >
                <span>{isFa ? 'آشنایی با من' : 'Learn More'}</span>
                <ArrowDown className="w-4 h-4 opacity-80" />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenResumeModal}
                className="neu-button px-6 sm:px-7 py-3.5 rounded-full text-sm font-normal text-[#243B5D] inline-flex items-center gap-2 cursor-pointer"
                id="hero-cv-btn"
              >
                <FileDown className="w-4 h-4 text-[#71839A]" />
                <span>{isFa ? 'مشاهده رزومه رسمی' : 'Official CV'}</span>
              </motion.button>
            </div>

            {/* Subtle Credential Tag */}
            {charterText && (
              <div className="flex items-center gap-2 pt-2 text-xs font-light text-[#71839A]">
                <ShieldCheck className="w-4 h-4 text-[#8FA8C8]" />
                <span>{charterText}</span>
              </div>
            )}

          </motion.div>

          {/* Right Column: Circular Clock-Like Raised Portrait Dial */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Concentric Clock-like Raised Bezel */}
              <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-88 md:h-88 neu-dial p-4 sm:p-5 flex items-center justify-center relative">
                
                {/* Inner Sunken Ring */}
                <div className="w-full h-full rounded-full p-2 sm:p-2.5 neu-recessed flex items-center justify-center overflow-hidden">
                  
                  {/* Portrait Surface with Soft Vignette */}
                  <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner bg-[#E5EEF7]">
                    <img
                      src={photoUrl}
                      alt={`${nameText} - ${roleText} (${specialtyText})`}
                      className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[0.98] transition-transform duration-700 hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>

                </div>

                {/* Floating Subtle Micro-Indicator */}
                <div className="absolute top-2 right-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-[#8FA8C8]/60" />
                <div className="absolute bottom-2 right-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-[#8FA8C8]/40" />

              </div>

              {/* Floating Neumorphic Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-4 rtl:-left-3 ltr:-right-3 sm:bottom-2 rtl:sm:-left-6 ltr:sm:-right-6 neu-pill px-4 py-2 rounded-full text-xs font-light text-[#243B5D] flex items-center gap-2 shadow-sm"
              >
                <GraduationCap className="w-4 h-4 text-[#8FA8C8]" />
                <span>{complexBadge}</span>
              </motion.div>

            </motion.div>
          </div>

        </div>

        {/* Statistics Strip: Floating Neumorphic Statistic Cards with Staggered Animation */}
        {stats.length > 0 && (
          <div className="mt-12 sm:mt-16 pt-10 border-t border-white/60">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                  whileHover={{ y: -3 }}
                  className="neu-panel-soft p-6 sm:p-7 flex flex-col items-center text-center group transition-all duration-200"
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#243B5D] tracking-tight mb-2">
                    {stat?.value?.[lang] || stat?.value?.fa || ''}
                  </div>
                  <div className="text-sm font-normal text-[#243B5D] mb-1">
                    {stat?.label?.[lang] || stat?.label?.fa || ''}
                  </div>
                  <div className="text-xs font-light text-[#71839A]">
                    {stat?.sub?.[lang] || stat?.sub?.fa || ''}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </motion.section>
  );
};
