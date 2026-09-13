import {
  Project,
  SkillItem,
  ExperienceItem,
  EducationItem,
  CertificateItem,
  PublicationItem,
  ExtracurricularItem,
} from '../types';

export const personalInfo = {
  name: {
    fa: 'حسنا دوزنده',
    en: 'Hosna Doozandeh',
  },
  title: {
    fa: 'عضو هیئت مدیره، مؤسس مدارس دخترانه و متخصص روان‌سنجی',
    en: 'Board Member, School Founder & Senior Psychometrics Specialist',
  },
  subtitle: {
    fa: 'مدیر ارشد امور آموزشی و نماینده حقوقی مؤسسه فرهنگی و آموزشی هما | آموزش و پرورش منطقه ۵ تهران',
    en: 'Senior Educational Executive & Legal Representative, Homa Educational Institute | Tehran District 5',
  },
  bio: {
    fa: 'مدیر ارشد مؤسسه آموزشی فرهنگی هما و مؤسس مدارس دخترانه، متخصص روان‌سنجی با بیش از یک دهه سابقه درخشان در سازماندهی و راهبری مدارس هما در مقاطع ابتدایی و متوسطه. دارای کارشناسی ارشد روان‌سنجی و کارشناسی مدیریت آموزشی، با شایستگی‌های اثبات‌شده در تدوین و استقرار برنامه‌های راهبردی، بهینه‌سازی فرآیندهای مدرسه، ارزیابی عملکرد سازمانی و پایش شاخص‌های کلیدی عملکرد (KPI). متبحر در هدایت تیم‌های آموزشی، مدیریت بحران‌های سازمانی، بهبود مستمر استانداردهای یادگیری و ایجاد هم‌افزایی پایدار میان اولیا، کادر آموزشی و مراجع ذی‌ربط.',
    en: 'Senior Educational Executive at Homa Cultural & Educational Institute and Founder of Homa Girls’ Schools. With over a decade of dedicated leadership across primary and secondary school tiers, holding an M.Sc. in Psychometrics and a B.A. in Educational Management. Proven track record in orchestrating strategic plans, designing and monitoring institutional Key Performance Indicators (KPIs), leading high-performing pedagogical teams, managing crisis contingencies, and standardizing learning outcomes while establishing trust and synergy among parents, regulatory bodies, and staff.',
  },
  contact: {
    email: 'doozandehhosna@gmail.com',
    location: {
      fa: 'تهران، منطقه ۵',
      en: 'Tehran, District 5, Iran',
    },
    birthYear: {
      fa: '۱۳۶۰',
      en: '1981',
    },
    photoUrl: '/profile.jpg',
  },
  keyMetrics: [
    {
      value: '10+',
      label: { fa: 'سال سابقه راهبری آموزشی', en: 'Years Executive Leadership' },
    },
    {
      value: '3',
      label: { fa: 'مقطع تحصیلی تأسیس شده', en: 'School Campuses Founded' },
    },
    {
      value: '80%+',
      label: { fa: 'شاخص رضایت‌مندی اولیا و مراجع', en: 'Stakeholder Satisfaction Rate' },
    },
    {
      value: '1',
      label: { fa: 'مقاله علمی پژوهشی چاپ‌شده', en: 'Peer-Reviewed Research Paper' },
    },
  ],
};

