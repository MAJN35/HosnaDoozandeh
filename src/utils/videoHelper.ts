/**
 * Utility helpers for video URL parsing, embedding, and automatic preview/thumbnail extraction
 * Supports Aparat (آپارات), YouTube, Vimeo, direct MP4, and interactive placeholders.
 */

export type VideoType = 'aparat' | 'youtube' | 'vimeo' | 'direct' | 'placeholder';

export interface ParsedVideo {
  type: VideoType;
  embedUrl: string;
  previewEmbedUrl: string;
  autoThumbnailUrl: string | null;
  isPlaceholder: boolean;
  originalUrl: string;
  platformName: string;
}

/**
 * Extracts any explicit thumbnail/poster parameter if embedded inside the URL query string
 */
function extractQueryThumbnail(urlStr: string): string | null {
  try {
    const u = new URL(urlStr);
    const param =
      u.searchParams.get('thumbnail') ||
      u.searchParams.get('thumb') ||
      u.searchParams.get('poster') ||
      u.searchParams.get('image');
    if (param && /^https?:\/\//i.test(param)) {
      return param;
    }
  } catch {
    // Ignore invalid URL objects
  }
  return null;
}

/**
 * Extracts video ID and returns appropriate embed URL, non-autoplay preview URL,
 * and automatic thumbnail URL if the video URL provides one.
 */
export function parseVideoUrl(url: string | undefined | null): ParsedVideo {
  const cleanUrl = (url || '').trim();

  if (!cleanUrl || cleanUrl.includes('placeholder') || cleanUrl.includes('sample_')) {
    return {
      type: 'placeholder',
      embedUrl: '',
      previewEmbedUrl: '',
      autoThumbnailUrl: null,
      isPlaceholder: true,
      originalUrl: cleanUrl,
      platformName: 'پیش‌نمایش ویدیو (Placeholder)',
    };
  }

  const queryThumb = extractQueryThumbnail(cleanUrl);

  // 1. Aparat (آپارات)
  // Formats: https://www.aparat.com/v/abcd123, https://aparat.com/v/abcd123, embed links
  const aparatMatch = cleanUrl.match(/aparat\.com\/(?:v\/|video\/video\/embed\/videohash\/)([a-zA-Z0-9]+)/i);
  if (aparatMatch && aparatMatch[1]) {
    const hash = aparatMatch[1];
    return {
      type: 'aparat',
      embedUrl: `https://www.aparat.com/video/video/embed/videohash/${hash}/vt/frame?autoplay=true`,
      previewEmbedUrl: `https://www.aparat.com/video/video/embed/videohash/${hash}/vt/frame`,
      autoThumbnailUrl: queryThumb,
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
      previewEmbedUrl: `https://www.youtube-nocookie.com/embed/${id}?rel=0&controls=0`,
      autoThumbnailUrl: queryThumb || `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
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
      previewEmbedUrl: `https://player.vimeo.com/video/${id}`,
      autoThumbnailUrl: queryThumb || `https://vumbnail.com/${id}.jpg`,
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
      previewEmbedUrl: cleanUrl,
      autoThumbnailUrl: queryThumb,
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
      previewEmbedUrl: cleanUrl,
      autoThumbnailUrl: queryThumb,
      isPlaceholder: false,
      originalUrl: cleanUrl,
      platformName: 'لینک اینترنتی ویدیو',
    };
  }

  return {
    type: 'placeholder',
    embedUrl: '',
    previewEmbedUrl: '',
    autoThumbnailUrl: null,
    isPlaceholder: true,
    originalUrl: cleanUrl,
    platformName: 'پیش‌نمایش ویدیو',
  };
}

/**
 * Sample video links for convenient testing in admin panel
 */
export const SAMPLE_VIDEO_PRESETS = [
  {
    label: 'لینک نمونه آپارات (Aparat)',
    url: 'https://www.aparat.com/v/ieqx9ye',
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
