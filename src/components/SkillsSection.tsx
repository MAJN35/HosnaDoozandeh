import React from 'react';
import { Language } from '../types';
import { skillsList } from '../data/cvData';
import {
  Brain,
  BarChart,
  Layers,
  Sparkles,
  Bot,
  Scale,
  Users,
  Compass,
  CheckCircle,
} from 'lucide-react';

interface SkillsSectionProps {
  lang: Language;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ lang }) => {
  const isFa = lang === 'fa';

  const skillCategories = [
    {
      id: 'psychometrics',
      title: {
        fa: 'روان‌سنجی، آزمون‌سازی و ارزیابی تشخیصی',
        en: 'Psychometrics & Diagnostic Measurement',
      },
      icon: Brain,
      color: 'blue',
      items: skillsList.filter((s) => s.category === 'psychometrics'),
    },
    {
      id: 'analytics',
      title: {
        fa: 'طراحی KPI و بهینه‌سازی فرآیندهای آموزشی',
        en: 'KPI Architecture & Process Analytics',
      },
      icon: BarChart,
      color: 'indigo',
      items: skillsList.filter((s) => s.category === 'analytics'),
    },
    {
      id: 'edtech',
      title: {
        fa: 'هوش مصنوعی و تحلیل داده‌های یادگیری',
        en: 'AI in Education & Predictive Analytics',
      },
      icon: Bot,
      color: 'emerald',
      items: skillsList.filter((s) => s.category === 'edtech'),
    },
    {
      id: 'leadership',
      title: {
        fa: 'راهبری راهبردی، منابع انسانی و حقوقی',
        en: 'Strategic Leadership & Governance',
      },
      icon: Compass,
      color: 'slate',
      items: skillsList.filter((s) => s.category === 'leadership'),
    },
  ];

  return (
    <section id="skills" className="py-16 sm:py-24 bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100/70 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>{isFa ? 'شایستگی‌های تخصصی و مهارتی' : 'Core & Technical Competencies'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isFa ? 'تسلط علمی، تجربی و ابزارهای تحلیلی' : 'Technical Skills & Functional Expertise'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-1">
            {isFa
              ? 'تلفیق دانش تخصصی روان‌سنجی، مدل‌سازی شاخص‌های عملکرد (KPI)، هوش مصنوعی آموزشی و مدیریت استراتژیک مدارس'
              : 'Synthesizing psychometric assessment science, institutional KPI frameworks, learning analytics, and school governance.'}
          </p>
        </div>

        {/* Categorized Skills Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.id}
                className="skeu-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200/60">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {group.title[lang]}
                    </h3>
                  </div>

                  {/* Skills List within category */}
                  <div className="space-y-6">
                    {group.items.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-bold text-slate-800">
                            {skill.name[lang]}
                          </span>
                          <span className="font-mono text-xs font-bold text-blue-700">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Tactile Skeuomorphic Progress Gauge */}
                        <div className="w-full h-2.5 rounded-full bg-slate-200/80 p-0.5 shadow-inner">
                          <div
                            className="h-full rounded-full bg-linear-to-r from-blue-600 to-indigo-600 shadow-xs transition-all duration-700"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-500 leading-snug">
                          {skill.description[lang]}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {skill.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supplementary Highlights: Languages & Legal Compliance */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Language Proficiency */}
          <div className="skeu-card p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/70 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isFa ? 'تسلط زبانی' : 'Language'}
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                {isFa ? 'زبان انگلیسی: متوسط به بالا' : 'English: Upper-Intermediate'}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {isFa ? 'مکاتبات آکادمیک و متون تخصصی' : 'Professional & academic literacy'}
              </p>
            </div>
          </div>

          {/* Ministry of Education Compliance */}
          <div className="skeu-card p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/70 flex items-center justify-center shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isFa ? 'مقررات و اسناد بالادستی' : 'Regulatory'}
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                {isFa ? 'تسلط بر قوانین آموزش و پرورش' : 'Ministry of Education Compliance'}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {isFa ? 'نظارت حقوقی، موافقت اصولی و بازرسی' : 'Full legal statutory proficiency'}
              </p>
            </div>
          </div>

          {/* Crisis & Human Capital */}
          <div className="skeu-card p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/70 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isFa ? 'سرمایه انسانی' : 'Human Capital'}
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                {isFa ? 'گزینش و پرورش کادر نخبه' : 'Elite Faculty Recruitment'}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {isFa ? 'ارتقای شایستگی‌های حرفه‌ای معلمان' : 'Teacher empowerment & 360 review'}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
