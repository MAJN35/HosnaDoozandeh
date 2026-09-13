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
}

