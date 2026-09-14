import {
  Project,
  SkillItem,
  ExperienceItem,
  EducationItem,
  CertificateItem,
  PublicationItem,
  ExtracurricularItem,
  ManagerialAchievement,
  LeadershipPillar,
} from '../types';

export const personalInfo = {
  name: {
    fa: 'حسنا دوزنده',
    en: 'Hosna Doozandeh',
  },
  role: {
    fa: 'مدیر دبیرستان دخترانه هما (دوره دوم)',
    en: 'Principal, Homa Girls’ High School (Period 2)',
  },
  title: {
    fa: 'مدیر دبیرستان و روان‌شناس (سنجش و اندازه‌گیری)',
    en: 'High School Principal & Psychometrics Specialist',
  },
  subtitle: {
    fa: 'مجتمع مدارس هما | آموزش و پرورش منطقه ۵ تهران',
    en: 'Homa Schools Complex | Tehran District 5 Education Administration',
  },
  bio: {
    fa: 'دارای موافقت اصولی تأسیس مدرسه از وزارت آموزش‌وپرورش، موسس حقوقی مدارس دخترانه هما و مدیر دبیرستان دخترانه هما، با بیش از یک دهه سابقه درخشان در سازماندهی و راهبری مدارس هما در مقاطع ابتدایی و متوسطه. دارای کارشناسی ارشد روان‌شناسی (روانسنج) و کارشناسی مدیریت آموزشی و برنامه‌ریزی، با شایستگی‌های اثبات‌شده در تدوین و استقرار برنامه‌های راهبردی، بهینه‌سازی فرآیندهای مدرسه، ارزیابی عملکرد سازمانی و پایش شاخص‌های کلیدی عملکرد (KPI). متبحر در هدایت تیم‌های آموزشی، مدیریت بحران‌های سازمانی، بهبود مستمر استانداردهای یادگیری و ایجاد هم‌افزایی پایدار میان اولیا، کادر آموزشی و مراجع ذی‌ربط.',
    en: 'Holding an official Statutory School Founding Charter from the Ministry of Education, legal founder of Homa Girls’ Schools and Principal of Homa Girls’ High School, with over a decade of distinguished leadership in structuring and governing Homa schools across primary and secondary tiers. Holding an M.Sc. in Psychology (Psychometrician) and a B.A. in Educational Management & Planning, with proven competencies in formulating strategic operational plans, optimizing school workflows, organizational performance evaluation, and monitoring Key Performance Indicators (KPIs). Highly skilled in leading pedagogical teams, crisis resolution, continuous learning standard optimization, and establishing lasting trust and synergy among parents, academic staff, and supervisory bodies.',
  },
  contact: {
    email: 'doozandehhosna@gmail.com',
    website: 'douzandeh.ir',
    websiteUrl: 'https://douzandeh.ir',
    location: {
      fa: 'تهران، منطقه ۵',
      en: 'Tehran, District 5',
    },
    birthYear: {
      fa: '۱۳۶۰',
      en: '1981',
    },
    photoUrl: './profile.jpg',
  },
  keyMetrics: [
    {
      value: '۱۰+',
      label: { fa: 'سال سابقه راهبری در مجتمع مدارس هما', en: 'Years Leading Homa Educational Complex' },
    },
    {
      value: '۳',
      label: { fa: 'مقطع تحصیلی تأسیس‌شده دخترانه هما', en: 'Girls’ School Campuses Founded' },
    },
    {
      value: '۸۰٪+',
      label: { fa: 'شاخص رضایت‌مندی اولیا و مراجع نظارتی', en: 'Parent & Inspectorate Satisfaction' },
    },
    {
      value: '۱',
      label: { fa: 'مقاله علمی پژوهشی در فصلنامه روان‌سنجی', en: 'Peer-Reviewed Psychometric Paper' },
    },
  ],
};

