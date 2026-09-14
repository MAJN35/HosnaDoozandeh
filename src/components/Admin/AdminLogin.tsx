import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, User, ArrowLeft, Eye, EyeOff, ShieldAlert, KeyRound, ShieldCheck, Clock } from 'lucide-react';
import { useSiteContent } from '../../context/ContentContext';
import { Language } from '../../types';
import { checkLockoutStatus } from '../../utils/authSecurity';

interface AdminLoginProps {
  lang: Language;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ lang, onBackToSite }) => {
  const { login } = useSiteContent();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lockoutSec, setLockoutSec] = useState<number>(0);

  const isFa = lang === 'fa';

  useEffect(() => {
    const status = checkLockoutStatus();
    if (status.isLocked) {
      setLockoutSec(status.remainingSeconds);
    }
  }, []);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutSec <= 0) return;
    const interval = setInterval(() => {
      setLockoutSec((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setError(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutSec]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutSec > 0) return;

    setError(null);
    setIsSubmitting(true);

    try {
      const result = await login(username, password);
      setIsSubmitting(false);

      if (!result.success) {
        if (result.isLocked) {
          setLockoutSec(result.remainingSeconds || 900);
          setError(
            isFa
              ? 'تعداد تلاش‌های ناموفق بیش از حد مجاز بود. جهت امنیت حساب، پنل موقتاً مسدود شد.'
              : 'Too many failed attempts. Login locked temporarily for security.'
          );
        } else {
          setError(
            isFa
              ? 'نام کاربری یا کلمه عبور واردشده نادرست است.'
              : 'Invalid username or password.'
          );
        }
      }
    } catch {
      setIsSubmitting(false);
      setError(isFa ? 'خطای ناشناخته در تأیید هویت' : 'Authentication error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F0F8] flex items-center justify-center p-4 sm:p-6 text-[#243B5D]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        {/* Soft Neumorphic Login Box */}
        <div className="neu-panel p-6 sm:p-8 relative overflow-hidden">
          {/* Subtle Top Accent Glow */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#3D5A80]/60 to-transparent" />

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 rounded-full neu-dial flex items-center justify-center mb-3">
              <div className="w-10 h-10 rounded-full neu-recessed flex items-center justify-center text-[#3D5A80]">
                <Lock className="w-5 h-5" />
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-normal text-[#243B5D]">
              {isFa ? 'ورود به پنل مدیریت محتوا' : 'Content Management Sign In'}
            </h1>
            <p className="text-xs sm:text-sm text-[#71839A] font-light mt-1">
              {isFa
                ? 'مدیریت و ویرایش برخط اطلاعات، دستاوردها و متن‌های وب‌سایت'
                : 'Manage and customize sections, accomplishments, and biography'}
            </p>
          </div>

          {/* Lockout Warning Banner */}
          {lockoutSec > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 flex items-start gap-3 text-xs"
            >
              <Clock className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
              <div>
                <div className="font-normal text-amber-950">
                  {isFa ? 'حفاظت در برابر حمله حدس کلمه عبور (Brute-Force)' : 'Brute-Force Protection Active'}
                </div>
                <div className="mt-1 font-light">
                  {isFa
                    ? `امکان تلاش مجدد تا ${Math.floor(lockoutSec / 60)} دقیقه و ${lockoutSec % 60} ثانیه دیگر مسدود است.`
                    : `Please wait ${Math.floor(lockoutSec / 60)}m ${lockoutSec % 60}s before trying again.`}
                </div>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-light text-[#71839A] block">
                {isFa ? 'نام کاربری مدیر' : 'Username'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  autoFocus
                  disabled={lockoutSec > 0 || isSubmitting}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={isFa ? 'نام کاربری خود را وارد کنید' : 'Enter username'}
                  dir="ltr"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl neu-recessed text-sm font-mono text-[#243B5D] placeholder:text-[#71839A]/40 transition-all duration-200"
                />
                <User className="w-4 h-4 text-[#71839A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-light text-[#71839A] block">
                {isFa ? 'کلمه عبور' : 'Password'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={lockoutSec > 0 || isSubmitting}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  dir="ltr"
                  className="w-full pl-10 pr-10 py-3 rounded-2xl neu-recessed text-sm font-mono text-[#243B5D] placeholder:text-[#71839A]/40 transition-all duration-200"
                />
                <KeyRound className="w-4 h-4 text-[#71839A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#71839A] hover:text-[#243B5D] cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && lockoutSec === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-xs font-light flex items-center gap-2"
              >
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: lockoutSec > 0 || isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: lockoutSec > 0 || isSubmitting ? 1 : 0.98 }}
              type="submit"
              disabled={lockoutSec > 0 || isSubmitting}
              className={`w-full py-3.5 rounded-full text-sm font-normal text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all ${
                lockoutSec > 0 || isSubmitting
                  ? 'bg-[#71839A]/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#3D5A80] to-[#2E486B] hover:opacity-95'
              }`}
            >
              <Lock className="w-4 h-4 opacity-90" />
              <span>
                {isSubmitting
                  ? isFa ? 'در حال بررسی...' : 'Verifying...'
                  : lockoutSec > 0
                    ? isFa ? 'حالت قفل موقت' : 'Temporarily Locked'
                    : isFa ? 'ورود به پنل' : 'Sign In'}
              </span>
            </motion.button>
          </form>

          {/* Security Status Info Box */}
          <div className="mt-6 pt-5 border-t border-white/60">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#71839A] font-light flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3D5A80]" />
                {isFa ? 'امنیت ورود:' : 'Security:'}
              </span>
              <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full neu-pill text-[#243B5D]">
                {isFa ? 'حفاظت رمزنگاری SHA-256 و ضدنفوذ' : 'SHA-256 Protected'}
              </span>
            </div>
          </div>

          {/* Back to Public Site */}
          <div className="mt-5 text-center">
            <button
              onClick={onBackToSite}
              className="neu-button px-5 py-2 rounded-full text-xs font-normal text-[#71839A] hover:text-[#243B5D] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
              <span>{isFa ? 'بازگشت به وب‌سایت عمومی' : 'Back to Public Website'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