export const professionalProjects: Project[] = [
  {
    id: 'homa-girls-schools-founding',
    title: {
      fa: 'تأسیس و توسعه زنجیره مدارس دخترانه هما (دبستان، متوسطه اول و دوم)',
      en: 'Founding & Multi-Tier Expansion of Homa Girls’ Schools',
    },
    category: 'leadership',
    categoryLabel: {
      fa: 'توسعه و راهبری سازمانی',
      en: 'Institutional Leadership',
    },
    organization: {
      fa: 'مؤسسه فرهنگی و آموزشی هما (وابسته به صندوق بازنشستگی)',
      en: 'Homa Educational & Cultural Institute',
    },
    period: {
      fa: '۱۴۰۱ تاکنون',
      en: '2022 - Present',
    },
    summary: {
      fa: 'طراحی، اخذ موافقت اصولی، راه‌اندازی و نظارت حقوقی و آموزشی بر تأسیس مدارس دخترانه هما در هر سه مقطع ابتدایی، متوسطه دوره اول و متوسطه دوره دوم.',
      en: 'Conception, regulatory licensing, architectural setup, and academic oversight for launching Homa Girls’ schools across elementary, junior, and senior secondary tiers.',
    },
    keyAchievements: {
      fa: [
        'اخذ موافقت اصولی و کلیه مجوزهای رسمی آموزش و پرورش به عنوان مؤسس و نماینده حقوقی',
        'تکمیل ظرفیت ثبت‌نام در سال‌های نخست با جذب خانواده‌های متقاضی کیفیت‌محور',
        'ایجاد زیرساخت‌های فیزیکی، اداری و استانداردهای یکپارچه آموزشی و تربیتی',
      ],
      en: [
        'Secured comprehensive statutory accreditations and operating licenses from the Ministry of Education as legal representative',
        'Achieved full student enrollment capacity within initial opening cohorts',
        'Established unified multi-tier operational standards and collaborative faculty frameworks',
      ],
    },
    skillsUsed: ['برنامه‌ریزی راهبردی', 'نظارت حقوقی', 'مدیریت سرمایه انسانی', 'مدیریت منابع'],
    featured: true,
  },
  {
    id: 'operational-plan-and-entrance-system',
    title: {
      fa: 'طراحی و استقرار سند برنامه عملیاتی سالانه (OP) و نظام ارزیابی ورودی استاندارد',
      en: 'Standardized Annual Operational Plan (OP) & Entrance Assessment Battery',
    },
    category: 'psychometrics',
    categoryLabel: {
      fa: 'روان‌سنجی و برنامه‌ریزی',
      en: 'Psychometrics & Planning',
    },
    organization: {
      fa: 'مجتمع مدارس هما',
      en: 'Homa Schools Complex',
    },
    period: {
      fa: '۱۳۹۹ - ۱۴۰۴',
      en: '2020 - 2025',
    },
    summary: {
      fa: 'تدوین مدل هدف‌گذاری سالانه مبتنی بر خروجی‌های یادگیری و پیاده‌سازی آزمون‌های تشخیصی و روان‌سنجی ورودی دانش‌آموزان جهت شناسایی استعدادها و سبک‌های یادگیری.',
      en: 'Formulation of an outcome-based annual operational plan alongside an objective psychological and diagnostic intake assessment battery for incoming cohorts.',
    },
    keyAchievements: {
      fa: [
        'طراحی چک‌لیست‌ها و ابزارهای روان‌سنجی ارزیابی شناختی و رفتاری دانش‌آموزان در بدو ورود',
        'تدوین ماتریس همسوسازی اهداف آموزشی با شاخص‌های کلیدی عملکرد (KPI)',
        'افزایش انطباق برنامه‌های درسی معلمان با تفاوت‌های فردی دانش‌آموزان',
      ],
      en: [
        'Designed psychometric intake diagnostic tools mapping cognitive styles and behavioral readiness',
        'Engineered an alignment matrix synchronizing curriculum pacing with measurable KPIs',
        'Boosted individual student pedagogical support and teacher differentiation precision',
      ],
    },
    skillsUsed: ['طراحی KPI', 'روان‌سنجی', 'سند عملیاتی OP', 'سنجش شناختی'],
    featured: true,
  },
  {
    id: 'district-rank-optimization',
    title: {
      fa: 'ارتقای رتبه ارزیابی عملکرد مدرسه در سطح منطقه با پیاده‌سازی رویکرد بهبود مستمر',
      en: 'District Quality Performance Uplift via Continuous Process Optimization',
    },
    category: 'leadership',
    categoryLabel: {
      fa: 'بهینه‌سازی فرآیندها',
      en: 'Quality & Process Optimization',
    },
    organization: {
      fa: 'آموزش و پرورش منطقه ۵ تهران - مجتمع هما',
      en: 'Tehran District 5 Education Administration',
    },
    period: {
      fa: '۱۳۹۹ - ۱۴۰۴',
      en: '2020 - 2025',
    },
    summary: {
      fa: 'بازنگری و مهندسی مجدد فرآیندهای اداری، آموزشی و ارزیابی مدرسه بر اساس چک‌لیست‌های نظارتی و بازرسی‌های منطقه‌ای آموزش و پرورش.',
      en: 'Systematic re-engineering of administrative workflows, pedagogical evaluations, and governance records based on district supervisory standards.',
    },
    keyAchievements: {
      fa: [
        'کسب رتبه ممتاز در بازرسی‌های دوره‌ای آموزش و پرورش منطقه ۵ تهران',
        'ثبت شاخص رضایت‌مندی بالای ۸۰ درصدی اولیا و مراجع نظارتی از انضباط و کیفیت مدرسه',
        'کاهش چالش‌های اداری و تسهیل پاسخگویی سریع به مراجع ذی‌ربط و خانواده‌ها',
      ],
      en: [
        'Attained top-tier tier appraisal in Tehran District 5 comprehensive school audits',
        'Maintained sustained >80% satisfaction index among parents and supervisory boards',
        'Drastically minimized administrative latency and elevated institutional accountability',
      ],
    },
    skillsUsed: ['بهبود مستمر فرآیندها', 'پایش انضباطی', 'ارزیابی منطقه ۵', 'تضمین کیفیت'],
    featured: true,
  },
  {
    id: 'ai-in-education-learning-analytics',
    title: {
      fa: 'پیاده‌سازی کاربردهای هوش مصنوعی و تحلیل داده‌های یادگیری در پایش تحصیلی',
      en: 'AI in Education & Learning Analytics Integration Project',
    },
    category: 'ai_data',
    categoryLabel: {
      fa: 'هوش مصنوعی و داده‌های یادگیری',
      en: 'AI & Learning Analytics',
    },
    organization: {
      fa: 'پروژه مشترک پژوهشی و اجرایی هما (دارای گواهینامه بین‌المللی Learnarnuse)',
      en: 'Homa Innovation Labs (Certified by Learnarnuse Int’l)',
    },
    period: {
      fa: '۱۴۰۲ - ۱۴۰۴',
      en: '2023 - 2025',
    },
    summary: {
      fa: 'به‌کارگیری الگوهای تحلیلی هوش مصنوعی جهت پایش روند پیشرفت تحصیلی دانش‌آموزان، پیش‌بینی نقاط افت درسی و ارائه بازخورد زودهنگام به دبیران و مشاوران.',
      en: 'Applied predictive machine learning insights and learning data analytics to monitor academic trajectories, anticipate drop-offs, and recommend targeted counseling.',
    },
    keyAchievements: {
      fa: [
        'دریافت گواهینامه معتبر بین‌المللی از مؤسسه Learnarnuse در حوزه هوش مصنوعی در آموزش',
        'پیاده‌سازی داشبوردهای تحلیلی نمرات و شاخص‌های رفتاری دانش‌آموزان',
        'ارائه پیشنهادات تطبیقی تدریس به کادر معلمان بر اساس داده‌های عملکردی کلاسی',
      ],
      en: [
        'Awarded international credential in AI in Education from Learnarnuse Institute',
        'Implemented analytical dashboards visualizing student learning progressions and behavioral metrics',
        'Formulated adaptive instructional guidelines for teaching staff informed by classroom data',
      ],
    },
    skillsUsed: ['هوش مصنوعی در آموزش', 'تحلیل داده‌های یادگیری', 'داشبورد مدیریتی', 'پیش‌بینی عملکرد'],
    featured: false,
  },
  {
    id: 'student-life-skills-workshops',
    title: {
      fa: 'طراحی و اجرای کارگاه‌های رشد فردی و مهارت‌های زندگی دانش‌آموزی',
      en: 'Youth Personal Growth & Life Skills Workshop Series',
    },
    category: 'social',
    categoryLabel: {
      fa: 'رشد فردی و مهارت‌های زندگی',
      en: 'Youth Development',
    },
    organization: {
      fa: 'مراکز آموزشی و پرورشی تهران',
      en: 'Tehran Educational & Youth Centers',
    },
    period: {
      fa: '۱۳۸۵ تا ۱۳۹۰',
      en: '2006 - 2011',
    },
    summary: {
      fa: 'تدوین سرفصل‌های تربیتی، هدایت دوره‌های توانمندسازی رفتاری و ارتقای شایستگی‌های ارتباطی و شناختی دانش‌آموزان در سنین حساس نوجوانی.',
      en: 'Curriculum development and clinical facilitator leadership for student behavioral empowerment, interpersonal communication, and emotional resilience.',
    },
    keyAchievements: {
      fa: [
        'برگزاری کارگاه‌های مهارتی برای صدها دانش‌آموز در حوزه‌های حل مسئله، مدیریت خشم و ابراز وجود',
        'ارائه بازخورد روان‌شناختی منظم به اولیا جهت ارتقای سبک فرزندپروری',
        'ایجاد بانک ابزارهای فعالیت‌محور کارگاهی برای مربیان پرورشی',
      ],
      en: [
        'Conducted developmental workshops for hundreds of adolescents in assertiveness, conflict resolution, and self-efficacy',
        'Delivered structured feedback reports to parents for parenting style enhancement',
        'Created a reproducible repository of experiential activity toolkits for school counselors',
      ],
    },
    skillsUsed: ['مهارت‌های زندگی', 'تسهیلگری کارگاه', 'ارتباط با اولیا', 'توانمندسازی شناختی'],
    featured: false,
  },
  {
    id: 'at-risk-children-psychometric-assessment',
    title: {
      fa: 'سنجش روان‌شناختی و توانمندسازی کودکان در معرض آسیب (مسئولیت اجتماعی تخصصی)',
      en: 'Psychometric Assessment & Support for At-Risk Children (CSR)',
    },
    category: 'social',
    categoryLabel: {
      fa: 'مسئولیت اجتماعی تخصصی',
      en: 'Clinical CSR & Outreach',
    },
    organization: {
      fa: 'پروژه‌های خدمات اجتماعی و کلینیکی تخصصی',
      en: 'Specialized Child Welfare & Clinical Initiatives',
    },
    period: {
      fa: 'فعالیت مستمر تخصصی',
      en: 'Ongoing Specialized Practice',
    },
    summary: {
      fa: 'اجرای آزمون‌های هنجارشده روان‌سنجی، ارزیابی وضعیت شناختی و پیاده‌سازی پروتکل‌های حمایتی، انطباقی و توانبخشی روانی برای کودکان در شرایط پرخطر.',
      en: 'Administration of standardized norm-referenced psychometric batteries, cognitive evaluation, and execution of adaptive rehabilitation protocols for vulnerable youth.',
    },
    keyAchievements: {
      fa: [
        'اجرای آزمون‌های تشخیصی هوش، توجه، اضطراب و سازگاری اجتماعی',
        'تدوین برنامه‌های مداخله‌ای فردی (IEP) متناسب با ظرفیت‌های روان‌شناختی هر کودک',
        'همکاری با روان‌شناسان بالینی و مددکاران جهت پیگیری مداخلات توانبخشی',
      ],
      en: [
        'Administered standardized diagnostic batteries evaluating IQ, attention, anxiety, and social adaptation',
        'Formulated Individualized Intervention Plans (IEPs) calibrated to cognitive profiles',
        'Collaborated with clinical psychologists and social workers to maintain restorative progress',
      ],
    },
    skillsUsed: ['روان‌سنجی بالینی', 'آزمون‌های هنجارشده', 'توانبخشی روانی', 'مسئولیت اجتماعی'],
    featured: false,
  },
  {
    id: 'pmhq-research-publication',
    title: {
      fa: 'مقاله علمی پژوهشی: بررسی ویژگی‌های روان‌سنجی پرسشنامه سلامت روان مثبت (PMHQ)',
      en: 'Academic Paper: Psychometric Properties of Positive Mental Health Questionnaire (PMHQ)',
    },
    category: 'psychometrics',
    categoryLabel: {
      fa: 'پژوهش علمی روان‌سنجی',
      en: 'Peer-Reviewed Research',
    },
    organization: {
      fa: 'فصلنامه علمی-پژوهشی روان‌سنجی',
      en: 'Journal of Psychometrics',
    },
    period: {
      fa: 'تابستان ۱۴۰۴ (دوره ۱۴، شماره ۵۳)',
      en: 'Summer 2025 (Vol. 14, Issue 53)',
    },
    summary: {
      fa: 'بررسی ویژگی‌های روان‌سنجی پرسشنامه سلامت روان مثبت (PMHQ) و رابطه آن با بهزیستی روان‌شناختی در جامعه ایرانی، منتشرشده در فصلنامه علمی-پژوهشی روان‌سنجی، صفحات ۱۶ تا ۲۹.',
      en: 'Rigorous empirical investigation validating the construct validity, factor structure, reliability, and correlation with psychological well-being of PMHQ within the Iranian population.',
    },
    keyAchievements: {
      fa: [
        'انتشار مقاله در فصلنامه معتبر علمی-پژوهشی روان‌سنجی با داوری دقیق تخصصی',
        'اعتبارسنجی ابزار تشخیصی سلامت روان برای استفاده در نهادهای پژوهشی و آموزشی کشور',
        'تحلیل آماری پیشرفته عاملی و سنجش همبستگی با شاخص‌های بهزیستی روان‌شناختی',
      ],
      en: [
        'Published in the peer-reviewed Journal of Psychometrics with blind academic review',
        'Standardized a psychometric instrument for positive mental health assessment across educational institutions',
        'Conducted confirmatory factor analysis and psychological well-being regression modeling',
      ],
    },
    skillsUsed: ['تحلیل آماری', 'اعتبارسنجی ابزار روان‌سنجی', 'روش تحقیق علمی', 'آمار عاملی'],
    featured: true,
  },
];