export const highSchoolPillars: LeadershipPillar[] = [
  {
    id: 'academic-rigor-konkur',
    title: {
      fa: 'راهبری جامع آموزشی و کنکور سراسری',
      en: 'Academic Rigor & College Prep Governance',
    },
    subtitle: {
      fa: 'آمادگی تحصیلی دوره دوم متوسطه',
      en: 'Senior High School Academic Pacing',
    },
    description: {
      fa: 'طراحی نظام‌مند تقویم آموزشی، انتخاب اساتید برجسته کنکور و هدایت تحصیلی هدفمند دانش‌آموزان دختر برای کسب رتبه‌های برتر آزمون سراسری و امتحانات نهایی.',
      en: 'Curating structured curricula, elite faculty recruitment, and strategic academic counseling ensuring girls’ mastery in national entrance exams and diploma finals.',
    },
    iconName: 'GraduationCap',
  },
  {
    id: 'psychometrics-mental-health',
    title: {
      fa: 'سنجش روان‌سنجی و ارتقای سلامت روان (PMHQ)',
      en: 'Psychometrics & Positive Mental Health (PMHQ)',
    },
    subtitle: {
      fa: 'روان‌شناسی تخصصی سنجش و اندازه‌گیری',
      en: 'Scientific Assessment & Diagnostics',
    },
    description: {
      fa: 'به‌کارگیری ابزارهای روان‌سنجی استاندارد جهت شناسایی نقاط قوت شناختی، مدیریت اضطراب امتحان و پایش بهزیستی روان‌شناختی دانش‌آموزان در دوران بلوغ و کنکور.',
      en: 'Deploying standardized psychometric diagnostics to identify cognitive strengths, mitigate test anxiety, and enhance adolescent psychological well-being.',
    },
    iconName: 'Activity',
  },
  {
    id: 'life-skills-ethics',
    title: {
      fa: 'پرورش هویت، اخلاق حرفه‌ای و توانمندسازی دختران',
      en: 'Identity, Ethical Leadership & Girls’ Empowerment',
    },
    subtitle: {
      fa: 'تربیت نسل کارآفرین و خودباور',
      en: 'Holistic Character & Self-Efficacy',
    },
    description: {
      fa: 'آموزش فنون مذاکره، مدیریت استرس، کارگروهی و تصمیم‌گیری راهبردی برای آماده‌سازی دختران به عنوان رهبران و متخصصان فردای جامعه.',
      en: 'Fostering negotiation prowess, emotional resilience, collaborative teamwork, and ethical leadership to shape confident future women professionals.',
    },
    iconName: 'ShieldCheck',
  },
  {
    id: 'stakeholder-parent-synergy',
    title: {
      fa: 'هم‌افزایی پایدار مدرسه، اولیا و مراجع منطقه ۵',
      en: 'Strategic School-Parent Synergy & District Compliance',
    },
    subtitle: {
      fa: 'شفافیت و ارتباط اثربخش با ذینفعان',
      en: 'Trust, Transparency & Accountability',
    },
    description: {
      fa: 'ارتباط مستمر و اقناعی با انجمن اولیا و مربیان، شفافیت سازمانی و رعایت دقیق اسناد بالادستی و ضوابط نظارتی آموزش و پرورش منطقه ۵ تهران با شاخص رضایت >۸۰٪.',
      en: 'Open, transparent engagement with parent bodies and strict compliance with Ministry directives, sustaining >80% documented stakeholder trust.',
    },
    iconName: 'Users',
  },
];

