import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { useSiteContent } from '../context/ContentContext';
import { Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  lang: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ lang }) => {
  const { content } = useSiteContent();
  const isFa = lang === 'fa';
  const testimonials = content?.testimonials || [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      id="testimonials"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 space-y-3">
        <div className="neu-pill px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-xs font-normal text-[#71839A]">
          <span className="w-2 h-2 rounded-full bg-[#8FA8C8]" />
          <span>{isFa ? 'دیدگاه‌ها و اعتماد متقابل' : 'Stakeholder Perspectives'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-light text-[#243B5D] tracking-tight">
          {isFa ? 'هم‌افزایی با معلمان، اولیا و ناظران' : 'Voices of Trust & Collaboration'}
        </h2>
        <p className="text-sm sm:text-base font-light text-[#71839A] leading-relaxed">
          {isFa
            ? 'روایت همکاران، خانواده‌ها و کارشناسان آموزشی از سبک راهبری انسان‌محور'
            : 'Insights from faculty, parents, and district inspectors on empathetic, principled leadership'}
        </p>
      </div>

      {/* Floating Rounded Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 sm:gap-8">
        {testimonials.map((t, idx) => (
          <motion.div
            key={t.id || idx}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: idx * 0.12, ease: 'easeOut' }}
            whileHover={{ y: -4 }}
            className="neu-card p-7 sm:p-8 flex flex-col justify-between group"
          >
            <div>
              {/* Subtle Quote Symbol */}
              <div className="w-10 h-10 rounded-full neu-button flex items-center justify-center text-[#8FA8C8] mb-5">
                <Quote className="w-4 h-4" />
              </div>

              {/* Quote Content */}
              <p className="text-sm font-light text-[#243B5D] leading-relaxed mb-6">
                «{t.quote?.[lang] || t.quote?.fa || ''}»
              </p>
            </div>

            {/* Profile Info */}
            <div className="pt-4 border-t border-white/60">
              <div className="text-sm font-normal text-[#243B5D]">
                {t.author?.[lang] || t.author?.fa || ''}
              </div>
              <div className="text-xs font-light text-[#71839A] mt-0.5">
                {t.role?.[lang] || t.role?.fa || ''}
              </div>
              <div className="text-[11px] font-light text-[#8FA8C8] mt-0.5">
                {t.institution?.[lang] || t.institution?.fa || ''}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
