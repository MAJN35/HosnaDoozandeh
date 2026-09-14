import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { useSiteContent } from '../context/ContentContext';
import { Calendar, Building2 } from 'lucide-react';

interface ExperienceTimelineProps {
  lang: Language;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ lang }) => {
  const { content } = useSiteContent();
  const isFa = lang === 'fa';
  const experiences = content?.experiences || [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      id="journey"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20 space-y-3">
        <div className="neu-pill px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-xs font-normal text-[#71839A]">
          <span className="w-2 h-2 rounded-full bg-[#8FA8C8]" />
          <span>{isFa ? 'سوابق سازمانی و مدیریتی' : 'Career Progression'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-light text-[#243B5D] tracking-tight">
          {isFa ? 'مسیر حرفه‌ای' : 'Professional Journey'}
        </h2>
        <p className="text-sm sm:text-base font-light text-[#71839A] leading-relaxed">
          {isFa
            ? 'بیش از یک دهه راهبری، تأسیس و مدیریت در سطوح مختلف مجتمع مدارس هما'
            : 'Over a decade of foundational leadership, founding, and governance across Homa Schools'}
        </p>
      </div>

      {/* Physical Interface Timeline */}
      <div className="relative">
        {/* Continuous Connecting Line */}
        <div className="absolute top-6 bottom-6 right-6 rtl:right-6 ltr:left-6 md:right-1/2 md:rtl:right-1/2 md:ltr:left-1/2 md:-translate-x-1/2 w-[2px] bg-[#C8D9EA]" />

        {/* Timeline Items List */}
        <div className="space-y-10 sm:space-y-12">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={exp.id || index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Neumorphic Node */}
                <div className="absolute right-6 rtl:right-6 ltr:left-6 md:right-1/2 md:rtl:right-1/2 md:ltr:left-1/2 -translate-x-1/2 z-10 w-9 h-9 rounded-full neu-circle-node flex items-center justify-center transition-transform hover:scale-110">
                  <div
                    className={`w-3.5 h-3.5 rounded-full ${
                      exp.isCurrent ? 'bg-[#3D5A80] ring-4 ring-[#3D5A80]/20' : 'bg-[#8FA8C8]'
                    }`}
                  />
                </div>

                {/* Content Card (Takes half the grid on desktop) */}
                <div
                  className={`w-full md:w-[calc(50%-2.5rem)] pr-14 rtl:pr-14 ltr:pl-14 md:pr-0 md:rtl:pr-0 md:ltr:pl-0 ${
                    isEven
                      ? 'md:text-right rtl:md:text-right ltr:md:text-left'
                      : 'md:text-left rtl:md:text-left ltr:md:text-right'
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="neu-card p-6 sm:p-8"
                  >
                    {/* Year & Current Tag */}
                    <div
                      className={`flex items-center gap-2 mb-3 flex-wrap ${
                        isEven
                          ? 'md:justify-start rtl:md:justify-start ltr:md:justify-end'
                          : 'md:justify-end rtl:md:justify-end ltr:md:justify-start'
                      }`}
                    >
                      <span className="neu-pill px-3 py-1 rounded-full text-xs font-light text-[#243B5D] inline-flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-[#8FA8C8]" />
                        <span>{exp.period?.[lang] || exp.period?.fa || ''}</span>
                      </span>

                      {exp.isCurrent && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-normal text-[#243B5D] bg-[#Dce8f5] border border-white/60">
                          {isFa ? 'سمت فعال' : 'Active'}
                        </span>
                      )}
                    </div>

                    {/* Role / سمت */}
                    <h3 className="text-lg sm:text-xl font-normal text-[#243B5D] mb-1 tracking-tight">
                      {exp.role?.[lang] || exp.role?.fa || ''}
                    </h3>

                    {/* Institution / مؤسسه */}
                    <div
                      className={`flex items-center gap-1.5 text-xs font-normal text-[#8FA8C8] mb-3 ${
                        isEven
                          ? 'md:justify-start rtl:md:justify-start ltr:md:justify-end'
                          : 'md:justify-end rtl:md:justify-end ltr:md:justify-start'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{exp.organization?.[lang] || exp.organization?.fa || ''}</span>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm font-light text-[#71839A] leading-relaxed">
                      {exp.description?.[lang] || exp.description?.fa || ''}
                    </p>
                  </motion.div>
                </div>

                {/* Empty opposite placeholder on desktop */}
                <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