export const skillsList: SkillItem[] = [
  {
    name: {
      fa: 'برنامه‌ریزی راهبردی و تدوین سند عملیاتی آموزشی (OP)',
      en: 'Strategic Planning & Educational Operational Plan (OP)',
    },
    category: 'leadership',
    level: 95,
    description: {
      fa: 'تسلط کامل بر تدوین چشم‌انداز، بودجه‌بندی سالانه و برنامه‌ریزی عملیاتی مجتمع‌های آموزشی چندمقطعی',
      en: 'End-to-end expertise in academic operational planning, multi-campus governance, and fiscal alignment',
    },
    tags: ['سند تحول', 'برنامه عملیاتی', 'هدف‌گذاری SMART'],
  },
  {
    name: {
      fa: 'روان‌سنجی و ارزیابی ابزارهای تشخیصی و تربیتی',
      en: 'Psychometrics & Diagnostic Educational Instruments',
    },
    category: 'psychometrics',
    level: 98,
    description: {
      fa: 'تخصص در ساخت، هنجاریابی، اعتبارسنجی و اجرای آزمون‌های شناختی، رفتاری و سلامت روان',
      en: 'Mastery in test construction, norming, validation (PMHQ), and cognitive/behavioral diagnostic testing',
    },
    tags: ['هنجاریابی', 'PMHQ', 'آزمون‌های استاندارد', 'اعتبار و روایی'],
  },
  {
    name: {
      fa: 'طراحی و پایش شاخص‌های کلیدی عملکرد (KPI)',
      en: 'Design & Monitoring of Key Performance Indicators (KPIs)',
    },
    category: 'analytics',
    level: 92,
    description: {
      fa: 'پیاده‌سازی نظام سنجش کمّی و کیفی عملکرد معلمان، رضایت اولیا و رشد تحصیلی دانش‌آموزان',
      en: 'Quantitative and qualitative performance architecture tracking teacher fidelity, satisfaction, and growth',
    },
    tags: ['KPI سازمانی', 'داشبورد عملکرد', 'مدیریت داده‌محور'],
  },
  {
    name: {
      fa: 'مدیریت و توانمندسازی سرمایه‌های انسانی',
      en: 'Human Capital Leadership & Talent Development',
    },
    category: 'leadership',
    level: 94,
    description: {
      fa: 'گزینش، استقرار و ارتقای شایستگی‌های حرفه‌ای کادر نخبه آموزشی و کادر اداری مدارس',
      en: 'Recruiting, mentoring, and retaining top-tier teaching faculty and school administrative personnel',
    },
    tags: ['گزینش کادر نخبه', 'توانمندسازی معلمان', 'ارزیابی ۳۶۰ درجه'],
  },
  {
    name: {
      fa: 'کاربردهای هوش مصنوعی در آموزش و تحلیل داده‌های یادگیری',
      en: 'AI in Education & Learning Analytics (Learnarnuse Certified)',
    },
    category: 'edtech',
    level: 88,
    description: {
      fa: 'به‌کارگیری ابزارهای نوین هوش مصنوعی و داده‌کاوی در پایش افت تحصیلی و یادگیری انطباقی',
      en: 'Application of predictive AI models and data analytics to optimize personalized student learning paths',
    },
    tags: ['AI در آموزش', 'تحلیل داده‌های یادگیری', 'Learnarnuse', 'پیش‌بینی تحصیلی'],
  },
  {
    name: {
      fa: 'حل مسئله سازمانی، تصمیم‌گیری و مدیریت بحران',
      en: 'Organizational Problem Solving & Crisis Management',
    },
    category: 'leadership',
    level: 96,
    description: {
      fa: 'مهارت عالی در مدیریت شرایط غیرمنتظره، تعارضات بین‌فردی و تصمیم‌گیری راهبردی تحت فشار',
      en: 'Proven resilience in mitigating operational contingencies, dispute resolution, and emergency school governance',
    },
    tags: ['مدیریت بحران', 'تصمیم‌گیری تحت فشار', 'حل تعارض'],
  },
  {
    name: {
      fa: 'راهبری یکپارچه مجتمع‌های آموزشی چندمقطعی',
      en: 'Unified Leadership of Multi-Tier Educational Campuses',
    },
    category: 'leadership',
    level: 93,
    description: {
      fa: 'هماهنگی زنجیره‌ای مقاطع دبستان، دوره اول و دوره دوم متوسطه جهت استمرار کیفیت و متدولوژی',
      en: 'Synchronizing primary and secondary divisions to ensure curricular continuity and operational harmony',
    },
    tags: ['مدارس دخترانه و پسرانه', 'تداوم یادگیری', 'مدیریت مجتمع'],
  },
  {
    name: {
      fa: 'توسعه سازمانی و نظارت بر امور حقوقی مدارس',
      en: 'Institutional Development & Legal Regulatory Compliance',
    },
    category: 'leadership',
    level: 91,
    description: {
      fa: 'نمایندگی حقوقی مؤسسه، اخذ مجوزها، تسلط بر اسناد بالادستی و ضوابط آموزش و پرورش',
      en: 'Full statutory representation, school charter compliance, and navigation of Ministry directives',
    },
    tags: ['نمایندگی حقوقی', 'موافقت اصولی', 'اسناد بالادستی'],
  },
  {
    name: {
      fa: 'مذاکره اثربخش و مدیریت ارتباط با ذینفعان و اولیا',
      en: 'Stakeholder Engagement & Parent Relationship Management',
    },
    category: 'leadership',
    level: 95,
    description: {
      fa: 'ارتباط همدلانه و سازنده با اولیای دانش‌آموزان، هیئت‌مدیره و بازرسان منطقه‌ای با شاخص رضایت >۸۰٪',
      en: 'Empathetic diplomacy maintaining >80% satisfaction rates across parent communities and school boards',
    },
    tags: ['رضایت اولیا', 'مذاکره اقناعی', 'ارتباطات سازمانی'],
  },
  {
    name: {
      fa: 'بهینه‌سازی و بهبود مستمر فرآیندهای آموزشی',
      en: 'Educational Process Optimization & Continuous Improvement',
    },
    category: 'analytics',
    level: 92,
    description: {
      fa: 'بازمهندسی روندهای کلاسی، امتحانات، مشاوره تحصیلی و گزارش‌دهی دوره‌ای به منظور کاهش اتلاف منابع',
      en: 'Re-engineering instructional rhythms, examination workflows, and counseling pipelines',
    },
    tags: ['بهبود مستمر', 'کایزن آموزشی', 'ارزیابی کیفیت'],
  },
];

