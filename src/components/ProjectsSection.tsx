import React from 'react';
import { Language } from '../types';
import { managerialAchievements } from '../data/cvData';
import {
  Award,
  TrendingUp,
  SmilePlus,
  UserCheck,
  ClipboardList,
  BarChart3,
  Check,
  ShieldCheck,
  Building,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface ProjectsSectionProps {
  lang: Language;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang }) => {
  const isFa = lang === 'fa';

  const achievementIcons: Record<string, React.ElementType> = {
    'enrollment-growth': TrendingUp,
    'satisfaction-index': SmilePlus,
    'elite-faculty-recruitment': UserCheck,
    'annual-operational-plan': ClipboardList,
    'district-ranking-elevation': BarChart3,
  };

  const strategicFoundations = [
    {
      title: {
        fa: 'تأسیس و راه‌اندازی مدارس دخترانه هما در ۳ مقطع',
        en: 'Establishment of Homa Girls’ Schools Across 3 Tiers',
      },
      desc: {
        fa: 'اخذ موافقت اصولی، تجهیز فضاهای مدرن آموزشی، آزمایشگاه‌ها و استقرار کادر نخبه در دبستان و دبیرستان دوره اول و دوم.',
        en: 'Statutory founding charter procurement, state-of-the-art campus construction, and faculty onboarding across all tiers.',
      },
      tag: { fa: 'مجوز وزارت آموزش و پرورش', en: 'Ministry Statutory Charter' },
    },
    {
      title: {
        fa: 'بومی‌سازی و پیاده‌سازی نظام ارزیابی ورودی روان‌سنجی',
        en: 'Institutionalization of Standard Intake Psychometric Battery',
      },
      desc: {
        fa: 'ارزیابی استعدادها، هوش شناختی و آمادگی روانی دانش‌آموزان در بدو ورود با آزمون‌های هنجارشده تخصصی جهت هدایت تحصیلی دقیق.',
        en: 'Diagnostic cognitive profiling, learning style identification, and test-anxiety screening for targeted academic counseling.',
      },
      tag: { fa: 'سنجش و اندازه‌گیری تخصصی', en: 'Specialized Psychometrics' },
    },
    {
      title: {
        fa: 'توانمندسازی معلمان و ارتقای انضباط سازمانی اخلاق‌محور',
        en: 'Faculty Professional Empowerment & Ethical School Culture',
      },
      desc: {
        fa: 'برگزاری کارگاه‌های مدیریت استرس، فنون مذاکره و ارزیابی مستمر عملکرد دبیران با رویکرد بهبود مستمر فرآیندها.',
        en: 'Continuous professional workshops on stress management, negotiation, and rubric-based performance assessments.',
      },
      tag: { fa: 'توسعه سرمایه انسانی', en: 'Human Capital Excellence' },
    },
  ];

  return (
    <section id="achievements" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100/70 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>{isFa ? 'دستاوردهای مدیریتی' : 'Key Managerial Achievements'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            {isFa ? 'دستاوردهای برجسته در راهبری مدارس و ارتقای کیفیت' : 'Managerial Milestones & Educational Impact'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-1.5">
            {isFa
              ? 'نتایج مستند دوره‌های مدیریتی در افزایش نرخ جذب، ارتقای رضایت اولیا به بیش از ۸۰٪ و کسب رتبه‌های برتر در منطقه ۵ تهران'
              : 'Documented outcomes of leadership tenures: sustained enrollment growth, >80% satisfaction, and premier district rankings.'}
          </p>
        </div>

        {/* 5 Core Achievements Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {managerialAchievements.map((item, idx) => {
            const Icon = achievementIcons[item.id] || Award;
            return (
              <div
                key={item.id}
                className="skeu-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between border border-slate-200 hover:border-blue-300 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg relative group"
                id={`achievement-card-${item.id}`}
              >
                <div>
                  {/* Top Bar with Badge & Metric */}
                  <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                      {item.metric}
                    </span>

                    {item.badge && (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                        {item.badge[lang]}
                      </span>
                    )}
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200 shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-400 font-semibold">
                        0{idx + 1}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {item.title[lang]}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
                    {item.description[lang]}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isFa ? 'محقق‌شده و دارای مستندات رسمی' : 'Verified & Documented Metric'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Strategic School Foundation & Flagship Initiatives */}
        <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-slate-50 to-blue-50/30 border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-blue-800 font-bold text-xs uppercase tracking-wider">
                <Building className="w-4 h-4" />
                <span>{isFa ? 'اقدامات راهبردی سازمانی' : 'Institutional Founding Initiatives'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {isFa ? 'طرح‌ها و اقدامات زیرساختی در مجتمع مدارس دخترانه هما' : 'Strategic School Founding & Infrastructure Milestones'}
              </h3>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold w-fit">
              {isFa ? 'موافقت اصولی رسمی' : 'Charter Accredited'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {strategicFoundations.map((initiative, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2.5"
              >
                <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                  {initiative.tag[lang]}
                </span>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {initiative.title[lang]}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {initiative.desc[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
