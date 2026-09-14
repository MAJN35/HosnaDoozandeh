import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  declare props: Props;
  state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('douzandeh_portfolio_content_v2');
      localStorage.removeItem('douzandeh_portfolio_admin_auth');
    } catch (e) {
      console.error(e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          dir="rtl"
          className="min-h-screen bg-[#E8F0F8] flex items-center justify-center p-4 font-sans text-[#243B5D]"
        >
          <div className="max-w-md w-full p-8 rounded-3xl bg-[#EDF4FA] shadow-[12px_14px_32px_rgba(175,195,222,0.42),-12px_-12px_30px_rgba(255,255,255,0.95)] border border-white/70 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#E5EEF7] flex items-center justify-center text-[#3D5A80] shadow-inner text-2xl font-bold">
              !
            </div>
            <h1 className="text-xl font-normal text-[#243B5D]">
              خطایی در بارگذاری وب‌سایت رخ داده است
            </h1>
            <p className="text-xs text-[#71839A] font-light leading-relaxed">
              ممکن است داده‌های ذخیره‌شده مرورگر با نسخه جدید هماهنگ نباشد. لطفاً دکمه بارگذاری مجدد را انتخاب نمایید.
            </p>
            {this.state.error && (
              <pre className="text-[10px] text-left ltr bg-black/5 p-3 rounded-xl overflow-x-auto text-red-600 font-mono">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-normal text-[#243B5D] bg-[#EDF4FA] shadow-[4px_5px_14px_rgba(175,195,222,0.45),-4px_-4px_12px_rgba(255,255,255,0.95)] border border-white/80 hover:translate-y-[-1px] transition-transform cursor-pointer"
              >
                بارگذاری مجدد (Reload)
              </button>
              <button
                onClick={this.handleReset}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-normal text-white bg-[#2A4367] shadow-md hover:bg-[#1E3352] transition-colors cursor-pointer"
              >
                بازیابی پیش‌فرض‌ها
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