export const experiences: ExperienceItem[] = [
  {
    id: 'director-girls-high-school',
    role: {
      fa: 'مدیر دوره دوم متوسطه',
      en: 'Director of Senior Secondary School (Period 2)',
    },
    organization: {
      fa: 'دبیرستان دخترانه هما',
      en: 'Homa Girls’ Senior High School',
    },
    period: {
      fa: '۱۴۰۴ تاکنون',
      en: '2025 - Present',
    },
    isCurrent: true,
    type: 'management',
    description: {
      fa: 'هدایت و راهبری کلیه امور آموزشی، تربیتی، پرورشی و کنکور در مقطع حساس دوره دوم متوسطه دخترانه هما.',
      en: 'Leading comprehensive academic, counseling, and college preparation operations for senior high school students.',
    },
    duties: {
      fa: [
        'برنامه‌ریزی راهبردی تحصیلی و هدایت تحصیلی پیشرفته برای کنکور سراسری و امتحانات نهایی',
        'نظارت مستمر بر عملکرد دبیران تخصصی و ارزیابی خروجی‌های یادگیری دانش‌آموزان',
        'ارتقای شاخص‌های انضباطی، بهداشت روان و آمادگی روانی دانش‌آموزان برای ورود به دانشگاه',
      ],
      en: [
        'Formulating comprehensive academic schedules and high-stakes national exam preparation pathways',
        'Monitoring specialized faculty teaching methods and evaluating student mastery milestones',
        'Fostering psychological readiness, study habits, and emotional resilience for higher education',
      ],
    },
  },
  {
    id: 'founder-girls-schools',
    role: {
      fa: 'مؤسس و نماینده حقوقی مدارس دخترانه هما',
      en: 'Founder & Legal Representative, Homa Girls’ Schools',
    },
    organization: {
      fa: 'مؤسسه فرهنگی و آموزشی هما',
      en: 'Homa Cultural & Educational Institute',
    },
    period: {
      fa: '۱۴۰۱ تاکنون',
      en: '2022 - Present',
    },
    isCurrent: true,
    type: 'founding',
    description: {
      fa: 'تأسیس زنجیره مدارس دخترانه هما در مقاطع دبستان، دوره اول و دوره دوم دبیرستان به همراه نمایندگی رسمی حقوقی.',
      en: 'Founding and legally incorporating the full continuum of Homa Girls’ campuses (Elementary, Junior High, Senior High).',
    },
    duties: {
      fa: [
        'دریافت موافقت اصولی و مجوزهای رسمی تأسیس از مراجع آموزش و پرورش کشور',
        'برنامه‌ریزی معماری فضاها، تجهیز زیرساخت‌های آزمایشگاهی، فناوری و رفاهی مدارس',
        'ساماندهی چارت سازمانی و تدوین آئین‌نامه‌های اختصاصی رفتاری و آموزشی مدارس دخترانه',
      ],
      en: [
        'Procured statutory charters, facility accreditations, and regulatory permissions',
        'Oversaw campus architectural layout, laboratory installations, and tech infrastructure',
        'Architected organizational hierarchies and custom student behavioral codes',
      ],
    },
  },
  {
    id: 'board-member-deputy-ceo',
    role: {
      fa: 'عضو هیئت مدیره و قائم مقام مدیرعامل',
      en: 'Board Member & Deputy Chief Executive Officer',
    },
    organization: {
      fa: 'مؤسسه آموزشی فرهنگی هما (وابسته به صندوق بازنشستگی هما)',
      en: 'Homa Educational & Cultural Institute (Retirement Fund Subsidiary)',
    },
    period: {
      fa: '۱۴۰۰ تاکنون',
      en: '2021 - Present',
    },
    isCurrent: true,
    type: 'executive',
    description: {
      fa: 'عضو موظف هیئت مدیره و هدایت‌کننده سیاست‌های کلان سازمانی، توسعه پایدار و نظارت بر کلیه شعب مجتمع مدارس هما.',
      en: 'Full-time executive board member formulating institutional governance, financial sustainability, and multi-campus oversight.',
    },
    duties: {
      fa: [
        'مشارکت در تصمیم‌گیری‌های کلان بودجه‌ای، سرمایه‌گذاری توسعه‌ای و تراز مالی مؤسسه',
        'پایش کلان شاخص‌های رضایت اولیا، بازدهی آموزشی و انطباق با قوانین اداری',
        'مذاکره و ارتباط راهبردی با مدیران ارشد صندوق بازنشستگی هما و وزارت آموزش و پرورش',
      ],
      en: [
        'Participating in executive capital allocation, campus investments, and annual fiscal budgets',
        'Auditing institutional stakeholder satisfaction and national regulatory compliance',
        'Conducting high-level negotiations with fund trustees and educational authorities',
      ],
    },
  },
  {
    id: 'principal-boys-elementary',
    role: {
      fa: 'مدیر دبستان پسرانه هما',
      en: 'Principal, Homa Boys’ Elementary School',
    },
    organization: {
      fa: 'دبستان پسرانه هما',
      en: 'Homa Boys’ Elementary School',
    },
    period: {
      fa: '۱۳۹۹ تا ۱۴۰۴',
      en: '2020 - 2025',
    },
    isCurrent: false,
    type: 'management',
    description: {
      fa: 'راهبری ۵ ساله دبستان پسرانه هما، ارتقای چشمگیر رتبه در منطقه ۵ و تحقق شاخص رضایت‌مندی بالای ۸۰٪.',
      en: 'Five-year tenure as Elementary Principal, driving unprecedented enrollment growth and District 5 quality ranking.',
    },
    duties: {
      fa: [
        'رشد مستمر و پایدار آمار جذب و ثبت‌نام دانش‌آموزان در دوره‌های مدیریتی متوالی',
        'تحقق شاخص رضایت‌مندی بالای ۸۰ درصدی اولیا و مراجع نظارتی از استانداردهای آموزشی',
        'پیاده‌سازی برنامه عملیاتی سالانه (Operational Plan) و نظام ارزیابی ورودی استاندارد',
      ],
      en: [
        'Led consecutive years of enrollment expansion and student retention rates',
        'Earned verified >80% parent and regulatory satisfaction ratings',
        'Instituted standard entry diagnostic protocols and comprehensive operational planning',
      ],
    },
  },
  {
    id: 'internal-director-senior-advisor',
    role: {
      fa: 'مدیر داخلی و مشاور ارشد دبستان پسرانه هما',
      en: 'Internal Director & Senior Educational Advisor',
    },
    organization: {
      fa: 'دبستان پسرانه هما',
      en: 'Homa Boys’ Elementary School',
    },
    period: {
      fa: '۱۳۹۶ تا ۱۳۹۹',
      en: '2017 - 2020',
    },
    isCurrent: false,
    type: 'management',
    description: {
      fa: 'مدیریت هماهنگی‌های اجرایی داخلی مدرسه، مشاوره به اولیا و طراحی برنامه‌های مداخله تحصیلی.',
      en: 'Directing school day-to-day internal administration, parent counseling, and student intervention programs.',
    },
    duties: {
      fa: [
        'ساماندهی فرآیندهای ثبت‌نام، بایگانی تحصیلی و ارتباطات اداری درون‌مدرسه‌ای',
        'ارائه مشاوره‌های تخصصی روان‌سنجی و تشخیصی به دانش‌آموزان دارای اختلالات یادگیری جزئی',
        'هماهنگی میان معلمان مقطع جهت یکدست‌سازی شیوه‌های تدریس و ارزیابی توصیفی',
      ],
      en: [
        'Structured administrative admissions pipelines and institutional student records',
        'Delivered psychometric evaluations for students requiring learning accommodations',
        'Aligned grade-level teaching teams with modern formative assessment methodologies',
      ],
    },
  },
];

