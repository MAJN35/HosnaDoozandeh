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
  managerialAchievements,
  languageSkills,
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
  School,
  Sparkles,
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLang?: Language;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  defaultLang = 'fa',
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
- Website: ${personalInfo.contact.website}
- Location: ${personalInfo.contact.location[modalLang]}
- Birth Year: ${personalInfo.contact.birthYear[modalLang]}

## Executive Summary
${personalInfo.bio[modalLang]}

## Managerial & Career History
${experiences
  .map(
    (e) => `### ${e.role[modalLang]} - ${e.organization[modalLang]} (${e.period[modalLang]})
${e.description[modalLang]}
Key Duties:
${e.duties[modalLang].map((d) => `- ${d}`).join('\n')}`
  )
  .join('\n\n')}

## Key Managerial Achievements
${managerialAchievements
  .map((a) => `- **${a.title[modalLang]}**: ${a.description[modalLang]}`)
  .join('\n')}

## Academic Education
${educationList
  .map(
    (edu) => `- **${edu.degree[modalLang]}** | ${edu.institution[modalLang]} (${edu.period[modalLang]})`
  )
  .join('\n')}

## Peer-Reviewed Publication
- **${academicPublication.title[modalLang]}**, ${academicPublication.authors[modalLang]}, ${academicPublication.journal[modalLang]}, ${academicPublication.details[modalLang]}.

## Specialized Professional Courses
${certifications
  .map(
    (c) => `- **${c.title[modalLang]}** - ${c.issuer[modalLang]}`
  )
  .join('\n')}

## Skills & Competencies
${skillsList.map((s) => `- ${s.name[modalLang]}`).join('\n')}

## Languages
- Persian (Native)
- English: Upper-Intermediate