export const managerialAchievements: ManagerialAchievement[] = [
  {
    id: 'enrollment-growth',
    title: {
      fa: 'رشد مستمر و پایدار آمار جذب و ثبت‌نام دانش‌آموزان',
      en: 'Continuous & Sustainable Student Enrollment Growth',
    },
    description: {
      fa: 'دستیابی به حداکثر ظرفیت پذیرش دانش‌آموزی در دوره‌های متوالی مدیریتی و ایجاد تقاضای پایدار خانواده‌های نخبه و متقاضی کیفیت.',
      en: 'Achieved full enrollment quotas across consecutive managerial tenures, cultivating high demand among quality-oriented families.',
    },
    metric: 'رشد پایدار',
    badge: {
      fa: 'توسعه سازمانی',
      en: 'Institutional Scale',
    },
  },
  {
    id: 'satisfaction-index',
    title: {
      fa: 'تحقق شاخص رضایت‌مندی بالای ۸۰ درصدی اولیا و مراجع نظارتی',
      en: 'Attainment of >80% Stakeholder & Regulatory Satisfaction',
    },
    description: {
      fa: 'ثبت بالاترین نمرات ارزیابی در نظرسنجی‌های دوره‌ای اولیا و گزارش‌های بازرسی اداره آموزش و پرورش منطقه ۵ از استانداردهای آموزشی و تربیتی.',
      en: 'Recorded premier evaluation scores in periodic parent audits and District 5 supervisory reviews regarding pedagogical quality and ethics.',
    },
    metric: '۸۰٪+',
    badge: {
      fa: 'تضمین کیفیت',
      en: 'Quality Assurance',
    },
  },
  {
    id: 'elite-faculty-recruitment',
    title: {
      fa: 'گزینش، استقرار و ارتقای شایستگی‌های حرفه‌ای کادر نخبه',
      en: 'Recruiting, Onboarding & Professional Growth of Elite Faculty',
    },
    description: {
      fa: 'استقرار کادر آموزشی و اداری مجرب، استقرار انضباط سازمانی مبتنی بر احترام متقابل و اجرای برنامه‌های مستمر توانمندسازی معلمان.',
      en: 'Established high-performing instructional and administrative teams, instilled organizational discipline, and enacted continuous teacher development.',
    },
    metric: 'کادر نخبه',
    badge: {
      fa: 'سرمایه انسانی',
      en: 'Human Capital',
    },
  },
  {
    id: 'annual-operational-plan',
    title: {
      fa: 'طراحی و استقرار برنامه عملیاتی سالانه (OP) و نظام ارزیابی ورودی',
      en: 'Design & Deployment of Annual Operational Plan (OP) & Intake Battery',
    },
    description: {
      fa: 'پیاده‌سازی سند عملیاتی مدون مبتنی بر اهداف SMART، ماتریس پایش شاخص‌های عملکردی و آزمون‌های هنجارشده روان‌سنجی در بدو ورود دانش‌آموزان.',
      en: 'Institutionalized an outcome-based operational plan with SMART goals, KPI tracking dashboards, and standardized intake diagnostic assessments.',
    },
    metric: 'سند OP',
    badge: {
      fa: 'برنامه‌ریزی راهبردی',
      en: 'Strategic Planning',
    },
  },
  {
    id: 'district-ranking-elevation',
    title: {
      fa: 'ارتقای رتبه ارزیابی عملکرد مدرسه در سطح آموزش و پرورش منطقه',
      en: 'Elevation of School Performance Ranking Across District Inspectorates',
    },
    description: {
      fa: 'کسب رتبه‌های برتر منطقه‌ای در ارزیابی‌های جامع سالانه آموزش و پرورش با استقرار رویکرد بهبود مستمر فرآیندها و استانداردهای اعتباربخشی.',
      en: 'Attained distinguished rankings in district-wide comprehensive audits through the execution of continuous quality improvement processes.',
    },
    metric: 'رتبه برتر',
    badge: {
      fa: 'منطقه ۵ تهران',
      en: 'District 5 Tehran',
    },
  },
];

