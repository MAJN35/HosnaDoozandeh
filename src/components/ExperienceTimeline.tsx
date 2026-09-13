import React, { useState } from 'react';
import { Language } from '../types';
import { experiences } from '../data/cvData';
import { Briefcase, Building, CheckCircle2, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';

interface ExperienceTimelineProps {
  lang: Language;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  const [selectedExpId, setSelectedExpId] = useState<string>(experiences[0].id);

  const selectedExp = experiences.find((e) => e.id === selectedExpId) || experiences[0];

  const organizationalMilestones = [
    {
      title: {
        fa: 'مدیر، مؤسس و دارنده موافقت اصولی مجتمع آموزشی هما',
        en: 'Director, Founder & Principle Permit Holder of Homa Complex',
      },
      desc: {
        fa: 'اخذ مجوزهای جامع قانونی مقاطع ابتدایی، متوسطه دوره اول و متوسطه دوره دوم دخترانه',
        en: 'Official Ministry of Education charters across elementary and secondary divisions',
      },
    },
    {
      title: {
        fa: 'عضو موظف هیئت‌مدیره مؤسسه آموزشی هما',
        en: 'Full-Time Executive Board Member, Homa Educational Institute',
      },
      desc: {
        fa: 'وابسته به صندوق بازنشستگی هما، راهبری سرمایه‌گذاری‌ها و انطباق حاکمیتی',
        en: 'Affiliated with the Homa Pension Fund; overseeing governance and institutional assets',
      },
    },
    {
      title: {
        fa: 'نماینده رسمی حقوقی مؤسسه هما در مراجع دولتی و نظارتی',
        en: 'Official Legal Representative to State & Regulatory Authorities',
      },
      desc: {
        fa: 'انعقاد تفاهم‌نامه‌ها، پیگیری پرونده‌های حقوقی و دفاع از منافع قانونی مجتمع',
        en: 'Statutory compliance, ministerial covenants, and legal affairs management',
      },
    },
  ];

  return (
    <section id="experience" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100/70 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{isFa ? 'سوابق مدیریتی و اجرایی' : 'Executive Career Track'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isFa ? 'مسئولیت‌های کلیدی و سوابق سازمانی' : 'Leadership Roles & Organizational Track Record'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-1">
            {isFa
              ? 'بیش از یک دهه راهبری در مقاطع مختلف تحصیلی، تأسیس مدارس و مشارکت فعال در هیئت‌مدیره'
              : 'Over a decade of multi-tier institutional governance, school founding, and executive stewardship.'}
          </p>
        </div>

        {/* Master-Detail Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Chronological Timeline Selector */}
          <div className="lg:col-span-5 space-y-3">
            {experiences.map((exp) => {
              const isSelected = exp.id === selectedExpId;
              return (
                <button
                  key={exp.id}
                  onClick={() => setSelectedExpId(exp.id)}
                  className={`w-full text-start p-4 rounded-2xl transition-all duration-200 cursor-pointer relative ${
                    isSelected
                      ? 'bg-white border-2 border-blue-600 shadow-md ring-1 ring-blue-500/20'
                      : 'bg-white/80 border border-slate-200/90 hover:bg-white hover:border-slate-300 shadow-2xs'
                  }`}
                  id={`exp-item-${exp.id}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                          exp.isCurrent
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {exp.period[lang]}
                      </span>
                      {exp.isCurrent && (
                        <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                          {isFa ? 'فعال' : 'Active'}
                        </span>
                      )}
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isSelected ? 'rotate-90 text-blue-600' : ''
                      }`}
                    />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-2.5">
                    {exp.role[lang]}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{exp.organization[lang]}</span>
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Selected Role Deep Dive Card */}
          <div className="lg:col-span-7">
            <div className="skeu-card p-6 sm:p-8 rounded-3xl relative overflow-hidden">
              
              {/* Header inside card */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
                    {selectedExp.period[lang]}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                    {selectedExp.role[lang]}
                  </h3>
                  <p className="text-sm font-semibold text-blue-700 mt-1">
                    {selectedExp.organization[lang]}
                  </p>
                </div>
                
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
              </div>

              {/* Description */}
              <div className="py-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {isFa ? 'شرح مأموریت و حوزه راهبری' : 'Mission & Executive Scope'}
                </h4>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {selectedExp.description[lang]}
                </p>
              </div>

              {/* Duties and Milestones */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isFa ? 'اقدامات راهبردی و دستاوردها' : 'Strategic Actions & Outcomes'}</span>
                </h4>
                <ul className="space-y-3">
                  {selectedExp.duties[lang].map((duty, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{duty}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Statutory & Organizational Responsibilities Callout */}
            <div className="mt-6 p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>{isFa ? 'مسئولیت‌های حاکمیتی و پروانه‌های قانونی' : 'Statutory & Governance Milestones'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {organizationalMilestones.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                    <p className="font-bold text-slate-900 leading-tight">{m.title[lang]}</p>
                    <p className="text-slate-500 mt-1 leading-snug">{m.desc[lang]}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
