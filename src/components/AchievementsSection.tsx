import React from 'react';
import { Language } from '../types';
import {
  TrendingUp,
  Award,
  Users,
  FileCheck2,
  Trophy,
  BookOpen,
  ArrowUpRight,
} from 'lucide-react';

interface AchievementsSectionProps {
  lang: Language;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ lang }) => {
  const isFa = lang === 'fa';

  return (
    <section id="achievements" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 space-y-3">
        <div className="neu-pill px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-xs font-normal text-[#71839A]">
          <span className="w-2 h-2 rounded-full bg-[#8FA8C8]" />
          <span>{isFa ? 'نتایج سنجش‌پذیر مدیریت' : 'Measurable Leadership Outcomes'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-light text-[#243B5D] tracking-tight">
          {isFa ? 'دستاوردها' : 'Managerial & Academic Achievements'}
        </h2>
        <p className="text-sm sm:text-base font-light text-[#71839A] leading-relaxed">
          {isFa
            ? 'شاخص‌های کلیدی عملکرد (KPI)، ارتقای استانداردهای سازمانی و پژوهش‌های علمی-کاربردی'
            : 'Key performance indicators, institutional benchmarks, and peer-reviewed psychometric contributions'}
        </p>
      </div>

      {/* Bento Grid with Soft Physical Neumorphic Surfaces */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
        
        {/* Bento 1: Large Featured Card (Spans 2 cols, 2 rows on lg) */}
        <div className="md:col-span-2 lg:col-span-2 neu-card p-8 sm:p-10 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="neu-pill px-3 py-1 rounded-full text-xs font-light text-[#243B5D]">
                {isFa ? 'توسعه سازمانی' : 'Institutional Growth'}
              </span>
              <div className="w-10 h-10 rounded-full neu-button flex items-center justify-center text-[#243B5D]">
                <TrendingUp className="w-4 h-4 stroke-[1.5]" />
              </div>
            </div>

            <div className="text-4xl sm:text-5xl font-light text-[#243B5D] mb-4 tracking-tight">
              {isFa ? 'رشد پایدار' : 'Sustainable Scale'}
            </div>

            <h3 className="text-lg sm:text-xl font-normal text-[#243B5D] mb-3 leading-snug">
              {isFa
                ? 'رشد مستمر و پایدار آمار جذب و ثبت‌نام دانش‌آموزان در دوره‌های مدیریتی متوالی'
                : 'Continuous & Sustainable Student Enrollment Growth across Leadership Tenures'}
            </h3>

            <p className="text-sm font-light text-[#71839A] leading-relaxed">
              {isFa
                ? 'دستیابی به حداکثر ظرفیت پذیرش و ایجاد تقاضای پایدار در میان خانواده‌های متقاضی کیفیت از طریق ارتقای استانداردهای انضباطی، آموزشی و تربیتی دبیرستان.'
                : 'Attained optimal enrollment capacity and built enduring trust among educationally ambitious families through consistent excellence in learning protocols.'}
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-white/60 flex items-center justify-between text-xs text-[#71839A]">
            <span>{isFa ? 'پایش ظرفیت و پذیرش' : 'Intake & Retention'}</span>
            <span className="font-mono text-xs text-[#243B5D]">۱۰۰٪ تکمیل سهمیه</span>
          </div>
        </div>

        {/* Bento 2: Stakeholder Satisfaction (80%+) */}
        <div className="neu-card p-8 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="neu-pill px-3 py-1 rounded-full text-xs font-light text-[#243B5D]">
                {isFa ? 'تضمین کیفیت' : 'Quality Index'}
              </span>
              <div className="w-10 h-10 rounded-full neu-button flex items-center justify-center text-[#243B5D]">
                <Award className="w-4 h-4 stroke-[1.5]" />
              </div>
            </div>

            <div className="text-4xl sm:text-5xl font-light text-[#243B5D] mb-3 tracking-tight">
              ۸۰٪+
            </div>

            <h3 className="text-base sm:text-lg font-normal text-[#243B5D] mb-2 leading-snug">
              {isFa
                ? 'تحقق شاخص رضایت‌مندی اولیا و مراجع نظارتی'
                : 'Attainment of >80% Stakeholder & Inspectorate Satisfaction'}
            </h3>

            <p className="text-xs font-light text-[#71839A] leading-relaxed">
              {isFa
                ? 'کسب بالاترین امتیازها در نظرسنجی‌های فصلی اولیا و بازرسی‌های اداره آموزش و پرورش منطقه ۵.'
                : 'Ranked top tier in stakeholder periodic audits and Ministry of Education District 5 supervisory evaluations.'}
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-white/60 text-xs text-[#71839A]">
            {isFa ? 'نظرسنجی ادواری اولیا' : 'Parent Audits'}
          </div>
        </div>

        {/* Bento 3: Elite Faculty Recruitment */}
        <div className="neu-card p-8 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="neu-pill px-3 py-1 rounded-full text-xs font-light text-[#243B5D]">
                {isFa ? 'سرمایه انسانی' : 'Faculty'}
              </span>
              <div className="w-10 h-10 rounded-full neu-button flex items-center justify-center text-[#243B5D]">
                <Users className="w-4 h-4 stroke-[1.5]" />
              </div>
            </div>

            <div className="text-4xl sm:text-5xl font-light text-[#243B5D] mb-3 tracking-tight">
              ۴۰+
            </div>

            <h3 className="text-base sm:text-lg font-normal text-[#243B5D] mb-2 leading-snug">
              {isFa
                ? 'گزینش، استقرار و ارتقای شایستگی‌های کادر نخبه'
                : 'Elite Faculty Onboarding & Continuous Professional Growth'}
            </h3>

            <p className="text-xs font-light text-[#71839A] leading-relaxed">
              {isFa
                ? 'جذب دبیران تراز اول کنکور و استقرار کارگاه‌های مهارت‌های تدریس، اخلاق حرفه‌ای و مدیریت استرس.'
                : 'Curating premier teachers and conducting continuous pedagogy, emotional resilience, and ethics workshops.'}
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-white/60 text-xs text-[#71839A]">
            {isFa ? 'کادر آموزشی و مشاوره' : 'Academic & Counseling Team'}
          </div>
        </div>

        {/* Bento 4: Annual Operational Plan (OP) */}
        <div className="neu-card p-8 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="neu-pill px-3 py-1 rounded-full text-xs font-light text-[#243B5D]">
                {isFa ? 'برنامه‌ریزی راهبردی' : 'Strategic Planning'}
              </span>
              <div className="w-10 h-10 rounded-full neu-button flex items-center justify-center text-[#243B5D]">
                <FileCheck2 className="w-4 h-4 stroke-[1.5]" />
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-normal text-[#243B5D] mb-2 leading-snug">
              {isFa
                ? 'طراحی و استقرار برنامه عملیاتی سالانه (OP)'
                : 'Annual Operational Plan (OP) & Intake Diagnostic Battery'}
            </h3>

            <p className="text-xs font-light text-[#71839A] leading-relaxed">
              {isFa
                ? 'پیاده‌سازی سند عملیاتی مدرسه مبتنی بر اهداف SMART، ماتریس ارزیابی ورودی و پایش فصلی KPIها.'
                : 'Deployed SMART-based school operational blueprint with standardized psychometric diagnostic testing.'}
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-white/60 text-xs text-[#71839A]">
            {isFa ? 'سند تحول مدرسه' : 'School Transformation Charter'}
          </div>
        </div>

        {/* Bento 5: District Performance Ranking Elevation */}
        <div className="neu-card p-8 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="neu-pill px-3 py-1 rounded-full text-xs font-light text-[#243B5D]">
                {isFa ? 'آموزش و پرورش' : 'District Level'}
              </span>
              <div className="w-10 h-10 rounded-full neu-button flex items-center justify-center text-[#243B5D]">
                <Trophy className="w-4 h-4 stroke-[1.5]" />
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-normal text-[#243B5D] mb-2 leading-snug">
              {isFa
                ? 'ارتقای رتبه ارزیابی عملکرد مدرسه در سطح منطقه ۵'
                : 'Elevated School Performance Ranking Across District 5'}
            </h3>

            <p className="text-xs font-light text-[#71839A] leading-relaxed">
              {isFa
                ? 'کسب رتبه‌های برتر منطقه‌ای در ارزیابی‌های جامع با استقرار رویکرد بهبود مستمر فرآیندها.'
                : 'Achieved premier evaluations in annual district audits through continuous process enhancement.'}
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-white/60 text-xs text-[#71839A]">
            {isFa ? 'منطقه ۵ شهر تهران' : 'District 5 Inspectorate'}
          </div>
        </div>

        {/* Bento 6: Academic Research Paper (Spans 2 cols on lg) */}
        <div className="md:col-span-2 lg:col-span-2 neu-card p-8 sm:p-9 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="neu-pill px-3 py-1 rounded-full text-xs font-light text-[#243B5D]">
                {isFa ? 'مقاله علمی پژوهشی' : 'Peer-Reviewed Research Paper'}
              </span>
              <div className="w-10 h-10 rounded-full neu-button flex items-center justify-center text-[#243B5D]">
                <BookOpen className="w-4 h-4 stroke-[1.5]" />
              </div>
            </div>

            <span className="text-xs text-[#8FA8C8] font-mono">تابستان ۱۴۰۴ | فصلنامه علمی-پژوهشی روان‌سنجی</span>

            <h3 className="text-base sm:text-lg font-normal text-[#243B5D] mt-2 mb-2 leading-snug">
              {isFa
                ? 'بررسی ویژگی‌های روان‌سنجی پرسشنامه سلامت روان مثبت (PMHQ) و رابطه آن با بهزیستی روان‌شناختی در جامعه ایرانی'
                : 'Psychometric Evaluation of the Positive Mental Health Questionnaire (PMHQ) in the Iranian Community'}
            </h3>

            <p className="text-xs font-light text-[#71839A] leading-relaxed">
              {isFa
                ? 'نویسندگان: حسنا دوزنده، زینب مشایخ، ربیعی مریم | فصلنامه علمی-پژوهشی روان‌سنجی، دوره ۱۴، شماره ۵۳، صفحات ۱۶-۲۹.'
                : 'Authors: Hosna Doozandeh, Zeinab Mashayekh, Maryam Rabiei | Journal of Psychometrics, Vol. 14, Issue 53, pp. 16-29.'}
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-white/60 flex items-center justify-between text-xs text-[#71839A]">
            <span>{isFa ? 'سنجش و اندازه‌گیری تخصصی' : 'Specialized Educational Psychometrics'}</span>
            <span className="text-[#243B5D] font-light">ISC Indexed</span>
          </div>
        </div>

      </div>

    </section>
  );
};
