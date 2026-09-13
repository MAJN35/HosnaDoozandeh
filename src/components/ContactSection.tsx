import React, { useState } from 'react';
import { Language } from '../types';
import { personalInfo } from '../data/cvData';
import { SkeuButton } from './SkeuButton';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  MessageSquare,
  Clock,
  Building2,
  Sparkles,
} from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const isFa = lang === 'fa';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    // Simulate swift modern processing
    setTimeout(() => {
      setStatus('success');
    }, 800);
  };

  const handleSendViaEmailClient = () => {
    const mailtoUrl = `mailto:${personalInfo.contact.email}?subject=${encodeURIComponent(
      formData.subject || 'Inquiry from Portfolio'
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nOrganization: ${formData.organization}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100/70 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{isFa ? 'ارتباط و همکاری' : 'Get in Touch'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isFa ? 'تماس با حسنا دوزنده' : 'Contact & Professional Networking'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-1">
            {isFa
              ? 'جهت مشاوره امور آموزشی و روان‌سنجی، همکاری‌های سازمانی یا ارسال پیام مستقیم از طریق فرم یا راه‌های ارتباطی زیر اقدام نمایید.'
              : 'For educational advisory, psychometric consultations, institutional partnerships, or direct inquiries.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Contact Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Direct Email Card */}
            <div className="skeu-card p-5 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200/80 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {isFa ? 'پست الکترونیکی رسمی' : 'Official Email Address'}
                  </span>
                  <a
                    href={`mailto:${personalInfo.contact.email}`}
                    className="block text-sm font-bold text-slate-900 hover:text-blue-700 transition-colors"
                  >
                    {personalInfo.contact.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(personalInfo.contact.email)}
                className="skeu-button-secondary p-2 rounded-xl text-slate-600 cursor-pointer"
                title={isFa ? 'کپی ایمیل' : 'Copy Email'}
                id="copy-email-btn"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location Card */}
            <div className="skeu-card p-5 rounded-2xl flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200/80 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {isFa ? 'موقعیت اداری و منطقه فعالیت' : 'Administrative Location'}
                </span>
                <p className="text-sm font-bold text-slate-900">
                  {personalInfo.contact.location[lang]}
                </p>
                <p className="text-xs text-slate-500">
                  {isFa ? 'آموزش و پرورش منطقه ۵ تهران | مجتمع آموزشی هما' : 'District 5 Education Administration | Homa Complex'}
                </p>
              </div>
            </div>

            {/* Consultation & Advisory Card */}
            <div className="skeu-card p-6 rounded-2xl space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>{isFa ? 'حوزه‌های مشاوره و ارزیابی سازمانی' : 'Areas of Consultation'}</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>
                    {isFa
                      ? 'تأسیس، توسعه ساختار و اخذ مجوزهای مدارس و مراکز آموزشی'
                      : 'School founding, campus expansion & educational regulatory compliance'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>
                    {isFa
                      ? 'طراحی آزمون‌های روان‌سنجی ورودی، سنجش استعداد و سلامت روانی'
                      : 'Psychometric entrance batteries, talent diagnostics & mental well-being'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>
                    {isFa
                      ? 'تدوین برنامه سالانه عملیاتی (OP) و ارزیابی KPI کادر آموزشی'
                      : 'Operational planning (OP) & institutional teacher KPI monitoring'}
                  </span>
                </li>
              </ul>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {isFa
                    ? 'پاسخ‌گویی به مکاتبات در روزهای کاری اداری'
                    : 'Responses provided within normal business days'}
                </span>
              </div>
            </div>

          </div>

          {/* Interactive Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="skeu-card p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm relative">
              
              {status === 'success' ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    {isFa ? 'پیام شما با موفقیت ثبت شد' : 'Message Received Successfully'}
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    {isFa
                      ? 'از برقراری ارتباط شما سپاسگزاریم. پیام شما دریافت شد و در اسرع وقت بررسی خواهد شد.'
                      : 'Thank you for reaching out. Your inquiry has been noted and will be reviewed shortly.'}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                    <SkeuButton
                      variant="primary"
                      size="md"
                      onClick={handleSendViaEmailClient}
                    >
                      {isFa ? 'ارسال رونوشت از طریق ایمیل شما' : 'Send via Local Mail Client'}
                    </SkeuButton>
                    <SkeuButton
                      variant="secondary"
                      size="md"
                      onClick={() => {
                        setStatus('idle');
                        setFormData({ name: '', email: '', organization: '', subject: '', message: '' });
                      }}
                    >
                      {isFa ? 'ارسال پیام جدید' : 'Send Another Message'}
                    </SkeuButton>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="contact-name">
                        {isFa ? 'نام و نام خانوادگی *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isFa ? 'مثال: دکتر سمیعی' : 'e.g., Dr. Samiei'}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 transition-colors shadow-inner"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="contact-email">
                        {isFa ? 'آدرس ایمیل *' : 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 transition-colors shadow-inner"
                        dir="ltr"
                      />
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Organization / Affiliation */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="contact-org">
                        {isFa ? 'سازمان / مدرسه / دانشگاه' : 'Organization / Institution'}
                      </label>
                      <input
                        type="text"
                        id="contact-org"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder={isFa ? 'نام مجموعه' : 'Institution name'}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 transition-colors shadow-inner"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="contact-subject">
                        {isFa ? 'موضوع پیام' : 'Subject'}
                      </label>
                      <input
                        type="text"
                        id="contact-subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={isFa ? 'همکاری آموزشی / مشاوره' : 'Educational Consultation'}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 transition-colors shadow-inner"
                      />
                    </div>

                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="contact-message">
                      {isFa ? 'متن پیام *' : 'Your Message *'}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        isFa
                          ? 'شرح درخواست یا پیام خود را اینجا بنویسید...'
                          : 'Please describe your inquiry or proposal...'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 transition-colors shadow-inner resize-y"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-xs font-bold text-rose-600">
                      {isFa ? 'لطفاً تمامی فیلدهای ستاره‌دار را تکمیل نمایید.' : 'Please fill in all required fields.'}
                    </p>
                  )}

                  {/* Submit and Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
                    <SkeuButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      icon={<Send className="w-4 h-4" />}
                      disabled={status === 'submitting'}
                      id="submit-contact-form-btn"
                    >
                      {status === 'submitting'
                        ? (isFa ? 'در حال ارسال...' : 'Sending...')
                        : (isFa ? 'ارسال پیام' : 'Send Message')}
                    </SkeuButton>

                    <button
                      type="button"
                      onClick={handleSendViaEmailClient}
                      className="text-xs font-semibold text-slate-600 hover:text-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                      <span>{isFa ? 'ارسال مستقیم با نرم‌افزار ایمیل' : 'Open in Default Mail Client'}</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
