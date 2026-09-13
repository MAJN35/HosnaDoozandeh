import React, { useState } from 'react';
import { Language } from '../types';
import {
  personalInfo,
  skillsList,
  experiences,
  educationList,
  certifications,
  academicPublication,
  extracurricularActivities,
} from '../data/cvData';
import { SkeuButton } from './SkeuButton';
import {
  Printer,
  FileDown,
  X,
  Mail,
  MapPin,
  Calendar,
  Globe,
  Award,
  CheckCircle,
  Copy,
  Check,
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLang?: Language;
  profilePhoto?: string;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  defaultLang = 'fa',
  profilePhoto,
}) => {
  const [modalLang, setModalLang] = useState<Language>(defaultLang);
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  const isFa = modalLang === 'fa';

  const handlePrint = () => {
    window.print();
  };

  const generateMarkdownResume = () => {
    return `# ${personalInfo.name[modalLang]}
${personalInfo.title[modalLang]}
${personalInfo.subtitle[modalLang]}

## Contact Information
- Email: ${personalInfo.contact.email}
- Location: ${personalInfo.contact.location[modalLang]}
- Birth Year: ${personalInfo.contact.birthYear[modalLang]}

## Executive Summary
${personalInfo.bio[modalLang]}

## Work Experience
${experiences
  .map(
    (e) => `### ${e.role[modalLang]} - ${e.organization[modalLang]} (${e.period[modalLang]})
${e.description[modalLang]}
Key Duties:
${e.duties[modalLang].map((d) => `- ${d}`).join('\n')}`
  )
  .join('\n\n')}

## Education
${educationList
  .map(
    (edu) => `- **${edu.degree[modalLang]}** | ${edu.institution[modalLang]} (${edu.period[modalLang]})`
  )
  .join('\n')}

## Certifications
${certifications
  .map(
    (c) => `- **${c.title[modalLang]}** - ${c.issuer[modalLang]}`
  )
  .join('\n')}

## Academic Publication
- **${academicPublication.title[modalLang]}**, ${academicPublication.authors[modalLang]}, ${academicPublication.journal[modalLang]}, ${academicPublication.details[modalLang]}.

## Core Skills
${skillsList.map((s) => `- ${s.name[modalLang]}`).join('\n')}
`;
  };

  const handleDownloadMarkdown = () => {
    const content = generateMarkdownResume();
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `CV_Hosna_Doozandeh_${modalLang.toUpperCase()}.md`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generateMarkdownResume());
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-5xl my-auto bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        dir={isFa ? 'rtl' : 'ltr'}
      >
        
        {/* Modal Toolbar (No-Print) */}
        <div className="no-print px-5 sm:px-7 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {isFa ? 'پیش‌نمایش سند رزومه' : 'Official CV Document'}
            </span>
            <div className="flex items-center rounded-lg bg-slate-200/80 p-0.5 text-xs font-bold">
              <button
                onClick={() => setModalLang('fa')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  isFa ? 'bg-white shadow-xs text-blue-700' : 'text-slate-600'
                }`}
              >
                فارسی (اصلی)
              </button>
              <button
                onClick={() => setModalLang('en')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  !isFa ? 'bg-white shadow-xs text-blue-700' : 'text-slate-600'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Print / Save PDF Button */}
            <SkeuButton
              variant="primary"
              size="sm"
              icon={<Printer className="w-3.5 h-3.5" />}
              onClick={handlePrint}
              id="modal-print-cv-btn"
            >
              {isFa ? 'چاپ یا ذخیره PDF' : 'Print / Save PDF'}
            </SkeuButton>

            {/* Download Text / Markdown */}
            <SkeuButton
              variant="secondary"
              size="sm"
              icon={<FileDown className="w-3.5 h-3.5" />}
              onClick={handleDownloadMarkdown}
              id="modal-download-md-btn"
            >
              {isFa ? 'دانلود متن (MD)' : 'Download .MD'}
            </SkeuButton>

            {/* Copy Markdown */}
            <button
              onClick={handleCopyText}
              className="skeu-button-secondary p-1.5 rounded-xl text-slate-700 cursor-pointer hidden sm:flex"
              title={isFa ? 'کپی متن کامل' : 'Copy Full Text'}
            >
              {copiedText ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="skeu-button-secondary p-1.5 rounded-xl text-slate-500 hover:text-slate-900 cursor-pointer"
              aria-label="Close modal"
              id="modal-close-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto print-container bg-white text-slate-900 text-sm">
          
          {/* Header Bar matching original CV */}
          <div className="pb-6 border-b-2 border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                {personalInfo.name[modalLang]}
              </h1>
              <p className="text-base font-bold text-blue-800 mt-1">
                {personalInfo.title[modalLang]}
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                {personalInfo.subtitle[modalLang]}
              </p>
            </div>

            {/* Official Photo */}
            <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border-2 border-slate-300 shadow-sm shrink-0 bg-slate-100">
              <img
                src={profilePhoto || personalInfo.contact.photoUrl}
                alt={personalInfo.name[modalLang]}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Main 2-Column Grid exactly representing the CV */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">
            
            {/* Right Column in Persian (8 cols): Executive Summary, Experience, Responsibilities, Achievements, Publications */}
            <div className="md:col-span-8 space-y-6">
              
              {/* Executive Summary */}
              <div>
                <h2 className="text-xs font-black uppercase tracking-wider text-blue-900 pb-1.5 mb-2 border-b border-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-700" />
                  <span>{isFa ? 'خلاصه رزومه' : 'Executive Summary'}</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                  {personalInfo.bio[modalLang]}
                </p>
              </div>

              {/* Work Experience */}
              <div>
                <h2 className="text-xs font-black uppercase tracking-wider text-blue-900 pb-1.5 mb-3 border-b border-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-700" />
                  <span>{isFa ? 'سوابق مدیریتی و شغلی' : 'Executive Experience'}</span>
                </h2>
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative ps-3 border-s-2 border-slate-200">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900 text-sm">
                          {exp.role[modalLang]}
                        </span>
                        <span className="font-mono font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                          {exp.period[modalLang]}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-600 mt-0.5">
                        {exp.organization[modalLang]}
                      </p>
                      <ul className="mt-1.5 space-y-1">
                        {exp.duties[modalLang].map((duty, dIdx) => (
                          <li key={dIdx} className="text-xs text-slate-700 flex items-start gap-1.5">
                            <span className="text-blue-600 mt-0.5">•</span>
                            <span>{duty}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Achievements */}
              <div>
                <h2 className="text-xs font-black uppercase tracking-wider text-blue-900 pb-1.5 mb-2.5 border-b border-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-700" />
                  <span>{isFa ? 'دستاوردهای مدیریتی' : 'Key Management Achievements'}</span>
                </h2>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{isFa ? 'رشد مستمر و پایدار آمار جذب و ثبت‌نام دانش‌آموزان در دوره‌های مدیریتی متوالی' : 'Sustained enrollment growth across multiple consecutive academic cycles'}</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{isFa ? 'تحقق شاخص رضایت‌مندی بالای ۸۰ درصدی اولیا و مراجع نظارتی از استانداردهای آموزشی و انضباط سازمانی' : 'Realized >80% satisfaction ratings from parents and inspectorate boards'}</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{isFa ? 'گزینش، استقرار و ارتقای شایستگی‌های حرفه‌ای نیروهای نخبه آموزشی و اداری' : 'Recruitment and pedagogical competency elevation of elite faculty'}</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{isFa ? 'طراحی و استقرار برنامه عملیاتی سالانه (Operational Plan) و نظام ارزیابی ورودی استاندارد' : 'Formulation of standard annual Operational Plan (OP) and entry psychometric battery'}</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{isFa ? 'ارتقای رتبه ارزیابی عملکرد مدرسه در سطح منطقه با پیاده‌سازی رویکرد بهبود مستمر فرآیندها' : 'Regional school ranking promotion through continuous process improvement'}</span>
                  </li>
                </ul>
              </div>

              {/* Research Paper */}
              <div className="page-break-avoid">
                <h2 className="text-xs font-black uppercase tracking-wider text-blue-900 pb-1.5 mb-2 border-b border-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-700" />
                  <span>{isFa ? 'مقاله علمی پژوهشی' : 'Scientific Research Paper'}</span>
                </h2>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <p className="font-bold text-slate-900">
                    {academicPublication.title[modalLang]}
                  </p>
                  <p className="text-slate-600 mt-1">
                    {academicPublication.authors[modalLang]} —{' '}
                    <span className="font-semibold text-blue-800">
                      {academicPublication.journal[modalLang]}
                    </span>
                    ، {academicPublication.details[modalLang]}
                  </p>
                </div>
              </div>

            </div>

            {/* Left Column in Persian (4 cols): Contact, Skills, Education, Certifications, Extracurricular */}
            <div className="md:col-span-4 space-y-6">
              
              {/* Contact Info Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <h3 className="font-bold text-slate-900 pb-1 border-b border-slate-200 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isFa ? 'اطلاعات تماس و هویت' : 'Contact & Profile'}</span>
                </h3>
                <p className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="break-all">{personalInfo.contact.email}</span>
                </p>
                <p className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{personalInfo.contact.location[modalLang]}</span>
                </p>
                <p className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isFa ? 'سال تولد: ۱۳۶۰' : 'Birth Year: 1981'}</span>
                </p>
              </div>

              {/* Skills and Competencies */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 pb-1.5 mb-2.5 border-b border-slate-300">
                  {isFa ? 'مهارت‌ها و توانمندی‌ها' : 'Skills & Competencies'}
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {skillsList.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <span>{s.name[modalLang]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 pb-1.5 mb-2 border-b border-slate-300">
                  {isFa ? 'تحصیلات' : 'Education'}
                </h3>
                <div className="space-y-3">
                  {educationList.map((edu, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{edu.degree[modalLang]}</span>
                        <span className="font-mono text-slate-400 font-normal">{edu.period[modalLang]}</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">{edu.institution[modalLang]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 pb-1.5 mb-2 border-b border-slate-300">
                  {isFa ? 'دوره‌های تکمیلی آموزشی' : 'Advanced Training'}
                </h3>
                <div className="space-y-2 text-xs">
                  {certifications.map((c, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                      <p className="font-bold text-slate-900">{c.title[modalLang]}</p>
                      <p className="text-blue-700 font-medium text-[11px] mt-0.5">{c.issuer[modalLang]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 pb-1.5 mb-1.5 border-b border-slate-300">
                  {isFa ? 'زبان‌های خارجی' : 'Languages'}
                </h3>
                <p className="text-xs font-bold text-slate-800">
                  {isFa ? 'زبان انگلیسی: متوسط به بالا (Upper-Intermediate)' : 'English: Upper-Intermediate'}
                </p>
              </div>

              {/* Extracurricular */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 pb-1.5 mb-2 border-b border-slate-300">
                  {isFa ? 'فعالیت‌های تکمیلی' : 'Extracurricular'}
                </h3>
                <div className="space-y-2 text-xs text-slate-700">
                  {extracurricularActivities.map((act, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{act.title[modalLang]}</span>
                        <span className="text-[11px] font-mono text-slate-400">{act.period[modalLang]}</span>
                      </div>
                      <span className="text-slate-500 text-[11px] leading-tight block mt-0.5">{act.description[modalLang]}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Footer note matching original CV */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
            <span>{isFa ? 'رزومه حرفه‌ای آموزشی و مدیریتی' : 'Professional Educational & Executive Portfolio'}</span>
            <span>{isFa ? 'صفحه ۱ از ۱' : 'Page 1 of 1'}</span>
          </div>

        </div>

      </div>

    </div>
  );
};
