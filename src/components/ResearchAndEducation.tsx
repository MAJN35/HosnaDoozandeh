import React, { useState } from 'react';
import { Language } from '../types';
import {
  educationList,
  certifications,
  academicPublication,
  extracurricularActivities,
  languageSkills,
} from '../data/cvData';
import { SkeuButton } from './SkeuButton';
import {
  GraduationCap,
  Award,
  BookOpenCheck,
  Copy,
  Check,
  Sparkles,
  BookmarkCheck,
  HeartHandshake,
  Globe2,
  Calendar,
  Building,
  School,
} from 'lucide-react';

interface ResearchAndEducationProps {
  lang: Language;
}

export const ResearchAndEducation: React.FC<ResearchAndEducationProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  const [copiedCitation, setCopiedCitation] = useState(false);

  const fullCitation = isFa
    ? 'دوزنده، حسنا؛ مشایخ، مریم؛ ربیعی، زینب. «بررسی ویژگی‌های روان‌سنجی پرسشنامه سلامت روان مثبت (PMHQ) و رابطه آن با بهزیستی روان‌شناختی در جامعه ایرانی»، فصلنامه علمی-پژوهشی روان‌سنجی، دوره ۱۴، شماره ۵۳، تابستان ۱۴۰۴، صفحات ۱۶–۲۹.'
    : 'Doozandeh, H., Mashayekh, M., & Rabiei, Z. (2025). Investigating the Psychometric Properties of Positive Mental Health Questionnaire (PMHQ) and its Relationship with Psychological Well-Being in Iranian Society. Journal of Psychometrics, 14(53), 16–29.';

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(fullCitation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  return (
    <section id="research" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100/70 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpenCheck className="w-3.5 h-3.5" />
            <span>{isFa ? 'تحصیلات، مقالات و دوره‌های تخصصی' : 'Education, Research & Credentials'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            {isFa ? 'مدارک آکادمیک، مقاله علمی-پژوهشی و آموزش‌های تکمیلی' : 'Academic Degrees, Peer-Reviewed Paper & Training'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-1.5">
            {isFa
              ? 'مقاله پژوهشی چاپ‌شده در فصلنامه روان‌سنجی، کارشناسی ارشد سنجش و اندازه‌گیری و دوره‌های تخصصی راهبری مدارس'
              : 'Peer-reviewed research in psychometrics, graduate studies, and specialized certifications in school management.'}
          </p>
        </div>

        {/* Highlighted Academic Paper Card */}
        <div className="mb-14">
          <div className="skeu-card p-6 sm:p-8 rounded-3xl border-2 border-blue-200/90 relative overflow-hidden bg-linear-to-br from-white via-blue-50/20 to-slate-50 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-700 text-white shadow-2xs">
                  {isFa ? 'مقاله علمی پژوهشی چاپ‌شده' : 'Peer-Reviewed Journal Publication'}
                </span>
                <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                  {academicPublication.year}
                </span>
              </div>

              {/* Copy Citation Button */}
              <SkeuButton
                variant="secondary"
                size="sm"
                icon={copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                onClick={handleCopyCitation}
                id="copy-citation-btn"
              >
                {copiedCitation
                  ? (isFa ? 'ارجاع رسمی کپی شد!' : 'Citation Copied!')
                  : (isFa ? 'کپی ارجاع رسمی (Citation)' : 'Copy Official Citation')}
              </SkeuButton>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {academicPublication.title[lang]}
            </h3>

            <div className="mt-3 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-slate-600">
              <span className="font-bold text-slate-900">
                {academicPublication.authors[lang]}
              </span>
              <span className="text-slate-300">•</span>
              <span className="font-bold text-blue-800">
                {academicPublication.journal[lang]}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-mono">
                {academicPublication.details[lang]}
              </span>
            </div>

            <div className="mt-5 p-4 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
              <span className="font-bold text-slate-900 block mb-1">
                {isFa ? 'خلاصه پژوهش و کاربرد در دبیرستان:' : 'Abstract & Educational High School Application:'}
              </span>
              {academicPublication.abstract[lang]}
            </div>

            {/* Keywords */}
            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-slate-500 me-2">
                {isFa ? 'کلیدواژه‌ها:' : 'Keywords:'}
              </span>
              {academicPublication.keywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-100"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Left: Academic Degrees | Right: Certifications & Language */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Academic Degrees (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <GraduationCap className="w-5 h-5 text-blue-700" />
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                {isFa ? 'تحصیلات دانشگاهی' : 'Academic Education'}
              </h3>
            </div>

            <div className="space-y-4">
              {educationList.map((edu, idx) => (
                <div
                  key={idx}
                  className="skeu-card p-5 sm:p-6 rounded-2xl border border-slate-200 relative group"
                >
                  <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-100">
                      {edu.period[lang]}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {edu.institution[lang]}
                    </span>
                  </div>

                  <h4 className="text-base font-black text-slate-900">
                    {edu.degree[lang]}
                  </h4>
                  
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                    {edu.field[lang]}
                  </p>

                  {edu.highlights && (
                    <ul className="mt-3 pt-2 border-t border-slate-100 space-y-1">
                      {edu.highlights[lang].map((h, hIdx) => (
                        <li key={hIdx} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Languages Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Globe2 className="w-4 h-4 text-blue-700" />
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
                  {isFa ? 'تسلط به زبان‌های خارجی' : 'Language Proficiency'}
                </h4>
              </div>

              <div className="space-y-3">
                {languageSkills.map((langItem, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                      <span>{langItem.language[lang]}</span>
                      <span className="text-blue-800">{langItem.level[lang]}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{ width: `${langItem.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Specialized Courses (دوره‌های تکمیلی آموزشی) & CSR (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <Award className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                {isFa ? 'دوره‌های تکمیلی آموزشی' : 'Specialized Professional Training'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((c, idx) => (
                <div
                  key={idx}
                  className="skeu-card p-4 rounded-2xl border border-slate-200 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80 inline-block mb-2">
                      {c.credentialType[lang]}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {c.title[lang]}
                    </h4>
                    <p className="text-xs text-blue-800 font-semibold mt-1">
                      {isFa ? `مدرس / مرجع: ${c.issuer[lang]}` : `Instructor/Issuer: ${c.issuer[lang]}`}
                    </p>
                  </div>

                  <p className="text-[11px] text-slate-500 mt-2.5 pt-2 border-t border-slate-100 leading-tight">
                    {c.focus[lang]}
                  </p>
                </div>
              ))}
            </div>

            {/* Social Responsibility / Extracurricular */}
            <div className="p-5 rounded-2xl bg-linear-to-br from-emerald-50/50 to-white border border-emerald-200/90 shadow-2xs">
              <div className="flex items-center gap-2 mb-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4 text-emerald-600" />
                <span>{isFa ? 'مسئولیت اجتماعی و فعالیت‌های تکمیلی' : 'Specialized Social Responsibility (CSR)'}</span>
              </div>

              {extracurricularActivities.map((act, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-900">
                    {act.title[lang]}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {act.description[lang]}
                  </p>
                  <span className="inline-block text-[11px] font-mono text-emerald-700 font-semibold mt-1">
                    {act.period[lang]}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