export const educationList: EducationItem[] = [
  {
    degree: {
      fa: 'کارشناسی ارشد روان‌سنجی',
      en: 'Master of Science (M.Sc.) in Psychometrics',
    },
    institution: {
      fa: 'دانشگاه آزاد اسلامی، واحد تهران مرکزی',
      en: 'Islamic Azad University, Central Tehran Branch',
    },
    period: {
      fa: '۱۳۹۲ - ۱۳۹۴',
      en: '2013 - 2015',
    },
    field: {
      fa: 'اندازه‌گیری و سنجش ویژگی‌های شناختی، شخصیتی و ابزارهای تشخیصی',
      en: 'Psychometric Measurement, Quantitative Diagnostics & Tool Validation',
    },
    highlights: {
      fa: [
        'پایان‌نامه تخصصی در حوزه ساختار عاملی و اعتبارسنجی ابزارهای سلامت روان',
        'تسلط بر مدل‌سازی معادلات ساختاری (SEM)، تحلیل عاملی اکتشافی و تاییدی',
      ],
      en: [
        'Specialized thesis on factor structures and validity of mental health instruments',
        'Proficiency in structural equation modeling (SEM) and factor analysis',
      ],
    },
  },
  {
    degree: {
      fa: 'کارشناسی مدیریت (حوزه آموزش)',
      en: 'Bachelor of Arts (B.A.) in Educational Management',
    },
    institution: {
      fa: 'دانشگاه آزاد اسلامی',
      en: 'Islamic Azad University',
    },
    period: {
      fa: '۱۳۸۵ - ۱۳۸۹',
      en: '2006 - 2010',
    },
    field: {
      fa: 'مدیریت و برنامه‌ریزی سازمان‌های آموزشی و اصول نظارت سازمانی',
      en: 'Educational Systems Management, Institutional Leadership & Supervision',
    },
    highlights: {
      fa: [
        'مبانی بودجه‌بندی آموزشی، منابع انسانی و طراحی سازمان‌های یادگیرنده',
        'مطالعه سیستم‌های مدیریت نوین مدارس و سنجش بازدهی آموزشی',
      ],
      en: [
        'Principles of school budgeting, human resources, and learning organization design',
        'Contemporary school leadership frameworks and educational productivity audit',
      ],
    },
  },
];

