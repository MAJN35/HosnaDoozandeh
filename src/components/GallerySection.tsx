import React from 'react';
import { Language } from '../types';
import { Camera, Sparkles, HeartHandshake, BookOpen, Users, Compass } from 'lucide-react';

interface GallerySectionProps {
  lang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const isFa = lang === 'fa';

  const items = [
    {
      id: 'mentorship-session',
      title: { fa: 'مشاوره و سنجش روان‌شناختی فردی', en: 'Individual Cognitive Counseling' },
      category: { fa: 'هدایت تحصیلی و روان‌سنجی', en: 'Psychometrics & Pacing' },
      description: {
        fa: 'جلسات تحلیل آزمون‌های هنجارشده و پایش سلامت روان دانش‌آموزان در آستانه امتحانات و کنکور سراسری.',
        en: 'Structured sessions analyzing standardized cognitive diagnostics and supporting adolescent well-being.',
      },
      imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
      span: 'lg:col-span-7 lg:row-span-2',
      aspect: 'aspect-4/3 sm:aspect-16/10',
    },
    {
      id: 'faculty-council',
      title: { fa: 'شورای معلمان و راهبری کیفیت آموزشی', en: 'Faculty Council & Pedagogy Strategy' },
      category: { fa: 'توانمندسازی همکاران', en: 'Teacher Empowerment' },
      description: {
        fa: 'هم‌اندیشی هفتگی پیرامون روش‌های نوین تدریس و تطبیق با تقویم امتحانات نهایی.',
        en: 'Weekly deliberations on modern instructional practices and aligning syllabus pacing.',
      },
      imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
      span: 'lg:col-span-5',
      aspect: 'aspect-4/3 sm:aspect-16/9',
    },
    {
      id: 'science-lab',
      title: { fa: 'فضاهای یادگیری پژوهش‌محور و کارگاهی', en: 'Inquiry-Based Scientific Learning' },
      category: { fa: 'فضای آموزشی دبیرستان', en: 'High School Environment' },
      description: {
        fa: 'تقویت روحیه پژوهش، کار تیمی و کشف علمی در آزمایشگاه‌ها و کارگاه‌های دبیرستان.',
        en: 'Promoting teamwork, empirical exploration, and creative scientific discovery.',
      },
      imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80',
      span: 'lg:col-span-5',
      aspect: 'aspect-4/3 sm:aspect-16/9',
    },
    {
      id: 'social-responsibility',
      title: { fa: 'مسئولیت اجتماعی: توانمندسازی کودکان کار', en: 'Social Responsibility & Child Advocacy' },
      category: { fa: 'خدمت اجتماعی', en: 'Community Service' },
      description: {
        fa: 'اجرای آزمون‌های هنجارشده روان‌سنجی، ارزیابی وضعیت شناختی و پیاده‌سازی پروتکل‌های حمایتی.',
        en: 'Administering standardized psychometric tests and cognitive support protocols for underprivileged children.',
      },
      imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80',
      span: 'lg:col-span-12',
      aspect: 'aspect-16/9 sm:aspect-21/9',
    },
  ];

  return (
    <section id="gallery" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 space-y-3">
        <div className="neu-pill px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-xs font-normal text-[#71839A]">
          <span className="w-2 h-2 rounded-full bg-[#8FA8C8]" />
          <span>{isFa ? 'نگارخانه و زیست‌بوم آموزشی' : 'Educational Environment'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-light text-[#243B5D] tracking-tight">
          {isFa ? 'فعالیت‌ها و فضاهای یادگیری' : 'Activities & Learning Spaces'}
        </h2>
        <p className="text-sm sm:text-base font-light text-[#71839A] leading-relaxed">
          {isFa
            ? 'تصاویری از محیط پویا، تعاملی و پرورشی دبیرستان دخترانه هما و برنامه‌های تخصصی'
            : 'Moments capturing vibrant mentorship, instructional spaces, and community advocacy'}
        </p>
      </div>

      {/* Asymmetric Editorial Gallery Grid with Soft Neumorphic Surfaces */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            className={`${item.span} neu-card p-3 sm:p-4 group flex flex-col justify-between overflow-hidden`}
          >
            {/* Image Container with Soft Large Radius and Zero Harsh Borders */}
            <div className={`w-full ${item.aspect} rounded-[24px] overflow-hidden relative shadow-inner bg-[#E5EEF7]`}>
              <img
                src={item.imageUrl}
                alt={item.title[lang]}
                className="w-full h-full object-cover filter brightness-[1.01] contrast-[0.98] transition-transform duration-700 group-hover:scale-103"
                loading="lazy"
              />
              
              {/* Subtle Translucent Overlay Tag */}
              <div className="absolute top-4 rtl:right-4 ltr:left-4 neu-pill px-3.5 py-1.5 rounded-full text-xs font-light text-[#243B5D]">
                {item.category[lang]}
              </div>
            </div>

            {/* Editorial Caption Area */}
            <div className="p-4 sm:p-5">
              <h3 className="text-lg sm:text-xl font-normal text-[#243B5D] mb-1.5 tracking-tight">
                {item.title[lang]}
              </h3>
              <p className="text-xs sm:text-sm font-light text-[#71839A] leading-relaxed">
                {item.description[lang]}
              </p>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
