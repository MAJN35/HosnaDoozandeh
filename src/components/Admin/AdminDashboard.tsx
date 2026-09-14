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
} from 'lucide-react';
import { useSiteContent } from '../../context/ContentContext';
import { Language, SiteContent, ExperienceItem, GalleryItemContent, TestimonialItemContent } from '../../types';

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

  const isFa = lang === 'fa';

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
    { id: 'testimonials', label: { fa: 'دیدگاه‌ها و اولیا', en: 'Testimonials' }, icon: MessageSquareQuote },
    { id: 'contact', label: { fa: 'اطلاعات تماس', en: 'Contact Details' }, icon: Mail },
    { id: 'security', label: { fa: 'امنیت و تغییر رمز', en: 'Security & Password' }, icon: KeyRound },
    { id: 'export', label: { fa: 'خروجی گیت‌هاب', en: 'Export for GitHub' }, icon: FileCode },
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
              <span>{isSaving ? (isFa ? 'در حال ذخیره...' : 'Saving...') : isFa ? 'ذخیره تغییرات' : 'Save Changes'}</span>
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

        {/* Tab Selection Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-normal shrink-0 flex items-center gap-2 cursor-pointer transition-all ${
                  isActive
                    ? 'neu-button-primary text-white font-medium shadow-md'
                    : 'neu-button text-[#526987] hover:text-[#243B5D]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label[lang]}</span>
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
                          : isFa ? 'استفاده از مقادیر پیش‌فرض اولیه (admin / homa1404)' : 'Default Initial Credentials (admin / homa1404)'}
                      </span>
                    </div>
                  </div>
                </div>

                {authStatus.isCustomized && (
                  <button
                    onClick={() => {
                      if (window.confirm(isFa ? 'رمز عبور به مقادیر اولیه (admin / homa1404) بازگردد؟' : 'Reset to default?')) {
                        resetCredentials();
                        setSecuritySuccess(isFa ? 'رمز عبور به حالت پیش‌فرض بازگردانده شد.' : 'Reset to default credentials.');
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
                        ? 'نام کاربری و کلمه عبور جدید با موفقیت هش و ذخیره شد! از این پس با این مشخصات وارد شوید.'
                        : 'Credentials updated and cryptographically hashed successfully!'
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
                  <p>
                    {isFa
                      ? '۳. توجه فرمایید: تغییراتی که از طریق این پنل ایجاد می‌کنید در حافظه مرورگر ذخیره می‌شود. برای اینکه تغییرات به صورت دائمی برای همه بازدیدکنندگان وب‌سایت در گیت‌هاب اعمال شود، از تب «خروجی گیت‌هاب» فایل داده‌ها را دانلود و در پوشه پروژه ذخیره نمایید.'
                      : '3. Edits saved via this panel persist in browser storage. To make changes live for ALL visitors worldwide on GitHub, use the "Export for GitHub" tab to download and commit the updated file.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: EXPORT FOR GITHUB */}
          {activeTab === 'export' && (
            <div className="space-y-6">
              <div className="border-b border-white/60 pb-3">
                <h2 className="text-base font-normal text-[#243B5D]">
                  {isFa ? 'خروجی کد و انتشار دائمی در گیت‌هاب' : 'Export Code for GitHub Deployment'}
                </h2>
                <p className="text-xs text-[#71839A] font-light mt-0.5">
                  {isFa
                    ? 'دانلود مستقیم فایل داده‌های ویرایش‌شده برای قرار دادن در مخزن گیت‌هاب و نمایش همگانی به همه بازدیدکنندگان'
                    : 'Download or copy the modified content file to commit into your GitHub repository for global visitors'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    const code = `import { SiteContent } from '../types';\nimport { personalInfo, experiences } from './cvData';\n\nexport const defaultSiteContent: SiteContent = ${JSON.stringify(
                      draft,
                      null,
                      2
                    )};\n`;
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
                  className="neu-button-primary px-5 py-2.5 rounded-xl text-xs font-light flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>{isFa ? 'دانلود فایل defaultSiteContent.ts' : 'Download defaultSiteContent.ts'}</span>
                </button>

                <button
                  onClick={() => {
                    const code = `import { SiteContent } from '../types';\nimport { personalInfo, experiences } from './cvData';\n\nexport const defaultSiteContent: SiteContent = ${JSON.stringify(
                      draft,
                      null,
                      2
                    )};\n`;
                    navigator.clipboard.writeText(code);
                    setCopiedExport(true);
                    setTimeout(() => setCopiedExport(false), 2500);
                  }}
                  className="neu-button px-5 py-2.5 rounded-xl text-xs font-normal text-[#243B5D] flex items-center gap-2 cursor-pointer"
                >
                  {copiedExport ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#71839A]" />}
                  <span>{copiedExport ? (isFa ? 'کد کپی شد!' : 'Code Copied!') : isFa ? 'کپی تمام کد' : 'Copy All Code'}</span>
                </button>
              </div>

              {/* Instructions */}
              <div className="neu-panel-soft p-5 space-y-3">
                <div className="text-xs font-normal text-[#243B5D] flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-[#3D5A80]" />
                  <span>{isFa ? 'راهنمای ۳ مرحله‌ای انتشار در گیت‌هاب:' : '3-Step GitHub Deployment Guide:'}</span>
                </div>
                <ol className="text-xs font-light text-[#71839A] leading-relaxed space-y-2 list-decimal list-inside">
                  <li>
                    {isFa
                      ? 'دکمه «دانلود فایل defaultSiteContent.ts» را در بالا بزنید.'
                      : 'Click "Download defaultSiteContent.ts" above.'}
                  </li>
                  <li>
                    {isFa
                      ? 'فایل دانلود شده را در پروژه خود در مسیر src/data/defaultSiteContent.ts جایگزین نمایید.'
                      : 'Replace the existing file in your repository at src/data/defaultSiteContent.ts.'}
                  </li>
                  <li>
                    {isFa
                      ? 'تغییرات را با دستورات git add . و git commit و git push به مخزن گیت‌هاب خود ارسال کنید تا همه کاربران زنده تغییرات شما را مشاهده نمایند.'
                      : 'Commit and push to GitHub (git add . && git commit -m "Update site content" && git push). All visitors will see your changes!'}
                  </li>
                </ol>
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
                <span>{isFa ? 'مشاهده پیش‌نمایش سایت' : 'Preview Site'}</span>
              </button>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="neu-button-primary px-5 py-2 rounded-xl text-xs font-light flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Save className="w-4 h-4" />
                <span className="font-medium">
                  {isSaving ? (isFa ? 'در حال ذخیره‌سازی...' : 'Saving...') : isFa ? 'ذخیره نهایی تغییرات' : 'Save All Changes'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