export const certifications: CertificateItem[] = [
  {
    title: {
      fa: 'کاربردهای هوش مصنوعی در آموزش و تحلیل داده‌های یادگیری',
      en: 'Applications of AI in Education & Learning Data Analytics',
    },
    issuer: {
      fa: 'مؤسسه بین‌المللی Learnarnuse (دارای گواهینامه معتبر)',
      en: 'Learnarnuse International Institute (Accredited Certificate)',
    },
    credentialType: {
      fa: 'گواهی‌نامه بین‌المللی معتبر',
      en: 'International Professional Credential',
    },
    focus: {
      fa: 'تحلیل داده‌های یادگیری دانش‌آموزان، یادگیری انطباقی و ابزارهای هوشمند پایش تحصیلی',
      en: 'Predictive educational modeling, learning analytics, and adaptive AI instructional design',
    },
  },
  {
    title: {
      fa: 'اصول پیشرفته مدیریت و راهبری مدارس آینده',
      en: 'Advanced Principles of Management & Leadership in Schools of Tomorrow',
    },
    issuer: {
      fa: 'مؤسسه پژوهشی مدارس فردا (دارای گواهینامه معتبر)',
      en: 'Future Schools Research Institute (Accredited Certificate)',
    },
    credentialType: {
      fa: 'گواهی‌نامه تخصصی مدیریتی',
      en: 'Executive Leadership Credential',
    },
    focus: {
      fa: 'راهبری تحول‌گرا، مدارس داده‌محور، استانداردسازی فرآیندها و مدیریت استعدادها',
      en: 'Transformational governance, data-informed school models, and talent management',
    },
  },
];

