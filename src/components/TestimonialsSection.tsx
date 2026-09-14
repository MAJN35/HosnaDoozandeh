import React from 'react';
import { Language } from '../types';
import { Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  lang: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ lang }) => {
  const isFa = lang === 'fa';

  const testimonials = [
    {
      id: 'parent-council',
      quote: {
        fa: 'حضور خانم دوزنده در رأس مدیریت دبیرستان، آرامش روانی عمیقی به خانواده‌ها بخشیده است. توجه ایشان به شأن دانش‌آموزان و شنیدن دغدغه‌های اولیا با رویکردی علمی، مثال‌زدنی است.',
        en: 'Ms. Doozandeh’s compassionate and scientific approach brings immense peace of mind to families. Her unwavering respect for student agency and attentive dialogue with parents is exemplary.',
      },
      author: {
        fa: 'مهندس م. رضایی',
        en: 'Eng. M. Rezaei',
      },
      role: {
        fa: 'عضو انجمن اولیا و مربیان دبیرستان',
        en: 'Member, Parent-Teacher Association',
      },
      institution: {
        fa: 'دبیرستان دخترانه هما',
        en: 'Homa Girls’ High School',
      },
    },
    {
      id: 'faculty-member',
      quote: {
        fa: 'مدیریت ایشان ترکیبی کم‌نظیر از انضباط سازمانی، استقلال عمل معلم و احترام متقابل است. کار کردن در فضایی که نگاه انسانی اصل اول است، انگیزه تدریس را دوچندان می‌کند.',
        en: 'Her leadership seamlessly merges organizational discipline with pedagogical autonomy and mutual trust. Teaching in an environment where human dignity comes first is truly inspiring.',
      },
      author: {
        fa: 'دکتر س. طاهری',
        en: 'Dr. S. Taheri',
      },
      role: {
        fa: 'دبیر دوره دوم و سرگروه آموزشی',
        en: 'Senior Faculty & Department Chair',
      },
      institution: {
        fa: 'مجتمع مدارس هما',
        en: 'Homa Educational Complex',
      },
    },
    {
      id: 'district-supervisor',
      quote: {
        fa: 'تدوین برنامه‌های عملیاتی مدون (OP) و به‌کارگیری ابزارهای سنجش روان‌شناختی توسط سرکار خانم دوزنده، الگویی موفق در ارتقای کیفیت مدارس منطقه ۵ تهران به شمار می‌رود.',
        en: 'Her formulation of structured Operational Plans (OP) coupled with standardized psychometric diagnostics represents a gold standard in District 5 educational governance.',
      },
      author: {
        fa: 'استاد ف. باقری',
        en: 'Prof. F. Bagheri',
      },
      role: {
        fa: 'کارشناس ارشد ارزیابی آموزشی',
        en: 'Senior Educational Quality Inspector',
      },
      institution: {
        fa: 'آموزش و پرورش منطقه ۵ تهران',
        en: 'District 5 Education Administration',
      },
    },
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 space-y-3">
        <div className="neu-pill px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-xs font-normal text-[#71839A]">
          <span className="w-2 h-2 rounded-full bg-[#8FA8C8]" />
          <span>{isFa ? 'دیدگاه‌ها و اعتماد متقابل' : 'Stakeholder Perspectives'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-light text-[#243B5D] tracking-tight">
          {isFa ? 'هم‌افزایی با معلمان، اولیا و ناظران' : 'Voices of Trust & Collaboration'}
        </h2>
        <p className="text-sm sm:text-base font-light text-[#71839A] leading-relaxed">
          {isFa
            ? 'روایت همکاران، خانواده‌ها و کارشناسان آموزشی از سبک راهبری انسان‌محور'
            : 'Insights from faculty, parents, and district inspectors on empathetic, principled leadership'}
        </p>
      </div>

      {/* Floating Rounded Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 sm:gap-8">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="neu-card p-7 sm:p-8 flex flex-col justify-between group"
          >
            <div>
              {/* Subtle Quote Symbol */}
              <div className="w-10 h-10 rounded-full neu-button flex items-center justify-center text-[#8FA8C8] mb-5">
                <Quote className="w-4 h-4" />
              </div>

              {/* Quote Content */}
              <p className="text-sm font-light text-[#243B5D] leading-relaxed mb-6">
                «{t.quote[lang]}»
              </p>
            </div>

            {/* Profile Info */}
            <div className="pt-4 border-t border-white/60">
              <div className="text-sm font-normal text-[#243B5D]">
                {t.author[lang]}
              </div>
              <div className="text-xs font-light text-[#71839A] mt-0.5">
                {t.role[lang]}
              </div>
              <div className="text-[11px] font-light text-[#8FA8C8] mt-0.5">
                {t.institution[lang]}
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
