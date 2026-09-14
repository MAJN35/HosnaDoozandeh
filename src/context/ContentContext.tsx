import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent } from '../types';
import { defaultSiteContent } from '../data/defaultSiteContent';
import {
  verifyCredentials,
  setAdminCredentials,
  resetCredentialsToDefault,
  getStoredAuthConfig,
  checkLockoutStatus,
} from '../utils/authSecurity';

interface LoginResult {
  success: boolean;
  isLocked?: boolean;
  remainingSeconds?: number;
}

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  updateSection: <K extends keyof SiteContent>(section: K, data: SiteContent[K]) => void;
  resetContent: () => void;
  isAdminLoggedIn: boolean;
  login: (user: string, pass: string) => Promise<LoginResult>;
  logout: () => void;
  changeCredentials: (user: string, pass: string) => Promise<void>;
  resetCredentials: () => void;
  authStatus: { isCustomized: boolean; updatedAt: string };
  activeView: 'public' | 'admin';
  setActiveView: (view: 'public' | 'admin') => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const STORAGE_KEY = 'douzandeh_portfolio_content_v2';
const AUTH_KEY = 'douzandeh_portfolio_admin_auth';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load content from localStorage or fallback to default
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);

        // Deep merge achievements safely handling legacy properties
        const mergedAchievements =
          parsed.achievements && Array.isArray(parsed.achievements) && parsed.achievements.length > 0
            ? parsed.achievements.map((item: any, idx: number) => {
                const def = defaultSiteContent.achievements[idx] || defaultSiteContent.achievements[0];
                return {
                  ...def,
                  ...item,
                  badge: item.badge || item.tag || def.badge,
                  title: item.title || def.title,
                  description: item.description || def.description,
                  subtext: item.subtext || item.footer || def.subtext,
                };
              })
            : defaultSiteContent.achievements;

        // Merge with defaults to ensure all keys exist
        return {
          ...defaultSiteContent,
          ...parsed,
          hero: {
            ...defaultSiteContent.hero,
            ...(parsed.hero || {}),
            name: { ...defaultSiteContent.hero.name, ...(parsed.hero?.name || {}) },
            role: { ...defaultSiteContent.hero.role, ...(parsed.hero?.role || {}) },
            specialty: { ...defaultSiteContent.hero.specialty, ...(parsed.hero?.specialty || {}) },
            quote: { ...defaultSiteContent.hero.quote, ...(parsed.hero?.quote || {}) },
            eyebrow: { ...defaultSiteContent.hero.eyebrow, ...(parsed.hero?.eyebrow || {}) },
            complexBadge: { ...defaultSiteContent.hero.complexBadge, ...(parsed.hero?.complexBadge || {}) },
          },
          achievements: mergedAchievements,
          publication: {
            ...defaultSiteContent.publication,
            ...(parsed.publication || {}),
            tag: { ...defaultSiteContent.publication.tag, ...(parsed.publication?.tag || {}) },
            dateJournal: {
              ...defaultSiteContent.publication.dateJournal,
              ...(parsed.publication?.dateJournal || parsed.publication?.season || {}),
            },
            title: { ...defaultSiteContent.publication.title, ...(parsed.publication?.title || {}) },
            authorsAndCite: {
              ...defaultSiteContent.publication.authorsAndCite,
              ...(parsed.publication?.authorsAndCite || parsed.publication?.authors || {}),
            },
            footerNote: {
              ...defaultSiteContent.publication.footerNote,
              ...(parsed.publication?.footerNote || parsed.publication?.field || {}),
            },
          },
          videos:
            parsed.videos && Array.isArray(parsed.videos) && parsed.videos.length > 0
              ? parsed.videos
              : defaultSiteContent.videos,
          contact: {
            ...defaultSiteContent.contact,
            ...(parsed.contact || {}),
            heading: { ...defaultSiteContent.contact.heading, ...(parsed.contact?.heading || {}) },
            subheading: { ...defaultSiteContent.contact.subheading, ...(parsed.contact?.subheading || {}) },
            location: { ...defaultSiteContent.contact.location, ...(parsed.contact?.location || {}) },
            officeHoursNote: {
              ...defaultSiteContent.contact.officeHoursNote,
              ...(parsed.contact?.officeHoursNote || parsed.contact?.officeNote || {}),
            },
          },
        };
      }
    } catch (e) {
      console.warn('Could not load saved content, using defaults', e);
    }
    return defaultSiteContent;
  });

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Auth Status (Customized or Default)
  const [authStatus, setAuthStatus] = useState<{ isCustomized: boolean; updatedAt: string }>(() => {
    const config = getStoredAuthConfig();
    return { isCustomized: config.isCustomized, updatedAt: config.updatedAt };
  });

  const SECRET_ADMIN_HASHES = ['#admin', '#panel', '#manage', '#login', '#secret', '#douzandeh-admin'];

  // View State ('public' or 'admin')
  const [activeView, setActiveView] = useState<'public' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (SECRET_ADMIN_HASHES.includes(hash)) {
        return 'admin';
      }
    }
    return 'public';
  });

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Sync hash changes and secret keyboard shortcut (Ctrl+Shift+A or Alt+A)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (SECRET_ADMIN_HASHES.includes(hash)) {
        setActiveView('admin');
      } else if (hash === '' || hash === '#') {
        setActiveView('public');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret key combination: Ctrl+Shift+A or Alt+A opens admin
      if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) || (e.altKey && (e.key === 'A' || e.key === 'a'))) {
        e.preventDefault();
        window.location.hash = '#admin';
        setActiveView('admin');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
      showToast('تغییرات با موفقیت ذخیره شد');
    } catch (e) {
      console.error('Failed to save to localStorage', e);
      showToast('خطا در ذخیره‌سازی محتوا');
    }
  };

  const updateSection = <K extends keyof SiteContent>(section: K, data: SiteContent[K]) => {
    setContent((prev) => {
      const updated = { ...prev, [section]: data };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        showToast(`بخش با موفقیت به‌روزرسانی شد`);
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
      return updated;
    });
  };

  const resetContent = () => {
    setContent(defaultSiteContent);
    try {
      localStorage.removeItem(STORAGE_KEY);
      showToast('تمام اطلاعات به حالت اولیه بازگردانده شد');
    } catch (e) {
      console.error('Failed to clear storage', e);
    }
  };

  const login = async (user: string, pass: string): Promise<LoginResult> => {
    const lockout = checkLockoutStatus();
    if (lockout.isLocked) {
      return {
        success: false,
        isLocked: true,
        remainingSeconds: lockout.remainingSeconds,
      };
    }

    const isValid = await verifyCredentials(user, pass);

    if (isValid) {
      setIsAdminLoggedIn(true);
      try {
        sessionStorage.setItem(AUTH_KEY, 'true');
      } catch (e) {
        console.error(e);
      }
      showToast('ورود با موفقیت انجام شد');
      return { success: true };
    }

    const afterAttemptLockout = checkLockoutStatus();
    return {
      success: false,
      isLocked: afterAttemptLockout.isLocked,
      remainingSeconds: afterAttemptLockout.remainingSeconds,
    };
  };

  const changeCredentials = async (newUser: string, newPass: string): Promise<void> => {
    await setAdminCredentials(newUser, newPass);
    const config = getStoredAuthConfig();
    setAuthStatus({ isCustomized: true, updatedAt: config.updatedAt });
    showToast('اطلاعات ورود مدیر با موفقیت و به‌صورت رمزنگاری‌شده تغییر یافت');
  };

  const resetCredentials = () => {
    resetCredentialsToDefault();
    const config = getStoredAuthConfig();
    setAuthStatus({ isCustomized: false, updatedAt: config.updatedAt });
    showToast('اطلاعات ورود به مقادیر پیش‌فرض بازگردانده شد');
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch (e) {
      console.error(e);
    }
    showToast('از بخش مدیریت خارج شدید');
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateContent,
        updateSection,
        resetContent,
        isAdminLoggedIn,
        login,
        logout,
        changeCredentials,
        resetCredentials,
        authStatus,
        activeView,
        setActiveView,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a ContentProvider');
  }
  return context;
};