export const academicPublication: PublicationItem = {
  title: {
    fa: 'بررسی ویژگی‌های روان‌سنجی پرسشنامه سلامت روان مثبت (PMHQ) و رابطه آن با بهزیستی روان‌شناختی در جامعه ایرانی',
    en: 'Investigating the Psychometric Properties of Positive Mental Health Questionnaire (PMHQ) and its Relationship with Psychological Well-Being in Iranian Society',
  },
  authors: {
    fa: 'دوزنده، حسنا؛ مشایخ، مریم؛ ربیعی، زینب',
    en: 'Doozandeh, Hosna; Mashayekh, Maryam; Rabiei, Zeinab',
  },
  journal: {
    fa: 'فصلنامه علمی-پژوهشی روان‌سنجی',
    en: 'Journal of Psychometrics (Peer-Reviewed Academic Quarterly)',
  },
  details: {
    fa: 'دوره ۱۴، شماره ۵۳، تابستان ۱۴۰۴، صفحات ۱۶-۲۹',
    en: 'Volume 14, Issue 53, Summer 2025 (1404), Pages 16-29',
  },
  year: '1404 (2025)',
  abstract: {
    fa: 'این پژوهش به بررسی روایی سازه، پایایی بازآزمایی و همسانی درونی پرسشنامه سلامت روان مثبت (PMHQ) در نمونه‌های جامعه ایرانی پرداخته است. نتایج تحلیل عاملی تاییدی ساختار چندبعدی سلامت روان مثبت را تایید نموده و رابطه معنادار مثبت با شاخص‌های بهزیستی روان‌شناختی را به اثبات رسانده است. این ابزار به عنوان یک معیار هنجارشده در محیط‌های آموزشی و بالینی برای ارزیابی تاب‌آوری و سلامت روان دانش‌آموزان و دانشجویان قابل بهره‌برداری است.',
    en: 'This empirical study examined construct validity, test-retest reliability, and internal consistency of the Positive Mental Health Questionnaire (PMHQ) in the Iranian population. Confirmatory factor analysis corroborated the multidimensional architecture of positive mental health, demonstrating statistically significant correlations with psychological well-being. The validated tool serves as a standardized measurement standard in educational and clinical frameworks.',
  },
  keywords: [
    'روان‌سنجی (Psychometrics)',
    'سلامت روان مثبت (PMHQ)',
    'بهزیستی روان‌شناختی',
    'تحلیل عاملی',
    'اعتبارسنجی ابزار',
  ],
};

