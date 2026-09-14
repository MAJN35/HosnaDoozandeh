import React, { useState } from 'react';
import { Language } from '../types';
import { skillsList } from '../data/cvData';
import {
  Layers,
  Brain,
  BarChart3,
  Compass,
  Scale,
  Sparkles,
  CheckCircle,
  Users,
  ShieldCheck,
  Award,
} from 'lucide-react';

interface SkillsSectionProps {
  lang: Language;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  const [filter, setFilter] = useState<'all' | 'leadership' | 'psychometrics' | 'analytics'>('all');

  const filterTabs = [
    { id: 'all', label: { fa: 'کلیه شایستگی‌ها (۱۰ مهارت)', en: 'All Competencies (10 Skills)' } },
    { id: 'leadership', label: { fa: 'راهبری و مدیریت استراتژیک', en: 'Strategic Leadership' } },
    { id: 'psychometrics', label: { fa: 'روان‌سنجی و ابزارهای تشخیصی', en: 'Psychometrics & Testing' } },
    { id: 'analytics', label: { fa: 'پایش KPI و بهبود مستمر', en: 'KPI & Quality Improvement' } },
  ];

  const filteredSkills = filter === 'all'
    ? skillsList
    : skillsList.filter((s) => s.category === filter);

  return (
    <section id="skills" className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100/70 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>{isFa ? 'مهارت‌ها و توانمندی‌ها' : 'Skills & Competencies'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            {isFa ? 'شایستگی‌های تخصصی در راهبری دبیرستان و روان‌سنجی' : 'Executive & Specialized Pedagogical Competencies'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-1.5">
            {isFa
              ? '۱۰ توانمندی کلیدی احرازشده در برنامه‌ریزی راهبردی، ارزیابی روان‌سنجی، مدیریت بحران، امور حقوقی مدارس و نظارت بر فرآیندهای آموزشی'
              : 'Core executive competencies spanning strategic school planning, psychometrics, crisis management, and legal governance.'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {filterTabs.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'skeu-button-primary text-white shadow-sm'
                    : 'skeu-button-secondary text-slate-700 hover:text-blue-700'
                }`}
                id={`skill-filter-${tab.id}`}
              >
                {tab.label[lang]}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="skeu-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between border border-slate-200/90 hover:border-blue-300 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200/70 shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {skill.name[lang]}
                    </h3>
                  </div>

                  <span className="text-xs font-mono font-bold text-blue-700 px-2 py-0.5 rounded bg-blue-50 shrink-0">
                    {skill.level}٪
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {skill.description[lang]}
                </p>
              </div>

              {/* Progress Bar & Tags */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-linear-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {skill.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* High School Management Core Competencies Summary Bar */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">
              {isFa
                ? 'دارای موافقت اصولی رسمی، تسلط کامل بر اسناد بالادستی و سند تحول بنیادین آموزش و پرورش'
                : 'Formally accredited founding charter holder, fully proficient with national educational transformation charters.'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-blue-800 font-bold shrink-0">
            <Award className="w-4 h-4 text-amber-600" />
            <span>{isFa ? 'منطقه ۵ آموزش و پرورش تهران' : 'District 5 Tehran'}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
