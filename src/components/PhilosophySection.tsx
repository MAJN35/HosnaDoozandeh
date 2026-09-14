import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { useSiteContent } from '../context/ContentContext';
import { UserCheck, Sparkles, Award, HeartHandshake, Activity, ShieldCheck, GraduationCap, Users } from 'lucide-react';

interface PhilosophySectionProps {
  lang: Language;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  UserCheck,
  HeartHandshake,
  Award,
  Sparkles,
  Activity,
  ShieldCheck,
  GraduationCap,
  Users,
};

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ lang }) => {
  const { content } = useSiteContent();
  const isFa = lang === 'fa';
  const pillars = content?.pillars || [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      id="philosophy"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="neu-pill px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-xs font-normal text-[#71839A]">
          <span className="w-2 h-2 rounded-full bg-[#8FA8C8]" />
          <span>{isFa ? 'اصول راهبری دبیرستان' : 'Educational Framework'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-light text-[#243B5D] tracking-tight">
          {isFa ? 'فلسفه آموزشی' : 'Leadership Philosophy'}
        </h2>
        <p className="text-sm sm:text-base font-light text-[#71839A] leading-relaxed">
          {isFa
            ? 'چهار رکن بنیادین در مدیریت انسان‌محور و هدایت نسل آینده‌ساز دختران دبیرستان هما'
            : 'Four foundational pillars guiding human-centered school leadership and character development'}
        </p>
      </div>

      {/* Four Large Rounded Neumorphic Cards with Staggered Entrance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8">
        {pillars.map((pillar, idx) => {
          const Icon = (pillar.iconName && iconMap[pillar.iconName]) || Sparkles;
          return (
            <motion.div
              key={pillar.id || idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className="neu-card p-8 sm:p-10 flex flex-col justify-between group"
            >
              <div>
                {/* Subtle Monochrome Raised Icon Circle */}
                <div className="w-14 h-14 rounded-2xl neu-button flex items-center justify-center mb-6 text-[#243B5D] transition-transform duration-300 group-hover:scale-105">
                  <Icon className="w-6 h-6 stroke-[1.4] text-[#243B5D]" />
                </div>

                {/* Card Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-light text-[#243B5D] mb-2 tracking-tight">
                  {pillar.title?.[lang] || pillar.title?.fa || ''}
                </h3>
                <div className="text-xs font-normal text-[#8FA8C8] mb-4">
                  {pillar.subtitle?.[lang] || pillar.subtitle?.fa || ''}
                </div>

                {/* Description */}
                <p className="text-sm font-light text-[#71839A] leading-relaxed">
                  {pillar.description?.[lang] || pillar.description?.fa || ''}
                </p>
              </div>

              {/* Subtle bottom indicator */}
              <div className="pt-6 mt-6 border-t border-white/60 flex items-center justify-between text-xs text-[#71839A]/70">
                <span className="font-light">{isFa ? 'دبیرستان دخترانه هما' : 'Homa Girls’ High School'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8FA8C8]/60" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};
