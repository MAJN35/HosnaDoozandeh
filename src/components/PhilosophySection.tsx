import React from 'react';
import { Language } from '../types';
import { UserCheck, Sparkles, Award, HeartHandshake } from 'lucide-react';

interface PhilosophySectionProps {
  lang: Language;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ lang }) => {
  const isFa = lang === 'fa';

  const cards = [
    {
      id: 'student-centered',
      title: { fa: 'دانش‌آموزمحوری', en: 'Student-Centered Learning' },
      subtitle: { fa: 'شناسایی و شکوفایی استعدادهای فردی', en: 'Tailored Cognitive & Personal Pathways' },
      description: {
        fa: 'باور به این اصل بنیادین که هر دانش‌آموز دارای هویت و منظومه شناختی منحصربه‌فرد است؛ تدوین مسیر یادگیری بر مبنای روان‌سنجی و پایش بهزیستی روانی.',
        en: 'Grounded in the fundamental belief that each learner possesses unique cognitive strengths and potential; developing personalized paths guided by psychometrics.',
      },
      icon: UserCheck,
    },
    {
      id: 'teacher-empowerment',
      title: { fa: 'توانمندسازی معلمان', en: 'Teacher Empowerment' },
      subtitle: { fa: 'سرمایه‌گذاری روی رکن اصلی آموزش', en: 'Continuous Faculty Mastery & Agency' },
      description: {
        fa: 'فراهم‌سازی بستر رشد حرفه‌ای مستمر، استقلال آموزشی، کارگاه‌های تخصصی پداگوژی و ایجاد محیطی آرام، انگیزه‌بخش و مبتنی بر احترام متقابل.',
        en: 'Cultivating ongoing professional growth, instructional autonomy, modern pedagogy workshops, and a workplace culture grounded in mutual trust.',
      },
      icon: HeartHandshake,
    },
    {
      id: 'educational-excellence',
      title: { fa: 'تعالی آموزشی', en: 'Educational Excellence' },
      subtitle: { fa: 'کیفیت‌بخشی و برنامه‌ریزی هدفمند', en: 'Rigorous Standards & Strategic Planning' },
      description: {
        fa: 'استقرار استانداردهای یادگیری روزآمد، تدوین برنامه‌های عملیاتی منسجم (OP)، پایش مداوم شاخص‌های کیفی و آماده‌سازی دانش‌آموزان برای رقابت‌های علمی.',
        en: 'Embedding state-of-the-art learning standards, disciplined operational plans (OP), and rigorous KPI tracking for superior academic outcomes.',
      },
      icon: Award,
    },
    {
      id: 'personal-growth',
      title: { fa: 'رشد فردی', en: 'Holistic Personal Growth' },
      subtitle: { fa: 'تربیت شخصیت، هویت و خودباوری', en: 'Character, Resilience & Agency' },
      description: {
        fa: 'فراتر رفتن از مرزهای کتاب درسی به‌سوی آموزش مهارت‌های زندگی، فنون مذاکره، مدیریت هیجانات، اخلاق‌مداری و پرورش دخترانی خودباور و مستقل.',
        en: 'Transcend textbook boundaries to nurture emotional resilience, negotiation prowess, ethical responsibility, and confident future women leaders.',
      },
      icon: Sparkles,
    },
  ];

  return (
    <section id="philosophy" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="neu-pill px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-xs font-normal text-[#71839A]">
          <span className="w-2 h-2 rounded-full bg-[#8FA8C8]" />
          <span>{isFa ? 'اصول راهبری دبیرستان' : 'Educational Framework'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-light text-[#243B5D] tracking-tight">
          {isFa ? 'فلسفه آموزشی' : 'Leadership Philosophy'}
        </h2>
        <p className="text-sm sm:text-base font-light text-[#71839A] leading-relaxed">
          {isFa
            ? 'چهار رکن بنیادین در مدیریت انسان‌محور و هدایت نسل آینده‌ساز دختران دبیرستان هما'
            : 'Four foundational pillars guiding human-centered school leadership and character development'}
        </p>
      </div>

      {/* Four Large Rounded Neumorphic Cards (Raised Controls feel) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="neu-card p-8 sm:p-10 flex flex-col justify-between group"
            >
              <div>
                {/* Subtle Monochrome Raised Icon Circle */}
                <div className="w-14 h-14 rounded-2xl neu-button flex items-center justify-center mb-6 text-[#243B5D] transition-transform duration-300 group-hover:scale-105">
                  <Icon className="w-6 h-6 stroke-[1.4] text-[#243B5D]" />
                </div>

                {/* Card Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-light text-[#243B5D] mb-2 tracking-tight">
                  {card.title[lang]}
                </h3>
                <div className="text-xs font-normal text-[#8FA8C8] mb-4">
                  {card.subtitle[lang]}
                </div>

                {/* Description */}
                <p className="text-sm font-light text-[#71839A] leading-relaxed">
                  {card.description[lang]}
                </p>
              </div>

              {/* Subtle bottom indicator */}
              <div className="pt-6 mt-6 border-t border-white/60 flex items-center justify-between text-xs text-[#71839A]/70">
                <span className="font-light">{isFa ? 'دبیرستان دخترانه هما' : 'Homa Girls’ High School'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8FA8C8]/60" />
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
