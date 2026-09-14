import React from 'react';
import { Language } from '../types';
import { personalInfo } from '../data/cvData';
import { FileDown, ArrowDown, Sparkles, GraduationCap, ShieldCheck } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenResumeModal }) => {
  const isFa = lang === 'fa';

  const stats = [
    {
      value: isFa ? '۲۰+' : '20+',
      label: isFa ? 'سال تجربه' : 'Years of Experience',
      sub: isFa ? 'راهبری آموزشی و تربیتی' : 'Educational Leadership',
    },
    {
      value: isFa ? '۵۰۰+' : '500+',
      label: isFa ? 'دانش‌آموز' : 'Enrolled Students',
      sub: isFa ? 'تحت پوشش هدایت تحصیلی' : 'Academic Mentorship',
    },
    {
      value: isFa ? '۴۰+' : '40+',
      label: isFa ? 'عضو کادر آموزشی' : 'Faculty Members',
      sub: isFa ? 'تیم مدرسان و مشاوران نخبه' : 'Elite Teachers & Counselors',
    },
  ];

  return (
    <section id="about" className="pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Large Floating Hero Panel (Apple-style UI Dashboard feel) */}
      <div className="neu-panel p-6 sm:p-10 lg:p-14 relative overflow-hidden transition-all duration-300">
        
        {/* Main Grid: Info Area + Concentric Clock-like Portrait Dial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Main Content (7 cols in LTR/RTL) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-7">
            
            {/* Soft Eyebrow Pill */}
            <div className="neu-pill px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-xs font-normal text-[#71839A]">
              <span className="w-2 h-2 rounded-full bg-[#8FA8C8]" />
              <span>{isFa ? 'مدیریت با نگاه انسانی' : 'Human-Centered Educational Leadership'}</span>
            </div>

            {/* Name & Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#243B5D] tracking-tight leading-tight">
                {personalInfo.name[lang]}
              </h1>
              <p className="text-lg sm:text-xl font-normal text-[#71839A]">
                {isFa ? 'مدیر دبیرستان دخترانه' : 'Senior High School Principal'}
                <span className="mx-2 text-[#8FA8C8]/60 font-light">|</span>
                <span className="text-base font-light text-[#71839A]/90">
                  {isFa ? 'متخصص سنجش و اندازه‌گیری' : 'Psychometrics Specialist'}
                </span>
              </p>
            </div>

            {/* Educational Philosophy Quote */}
            <blockquote className="border-r-2 rtl:border-r-2 ltr:border-l-2 rtl:border-l-0 border-[#8FA8C8]/40 pr-4 rtl:pr-4 ltr:pl-4 ltr:pr-0 py-1 text-base sm:text-lg text-[#243B5D]/90 font-light leading-relaxed">
              {isFa ? (
                <>
                  «آموزش تنها انتقال دانش نیست؛
                  <br className="hidden sm:inline" />
                  فرصتی است برای ساختن انسان‌هایی مستقل، توانمند و آینده‌ساز.»
                </>
              ) : (
                <>
                  “Education is not merely the transfer of knowledge;
                  <br className="hidden sm:inline" />
                  it is an opportunity to cultivate independent, empowered, and forward-looking human beings.”
                </>
              )}
            </blockquote>

            {/* Action Buttons: Raised Physical Button & Resume Trigger */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#philosophy"
                className="neu-button-primary px-6 sm:px-8 py-3.5 rounded-full text-sm font-light inline-flex items-center gap-2 cursor-pointer shadow-md"
                id="hero-explore-btn"
              >
                <span>{isFa ? 'آشنایی با من' : 'Learn More'}</span>
                <ArrowDown className="w-4 h-4 opacity-80" />
              </a>

              <button
                onClick={onOpenResumeModal}
                className="neu-button px-6 sm:px-7 py-3.5 rounded-full text-sm font-normal text-[#243B5D] inline-flex items-center gap-2 cursor-pointer"
                id="hero-cv-btn"
              >
                <FileDown className="w-4 h-4 text-[#71839A]" />
                <span>{isFa ? 'مشاهده رزومه رسمی' : 'Official CV'}</span>
              </button>
            </div>

            {/* Subtle Credential Tag */}
            <div className="flex items-center gap-2 pt-2 text-xs font-light text-[#71839A]">
              <ShieldCheck className="w-4 h-4 text-[#8FA8C8]" />
              <span>
                {isFa
                  ? 'دارای موافقت اصولی تأسیس مدرسه از وزارت آموزش و پرورش'
                  : 'Official Statutory School Founding Charter Holder'}
              </span>
            </div>

          </div>

          {/* Right/Opposite Column: Circular Clock-Like Raised Portrait Dial */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">
              
              {/* Concentric Clock-like Raised Bezel */}
              <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-88 md:h-88 neu-dial p-4 sm:p-5 flex items-center justify-center relative">
                
                {/* Inner Sunken Ring */}
                <div className="w-full h-full rounded-full p-2 sm:p-2.5 neu-recessed flex items-center justify-center overflow-hidden">
                  
                  {/* Portrait Surface with Soft Vignette */}
                  <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner bg-[#E5EEF7]">
                    <img
                      src={personalInfo.contact.photoUrl}
                      alt={personalInfo.name[lang]}
                      className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[0.98] transition-transform duration-700 hover:scale-105"
                      onError={(e) => {
                        // fallback SVG if photo missing
                        const target = e.target as HTMLElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>

                </div>

                {/* Floating Subtle Micro-Indicator (Like clock dial marker) */}
                <div className="absolute top-2 right-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-[#8FA8C8]/60" />
                <div className="absolute bottom-2 right-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-[#8FA8C8]/40" />

              </div>

              {/* Floating Neumorphic Status Badge */}
              <div className="absolute -bottom-4 rtl:-left-3 ltr:-right-3 sm:bottom-2 rtl:sm:-left-6 ltr:sm:-right-6 neu-pill px-4 py-2 rounded-full text-xs font-light text-[#243B5D] flex items-center gap-2 shadow-sm">
                <GraduationCap className="w-4 h-4 text-[#8FA8C8]" />
                <span>{isFa ? 'مجتمع مدارس هما' : 'Homa Schools'}</span>
              </div>

            </div>
          </div>

        </div>

        {/* Statistics Strip: Floating Neumorphic Statistic Cards */}
        <div className="mt-12 sm:mt-16 pt-10 border-t border-white/60">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="neu-panel-soft p-6 sm:p-7 flex flex-col items-center text-center group transition-all duration-200"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#243B5D] tracking-tight mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-normal text-[#243B5D] mb-1">
                  {stat.label}
                </div>
                <div className="text-xs font-light text-[#71839A]">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
