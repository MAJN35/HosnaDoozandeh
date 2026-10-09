import React, { useEffect } from 'react';
import { Language } from '../types';
import { useSiteContent } from '../context/ContentContext';
import { parseVideoUrl } from '../utils/videoHelper';

interface SeoManagerProps {
  lang: Language;
}

export const SeoManager: React.FC<SeoManagerProps> = ({ lang }) => {
  const { content } = useSiteContent();

  useEffect(() => {
    const isFa = lang === 'fa';
    const heroName = content?.hero?.name?.[lang] || content?.hero?.name?.fa || 'حسنا دوزنده';
    const heroRole = content?.hero?.role?.[lang] || content?.hero?.role?.fa || 'مدیر دبیرستان دخترانه هما (دوره دوم)';
    const heroSpecialty = content?.hero?.specialty?.[lang] || content?.hero?.specialty?.fa || 'روانشناس (سنجش و اندازه‌گیری)';

    const pageTitle = isFa
      ? `${heroName} | ${heroRole} و ${heroSpecialty} | Hosna Doozandeh`
      : `Hosna Doozandeh (حسنا دوزنده) | ${heroRole} & ${heroSpecialty}`;

    const pageDescription = isFa
      ? `وب‌سایت و رزومه رسمی حسنا دوزنده؛ ${heroRole}، ${heroSpecialty}، موسس مدارس دخترانه هما و عضو هیئت مدیره مجتمع مدارس هما در منطقه ۵ تهران.`
      : `Official website and CV of Hosna Doozandeh (حسنا دوزنده); ${heroRole}, ${heroSpecialty}, and Founder of Homa Girls’ Schools in Tehran District 5.`;

    document.title = pageTitle;
    document.documentElement.dir = isFa ? 'rtl' : 'ltr';
    document.documentElement.lang = isFa ? 'fa' : 'en';

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute(attr, value);
      }
    };

    setMeta('meta[name="title"]', 'content', pageTitle);
    setMeta('meta[name="description"]', 'content', pageDescription);
    setMeta('meta[property="og:title"]', 'content', pageTitle);
    setMeta('meta[property="og:description"]', 'content', pageDescription);
    setMeta('meta[name="twitter:title"]', 'content', pageTitle);
    setMeta('meta[name="twitter:description"]', 'content', pageDescription);

    // Inject dynamic VideoObject & Experience structured data from live content
    const dynamicScriptId = 'dynamic-seo-jsonld';
    let scriptEl = document.getElementById(dynamicScriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = dynamicScriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const videoObjects = (content?.videos || [])
      .filter((v) => v.videoUrl && v.videoUrl.trim() !== '')
      .map((v) => {
        const parsed = parseVideoUrl(v.videoUrl);
        return {
          '@type': 'VideoObject',
          name: `${v.title?.fa || v.title?.en || 'ویدیوی آموزشی'} - حسنا دوزنده`,
          description: v.description?.fa || v.description?.en || v.title?.fa || '',
          embedUrl: parsed.embedUrl || v.videoUrl,
          contentUrl: v.videoUrl,
          thumbnailUrl: parsed.autoThumbnailUrl || 'https://douzandeh.ir/profile.jpg',
          uploadDate: '2025-01-01T08:00:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Person',
            name: 'حسنا دوزنده',
            url: 'https://douzandeh.ir/',
          },
        };
      });

    const dynamicSchema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'مستندات و سخنرانی‌های حسنا دوزنده در مجتمع مدارس هما',
      itemListElement: videoObjects.map((video, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: video,
      })),
    };

    scriptEl.textContent = JSON.stringify(dynamicSchema);
  }, [lang, content]);

  return null;
};
