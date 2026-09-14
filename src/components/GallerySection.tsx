import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, GalleryItemContent } from '../types';
import { useSiteContent } from '../context/ContentContext';
import { parseVideoUrl } from '../utils/videoHelper';
import { Play, X, Film, Sparkles, ExternalLink } from 'lucide-react';

interface GallerySectionProps {
  lang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const { content } = useSiteContent();
  const isFa = lang === 'fa';
  const gallery = content?.gallery || [];

  const [activeVideoItem, setActiveVideoItem] = useState<GalleryItemContent | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveVideoItem(null);
    };
    if (activeVideoItem) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeVideoItem]);

  const parsedActiveVideo = activeVideoItem?.videoUrl ? parseVideoUrl(activeVideoItem.videoUrl) : null;

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
        {gallery.map((item, idx) => {
          const hasVideo = Boolean(item.videoUrl);

          return (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              onClick={() => {
                if (hasVideo) setActiveVideoItem(item);
              }}
              className={`${item.span || 'lg:col-span-6'} neu-card p-3 sm:p-4 group flex flex-col justify-between overflow-hidden ${
                hasVideo ? 'cursor-pointer' : ''
              }`}
            >
              {/* Image Container with Soft Large Radius and Zero Harsh Borders */}
              <div className={`w-full ${item.aspect || 'aspect-16/9'} rounded-[24px] overflow-hidden relative shadow-inner bg-[#E5EEF7]`}>
                <img
                  src={item.imageUrl}
                  alt={item.title?.[lang] || item.title?.fa || ''}
                  className="w-full h-full object-cover filter brightness-[1.01] contrast-[0.98] transition-transform duration-700 group-hover:scale-103"
                  loading="lazy"
                />

                {/* Play Button Indicator if item has a video URL */}
                {hasVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1B3252]/20 group-hover:bg-[#1B3252]/35 transition-colors">
                    <div className="w-12 h-12 rounded-full neu-dial flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <div className="w-8 h-8 rounded-full neu-button-primary flex items-center justify-center text-white">
                        <Play className="w-4 h-4 fill-white rtl:translate-x-[-1px] ltr:translate-x-[1px]" />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Subtle Translucent Overlay Tag */}
                {item.category && (
                  <div className="absolute top-4 rtl:right-4 ltr:left-4 neu-pill px-3.5 py-1.5 rounded-full text-xs font-light text-[#243B5D]">
                    {item.category?.[lang] || item.category?.fa}
                  </div>
                )}

                {hasVideo && (
                  <div className="absolute bottom-3 rtl:right-3 ltr:left-3 neu-pill px-2.5 py-1 rounded-full text-[10px] font-light bg-white/85 text-[#243B5D] backdrop-blur-sm flex items-center gap-1">
                    <Film className="w-3 h-3 text-[#3D5A80]" />
                    <span>{isFa ? 'شامل ویدیو' : 'Video Available'}</span>
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
          );
        })}
      </div>

      {/* Video Modal if gallery item is clicked */}
      <AnimatePresence>
        {activeVideoItem && parsedActiveVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideoItem(null)}
              className="absolute inset-0 bg-[#1B3252]/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-4xl neu-panel p-4 sm:p-6 z-10 max-h-[92vh] flex flex-col overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/60 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full neu-dial flex items-center justify-center text-[#3D5A80]">
                    <Film className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-normal text-[#243B5D]">
                      {activeVideoItem.title?.[lang] || activeVideoItem.title?.fa}
                    </h3>
                    <p className="text-xs text-[#71839A] font-light">
                      {activeVideoItem.category?.[lang] || activeVideoItem.category?.fa}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveVideoItem(null)}
                  className="neu-button p-2 rounded-full text-[#71839A] hover:text-[#243B5D] cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black relative shadow-inner neu-recessed flex items-center justify-center">
                {parsedActiveVideo.type === 'aparat' ||
                parsedActiveVideo.type === 'youtube' ||
                parsedActiveVideo.type === 'vimeo' ? (
                  <iframe
                    src={parsedActiveVideo.embedUrl}
                    title={activeVideoItem.title?.[lang] || activeVideoItem.title?.fa}
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                ) : parsedActiveVideo.type === 'direct' && !parsedActiveVideo.isPlaceholder ? (
                  <video
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                    poster={activeVideoItem.imageUrl}
                    src={parsedActiveVideo.embedUrl}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white bg-gradient-to-br from-[#1B3252] to-[#3D5A80]">
                    <Play className="w-10 h-10 mb-2 opacity-80" />
                    <h4 className="text-base font-normal">
                      {activeVideoItem.title?.[lang] || activeVideoItem.title?.fa}
                    </h4>
                    <p className="text-xs text-[#D6E4F0] font-light mt-1 max-w-md">
                      {isFa ? 'پیش‌نمایش ویدیو آماده است. می‌توانید لینک ویدیو را در پنل مدیریت ویرایش کنید.' : 'Video placeholder ready.'}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
