import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { useSiteContent } from '../context/ContentContext';

interface GallerySectionProps {
  lang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const { content } = useSiteContent();
  const isFa = lang === 'fa';
  const gallery = content?.gallery || [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      id="gallery"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 space-y-3">
        <div className="neu-pill px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-xs font-normal text-[#71839A]">
          <span className="w-2 h-2 rounded-full bg-[#8FA8C8]" />
          <span>{isFa ? 'نگارخانه و زیست‌بوم آموزشی' : 'Educational Environment'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-light text-[#243B5D] tracking-tight">
          {isFa ? 'فعالیت‌ها و فضاهای یادگیری' : 'Activities & Learning Spaces'}
        </h2>
        <p className="text-sm sm:text-base font-light text-[#71839A] leading-relaxed">
          {isFa
            ? 'تصاویری از محیط پویا، تعاملی و پرورشی دبیرستان دخترانه هما و برنامه‌های تخصصی'
            : 'Moments capturing vibrant mentorship, instructional spaces, and community advocacy'}
        </p>
      </div>

      {/* Asymmetric Editorial Gallery Grid with Soft Neumorphic Surfaces */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8">
        {gallery.map((item, idx) => (
          <motion.div
            key={item.id || idx}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
            whileHover={{ y: -4 }}
            className={`${item.span || 'lg:col-span-6'} neu-card p-3 sm:p-4 group flex flex-col justify-between overflow-hidden`}
          >
            {/* Image Container with Soft Large Radius and Zero Harsh Borders */}
            <div className={`w-full ${item.aspect || 'aspect-16/9'} rounded-[24px] overflow-hidden relative shadow-inner bg-[#E5EEF7]`}>
              <img
                src={item.imageUrl}
                alt={item.title?.[lang] || item.title?.fa || ''}
                className="w-full h-full object-cover filter brightness-[1.01] contrast-[0.98] transition-transform duration-700 group-hover:scale-103"
                loading="lazy"
              />
              
              {/* Subtle Translucent Overlay Tag */}
              {item.category && (
                <div className="absolute top-4 rtl:right-4 ltr:left-4 neu-pill px-3.5 py-1.5 rounded-full text-xs font-light text-[#243B5D]">
                  {item.category?.[lang] || item.category?.fa}
                </div>
              )}
            </div>

            {/* Editorial Caption Area */}
            <div className="p-4 sm:p-5">
              <h3 className="text-lg sm:text-xl font-normal text-[#243B5D] mb-1.5 tracking-tight">
                {item.title?.[lang] || item.title?.fa || ''}
              </h3>
              <p className="text-xs sm:text-sm font-light text-[#71839A] leading-relaxed">
                {item.description?.[lang] || item.description?.fa || ''}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
