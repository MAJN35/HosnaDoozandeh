import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { useSiteContent } from '../context/ContentContext';
import {
  TrendingUp,
  Award,
  Users,
  FileCheck2,
  Trophy,
  BookOpen,
} from 'lucide-react';

interface AchievementsSectionProps {
  lang: Language;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  Award,
  Users,
  FileCheck2,
  Trophy,
  BookOpen,
};

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ lang }) => {
  const { content } = useSiteContent();
  const isFa = lang === 'fa';
  const achievements = content?.achievements || [];
  const publication = content?.publication;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      id="achievements"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
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
        {achievements.map((item, idx) => {
          const Icon = (item.iconName && iconMap[item.iconName]) || Award;
          const isLarge = item.isLarge ?? (idx === 0);

          // Support metric being a string or multilingual object
          const metricDisplay =
            typeof item.metric === 'object' && item.metric !== null
              ? (item.metric as Record<string, string>)[lang] || (item.metric as Record<string, string>)['fa']
              : item.metric;

          return (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className={`${
                isLarge ? 'md:col-span-2 lg:col-span-2' : ''
              } neu-card p-8 sm:p-9 flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="neu-pill px-3 py-1 rounded-full text-xs font-light text-[#243B5D]">
                    {item.badge?.[lang] || item.badge?.fa || (isFa ? 'شاخص مدیریتی' : 'Key Indicator')}
                  </span>
                  <div className="w-10 h-10 rounded-full neu-button flex items-center justify-center text-[#243B5D]">
                    <Icon className="w-4 h-4 stroke-[1.5]" />
                  </div>
                </div>

                {metricDisplay && (
                  <div className="text-4xl sm:text-5xl font-light text-[#243B5D] mb-3 tracking-tight">
                    {metricDisplay}
                  </div>
                )}

                <h3
                  className={`${
                    isLarge ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
                  } font-normal text-[#243B5D] mb-2.5 leading-snug`}
                >
                  {item.title?.[lang] || item.title?.fa || ''}
                </h3>

                <p
                  className={`${
                    isLarge ? 'text-sm' : 'text-xs'
                  } font-light text-[#71839A] leading-relaxed`}
                >
                  {item.description?.[lang] || item.description?.fa || ''}
                </p>
              </div>

              {item.subtext && (
                <div className="pt-4 mt-5 border-t border-white/60 flex items-center justify-between text-xs text-[#71839A]">
                  <span>{item.subtext?.[lang] || item.subtext?.fa}</span>
                  {item.id === 'enrollment-growth' && (
                    <span className="font-mono text-xs text-[#243B5D]">۱۰۰٪ تکمیل</span>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Publication Card (Spans 2 cols on lg) */}
        {publication && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
            whileHover={{ y: -4 }}
            className="md:col-span-2 lg:col-span-2 neu-card p-8 sm:p-9 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="neu-pill px-3 py-1 rounded-full text-xs font-light text-[#243B5D]">
                  {publication.tag?.[lang] || publication.tag?.fa || (isFa ? 'مقاله علمی پژوهشی' : 'Research Paper')}
                </span>
                <div className="w-10 h-10 rounded-full neu-button flex items-center justify-center text-[#243B5D]">
                  <BookOpen className="w-4 h-4 stroke-[1.5]" />
                </div>
              </div>

              <span className="text-xs text-[#8FA8C8] font-mono">
                {publication.dateJournal?.[lang] || publication.dateJournal?.fa}
              </span>

              <h3 className="text-base sm:text-lg font-normal text-[#243B5D] mt-2 mb-2 leading-snug">
                {publication.title?.[lang] || publication.title?.fa}
              </h3>

              <p className="text-xs font-light text-[#71839A] leading-relaxed">
                {publication.authorsAndCite?.[lang] || publication.authorsAndCite?.fa}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/60 flex items-center justify-between text-xs text-[#71839A]">
              <span>{publication.footerNote?.[lang] || publication.footerNote?.fa}</span>
              <span className="text-[#243B5D] font-light">{publication.badge || 'ISC Indexed'}</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
