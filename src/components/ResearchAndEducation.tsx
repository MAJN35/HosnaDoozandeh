import React, { useState } from 'react';
import { Language } from '../types';
import {
  educationList,
  certifications,
  academicPublication,
  extracurricularActivities,
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
} from 'lucide-react';

interface ResearchAndEducationProps {
  lang: Language;
}

export const ResearchAndEducation: React.FC<ResearchAndEducationProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  const [copiedCitation, setCopiedCitation] = useState(false);

  const fullCitation = isFa
    ? 'دوزنده، حسنا؛ مشایخ، مریم؛ ربیعی، زینب (۱۴۰۴). بررسی ویژگی‌های روان‌سنجی پرسشنامه سلامت روان مثبت (PMHQ) و رابطه آن با بهزیستی روان‌شناختی در جامعه ایرانی. فصلنامه علمی-پژوهشی روان‌سنجی، دوره ۱۴، شماره ۵۳، صفحات ۱۶-۲۹.'
    : 'Doozandeh, H., Mashayekh, M., & Rabiei, Z. (2025). Investigating the Psychometric Properties of Positive Mental Health Questionnaire (PMHQ) and its Relationship with Psychological Well-Being in Iranian Society. Journal of Psychometrics, 14(53), 16–29.';

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(fullCitation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  return (
    <section id="research" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100/70 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpenCheck className="w-3.5 h-3.5" />
            <span>{isFa ? 'پژوهش، تحصیلات و مدارک تخصصی' : 'Research, Education & Credentials'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isFa ? 'تحصیلات آکادمیک و مقاله علمی-پژوهشی' : 'Academic Degrees & Peer-Reviewed Research'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-1">
            {isFa
              ? 'مقاله‌ چاپ‌شده در فصلنامه معتبر روان‌سنجی، مدارک تحصیلی دانشگاهی و گواهینامه‌های بین‌المللی هوش مصنوعی و مدیریت مدارس'
              : 'Peer-reviewed empirical literature, graduate degrees in psychometrics, and certified professional programs.'}
          </p>
        </div>

        {/* Highlighted Academic Paper Card */}
        <div className="mb-14">
          <div className="skeu-card p-6 sm:p-8 rounded-3xl border-2 border-blue-100 relative overflow-hidden bg-linear-to-br from-white via-blue-50/20 to-slate-50">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200/80">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-700 text-white shadow-xs">
                  {isFa ? 'مقاله علمی پژوهشی چاپ‌شده' : 'Peer-Reviewed Journal Publication'}
                </span>
                <span className="text-xs font-mono font-semibold text-slate-500">
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
                  ? (isFa ? 'ارجاع کپی شد!' : 'Citation Copied!')
                  : (isFa ? 'کپی ارجاع رسمی (Citation)' : 'Copy Citation')}
              </SkeuButton>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {academicPublication.title[lang]}
            </h3>

            <div className="mt-3 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-slate-600">
              <span className="font-semibold text-slate-800">
                {academicPublication.authors[lang]}
              </span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-blue-700">
                {academicPublication.journal[lang]}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-mono">
                {academicPublication.details[lang]}
              </span>
            </div>

            {/* Abstract */}
            <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <BookmarkCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>{isFa ? 'چکیده پژوهش' : 'Research Abstract'}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                {academicPublication.abstract[lang]}
              </p>
            </div>

            {/* Keywords */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400">
                {isFa ? 'واژگان کلیدی:' : 'Keywords:'}
              </span>
              {academicPublication.keywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-100"
                >
                  {kw}
                </span>
              ))}
            </div>

          </div>
        </div>

        {/* Education & Certifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Academic Degrees */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
              <GraduationCap className="w-5 h-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">
                {isFa ? 'تحصیلات دانشگاهی' : 'Academic Degrees'}
              </h3>
            </div>

            <div className="space-y-4">
              {educationList.map((edu, idx) => (
                <div
                  key={idx}
                  className="skeu-card p-6 rounded-2xl border border-slate-200"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                      {edu.period[lang]}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mt-2">
                    {edu.degree[lang]}
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    {edu.institution[lang]}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {edu.field[lang]}
                  </p>

                  {edu.highlights && (
                    <ul className="mt-3 space-y-1 text-xs text-slate-600">
                      {edu.highlights[lang].map((h, hIdx) => (
                        <li key={hIdx} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-blue-600" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Specialized Certifications & Extra Activities */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
              <Award className="w-5 h-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">
                {isFa ? 'گواهینامه‌های تخصصی و دوره‌های تکمیلی' : 'Accredited Certifications'}
              </h3>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="skeu-card p-6 rounded-2xl border border-slate-200"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                      {cert.credentialType[lang]}
                    </span>
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mt-2">
                    {cert.title[lang]}
                  </h4>
                  <p className="text-xs font-semibold text-blue-700 mt-0.5">
                    {cert.issuer[lang]}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {cert.focus[lang]}
                  </p>
                </div>
              ))}

              {/* CSR & Extracurriculars */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-rose-500" />
                  <span>{isFa ? 'فعالیت‌های تکمیلی و مسئولیت اجتماعی' : 'Social Impact & Specialized Workshops'}</span>
                </h4>
                <div className="space-y-3">
                  {extracurricularActivities.map((act, idx) => (
                    <div key={idx} className="text-xs text-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{act.title[lang]}</span>
                        <span className="font-mono text-slate-400 font-normal">{act.period[lang]}</span>
                      </div>
                      <p className="text-slate-500 mt-1 leading-snug">{act.description[lang]}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