export const extracurricularActivities: ExtracurricularItem[] = [
  {
    title: {
      fa: 'طراحی و اجرای کارگاه‌های رشد فردی و مهارت‌های زندگی دانش‌آموزی',
      en: 'Design & Facilitation of Student Personal Growth & Life Skills Workshops',
    },
    period: {
      fa: '۱۳۸۵ تا ۱۳۹۰',
      en: '2006 - 2011',
    },
    description: {
      fa: 'تدوین سرفصل‌های تربیتی، هدایت دوره‌های توانمندسازی رفتاری و ارتقای شایستگی‌های ارتباطی و شناختی دانش‌آموزان.',
      en: 'Curriculum development and clinical facilitator leadership for student behavioral empowerment, interpersonal communication, and cognitive growth.',
    },
  },
  {
    title: {
      fa: 'سنجش روان‌شناختی و توانمندسازی کودکان در معرض آسیب (مسئولیت اجتماعی)',
      en: 'Psychological Assessment & Empowerment of At-Risk Children (Specialized CSR)',
    },
    period: {
      fa: 'مستمر و تخصصی',
      en: 'Specialized Community Outreach',
    },
    description: {
      fa: 'اجرای آزمون‌های هنجارشده روان‌سنجی، ارزیابی وضعیت شناختی و پیاده‌سازی پروتکل‌های حمایتی، انطباقی و توانبخشی روانی.',
      en: 'Administering standardized psychometric tests, cognitive functioning diagnostics, and implementing adaptive supportive protocols.',
    },
  },
];