export const experiences: ExperienceItem[] = [
  {
    id: 'director-girls-high-school',
    role: {
      fa: 'مدیر دوره دوم',
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
      en: 'Leading comprehensive academic, pedagogical, counseling, and national university entrance exam operations for senior high school students.',
    },
    duties: {
      fa: [
        'برنامه‌ریزی راهبردی تحصیلی و هدایت تحصیلی پیشرفته برای کنکور سراسری و امتحانات نهایی',
        'نظارت مستمر بر عملکرد دبیران تخصصی و ارزیابی خروجی‌های یادگیری دانش‌آموزان',
        'ارتقای شاخص‌های انضباطی، بهداشت روان و آمادگی روانی دانش‌آموزان برای ورود به دانشگاه',
        'ارتباط منظم و مشاوره‌ای با خانواده‌ها جهت همسوسازی روند آموزشی با شرایط داوطلبان',
      ],
      en: [
        'Formulating comprehensive academic schedules and high-stakes national exam preparation pathways',
        'Monitoring specialized faculty teaching methods and evaluating student mastery milestones',
        'Fostering psychological readiness, study habits, and emotional resilience for higher education',
        'Maintaining regular consultations with families to synchronize academic progress with student needs',
      ],
    },
  },
  {
    id: 'founder-girls-schools',
    role: {
      fa: 'موسس مدارس دخترانه',
      en: 'Founder & Legal Representative, Homa Girls’ Schools',
    },
    organization: {
      fa: 'مؤسسه فرهنگی آموزشی هما',
      en: 'Homa Cultural & Educational Institute',
    },
    period: {
      fa: '۱۴۰۱ تاکنون',
      en: '2022 - Present',
    },
    isCurrent: true,
    type: 'founding',
    description: {
      fa: 'موسس مدارس دخترانه هما در مقاطع دبستان و دوره اول و دوم دبیرستان، و نماینده حقوقی موسسه در مراجع آموزش و پرورش.',
      en: 'Founder of Homa Girls’ Schools across Elementary, Junior High, and Senior High tiers, and statutory Legal Representative of the institute.',
    },
    duties: {
      fa: [
        'اخذ موافقت اصولی و کلیه مجوزهای رسمی تأسیس از وزارت آموزش و پرورش',
        'برنامه‌ریزی معماری فضاها، تجهیز آزمایشگاه‌ها، کتابخانه‌ها و زیرساخت‌های فناوری',
        'ساماندهی ساختار اداری و تدوین آئین‌نامه‌های انضباطی و آموزشی منطبق با اسناد بالادستی',
        'توسعه یکپارچه هویت برند آموزشی هما در مقاطع سه‌گانه دخترانه',
      ],
      en: [
        'Procured statutory charters, facility accreditations, and regulatory permissions from the Ministry of Education',
        'Oversaw campus architectural layout, laboratory installations, and tech infrastructure',
        'Architected administrative structures and student behavioral codes aligned with regulatory directives',
        'Expanded unified institutional branding across all three girls’ school tiers',
      ],
    },
  },
  {
    id: 'board-member-deputy-ceo',
    role: {
      fa: 'عضو هیئت مدیره موظف و قائم مقام مدیر عامل',
      en: 'Full-Time Executive Board Member & Deputy CEO',
    },
    organization: {
      fa: 'مؤسسه آموزش فرهنگی هما',
      en: 'Homa Educational & Cultural Institute',
    },
    period: {
      fa: '۱۴۰۰ تاکنون',
      en: '2021 - Present',
    },
    isCurrent: true,
    type: 'executive',
    description: {
      fa: 'عضو هیئت مدیره موظف و قائم‌مقام مدیرعامل در تدوین خط‌مشی‌های کلان، مدیریت بحران‌های سازمانی و نظارت عالیه بر مجتمع مدارس هما.',
      en: 'Full-time executive board member and Deputy CEO directing macro governance, crisis mediation, and top-level supervision of Homa school branches.',
    },
    duties: {
      fa: [
        'مشارکت در تصمیم‌گیری‌های کلان بودجه‌ای، سرمایه‌گذاری توسعه‌ای و تراز مالی مؤسسه',
        'پایش کلان شاخص‌های رضایت اولیا، بازدهی آموزشی و انطباق با قوانین اداری',
        'مذاکره و ارتباط راهبردی با مدیران ارشد صندوق بازنشستگی و اداره آموزش و پرورش منطقه ۵',
        'بهینه‌سازی مستمر فرآیندهای زنجیره‌ای مدارس مجتمع هما',
      ],
      en: [
        'Participating in executive capital allocation, campus investments, and annual fiscal budgets',
        'Auditing institutional stakeholder satisfaction and national regulatory compliance',
        'Conducting high-level strategic negotiations with trustees and educational authorities',
        'Continuously optimizing cross-campus operational workflows across all Homa schools',
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
      fa: 'راهبری ۵ ساله دبستان پسرانه هما، ارتقای رتبه در ارزیابی‌های منطقه ۵ و تحقق شاخص رضایت بالای ۸۰ درصدی اولیا.',
      en: 'Five-year tenure as Elementary School Principal, driving sustained enrollment growth, premier District 5 quality rankings, and >80% satisfaction.',
    },
    duties: {
      fa: [
        'رشد مستمر و پایدار آمار جذب و ثبت‌نام دانش‌آموزان در دوره‌های مدیریتی متوالی',
        'تحقق شاخص رضایت‌مندی بالای ۸۰ درصدی اولیا و مراجع نظارتی از استانداردهای آموزشی',
        'طراحی و استقرار برنامه عملیاتی سالانه (Operational Plan) و نظام ارزیابی ورودی استاندارد',
        'گزینش و توانمندسازی کادر آموزشی معلمان پایه و استقرار انضباط سازمانی',
      ],
      en: [
        'Led consecutive years of enrollment expansion and student retention rates',
        'Earned verified >80% parent and regulatory satisfaction ratings',
        'Instituted standardized intake diagnostic batteries and comprehensive annual operational plans',
        'Recruited and empowered grade-level elementary teachers while elevating school discipline',
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
      fa: 'مدیریت اجرایی داخلی مدرسه، مشاوره تحصیلی و رفتاری به خانواده‌ها و پیاده‌سازی آزمون‌های تشخیصی شناختی.',
      en: 'Directing internal school operations, delivering cognitive and behavioral consultations to families, and implementing diagnostic intake batteries.',
    },
    duties: {
      fa: [
        'ساماندهی فرآیندهای ثبت‌نام، بایگانی تحصیلی و امور انضباطی مدرسه',
        'ارائه مشاوره‌های تخصصی روان‌سنجی به دانش‌آموزان و اولیا',
        'هماهنگی جلسات گروه‌های آموزشی معلمان جهت همسوسازی رویکردهای تدریس',
      ],
      en: [
        'Structured admissions workflows, academic archives, and school administrative routines',
        'Delivered psychometric evaluations and counseling for students and parents',
        'Facilitated faculty collaborative meetings to harmonize pedagogical approaches',
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
      fa: 'دانشگاه آزاد اسلامی، واحد تهران مرکز',
      en: 'Islamic Azad University, Central Tehran Branch',
    },
    period: {
      fa: '۱۳۹۲ – ۱۳۹۴',
      en: '2013 - 2015',
    },
    field: {
      fa: 'روان‌شناسی سنجش و اندازه‌گیری، ساخت و اعتبارسنجی آزمون‌ها',
      en: 'Psychometrics, Measurement & Evaluation, Test Construction & Validation',
    },
    highlights: {
      fa: [
        'پایان‌نامه تخصصی در حوزه ساختار عاملی و اعتبارسنجی ابزارهای سلامت روان',
        'تسلط بر مدل‌سازی معادلات ساختاری (SEM) و تحلیل عاملی اکتشافی و تاییدی',
      ],
      en: [
        'Specialized research on factor structures and validity of positive mental health instruments',
        'Proficiency in structural equation modeling (SEM) and factor analysis',
      ],
    },
  },
  {
    degree: {
      fa: 'کارشناسی مدیریت برنامه‌ریزی آموزشی',
      en: 'Bachelor of Arts (B.A.) in Educational Planning & Management',
    },
    institution: {
      fa: 'دانشگاه آزاد اسلامی، واحد تهران مرکز',
      en: 'Islamic Azad University, Central Tehran Branch',
    },
    period: {
      fa: '۱۳۸۷ – ۱۳۸۹',
      en: '2008 - 2010',
    },
    field: {
      fa: 'برنامه‌ریزی آموزشی، نظارت سازمانی، مدیریت منابع انسانی مدارس',
      en: 'Educational Systems Planning, School Governance & Human Resources',
    },
    highlights: {
      fa: [
        'مبانی تدوین سند برنامه عملیاتی سالانه (OP) و ارزیابی کیفیت در مدارس',
        'روش‌های نوین سازماندهی و مدیریت مؤسسات آموزشی',
      ],
      en: [
        'Principles of school operational planning and educational quality assurance',
        'Modern school organization and institutional human capital management',
      ],
    },
  },
  {
    degree: {
      fa: 'کاردانی علوم تربیتی',
      en: 'Associate Degree (A.A.) in Educational Sciences',
    },
    institution: {
      fa: 'دانشگاه آزاد اسلامی، واحد تهران مرکز',
      en: 'Islamic Azad University, Central Tehran Branch',
    },
    period: {
      fa: '۱۳۸۵ – ۱۳۸۷',
      en: '2006 - 2008',
    },
    field: {
      fa: 'مبانی روان‌شناسی رشد، روش‌ها و فنون تدریس، اصول تعلیم و تربیت',
      en: 'Developmental Psychology, Instructional Methodologies & Child Pedagogy',
    },
    highlights: {
      fa: [
        'روان‌شناسی رشد کودک و نوجوان و روش‌های تدریس تعاملی',
        'مبانی سنجش و ارزشیابی پیشرفت تحصیلی',
      ],
      en: [
        'Child and adolescent developmental psychology and interactive pedagogy',
        'Foundations of academic progress assessment and classroom evaluation',
      ],
    },
  },
];

export const certifications: CertificateItem[] = [
  {
    title: {
      fa: 'اصول پیشرفته مدیریت و راهبری مدارس آینده',
      en: 'Advanced Principles of Management & Leadership in Schools of Tomorrow',
    },
    issuer: {
      fa: 'مؤسسه پژوهشی مدارس فردا',
      en: 'Future Schools Research Institute',
    },
    credentialType: {
      fa: 'گواهینامه تخصصی مدیریتی',
      en: 'Executive Leadership Credential',
    },
    focus: {
      fa: 'راهبری مدارس تحول‌آفرین، استانداردهای اعتباربخشی، مدیریت هوشمند و ارتقای کیفیت',
      en: 'Transformational school leadership, accreditation standards, and future-ready institutions',
    },
  },
  {
    title: {
      fa: 'اخلاق حرفه‌ای در مدیریت',
      en: 'Professional Ethics in Educational Management',
    },
    issuer: {
      fa: 'دکتر محسن طباطبایی',
      en: 'Dr. Mohsen Tabatabaei',
    },
    credentialType: {
      fa: 'گواهینامه تخصصی',
      en: 'Professional Certification',
    },
    focus: {
      fa: 'موازین اخلاق سازمانی، تعهد حرفه‌ای، ایجاد اعتماد پایدار میان ارکان مدرسه و اولیا',
      en: 'Organizational ethics, professional integrity, and institutional stakeholder trust',
    },
  },
  {
    title: {
      fa: 'کارگاه مهارت‌های مدیریت استرس',
      en: 'Stress Management & Coping Strategies Workshop',
    },
    issuer: {
      fa: 'دکتر مختاری',
      en: 'Dr. Mokhtari',
    },
    credentialType: {
      fa: 'گواهینامه کارگاهی تخصصی',
      en: 'Specialized Workshop Certificate',
    },
    focus: {
      fa: 'تکنیک‌های تنظیم هیجان، کنترل استرس شغلی کادر آموزشی و مدیریت اضطراب داوطلبان کنکور',
      en: 'Emotional regulation, teacher occupational stress mitigation, and student exam anxiety',
    },
  },
  {
    title: {
      fa: 'اصول و فنون مذاکره',
      en: 'Principles & Techniques of Effective Negotiation',
    },
    issuer: {
      fa: 'دکتر محسن طباطبایی',
      en: 'Dr. Mohsen Tabatabaei',
    },
    credentialType: {
      fa: 'گواهینامه تخصصی مدیریتی',
      en: 'Executive Negotiation Credential',
    },
    focus: {
      fa: 'مذاکره اقناعی با اولیا، تعامل راهبردی با بازرسان و مراجع بالادستی و حل تعارضات سازمانی',
      en: 'Persuasive negotiation with parents, administrative authorities, and conflict mediation',
    },
  },
  {
    title: {
      fa: 'فرزندپروری و ارتباط موثر با کودک',
      en: 'Effective Parenting & Child Communication',
    },
    issuer: {
      fa: 'دکتر معصومه موسوی',
      en: 'Dr. Masoumeh Mousavi',
    },
    credentialType: {
      fa: 'گواهینامه تخصصی روان‌شناختی',
      en: 'Specialized Counseling Credential',
    },
    focus: {
      fa: 'روان‌شناسی تعامل با نوجوانان و کودکان، مشاوره‌های حمایتی به اولیا و هماهنگی خانه و مدرسه',
      en: 'Adolescent and child relational psychology, parent counseling, and home-school alignment',
    },
  },
  {
    title: {
      fa: 'مدیریت استراتژیک',
      en: 'Strategic Management & Organizational Direction',
    },
    issuer: {
      fa: 'دکتر محسن طباطبایی',
      en: 'Dr. Mohsen Tabatabaei',
    },
    credentialType: {
      fa: 'گواهینامه تخصصی',
      en: 'Strategic Leadership Certification',
    },
    focus: {
      fa: 'تدوین مدل‌های استراتژیک، پایش KPI، تحلیل SWOT سازمانی و مدیریت توسعه پایدار مدارس',
      en: 'Strategic model formulation, KPI tracking, organizational SWOT analysis, and sustainable growth',
    },
  },
];

export const skillsList: SkillItem[] = [
  {
    name: {
      fa: 'برنامه‌ریزی راهبردی و تدوین سند عملیاتی آموزشی',
      en: 'Strategic Planning & Educational Operational Plan (OP)',
    },
    category: 'leadership',
    level: 98,
    description: {
      fa: 'تدوین سند عملیاتی سالانه (OP)، تنظیم تقویم اجرایی و همسوسازی اهداف آموزشی با اسناد بالادستی',
      en: 'Formulating annual operational plans (OP), executive calendars, and aligning academic targets',
    },
    tags: ['سند عملیاتی OP', 'سند تحول بنیادین', 'برنامه‌ریزی راهبردی'],
  },
  {
    name: {
      fa: 'مدیریت و توانمندسازی سرمایه‌های انسانی',
      en: 'Human Capital Leadership & Talent Development',
    },
    category: 'leadership',
    level: 95,
    description: {
      fa: 'گزینش، استقرار و ارتقای شایستگی‌های حرفه‌ای کادر نخبه آموزشی و اداری و انضباط سازمانی',
      en: 'Recruitment, onboarding, and professional development of elite pedagogical faculty and staff',
    },
    tags: ['گزینش کادر نخبه', 'توانمندسازی معلمان', 'انضباط سازمانی'],
  },
  {
    name: {
      fa: 'طراحی و پایش شاخص‌های کلیدی عملکرد (KPI)',
      en: 'Design & Monitoring of Key Performance Indicators (KPI)',
    },
    category: 'analytics',
    level: 94,
    description: {
      fa: 'پایش کمّی و کیفی پیشرفت تحصیلی دانش‌آموزان، عملکرد معلمان و رضایت‌مندی ذینفعان',
      en: 'Quantitative and qualitative monitoring of student mastery, faculty performance, and satisfaction',
    },
    tags: ['پایش KPI', 'داشبورد مدیریتی', 'ارزیابی عملکرد'],
  },
  {
    name: {
      fa: 'روان‌سنجی و ارزیابی ابزارهای تشخیصی و تربیتی',
      en: 'Psychometrics & Diagnostic Assessment Batteries',
    },
    category: 'psychometrics',
    level: 99,
    description: {
      fa: 'تخصص ارشد در اجرای آزمون‌های هنجارشده، سنجش اضطراب، بهزیستی روانی (PMHQ) و ارزیابی ورودی',
      en: 'Mastery in standardized norm-referenced testing, anxiety diagnostics, mental health (PMHQ), and intake batteries',
    },
    tags: ['روان‌سنجی ارشد', 'آزمون PMHQ', 'سنجش و اندازه‌گیری', 'آزمون ورودی'],
  },
  {
    name: {
      fa: 'حل مسئله سازمانی، تصمیم‌گیری و مدیریت بحران',
      en: 'Organizational Problem Solving & Crisis Resolution',
    },
    category: 'leadership',
    level: 96,
    description: {
      fa: 'مدیریت موقعیت‌های حساس مدرسه، میانجی‌گری تعارضات و اتخاذ تصمیمات فوری و اثربخش',
      en: 'Managing high-stakes contingencies, mediating disputes, and executing rapid resilient decisions',
    },
    tags: ['مدیریت بحران', 'تصمیم‌گیری تحت فشار', 'حل تعارض سازمانی'],
  },
  {
    name: {
      fa: 'راهبری یکپارچه مجتمع‌های آموزشی چندمقطعی',
      en: 'Unified Leadership of Multi-Tier Educational Campuses',
    },
    category: 'leadership',
    level: 93,
    description: {
      fa: 'ایجاد پیوستگی آموزشی و تربیتی میان مقاطع دبستان، دوره اول و دوره دوم متوسطه دخترانه هما',
      en: 'Establishing curricular and ethical continuity across elementary, junior high, and senior high tiers',
    },
    tags: ['مدارس دخترانه هما', 'پیوستگی مقاطع', 'راهبری مجتمع'],
  },
  {
    name: {
      fa: 'توسعه سازمانی و نظارت بر امور حقوقی مدارس',
      en: 'Organizational Development & Legal School Governance',
    },
    category: 'leadership',
    level: 95,
    description: {
      fa: 'نمایندگی حقوقی مؤسسه، اخذ موافقت اصولی و مجوزهای تأسیس از مراجع وزارت آموزش و پرورش',
      en: 'Statutory institutional representation, founding charter procurement, and ministry licensing',
    },
    tags: ['موافقت اصولی تأسیس', 'نماینده حقوقی', 'مجوزهای آموزش‌وپرورش'],
  },
  {
    name: {
      fa: 'مذاکره اثربخش و مدیریت ارتباط با ذینفعان و اولیا',
      en: 'Persuasive Negotiation & Stakeholder Engagement',
    },
    category: 'leadership',
    level: 97,
    description: {
      fa: 'ارتباط همدلانه و متقاعدکننده با اولیای دانش‌آموزان، مراجع نظارتی و بازرسان منطقه ۵ با رضایت >۸۰٪',
      en: 'Empathetic diplomacy sustaining >80% satisfaction rates across parent bodies and district auditors',
    },
    tags: ['رضایت اولیا >۸۰٪', 'ارتباط با ذینفعان', 'مذاکره اقناعی'],
  },
  {
    name: {
      fa: 'بهینه‌سازی و بهبود مستمر فرآیندهای آموزشی',
      en: 'Continuous Process Improvement & Pedagogical Optimization',
    },
    category: 'analytics',
    level: 92,
    description: {
      fa: 'شناسایی و حذف گلوگاه‌های آموزشی، تقویت هدایت تحصیلی و استقرار حلقه‌های بهبود مستمر',
      en: 'Identifying operational bottlenecks, reinforcing academic counseling, and continuous feedback loops',
    },
    tags: ['بهبود مستمر فرآیندها', 'کایزن آموزشی', 'تضمین کیفیت'],
  },
  {
    name: {
      fa: 'تسلط بر اسناد بالادستی و مقررات آموزش و پرورش',
      en: 'Mastery of Ministry of Education Directives & Regulations',
    },
    category: 'leadership',
    level: 96,
    description: {
      fa: 'اشراف کامل بر سند تحول بنیادین، آئین‌نامه‌های اجرایی و انضباطی مدارس و بخشنامه‌های منطقه ۵',
      en: 'Full command of national educational master charters, school disciplinary codes, and district circulars',
    },
    tags: ['سند تحول بنیادین', 'مقررات آموزش‌وپرورش', 'منطقه ۵ تهران'],
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
    fa: 'دوره ۱۴، شماره ۵۳، تابستان ۱۴۰۴، صفحات ۱۶–۲۹',
    en: 'Volume 14, Issue 53, Summer 2025 (1404), Pages 16–29',
  },
  year: '۱۴۰۴ (2025)',
  abstract: {
    fa: 'این مقاله علمی-پژوهشی به بررسی دقیق ویژگی‌های روان‌سنجی، روایی سازه، ساختار عاملی تاییدی و پایایی پرسشنامه سلامت روان مثبت (PMHQ) در جامعه ایرانی پرداخته است. نتایج همبستگی معنادار مثبت میان ابعاد سلامت روان و بهزیستی روان‌شناختی را تایید کرده و این پرسشنامه را به عنوان ابزاری استاندارد، روا و پایا برای سنجش در مراکز آموزشی، دبیرستان‌ها و بالینی کشور معرفی می‌کند.',
    en: 'This peer-reviewed empirical study investigated the psychometric properties, construct validity, confirmatory factor structure, and reliability of the Positive Mental Health Questionnaire (PMHQ) within the Iranian population. Findings demonstrated statistically significant positive correlations between positive mental health dimensions and psychological well-being, validating PMHQ as a standardized diagnostic instrument for educational institutions and high schools.',
  },
  keywords: [
    'روان‌سنجی',
    'سلامت روان مثبت (PMHQ)',
    'بهزیستی روان‌شناختی',
    'تحلیل عاملی تاییدی',
    'اعتبارسنجی ابزار',
    'جامعه ایرانی',
  ],
};

export const extracurricularActivities: ExtracurricularItem[] = [
  {
    title: {
      fa: 'سنجش روان‌شناختی و توانمندسازی کودکان کار (مسئولیت اجتماعی تخصصی)',
      en: 'Psychological Assessment & Empowerment of Working Children (Specialized CSR)',
    },
    period: {
      fa: 'مستمر و تخصصی',
      en: 'Ongoing Specialized Practice',
    },
    description: {
      fa: 'اجرای آزمون‌های هنجارشده روان‌سنجی، ارزیابی وضعیت شناختی و پیاده‌سازی پروتکل‌های حمایتی، انطباقی و توانبخشی روانی.',
      en: 'Administering standardized psychometric tests, cognitive functioning diagnostics, and implementing adaptive supportive protocols.',
    },
    category: {
      fa: 'مسئولیت اجتماعی تخصصی',
      en: 'Specialized CSR',
    },
  },
];

export const languageSkills = [
  {
    language: { fa: 'فارسی', en: 'Persian (Farsi)' },
    level: { fa: 'زبان مادری / مسلط کامل', en: 'Native / Fully Fluent' },
    percentage: 100,
  },
  {
    language: { fa: 'انگلیسی', en: 'English' },
    level: { fa: 'متوسط به بالا', en: 'Upper-Intermediate' },
    percentage: 75,
  },
];
