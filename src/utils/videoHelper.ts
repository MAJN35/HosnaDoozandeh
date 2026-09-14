/**
 * Utility helpers for video URL parsing, embedding, and placeholders
 * Supports Aparat (آپارات), YouTube, Vimeo, direct MP4, and interactive placeholders.
 */

export type VideoType = 'aparat' | 'youtube' | 'vimeo' | 'direct' | 'placeholder';

export interface ParsedVideo {
  type: VideoType;
  embedUrl: string;
  isPlaceholder: boolean;
  originalUrl: string;
  platformName: string;
}

/**
 * Extracts video ID and returns appropriate embed URL
 */
export function parseVideoUrl(url: string | undefined | null): ParsedVideo {
  const cleanUrl = (url || '').trim();

  if (!cleanUrl || cleanUrl.includes('placeholder') || cleanUrl.includes('sample_')) {
    return {
      type: 'placeholder',
      embedUrl: '',
      isPlaceholder: true,
      originalUrl: cleanUrl,
      platformName: 'پیش‌نمایش ویدیو (Placeholder)',
    };
  }

  // 1. Aparat (آپارات)
  // Formats: https://www.aparat.com/v/abcd123, https://aparat.com/v/abcd123, embed links
  const aparatMatch = cleanUrl.match(/aparat\.com\/(?:v\/|video\/video\/embed\/videohash\/)([a-zA-Z0-9]+)/i);
  if (aparatMatch && aparatMatch[1]) {
    const hash = aparatMatch[1];
    return {
      type: 'aparat',
      embedUrl: `https://www.aparat.com/video/video/embed/videohash/${hash}/vt/frame?autoplay=true`,
      isPlaceholder: false,
      originalUrl: cleanUrl,
      platformName: 'آپارات (Aparat)',
    };
  }

  // 2. YouTube
  // Formats: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, youtube.com/shorts/ID
  const youtubeMatch = cleanUrl.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  if (youtubeMatch && youtubeMatch[1]) {
    const id = youtubeMatch[1];
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
      isPlaceholder: false,
      originalUrl: cleanUrl,
      platformName: 'یوتیوب (YouTube)',
    };
  }

  // 3. Vimeo
  const vimeoMatch = cleanUrl.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^\/]*\/videos\/|album\/(?:\d+\/)?video\/|)(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    const id = vimeoMatch[1];
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1`,
      isPlaceholder: false,
      originalUrl: cleanUrl,
      platformName: 'ویمو (Vimeo)',
    };
  }

  // 4. Direct video file (mp4, webm, ogg, m4v)
  if (/\.(mp4|webm|ogg|m4v)(\?.*)?$/i.test(cleanUrl)) {
    return {
      type: 'direct',
      embedUrl: cleanUrl,
      isPlaceholder: false,
      originalUrl: cleanUrl,
      platformName: 'فایل مستقیم ویدیو (MP4/WebM)',
    };
  }

  // 5. Generic URL or unparseable format - treat as direct embed or custom iframe
  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
    return {
      type: 'direct',
      embedUrl: cleanUrl,
      isPlaceholder: false,
      originalUrl: cleanUrl,
      platformName: 'لینک اینترنتی ویدیو',
    };
  }

  return {
    type: 'placeholder',
    embedUrl: '',
    isPlaceholder: true,
    originalUrl: cleanUrl,
    platformName: 'پیش‌نمایش ویدیو',
  };
}

/**
 * Curated preset video thumbnails
 */
export const VIDEO_THUMBNAIL_PRESETS = [
  {
    label: { fa: 'مستند و فضای مدرسه', en: 'High School Environment' },
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: { fa: 'سخنرانی و سمینار آموزشی', en: 'Academic Keynote & Speech' },
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: { fa: 'کارگاه روان‌سنجی و معلمان', en: 'Psychometrics Workshop' },
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: { fa: 'مشاوره و هدایت تحصیلی فردی', en: 'Mentorship & Counseling' },
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
  },
];

/**
 * Sample video links for convenient testing in admin panel
 */
export const SAMPLE_VIDEO_PRESETS = [
  {
    label: 'لینک نمونه آپارات (Aparat)',
    url: 'https://www.aparat.com/v/v123456',
  },
  {
    label: 'لینک نمونه ویدیو مستقیم (Direct MP4)',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    label: 'پلی‌هولدر پیش‌فرض (Video Placeholder)',
    url: '',
  },
];
