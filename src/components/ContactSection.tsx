import React, { useState } from 'react';
import { Language } from '../types';
import { personalInfo } from '../data/cvData';
import { Mail, MapPin, Globe, Send, CheckCircle2, Copy, Check } from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const isFa = lang === 'fa';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 700);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Large Floating Contact Panel */}
      <div className="neu-panel p-8 sm:p-12 lg:p-16">
        
        {/* Header Content */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16 space-y-3">
          <div className="neu-pill px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-xs font-normal text-[#71839A]">
            <span className="w-2 h-2 rounded-full bg-[#8FA8C8]" />
            <span>{isFa ? 'ارتباط مستقیم' : 'Direct Communication'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#243B5D] tracking-tight">
            {isFa ? 'در ارتباط باشیم' : 'Let’s Connect'}
          </h2>

          <p className="text-sm sm:text-base font-light text-[#71839A] leading-relaxed">
            {isFa
              ? 'برای گفت‌وگو درباره آموزش، مدیریت مدرسه و آینده نسل جدید، خوشحال می‌شوم در ارتباط باشیم.'
              : 'For conversations regarding education, school leadership, and nurturing the next generation, I would be glad to connect.'}
          </p>
        </div>

        {/* Contact Grid: Form + Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Recessed Neumorphic Form Controls (7 cols) */}
          <div className="lg:col-span-7">
            {status === 'success' ? (
              <div className="neu-card p-8 sm:p-10 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-14 h-14 rounded-full neu-button flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-normal text-[#243B5D]">
                  {isFa ? 'پیام شما با موفقیت ثبت شد' : 'Message Sent Successfully'}
                </h3>
                <p className="text-xs sm:text-sm font-light text-[#71839A] max-w-md">
                  {isFa
                    ? 'سپاس از پیام شما. در اسرع وقت پاسخگوی شما از طریق ایمیل خواهم بود.'
                    : 'Thank you for reaching out. I will respond to your inquiry via email shortly.'}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="neu-button px-6 py-2.5 rounded-full text-xs font-normal text-[#243B5D] mt-2 cursor-pointer"
                >
                  {isFa ? 'ارسال پیام جدید' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-light text-[#71839A] block">
                      {isFa ? 'نام و نام خانوادگی' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isFa ? 'مثال: زهرا مرادی' : 'e.g. Zahra Moradi'}
                      className="w-full px-4 py-3 rounded-2xl neu-recessed text-sm font-light placeholder:text-[#71839A]/40 transition-all duration-200"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-light text-[#71839A] block">
                      {isFa ? 'پست الکترونیکی' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      required
                      dir="ltr"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.name@example.com"
                      className="w-full px-4 py-3 rounded-2xl neu-recessed text-sm font-light placeholder:text-[#71839A]/40 transition-all duration-200"
                    />
                  </div>

                </div>

                {/* Subject / Topic Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-light text-[#71839A] block">
                    {isFa ? 'موضوع گفت‌وگو' : 'Subject of Conversation'}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={
                      isFa
                        ? 'راهبری مدرسه، سنجش و هدایت تحصیلی، جلسات اولیا...'
                        : 'School Governance, Psychometrics & Guidance...'
                    }
                    className="w-full px-4 py-3 rounded-2xl neu-recessed text-sm font-light placeholder:text-[#71839A]/40 transition-all duration-200"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-light text-[#71839A] block">
                    {isFa ? 'متن پیام' : 'Your Message'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      isFa
                        ? 'دیدگاه، پرسش یا پیشنهاد همکاری خود را بنویسید...'
                        : 'Write your perspective, inquiry, or collaboration proposal...'
                    }
                    className="w-full px-4 py-3 rounded-2xl neu-recessed text-sm font-light placeholder:text-[#71839A]/40 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Raised Physical Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="neu-button-primary px-8 py-3.5 rounded-full text-sm font-light inline-flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4 opacity-90" />
                    <span>
                      {status === 'submitting'
                        ? isFa ? 'در حال ثبت...' : 'Sending...'
                        : isFa ? 'ارسال پیام' : 'Send Message'}
                    </span>
                  </button>
                </div>

              </form>
            )}
          </div>

          {/* Contact Direct Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            
            {/* Email Card */}
            <div className="neu-card p-6 flex items-start justify-between group">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl neu-button flex items-center justify-center text-[#243B5D] shrink-0">
                  <Mail className="w-5 h-5 stroke-[1.4]" />
                </div>
                <div>
                  <div className="text-xs font-light text-[#71839A]">
                    {isFa ? 'پست الکترونیکی رسمی' : 'Official Email'}
                  </div>
                  <a
                    href={`mailto:${personalInfo.contact.email}`}
                    className="text-sm font-normal text-[#243B5D] hover:underline font-mono mt-0.5 block"
                    dir="ltr"
                  >
                    {personalInfo.contact.email}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="neu-button p-2 rounded-xl text-[#71839A] hover:text-[#243B5D] cursor-pointer"
                title={isFa ? 'کپی آدرس ایمیل' : 'Copy Email'}
                aria-label="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Official Website Card */}
            <div className="neu-card p-6 flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl neu-button flex items-center justify-center text-[#243B5D] shrink-0">
                <Globe className="w-5 h-5 stroke-[1.4]" />
              </div>
              <div>
                <div className="text-xs font-light text-[#71839A]">
                  {isFa ? 'وب‌سایت اختصاصی' : 'Official Domain'}
                </div>
                <a
                  href={personalInfo.contact.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-normal text-[#243B5D] hover:underline font-mono mt-0.5 block"
                  dir="ltr"
                >
                  {personalInfo.contact.website}
                </a>
              </div>
            </div>

            {/* District Location Card */}
            <div className="neu-card p-6 flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl neu-button flex items-center justify-center text-[#243B5D] shrink-0">
                <MapPin className="w-5 h-5 stroke-[1.4]" />
              </div>
              <div>
                <div className="text-xs font-light text-[#71839A]">
                  {isFa ? 'محل استقرار و فعالیت' : 'Office Location'}
                </div>
                <div className="text-sm font-normal text-[#243B5D] mt-0.5">
                  {isFa ? 'تهران، منطقه ۵ • مجتمع مدارس هما' : 'Tehran, District 5 • Homa Schools Complex'}
                </div>
              </div>
            </div>

            {/* Human Leadership Note */}
            <div className="neu-panel-soft p-5 text-xs font-light text-[#71839A] leading-relaxed">
              {isFa
                ? 'پاسخگویی به مکاتبات آموزشی و درخواست‌های هماهنگی جلسات در روزهای کاری صورت می‌پذیرد.'
                : 'Educational correspondence and meeting appointments are addressed during working days.'}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
