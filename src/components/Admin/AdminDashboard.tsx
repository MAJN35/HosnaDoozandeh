import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Save,
  RotateCcw,
  Eye,
  LogOut,
  Sparkles,
  Award,
  Briefcase,
  Image as ImageIcon,
  MessageSquareQuote,
  Mail,
  User,
  Plus,
  Trash2,
  CheckCircle2,
  FileText,
  ShieldCheck,
  KeyRound,
  Download,
  Copy,
  Check,
  ShieldAlert,
  FileCode,
  Lock,
  Tv,
  Film,
  Play,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  GitBranch,
  GitCommit,
  UploadCloud,
  HelpCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { useSiteContent } from '../../context/ContentContext';
import { Language, SiteContent, ExperienceItem, GalleryItemContent, TestimonialItemContent, VideoItemContent } from '../../types';
import { parseVideoUrl, VIDEO_THUMBNAIL_PRESETS, SAMPLE_VIDEO_PRESETS } from '../../utils/videoHelper';
import {
  getStoredGitHubConfig,
  saveStoredGitHubConfig,
  pushContentToGitHub,
  generateDefaultSiteContentCode,
  generateAuthConfigCode,
  GitHubSyncConfig,
  CommitStepProgress,
} from '../../utils/githubSync';
import { getStoredAuthConfig } from '../../utils/authSecurity';

interface AdminDashboardProps {
  lang: Language;
  onBackToSite: () => void;
}

