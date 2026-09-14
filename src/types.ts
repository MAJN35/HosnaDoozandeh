export type Language = 'fa' | 'en';

export interface Project {
  id: string;
  title: {
    fa: string;
    en: string;
  };
  category: 'leadership' | 'psychometrics' | 'ai_data' | 'social';
  categoryLabel: {
    fa: string;
    en: string;
  };
  organization: {
    fa: string;
    en: string;
  };
  period: {
    fa: string;
    en: string;
  };
  summary: {
    fa: string;
    en: string;
  };
  keyAchievements: {
    fa: string[];
    en: string[];
  };
  skillsUsed: string[];
  featured?: boolean;
}

export interface SkillItem {
  name: {
    fa: string;
    en: string;
  };
  category: 'psychometrics' | 'leadership' | 'analytics' | 'edtech';
  level: number; // 0 - 100
  description: {
    fa: string;
    en: string;
  };
  tags: string[];
}

export interface ExperienceItem {
  id: string;
  role: {
    fa: string;
    en: string;
  };
  organization: {
    fa: string;
    en: string;
  };
  period: {
    fa: string;
    en: string;
  };
  isCurrent: boolean;
  type: 'executive' | 'founding' | 'management';
  description: {
    fa: string;
    en: string;
  };
  duties: {
    fa: string[];
    en: string[];
  };
}

export interface EducationItem {
  degree: {
    fa: string;
    en: string;
  };
  institution: {
    fa: string;
    en: string;
  };
  period: {
    fa: string;
    en: string;
  };
  field: {
    fa: string;
    en: string;
  };
  highlights?: {
    fa: string[];
    en: string[];
  };
}

export interface CertificateItem {
  title: {
    fa: string;
    en: string;
  };
  issuer: {
    fa: string;
    en: string;
  };
  credentialType: {
    fa: string;
    en: string;
  };
  focus: {
    fa: string;
    en: string;
  };
}

export interface PublicationItem {
  title: {
    fa: string;
    en: string;
  };
  authors: {
    fa: string;
    en: string;
  };
  journal: {
    fa: string;
    en: string;
  };
  details: {
    fa: string;
    en: string;
  };
  year: string;
  abstract: {
    fa: string;
    en: string;
  };
  keywords: string[];
}

export interface ExtracurricularItem {
  title: {
    fa: string;
    en: string;
  };
  period: {
    fa: string;
    en: string;
  };
  description: {
    fa: string;
    en: string;
  };
  category?: {
    fa: string;
    en: string;
  };
}

export interface ManagerialAchievement {
  id: string;
  title: {
    fa: string;
    en: string;
  };
  description: {
    fa: string;
    en: string;
  };
  metric?: string;
  badge?: {
    fa: string;
    en: string;
  };
}

export interface LeadershipPillar {
  id: string;
  title: {
    fa: string;
    en: string;
  };
  subtitle: {
    fa: string;
    en: string;
  };
  description: {
    fa: string;
    en: string;
  };
  iconName: string;
}

export interface StatItem {
  id: string;
  value: {
    fa: string;
    en: string;
  };
  label: {
    fa: string;
    en: string;
  };
  sub: {
    fa: string;
    en: string;
  };
}

export interface HeroSectionContent {
  eyebrow: {
    fa: string;
    en: string;
  };
  name: {
    fa: string;
    en: string;
  };
  role: {
    fa: string;
    en: string;
  };
  specialty: {
    fa: string;
    en: string;
  };
  quote: {
    fa: string;
    en: string;
  };
  charterText: {
    fa: string;
    en: string;
  };
  complexBadge: {
    fa: string;
    en: string;
  };
  photoUrl: string;
  stats: StatItem[];
}

export interface AchievementItemContent {
  id: string;
  badge: {
    fa: string;
    en: string;
  };
  metric: string;
  title: {
    fa: string;
    en: string;
  };
  description: {
    fa: string;
    en: string;
  };
  subtext: {
    fa: string;
    en: string;
  };
}

export interface PublicationContent {
  tag: {
    fa: string;
    en: string;
  };
  dateJournal: {
    fa: string;
    en: string;
  };
  title: {
    fa: string;
    en: string;
  };
  authorsAndCite: {
    fa: string;
    en: string;
  };
  footerNote: {
    fa: string;
    en: string;
  };
  badge: string;
}

export interface GalleryItemContent {
  id: string;
  title: {
    fa: string;
    en: string;
  };
  category: {
    fa: string;
    en: string;
  };
  description: {
    fa: string;
    en: string;
  };
  imageUrl: string;
  videoUrl?: string;
  span?: string;
  aspect?: string;
}

export interface VideoItemContent {
  id: string;
  title: {
    fa: string;
    en: string;
  };
  category: {
    fa: string;
    en: string;
  };
  description: {
    fa: string;
    en: string;
  };
  videoUrl: string;
  thumbnailUrl: string;
  duration?: string;
  date?: string;
  featured?: boolean;
}

export interface TestimonialItemContent {
  id: string;
  quote: {
    fa: string;
    en: string;
  };
  author: {
    fa: string;
    en: string;
  };
  role: {
    fa: string;
    en: string;
  };
  institution: {
    fa: string;
    en: string;
  };
}

export interface ContactSectionContent {
  badge: {
    fa: string;
    en: string;
  };
  heading: {
    fa: string;
    en: string;
  };
  subheading: {
    fa: string;
    en: string;
  };
  email: string;
  website: string;
  websiteUrl: string;
  location: {
    fa: string;
    en: string;
  };
  officeHoursNote: {
    fa: string;
    en: string;
  };
}

export interface SiteContent {
  hero: HeroSectionContent;
  pillars: LeadershipPillar[];
  experiences: ExperienceItem[];
  achievements: AchievementItemContent[];
  publication: PublicationContent;
  gallery: GalleryItemContent[];
  videos: VideoItemContent[];
  testimonials: TestimonialItemContent[];
  contact: ContactSectionContent;
}
