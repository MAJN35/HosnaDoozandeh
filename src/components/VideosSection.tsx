import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, VideoItemContent } from '../types';
import { useSiteContent } from '../context/ContentContext';
import { parseVideoUrl } from '../utils/videoHelper';
import {
  Play,
  X,
  Clock,
  Calendar,
  Tv,
  Film,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface VideosSectionProps {
  lang: Language;
}

export const VideosSection: React.FC<VideosSectionProps> = ({ lang }) => {
  const { content } = useSiteContent();
  const isFa = lang === 'fa';
  const videos: VideoItemContent[] = content?.videos || [];

  const [activeVideo, setActiveVideo] = useState<VideoItemContent | null>(null);
  const [demoPlaying, setDemoPlaying] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveVideo(null);
        setDemoPlaying(false);
      }
    };
    if (activeVideo) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeVideo]);

  if (!videos || videos.length === 0) {
    return null;
  }

  const parsedActiveVideo = activeVideo ? parseVideoUrl(activeVideo.videoUrl) : null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      id="videos"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="neu-pill px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-xs font-normal text-[#71839A]">
          <Tv className="w-3.5 h-3.5 text-[#3D5A80]" />
          <span>{isFa ? 'ویدیوها و رسانه‌ها' : 'Videos & Keynotes'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-light text-[#243B5D] tracking-tight">
          {isFa ? 'مستندات و سخنرانی‌های تخصصی' : 'Documentaries & Academic Keynotes'}
        </h2>
        <p className="text-sm sm:text-base font-light text-[#71839A] leading-relaxed">
          {isFa
            ? 'گزیده‌ای از مستندات معرفی دبیرستان دخترانه هما، سمینارهای هدایت تحصیلی و کارگاه‌های سنجش و روان‌سنجی'
            : 'Explore video recordings of school activities, parent consultation keynotes, and psychometric workshops'}
        </p>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {videos.map((video, idx) => {
          const parsed = parseVideoUrl(video.videoUrl);
          const title = video.title?.[lang] || video.title?.fa || '';
          const category = video.category?.[lang] || video.category?.fa || '';
          const description = video.description?.[lang] || video.description?.fa || '';

          return (
            <motion.div
              key={video.id || idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -5 }}
              onClick={() => {
                setActiveVideo(video);
                setDemoPlaying(false);
              }}
              className="neu-card p-3.5 sm:p-4 group flex flex-col justify-between cursor-pointer relative overflow-hidden transition-all duration-300"
            >
              {/* Thumbnail Container */}
              <div className="w-full aspect-video rounded-2xl overflow-hidden relative shadow-inner bg-[#D6E4F0] flex items-center justify-center">
                <img
                  src={video.thumbnailUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'}
                  alt={title}
                  className="w-full h-full object-cover filter brightness-[0.98] contrast-[0.98] transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Vignette Overlay on Hover */}
                <div className="absolute inset-0 bg-[#1B3252]/25 group-hover:bg-[#1B3252]/40 transition-colors duration-300" />

                {/* Soft Neumorphic Play Button in Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full neu-dial flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full neu-button-primary flex items-center justify-center text-white">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white rtl:translate-x-[-1px] ltr:translate-x-[1px]" />
                    </div>
                  </div>
                </div>

                {/* Duration Badge */}
                {video.duration && (
                  <div className="absolute bottom-2.5 rtl:right-2.5 ltr:left-2.5 neu-pill px-2.5 py-1 rounded-full text-[11px] font-mono text-[#243B5D] bg-white/80 backdrop-blur-sm flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#3D5A80]" />
                    <span>{video.duration}</span>
                  </div>
                )}

                {/* Category Pill Top Left/Right */}
                {category && (
                  <div className="absolute top-2.5 rtl:right-2.5 ltr:left-2.5 neu-pill px-3 py-1 rounded-full text-[11px] font-light text-[#243B5D] bg-white/85 backdrop-blur-sm">
                    {category}
                  </div>
                )}

                {/* Platform Badge (Aparat / YouTube / Placeholder) */}
                <div className="absolute top-2.5 rtl:left-2.5 ltr:right-2.5 px-2 py-0.5 rounded-full text-[10px] font-light bg-[#1B3252]/70 text-white backdrop-blur-sm">
                  {parsed.platformName}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-normal text-[#243B5D] mb-1.5 leading-snug line-clamp-2 group-hover:text-[#3D5A80] transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm font-light text-[#71839A] leading-relaxed line-clamp-2">
                    {description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/60 flex items-center justify-between text-xs text-[#71839A] font-light">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#3D5A80]" />
                    <span>{video.date || (isFa ? '۱۴۰۴' : '2026')}</span>
                  </span>

                  <span className="text-[#3D5A80] group-hover:underline flex items-center gap-1 text-[11px] font-normal">
                    <span>{isFa ? 'مشاهده ویدیو' : 'Watch Video'}</span>
                    <Play className="w-3 h-3 fill-current" />
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Video Player Modal */}
      <AnimatePresence>
        {activeVideo && parsedActiveVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setActiveVideo(null);
                setDemoPlaying(false);
              }}
              className="absolute inset-0 bg-[#1B3252]/60 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-4xl neu-panel p-4 sm:p-6 z-10 max-h-[92vh] flex flex-col overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/60 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full neu-dial flex items-center justify-center text-[#3D5A80]">
                    <Film className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-normal text-[#243B5D]">
                      {activeVideo.title?.[lang] || activeVideo.title?.fa}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#71839A] font-light mt-0.5">
                      <span>{activeVideo.category?.[lang] || activeVideo.category?.fa}</span>
                      {activeVideo.duration && <span>• {activeVideo.duration}</span>}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveVideo(null);
                    setDemoPlaying(false);
                  }}
                  className="neu-button p-2 rounded-full text-[#71839A] hover:text-[#243B5D] cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Video Player Screen Container */}
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black relative shadow-inner neu-recessed flex items-center justify-center">
                {/* 1. Aparat / YouTube / Vimeo Iframe */}
                {(parsedActiveVideo.type === 'aparat' ||
                  parsedActiveVideo.type === 'youtube' ||
                  parsedActiveVideo.type === 'vimeo') && (
                  <iframe
                    src={parsedActiveVideo.embedUrl}
                    title={activeVideo.title?.[lang] || activeVideo.title?.fa}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}

                {/* 2. Direct MP4 Video */}
                {parsedActiveVideo.type === 'direct' && !parsedActiveVideo.isPlaceholder && (
                  <video
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                    poster={activeVideo.thumbnailUrl}
                    src={parsedActiveVideo.embedUrl}
                  >
                    {isFa ? 'مرورگر شما از پخش این فرمت ویدیو پشتیبانی نمی‌کند.' : 'Your browser does not support video playback.'}
                  </video>
                )}

                {/* 3. Placeholder Screen (If URL is placeholder or empty) */}
                {parsedActiveVideo.isPlaceholder && (
                  <div className="w-full h-full relative flex flex-col items-center justify-center p-6 text-center text-white bg-gradient-to-br from-[#1B3252] via-[#243B5D] to-[#3D5A80] overflow-hidden">
                    {/* Background Soft Glow Circles */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#8FA8C8]/10 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#3D5A80]/20 blur-3xl" />

                    {!demoPlaying ? (
                      <div className="relative z-10 max-w-lg space-y-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                          <Play className="w-8 h-8 text-white fill-white rtl:translate-x-[-2px] ltr:translate-x-[2px]" />
                        </div>

                        <div>
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-light mb-2 border border-amber-300/30">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{isFa ? 'پلی‌هولدر اختصاصی ویدیو' : 'Video Placeholder Ready'}</span>
                          </div>
                          <h4 className="text-lg sm:text-xl font-normal text-white">
                            {activeVideo.title?.[lang] || activeVideo.title?.fa}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#D6E4F0] font-light mt-1.5 leading-relaxed">
                            {isFa
                              ? 'این کادر نمونه است. شما می‌توانید در پنل مدیریت لینک ویدیوی آپارات (Aparat)، یوتیوب یا لینک فایل MP4 خود را درج نمایید تا بلافاصله اینجا پخش شود.'
                              : 'This is an active video placeholder. You can paste your Aparat, YouTube, or direct MP4 URL in the admin panel to play it here.'}
                          </p>
                        </div>

                        <div className="pt-2 flex items-center justify-center gap-3">
                          <button
                            onClick={() => setDemoPlaying(true)}
                            className="neu-button-primary px-5 py-2.5 rounded-full text-xs font-normal text-white shadow-lg flex items-center gap-2 cursor-pointer"
                          >
                            <Play className="w-4 h-4 fill-white" />
                            <span>{isFa ? 'پخش آزمایشی نمونه (Demo Player)' : 'Play Educational Demo'}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Interactive Educational Demo Player
                      <video
                        controls
                        autoPlay
                        className="w-full h-full object-contain"
                        poster={activeVideo.thumbnailUrl}
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Video Description & Actions */}
              <div className="mt-4 pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <p className="text-[#526987] font-light leading-relaxed max-w-2xl">
                  {activeVideo.description?.[lang] || activeVideo.description?.fa}
                </p>

                {activeVideo.videoUrl && !parsedActiveVideo.isPlaceholder && (
                  <a
                    href={activeVideo.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neu-button px-3.5 py-1.5 rounded-full text-[#3D5A80] hover:text-[#243B5D] flex items-center gap-1.5 shrink-0"
                  >
                    <span>{isFa ? 'مشاهده در صفحه اصلی' : 'Open Video Link'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