type TabType =
  | 'hero'
  | 'pillars'
  | 'experiences'
  | 'achievements'
  | 'gallery'
  | 'videos'
  | 'testimonials'
  | 'contact'
  | 'security'
  | 'export';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang, onBackToSite }) => {
  const {
    content,
    updateContent,
    resetContent,
    logout,
    toastMessage,
    showToast,
    changeCredentials,
    resetCredentials,
    authStatus,
  } = useSiteContent();

  // Local draft state initialized with current content
  const [draft, setDraft] = useState<SiteContent>(content);
  const [activeTab, setActiveTab] = useState<TabType>('hero');
  const [isSaving, setIsSaving] = useState(false);

  // Security Credentials state
  const [newUsernameInput, setNewUsernameInput] = useState('admin');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [securityError, setSecurityError] = useState<string | null>(null);
  const [securitySuccess, setSecuritySuccess] = useState<string | null>(null);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [copiedExport, setCopiedExport] = useState(false);
  const [copiedAuthConfig, setCopiedAuthConfig] = useState(false);

  // GitHub Sync State
  const [githubConfig, setGithubConfig] = useState<GitHubSyncConfig>(getStoredGitHubConfig);
  const [isSyncingGitHub, setIsSyncingGitHub] = useState(false);
  const [syncProgress, setSyncProgress] = useState<CommitStepProgress | null>(null);
  const [showToken, setShowToken] = useState(false);
  const [showTokenGuide, setShowTokenGuide] = useState(false);

  const isFa = lang === 'fa';

  const updateGithubField = (field: keyof GitHubSyncConfig, value: string) => {
    setGithubConfig((prev) => {
      const updated = { ...prev, [field]: value };
      saveStoredGitHubConfig(updated);
      return updated;
    });
  };

  const handleSyncToGitHub = async () => {
    if (!githubConfig.token.trim()) {
      setActiveTab('export');
      showToast(
        isFa
          ? 'لطفاً ابتدا توکن شخصی گیت‌هاب (Personal Access Token) را وارد فرمایید.'
          : 'Please enter your GitHub Personal Access Token first.'
      );
      return;
    }

    setIsSyncingGitHub(true);
    setSyncProgress({
      step: 'checking_token',
      message: isFa
        ? 'در حال برقراری ارتباط با مخزن گیت‌هاب و بررسی دسترسی...'
        : 'Connecting to repository and checking permissions...',
    });

    try {
      // Save locally first
      updateContent(draft);
      const authConf = getStoredAuthConfig();

      await pushContentToGitHub(
        githubConfig,
        draft,
        authConf.isCustomized ? authConf : undefined,
        (progress) => setSyncProgress(progress)
      );

      showToast(
        isFa
          ? 'تغییرات با موفقیت در مخزن گیت‌هاب ثبت شد!'
          : 'Successfully pushed changes to GitHub repository!'
      );
    } catch (err: any) {
      setSyncProgress({
        step: 'error',
        message:
          err.message ||
          (isFa ? 'خطا در ثبت تغییرات در مخزن گیت‌هاب' : 'Failed to commit to GitHub repository'),
      });
      showToast(
        err.message || (isFa ? 'خطا در همگام‌سازی با گیت‌هاب' : 'Failed to sync with GitHub')
      );
    } finally {
      setIsSyncingGitHub(false);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    updateContent(draft);
    setTimeout(() => {
      setIsSaving(false);
    }, 400);
  };

  const handleReset = () => {
    if (
      window.confirm(
        isFa
          ? 'آیا اطمینان دارید که مایلید تمام تغییرات پاک شده و به محتوای پیش‌فرض بازگردید؟'
          : 'Are you sure you want to reset all content to defaults?'
      )
    ) {
      resetContent();
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };

  // Helper updater for deeply nested string values
  const updateHeroField = (field: 'eyebrow' | 'name' | 'role' | 'specialty' | 'quote' | 'charterText' | 'complexBadge', subLang: 'fa' | 'en', value: string) => {
    setDraft((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: {
          ...prev.hero[field],
          [subLang]: value,
        },
      },
    }));
  };

  const updateStatItem = (index: number, subfield: 'value' | 'label' | 'sub', subLang: 'fa' | 'en', value: string) => {
    setDraft((prev) => {
      const stats = [...prev.hero.stats];
      stats[index] = {
        ...stats[index],
        [subfield]: {
          ...stats[index][subfield],
          [subLang]: value,
        },
      };
      return {
        ...prev,
        hero: {
          ...prev.hero,
          stats,
        },
      };
    });
  };

  const updatePillar = (index: number, field: 'title' | 'subtitle' | 'description', subLang: 'fa' | 'en', value: string) => {
    setDraft((prev) => {
      const pillars = [...prev.pillars];
      pillars[index] = {
        ...pillars[index],
        [field]: {
          ...pillars[index][field],
          [subLang]: value,
        },
      };
      return { ...prev, pillars };
    });
  };

  const updateExperience = (index: number, field: 'role' | 'organization' | 'period' | 'description', subLang: 'fa' | 'en', value: string) => {
    setDraft((prev) => {
      const experiences = [...prev.experiences];
      experiences[index] = {
        ...experiences[index],
        [field]: {
          ...experiences[index][field],
          [subLang]: value,
        },
      };
      return { ...prev, experiences };
    });
  };

  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: { fa: 'سمت یا نقش جدید', en: 'New Role Title' },
      organization: { fa: 'نام مؤسسه یا مدرسه', en: 'Institution Name' },
      period: { fa: '۱۴۰۴', en: '2025' },
      isCurrent: true,
      type: 'management',
      description: { fa: 'توضیحات مربوط به مسئولیت‌ها و دستاوردهای این دوره...', en: 'Description of key responsibilities and milestones...' },
      duties: { fa: ['مسئولیت نخست', 'مسئولیت دوم'], en: ['Primary responsibility', 'Secondary outcome'] },
    };
    setDraft((prev) => ({
      ...prev,
      experiences: [newItem, ...prev.experiences],
    }));
  };

  const removeExperience = (id: string) => {
    setDraft((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }));
  };

  const updateAchievement = (index: number, field: 'title' | 'description' | 'subtext' | 'badge', subLang: 'fa' | 'en', value: string) => {
    setDraft((prev) => {
      const achievements = [...prev.achievements];
      achievements[index] = {
        ...achievements[index],
        [field]: {
          ...achievements[index][field],
          [subLang]: value,
        },
      };
      return { ...prev, achievements };
    });
  };

  const updateAchievementMetric = (index: number, value: string) => {
    setDraft((prev) => {
      const achievements = [...prev.achievements];
      achievements[index] = {
        ...achievements[index],
        metric: value,
      };
      return { ...prev, achievements };
    });
  };

  const updateGallery = (index: number, field: 'title' | 'category' | 'description', subLang: 'fa' | 'en', value: string) => {
    setDraft((prev) => {
      const gallery = [...prev.gallery];
      gallery[index] = {
        ...gallery[index],
        [field]: {
          ...gallery[index][field],
          [subLang]: value,
        },
      };
      return { ...prev, gallery };
    });
  };

  const updateGalleryImageUrl = (index: number, url: string) => {
    setDraft((prev) => {
      const gallery = [...prev.gallery];
      gallery[index] = {
        ...gallery[index],
        imageUrl: url,
      };
      return { ...prev, gallery };
    });
  };

  const updateGalleryVideoUrl = (index: number, url: string) => {
    setDraft((prev) => {
      const gallery = [...prev.gallery];
      gallery[index] = {
        ...gallery[index],
        videoUrl: url,
      };
      return { ...prev, gallery };
    });
  };

  // Video preview in admin
  const [previewingVideoId, setPreviewingVideoId] = useState<string | null>(null);

  const addGalleryItem = () => {
    const newItem: GalleryItemContent = {
      id: `gallery-${Date.now()}`,
      title: { fa: 'فعالیت آموزشی جدید', en: 'New Educational Activity' },
      category: { fa: 'دبیرستان دخترانه هما', en: 'Homa High School' },
      description: { fa: 'شرح مختصر این فعالیت یا فضای یادگیری...', en: 'Brief overview of this learning space...' },
      imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    };
    setDraft((prev) => ({
      ...prev,
      gallery: [...prev.gallery, newItem],
    }));
  };

  const removeGalleryItem = (id: string) => {
    setDraft((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id),
    }));
  };

  const addVideoItem = () => {
    const newVideo: VideoItemContent = {
      id: `video-${Date.now()}`,
      title: {
        fa: 'عنوان ویدیوی جدید',
        en: 'New Educational Video Title',
      },
      category: {
        fa: 'مستند و رویداد آموزشی',
        en: 'Educational Media',
      },
      description: {
        fa: 'توضیحات مختصر پیرامون این ویدیو، سخنرانی یا کارگاه آموزشی دبیرستان هما.',
        en: 'Brief description of this video and educational insights.',
      },
      videoUrl: '',
      thumbnailUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      duration: '۰۵:۰۰',
      date: '۱۴۰۴',
      featured: false,
    };
    setDraft((prev) => ({
      ...prev,
      videos: [...(prev.videos || []), newVideo],
    }));
  };

  const removeVideoItem = (id: string) => {
    setDraft((prev) => ({
      ...prev,
      videos: (prev.videos || []).filter((v) => v.id !== id),
    }));
  };

  const updateVideoField = (index: number, field: 'title' | 'category' | 'description', subLang: 'fa' | 'en', value: string) => {
    setDraft((prev) => {
      const vids = [...(prev.videos || [])];
      vids[index] = {
        ...vids[index],
        [field]: {
          ...vids[index][field],
          [subLang]: value,
        },
      };
      return { ...prev, videos: vids };
    });
  };

  const updateVideoSimpleField = (index: number, field: 'videoUrl' | 'thumbnailUrl' | 'duration' | 'date', value: string) => {
    setDraft((prev) => {
      const vids = [...(prev.videos || [])];
      vids[index] = {
        ...vids[index],
        [field]: value,
      };
      return { ...prev, videos: vids };
    });
  };

  const moveVideo = (index: number, direction: 'up' | 'down') => {
    setDraft((prev) => {
      const vids = [...(prev.videos || [])];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= vids.length) return prev;
      const temp = vids[index];
      vids[index] = vids[targetIndex];
      vids[targetIndex] = temp;
      return { ...prev, videos: vids };
    });
  };

  const updateTestimonial = (index: number, field: 'quote' | 'author' | 'role' | 'institution', subLang: 'fa' | 'en', value: string) => {
    setDraft((prev) => {
      const testimonials = [...prev.testimonials];
      testimonials[index] = {
        ...testimonials[index],
        [field]: {
          ...testimonials[index][field],
          [subLang]: value,
        },
      };
      return { ...prev, testimonials };
    });
  };

  const tabs: { id: TabType; label: { fa: string; en: string }; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'hero', label: { fa: 'هویت و هدر', en: 'Hero & Identity' }, icon: User },
    { id: 'pillars', label: { fa: 'فلسفه آموزشی (۴ رکن)', en: 'Philosophy Pillars' }, icon: Sparkles },
    { id: 'experiences', label: { fa: 'سوابق و خط زمانی', en: 'Journey & Timeline' }, icon: Briefcase },
    { id: 'achievements', label: { fa: 'دستاوردها و مقالات', en: 'Achievements & Research' }, icon: Award },
    { id: 'gallery', label: { fa: 'نگارخانه و فضاها', en: 'Gallery & Spaces' }, icon: ImageIcon },
    { id: 'videos', label: { fa: 'ویدیوها و رسانه‌ها', en: 'Videos & Media' }, icon: Tv },
    { id: 'testimonials', label: { fa: 'دیدگاه‌ها و اولیا', en: 'Testimonials' }, icon: MessageSquareQuote },
    { id: 'contact', label: { fa: 'اطلاعات تماس', en: 'Contact Details' }, icon: Mail },
    { id: 'security', label: { fa: 'امنیت و تغییر رمز', en: 'Security & Password' }, icon: KeyRound },
    { id: 'export', label: { fa: 'همگام‌سازی با مخزن گیت‌هاب', en: 'GitHub Sync & Export' }, icon: GitBranch },
  ];

  return (
    <div className="min-h-screen bg-[#E8F0F8] text-[#243B5D] pb-28 pt-6 px-3 sm:px-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#243B5D] text-white text-xs font-light shadow-lg flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        {/* Top Bar Navigation */}
        <header className="neu-panel p-4 sm:p-5 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="w-11 h-11 rounded-full neu-dial flex items-center justify-center text-[#3D5A80]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-normal text-[#243B5D] flex items-center gap-2">
                <span>{isFa ? 'مدیریت محتوای پورتفولیو' : 'Portfolio Content Management'}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#E5EEF7] text-[#526987] font-mono border border-white/60">
                  v2.0
                </span>
              </h1>
              <p className="text-xs text-[#71839A] font-light">
                {isFa
                  ? 'تغییرات شما به صورت پایدار در مرورگر ذخیره و در صفحه اصلی نمایش داده می‌شود'
                  : 'Changes are persistently saved locally and immediately updated on the site'}
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={() => setActiveTab('export')}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-all ${
                activeTab === 'export'
                  ? 'neu-button-primary text-white shadow-md'
                  : 'neu-button text-[#243B5D] hover:text-[#1E3A8A] border border-[#3D5A80]/20'
              }`}
              title={isFa ? 'همگام‌سازی با مخزن گیت‌هاب و تنظیم توکن' : 'GitHub Sync & Token'}
            >
              <GitBranch className="w-3.5 h-3.5 text-[#3D5A80]" />
              <span>{isFa ? 'همگام‌سازی با گیت‌هاب' : 'GitHub Sync'}</span>
            </button>

            <button
              onClick={onBackToSite}
              className="neu-button px-3.5 py-2 rounded-xl text-xs font-light flex items-center gap-1.5 cursor-pointer text-[#455A75] hover:text-[#243B5D]"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isFa ? 'مشاهده سایت زنده' : 'View Public Site'}</span>
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="neu-button-primary px-4 py-2 rounded-xl text-xs font-light flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? (isFa ? 'در حال ذخیره...' : 'Saving...') : isFa ? 'ذخیره محلی' : 'Save Local'}</span>
            </button>

            <button
              onClick={logout}
              className="neu-button p-2 rounded-xl text-xs text-red-600 hover:text-red-700 cursor-pointer"
              title={isFa ? 'خروج از حساب مدیریت' : 'Sign out'}
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Global Alert for GitHub Sync if token is not set yet */}
        {!githubConfig.token && (
          <div className="neu-panel p-4 mb-5 border-r-4 border-r-[#3D5A80] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#E4EFF9]/80">
            <div className="flex items-center gap-2.5 text-xs text-[#243B5D]">
              <GitBranch className="w-4 h-4 text-[#3D5A80] shrink-0" />
              <span>
                {isFa
                  ? '💡 برای اعمال دائمی تغییرات محتوا و رمز عبور روی دامنه اصلی (douzandeh.ir)، توکن گیت‌هاب خود را ثبت نمایید:'
                  : '💡 To permanently deploy changes to douzandeh.ir, configure your GitHub token:'}
              </span>
            </div>
            <button
              onClick={() => setActiveTab('export')}
              className="px-3.5 py-1.5 rounded-xl bg-[#2A4367] text-white text-xs font-normal hover:bg-[#1E3352] transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{isFa ? 'ورود به بخش همگام‌سازی و ثبت توکن' : 'Enter GitHub Token'}</span>
            </button>
          </div>
        )}

        {/* Tab Selection Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isExport = tab.id === 'export';
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-normal shrink-0 flex items-center gap-2 cursor-pointer transition-all ${
                  isActive
                    ? 'neu-button-primary text-white font-medium shadow-md'
                    : isExport
                    ? 'neu-button text-[#1E3A8A] font-medium border border-[#3D5A80]/30 hover:text-[#243B5D]'
                    : 'neu-button text-[#526987] hover:text-[#243B5D]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label[lang]}</span>
                {isExport && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#3D5A80]/15 text-[#243B5D] font-mono">
                    GitHub
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="neu-panel p-5 sm:p-8 mb-8">
          {/* TAB 1: HERO & IDENTITY */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="border-b border-white/60 pb-3">
                <h2 className="text-base font-normal text-[#243B5D]">
                  {isFa ? 'بخش آغازین، هویت و عناوین اصلی' : 'Hero Section & Main Identity'}
                </h2>
                <p className="text-xs text-[#71839A] font-light mt-0.5">
                  {isFa
                    ? 'نام، عناوین رسمی، شعار و آمارهای کلیدی نمایش داده شده در بالای صفحه'
                    : 'Personal name, official titles, strategic motto and key stats shown in header'}
                </p>
              </div>

              {/* Name (FA & EN) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#455A75] mb-1.5">
                    {isFa ? 'نام و نام خانوادگی (فارسی)' : 'Full Name (Persian)'}
                  </label>
                  <input
                    type="text"
                    value={draft.hero.name.fa}
                    onChange={(e) => updateHeroField('name', 'fa', e.target.value)}
                    className="w-full neu-recessed px-3.5 py-2 rounded-xl text-sm font-light text-[#243B5D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#455A75] mb-1.5">
                    {isFa ? 'نام و نام خانوادگی (انگلیسی)' : 'Full Name (English)'}
                  </label>
                  <input
                    type="text"
                    value={draft.hero.name.en}
                    onChange={(e) => updateHeroField('name', 'en', e.target.value)}
                    className="w-full neu-recessed px-3.5 py-2 rounded-xl text-sm font-light text-[#243B5D]"
                  />
                </div>
              </div>

              {/* Role & Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#455A75] mb-1.5">
                    {isFa ? 'سمت سازمانی (فارسی)' : 'Organizational Role (Persian)'}
                  </label>
                  <input
                    type="text"
                    value={draft.hero.role.fa}
                    onChange={(e) => updateHeroField('role', 'fa', e.target.value)}
                    className="w-full neu-recessed px-3.5 py-2 rounded-xl text-sm font-light text-[#243B5D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#455A75] mb-1.5">
                    {isFa ? 'سمت سازمانی (انگلیسی)' : 'Organizational Role (English)'}
                  </label>
                  <input
                    type="text"
                    value={draft.hero.role.en}
                    onChange={(e) => updateHeroField('role', 'en', e.target.value)}
                    className="w-full neu-recessed px-3.5 py-2 rounded-xl text-sm font-light text-[#243B5D]"
                  />
                </div>
              </div>

              {/* Specialty */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#455A75] mb-1.5">
                    {isFa ? 'تخصص و مدرک تحصیلی (فارسی)' : 'Specialty & Credentials (Persian)'}
                  </label>
                  <input
                    type="text"
                    value={draft.hero.specialty.fa}
                    onChange={(e) => updateHeroField('specialty', 'fa', e.target.value)}
                    className="w-full neu-recessed px-3.5 py-2 rounded-xl text-sm font-light text-[#243B5D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#455A75] mb-1.5">
                    {isFa ? 'تخصص و مدرک تحصیلی (انگلیسی)' : 'Specialty & Credentials (English)'}
                  </label>
                  <input
                    type="text"
                    value={draft.hero.specialty.en}
                    onChange={(e) => updateHeroField('specialty', 'en', e.target.value)}
                    className="w-full neu-recessed px-3.5 py-2 rounded-xl text-sm font-light text-[#243B5D]"
                  />
                </div>
              </div>

              {/* Strategic Quote */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#455A75] mb-1.5">
                    {isFa ? 'شعار و دیدگاه راهبردی (فارسی)' : 'Strategic Quote (Persian)'}
                  </label>
                  <textarea
                    rows={3}
                    value={draft.hero.quote.fa}
                    onChange={(e) => updateHeroField('quote', 'fa', e.target.value)}
                    className="w-full neu-recessed px-3.5 py-2 rounded-xl text-sm font-light text-[#243B5D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#455A75] mb-1.5">
                    {isFa ? 'شعار و دیدگاه راهبردی (انگلیسی)' : 'Strategic Quote (English)'}
                  </label>
                  <textarea
                    rows={3}
                    value={draft.hero.quote.en}
                    onChange={(e) => updateHeroField('quote', 'en', e.target.value)}
                    className="w-full neu-recessed px-3.5 py-2 rounded-xl text-sm font-light text-[#243B5D]"
                  />
                </div>
              </div>

              {/* Photo URL & Charter */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#455A75] mb-1.5">
                    {isFa ? 'آدرس تصویر پرتره پروفایل' : 'Profile Photo URL'}
                  </label>
                  <input
                    type="text"
                    value={draft.hero.photoUrl}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, photoUrl: e.target.value },
                      }))
                    }
                    className="w-full neu-recessed px-3.5 py-2 rounded-xl text-sm font-light text-[#243B5D] font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#455A75] mb-1.5">
                    {isFa ? 'متن مجوز موافقت اصولی (فارسی)' : 'Founding Charter Text (Persian)'}
                  </label>
                  <input
                    type="text"
                    value={draft.hero.charterText.fa}
                    onChange={(e) => updateHeroField('charterText', 'fa', e.target.value)}
                    className="w-full neu-recessed px-3.5 py-2 rounded-xl text-sm font-light text-[#243B5D]"
                  />
                </div>
              </div>

              {/* Key Stats Dials (3 cards) */}
              <div className="pt-4 border-t border-white/60">
                <h3 className="text-sm font-medium text-[#243B5D] mb-3">
                  {isFa ? 'کارت‌های آماری سه‌گانه در هدر' : 'Three Header Statistical Metric Cards'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {draft.hero.stats.map((stat, idx) => (
                    <div key={stat.id} className="p-4 rounded-2xl neu-panel-soft space-y-2">
                      <div className="text-xs font-semibold text-[#3D5A80]">
                        {isFa ? `شاخص شماره ${idx + 1}` : `Metric #${idx + 1}`}
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#71839A]">{isFa ? 'مقدار عددی' : 'Value'}</label>
                        <input
                          type="text"
                          value={stat.value.fa}
                          onChange={(e) => updateStatItem(idx, 'value', 'fa', e.target.value)}
                          className="w-full neu-recessed px-3 py-1.5 rounded-lg text-sm font-light text-[#243B5D]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#71839A]">{isFa ? 'عنوان اصلی' : 'Main Label'}</label>
                        <input
                          type="text"
                          value={stat.label.fa}
                          onChange={(e) => updateStatItem(idx, 'label', 'fa', e.target.value)}
                          className="w-full neu-recessed px-3 py-1.5 rounded-lg text-xs font-light text-[#243B5D]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#71839A]">{isFa ? 'توضیح تکمیلی' : 'Sub Label'}</label>
                        <input
                          type="text"
                          value={stat.sub.fa}
                          onChange={(e) => updateStatItem(idx, 'sub', 'fa', e.target.value)}
                          className="w-full neu-recessed px-3 py-1.5 rounded-lg text-xs font-light text-[#243B5D]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PHILOSOPHY PILLARS (4 cards) */}
          {activeTab === 'pillars' && (
            <div className="space-y-6">
              <div className="border-b border-white/60 pb-3">
                <h2 className="text-base font-normal text-[#243B5D]">
                  {isFa ? 'ارکان چهارگانه فلسفه و رویکرد آموزشی' : 'Four Pillars of Educational Philosophy'}
                </h2>
                <p className="text-xs text-[#71839A] font-light mt-0.5">
                  {isFa
                    ? 'اصول بنیادین راهبری مدرسه و پرورش دانش‌آموزان'
                    : 'Fundamental pillars of school leadership and student personal development'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {draft.pillars.map((pillar, idx) => (
                  <div key={pillar.id} className="p-5 rounded-2xl neu-panel-soft space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#3D5A80]">
                        {isFa ? `رکن شماره ${idx + 1}` : `Pillar #${idx + 1}`}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#E5EEF7] text-[#71839A]">
                        {pillar.id}
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#455A75] mb-1">
                        {isFa ? 'عنوان رکن (فارسی)' : 'Title (Persian)'}
                      </label>
                      <input
                        type="text"
                        value={pillar.title.fa}
                        onChange={(e) => updatePillar(idx, 'title', 'fa', e.target.value)}
                        className="w-full neu-recessed px-3 py-2 rounded-xl text-sm font-light text-[#243B5D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#455A75] mb-1">
                        {isFa ? 'زیرعنوان رکن (فارسی)' : 'Subtitle (Persian)'}
                      </label>
                      <input
                        type="text"
                        value={pillar.subtitle.fa}
                        onChange={(e) => updatePillar(idx, 'subtitle', 'fa', e.target.value)}
                        className="w-full neu-recessed px-3 py-2 rounded-xl text-xs font-light text-[#243B5D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#455A75] mb-1">
                        {isFa ? 'شرح و تبیین رویکرد (فارسی)' : 'Description (Persian)'}
                      </label>
                      <textarea
                        rows={3}
                        value={pillar.description.fa}
                        onChange={(e) => updatePillar(idx, 'description', 'fa', e.target.value)}
                        className="w-full neu-recessed px-3 py-2 rounded-xl text-xs font-light text-[#243B5D]"
                      />
                    </div>

                    <div className="pt-2 border-t border-white/50">
                      <label className="block text-[11px] font-medium text-[#71839A] mb-1">
                        {isFa ? 'عنوان انگلیسی' : 'English Title'}
                      </label>
                      <input
                        type="text"
                        value={pillar.title.en}
                        onChange={(e) => updatePillar(idx, 'title', 'en', e.target.value)}
                        className="w-full neu-recessed px-3 py-1.5 rounded-xl text-xs font-light text-[#243B5D]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EXPERIENCES / TIMELINE */}
          {activeTab === 'experiences' && (
            <div className="space-y-6">
              <div className="border-b border-white/60 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-normal text-[#243B5D]">
                    {isFa ? 'سوابق مدیریتی و خط زمانی تجربیات' : 'Professional Experiences & Timeline'}
                  </h2>
                  <p className="text-xs text-[#71839A] font-light mt-0.5">
                    {isFa
                      ? 'مدیریت دوره‌های مختلف دبیرستان، دبستان و هیئت‌مدیره مجتمع مدارس هما'
                      : 'Leadership tenures across secondary, elementary, and governance boards'}
                  </p>
                </div>
                <button
                  onClick={addExperience}
                  className="neu-button px-3 py-1.5 rounded-xl text-xs font-light flex items-center gap-1.5 text-[#3D5A80] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isFa ? 'افزودن سابقه جدید' : 'Add Experience'}</span>
                </button>
              </div>

              <div className="space-y-4">
                {draft.experiences.map((exp, idx) => (
                  <div key={exp.id} className="p-4 sm:p-5 rounded-2xl neu-panel-soft space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full neu-dial text-[11px] flex items-center justify-center font-mono text-[#3D5A80]">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-medium text-[#243B5D]">{exp.organization.fa}</span>
                        {exp.isCurrent && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {isFa ? 'سمت کنونی' : 'Current'}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete this experience"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#71839A] mb-1">{isFa ? 'عنوان سمت' : 'Role'}</label>
                        <input
                          type="text"
                          value={exp.role.fa}
                          onChange={(e) => updateExperience(idx, 'role', 'fa', e.target.value)}
                          className="w-full neu-recessed px-3 py-1.5 rounded-xl text-xs font-light text-[#243B5D]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#71839A] mb-1">{isFa ? 'سازمان / مدرسه' : 'Organization'}</label>
                        <input
                          type="text"
                          value={exp.organization.fa}
                          onChange={(e) => updateExperience(idx, 'organization', 'fa', e.target.value)}
                          className="w-full neu-recessed px-3 py-1.5 rounded-xl text-xs font-light text-[#243B5D]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#71839A] mb-1">{isFa ? 'دوره زمانی' : 'Period'}</label>
                        <input
                          type="text"
                          value={exp.period.fa}
                          onChange={(e) => updateExperience(idx, 'period', 'fa', e.target.value)}
                          className="w-full neu-recessed px-3 py-1.5 rounded-xl text-xs font-light text-[#243B5D]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#71839A] mb-1">{isFa ? 'شرح اقدامات و مسئولیت‌ها' : 'Description'}</label>
                      <textarea
                        rows={2}
                        value={exp.description.fa}
                        onChange={(e) => updateExperience(idx, 'description', 'fa', e.target.value)}
                        className="w-full neu-recessed px-3 py-1.5 rounded-xl text-xs font-light text-[#243B5D]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ACHIEVEMENTS & RESEARCH */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="border-b border-white/60 pb-3">
                <h2 className="text-base font-normal text-[#243B5D]">
                  {isFa ? 'دستاوردها، ارزیابی‌های سنجش‌پذیر و مقاله پژوهشی' : 'Measurable Achievements & Research'}
                </h2>
                <p className="text-xs text-[#71839A] font-light mt-0.5">
                  {isFa
                    ? 'کارت‌های بنتو دستاوردها و مشخصات مقاله علمی پژوهشی نمایه شده'
                    : 'Bento metric cards and peer-reviewed psychometrics paper'}
                </p>
              </div>

              {/* Bento Achievement Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {draft.achievements.map((item, idx) => (
                  <div key={item.id} className="p-4 rounded-2xl neu-panel-soft space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#3D5A80]">
                        {isFa ? `دستاورد شماره ${idx + 1}` : `Metric Card #${idx + 1}`}
                      </span>
                      <input
                        type="text"
                        value={item.metric}
                        onChange={(e) => updateAchievementMetric(idx, e.target.value)}
                        className="w-24 text-center neu-recessed px-2 py-0.5 rounded-md text-xs font-bold text-[#3D5A80]"
                        placeholder="Metric Value"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#71839A] mb-1">{isFa ? 'عنوان دستاورد' : 'Title'}</label>
                      <input
                        type="text"
                        value={item.title.fa}
                        onChange={(e) => updateAchievement(idx, 'title', 'fa', e.target.value)}
                        className="w-full neu-recessed px-3 py-1.5 rounded-xl text-xs font-light text-[#243B5D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#71839A] mb-1">{isFa ? 'شرح دستاورد' : 'Description'}</label>
                      <textarea
                        rows={2}
                        value={item.description.fa}
                        onChange={(e) => updateAchievement(idx, 'description', 'fa', e.target.value)}
                        className="w-full neu-recessed px-3 py-1.5 rounded-xl text-xs font-light text-[#243B5D]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Peer-Reviewed Publication Edit */}
              <div className="pt-4 border-t border-white/60">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-[#3D5A80]" />
                  <h3 className="text-sm font-medium text-[#243B5D]">
                    {isFa ? 'مشخصات مقاله علمی پژوهشی' : 'Peer-Reviewed Research Paper'}
                  </h3>
                </div>

                <div className="p-5 rounded-2xl neu-panel-soft space-y-3">
                  <div>
                    <label className="block text-[11px] text-[#71839A] mb-1">
                      {isFa ? 'عنوان مقاله (فارسی)' : 'Paper Title (Persian)'}
                    </label>
                    <input
                      type="text"
                      value={draft.publication.title.fa}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          publication: {
                            ...prev.publication,
                            title: { ...prev.publication.title, fa: e.target.value },
                          },
                        }))
                      }
                      className="w-full neu-recessed px-3 py-2 rounded-xl text-xs font-light text-[#243B5D]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#71839A] mb-1">
                        {isFa ? 'فصلنامه و تاریخ انتشار' : 'Journal & Date'}
                      </label>
                      <input
                        type="text"
                        value={draft.publication.dateJournal.fa}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            publication: {
                              ...prev.publication,
                              dateJournal: { ...prev.publication.dateJournal, fa: e.target.value },
                            },
                          }))
                        }
                        className="w-full neu-recessed px-3 py-1.5 rounded-xl text-xs font-light text-[#243B5D]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#71839A] mb-1">
                        {isFa ? 'نویسندگان و شماره دوره' : 'Authors & Volume'}
                      </label>
                      <input
                        type="text"
                        value={draft.publication.authorsAndCite.fa}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            publication: {
                              ...prev.publication,
                              authorsAndCite: { ...prev.publication.authorsAndCite, fa: e.target.value },
                            },
                          }))
                        }
                        className="w-full neu-recessed px-3 py-1.5 rounded-xl text-xs font-light text-[#243B5D]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: GALLERY & SPACES */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="border-b border-white/60 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-normal text-[#243B5D]">
                    {isFa ? 'نگارخانه فعالیت‌ها و فضاهای یادگیری دبیرستان' : 'Gallery & Educational Activities'}
                  </h2>
                  <p className="text-xs text-[#71839A] font-light mt-0.5">
                    {isFa
                      ? 'تصاویر جلسات مشاوره، شورای معلمان، آزمایشگاه‌ها و فعالیت‌های اجتماعی'
                      : 'Images of counseling sessions, faculty meetings, laboratories, and social impact'}
                  </p>
                </div>
                <button
                  onClick={addGalleryItem}
                  className="neu-button px-3 py-1.5 rounded-xl text-xs font-light flex items-center gap-1.5 text-[#3D5A80] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isFa ? 'افزودن تصویر جدید' : 'Add Photo Card'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {draft.gallery.map((item, idx) => (
                  <div key={item.id} className="p-4 rounded-2xl neu-panel-soft space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#3D5A80]">
                        {isFa ? `تصویر شماره ${idx + 1}` : `Item #${idx + 1}`}
                      </span>
                      <button
                        onClick={() => removeGalleryItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-md cursor-pointer"
                        title="Delete item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="h-28 rounded-xl overflow-hidden neu-recessed relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title.fa}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#71839A] mb-1">{isFa ? 'آدرس تصویر (URL)' : 'Image URL'}</label>
                      <input
                        type="text"
                        value={item.imageUrl}
                        onChange={(e) => updateGalleryImageUrl(idx, e.target.value)}
                        className="w-full neu-recessed px-3 py-1.5 rounded-xl text-xs font-mono font-light text-[#243B5D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#71839A] mb-1">
                        {isFa ? 'آدرس ویدیوی اختیاری (آپارات / یوتیوب / MP4 / خالی)' : 'Optional Video URL (Aparat / YouTube / MP4)'}
                      </label>
                      <input
                        type="text"
                        value={item.videoUrl || ''}
                        placeholder={isFa ? 'اختیاری - در صورت تمایل لینک ویدیو را وارد فرمایید' : 'Optional video URL'}
                        onChange={(e) => updateGalleryVideoUrl(idx, e.target.value)}
                        className="w-full neu-recessed px-3 py-1.5 rounded-xl text-xs font-mono font-light text-[#243B5D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#71839A] mb-1">{isFa ? 'عنوان فعالیت' : 'Title'}</label>
                      <input
                        type="text"
                        value={item.title.fa}
                        onChange={(e) => updateGallery(idx, 'title', 'fa', e.target.value)}
                        className="w-full neu-recessed px-3 py-1.5 rounded-xl text-xs font-light text-[#243B5D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#71839A] mb-1">{isFa ? 'دسته‌بندی' : 'Category'}</label>
                      <input
                        type="text"
                        value={item.category.fa}
                        onChange={(e) => updateGallery(idx, 'category', 'fa', e.target.value)}
                        className="w-full neu-recessed px-3 py-1.5 rounded-xl text-xs font-light text-[#243B5D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#71839A] mb-1">{isFa ? 'توضیحات' : 'Description'}</label>
                      <textarea
                        rows={2}
                        value={item.description.fa}
                        onChange={(e) => updateGallery(idx, 'description', 'fa', e.target.value)}
                        className="w-full neu-recessed px-3 py-1.5 rounded-xl text-xs font-light text-[#243B5D]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: VIDEOS & MEDIA */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
              <div className="border-b border-white/60 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-normal text-[#243B5D]">
                    {isFa ? 'مدیریت ویدیوها و رسانه‌ها (آپارات، یوتیوب، فایل مستقیم و پلی‌هولدر)' : 'Video URLs & Media Management'}
                  </h2>
                  <p className="text-xs text-[#71839A] font-light mt-0.5">
                    {isFa
                      ? 'لینک‌های ویدیوی آپارات، یوتیوب، ویمو، یا فایل‌های مستقیم MP4 را وارد کنید؛ همچنین می‌توانید از پلی‌هولدرها استفاده نمایید.'
                      : 'Configure video URLs from Aparat, YouTube, Vimeo, direct MP4 files, or elegant placeholders.'}
                  </p>
                </div>
                <button
                  onClick={addVideoItem}
                  className="neu-button px-3 py-1.5 rounded-xl text-xs font-light flex items-center gap-1.5 text-[#3D5A80] cursor-pointer shrink-0 self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isFa ? 'افزودن ویدیوی جدید' : 'Add New Video'}</span>
                </button>
              </div>

              {/* Instructions Callout */}
              <div className="p-4 rounded-2xl neu-panel-soft bg-[#E5EEF7]/50 border border-white/80 text-xs text-[#526987] space-y-2">
                <div className="flex items-center gap-2 font-normal text-[#243B5D]">
                  <Tv className="w-4 h-4 text-[#3D5A80]" />
                  <span>{isFa ? 'راهنمای درج لینک و پلی‌هولدر ویدیو:' : 'Video URL & Placeholder Guide:'}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-[11px] font-light leading-relaxed">
                  <li>
                    <strong>{isFa ? 'آپارات (Aparat):' : 'Aparat:'}</strong>{' '}
                    {isFa
                      ? 'لینک صفحه ویدیو در آپارات (مانند: https://www.aparat.com/v/XXXXX) به صورت خودکار به پخش‌کننده تبدیل می‌شود.'
                      : 'Paste any Aparat video page URL; it is automatically parsed into a responsive player.'}
                  </li>
                  <li>
                    <strong>{isFa ? 'یوتیوب (YouTube):' : 'YouTube:'}</strong>{' '}
                    {isFa
                      ? 'لینک‌های یوتیوب (مانند: https://youtube.com/watch?v=XXXXX یا youtu.be/XXXXX) پشتیبانی می‌شوند.'
                      : 'Standard YouTube watch or share URLs are automatically embedded.'}
                  </li>
                  <li>
                    <strong>{isFa ? 'فایل مستقیم (Direct MP4):' : 'Direct MP4:'}</strong>{' '}
                    {isFa
                      ? 'آدرس مستقیم فایل ویدیو با پسوند mp4 یا webm را وارد کنید.'
                      : 'Direct links ending with .mp4 or .webm will use the native HTML5 player.'}
                  </li>
                  <li>
                    <strong>{isFa ? 'پلی‌هولدر (Placeholder):' : 'Placeholder:'}</strong>{' '}
                    {isFa
                      ? 'اگر هنوز ویدیویی آپلود نکرده‌اید، کادر آدرس ویدیو را خالی بگذارید تا پلی‌هولدر تعاملی و شکیل با پوستر انتخابی نمایش داده شود.'
                      : 'Leave URL blank or with placeholder keyword to display the interactive placeholder with poster art.'}
                  </li>
                </ul>
              </div>

              {/* Video Items List */}
              <div className="space-y-6">
                {(draft.videos || []).map((video, idx) => {
                  const parsed = parseVideoUrl(video.videoUrl);
                  const isPreviewing = previewingVideoId === video.id;

                  return (
                    <div key={video.id} className="p-4 sm:p-5 rounded-2xl neu-panel-soft space-y-4">
                      {/* Top Header of the Video Card */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/60">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full neu-dial flex items-center justify-center text-xs font-semibold text-[#3D5A80]">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-normal text-[#243B5D]">
                            {video.title?.fa || (isFa ? `ویدیوی شماره ${idx + 1}` : `Video #${idx + 1}`)}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/70 border border-white/80 text-[#526987] font-light">
                            {parsed.platformName}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* Move Up / Down */}
                          <button
                            onClick={() => moveVideo(idx, 'up')}
                            disabled={idx === 0}
                            className="neu-button p-1.5 rounded-lg text-[#71839A] disabled:opacity-30 cursor-pointer"
                            title={isFa ? 'انتقال به بالا' : 'Move Up'}
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => moveVideo(idx, 'down')}
                            disabled={idx === (draft.videos || []).length - 1}
                            className="neu-button p-1.5 rounded-lg text-[#71839A] disabled:opacity-30 cursor-pointer"
                            title={isFa ? 'انتقال به پایین' : 'Move Down'}
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>

                          {/* Live Preview Toggle */}
                          <button
                            onClick={() => setPreviewingVideoId(isPreviewing ? null : video.id)}
                            className={`neu-button px-2.5 py-1.5 rounded-lg text-xs font-light flex items-center gap-1 cursor-pointer transition-colors ${
                              isPreviewing ? 'text-blue-600 bg-blue-50/50' : 'text-[#3D5A80]'
                            }`}
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>{isPreviewing ? (isFa ? 'بستن پیش‌نمایش' : 'Close Preview') : (isFa ? 'پیش‌نمایش زنده' : 'Live Preview')}</span>
                          </button>

                          {/* Delete Video */}
                          <button
                            onClick={() => removeVideoItem(video.id)}
                            className="text-red-500 hover:text-red-700 p-1.5 rounded-lg cursor-pointer transition-colors"
                            title={isFa ? 'حذف ویدیو' : 'Delete Video'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Live Inline Player Preview if opened */}
                      {isPreviewing && (
                        <div className="p-3 rounded-2xl neu-recessed bg-black/5 space-y-2">
                          <div className="flex items-center justify-between text-[11px] text-[#71839A]">
                            <span>{isFa ? 'پیش‌نمایش نحوه پخش در سایت:' : 'Live Site Player Preview:'}</span>
                            <span className="font-mono text-[10px]">{parsed.platformName}</span>
                          </div>
                          <div className="w-full aspect-video max-w-xl mx-auto rounded-xl overflow-hidden bg-black flex items-center justify-center relative shadow-md">
                            {parsed.type === 'aparat' || parsed.type === 'youtube' || parsed.type === 'vimeo' ? (
                              <iframe
                                src={parsed.embedUrl}
                                title={video.title?.fa || 'Video Preview'}
                                className="w-full h-full border-0"
                                allowFullScreen
                              />
                            ) : parsed.type === 'direct' && !parsed.isPlaceholder ? (
                              <video
                                controls
                                className="w-full h-full object-contain"
                                poster={video.thumbnailUrl}
                                src={parsed.embedUrl}
                              />
                            ) : (
                              <div className="p-6 text-center text-white bg-gradient-to-br from-[#1B3252] to-[#3D5A80] w-full h-full flex flex-col items-center justify-center space-y-2">
                                <Play className="w-8 h-8 opacity-80" />
                                <div className="text-xs font-normal">
                                  {isFa ? 'پلی‌هولدر فعال (آماده دریافت لینک واقعی)' : 'Active Video Placeholder'}
                                </div>
                                <div className="text-[10px] text-white/70 max-w-xs">
                                  {video.videoUrl ? video.videoUrl : (isFa ? 'هنوز لینکی ثبت نشده است' : 'No URL entered')}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Video URL Input & Presets */}
                      <div className="space-y-2">
                        <label className="block text-[11px] font-normal text-[#243B5D]">
                          {isFa ? 'آدرس اینترنتی ویدیو (Video URL):' : 'Video URL:'}
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={video.videoUrl || ''}
                            placeholder={isFa ? 'مثال: https://www.aparat.com/v/XXXXX یا لینک مستقیم MP4 یا خالی بگذارید' : 'e.g. https://www.aparat.com/v/XXXXX or direct MP4 URL'}
                            onChange={(e) => updateVideoSimpleField(idx, 'videoUrl', e.target.value)}
                            className="flex-1 neu-recessed px-3.5 py-2 rounded-xl text-xs font-light text-[#243B5D] font-mono"
                          />
                        </div>

                        {/* Quick Presets for Video URL */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                          <span className="text-[10px] text-[#71839A]">{isFa ? 'نمونه‌های آماده:' : 'Quick Presets:'}</span>
                          <button
                            type="button"
                            onClick={() => updateVideoSimpleField(idx, 'videoUrl', 'https://www.aparat.com/v/sample_homa_documentary')}
                            className="neu-pill px-2.5 py-1 rounded-full text-[10px] text-[#3D5A80] hover:text-[#243B5D] cursor-pointer"
                          >
                            {isFa ? 'نمونه آپارات (Aparat)' : 'Aparat Demo'}
                          </button>
                          <button
                            type="button"
                            onClick={() => updateVideoSimpleField(idx, 'videoUrl', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')}
                            className="neu-pill px-2.5 py-1 rounded-full text-[10px] text-[#3D5A80] hover:text-[#243B5D] cursor-pointer"
                          >
                            {isFa ? 'نمونه MP4 مستقیم' : 'Direct MP4'}
                          </button>
                          <button
                            type="button"
                            onClick={() => updateVideoSimpleField(idx, 'videoUrl', '')}
                            className="neu-pill px-2.5 py-1 rounded-full text-[10px] text-[#71839A] hover:text-[#243B5D] cursor-pointer"
                          >
                            {isFa ? 'حالت پلی‌هولدر (خالی)' : 'Placeholder (Empty)'}
                          </button>
                        </div>
                      </div>

                      {/* Thumbnail URL & Poster Presets */}
                      <div className="space-y-2">
                        <label className="block text-[11px] font-normal text-[#243B5D]">
                          {isFa ? 'تصویر پوستر و پیش‌نمایش (Thumbnail URL):' : 'Thumbnail Poster URL:'}
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3 items-center">
                          <input
                            type="text"
                            value={video.thumbnailUrl || ''}
                            onChange={(e) => updateVideoSimpleField(idx, 'thumbnailUrl', e.target.value)}
                            className="flex-1 w-full neu-recessed px-3.5 py-2 rounded-xl text-xs font-light text-[#243B5D]"
                          />
                          {video.thumbnailUrl && (
                            <div className="w-16 h-10 rounded-lg overflow-hidden shrink-0 border border-white/80 shadow-sm">
                              <img src={video.thumbnailUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>

                        {/* Preset Thumbnail Buttons */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                          <span className="text-[10px] text-[#71839A]">{isFa ? 'پوسترهای پیشنهادی:' : 'Suggested Posters:'}</span>
                          {VIDEO_THUMBNAIL_PRESETS.map((preset, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() => updateVideoSimpleField(idx, 'thumbnailUrl', preset.url)}
                              className="neu-pill px-2.5 py-1 rounded-full text-[10px] text-[#3D5A80] hover:text-[#243B5D] cursor-pointer"
                            >
                              {preset.label[isFa ? 'fa' : 'en']}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Duration & Date */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-[#71839A] mb-1">
                            {isFa ? 'مدت زمان ویدیو (مثال: ۰۵:۴۵)' : 'Duration (e.g. 05:45)'}
                          </label>
                          <input
                            type="text"
                            value={video.duration || ''}
                            onChange={(e) => updateVideoSimpleField(idx, 'duration', e.target.value)}
                            className="w-full neu-recessed px-3.5 py-1.5 rounded-xl text-xs font-light text-[#243B5D]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#71839A] mb-1">
                            {isFa ? 'سال یا تاریخ ثبت (مثال: ۱۴۰۴)' : 'Date or Year (e.g. 2026)'}
                          </label>
                          <input
                            type="text"
                            value={video.date || ''}
                            onChange={(e) => updateVideoSimpleField(idx, 'date', e.target.value)}
                            className="w-full neu-recessed px-3.5 py-1.5 rounded-xl text-xs font-light text-[#243B5D]"
                          />
                        </div>
                      </div>

                      {/* Bilingual Titles */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-[#71839A] mb-1">
                            {isFa ? 'عنوان ویدیو (فارسی)' : 'Video Title (Persian)'}
                          </label>
                          <input
                            type="text"
                            value={video.title?.fa || ''}
                            onChange={(e) => updateVideoField(idx, 'title', 'fa', e.target.value)}
                            className="w-full neu-recessed px-3.5 py-2 rounded-xl text-xs font-light text-[#243B5D]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#71839A] mb-1">
                            {isFa ? 'عنوان ویدیو (انگلیسی)' : 'Video Title (English)'}
                          </label>
                          <input
                            type="text"
                            value={video.title?.en || ''}
                            onChange={(e) => updateVideoField(idx, 'title', 'en', e.target.value)}
                            className="w-full neu-recessed px-3.5 py-2 rounded-xl text-xs font-light text-[#243B5D] text-left ltr"
                          />
                        </div>
                      </div>

                      {/* Bilingual Categories */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-[#71839A] mb-1">
                            {isFa ? 'دسته‌بندی یا موضوع (فارسی)' : 'Category (Persian)'}
                          </label>
                          <input
                            type="text"
                            value={video.category?.fa || ''}
                            onChange={(e) => updateVideoField(idx, 'category', 'fa', e.target.value)}
                            className="w-full neu-recessed px-3.5 py-1.5 rounded-xl text-xs font-light text-[#243B5D]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#71839A] mb-1">
                            {isFa ? 'دسته‌بندی یا موضوع (انگلیسی)' : 'Category (English)'}
                          </label>
                          <input
                            type="text"
                            value={video.category?.en || ''}
                            onChange={(e) => updateVideoField(idx, 'category', 'en', e.target.value)}
                            className="w-full neu-recessed px-3.5 py-1.5 rounded-xl text-xs font-light text-[#243B5D] text-left ltr"
                          />
                        </div>
                      </div>

                      {/* Bilingual Descriptions */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-[#71839A] mb-1">
                            {isFa ? 'شرح و خلاصه محتوا (فارسی)' : 'Summary Description (Persian)'}
                          </label>
                          <textarea
                            rows={2}
                            value={video.description?.fa || ''}
                            onChange={(e) => updateVideoField(idx, 'description', 'fa', e.target.value)}
                            className="w-full neu-recessed px-3.5 py-2 rounded-xl text-xs font-light text-[#243B5D]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#71839A] mb-1">
                            {isFa ? 'شرح و خلاصه محتوا (انگلیسی)' : 'Summary Description (English)'}
                          </label>
                          <textarea
                            rows={2}
                            value={video.description?.en || ''}
                            onChange={(e) => updateVideoField(idx, 'description', 'en', e.target.value)}
                            className="w-full neu-recessed px-3.5 py-2 rounded-xl text-xs font-light text-[#243B5D] text-left ltr"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="border-b border-white/60 pb-3">
                <h2 className="text-base font-normal text-[#243B5D]">
                  {isFa ? 'دیدگاه‌ها و اعتماد متقابل (اولیا، همکاران و مراجع نظارتی)' : 'Testimonials & Mutual Trust'}
                </h2>
                <p className="text-xs text-[#71839A] font-light mt-0.5">
                  {isFa
                    ? 'نظرات اعضای انجمن اولیا و مربیان، دبیران برجسته و بازرسان آموزش و پرورش'
                    : 'Insights from parents, academic faculty, and educational inspectors'}
                </p>
              </div>

              <div className="space-y-4">
                {draft.testimonials.map((testi, idx) => (
                  <div key={testi.id} className="p-4 sm:p-5 rounded-2xl neu-panel-soft space-y-3">
                    <div className="text-xs font-semibold text-[#3D5A80]">
                      {isFa ? `دیدگاه شماره ${idx + 1}` : `Testimonial #${idx + 1}`}
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#71839A] mb-1">
                        {isFa ? 'متن نقل‌قول / دیدگاه (فارسی)' : 'Quote Text (Persian)'}
                      </label>
                      <textarea
                        rows={3}
                        value={testi.quote.fa}
                        onChange={(e) => updateTestimonial(idx, 'quote', 'fa', e.target.value)}
                        className="w-full neu-recessed px-3.5 py-2 rounded-xl text-xs font-light text-[#243B5D]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#71839A] mb-1">{isFa ? 'نام گوینده' : 'Author'}</label>
                        <input
                          type="text"
                          value={testi.author.fa}
                          onChange={(e) => updateTestimonial(idx, 'author', 'fa', e.target.value)}
                          className="w-full neu-recessed px-3 py-1.5 rounded-xl text-xs font-light text-[#243B5D]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#71839A] mb-1">{isFa ? 'سمت یا نقش' : 'Role'}</label>
                        <input
                          type="text"
                          value={testi.role.fa}
                          onChange={(e) => updateTestimonial(idx, 'role', 'fa', e.target.value)}
                          className="w-full neu-recessed px-3 py-1.5 rounded-xl text-xs font-light text-[#243B5D]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#71839A] mb-1">{isFa ? 'مؤسسه یا سازمان' : 'Institution'}</label>
                        <input
                          type="text"
                          value={testi.institution.fa}
                          onChange={(e) => updateTestimonial(idx, 'institution', 'fa', e.target.value)}
                          className="w-full neu-recessed px-3 py-1.5 rounded-xl text-xs font-light text-[#243B5D]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: CONTACT & FOOTER */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="border-b border-white/60 pb-3">
                <h2 className="text-base font-normal text-[#243B5D]">
                  {isFa ? 'اطلاعات تماس و نشانی دبیرستان' : 'Contact Information & School Location'}
                </h2>
                <p className="text-xs text-[#71839A] font-light mt-0.5">
                  {isFa
                    ? 'ایمیل رسمی، وب‌سایت، نشانی دفتر مدیریت و ساعات پاسخگویی'
                    : 'Official email, domain, leadership office address, and hours'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#455A75] mb-1.5">
                    {isFa ? 'پست الکترونیکی رسمی (Email)' : 'Official Email'}
                  </label>
                  <input
                    type="email"
                    value={draft.contact.email}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, email: e.target.value },
                      }))
                    }
                    className="w-full neu-recessed px-3.5 py-2 rounded-xl text-sm font-light text-[#243B5D] font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#455A75] mb-1.5">
                    {isFa ? 'نشانی وب‌سایت رسمی' : 'Official Website'}
                  </label>
                  <input
                    type="text"
                    value={draft.contact.website}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          website: e.target.value,
                          websiteUrl: `https://${e.target.value.replace(/^https?:\/\//, '')}`,
                        },
                      }))
                    }
                    className="w-full neu-recessed px-3.5 py-2 rounded-xl text-sm font-light text-[#243B5D] font-mono text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#455A75] mb-1.5">
                    {isFa ? 'موقعیت و نشانی دفتر (فارسی)' : 'Office Location (Persian)'}
                  </label>
                  <input
                    type="text"
                    value={draft.contact.location.fa}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          location: { ...prev.contact.location, fa: e.target.value },
                        },
                      }))
                    }
                    className="w-full neu-recessed px-3.5 py-2 rounded-xl text-sm font-light text-[#243B5D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#455A75] mb-1.5">
                    {isFa ? 'موقعیت و نشانی دفتر (انگلیسی)' : 'Office Location (English)'}
                  </label>
                  <input
                    type="text"
                    value={draft.contact.location.en}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          location: { ...prev.contact.location, en: e.target.value },
                        },
                      }))
                    }
                    className="w-full neu-recessed px-3.5 py-2 rounded-xl text-sm font-light text-[#243B5D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#455A75] mb-1.5">
                  {isFa ? 'یادداشت ساعات هماهنگی و پاسخگویی' : 'Coordination & Response Note'}
                </label>
                <textarea
                  rows={2}
                  value={draft.contact.officeHoursNote.fa}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      contact: {
                        ...prev.contact,
                        officeHoursNote: { ...prev.contact.officeHoursNote, fa: e.target.value },
                      },
                    }))
                  }
                  className="w-full neu-recessed px-3.5 py-2 rounded-xl text-xs font-light text-[#243B5D]"
                />
              </div>
            </div>
          )}

          {/* TAB 8: SECURITY & PASSWORD CHANGE */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="border-b border-white/60 pb-3">
                <h2 className="text-base font-normal text-[#243B5D]">
                  {isFa ? 'امنیت دسترسی و تغییر رمز عبور' : 'Access Security & Password Management'}
                </h2>
                <p className="text-xs text-[#71839A] font-light mt-0.5">
                  {isFa
                    ? 'تغییر نام کاربری و کلمه عبور مدیر با رمزنگاری پیشرفته یک‌طرفه SHA-256 و محافظت در برابر حمله بروت‌فورس'
                    : 'Change administrator credentials protected with one-way SHA-256 cryptographic hashing and brute-force lockouts'}
                </p>
              </div>

              {/* Status Banner */}
              <div className="neu-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl neu-button flex items-center justify-center text-[#3D5A80] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-light text-[#71839A]">
                      {isFa ? 'وضعیت رمز عبور در مرورگر:' : 'Current Credential Status:'}
                    </div>
                    <div className="text-sm font-normal text-[#243B5D] mt-0.5 flex items-center gap-2">
                      <span>
                        {authStatus.isCustomized
                          ? isFa ? 'رمز عبور سفارشی اختصاصی (فعال)' : 'Custom Encrypted Password (Active)'
                          : isFa ? 'استفاده از مقادیر پیش‌فرض اولیه سیستمی' : 'Default System Credentials'}
                      </span>
                    </div>
                  </div>
                </div>

                {authStatus.isCustomized && (
                  <button
                    onClick={() => {
                      if (window.confirm(isFa ? 'آیا از بازنشانی رمز عبور به حالت پیش‌فرض اولیه اطمینان دارید؟' : 'Reset to default credentials?')) {
                        resetCredentials();
                        setSecuritySuccess(isFa ? 'رمز عبور به حالت پیش‌فرض اولیه بازگردانده شد.' : 'Reset to default credentials.');
                      }
                    }}
                    className="neu-button px-3.5 py-2 rounded-xl text-xs font-light text-amber-700 hover:text-amber-800 cursor-pointer shrink-0"
                  >
                    {isFa ? 'بازنشانی به پیش‌فرض' : 'Reset to Default'}
                  </button>
                )}
              </div>

              {/* Password Change Form */}
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSecurityError(null);
                  setSecuritySuccess(null);

                  if (!newUsernameInput.trim()) {
                    setSecurityError(isFa ? 'لطفاً نام کاربری را وارد فرمایید.' : 'Please enter a username.');
                    return;
                  }
                  if (!newPasswordInput || newPasswordInput.length < 6) {
                    setSecurityError(
                      isFa
                        ? 'کلمه عبور جدید باید حداقل ۶ نویسه (کاراکتر) باشد.'
                        : 'Password must be at least 6 characters.'
                    );
                    return;
                  }
                  if (newPasswordInput !== confirmPasswordInput) {
                    setSecurityError(
                      isFa ? 'تکرار کلمه عبور با کلمه عبور جدید مطابقت ندارد.' : 'Passwords do not match.'
                    );
                    return;
                  }

                  setIsChangingPass(true);
                  try {
                    await changeCredentials(newUsernameInput, newPasswordInput);
                    setIsChangingPass(false);
                    setSecuritySuccess(
                      isFa
                        ? 'نام کاربری و کلمه عبور جدید با موفقیت هش و ذخیره شد! جهت اعمال آن در مخزن گیت‌هاب برای همه دستگاه‌ها، به تب «همگام‌سازی با مخزن گیت‌هاب» مراجعه کرده یا دکمه ارسال را بزنید.'
                        : 'Credentials updated and cryptographically hashed successfully! To push this to GitHub for all devices, use the GitHub Sync tab.'
                    );
                    setNewPasswordInput('');
                    setConfirmPasswordInput('');
                  } catch {
                    setIsChangingPass(false);
                    setSecurityError(isFa ? 'خطا در ثبت اطلاعات' : 'Failed to update credentials');
                  }
                }}
                className="neu-card p-6 space-y-4"
              >
                <h3 className="text-sm font-normal text-[#243B5D] flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#3D5A80]" />
                  <span>{isFa ? 'تعریف نام کاربری و کلمه عبور جدید' : 'Set New Username & Password'}</span>
                </h3>

                {securityError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-xs font-light flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{securityError}</span>
                  </div>
                )}

                {securitySuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-light flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{securitySuccess}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-light text-[#71839A] block">
                      {isFa ? 'نام کاربری جدید' : 'New Username'}
                    </label>
                    <input
                      type="text"
                      required
                      value={newUsernameInput}
                      onChange={(e) => setNewUsernameInput(e.target.value)}
                      dir="ltr"
                      placeholder="e.g. hosna_admin"
                      className="w-full neu-recessed px-3.5 py-2.5 rounded-xl text-xs font-mono text-[#243B5D]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-light text-[#71839A] block">
                      {isFa ? 'کلمه عبور جدید' : 'New Password'}
                    </label>
                    <input
                      type="password"
                      required
                      value={newPasswordInput}
                      onChange={(e) => setNewPasswordInput(e.target.value)}
                      dir="ltr"
                      placeholder="••••••••"
                      className="w-full neu-recessed px-3.5 py-2.5 rounded-xl text-xs font-mono text-[#243B5D]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-light text-[#71839A] block">
                      {isFa ? 'تکرار کلمه عبور جدید' : 'Confirm Password'}
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPasswordInput}
                      onChange={(e) => setConfirmPasswordInput(e.target.value)}
                      dir="ltr"
                      placeholder="••••••••"
                      className="w-full neu-recessed px-3.5 py-2.5 rounded-xl text-xs font-mono text-[#243B5D]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isChangingPass}
                    className="neu-button-primary px-6 py-2.5 rounded-xl text-xs font-light flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>
                      {isChangingPass
                        ? isFa ? 'در حال رمزنگاری و ثبت...' : 'Hashing & Saving...'
                        : isFa ? 'ثبت و رمزنگاری کلمه عبور' : 'Save & Encrypt Password'}
                    </span>
                  </button>
                </div>
              </form>

              {/* Security Advisory for GitHub Push */}
              <div className="neu-panel-soft p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-normal text-[#243B5D]">
                  <ShieldCheck className="w-4 h-4 text-[#3D5A80]" />
                  <span>
                    {isFa ? 'توضیحات امنیتی جهت انتشار در گیت‌هاب (GitHub):' : 'Security Guide for GitHub:'}
                  </span>
                </div>
                <div className="text-xs font-light text-[#71839A] leading-relaxed space-y-2">
                  <p>
                    {isFa
                      ? '۱. در صورت عمومی (Public) بودن مخزن گیت‌هاب، هر رشته یا متنی که داخل کدهای منبع به صورت خام نوشته شود، برای عموم قابل مشاهده است. به همین علت سیستم ما از الگوریتم هش SHA-256 به همراه Salt استفاده می‌کند تا کلمه عبور به صورت خام در کدها نباشد.'
                      : '1. If your GitHub repository is public, plaintext strings in source code can be read by anyone. That is why our app uses salted SHA-256 hashing so plaintext passwords never exist in source.'}
                  </p>
                  <p>
                    {isFa
                      ? '۲. سیستم همچنین مجهز به مکانیزم قفل خودکار پس از ۵ تلاش ناموفق (Brute-force Throttling) است تا امکان حدس خودکار رمز وجود نداشته باشد.'
                      : '2. The login interface is protected against brute-force attacks with an automatic 15-minute lockout after 5 consecutive failures.'}
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#3D5A80]/10 border border-[#3D5A80]/20">
                    <p className="text-xs text-[#243B5D]">
                      {isFa
                        ? '۳. برای اینکه رمز عبور جدید یا تغییرات متون در مخزن گیت‌هاب ثبت شده و روی همه گوشی‌ها و کامپیوترها فعال شود:'
                        : '3. To commit this new password or site changes into GitHub so they work across all devices:'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('export')}
                      className="px-3.5 py-1.5 rounded-lg bg-[#243B5D] text-white text-xs font-normal hover:bg-[#1A2C46] flex items-center gap-1.5 cursor-pointer shrink-0 shadow-sm"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>{isFa ? 'رفتن به همگام‌سازی با گیت‌هاب' : 'Go to GitHub Sync'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: GITHUB SYNC & EXPORT */}
          {activeTab === 'export' && (
            <div className="space-y-6">
              <div className="border-b border-white/60 pb-3">
                <div className="flex items-center gap-2 text-base font-normal text-[#243B5D]">
                  <GitBranch className="w-5 h-5 text-[#3D5A80]" />
                  <h2>{isFa ? 'همگام‌سازی مستقیم با مخزن گیت‌هاب (GitHub)' : 'GitHub Repository Sync & Live Deployment'}</h2>
                </div>
                <p className="text-xs text-[#71839A] font-light mt-1 leading-relaxed">
                  {isFa
                    ? 'از آنجایی که سایت روی گیت‌هاب پیجز (GitHub Pages) مستقر است، برای آنکه تغییرات متن‌ها، مشخصات و رمز عبور روی تمام رایانه‌ها، موبایل‌ها و برای همه بازدیدکنندگان اعمال شود، باید تغییرات در مخزن گیت‌هاب ثبت گردند.'
                    : 'Because the site runs on GitHub Pages, changes must be committed to your repository so visitors on all devices see your latest updates.'}
                </p>
              </div>

              {/* SECTION 1: ONE-CLICK AUTOMATIC SYNC */}
              <div className="neu-card p-6 space-y-5 border border-white/80">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl neu-dial flex items-center justify-center text-[#3D5A80]">
                      <UploadCloud className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-[#243B5D]">
                        {isFa ? 'روش اول: ارسال و انتشار خودکار با یک کلیک (توصیه شده)' : 'Method 1: One-Click Direct Repository Push (Recommended)'}
                      </h3>
                      <p className="text-[11px] text-[#71839A] font-light">
                        {isFa
                          ? 'تغییرات مستقیماً در مخزن گیت‌هاب شما کامیت شده و سایت douzandeh.ir ظرف چند ثانیه خودکار بازسازی می‌شود'
                          : 'Pushes code directly via GitHub API and triggers automatic rebuild on douzandeh.ir'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Repository Configuration */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#455A75] mb-1">
                      {isFa ? 'نام کاربری گیت‌هاب (Owner)' : 'GitHub Owner'}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={githubConfig.owner}
                      onChange={(e) => updateGithubField('owner', e.target.value)}
                      placeholder="MAJN35"
                      className="w-full neu-recessed px-3 py-2 rounded-xl text-xs font-mono text-[#243B5D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#455A75] mb-1">
                      {isFa ? 'نام مخزن (Repository)' : 'Repository Name'}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={githubConfig.repo}
                      onChange={(e) => updateGithubField('repo', e.target.value)}
                      placeholder="HosnaDoozandeh"
                      className="w-full neu-recessed px-3 py-2 rounded-xl text-xs font-mono text-[#243B5D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#455A75] mb-1">
                      {isFa ? 'شاخه هدف (Branch)' : 'Target Branch'}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={githubConfig.branch}
                      onChange={(e) => updateGithubField('branch', e.target.value)}
                      placeholder="main"
                      className="w-full neu-recessed px-3 py-2 rounded-xl text-xs font-mono text-[#243B5D]"
                    />
                  </div>
                </div>

                {/* GitHub Personal Access Token (PAT) Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-medium text-[#455A75] flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-[#3D5A80]" />
                      <span>{isFa ? 'توکن شخصی دسترسی گیت‌هاب (Personal Access Token - PAT)' : 'GitHub Personal Access Token'}</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowTokenGuide(!showTokenGuide)}
                      className="text-[11px] text-[#3D5A80] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <HelpCircle className="w-3 h-3" />
                      <span>{isFa ? 'چگونه توکن بسازم؟ (راهنما)' : 'How to get a token?'}</span>
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={showToken ? 'text' : 'password'}
                      dir="ltr"
                      value={githubConfig.token}
                      onChange={(e) => updateGithubField('token', e.target.value)}
                      placeholder="ghp_... یا github_pat_..."
                      className="w-full neu-recessed pl-3 pr-20 py-2.5 rounded-xl text-xs font-mono text-[#243B5D]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowToken(!showToken)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-light text-[#526987] hover:text-[#243B5D] px-2 py-1 rounded neu-button cursor-pointer"
                    >
                      {showToken ? (isFa ? 'مخفی' : 'Hide') : (isFa ? 'نمایش' : 'Show')}
                    </button>
                  </div>

                  <p className="text-[10px] text-[#71839A] font-light">
                    {isFa
                      ? '🔒 امنیت شما: توکن تنها در حافظه مرورگر شخصی شما (Local Storage) نگهداری شده و هرگز به سرور دیگری ارسال نمی‌شود؛ بلکه مستقیماً به API رسمی GitHub متصل می‌گردد.'
                      : '🔒 Security: Token is stored solely in your browser local storage and communicated strictly with api.github.com.'}
                  </p>
                </div>

                {/* Collapsible Token Creation Guide */}
                {showTokenGuide && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 rounded-2xl bg-[#E2ECF7]/80 border border-white space-y-2.5 text-xs text-[#354D6D] font-light"
                  >
                    <div className="font-medium text-[#243B5D] flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-[#3D5A80]" />
                      <span>{isFa ? 'راهنمای ساخت توکن شخصی گیت‌هاب در ۴ گام ساده:' : 'How to generate a GitHub Token in 4 steps:'}</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-1.5 leading-relaxed text-[11px]">
                      <li>
                        {isFa ? 'وارد حساب گیت‌هاب خود شده و صفحه ساخت توکن را باز کنید:' : 'Open GitHub tokens page:'}{' '}
                        <a
                          href="https://github.com/settings/tokens?type=beta"
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-[#1E3A8A] underline inline-flex items-center gap-0.5"
                        >
                          github.com/settings/tokens
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </li>
                      <li>
                        {isFa
                          ? 'روی دکمه Generate new token کلیک کنید و نامی مانند douzandeh-site برای آن بگذارید.'
                          : 'Click "Generate new token" and name it e.g. douzandeh-site.'}
                      </li>
                      <li>
                        {isFa
                          ? 'در بخش Repository access مخزن HosnaDoozandeh را انتخاب نموده و در بخش Permissions، گزینه Contents را روی Read and write بگذارید.'
                          : 'Under Repository access select HosnaDoozandeh, and set Permissions > Contents to Read and write.'}
                      </li>
                      <li>
                        {isFa
                          ? 'دکمه Generate token را بزنید و توکن ساخته‌شده را کپی نموده و در کادر بالا قرار دهید.'
                          : 'Click Generate token, copy the token and paste it in the box above.'}
                      </li>
                    </ol>
                  </motion.div>
                )}

                {/* Action Trigger Button */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleSyncToGitHub}
                    disabled={isSyncingGitHub}
                    className="neu-button-primary px-6 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    {isSyncingGitHub ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>{isFa ? 'در حال ثبت و ارسال به گیت‌هاب...' : 'Pushing to GitHub...'}</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-4 h-4" />
                        <span>{isFa ? 'ارسال و همگام‌سازی مستقیم با مخزن گیت‌هاب' : 'Sync & Push to GitHub Repository'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Live Sync Progress / Status Card */}
                {syncProgress && (
                  <div
                    className={`p-4 rounded-2xl border text-xs leading-relaxed transition-all ${
                      syncProgress.step === 'success'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800'
                        : syncProgress.step === 'error'
                        ? 'bg-red-500/10 border-red-500/30 text-red-800'
                        : 'bg-blue-500/10 border-blue-500/30 text-blue-800'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {syncProgress.step === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : syncProgress.step === 'error' ? (
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      ) : (
                        <Loader2 className="w-5 h-5 text-blue-600 animate-spin shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-2 flex-1">
                        <p className="font-medium">{syncProgress.message}</p>

                        {syncProgress.step === 'success' && (
                          <div className="pt-2 flex flex-wrap items-center gap-3">
                            {syncProgress.commitUrl && (
                              <a
                                href={syncProgress.commitUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-[11px] font-light flex items-center gap-1.5 hover:bg-emerald-700 shadow-sm"
                              >
                                <GitCommit className="w-3.5 h-3.5" />
                                <span>{isFa ? 'مشاهده کامیت در گیت‌هاب' : 'View Commit on GitHub'}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {syncProgress.actionsUrl && (
                              <a
                                href={syncProgress.actionsUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 rounded-xl bg-white/90 text-[#243B5D] text-[11px] font-light flex items-center gap-1.5 hover:bg-white shadow-sm border border-emerald-600/30"
                              >
                                <RefreshCw className="w-3.5 h-3.5 text-[#3D5A80]" />
                                <span>{isFa ? 'مشاهده پیشرفت استقرار در GitHub Actions' : 'View GitHub Actions Build'}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 2: MANUAL EXPORT AS CODE FILES */}
              <div className="neu-card p-6 space-y-4 border border-white/80">
                <div className="flex items-center gap-2 text-sm font-normal text-[#243B5D]">
                  <FileCode className="w-4 h-4 text-[#3D5A80]" />
                  <h3>{isFa ? 'روش دوم: دانلود دستی فایل‌های کد' : 'Method 2: Manual Code File Download'}</h3>
                </div>
                <p className="text-xs text-[#71839A] font-light leading-relaxed">
                  {isFa
                    ? 'در صورتی که ترجیح می‌دهید فایل‌ها را با دستورات Git در ترمینال سیستم خود ثبت کنید، فایل‌های زیر را دانلود و در پوشه پروژه جایگزین نمایید:'
                    : 'If you prefer pushing via Git terminal on your machine, download these files and replace them in your project directory:'}
                </p>

                {/* Manual Download Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() => {
                      const code = generateDefaultSiteContentCode(draft);
                      const blob = new Blob([code], { type: 'text/typescript;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'defaultSiteContent.ts';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    className="neu-button px-4 py-2 rounded-xl text-xs font-normal text-[#243B5D] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#3D5A80]" />
                    <span>{isFa ? 'دانلود defaultSiteContent.ts' : 'Download defaultSiteContent.ts'}</span>
                  </button>

                  <button
                    onClick={() => {
                      const code = generateDefaultSiteContentCode(draft);
                      navigator.clipboard.writeText(code);
                      setCopiedExport(true);
                      setTimeout(() => setCopiedExport(false), 2500);
                    }}
                    className="neu-button px-4 py-2 rounded-xl text-xs font-normal text-[#243B5D] flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedExport ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#71839A]" />}
                    <span>{copiedExport ? (isFa ? 'کپی شد!' : 'Copied!') : isFa ? 'کپی کد محتوا' : 'Copy Content Code'}</span>
                  </button>

                  <button
                    onClick={() => {
                      const authConf = getStoredAuthConfig();
                      const code = generateAuthConfigCode(authConf);
                      const blob = new Blob([code], { type: 'text/typescript;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'authConfig.ts';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    className="neu-button px-4 py-2 rounded-xl text-xs font-normal text-[#243B5D] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#3D5A80]" />
                    <span>{isFa ? 'دانلود authConfig.ts (رمز عبور)' : 'Download authConfig.ts (Pass)'}</span>
                  </button>

                  <button
                    onClick={() => {
                      const authConf = getStoredAuthConfig();
                      const code = generateAuthConfigCode(authConf);
                      navigator.clipboard.writeText(code);
                      setCopiedAuthConfig(true);
                      setTimeout(() => setCopiedAuthConfig(false), 2500);
                    }}
                    className="neu-button px-4 py-2 rounded-xl text-xs font-normal text-[#243B5D] flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedAuthConfig ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#71839A]" />}
                    <span>{copiedAuthConfig ? (isFa ? 'کپی شد!' : 'Copied!') : isFa ? 'کپی کد احراز هویت' : 'Copy Auth Code'}</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-black/5 font-mono text-[11px] text-[#243B5D] leading-relaxed ltr text-left">
                  git add src/data/defaultSiteContent.ts src/data/authConfig.ts<br />
                  git commit -m "chore: update site content and credentials"<br />
                  git push origin main
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Bottom Action Bar */}
        <div className="fixed bottom-4 inset-x-4 max-w-2xl mx-auto z-40">
          <div className="neu-panel p-3 px-5 flex items-center justify-between gap-3 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="neu-button px-3 py-2 rounded-xl text-xs font-light text-[#71839A] hover:text-red-600 flex items-center gap-1.5 cursor-pointer"
                title="Revert to original state"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isFa ? 'بازنشانی به پیش‌فرض' : 'Reset Defaults'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onBackToSite}
                className="neu-button px-3.5 py-2 rounded-xl text-xs font-light text-[#243B5D] flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isFa ? 'پیش‌نمایش سایت' : 'Preview Site'}</span>
              </button>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="neu-button px-4 py-2 rounded-xl text-xs font-light text-[#243B5D] flex items-center gap-1.5 cursor-pointer"
                title={isFa ? 'ذخیره در مرورگر این سیستم' : 'Save locally in this browser'}
              >
                <Save className="w-3.5 h-3.5 text-[#3D5A80]" />
                <span className="font-normal">
                  {isSaving ? (isFa ? 'در حال ذخیره...' : 'Saving...') : isFa ? 'ذخیره محلی' : 'Save Local'}
                </span>
              </button>

              <button
                onClick={handleSyncToGitHub}
                disabled={isSyncingGitHub}
                className="neu-button-primary px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-md"
                title={isFa ? 'ارسال و استقرار زنده در مخزن گیت‌هاب' : 'Push to GitHub Repository for all visitors'}
              >
                {isSyncingGitHub ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                ) : (
                  <GitBranch className="w-3.5 h-3.5 text-white" />
                )}
                <span>
                  {isSyncingGitHub
                    ? (isFa ? 'در حال ارسال...' : 'Syncing...')
                    : (isFa ? 'ارسال به مخزن گیت‌هاب' : 'Push to GitHub')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