## Social Responsibility
- ${extracurricularActivities.map((e) => `${e.title[modalLang]}: ${e.description[modalLang]}`).join('\n')}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static">
      
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-5xl my-auto bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:rounded-none"
        dir={isFa ? 'rtl' : 'ltr'}
      >
        
        {/* Modal Toolbar (No-Print) */}
        <div className="no-print px-5 sm:px-7 py-3.5 bg-[#EDF4FA] border-b border-white/60 flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-light text-[#71839A]">
              {isFa ? 'پیش‌نمایش سند رسمی رزومه' : 'Official CV Document Preview'}
            </span>
            <div className="flex items-center rounded-full bg-[#E5EEF7] p-1 text-xs">
              <button
                onClick={() => setModalLang('fa')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  isFa ? 'neu-button text-[#243B5D] font-normal' : 'text-[#71839A] font-light'
                }`}
              >
                فارسی
              </button>
              <button
                onClick={() => setModalLang('en')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  !isFa ? 'neu-button text-[#243B5D] font-normal' : 'text-[#71839A] font-light'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Copy Markdown */}
            <button
              onClick={handleCopyText}
              className="neu-button px-3 py-1.5 rounded-full text-xs font-normal text-[#243B5D] flex items-center gap-1.5 cursor-pointer"
              title={isFa ? 'کپی متن کامل رزومه' : 'Copy Plain Text'}
              id="modal-copy-cv-btn"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isFa ? 'کپی شد!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#71839A]" />
                  <span className="hidden sm:inline">{isFa ? 'کپی متن' : 'Copy'}</span>
                </>
              )}
            </button>

            {/* Download Markdown */}
            <button
              onClick={handleDownloadMarkdown}
              className="neu-button px-3 py-1.5 rounded-full text-xs font-normal text-[#243B5D] flex items-center gap-1.5 cursor-pointer"
              title={isFa ? 'دانلود فایل متنی' : 'Download Markdown'}
              id="modal-download-md-btn"
            >
              <FileDown className="w-3.5 h-3.5 text-[#71839A]" />
              <span className="hidden sm:inline">MD</span>
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="neu-button-primary px-4 py-1.5 rounded-full text-xs font-light flex items-center gap-1.5 cursor-pointer shadow-xs"
              id="modal-print-cv-btn"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isFa ? 'چاپ / PDF' : 'Print / PDF'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="neu-button p-1.5 rounded-full text-[#71839A] hover:text-[#243B5D] transition-colors cursor-pointer"
              aria-label="Close"
              id="modal-close-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document View */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white print:p-0 print:overflow-visible text-slate-800">
          
          {/* Header Bar matching original CV */}
          <div className="pb-6 border-b-2 border-slate-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                {personalInfo.name[modalLang]}
              </h1>
              
              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-sm font-bold">
                <span className="text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  {personalInfo.role[modalLang]}
                </span>
                <span className="text-slate-700">
                  {isFa ? 'روان‌شناس (سنجش و اندازه‌گیری)' : 'Psychometrics & Educational Measurement'}
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-1 font-medium">
                {personalInfo.subtitle[modalLang]}
              </p>
            </div>

            {/* Official Photo */}
            <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border-2 border-slate-300 shadow-2xs shrink-0 bg-slate-100">
              <img
                src={personalInfo.contact.photoUrl}
                alt={personalInfo.name[modalLang]}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Main 2-Column Grid exactly representing the CV */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">
            
            {/* Right Column in Persian (8 cols): Summary, Experience, Achievements, Publication */}
            <div className="md:col-span-8 space-y-6">
              
              {/* Executive Summary */}
              <div>
                <h2 className="text-xs font-black uppercase tracking-wider text-blue-950 pb-1.5 mb-2 border-b border-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-700" />
                  <span>{isFa ? 'خلاصه رزومه' : 'Executive Summary'}</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                  {personalInfo.bio[modalLang]}
                </p>
              </div>

              {/* Work Experience */}
              <div>
                <h2 className="text-xs font-black uppercase tracking-wider text-blue-950 pb-1.5 mb-3 border-b border-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-700" />
                  <span>{isFa ? 'سوابق مدیریتی و شغلی' : 'Managerial & Career History'}</span>
                </h2>
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative ps-3 border-s-2 border-slate-300">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-black text-slate-900 text-sm">
                          {exp.role[modalLang]}
                        </span>
                        <span className="font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          {exp.period[modalLang]}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-600 mt-0.5">
                        {exp.organization[modalLang]}
                      </p>
                      <p className="text-xs text-slate-600 mt-1 leading-snug">
                        {exp.description[modalLang]}
                      </p>
                      <ul className="mt-1.5 space-y-1">
                        {exp.duties[modalLang].map((duty, dIdx) => (
                          <li key={dIdx} className="text-xs text-slate-700 flex items-start gap-1.5">
                            <span className="text-blue-600 mt-0.5 font-bold">•</span>
                            <span>{duty}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Management Achievements */}
              <div>
                <h2 className="text-xs font-black uppercase tracking-wider text-blue-950 pb-1.5 mb-2.5 border-b border-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-700" />
                  <span>{isFa ? 'دستاوردهای مدیریتی' : 'Managerial Achievements'}</span>
                </h2>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {managerialAchievements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900">{item.title[modalLang]}</span>
                        <span className="text-slate-600 block mt-0.5">{item.description[modalLang]}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Research Paper */}
              <div className="break-inside-avoid">
                <h2 className="text-xs font-black uppercase tracking-wider text-blue-950 pb-1.5 mb-2 border-b border-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-700" />
                  <span>{isFa ? 'مقاله علمی پژوهشی' : 'Peer-Reviewed Publication'}</span>
                </h2>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <p className="font-black text-slate-900">
                    {academicPublication.title[modalLang]}
                  </p>
                  <p className="text-slate-600 mt-1">
                    {academicPublication.authors[modalLang]} —{' '}
                    <span className="font-bold text-blue-800">
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
                <h3 className="font-black text-slate-900 pb-1 border-b border-slate-200 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isFa ? 'اطلاعات تماس و هویت' : 'Contact & Profile'}</span>
                </h3>
                <p className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="break-all">{personalInfo.contact.email}</span>
                </p>
                <p className="flex items-center gap-2 text-slate-700">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">{personalInfo.contact.website}</span>
                </p>
                <p className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{personalInfo.contact.location[modalLang]}</span>
                </p>
                <p className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isFa ? `سال تولد: ${personalInfo.contact.birthYear[modalLang]}` : `Birth Year: ${personalInfo.contact.birthYear[modalLang]}`}</span>
                </p>
              </div>

              {/* Skills and Competencies */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-950 pb-1.5 mb-2.5 border-b border-slate-300">
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
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-950 pb-1.5 mb-2 border-b border-slate-300">
                  {isFa ? 'تحصیلات' : 'Academic Education'}
                </h3>
                <div className="space-y-3">
                  {educationList.map((edu, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="flex items-center justify-between font-black text-slate-900">
                        <span>{edu.degree[modalLang]}</span>
                        <span className="font-mono text-slate-500 font-normal">{edu.period[modalLang]}</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">{edu.institution[modalLang]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-950 pb-1.5 mb-2 border-b border-slate-300">
                  {isFa ? 'دوره‌های تکمیلی آموزشی' : 'Advanced Training'}
                </h3>
                <div className="space-y-2 text-xs">
                  {certifications.map((c, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <p className="font-bold text-slate-900">{c.title[modalLang]}</p>
                      <p className="text-blue-800 font-medium text-[11px] mt-0.5">{c.issuer[modalLang]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-950 pb-1.5 mb-1.5 border-b border-slate-300">
                  {isFa ? 'زبان‌های خارجی' : 'Languages'}
                </h3>
                <div className="space-y-1 text-xs">
                  <p className="font-bold text-slate-800">
                    {isFa ? 'زبان فارسی: مادری / مسلط' : 'Persian: Native'}
                  </p>
                  <p className="font-bold text-slate-800">
                    {isFa ? 'زبان انگلیسی: متوسط به بالا (Upper-Intermediate)' : 'English: Upper-Intermediate'}
                  </p>
                </div>
              </div>

              {/* Extracurricular / CSR */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-950 pb-1.5 mb-2 border-b border-slate-300">
                  {isFa ? 'فعالیت‌های تکمیلی' : 'Complementary Activities'}
                </h3>
                <div className="space-y-2 text-xs text-slate-700">
                  {extracurricularActivities.map((act, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{act.title[modalLang]}</span>
                        <span className="text-[11px] font-mono text-slate-400">{act.period[modalLang]}</span>
                      </div>
                      <span className="text-slate-600 text-[11px] leading-tight block mt-0.5">{act.description[modalLang]}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Footer note matching original CV */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>{isFa ? 'رزومه رسمی راهبری آموزشی و مدیریتی • مجتمع مدارس هما' : 'Official Educational Leadership & Governance CV'}</span>
            <span>{isFa ? 'صفحه ۱ از ۱' : 'Page 1 of 1'}</span>
          </div>

        </div>

      </div>

    </div>
  );
};
