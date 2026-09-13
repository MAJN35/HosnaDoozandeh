import React, { useState } from 'react';
import { Language } from '../types';
import { professionalProjects } from '../data/cvData';
import { FolderGit2, Check, ArrowUpRight, Sparkles, Building, BarChart3, Brain, HeartHandshake } from 'lucide-react';

interface ProjectsSectionProps {
  lang: Language;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: { fa: 'همه پروژه‌ها', en: 'All Projects' }, icon: Sparkles },
    { id: 'leadership', label: { fa: 'راهبری و توسعه مدارس', en: 'School Leadership' }, icon: Building },
    { id: 'psychometrics', label: { fa: 'روان‌سنجی و ارزیابی', en: 'Psychometrics & Testing' }, icon: Brain },
    { id: 'ai_data', label: { fa: 'هوش مصنوعی و تحلیل داده', en: 'AI & Learning Analytics' }, icon: BarChart3 },
    { id: 'social', label: { fa: 'مسئولیت اجتماعی و کارگاه‌ها', en: 'Youth & CSR' }, icon: HeartHandshake },
  ];

  const filteredProjects = activeCategory === 'all'
    ? professionalProjects
    : professionalProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100/70 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>{isFa ? 'پروژه‌های شاخص حرفه‌ای' : 'Key Professional Projects'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isFa ? 'طرح‌ها، اقدامات راهبردی و دستاوردهای اجرایی' : 'Strategic Initiatives & Landmark Projects'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-1">
            {isFa
              ? 'مجموعه‌ای از پروژه‌های برجسته در حوزه تأسیس مدارس، استانداردسازی آزمون‌ها، داده‌کاوی آموزشی و پژوهش‌های روان‌سنجی'
              : 'Featured initiatives across campus founding, standard psychometric batteries, learning analytics, and empirical research.'}
          </p>
        </div>

        {/* Category Filters with Skeuomorphic Pill Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'skeu-button-primary text-white'
                    : 'skeu-button-secondary text-slate-700'
                }`}
                id={`filter-btn-${cat.id}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label[lang]}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="skeu-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg border border-slate-200/90 relative group"
              id={`project-card-${project.id}`}
            >
              <div>
                {/* Header Tag and Period */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100/80">
                    {project.categoryLabel[lang]}
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-500">
                    {project.period[lang]}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                  {project.title[lang]}
                </h3>

                {/* Organization */}
                <p className="text-xs font-semibold text-slate-500 mt-1">
                  {project.organization[lang]}
                </p>

                {/* Summary */}
                <p className="text-sm text-slate-600 mt-3.5 leading-relaxed">
                  {project.summary[lang]}
                </p>

                {/* Key Achievements list */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-2">
                    {isFa ? 'خروجی‌های کلیدی' : 'Key Milestones'}
                  </span>
                  <ul className="space-y-2">
                    {project.keyAchievements[lang].slice(0, 3).map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Skills / Tags footer */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex flex-wrap gap-1.5">
                  {project.skillsUsed.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
