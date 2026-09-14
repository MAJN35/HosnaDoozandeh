import { SiteContent } from '../types';
import { personalInfo, experiences } from './cvData';

export const defaultSiteContent: SiteContent = {
  hero: {
    eyebrow: {
      fa: 'مدیریت با نگاه انسانی',
      en: 'Human-Centered Educational Leadership',
    },
    name: {
      fa: 'حسنا دوزنده',
      en: 'Hosna Doozandeh',
    },
    role: {
      fa: 'مدیر دبیرستان دخترانه هما (دوره دوم)',
      en: 'Principal, Homa Girls’ High School (Period 2)',
    },
    specialty: {
      fa: 'متخصص سنجش و اندازه‌گیری (روان‌سنج)',
      en: 'Psychometrics Specialist & Educational Planner',
    },
    quote: {
      fa: '«آموزش تنها انتقال دانش نیست؛ فرصتی است برای ساختن انسان‌هایی مستقل، توانمند و آینده‌ساز.»',
      en: '“Education is not merely the transfer of knowledge; it is an opportunity to cultivate independent, empowered, and forward-looking human beings.”',
    },
    charterText: {
      fa: 'دارای موافقت اصولی تأسیس مدرسه از وزارت آموزش و پرورش',
      en: 'Official Statutory School Founding Charter Holder',
    },
    complexBadge: {
      fa: 'مجتمع مدارس هما',
      en: 'Homa Schools',
    },
    photoUrl: personalInfo.contact.photoUrl,
    stats: [
      {
        id: 'stat-experience',
        value: { fa: '۲۰+', en: '20+' },
        label: { fa: 'سال تجربه', en: 'Years of Experience' },
        sub: { fa: 'راهبری آموزشی و تربیتی', en: 'Educational Leadership' },
      },
      {
        id: 'stat-students',
        value: { fa: '۵۰۰+', en: '500+' },
        label: { fa: 'دانش‌آموز', en: 'Enrolled Students' },
        sub: { fa: 'تحت پوشش هدایت تحصیلی', en: 'Academic Mentorship' },
      },
      {
        id: 'stat-faculty',
        value: { fa: '۴۰+', en: '40+' },
        label: { fa: 'عضو کادر آموزشی', en: 'Faculty Members' },
        sub: { fa: 'تیم مدرسان و مشاوران نخبه', en: 'Elite Teachers & Counselors' },
      },
    ],
  },
  pillars: [
    {
      id: 'student-centered',
      title: { fa: 'دانش‌آموزمحوری', en: 'Student-Centered Learning' },
      subtitle: { fa: 'شناسایی و شکوفایی استعدادهای فردی', en: 'Tailored Cognitive & Personal Pathways' },
      description: {
        fa: 'باور به این اصل بنیادین که هر دانش‌آموز دارای هویت و منظومه شناختی منحصربه‌فرد است؛ تدوین مسیر یادگیری بر مبنای روان‌سنجی و پایش بهزیستی روانی.',
        en: 'Grounded in the fundamental belief that each learner possesses unique cognitive strengths and potential; developing personalized paths guided by psychometrics.',
      },
      iconName: 'UserCheck',
    },
    {
      id: 'teacher-empowerment',
      title: { fa: 'توانمندسازی معلمان', en: 'Teacher Empowerment' },
      subtitle: { fa: 'سرمایه‌گذاری روی رکن اصلی آموزش', en: 'Continuous Faculty Mastery & Agency' },
      description: {
        fa: 'فراهم‌سازی بستر رشد حرفه‌ای مستمر، استقلال آموزشی، کارگاه‌های تخصصی پداگوژی و ایجاد محیطی آرام، انگیزه‌بخش و مبتنی بر احترام متقابل.',
        en: 'Cultivating ongoing professional growth, instructional autonomy, modern pedagogy workshops, and a workplace culture grounded in mutual trust.',
      },
      iconName: 'HeartHandshake',
    },
    {
      id: 'educational-excellence',
      title: { fa: 'تعالی آموزشی', en: 'Educational Excellence' },
      subtitle: { fa: 'کیفیت‌بخشی و برنامه‌ریزی هدفمند', en: 'Rigorous Standards & Strategic Planning' },
      description: {
        fa: 'استقرار استانداردهای یادگیری روزآمد، تدوین برنامه‌های عملیاتی منسجم (OP)، پایش مداوم شاخص‌های کیفی و آماده‌سازی دانش‌آموزان برای رقابت‌های علمی.',
        en: 'Embedding state-of-the-art learning standards, disciplined operational plans (OP), and rigorous KPI tracking for superior academic outcomes.',
      },
      iconName: 'Award',
    },
    {
      id: 'personal-growth',
      title: { fa: 'رشد فردی', en: 'Holistic Personal Growth' },
      subtitle: { fa: 'تربیت شخصیت، هویت و خودباوری', en: 'Character, Resilience & Agency' },
      description: {
        fa: 'فراتر رفتن از مرزهای کتاب درسی به‌سوی آموزش مهارت‌های زندگی، فنون مذاکره، مدیریت هیجانات، اخلاق‌مداری و پرورش دخترانی خودباور و مستقل.',
        en: 'Transcend textbook boundaries to nurture emotional resilience, negotiation prowess, ethical responsibility, and confident future women leaders.',
      },
      iconName: 'Sparkles',
    },
  ],
  experiences: experiences,
  achievements: [
    {
      id: 'enrollment-growth',
      badge: { fa: 'توسعه سازمانی', en: 'Institutional Growth' },
      metric: 'رشد پایدار',
      title: {
        fa: 'رشد مستمر و پایدار آمار جذب و ثبت‌نام دانش‌آموزان در دوره‌های مدیریتی متوالی',
        en: 'Continuous & Sustainable Student Enrollment Growth across Leadership Tenures',
      },
      description: {
        fa: 'دستیابی به حداکثر ظرفیت پذیرش و ایجاد تقاضای پایدار در میان خانواده‌های متقاضی کیفیت از طریق ارتقای استانداردهای انضباطی، آموزشی و تربیتی دبیرستان.',
        en: 'Attained optimal enrollment capacity and built enduring trust among educationally ambitious families through consistent excellence in learning protocols.',
      },
      subtext: { fa: 'پایش ظرفیت: ۱۰۰٪ تکمیل سهمیه', en: 'Intake & Retention: 100% capacity' },
    },
    {
      id: 'satisfaction-index',
      badge: { fa: 'تضمین کیفیت', en: 'Quality Index' },
      metric: '۸۰٪+',
      title: {
        fa: 'تحقق شاخص رضایت‌مندی اولیا و مراجع نظارتی',
        en: 'Attainment of >80% Stakeholder & Inspectorate Satisfaction',
      },
      description: {
        fa: 'کسب بالاترین امتیازها در نظرسنجی‌های فصلی اولیا و بازرسی‌های اداره آموزش و پرورش منطقه ۵ تهران.',
        en: 'Ranked top tier in stakeholder periodic audits and Ministry of Education District 5 supervisory evaluations.',
      },
      subtext: { fa: 'نظرسنجی ادواری اولیا', en: 'Parent Audits & Satisfaction' },
    },
    {
      id: 'faculty-recruitment',
      badge: { fa: 'سرمایه انسانی', en: 'Faculty' },
      metric: '۴۰+',
      title: {
        fa: 'گزینش، استقرار و ارتقای شایستگی‌های کادر نخبه',
        en: 'Elite Faculty Onboarding & Continuous Professional Growth',
      },
      description: {
        fa: 'جذب دبیران تراز اول کنکور و استقرار کارگاه‌های مهارت‌های تدریس، اخلاق حرفه‌ای و مدیریت استرس.',
        en: 'Curating premier teachers and conducting continuous pedagogy, emotional resilience, and ethics workshops.',
      },
      subtext: { fa: 'کادر آموزشی و مشاوره', en: 'Academic & Counseling Team' },
    },
    {
      id: 'operational-plan',
      badge: { fa: 'برنامه‌ریزی راهبردی', en: 'Strategic Planning' },
      metric: 'سند OP',
      title: {
        fa: 'طراحی و استقرار برنامه عملیاتی سالانه (OP)',
        en: 'Annual Operational Plan (OP) & Intake Diagnostic Battery',
      },
      description: {
        fa: 'پیاده‌سازی سند عملیاتی مدرسه مبتنی بر اهداف SMART، ماتریس ارزیابی ورودی و پایش فصلی KPIها.',
        en: 'Deployed SMART-based school operational blueprint with standardized psychometric diagnostic testing.',
      },
      subtext: { fa: 'سند تحول مدرسه', en: 'School Transformation Charter' },
    },
    {
      id: 'district-rank',
      badge: { fa: 'آموزش و پرورش', en: 'District Level' },
      metric: 'رتبه برتر',
      title: {
        fa: 'ارتقای رتبه ارزیابی عملکرد مدرسه در سطح منطقه ۵',
        en: 'Elevated School Performance Ranking Across District 5',
      },
      description: {
        fa: 'کسب رتبه‌های برتر منطقه‌ای در ارزیابی‌های جامع با استقرار رویکرد بهبود مستمر فرآیندها.',
        en: 'Achieved premier evaluations in annual district audits through continuous process enhancement.',
      },
      subtext: { fa: 'منطقه ۵ شهر تهران', en: 'District 5 Inspectorate' },
    },
  ],
  publication: {
    tag: { fa: 'مقاله علمی پژوهشی', en: 'Peer-Reviewed Research Paper' },
    dateJournal: {
      fa: 'تابستان ۱۴۰۴ | فصلنامه علمی-پژوهشی روان‌سنجی',
      en: 'Summer 2025 | Journal of Psychometrics',
    },
    title: {
      fa: 'بررسی ویژگی‌های روان‌سنجی پرسشنامه سلامت روان مثبت (PMHQ) و رابطه آن با بهزیستی روان‌شناختی در جامعه ایرانی',
      en: 'Psychometric Evaluation of the Positive Mental Health Questionnaire (PMHQ) in the Iranian Community',
    },
    authorsAndCite: {
      fa: 'نویسندگان: حسنا دوزنده، زینب مشایخ، مریم ربیعی | دوره ۱۴، شماره ۵۳، صفحات ۱۶-۲۹',
      en: 'Authors: Hosna Doozandeh, Zeinab Mashayekh, Maryam Rabiei | Vol. 14, Issue 53, pp. 16-29',
    },
    footerNote: {
      fa: 'سنجش و اندازه‌گیری تخصصی',
      en: 'Specialized Educational Psychometrics',
    },
    badge: 'ISC Indexed',
  },
  gallery: [
    {
      id: 'mentorship-session',
      title: { fa: 'مشاوره و سنجش روان‌شناختی فردی', en: 'Individual Cognitive Counseling' },
      category: { fa: 'هدایت تحصیلی و روان‌سنجی', en: 'Psychometrics & Pacing' },
      description: {
        fa: 'جلسات تحلیل آزمون‌های هنجارشده و پایش سلامت روان دانش‌آموزان در آستانه امتحانات و کنکور سراسری.',
        en: 'Structured sessions analyzing standardized cognitive diagnostics and supporting adolescent well-being.',
      },
      imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'faculty-council',
      title: { fa: 'شورای معلمان و راهبری کیفیت آموزشی', en: 'Faculty Council & Pedagogy Strategy' },
      category: { fa: 'توانمندسازی همکاران', en: 'Teacher Empowerment' },
      description: {
        fa: 'هم‌اندیشی هفتگی پیرامون روش‌های نوین تدریس و تطبیق با تقویم امتحانات نهایی.',
        en: 'Weekly deliberations on modern instructional practices and aligning syllabus pacing.',
      },
      imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'science-lab',
      title: { fa: 'فضاهای یادگیری پژوهش‌محور و کارگاهی', en: 'Inquiry-Based Scientific Learning' },
      category: { fa: 'فضای آموزشی دبیرستان', en: 'High School Environment' },
      description: {
        fa: 'تقویت روحیه پژوهش، کار تیمی و کشف علمی در آزمایشگاه‌ها و کارگاه‌های دبیرستان.',
        en: 'Promoting teamwork, empirical exploration, and creative scientific discovery.',
      },
      imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'social-responsibility',
      title: { fa: 'مسئولیت اجتماعی: توانمندسازی کودکان کار', en: 'Social Responsibility & Child Advocacy' },
      category: { fa: 'خدمت اجتماعی', en: 'Community Service' },
      description: {
        fa: 'اجرای آزمون‌های هنجارشده روان‌سنجی، ارزیابی وضعیت شناختی و پیاده‌سازی پروتکل‌های حمایتی.',
        en: 'Administering standardized psychometric tests and cognitive support protocols for underprivileged children.',
      },
      imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80',
    },
  ],
  testimonials: [
    {
      id: 'parent-council',
      quote: {
        fa: 'حضور خانم دوزنده در رأس مدیریت دبیرستان، آرامش روانی عمیقی به خانواده‌ها بخشیده است. توجه ایشان به شأن دانش‌آموزان و شنیدن دغدغه‌های اولیا با رویکردی علمی، مثال‌زدنی است.',
        en: 'Ms. Doozandeh’s compassionate and scientific approach brings immense peace of mind to families. Her unwavering respect for student agency and attentive dialogue with parents is exemplary.',
      },
      author: {
        fa: 'مهندس م. رضایی',
        en: 'Eng. M. Rezaei',
      },
      role: {
        fa: 'عضو انجمن اولیا و مربیان دبیرستان',
        en: 'Member, Parent-Teacher Association',
      },
      institution: {
        fa: 'دبیرستان دخترانه هما',
        en: 'Homa Girls’ High School',
      },
    },
    {
      id: 'faculty-member',
      quote: {
        fa: 'مدیریت ایشان ترکیبی کم‌نظیر از انضباط سازمانی، استقلال عمل معلم و احترام متقابل است. کار کردن در فضایی که نگاه انسانی اصل اول است، انگیزه تدریس را دوچندان می‌کند.',
        en: 'Her leadership seamlessly merges organizational discipline with pedagogical autonomy and mutual trust. Teaching in an environment where human dignity comes first is truly inspiring.',
      },
      author: {
        fa: 'دکتر س. طاهری',
        en: 'Dr. S. Taheri',
      },
      role: {
        fa: 'دبیر دوره دوم و سرگروه آموزشی',
        en: 'Senior Faculty & Department Chair',
      },
      institution: {
        fa: 'مجتمع مدارس هما',
        en: 'Homa Educational Complex',
      },
    },
    {
      id: 'district-supervisor',
      quote: {
        fa: 'تدوین برنامه‌های عملیاتی مدون (OP) و به‌کارگیری ابزارهای سنجش روان‌شناختی توسط سرکار خانم دوزنده، الگویی موفق در ارتقای کیفیت مدارس منطقه ۵ تهران به شمار می‌رود.',
        en: 'Her formulation of structured Operational Plans (OP) coupled with standardized psychometric diagnostics represents a gold standard in District 5 educational governance.',
      },
      author: {
        fa: 'استاد ف. باقری',
        en: 'Prof. F. Bagheri',
      },
      role: {
        fa: 'کارشناس ارشد ارزیابی آموزشی',
        en: 'Senior Educational Quality Inspector',
      },
      institution: {
        fa: 'آموزش و پرورش منطقه ۵ تهران',
        en: 'District 5 Education Administration',
      },
    },
  ],
  contact: {
    badge: { fa: 'ارتباط مستقیم', en: 'Direct Communication' },
    heading: { fa: 'در ارتباط باشیم', en: 'Let’s Connect' },
    subheading: {
      fa: 'برای گفت‌وگو درباره آموزش، مدیریت مدرسه و آینده نسل جدید، خوشحال می‌شوم در ارتباط باشیم.',
      en: 'For conversations regarding education, school leadership, and nurturing the next generation, I would be glad to connect.',
    },
    email: 'doozandehhosna@gmail.com',
    website: 'douzandeh.ir',
    websiteUrl: 'https://douzandeh.ir',
    location: {
      fa: 'تهران، منطقه ۵ • مجتمع مدارس هما',
      en: 'Tehran, District 5 • Homa Schools Complex',
    },
    officeHoursNote: {
      fa: 'پاسخگویی به مکاتبات آموزشی و درخواست‌های هماهنگی جلسات در روزهای کاری صورت می‌پذیرد.',
      en: 'Educational correspondence and meeting appointments are addressed during working days.',
    },
  },
};
