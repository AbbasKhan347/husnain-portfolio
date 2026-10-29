import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type MouseEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  Menu,
  X,
  Mail,
  Phone,
  ExternalLink,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Sun,
  Moon,
  Database,
  ShieldCheck,
  Bug,
  Terminal,
  Smartphone,
  Globe,
  Cpu,
  FileText,
  Search,
  BookOpen,
  Settings,
  Lock,
  Unlock,
  RefreshCw,
  Award,
  Eye,
  ChevronRight,
  Wrench,
} from "lucide-react";

/* ========================================================================== */
/*  PORTFOLIO DATA — HUSNAIN ABBAS                                            */
/* ========================================================================== */

const NAV_ITEMS = [
  { id: "work", label: "Work (6)" },
  { id: "case-study", label: "Case Study" },
  { id: "experience", label: "Experience" },
  { id: "process", label: "Process" },
  { id: "about", label: "About & Skills" },
  { id: "contact", label: "Contact" },
];

const HERO_METRICS = [
  { value: "6+", label: "Production Apps Shipped", detail: "Web, AI SaaS & Flutter Mobile" },
  { value: "3-Eng", label: "Engineering Team Led", detail: "API, AI & Full-Stack Delivery" },
  { value: "Full-Stack", label: "Next.js · Flutter · Supabase", detail: "End-to-End Architecture" },
  { value: "100%", label: "Clickable Live Work", detail: "Zero Vaporware · Real Users" },
];

const PROJECTS = [
  {
    id: "arabic-words-app",
    name: "Arabic Words App",
    subtitle: "Mobile & Cloud Vocabulary Ecosystem",
    category: "mobile",
    categoryLabel: "Mobile & Full-Stack",
    badge: "FLUTTER + SUPABASE · CASE STUDY",
    accent: "cyan",
    featuredCaseStudy: true,
    tags: [
      "Dart",
      "Flutter",
      "Supabase (3 Tables)",
      "PostgreSQL RLS",
      "Offline Cache + Sync",
      "Netlify Admin Panel",
      "Scheduled Notifications",
    ],
    problem:
      "Arabic students needed a fast, distraction-free vocabulary companion that works reliably on spotty mobile connections without forcing a sign-up wall—while teachers needed a secure web dashboard to publish curated words and daily schedules.",
    solution:
      "Architected a Flutter app with bottom-navigation, adaptive dark/light mode, instant diacritic-aware search, offline local caching with realtime Supabase sync, and daily scheduled notifications—paired with a 3-table PostgreSQL backend protected by Row-Level Security (RLS) and a separate authenticated Admin Web Panel deployed on Netlify.",
    impact:
      "Zero-login instant read access for students with 100% write protection via Supabase RLS, <16ms offline search, and a documented engineering bug log resolving cold-start white screens, keyboard viewport overflows, and search race conditions.",
    metrics: ["3 Relational Tables + RLS", "Offline-First + Realtime Sync", "Netlify Admin Web Panel"],
    link: "#case-study",
    isInternalCaseStudy: true,
    ctaText: "Explore Interactive Case Study & Bug Log",
  },
  {
    id: "mock-mentor",
    name: "MockMentor",
    subtitle: "AI Job Interview Simulator",
    category: "ai",
    categoryLabel: "AI Web Apps",
    badge: "LIVE ON VERCEL · AI SAAS",
    accent: "indigo",
    featuredCaseStudy: false,
    tags: ["Next.js", "Node.js", "Drizzle ORM", "AI API", "Real-Time Prompt Engine", "Vercel"],
    problem:
      "Final-year graduates and job seekers struggle to book realistic technical and behavioral mock interviews on their own schedule.",
    solution:
      "Led a 3-engineer team at NFC IET to build an autonomous AI interview simulator using Next.js, Drizzle ORM, and structured LLM prompts that adapts questions to the candidate's target role and delivers actionable scoring.",
    impact:
      "Deployed live on Vercel and adopted by students for on-demand interview practice without needing a live human mentor.",
    metrics: ["3-Person Team Led", "Role-Specific AI Prompts", "Live on Vercel"],
    link: "https://mock-mentor-sandy.vercel.app/",
    displayUrl: "mock-mentor-sandy.vercel.app",
    ctaText: "Launch MockMentor Live",
  },
  {
    id: "ai-cover-letter",
    name: "AI Cover Letter",
    subtitle: "Automated Cover Letter Generator",
    category: "ai",
    categoryLabel: "AI Web Apps",
    badge: "LIVE PRODUCTION · AI WEB APP",
    accent: "coral",
    featuredCaseStudy: false,
    tags: ["Web Application", "AI LLM Integration", "ATS Keyword Alignment", "Responsive UI"],
    problem:
      "Job applicants spend hours rewriting generic cover letters for every application, often missing critical role-specific keywords.",
    solution:
      "Built and launched a dedicated web application (aicovertletter.com) that ingests a job description and candidate profile to generate tailored, human-sounding, ATS-aligned cover letters in under 30 seconds.",
    impact:
      "Cuts application drafting time from 45 minutes to 30 seconds while maintaining persuasive storytelling and keyword accuracy.",
    metrics: ["< 30s Generation Time", "ATS Keyword Alignment", "Custom Domain Production"],
    link: "https://www.aicovertletter.com",
    displayUrl: "www.aicovertletter.com",
    ctaText: "Visit aicovertletter.com",
  },
  {
    id: "hire-ready-ai",
    name: "Hire Ready AI",
    subtitle: "Resume Builder & ATS Analyzer",
    category: "ai",
    categoryLabel: "AI Web Apps",
    badge: "LIVE ON VERCEL · CAREER TECH",
    accent: "cyan",
    featuredCaseStudy: false,
    tags: ["JavaScript (ES6+)", "HTML5", "CSS3", "AI Scoring Logic", "ATS Document Parser"],
    problem:
      "Over 75% of qualified resumes get filtered out by Applicant Tracking Systems (ATS) due to formatting errors and missing skill tokens before a recruiter ever reads them.",
    solution:
      "Engineered a free end-to-end resume builder, cover-letter creator, and AI-powered ATS scanner at HiTech that scores resume parseability and highlights missing keywords in real time.",
    impact:
      "Empowers candidates to audit and fix their resumes against ATS parsing rules prior to submitting applications.",
    metrics: ["3-in-1 Career Suite", "Real-Time ATS Scoring", "Zero Paywall Friction"],
    link: "https://hireready-ai-puce.vercel.app/",
    displayUrl: "hireready-ai-puce.vercel.app",
    ctaText: "Launch Hire Ready AI",
  },
  {
    id: "qari-liaqat",
    name: "Qari Liaqat Portfolio",
    subtitle: "Educator & Personal Brand Platform",
    category: "client",
    categoryLabel: "Client & Brand Portfolios",
    badge: "LIVE CLIENT SITE · UI/UX",
    accent: "indigo",
    featuredCaseStudy: false,
    tags: ["UI/UX Design", "Brand Identity", "Responsive Web", "Typography Hierarchy", "Vercel"],
    problem:
      "An established educator needed a trustworthy, modern digital presence to showcase credentials and onboard international students seamlessly across mobile and desktop.",
    solution:
      "Designed and developed a bespoke, fast-loading web portfolio with clear visual hierarchy, accessible typography, and frictionless student inquiry pathways.",
    impact:
      "Elevated brand credibility for international students and streamlined direct enrollment inquiries.",
    metrics: ["100% Mobile Responsive", "High-Trust Brand UI", "Live on Vercel"],
    link: "https://qari-liaqat.vercel.app/",
    displayUrl: "qari-liaqat.vercel.app",
    ctaText: "Visit Qari Liaqat Site",
  },
  {
    id: "toosi-tailor",
    name: "Toosi Tailor",
    subtitle: "Bespoke Craftsmanship & Digital Storefront",
    category: "client",
    categoryLabel: "Client & Brand Portfolios",
    badge: "LIVE CLIENT SITE · E-COMMERCE UI",
    accent: "coral",
    featuredCaseStudy: false,
    tags: ["Product Design", "Visual Storytelling", "Mobile-First Frontend", "Conversion UX", "Vercel"],
    problem:
      "A bespoke tailoring business relied solely on word-of-mouth and lacked a modern digital storefront to showcase custom garments and capture client bookings.",
    solution:
      "Crafted a sleek, editorial-style digital showcase and service catalog tailored for mobile visitors, highlighting fabric craftsmanship, service tiers, and direct booking actions.",
    impact:
      "Transformed a traditional local tailoring brand into a polished digital experience ready for modern clientele.",
    metrics: ["Mobile-First Storefront", "Editorial Brand Aesthetic", "Live on Vercel"],
    link: "https://toositailor.vercel.app/",
    displayUrl: "toositailor.vercel.app",
    ctaText: "Visit Toosi Tailor Site",
  },
];

const ARABIC_SAMPLE_WORDS = [
  {
    id: 1,
    arabic: "بَصِيرَة",
    transliteration: "Baṣīrah",
    meaning: "Deep insight, discernment, and clarity of perception",
    root: "ب - ص - ر",
    category: "Quranic & Wisdom",
    example: "عَلَىٰ بَصِيرَةٍ — Upon clear insight and sure knowledge",
  },
  {
    id: 2,
    arabic: "إِتْقَان",
    transliteration: "Itqān",
    meaning: "Mastery, precision, and excellence in craftsmanship",
    root: "ت - ق - ن",
    category: "Work & Ethics",
    example: "Architecting software with Itqān means zero shortcuts in security or UX.",
  },
  {
    id: 3,
    arabic: "سَكِينَة",
    transliteration: "Sakīnah",
    meaning: "Profound tranquility, serenity, and inner peace",
    root: "س - ك - ن",
    category: "Heart & Mind",
    example: "A calm, clutter-free interface brings Sakīnah to daily study.",
  },
  {
    id: 4,
    arabic: "هِمَّة",
    transliteration: "Himmah",
    meaning: "High resolve, relentless ambition, and determination",
    root: "ه - م - م",
    category: "Character",
    example: "Shipping full-stack products from scratch requires unwavering Himmah.",
  },
  {
    id: 5,
    arabic: "تَدَبُّر",
    transliteration: "Tadabbur",
    meaning: "Deep reflection, contemplation, and pondering",
    root: "د - ب - ر",
    category: "Quranic & Wisdom",
    example: "Daily scheduled notifications encourage consistent Tadabbur.",
  },
];

const BUG_LOG = [
  {
    id: "BUG-01",
    title: "Cold-Start White Screen on Offline / Slow Network Launch",
    severity: "CRITICAL · P0",
    component: "Flutter Bootloader & Supabase Init",
    symptom:
      "Launching the Flutter APK on a device with airplane mode or unstable 3G hung on a blank white screen before the first frame rendered.",
    rootCause:
      "`await Supabase.initialize()` and initial remote table fetch were awaited unguarded inside `main()` prior to `runApp()`, blocking Flutter's widget tree mount whenever DNS lookup timed out.",
    solution:
      "Called `WidgetsFlutterBinding.ensureInitialized()`, hydrated the UI immediately from the local SQLite/SharedPreferences offline cache, wrapped `Supabase.initialize()` in a non-blocking timeout boundary, and attached a background realtime sync listener once connectivity resumed.",
    metric: "Cold-start time dropped from ∞ (timeout) to < 380ms offline",
    codeSnippet: `void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final cachedWords = await LocalCache.loadWords(); // Instant <50ms
  runApp(ArabicWordsApp(initialWords: cachedWords));
  // Non-blocking cloud hydration & realtime channel subscription
  SupabaseService.initAndSyncInBackground();
}`,
  },
  {
    id: "BUG-02",
    title: "Soft Keyboard Viewport Overflow & Bottom-Nav Collision",
    severity: "HIGH · P1",
    component: "Search & Filter Scaffold Layout",
    symptom:
      "Tapping the Arabic/English search bar on compact 16:9 Android screens triggered a yellow-and-black `RenderFlex overflowed by 48 pixels` banner as the soft keyboard pushed the bottom navigation bar upward.",
    rootCause:
      "A fixed-height `Column` inside the `Scaffold` body combined with `resizeToAvoidBottomInset: true` compressed the vocabulary header and filter chips below their minimum intrinsic height.",
    solution:
      "Refactored the screen to use `CustomScrollView` with `SliverPersistentHeader` for the search bar, applied dynamic bottom padding via `MediaQuery.viewInsetsOf(context).bottom`, and auto-dismissed keyboard focus on scroll via `ScrollViewKeyboardDismissBehavior.onDrag`.",
    metric: "Zero layout overflows across 320px–430px viewports",
    codeSnippet: `Scaffold(
  resizeToAvoidBottomInset: true,
  body: SafeArea(
    child: CustomScrollView(
      keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
      slivers: [SliverSearchHeader(), SliverWordList(words: filtered)],
    ),
  ),
)`,
  },
  {
    id: "BUG-03",
    title: "Search Race Condition & Arabic Diacritics (Harakat) Mismatch",
    severity: "HIGH · P1",
    component: "Search Engine & Realtime Sync Stream",
    symptom:
      "Typing quickly in the search box caused flickering results from out-of-order async queries, and searching plain Arabic letters (e.g., 'بصيرة') failed to match vocalized database entries ('بَصِيرَة').",
    rootCause:
      "Every `onChanged` keystroke fired an unthrottled query while simultaneously rebuilding the stream listener, and string comparison didn't normalize Unicode Arabic diacritical marks (`\\u064B-\\u065F`).",
    solution:
      "Implemented a 250ms debounce timer coupled with a Unicode normalization helper (`stripHarakat()`) that indexes both vocalized and unvocalized stems in memory, enabling instant O(n) local filtering even while offline.",
    metric: "100% match accuracy with & without Harakat at 60fps",
    codeSnippet: `String normalizeArabic(String input) {
  final harakatRegex = RegExp(r'[\\u064B-\\u065F\\u0670]');
  return input.replaceAll(harakatRegex, '').replaceAll('أ', 'ا').trim().toLowerCase();
}`,
  },
];

const SUPABASE_TABLES = [
  {
    name: "public.words",
    purpose: "Core Arabic vocabulary entries, root letters, translations & examples",
    columns: ["id (uuid, PK)", "arabic_text (text)", "normalized_stem (text)", "transliteration (text)", "meaning_en (text)", "category_id (uuid, FK)", "updated_at (timestamptz)"],
    rlsStudent: "SELECT using (is_published = true) — No login required",
    rlsAdmin: "INSERT / UPDATE / DELETE using (auth.role() = 'authenticated' AND is_admin(auth.uid()))",
  },
  {
    name: "public.categories",
    purpose: "Structured thematic groupings (Quranic, Ethics, Daily Life, Grammar)",
    columns: ["id (uuid, PK)", "slug (text, unique)", "title_en (text)", "title_ar (text)", "icon_name (text)", "sort_order (int4)"],
    rlsStudent: "SELECT using (true) — Public read access for instant app boot",
    rlsAdmin: "ALL using (auth.jwt() ->> 'role' = 'admin')",
  },
  {
    name: "public.daily_schedules",
    purpose: "Word-of-the-Day queue driving scheduled local & push notifications",
    columns: ["id (uuid, PK)", "word_id (uuid, FK -> words.id)", "scheduled_date (date, unique)", "notification_note (text)", "created_by (uuid)"],
    rlsStudent: "SELECT using (scheduled_date <= current_date + 7) — Prefetches 7-day offline notification queue",
    rlsAdmin: "ALL using (auth.role() = 'authenticated')",
  },
];

const EXPERIENCE = [
  {
    role: "Programming Skills Lead",
    company: "NFC Institute of Engineering & Technology",
    location: "Multan, Pakistan",
    date: "Jan 2025 — Sep 2025",
    badge: "Leadership & AI Architecture",
    points: [
      "Spearheaded a 3-member engineering squad across backend API design, database modeling (Drizzle ORM), and full-stack delivery of the flagship final-year AI product.",
      "Architected and launched MockMentor (mock-mentor-sandy.vercel.app), an AI-powered interview practice platform that earned top faculty & student evaluation scores.",
      "Established code review standards, Git branching workflows, and prompt-engineering guardrails that reduced integration bugs before production release.",
    ],
  },
  {
    role: "Web Developer",
    company: "HiTech",
    location: "Hybrid / Remote",
    date: "Aug 2024 — Jan 2025",
    badge: "Full-Stack Web & Career Tech",
    points: [
      "Designed, built, and deployed multiple responsive web applications with high-contrast, conversion-focused user interfaces.",
      "Created Hire Ready AI (hireready-ai-puce.vercel.app) — a complete resume builder, cover-letter generator, and ATS resume analyzer used by job seekers.",
      "Optimized frontend bundle rendering, DOM performance, and form validation logic, cutting bug reports and improving user completion rates.",
    ],
  },
  {
    role: "Application Developer",
    company: "MegaMind",
    location: "Multan, Pakistan",
    date: "Jan 2024 — Jun 2024",
    badge: "UI Engineering & App Delivery",
    points: [
      "Developed and shipped multiple modular web and mobile mini-applications, honing rapid prototyping and component reusability.",
      "Collaborated closely with designers and product stakeholders in Agile sprints to translate wireframes into responsive, accessible interfaces.",
      "Implemented interactive UI features and state management improvements that boosted session engagement.",
    ],
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery, Schema & Security Architecture",
    subtitle: "Think like a Systems Architect & UX Researcher",
    desc: "Before writing UI code, I map the user journey, relational database schema (Supabase PostgreSQL / Drizzle ORM), and security boundaries (Row-Level Security policies so public readers and authenticated admins never collide).",
    deliverables: ["3-Table Relational Schema", "RLS Security Policies", "User Flows & Wireframes"],
  },
  {
    num: "02",
    title: "High-Craft UI & Adaptive Design Systems",
    subtitle: "Think like a Senior Product Designer",
    desc: "Every screen is engineered with deliberate typography, 8pt spatial grids, and adaptive Dark/Light tokens. Whether it's a Flutter bottom-nav app or a SaaS web dashboard, visual hierarchy guides the user effortlessly.",
    deliverables: ["Dark & Light Theme Tokens", "Responsive Component System", "WCAG AA Contrast"],
  },
  {
    num: "03",
    title: "Full-Stack, Offline-First & AI Engineering",
    subtitle: "Think like a Lead Frontend & Mobile Engineer",
    desc: "I build with production resilience: offline local caching paired with realtime cloud sync in Flutter, structured LLM prompt pipelines in Next.js, and separate admin control panels on Netlify/Vercel.",
    deliverables: ["Next.js / Flutter Codebase", "Offline Cache + Realtime Sync", "AI API Integration"],
  },
  {
    num: "04",
    title: "Bug Squashing, QA & Edge Deployment",
    subtitle: "Think like a Release Engineer",
    desc: "Real engineering shows in how you debug edge cases—resolving cold-start white screens, soft-keyboard viewport overflows, and search debounce race conditions before shipping to Vercel, Netlify, and mobile devices.",
    deliverables: ["Documented Bug Resolution Log", "ATS & Lighthouse Optimization", "CI/CD Edge Deployment"],
  },
];

const SKILLS = [
  {
    group: "Mobile & Cross-Platform Ecosystem",
    icon: "smartphone",
    items: [
      "Dart",
      "Flutter",
      "Bottom-Nav Architecture",
      "Offline Cache & Realtime Sync",
      "Scheduled Local Notifications",
      "Adaptive Dark/Light Themes",
      "Netlify Admin Panels",
    ],
  },
  {
    group: "Frontend & Modern Web",
    icon: "globe",
    items: [
      "React.js",
      "Next.js",
      "JavaScript (ES6+)",
      "HTML5 & Semantic SEO",
      "CSS3 / Tailwind CSS",
      "Responsive UI Engineering",
      "Design Systems",
    ],
  },
  {
    group: "Backend, Database & Cloud Security",
    icon: "database",
    items: [
      "Supabase (PostgreSQL)",
      "Row-Level Security (RLS)",
      "Node.js",
      "Drizzle ORM",
      "RESTful APIs",
      "Vercel & Netlify CI/CD",
    ],
  },
  {
    group: "AI Engineering, Languages & Workflow",
    icon: "cpu",
    items: [
      "AI / LLM API Integration",
      "ATS Scoring & Document Parsing",
      "Prompt Engineering",
      "Python",
      "Java",
      "C++",
      "Agile Team Leadership",
    ],
  },
];

const EDUCATION = [
  {
    deg: "BS Computer Science",
    school: "NFC Institute of Engineering & Technology (NFC-IET)",
    year: "2025",
    highlight: "Final-Year Project Lead · Built MockMentor AI Interview Platform",
  },
  {
    deg: "Intermediate in Pre-Engineering",
    school: "Higher Secondary School Alipur",
    year: "2019",
    highlight: "Mathematics, Physics & Analytical Foundations",
  },
  {
    deg: "Matriculation (Science)",
    school: "Zamir Public School",
    year: "2017",
    highlight: "Computer Science & Sciences",
  },
];

const CERTS = [
  { name: "Flutter App Development", meta: "MindLuster · Verified 2024", tag: "Mobile Engineering" },
  { name: "Communication Skill Mastery", meta: "MindLuster · Verified 2025", tag: "Client & Team Leadership" },
  { name: "Google Ads Campaign Specialist", meta: "Govt. Hoonhaar Jawan Program · 2026", tag: "Growth & Conversion" },
];

/* ========================================================================== */
/*  MAIN PORTFOLIO COMPONENT                                                  */
/* ========================================================================== */

export default function App() {
  // Theme: "dark" (Linear Obsidian) or "blueprint" (Architectural Paper)
  const [theme, setTheme] = useState("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Hero Interactive Card Tab: "ats" | "telemetry" | "endpoints"
  const [heroTab, setHeroTab] = useState("ats");

  // Project Filter: "all" | "ai" | "mobile" | "client"
  const [projectFilter, setProjectFilter] = useState("all");

  // Case Study Interactive State (Arabic Words App + Admin Panel + Bug Log)
  const [caseStudyTab, setCaseStudyTab] = useState("simulator"); // "simulator" | "architecture" | "bugs"
  const [caseStudyModalOpen, setCaseStudyModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // Interactive Flutter App Simulator State
  const [flutterTab, setFlutterTab] = useState("words"); // "words" | "search" | "settings"
  const [flutterDark, setFlutterDark] = useState(true);
  const [flutterSearch, setFlutterSearch] = useState("");
  const [dailyNotifEnabled, setDailyNotifEnabled] = useState(true);
  const [wordsList, setWordsList] = useState(ARABIC_SAMPLE_WORDS);

  // Interactive Netlify Admin Panel Simulator State
  const [adminLoggedIn, setAdminLoggedIn] = useState(true);
  const [newWordAr, setNewWordAr] = useState("");
  const [newWordTrans, setNewWordTrans] = useState("");
  const [newWordEn, setNewWordEn] = useState("");
  const [adminStatusMsg, setAdminStatusMsg] = useState(
    "RLS Policy Active: Admin JWT verified. Ready to write to public.words."
  );

  // Interactive Terminal State
  const [terminalCmd, setTerminalCmd] = useState("whoami");

  // Contact Form & Copy Email State
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactProjectType, setContactProjectType] = useState("Full-Stack Web / AI App");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

const heroRef = useRef<HTMLElement | null>(null);

  // Cursor spotlight handler
  const handleHeroMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  // Scroll spy for navigation
  useEffect(() => {
    const sectionIds = ["home", "work", "case-study", "experience", "process", "about", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText("husnainabbas7299@gmail.com");
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2600);
  };

  // Normalize Arabic diacritics for the live Flutter search demo
  const normalizeArabic = (str: string) =>
    str
      .replace(/[\u064B-\u065F\u0670]/g, "")
      .replace(/[أإآ]/g, "ا")
      .toLowerCase()
      .trim();

  const filteredFlutterWords = wordsList.filter((w) => {
    if (!flutterSearch.trim()) return true;
    const q = normalizeArabic(flutterSearch);
    return (
      normalizeArabic(w.arabic).includes(q) ||
      w.transliteration.toLowerCase().includes(q) ||
      w.meaning.toLowerCase().includes(q) ||
      w.category.toLowerCase().includes(q)
    );
  });

  // Handle Netlify Admin Panel word insertion into simulated Supabase + Flutter realtime sync
  const handleAdminAddWord = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!adminLoggedIn) {
      setAdminStatusMsg(
        "403 RLS BLOCKED: Anonymous role cannot INSERT into public.words (Students have SELECT-only permission)."
      );
      return;
    }
    if (!newWordAr.trim() || !newWordEn.trim()) {
      setAdminStatusMsg("Validation: Please provide both an Arabic word and English meaning.");
      return;
    }
    const created = {
      id: Date.now(),
      arabic: newWordAr.trim(),
      transliteration: newWordTrans.trim() || "Al-Kalimah",
      meaning: newWordEn.trim(),
      root: "Added via Netlify Admin",
      category: "Realtime Synced",
      example: "Synced live from Netlify Admin Panel -> Supabase RLS -> Flutter Offline Cache",
    };
    setWordsList((prev) => [created, ...prev]);
    setNewWordAr("");
    setNewWordTrans("");
    setNewWordEn("");
    setAdminStatusMsg(
      `201 CREATED: "${created.arabic}" written to public.words & pushed via Supabase Realtime to Flutter app!`
    );
  };

  const filteredProjects = PROJECTS.filter((p) =>
    projectFilter === "all" ? true : p.category === projectFilter
  );

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[${contactProjectType}] Inquiry from ${contactForm.name || "Portfolio Visitor"}`
    );
    const body = encodeURIComponent(
      `Hi Husnain,\n\nProject Type: ${contactProjectType}\n\n${contactForm.message}\n\nBest regards,\n${contactForm.name}\n${contactForm.email}`
    );
    window.open(`mailto:husnainabbas7299@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setContactSent(true);
  };

  return (
    <div className={`ha-portfolio theme-${theme}`}>
      <style>{PORTFOLIO_CSS}</style>

      {/* ================================================================== */}
      {/* STICKY NAVIGATION BAR                                              */}
      {/* ================================================================== */}
      <header className="ha-nav">
        <div className="ha-wrap ha-nav-inner">
          <button
            className="ha-brand"
            onClick={() => scrollToSection("home")}
            aria-label="Go to top"
          >
            <span className="ha-brand-mark">HA</span>
            <span className="ha-brand-text">
              <span className="ha-brand-name">Husnain Abbas</span>
              <span className="ha-brand-role">Full-Stack · Flutter · AI</span>
            </span>
          </button>

          <nav className="ha-nav-links" aria-label="Primary Navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`ha-nav-link ${activeSection === item.id ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="ha-nav-actions">
            <button
              className="ha-theme-btn"
              onClick={() => setTheme((t) => (t === "dark" ? "blueprint" : "dark"))}
              title={
                theme === "dark"
                  ? "Switch to Blueprint Paper Mode"
                  : "Switch to Linear Dark Mode"
              }
              aria-label="Toggle color theme"
            >
              {theme === "dark" ? (
                <>
                  <Sun size={14} /> <span>Blueprint</span>
                </>
              ) : (
                <>
                  <Moon size={14} /> <span>Dark UI</span>
                </>
              )}
            </button>

            <button
              className="ha-resume-btn"
              onClick={() => setResumeModalOpen(true)}
            >
              <FileText size={14} /> <span>ATS Resume</span>
            </button>

            <button
              className="ha-cta-btn-sm"
              onClick={() => scrollToSection("contact")}
            >
              <span>Let&apos;s Talk</span> <ArrowRight size={14} />
            </button>

            <button
              className="ha-mobile-toggle"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="ha-mobile-drawer">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="ha-mobile-link"
              >
                <span>{item.label}</span>
                <ChevronRight size={16} />
              </button>
            ))}
            <div className="ha-mobile-drawer-footer">
              <button
                className="ha-btn ha-btn-secondary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setResumeModalOpen(true);
                }}
              >
                <FileText size={15} /> View ATS-Optimized Resume
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ================================================================== */}
        {/* 1. HERO SECTION                                                    */}
        {/* ================================================================== */}
        <section
          id="home"
          className="ha-hero"
          ref={heroRef}
          onMouseMove={handleHeroMouseMove}
        >
          <span className="ha-blob ha-blob-1" aria-hidden="true" />
          <span className="ha-blob ha-blob-2" aria-hidden="true" />

          <div className="ha-wrap ha-hero-grid">
            {/* Left Column: Positioning, Copy & CTAs */}
            <div className="ha-hero-left">
              <div className="ha-status-pill">
                <span className="ha-status-dot" />
                <span>
                  Available for remote roles &amp; international freelance · Response &lt; 24h
                </span>
              </div>

              <p className="ha-eyebrow">
                FULL-STACK WEB, FLUTTER &amp; AI PRODUCT ENGINEER · MULTAN, PAKISTAN
              </p>

              <h1 className="ha-hero-title">
                Engineering <span className="ha-grad-text">AI web apps</span>,{" "}
                <span className="ha-grad-text">Flutter ecosystems</span>, and
                high-converting digital products.
              </h1>

              <p className="ha-hero-sub">
                I&apos;m <strong>Husnain Abbas</strong>. Over the past 2+ years, I&apos;ve
                architected and shipped <strong>6+ production products</strong>—from
                AI interview simulators and ATS resume engines to offline-first{" "}
                <strong>Flutter mobile apps</strong> backed by{" "}
                <strong>Supabase Row-Level Security</strong> and{" "}
                <strong>Netlify admin panels</strong>.
              </p>

              <div className="ha-hero-chips">
                {[
                  "Next.js & React",
                  "Dart & Flutter",
                  "Supabase PostgreSQL + RLS",
                  "AI / LLM Integrations",
                  "UI/UX & Product Strategy",
                ].map((chip) => (
                  <span key={chip} className="ha-chip">
                    {chip}
                  </span>
                ))}
              </div>

              <div className="ha-hero-ctas">
                <button
                  className="ha-btn ha-btn-primary"
                  onClick={() => scrollToSection("work")}
                >
                  <span>Explore 6 Live Projects</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  className="ha-btn ha-btn-secondary"
                  onClick={() => scrollToSection("case-study")}
                >
                  <Smartphone size={16} />
                  <span>Arabic App Case Study</span>
                </button>
                <button
                  className="ha-btn ha-btn-ghost"
                  onClick={handleCopyEmail}
                  title="Copy husnainabbas7299@gmail.com"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={15} />
                      <span>Copied Email!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={15} />
                      <span>husnainabbas7299@gmail.com</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Recruiter & ATS Telemetry Card */}
            <div className="ha-hero-right">
              <div className="ha-fig-bar">
                <span>FIG. 01 — INTERACTIVE SYSTEM &amp; RECRUITER TELEMETRY</span>
                <span>LIVE v2.6</span>
              </div>

              <div className="ha-telemetry-card">
                <span className="ha-corner tl" />
                <span className="ha-corner tr" />
                <span className="ha-corner bl" />
                <span className="ha-corner br" />

                {/* Interactive Switcher inside Hero Card */}
                <div className="ha-telemetry-tabs" role="tablist">
                  <button
                    role="tab"
                    aria-selected={heroTab === "ats"}
                    className={`ha-telemetry-tab ${heroTab === "ats" ? "active" : ""}`}
                    onClick={() => setHeroTab("ats")}
                  >
                    <ShieldCheck size={13} /> ATS &amp; Profile
                  </button>
                  <button
                    role="tab"
                    aria-selected={heroTab === "endpoints"}
                    className={`ha-telemetry-tab ${heroTab === "endpoints" ? "active" : ""}`}
                    onClick={() => setHeroTab("endpoints")}
                  >
                    <Globe size={13} /> Live Links (6)
                  </button>
                  <button
                    role="tab"
                    aria-selected={heroTab === "telemetry"}
                    className={`ha-telemetry-tab ${heroTab === "telemetry" ? "active" : ""}`}
                    onClick={() => setHeroTab("telemetry")}
                  >
                    <Cpu size={13} /> Architecture
                  </button>
                </div>

                {/* TAB 1: ATS SCANNER VIEW */}
                {heroTab === "ats" && (
                  <div className="ha-telemetry-body">
                    <div className="ha-scan-beam" aria-hidden="true" />
                    <div className="ha-doc-header">
                      <div>
                        <div className="ha-doc-name">HUSNAIN ABBAS</div>
                        <div className="ha-doc-role">
                          BSCS (NFC-IET) · FULL-STACK, FLUTTER &amp; AI ENGINEER
                        </div>
                      </div>
                      <span className="ha-score-pill">ATS 98/100</span>
                    </div>

                    <div className="ha-ats-bars">
                      <div className="ha-ats-row">
                        <div className="ha-ats-label">
                          <span>Full-Stack Web (Next.js, React, Node, Drizzle)</span>
                          <span>96%</span>
                        </div>
                        <div className="ha-ats-track">
                          <div className="ha-ats-fill" style={{ width: "96%" }} />
                        </div>
                      </div>
                      <div className="ha-ats-row">
                        <div className="ha-ats-label">
                          <span>Mobile &amp; Cloud (Flutter, Dart, Supabase RLS)</span>
                          <span>95%</span>
                        </div>
                        <div className="ha-ats-track">
                          <div className="ha-ats-fill" style={{ width: "95%" }} />
                        </div>
                      </div>
                      <div className="ha-ats-row">
                        <div className="ha-ats-label">
                          <span>AI Product Engineering &amp; ATS Systems</span>
                          <span>98%</span>
                        </div>
                        <div className="ha-ats-track">
                          <div className="ha-ats-fill" style={{ width: "98%" }} />
                        </div>
                      </div>
                    </div>

                    <div className="ha-doc-chip-row">
                      {[
                        "FLUTTER + SUPABASE",
                        "NEXT.JS",
                        "DRIZZLE ORM",
                        "POSTGRES RLS",
                        "OFFLINE SYNC",
                        "NETLIFY ADMIN",
                      ].map((c, idx) => (
                        <span
                          className="ha-doc-chip"
                          key={c}
                          style={{ animationDelay: `${idx * 0.15}s` }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>

                    <div className="ha-telemetry-footer">
                      <button
                        className="ha-inline-link"
                        onClick={() => setResumeModalOpen(true)}
                      >
                        <Eye size={13} /> Inspect Full ATS-Optimized Resume
                      </button>
                      <div className="ha-stamp">
                        HIRE
                        <br />
                        READY
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: CLICKABLE LIVE ENDPOINTS right in the Hero! */}
                {heroTab === "endpoints" && (
                  <div className="ha-telemetry-body">
                    <p className="ha-telemetry-note">
                      Click any production endpoint below to test live work immediately:
                    </p>
                    <div className="ha-endpoint-list">
                      <button
                        className="ha-endpoint-item"
                        onClick={() => scrollToSection("case-study")}
                      >
                        <span className="ha-ep-dot mobile" />
                        <span className="ha-ep-info">
                          <strong>Arabic Words App (Flutter + Supabase)</strong>
                          <small>Interactive Simulator + Netlify Admin + Bug Log</small>
                        </span>
                        <ArrowRight size={14} />
                      </button>

                      <a
                        className="ha-endpoint-item"
                        href="https://mock-mentor-sandy.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="ha-ep-dot live" />
                        <span className="ha-ep-info">
                          <strong>MockMentor — AI Interview Simulator</strong>
                          <small>mock-mentor-sandy.vercel.app</small>
                        </span>
                        <ExternalLink size={14} />
                      </a>

                      <a
                        className="ha-endpoint-item"
                        href="https://www.aicovertletter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="ha-ep-dot live" />
                        <span className="ha-ep-info">
                          <strong>AI Cover Letter Generator</strong>
                          <small>www.aicovertletter.com</small>
                        </span>
                        <ExternalLink size={14} />
                      </a>

                      <a
                        className="ha-endpoint-item"
                        href="https://hireready-ai-puce.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="ha-ep-dot live" />
                        <span className="ha-ep-info">
                          <strong>Hire Ready AI — Resume &amp; ATS Analyzer</strong>
                          <small>hireready-ai-puce.vercel.app</small>
                        </span>
                        <ExternalLink size={14} />
                      </a>

                      <a
                        className="ha-endpoint-item"
                        href="https://qari-liaqat.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="ha-ep-dot client" />
                        <span className="ha-ep-info">
                          <strong>Qari Liaqat — Educator Brand Portfolio</strong>
                          <small>qari-liaqat.vercel.app</small>
                        </span>
                        <ExternalLink size={14} />
                      </a>

                      <a
                        className="ha-endpoint-item"
                        href="https://toositailor.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="ha-ep-dot client" />
                        <span className="ha-ep-info">
                          <strong>Toosi Tailor — Bespoke Storefront</strong>
                          <small>toositailor.vercel.app</small>
                        </span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                )}

                {/* TAB 3: ARCHITECTURE TELEMETRY */}
                {heroTab === "telemetry" && (
                  <div className="ha-telemetry-body">
                    <div className="ha-arch-mini-grid">
                      <div className="ha-arch-box">
                        <span className="ha-arch-tag">MOBILE CLIENT</span>
                        <h4>Flutter + Dart</h4>
                        <p>
                          Bottom-nav UX, dark/light themes, debounced search, local notifications &amp; SQLite/SharedPreferences offline cache.
                        </p>
                      </div>
                      <div className="ha-arch-box">
                        <span className="ha-arch-tag">CLOUD &amp; SECURITY</span>
                        <h4>Supabase + RLS</h4>
                        <p>
                          3 relational tables with strict Row-Level Security: anonymous student read access + authenticated admin-only writes.
                        </p>
                      </div>
                      <div className="ha-arch-box">
                        <span className="ha-arch-tag">WEB &amp; AI SAAS</span>
                        <h4>Next.js + Netlify/Vercel</h4>
                        <p>
                          AI interview simulations, ATS resume scoring, and dedicated Netlify Admin Web Dashboards.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="ha-fig-bar sub">
                <span>VERIFIED PRODUCTION PORTFOLIO</span>
                <span>CLICK TABS ABOVE TO INSPECT</span>
              </div>
            </div>
          </div>

          {/* Social Proof Metrics Strip */}
          <div className="ha-wrap">
            <div className="ha-metrics-strip">
              {HERO_METRICS.map((m) => (
                <div className="ha-metric-cell" key={m.label}>
                  <div className="ha-metric-val">{m.value}</div>
                  <div className="ha-metric-lbl">{m.label}</div>
                  <div className="ha-metric-det">{m.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Infinite Tech Stack Ticker */}
          <div className="ha-ticker" aria-hidden="true">
            <div className="ha-ticker-track">
              {[0, 1].map((loop) => (
                <span key={loop}>
                  FLUTTER &amp; DART &nbsp;·&nbsp; SUPABASE POSTGRESQL &nbsp;·&nbsp;
                  ROW-LEVEL SECURITY (RLS) &nbsp;·&nbsp; OFFLINE CACHE + REALTIME SYNC
                  &nbsp;·&nbsp; NEXT.JS &amp; REACT &nbsp;·&nbsp; NODE.JS &amp; DRIZZLE ORM
                  &nbsp;·&nbsp; AI API INTEGRATION &nbsp;·&nbsp; ATS RESUME SCORING
                  &nbsp;·&nbsp; VERCEL &amp; NETLIFY CI/CD &nbsp;·&nbsp; UI/UX PRODUCT
                  DESIGN &nbsp;·&nbsp;
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 2. FEATURED WORK — ALL 6 CLICKABLE PROJECTS                        */}
        {/* ================================================================== */}
        <section id="work" className="ha-section">
          <div className="ha-wrap">
            <div className="ha-section-head">
              <div>
                <p className="ha-eyebrow">SELECTED PRODUCTION WORK (6)</p>
                <h2 className="ha-h2">
                  Every project shipped, live, and clickable.
                </h2>
              </div>

              {/* Filter Tabs */}
              <div className="ha-filter-bar" role="tablist" aria-label="Filter projects by category">
                {[
                  { id: "all", label: "All Work (6)" },
                  { id: "ai", label: "AI Web Apps (3)" },
                  { id: "mobile", label: "Flutter & Supabase (1)" },
                  { id: "client", label: "Client & Brand Sites (2)" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={projectFilter === tab.id}
                    className={`ha-filter-btn ${projectFilter === tab.id ? "active" : ""}`}
                    onClick={() => setProjectFilter(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="ha-projects-grid">
              {filteredProjects.map((proj) => {
                const isInternal = proj.isInternalCaseStudy;
                const CardTag = isInternal ? "div" : "a";
                const cardProps = isInternal
                  ? {
                      role: "button",
                      tabIndex: 0,
                      onClick: () => scrollToSection("case-study"),
onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    scrollToSection("case-study");
  }
},
                    }
                  : {
                      href: proj.link,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    };

                return (
                  <CardTag
                    key={proj.id}
                    className={`ha-project-card accent-${proj.accent} ${
                      proj.featuredCaseStudy ? "ha-project-featured" : ""
                    }`}
                    {...cardProps}
                  >
                    <div className="ha-proj-top">
                      <div>
                        <span className="ha-proj-cat">{proj.categoryLabel}</span>
                        <h3 className="ha-proj-title">
                          {proj.name}
                          <ArrowUpRight className="ha-proj-arrow" size={18} />
                        </h3>
                        <p className="ha-proj-subtitle">{proj.subtitle}</p>
                      </div>
                      <span className="ha-proj-badge">{proj.badge}</span>
                    </div>

                    {/* Problem -> Solution -> Impact Storytelling */}
                    <div className="ha-proj-story">
                      <div className="ha-story-block">
                        <span className="ha-story-key">PROBLEM</span>
                        <p>{proj.problem}</p>
                      </div>
                      <div className="ha-story-block">
                        <span className="ha-story-key">ARCHITECTURE &amp; SOLUTION</span>
                        <p>{proj.solution}</p>
                      </div>
                      <div className="ha-story-block">
                        <span className="ha-story-key">IMPACT &amp; OUTCOME</span>
                        <p>{proj.impact}</p>
                      </div>
                    </div>

                    {/* Key Metrics Row */}
                    <div className="ha-proj-metrics">
                      {proj.metrics.map((m) => (
                        <span key={m} className="ha-proj-metric-pill">
                          <CheckCircle2 size={12} /> {m}
                        </span>
                      ))}
                    </div>

                    {/* Stack Tags */}
                    <div className="ha-proj-tags">
                      {proj.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>

                    {/* Footer Action Bar */}
                    <div className="ha-proj-footer">
                      <span className="ha-proj-cta">
                        {proj.ctaText}
                        {isInternal ? <ArrowRight size={15} /> : <ExternalLink size={15} />}
                      </span>

                      {isInternal ? (
                        <button
                          type="button"
                          className="ha-proj-modal-trigger"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCaseStudyModalOpen(true);
                          }}
                        >
                          <Bug size={13} /> Quick-Read Bug Log Modal
                        </button>
                      ) : (
                        <span className="ha-proj-domain">{proj.displayUrl}</span>
                      )}
                    </div>
                  </CardTag>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 3. DEEP-DIVE ENGINEERING CASE STUDY: ARABIC WORDS APP              */}
        {/* ================================================================== */}
        <section id="case-study" className="ha-section ha-case-study-sec">
          <div className="ha-wrap">
            <div className="ha-cs-banner">
              <div className="ha-cs-header">
                <div>
                  <p className="ha-eyebrow">
                    FEATURED ENGINEERING CASE STUDY · DART FLUTTER + SUPABASE + NETLIFY
                  </p>
                  <h2 className="ha-h2" style={{ marginBottom: 10 }}>
                    Arabic Words App: Offline-First Mobile Architecture, RLS Security &amp; Bug Resolution Log
                  </h2>
                  <p className="ha-cs-lead">
                    Recruiters and senior engineers don&apos;t just want screenshots—they want to see
                    how a system handles real-world constraints: <strong>relational data integrity</strong>,{" "}
                    <strong>Row-Level Security</strong>, <strong>offline caching</strong>, and{" "}
                    <strong>debugging production edge cases</strong>. Interact with the live architecture below.
                  </p>
                </div>

                {/* Case Study Sub-Navigation */}
                <div className="ha-cs-tabs" role="tablist">
                  <button
                    role="tab"
                    aria-selected={caseStudyTab === "simulator"}
                    className={`ha-cs-tab ${caseStudyTab === "simulator" ? "active" : ""}`}
                    onClick={() => setCaseStudyTab("simulator")}
                  >
                    <Smartphone size={15} />
                    <span>1. Live App + Netlify Admin Simulator</span>
                  </button>
                  <button
                    role="tab"
                    aria-selected={caseStudyTab === "architecture"}
                    className={`ha-cs-tab ${caseStudyTab === "architecture" ? "active" : ""}`}
                    onClick={() => setCaseStudyTab("architecture")}
                  >
                    <Database size={15} />
                    <span>2. Supabase 3-Table &amp; RLS Security</span>
                  </button>
                  <button
                    role="tab"
                    aria-selected={caseStudyTab === "bugs"}
                    className={`ha-cs-tab ${caseStudyTab === "bugs" ? "active" : ""}`}
                    onClick={() => setCaseStudyTab("bugs")}
                  >
                    <Bug size={15} />
                    <span>3. Production Bug Log (3 Solved)</span>
                  </button>
                </div>
              </div>

              {/* -------------------------------------------------------------- */}
              {/* CASE STUDY TAB 1: INTERACTIVE FLUTTER + NETLIFY ADMIN SIMULATOR */}
              {/* -------------------------------------------------------------- */}
              {caseStudyTab === "simulator" && (
                <div className="ha-simulator-grid">
                  {/* Left: Interactive Flutter Phone Frame */}
                  <div className="ha-phone-column">
                    <div className="ha-sim-caption">
                      <span>FLUTTER MOBILE CLIENT (STUDENT VIEW — ZERO LOGIN REQUIRED)</span>
                      <span className="ha-sim-pill">Offline Cache + Realtime Sync</span>
                    </div>

                    <div className={`ha-phone-frame ${flutterDark ? "phone-dark" : "phone-light"}`}>
                      {/* Phone Status Bar */}
                      <div className="ha-phone-statusbar">
                        <span>9:41</span>
                        <span className="ha-phone-notch" />
                        <span>Supabase Realtime ●</span>
                      </div>

                      {/* Phone App Bar */}
                      <div className="ha-phone-appbar">
                        <div>
                          <div className="ha-phone-title">كَلِمَات — Arabic Words</div>
                          <div className="ha-phone-sub">
                            {wordsList.length} cached offline · RLS Public Read
                          </div>
                        </div>
                        <button
                          className="ha-phone-theme-btn"
                          onClick={() => setFlutterDark((d) => !d)}
                          title="Toggle Flutter Dark/Light Theme"
                        >
                          {flutterDark ? <Sun size={14} /> : <Moon size={14} />}
                        </button>
                      </div>

                      {/* Phone Body based on Bottom Nav */}
                      <div className="ha-phone-body">
                        {flutterTab === "words" && (
                          <div className="ha-phone-list">
                            {wordsList.map((w) => (
                              <div className="ha-word-card" key={w.id}>
                                <div className="ha-word-top">
                                  <span className="ha-word-cat">{w.category}</span>
                                  <span className="ha-word-root">Root: {w.root}</span>
                                </div>
                                <div className="ha-word-main">
                                  <div className="ha-word-ar">{w.arabic}</div>
                                  <div className="ha-word-trans">{w.transliteration}</div>
                                </div>
                                <p className="ha-word-en">{w.meaning}</p>
                                <p className="ha-word-ex">{w.example}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {flutterTab === "search" && (
                          <div className="ha-phone-search-view">
                            <div className="ha-phone-searchbar">
                              <Search size={14} />
                              <input
                                type="text"
                                value={flutterSearch}
                                onChange={(e) => setFlutterSearch(e.target.value)}
                                placeholder="Search Arabic (with/without Harakat) or English..."
                              />
                              {flutterSearch && (
                                <button onClick={() => setFlutterSearch("")}>
                                  <X size={13} />
                                </button>
                              )}
                            </div>
                            <div className="ha-search-meta">
                              <span>
                                Debounced 250ms · Harakat-normalized · {filteredFlutterWords.length} match(es)
                              </span>
                            </div>
                            <div className="ha-phone-list compact">
                              {filteredFlutterWords.map((w) => (
                                <div className="ha-word-card" key={w.id}>
                                  <div className="ha-word-main">
                                    <div className="ha-word-ar">{w.arabic}</div>
                                    <div className="ha-word-trans">{w.transliteration}</div>
                                  </div>
                                  <p className="ha-word-en">{w.meaning}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {flutterTab === "settings" && (
                          <div className="ha-phone-settings">
                            <div className="ha-setting-row">
                              <div>
                                <strong>Appearance (Dark / Light Mode)</strong>
                                <small>Persisted locally via SharedPreferences</small>
                              </div>
                              <button
                                className="ha-toggle-pill"
                                onClick={() => setFlutterDark((d) => !d)}
                              >
                                {flutterDark ? "Dark Mode" : "Light Mode"}
                              </button>
                            </div>

                            <div className="ha-setting-row">
                              <div>
                                <strong>Scheduled Daily Notifications</strong>
                                <small>Delivers Word-of-the-Day at 8:00 AM local time</small>
                              </div>
                              <button
                                className={`ha-toggle-pill ${dailyNotifEnabled ? "on" : ""}`}
                                onClick={() => setDailyNotifEnabled((n) => !n)}
                              >
                                {dailyNotifEnabled ? "Active (8:00 AM)" : "Paused"}
                              </button>
                            </div>

                            <div className="ha-setting-row">
                              <div>
                                <strong>Offline Cache &amp; Realtime Sync</strong>
                                <small>Hydrates in &lt;50ms offline; listens to Supabase channel</small>
                              </div>
                              <span className="ha-sync-badge">Synced</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Phone Bottom Navigation */}
                      <div className="ha-phone-bottomnav">
                        <button
                          className={flutterTab === "words" ? "active" : ""}
                          onClick={() => setFlutterTab("words")}
                        >
                          <BookOpen size={15} />
                          <span>Words</span>
                        </button>
                        <button
                          className={flutterTab === "search" ? "active" : ""}
                          onClick={() => setFlutterTab("search")}
                        >
                          <Search size={15} />
                          <span>Search</span>
                        </button>
                        <button
                          className={flutterTab === "settings" ? "active" : ""}
                          onClick={() => setFlutterTab("settings")}
                        >
                          <Settings size={15} />
                          <span>Settings</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: Netlify Admin Web Panel + RLS Security Simulator */}
                  <div className="ha-admin-column">
                    <div className="ha-sim-caption">
                      <span>SEPARATE ADMIN WEB PANEL (DEPLOYED ON NETLIFY WITH AUTH LOGIN)</span>
                      <span className="ha-sim-pill coral">Supabase RLS Protected</span>
                    </div>

                    <div className="ha-admin-panel">
                      <div className="ha-admin-topbar">
                        <div className="ha-admin-dots">
                          <span />
                          <span />
                          <span />
                        </div>
                        <span className="ha-admin-url">
                          https://arabic-words-admin.netlify.app/dashboard
                        </span>
                        <button
                          className={`ha-auth-switch ${adminLoggedIn ? "authed" : "anon"}`}
                          onClick={() => {
                            setAdminLoggedIn((a) => {
                              const next = !a;
                              setAdminStatusMsg(
                                next
                                  ? "RLS Policy Active: Admin JWT verified. Ready to write to public.words."
                                  : "Simulated Logout: Role switched to 'anon' (Student). Write operations will now be rejected by PostgreSQL RLS."
                              );
                              return next;
                            });
                          }}
                        >
                          {adminLoggedIn ? (
                            <>
                              <Lock size={12} /> Admin Logged In (JWT)
                            </>
                          ) : (
                            <>
                              <Unlock size={12} /> Unauthenticated (Anon)
                            </>
                          )}
                        </button>
                      </div>

                      <div className="ha-admin-body">
                        <h4>Publish New Vocabulary Word to Supabase (`public.words`)</h4>
                        <p className="ha-admin-desc">
                          Try adding a word below! When logged in as Admin, it writes to the
                          simulated Supabase table and immediately syncs to the Flutter app on the
                          left. Toggle the Admin auth button above to test how{" "}
                          <strong>Row-Level Security (RLS)</strong> blocks unauthorized writes.
                        </p>

                        <form className="ha-admin-form" onSubmit={handleAdminAddWord}>
                          <div className="ha-admin-inputs">
                            <label>
                              <span>Arabic Word (with Harakat)</span>
                              <input
                                type="text"
                                value={newWordAr}
                                onChange={(e) => setNewWordAr(e.target.value)}
                                placeholder="e.g. نُورٌ"
                              />
                            </label>
                            <label>
                              <span>Transliteration</span>
                              <input
                                type="text"
                                value={newWordTrans}
                                onChange={(e) => setNewWordTrans(e.target.value)}
                                placeholder="e.g. Nūr"
                              />
                            </label>
                          </div>
                          <label>
                            <span>English Meaning &amp; Context</span>
                            <input
                              type="text"
                              value={newWordEn}
                              onChange={(e) => setNewWordEn(e.target.value)}
                              placeholder="e.g. Sacred light, guidance, and illumination"
                            />
                          </label>

                          <div className="ha-admin-actions">
                            <button type="submit" className="ha-btn ha-btn-primary">
                              <Database size={14} />
                              <span>INSERT into `public.words` &amp; Sync</span>
                            </button>
                            <button
                              type="button"
                              className="ha-btn ha-btn-secondary"
                              onClick={() => {
                                setNewWordAr("إِحْسَان");
                                setNewWordTrans("Iḥsān");
                                setNewWordEn("Perfection, excellence, and beauty in action");
                              }}
                            >
                              Fill Sample Word
                            </button>
                          </div>
                        </form>

                        <div
                          className={`ha-rls-console ${
                            adminStatusMsg.startsWith("403") ? "error" : "ok"
                          }`}
                        >
                          <Terminal size={14} />
                          <span>{adminStatusMsg}</span>
                        </div>

                        {/* Architecture Highlights Checklist */}
                        <div className="ha-admin-highlights">
                          <div className="ha-hl-item">
                            <ShieldCheck size={16} />
                            <div>
                              <strong>Proper RLS Security</strong>
                              <p>
                                Students read effortlessly without login friction; only authenticated
                                admins on the Netlify portal can mutate rows.
                              </p>
                            </div>
                          </div>
                          <div className="ha-hl-item">
                            <RefreshCw size={16} />
                            <div>
                              <strong>Offline Cache + Realtime Sync</strong>
                              <p>
                                Local device storage guarantees instant boot offline, while Supabase
                                Postgres changes stream live updates.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------- */}
              {/* CASE STUDY TAB 2: SUPABASE 3-TABLE SCHEMA & RLS ARCHITECTURE   */}
              {/* -------------------------------------------------------------- */}
              {caseStudyTab === "architecture" && (
                <div className="ha-schema-view">
                  <div className="ha-schema-grid">
                    {SUPABASE_TABLES.map((tb) => (
                      <div className="ha-schema-card" key={tb.name}>
                        <div className="ha-schema-head">
                          <Database size={16} />
                          <code>{tb.name}</code>
                        </div>
                        <p className="ha-schema-purpose">{tb.purpose}</p>
                        <div className="ha-schema-cols">
                          <span className="ha-schema-label">COLUMNS &amp; RELATIONS</span>
                          <ul>
                            {tb.columns.map((c) => (
                              <li key={c}>
                                <code>{c}</code>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="ha-schema-rls">
                          <div className="ha-rls-rule read">
                            <strong>STUDENT (ANON) POLICY:</strong>
                            <span>{tb.rlsStudent}</span>
                          </div>
                          <div className="ha-rls-rule write">
                            <strong>NETLIFY ADMIN POLICY:</strong>
                            <span>{tb.rlsAdmin}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------- */}
              {/* CASE STUDY TAB 3: PRODUCTION BUG RESOLUTION LOG                */}
              {/* -------------------------------------------------------------- */}
              {caseStudyTab === "bugs" && (
                <div className="ha-bugs-view">
                  <div className="ha-bugs-intro">
                    <Wrench size={18} />
                    <p>
                      <strong>Why document bugs in a portfolio?</strong> Any developer can paste a
                      happy-path tutorial. Senior engineering is defined by diagnosing root causes
                      under real device constraints—cold starts on offline networks, soft-keyboard
                      viewport collisions, and Unicode search race conditions.
                    </p>
                  </div>

                  <div className="ha-bugs-list">
                    {BUG_LOG.map((b) => (
                      <div className="ha-bug-card" key={b.id}>
                        <div className="ha-bug-header">
                          <div className="ha-bug-id-group">
                            <span className="ha-bug-id">{b.id}</span>
                            <span className="ha-bug-sev">{b.severity}</span>
                            <span className="ha-bug-comp">{b.component}</span>
                          </div>
                          <span className="ha-bug-metric">
                            <CheckCircle2 size={13} /> {b.metric}
                          </span>
                        </div>

                        <h3 className="ha-bug-title">{b.title}</h3>

                        <div className="ha-bug-cols">
                          <div className="ha-bug-col">
                            <span className="ha-story-key">SYMPTOM HIT IN TESTING</span>
                            <p>{b.symptom}</p>
                          </div>
                          <div className="ha-bug-col">
                            <span className="ha-story-key">ROOT CAUSE DIAGNOSIS</span>
                            <p>{b.rootCause}</p>
                          </div>
                          <div className="ha-bug-col">
                            <span className="ha-story-key">ENGINEERING FIX SHIPPED</span>
                            <p>{b.solution}</p>
                          </div>
                        </div>

                        <pre className="ha-bug-code">
                          <code>{b.codeSnippet}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 4. EXPERIENCE TIMELINE                                             */}
        {/* ================================================================== */}
        <section id="experience" className="ha-section">
          <div className="ha-wrap">
            <p className="ha-eyebrow">CAREER TRACK RECORD</p>
            <h2 className="ha-h2">Where I&apos;ve led teams and shipped code.</h2>

            <div className="ha-timeline">
              {EXPERIENCE.map((exp) => (
                <div className="ha-tl-card" key={exp.role + exp.company}>
                  <div className="ha-tl-dot" />
                  <div className="ha-tl-top">
                    <div>
                      <h3 className="ha-tl-role">{exp.role}</h3>
                      <p className="ha-tl-company">
                        {exp.company} · <span>{exp.location}</span>
                      </p>
                    </div>
                    <div className="ha-tl-meta">
                      <span className="ha-tl-badge">{exp.badge}</span>
                      <span className="ha-tl-date">{exp.date}</span>
                    </div>
                  </div>
                  <ul className="ha-tl-points">
                    {exp.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 5. 4-STEP ENGINEERING & PRODUCT DESIGN PROCESS                     */}
        {/* ================================================================== */}
        <section id="process" className="ha-section">
          <div className="ha-wrap">
            <p className="ha-eyebrow">HOW I WORK</p>
            <h2 className="ha-h2">
              From schema design and wireframes to edge deployment.
            </h2>

            <div className="ha-process-grid">
              {PROCESS_STEPS.map((st) => (
                <div className="ha-process-card" key={st.num}>
                  <div className="ha-process-num">{st.num}</div>
                  <h3 className="ha-process-title">{st.title}</h3>
                  <p className="ha-process-sub">{st.subtitle}</p>
                  <p className="ha-process-desc">{st.desc}</p>
                  <div className="ha-process-deliv">
                    {st.deliverables.map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 6. ABOUT, INTERACTIVE TERMINAL, SKILLS & EDUCATION                 */}
        {/* ================================================================== */}
        <section id="about" className="ha-section">
          <div className="ha-wrap">
            <p className="ha-eyebrow">ABOUT, STACK &amp; CREDENTIALS</p>
            <h2 className="ha-h2">
              A full-stack builder who treats UI craft and backend security equally.
            </h2>

            <div className="ha-about-grid">
              {/* Interactive Terminal */}
              <div className="ha-terminal-card">
                <div className="ha-term-bar">
                  <div className="ha-admin-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="ha-term-title">husnain@multan-pk: ~/portfolio</span>
                  <div className="ha-term-cmds">
                    {[
                      { id: "whoami", label: "$ whoami" },
                      { id: "projects", label: "$ ls --live" },
                      { id: "bugs", label: "$ cat bugs.log" },
                    ].map((c) => (
                      <button
                        key={c.id}
                        className={terminalCmd === c.id ? "active" : ""}
                        onClick={() => setTerminalCmd(c.id)}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="ha-term-body">
                  {terminalCmd === "whoami" && (
                    <>
                      <p className="ha-term-prompt">$ whoami --verbose</p>
                      <p className="ha-term-out">
                        I&apos;m Husnain Abbas, a Computer Science graduate (NFC-IET, 2025) and
                        full-stack web &amp; Flutter developer based in Multan, Pakistan.
                        <br />
                        <br />
                        Most portfolios show either static Figma mockups that never shipped or
                        backend scripts with painful interfaces. I bridge that gap: I design clean,
                        high-trust interfaces and wire them to real databases (Supabase PostgreSQL,
                        Drizzle ORM), AI APIs, and offline-first mobile architectures.
                      </p>
                    </>
                  )}
                  {terminalCmd === "projects" && (
                    <>
                      <p className="ha-term-prompt">$ ls -la ./production-deployments</p>
                      <div className="ha-term-out">
                        <div>drwxr-xr-x 1. Arabic Words App (Flutter + Supabase + Netlify Admin)</div>
                        <div>drwxr-xr-x 2. https://mock-mentor-sandy.vercel.app/ (Next.js + AI)</div>
                        <div>drwxr-xr-x 3. https://www.aicovertletter.com (AI Cover Letter SaaS)</div>
                        <div>drwxr-xr-x 4. https://hireready-ai-puce.vercel.app/ (ATS Analyzer)</div>
                        <div>drwxr-xr-x 5. https://qari-liaqat.vercel.app/ (Educator Brand UI)</div>
                        <div>drwxr-xr-x 6. https://toositailor.vercel.app/ (Bespoke Storefront)</div>
                      </div>
                    </>
                  )}
                  {terminalCmd === "bugs" && (
                    <>
                      <p className="ha-term-prompt">$ cat ./arabic-words-app/bugs-resolved.log</p>
                      <div className="ha-term-out">
                        <div>[RESOLVED] BUG-01: Cold-start white screen fixed via offline cache hydration prior to runApp().</div>
                        <div>[RESOLVED] BUG-02: Soft-keyboard RenderFlex overflow fixed via Sliver layout &amp; viewInsets.</div>
                        <div>[RESOLVED] BUG-03: Search race condition fixed with 250ms debounce &amp; Arabic Harakat normalization.</div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Quick Spec Sheet */}
              <dl className="ha-spec-sheet">
                <div className="ha-spec-row">
                  <dt>LOCATION</dt>
                  <dd>Multan, Pakistan (UTC+5 · Remote Worldwide)</dd>
                </div>
                <div className="ha-spec-row">
                  <dt>CORE STACK</dt>
                  <dd>Next.js, React, Flutter/Dart, Supabase (RLS), Node.js</dd>
                </div>
                <div className="ha-spec-row">
                  <dt>EDUCATION</dt>
                  <dd>BS Computer Science · NFC-IET (2025)</dd>
                </div>
                <div className="ha-spec-row">
                  <dt>LEADERSHIP</dt>
                  <dd>Programming Skills Lead (3-Person Engineering Team)</dd>
                </div>
                <div className="ha-spec-row">
                  <dt>LANGUAGES</dt>
                  <dd>English (Professional), Urdu (Native), Arabic</dd>
                </div>
                <div className="ha-spec-row">
                  <dt>AVAILABILITY</dt>
                  <dd className="ha-spec-live">Immediate for Remote Roles &amp; Freelance</dd>
                </div>
              </dl>
            </div>

            {/* Skills Matrix */}
            <div className="ha-skills-grid">
              {SKILLS.map((group) => (
                <div className="ha-skill-card" key={group.group}>
                  <div className="ha-skill-head">
                    {group.icon === "smartphone" && <Smartphone size={16} />}
                    {group.icon === "globe" && <Globe size={16} />}
                    {group.icon === "database" && <Database size={16} />}
                    {group.icon === "cpu" && <Cpu size={16} />}
                    <h3>{group.group}</h3>
                  </div>
                  <div className="ha-skill-chips">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Education & Certifications */}
            <div className="ha-edu-cert-grid">
              <div className="ha-edu-box">
                <p className="ha-eyebrow">ACADEMIC FOUNDATION</p>
                {EDUCATION.map((ed) => (
                  <div className="ha-edu-row" key={ed.deg}>
                    <div>
                      <h4>{ed.deg}</h4>
                      <p className="ha-edu-school">{ed.school}</p>
                      <p className="ha-edu-hl">{ed.highlight}</p>
                    </div>
                    <span className="ha-edu-year">{ed.year}</span>
                  </div>
                ))}
              </div>

              <div className="ha-cert-box">
                <p className="ha-eyebrow">VERIFIED CERTIFICATIONS</p>
                <div className="ha-cert-stack">
                  {CERTS.map((c) => (
                    <div className="ha-cert-row" key={c.name}>
                      <span className="ha-cert-icon">
                        <Award size={16} />
                      </span>
                      <div>
                        <div className="ha-cert-top">
                          <h4>{c.name}</h4>
                          <span className="ha-cert-tag">{c.tag}</span>
                        </div>
                        <p>{c.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 7. CONVERSION-OPTIMIZED CONTACT SECTION                            */}
        {/* ================================================================== */}
        <section id="contact" className="ha-section">
          <div className="ha-wrap">
            <div className="ha-contact-box">
              <div className="ha-contact-left">
                <p className="ha-eyebrow">START A CONVERSATION</p>
                <h2 className="ha-h2">
                  Ready to ship your next web app, Flutter product, or AI feature?
                </h2>
                <p className="ha-contact-lead">
                  Whether you&apos;re a hiring manager looking for an product-minded full-stack
                  engineer or a founder needing an end-to-end build, send a note below. I respond
                  within 24 hours.
                </p>

                <div className="ha-contact-cards">
                  <div className="ha-contact-item">
                    <Mail size={18} />
                    <div className="ha-contact-item-body">
                      <span className="ha-contact-lbl">DIRECT EMAIL</span>
                      <a href="mailto:husnainabbas7299@gmail.com">
                        husnainabbas7299@gmail.com
                      </a>
                    </div>
                    <button
                      className="ha-copy-mini"
                      onClick={handleCopyEmail}
                      title="Copy email address"
                    >
                      {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>

                  <a className="ha-contact-item" href="tel:+923281154678">
                    <Phone size={18} />
                    <div className="ha-contact-item-body">
                      <span className="ha-contact-lbl">PHONE / WHATSAPP</span>
                      <span>+92 328 1154678</span>
                    </div>
                    <ArrowUpRight size={15} />
                  </a>

                  <a
                    className="ha-contact-item"
                    href="https://www.linkedin.com/in/hasnain-abbas-24a237211"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
    
                    <div className="ha-contact-item-body">
                      <span className="ha-contact-lbl">LINKEDIN PROFILE</span>
                      <span>linkedin.com/in/hasnain-abbas-24a237211</span>
                    </div>
                    <ExternalLink size={15} />
                  </a>
                </div>

                {/* All Live Project Quick-Launch Links */}
                <div className="ha-quick-links-box">
                  <span className="ha-contact-lbl">ALL LIVE PRODUCTION LINKS</span>
                  <div className="ha-quick-links-row">
                    <a
                      href="https://mock-mentor-sandy.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      MockMentor <ExternalLink size={11} />
                    </a>
                    <a
                      href="https://www.aicovertletter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      AI Cover Letter <ExternalLink size={11} />
                    </a>
                    <a
                      href="https://hireready-ai-puce.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Hire Ready AI <ExternalLink size={11} />
                    </a>
                    <a
                      href="https://qari-liaqat.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Qari Liaqat <ExternalLink size={11} />
                    </a>
                    <a
                      href="https://toositailor.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Toosi Tailor <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: Interactive Inquiry Form */}
              <form className="ha-contact-form" onSubmit={handleContactSubmit}>
                <span className="ha-form-label">WHAT ARE WE BUILDING TOGETHER?</span>
                <div className="ha-type-chips">
                  {[
                    "Full-Stack Web / AI App",
                    "Flutter + Supabase Mobile App",
                    "UI/UX & Brand Portfolio",
                    "Remote Full-Time Role",
                  ].map((type) => (
                    <button
                      type="button"
                      key={type}
                      className={`ha-type-chip ${
                        contactProjectType === type ? "active" : ""
                      }`}
                      onClick={() => setContactProjectType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <label className="ha-field">
                  <span>Your Name</span>
                  <input
                    required
                    type="text"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="e.g. Sarah Chen · Hiring Manager"
                  />
                </label>

                <label className="ha-field">
                  <span>Your Email</span>
                  <input
                    required
                    type="email"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="you@company.com"
                  />
                </label>

                <label className="ha-field">
                  <span>Project Scope, Timeline, or Role Details</span>
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Tell me about your product goals, tech stack, or role..."
                  />
                </label>

                <button type="submit" className="ha-btn ha-btn-primary ha-submit-btn">
                  <span>
                    {contactSent
                      ? "Opening Email Client with Your Message..."
                      : "Send Direct Message"}
                  </span>
                  <Send size={15} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ==================================================================== */}
      {/* FOOTER                                                               */}
      {/* ==================================================================== */}
      <footer className="ha-footer">
        <div className="ha-wrap ha-footer-inner">
          <div>
            <p>
              © {new Date().getFullYear()} Husnain Abbas · Engineered with React, Linear Dark &amp;
              Blueprint Paper Themes.
            </p>
          </div>
          <div className="ha-footer-actions">
            <button onClick={() => setResumeModalOpen(true)}>ATS Resume</button>
            <button onClick={() => scrollToSection("home")}>
              Back to top <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </footer>

      {/* ==================================================================== */}
      {/* MODAL 1: ATS-OPTIMIZED GOOGLE-LEVEL RESUME MODAL                     */}
      {/* ==================================================================== */}
      {resumeModalOpen && (
        <div
          className="ha-modal-backdrop"
          onClick={() => setResumeModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="ATS Optimized Resume"
        >
          <div className="ha-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="ha-modal-header">
              <div>
                <span className="ha-eyebrow" style={{ marginBottom: 4 }}>
                  ATS-OPTIMIZED RESUME · SCORE 98/100
                </span>
                <h3>Husnain Abbas — Full-Stack Web, Flutter &amp; AI Developer</h3>
              </div>
              <div className="ha-modal-actions">
                <button
                  className="ha-btn ha-btn-secondary"
                  onClick={() => window.print()}
                >
                  Print / Save PDF
                </button>
                <button
                  className="ha-modal-close"
                  onClick={() => setResumeModalOpen(false)}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="ha-modal-body ha-resume-sheet">
              <div className="ha-res-top">
                <div>
                  <h2>HUSNAIN ABBAS</h2>
                  <p>
                    Full-Stack Web, Flutter Mobile &amp; AI Product Engineer · Multan, Pakistan
                  </p>
                </div>
                <div className="ha-res-contact">
                  <span>husnainabbas7299@gmail.com</span>
                  <span>+92 328 1154678</span>
                  <span>linkedin.com/in/hasnain-abbas-24a237211</span>
                </div>
              </div>

              <div className="ha-res-section">
                <h4>SUMMARY</h4>
                <p>
                  Results-driven Full-Stack Web &amp; Flutter Mobile Engineer (BSCS, 2025) with 2+
                  years of experience architecting, securing, and deploying 6+ production web and
                  mobile applications. Proven track record leading a 3-person engineering team,
                  integrating LLM/AI APIs, designing 3-table Supabase PostgreSQL schemas with strict
                  Row-Level Security (RLS), and building offline-first mobile apps paired with
                  Netlify admin dashboards.
                </p>
              </div>

              <div className="ha-res-section">
                <h4>TECHNICAL SKILLS</h4>
                <p>
                  <strong>Mobile &amp; Cloud:</strong> Dart, Flutter, Supabase (PostgreSQL, Row-Level
                  Security, Realtime Sync), Offline Caching, Scheduled Notifications, Netlify Admin
                  Panels.
                  <br />
                  <strong>Web &amp; Backend:</strong> Next.js, React.js, Node.js, Drizzle ORM,
                  JavaScript (ES6+), HTML5, CSS3, REST APIs, Vercel.
                  <br />
                  <strong>AI &amp; Core Languages:</strong> AI/LLM API Integration, ATS Resume
                  Parsing &amp; Scoring, Prompt Engineering, Python, Java, C++, Agile Team
                  Leadership.
                </p>
              </div>

              <div className="ha-res-section">
                <h4>SELECTED PRODUCTION PROJECTS</h4>
                <ul>
                  <li>
                    <strong>Arabic Words App (Flutter + Supabase + Netlify Admin):</strong> Built a
                    cross-platform vocabulary app with bottom-nav UX, dark/light themes, debounced
                    Harakat-insensitive search, scheduled notifications, and offline cache +
                    realtime sync over a 3-table Supabase backend with RLS (student zero-login
                    reads, admin-only writes). Documented and resolved 3 critical bugs (cold-start
                    white screen, keyboard viewport overflow, search race condition).
                  </li>
                  <li>
                    <strong>MockMentor AI (mock-mentor-sandy.vercel.app):</strong> Led a 3-engineer
                    team to ship an autonomous AI job interview simulator using Next.js, Node.js,
                    Drizzle ORM, and AI APIs.
                  </li>
                  <li>
                    <strong>AI Cover Letter (www.aicovertletter.com):</strong> Launched a live AI
                    web utility generating role-tailored, ATS-aligned cover letters in under 30
                    seconds.
                  </li>
                  <li>
                    <strong>Hire Ready AI (hireready-ai-puce.vercel.app):</strong> Engineered a free
                    resume builder, cover-letter creator, and ATS keyword analyzer.
                  </li>
                  <li>
                    <strong>Client Brand &amp; Storefront Sites:</strong> Designed and deployed{" "}
                    <strong>Qari Liaqat</strong> (qari-liaqat.vercel.app) and{" "}
                    <strong>Toosi Tailor</strong> (toositailor.vercel.app).
                  </li>
                </ul>
              </div>

              <div className="ha-res-section">
                <h4>PROFESSIONAL EXPERIENCE</h4>
                <ul>
                  <li>
                    <strong>Programming Skills Lead — NFC-IET (Jan 2025 – Sep 2025):</strong> Led a
                    3-member team across API development, Drizzle ORM modeling, and AI product
                    delivery.
                  </li>
                  <li>
                    <strong>Web Developer — HiTech (Aug 2024 – Jan 2025):</strong> Built and
                    optimized multiple production web apps including Hire Ready AI.
                  </li>
                  <li>
                    <strong>Application Developer — MegaMind (Jan 2024 – Jun 2024):</strong>{" "}
                    Delivered modular web/mobile applications in cross-functional Agile sprints.
                  </li>
                </ul>
              </div>

              <div className="ha-res-section">
                <h4>EDUCATION &amp; CERTIFICATIONS</h4>
                <p>
                  <strong>BS Computer Science</strong> — NFC Institute of Engineering &amp;
                  Technology (2025)
                  <br />
                  <strong>Certifications:</strong> Flutter App Development (MindLuster, 2024) ·
                  Communication Skill Mastery (2025) · Google Ads Campaign (Govt. Hoonhaar Jawan
                  Program, 2026)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 2: QUICK BUG LOG & CASE STUDY MODAL                            */}
      {/* ==================================================================== */}
      {caseStudyModalOpen && (
        <div
          className="ha-modal-backdrop"
          onClick={() => setCaseStudyModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Arabic Words App Engineering Bug Log"
        >
          <div className="ha-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="ha-modal-header">
              <div>
                <span className="ha-eyebrow" style={{ marginBottom: 4 }}>
                  ARABIC WORDS APP · FLUTTER + SUPABASE + NETLIFY
                </span>
                <h3>Production Bug Resolution Log (3 Critical Bugs Solved)</h3>
              </div>
              <button
                className="ha-modal-close"
                onClick={() => setCaseStudyModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className="ha-modal-body">
              <div className="ha-bugs-list">
                {BUG_LOG.map((b) => (
                  <div className="ha-bug-card" key={b.id}>
                    <div className="ha-bug-header">
                      <div className="ha-bug-id-group">
                        <span className="ha-bug-id">{b.id}</span>
                        <span className="ha-bug-sev">{b.severity}</span>
                        <span className="ha-bug-comp">{b.component}</span>
                      </div>
                      <span className="ha-bug-metric">{b.metric}</span>
                    </div>
                    <h3 className="ha-bug-title">{b.title}</h3>
                    <div className="ha-bug-cols">
                      <div className="ha-bug-col">
                        <span className="ha-story-key">SYMPTOM</span>
                        <p>{b.symptom}</p>
                      </div>
                      <div className="ha-bug-col">
                        <span className="ha-story-key">ROOT CAUSE</span>
                        <p>{b.rootCause}</p>
                      </div>
                      <div className="ha-bug-col">
                        <span className="ha-story-key">SOLUTION</span>
                        <p>{b.solution}</p>
                      </div>
                    </div>
                    <pre className="ha-bug-code">
                      <code>{b.codeSnippet}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ========================================================================== */
/*  STYLESHEET — LINEAR DARK MODE + ARCHITECTURAL BLUEPRINT PAPER MODE        */
/* ========================================================================== */

const PORTFOLIO_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
}

/* ---------- THEME 1: LINEAR / STRIPE OBSIDIAN DARK MODE ---------- */
.ha-portfolio.theme-dark {
  --bg: #080B12;
  --bg-elevated: #0E1422;
  --surface: rgba(255, 255, 255, 0.038);
  --surface-hover: rgba(255, 255, 255, 0.065);
  --surface-solid: #111829;
  --line: rgba(255, 255, 255, 0.09);
  --line-strong: rgba(56, 223, 234, 0.35);
  --text: #F4F6FB;
  --text-muted: #949DB5;
  --accent-primary: #38DFEA;
  --accent-secondary: #7C6CF0;
  --accent-warm: #FF8B66;
  --accent-success: #22C55E;
  --grad-brand: linear-gradient(135deg, #7C6CF0 0%, #38DFEA 100%);
  --btn-primary-fg: #070A10;
  --grid-line: rgba(255, 255, 255, 0.025);
  --shadow-card: 0 22px 55px -20px rgba(0, 0, 0, 0.65);
  --font-display: 'Sora', sans-serif;
}

/* ---------- THEME 2: ARCHITECTURAL BLUEPRINT PAPER MODE ---------- */
.ha-portfolio.theme-blueprint {
  --bg: #ECEEE6;
  --bg-elevated: #E2E5D8;
  --surface: rgba(251, 251, 248, 0.85);
  --surface-hover: #FFFFFF;
  --surface-solid: #FBFBF8;
  --line: rgba(16, 35, 58, 0.14);
  --line-strong: #1F5C8B;
  --text: #10233A;
  --text-muted: #46586E;
  --accent-primary: #1F5C8B;
  --accent-secondary: #123A57;
  --accent-warm: #D98218;
  --accent-success: #2C8C7C;
  --grad-brand: linear-gradient(135deg, #1F5C8B 0%, #2C8C7C 100%);
  --btn-primary-fg: #FFFFFF;
  --grid-line: rgba(31, 92, 139, 0.075);
  --shadow-card: 6px 6px 0 rgba(31, 92, 139, 0.12);
  --font-display: 'Space Grotesk', sans-serif;
}

.ha-portfolio {
  background-color: var(--bg);
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 48px 48px;
  color: var(--text);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
  transition: background-color 0.25s ease, color 0.25s ease;
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  color: var(--text);
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

p {
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
  color: inherit;
  background: none;
  border: none;
  cursor: pointer;
}

.ha-wrap {
  max-width: 1180px;
  margin: 0 auto;
  padding-inline: clamp(18px, 4vw, 48px);
}

.ha-section {
  padding-block: clamp(64px, 8vw, 108px);
  position: relative;
}

.ha-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-primary);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.ha-eyebrow::before {
  content: "";
  width: 20px;
  height: 1.5px;
  background: var(--accent-primary);
}

.ha-h2 {
  font-size: clamp(1.65rem, 3.2vw, 2.45rem);
  font-weight: 700;
  margin-bottom: 32px;
  max-width: 26ch;
}

/* ---------- HEADER & NAVIGATION ---------- */
.ha-nav {
  position: sticky;
  top: 0;
  z-index: 60;
  background: color-mix(in srgb, var(--bg) 84%, transparent);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--line);
}

.ha-nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  gap: 16px;
}

.ha-brand {
  display: flex;
  align-items: center;
  gap: 11px;
  text-align: left;
}

.ha-brand-mark {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--grad-brand);
  color: var(--btn-primary-fg);
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 0.82rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ha-brand-text {
  display: flex;
  flex-direction: column;
}

.ha-brand-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.96rem;
  line-height: 1.1;
}

.ha-brand-role {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: var(--text-muted);
}

.ha-nav-links {
  display: flex;
  align-items: center;
  gap: 22px;
}

.ha-nav-link {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  color: var(--text-muted);
  padding: 6px 2px;
  position: relative;
  transition: color 0.2s ease;
}

.ha-nav-link:hover,
.ha-nav-link.active {
  color: var(--text);
}

.ha-nav-link.active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--grad-brand);
  border-radius: 2px;
}

.ha-nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ha-theme-btn,
.ha-resume-btn {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.74rem;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: var(--surface);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.ha-theme-btn:hover,
.ha-resume-btn:hover {
  border-color: var(--accent-primary);
  transform: translateY(-1px);
}

.ha-cta-btn-sm {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 8px;
  background: var(--grad-brand);
  color: var(--btn-primary-fg);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.ha-mobile-toggle {
  display: none;
}

@media (max-width: 980px) {
  .ha-nav-links,
  .ha-resume-btn,
  .ha-cta-btn-sm {
    display: none;
  }
  .ha-mobile-toggle {
    display: inline-flex;
  }
}

.ha-mobile-drawer {
  border-top: 1px solid var(--line);
  background: var(--surface-solid);
  padding: 12px clamp(18px, 4vw, 48px) 20px;
}

.ha-mobile-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 13px 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.86rem;
  border-bottom: 1px solid var(--line);
}

.ha-mobile-drawer-footer {
  padding-top: 14px;
}

/* ---------- HERO SECTION ---------- */
.ha-hero {
  position: relative;
  padding-top: clamp(44px, 7vw, 84px);
  overflow: hidden;
  --mx: 50%;
  --my: 30%;
}

.ha-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    560px circle at var(--mx) var(--my),
    rgba(124, 108, 240, 0.13),
    transparent 65%
  );
}

.ha-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(85px);
  opacity: 0.25;
  pointer-events: none;
}

.ha-blob-1 {
  width: 420px;
  height: 420px;
  background: var(--accent-secondary);
  top: -140px;
  right: -100px;
}

.ha-blob-2 {
  width: 340px;
  height: 340px;
  background: var(--accent-warm);
  bottom: 40px;
  left: -120px;
}

.ha-hero-grid {
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: clamp(28px, 4.5vw, 56px);
  align-items: center;
  position: relative;
  z-index: 1;
}

@media (max-width: 940px) {
  .ha-hero-grid {
    grid-template-columns: 1fr;
  }
}

.ha-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  padding: 6px 13px;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  background: var(--surface);
  margin-bottom: 18px;
}

.ha-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-success);
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2);
}

.ha-hero-title {
  font-size: clamp(2.1rem, 4.4vw, 3.35rem);
  font-weight: 800;
  margin-bottom: 18px;
  line-height: 1.1;
}

.ha-grad-text {
  background: var(--grad-brand);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.ha-hero-sub {
  color: var(--text-muted);
  font-size: clamp(0.98rem, 1.3vw, 1.08rem);
  max-width: 54ch;
  margin-bottom: 22px;
}

.ha-hero-sub strong {
  color: var(--text);
  font-weight: 600;
}

.ha-hero-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 26px;
}

.ha-chip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--accent-primary);
}

.ha-hero-ctas {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.ha-btn {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 12px 18px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.ha-btn-primary {
  background: var(--grad-brand);
  color: var(--btn-primary-fg);
}

.ha-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px -8px rgba(56, 223, 234, 0.45);
}

.ha-btn-secondary {
  border: 1.5px solid var(--line);
  background: var(--surface);
  color: var(--text);
}

.ha-btn-secondary:hover {
  border-color: var(--accent-primary);
  transform: translateY(-2px);
}

.ha-btn-ghost {
  border: 1px dashed var(--line);
  color: var(--text-muted);
  font-size: 0.74rem;
}

.ha-btn-ghost:hover {
  color: var(--accent-primary);
  border-color: var(--accent-primary);
}

/* ---------- HERO TELEMETRY CARD ---------- */
.ha-fig-bar {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.66rem;
  color: var(--text-muted);
  letter-spacing: 0.06em;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.ha-fig-bar.sub {
  margin-top: 8px;
  margin-bottom: 0;
}

.ha-telemetry-card {
  position: relative;
  background: var(--surface-solid);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 20px;
  box-shadow: var(--shadow-card);
  overflow: hidden;
  min-height: 365px;
}

.ha-corner {
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: var(--accent-primary);
  pointer-events: none;
}
.ha-corner.tl { top: 8px; left: 8px; border-top: 2px solid; border-left: 2px solid; }
.ha-corner.tr { top: 8px; right: 8px; border-top: 2px solid; border-right: 2px solid; }
.ha-corner.bl { bottom: 8px; left: 8px; border-bottom: 2px solid; border-left: 2px solid; }
.ha-corner.br { bottom: 8px; right: 8px; border-bottom: 2px solid; border-right: 2px solid; }

.ha-telemetry-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  background: var(--bg);
  padding: 5px;
  border-radius: 10px;
  border: 1px solid var(--line);
  margin-bottom: 18px;
}

.ha-telemetry-tab {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.69rem;
  padding: 7px 8px;
  border-radius: 7px;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: background 0.2s ease, color 0.2s ease;
}

.ha-telemetry-tab.active {
  background: var(--surface-solid);
  color: var(--accent-primary);
  border: 1px solid var(--line-strong);
}

.ha-telemetry-body {
  position: relative;
}

.ha-scan-beam {
  position: absolute;
  left: -20px;
  right: -20px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
  box-shadow: 0 0 12px 2px var(--accent-primary);
  animation: haBeam 4.8s ease-in-out infinite;
  pointer-events: none;
}

@keyframes haBeam {
  0% { top: 4%; opacity: 0; }
  10% { opacity: 0.85; }
  90% { top: 94%; opacity: 0.85; }
  100% { top: 94%; opacity: 0; }
}

.ha-doc-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 14px;
}

.ha-doc-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.98rem;
}

.ha-doc-role {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.64rem;
  color: var(--text-muted);
}

.ha-score-pill {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  font-weight: 600;
  padding: 4px 9px;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.14);
  color: var(--accent-success);
  border: 1px solid var(--accent-success);
  white-space: nowrap;
}

.ha-ats-bars {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.ha-ats-label {
  display: flex;
  justify-content: space-between;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.ha-ats-track {
  height: 6px;
  border-radius: 999px;
  background: var(--bg);
  overflow: hidden;
}

.ha-ats-fill {
  height: 100%;
  background: var(--grad-brand);
  border-radius: 999px;
}

.ha-doc-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.ha-doc-chip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.64rem;
  padding: 4px 8px;
  border-radius: 5px;
  border: 1px solid var(--line);
  color: var(--accent-primary);
  background: var(--surface);
}

.ha-telemetry-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
}

.ha-inline-link {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.74rem;
  color: var(--accent-primary);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.ha-stamp {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  border: 2px solid var(--accent-warm);
  color: var(--accent-warm);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.58rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transform: rotate(-12deg);
}

.ha-telemetry-note {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-bottom: 10px;
}

.ha-endpoint-list {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.ha-endpoint-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  text-align: left;
  padding: 8px 11px;
  border-radius: 9px;
  border: 1px solid var(--line);
  background: var(--surface);
  transition: border-color 0.2s ease, transform 0.15s ease;
}

.ha-endpoint-item:hover {
  border-color: var(--accent-primary);
  transform: translateX(3px);
}

.ha-ep-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ha-ep-dot.live { background: var(--accent-success); }
.ha-ep-dot.mobile { background: var(--accent-primary); }
.ha-ep-dot.client { background: var(--accent-warm); }

.ha-ep-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}

.ha-ep-info strong {
  font-size: 0.78rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ha-ep-info small {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: var(--text-muted);
}

.ha-arch-mini-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ha-arch-box {
  padding: 11px 13px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--surface);
}

.ha-arch-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  color: var(--accent-primary);
}

.ha-arch-box h4 {
  font-size: 0.9rem;
  margin: 2px 0 4px;
}

.ha-arch-box p {
  font-size: 0.78rem;
  color: var(--text-muted);
}

/* ---------- HERO METRICS STRIP & TICKER ---------- */
.ha-metrics-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: clamp(36px, 5vw, 56px);
}

@media (max-width: 820px) {
  .ha-metrics-strip {
    grid-template-columns: repeat(2, 1fr);
  }
}

.ha-metric-cell {
  padding: 18px 20px;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: var(--surface);
}

.ha-metric-val {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--accent-primary);
}

.ha-metric-lbl {
  font-weight: 600;
  font-size: 0.88rem;
  margin-top: 2px;
}

.ha-metric-det {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  color: var(--text-muted);
  margin-top: 2px;
}

.ha-ticker {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  overflow: hidden;
  padding-block: 14px;
  margin-top: clamp(36px, 5vw, 56px);
}

.ha-ticker-track {
  display: flex;
  width: max-content;
  animation: haTicker 30s linear infinite;
}

.ha-ticker-track span {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.74rem;
  color: var(--text-muted);
  white-space: nowrap;
}

@keyframes haTicker {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* ---------- FEATURED PROJECTS GRID ---------- */
.ha-section-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 32px;
}

.ha-section-head .ha-h2 {
  margin-bottom: 0;
}

.ha-filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ha-filter-btn {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.74rem;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--text-muted);
  transition: all 0.2s ease;
}

.ha-filter-btn.active,
.ha-filter-btn:hover {
  border-color: var(--accent-primary);
  color: var(--text);
  background: var(--surface-hover);
}

.ha-projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

@media (max-width: 880px) {
  .ha-projects-grid {
    grid-template-columns: 1fr;
  }
}

.ha-project-card {
  background: var(--surface-solid);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  cursor: pointer;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  box-shadow: var(--shadow-card);
}

.ha-project-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-primary);
}

.ha-project-featured {
  grid-column: 1 / -1;
  border-color: var(--line-strong);
  background: linear-gradient(
    160deg,
    var(--surface-solid) 0%,
    color-mix(in srgb, var(--accent-primary) 7%, var(--surface-solid)) 100%
  );
}

.ha-proj-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
}

.ha-proj-cat {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.ha-proj-title {
  font-size: 1.4rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 2px;
}

.ha-proj-arrow {
  color: var(--accent-primary);
  transition: transform 0.2s ease;
}

.ha-project-card:hover .ha-proj-arrow {
  transform: translate(3px, -3px);
}

.ha-proj-subtitle {
  font-size: 0.88rem;
  color: var(--text-muted);
}

.ha-proj-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.64rem;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 999px;
  border: 1px solid var(--accent-primary);
  color: var(--accent-primary);
  white-space: nowrap;
}

.ha-proj-story {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
  padding: 16px;
  border-radius: 12px;
  background: var(--bg);
  border: 1px solid var(--line);
}

.ha-story-key {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--accent-primary);
  display: block;
  margin-bottom: 4px;
}

.ha-story-block p {
  font-size: 0.84rem;
  color: var(--text-muted);
  line-height: 1.55;
}

.ha-proj-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ha-proj-metric-pill {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  padding: 5px 10px;
  border-radius: 8px;
  background: rgba(34, 197, 94, 0.1);
  color: var(--accent-success);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.ha-proj-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.ha-proj-tags span {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  padding: 4px 9px;
  border-radius: 6px;
  background: var(--surface);
  border: 1px solid var(--line);
  color: var(--text-muted);
}

.ha-proj-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  margin-top: auto;
}

.ha-proj-cta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent-primary);
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.ha-proj-domain {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: var(--text-muted);
}

.ha-proj-modal-trigger {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid var(--accent-warm);
  color: var(--accent-warm);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.ha-proj-modal-trigger:hover {
  background: rgba(255, 139, 102, 0.12);
}

/* ---------- DEEP-DIVE CASE STUDY SECTION ---------- */
.ha-cs-banner {
  background: var(--surface-solid);
  border: 1px solid var(--line-strong);
  border-radius: 22px;
  padding: clamp(22px, 4vw, 42px);
  box-shadow: var(--shadow-card);
}

.ha-cs-lead {
  color: var(--text-muted);
  max-width: 72ch;
  font-size: 0.98rem;
  margin-bottom: 24px;
}

.ha-cs-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 28px;
  border-bottom: 1px solid var(--line);
  padding-bottom: 18px;
}

.ha-cs-tab {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.76rem;
  font-weight: 600;
  padding: 10px 16px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--bg);
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.ha-cs-tab.active {
  background: var(--grad-brand);
  color: var(--btn-primary-fg);
  border-color: transparent;
}

.ha-simulator-grid {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 28px;
  align-items: start;
}

@media (max-width: 960px) {
  .ha-simulator-grid {
    grid-template-columns: 1fr;
  }
}

.ha-sim-caption {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.66rem;
  color: var(--text-muted);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.ha-sim-pill {
  padding: 3px 8px;
  border-radius: 999px;
  border: 1px solid var(--accent-primary);
  color: var(--accent-primary);
}

.ha-sim-pill.coral {
  border-color: var(--accent-warm);
  color: var(--accent-warm);
}

/* Phone Simulator */
.ha-phone-frame {
  border-radius: 28px;
  border: 6px solid #1E293B;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 540px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
}

.ha-phone-frame.phone-dark {
  background: #0B1120;
  color: #F8FAFC;
  --p-card: #151F32;
  --p-line: rgba(255, 255, 255, 0.09);
  --p-muted: #94A3B8;
}

.ha-phone-frame.phone-light {
  background: #F8FAFC;
  color: #0F172A;
  --p-card: #FFFFFF;
  --p-line: rgba(15, 23, 42, 0.1);
  --p-muted: #475569;
}

.ha-phone-statusbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  border-bottom: 1px solid var(--p-line);
}

.ha-phone-notch {
  width: 54px;
  height: 10px;
  border-radius: 99px;
  background: #1E293B;
}

.ha-phone-appbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--p-line);
}

.ha-phone-title {
  font-weight: 700;
  font-size: 0.92rem;
}

.ha-phone-sub {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  color: #38DFEA;
}

.ha-phone-theme-btn {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid var(--p-line);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ha-phone-body {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}

.ha-phone-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ha-word-card {
  background: var(--p-card);
  border: 1px solid var(--p-line);
  border-radius: 12px;
  padding: 12px;
}

.ha-word-top {
  display: flex;
  justify-content: space-between;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  color: var(--p-muted);
  margin-bottom: 4px;
}

.ha-word-main {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

.ha-word-ar {
  font-size: 1.35rem;
  font-weight: 700;
  color: #38DFEA;
}

.ha-word-trans {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.74rem;
  font-weight: 600;
}

.ha-word-en {
  font-size: 0.8rem;
  margin-bottom: 4px;
}

.ha-word-ex {
  font-size: 0.7rem;
  color: var(--p-muted);
  font-style: italic;
}

.ha-phone-searchbar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--p-card);
  border: 1px solid var(--p-line);
  border-radius: 10px;
  padding: 8px 10px;
  margin-bottom: 8px;
}

.ha-phone-searchbar input {
  border: none;
  background: transparent;
  color: inherit;
  font-size: 0.78rem;
  width: 100%;
  outline: none;
}

.ha-search-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  color: var(--p-muted);
  margin-bottom: 8px;
}

.ha-phone-settings {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ha-setting-row {
  background: var(--p-card);
  border: 1px solid var(--p-line);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.ha-setting-row strong {
  display: block;
  font-size: 0.78rem;
}

.ha-setting-row small {
  font-size: 0.66rem;
  color: var(--p-muted);
}

.ha-toggle-pill {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  padding: 5px 9px;
  border-radius: 99px;
  border: 1px solid #38DFEA;
  color: #38DFEA;
  white-space: nowrap;
}

.ha-sync-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: #22C55E;
}

.ha-phone-bottomnav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--p-line);
  background: var(--p-card);
  padding: 8px 4px;
}

.ha-phone-bottomnav button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.64rem;
  color: var(--p-muted);
}

.ha-phone-bottomnav button.active {
  color: #38DFEA;
}

/* Netlify Admin Panel Simulator */
.ha-admin-panel {
  border-radius: 16px;
  border: 1px solid var(--line);
  background: var(--bg);
  overflow: hidden;
}

.ha-admin-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 11px 16px;
  background: var(--surface);
  border-bottom: 1px solid var(--line);
  flex-wrap: wrap;
}

.ha-admin-dots {
  display: flex;
  gap: 6px;
}

.ha-admin-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--line-strong);
}

.ha-admin-url {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: var(--text-muted);
}

.ha-auth-switch {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  padding: 5px 10px;
  border-radius: 99px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.ha-auth-switch.authed {
  background: rgba(34, 197, 94, 0.14);
  color: var(--accent-success);
  border: 1px solid var(--accent-success);
}

.ha-auth-switch.anon {
  background: rgba(255, 139, 102, 0.15);
  color: var(--accent-warm);
  border: 1px solid var(--accent-warm);
}

.ha-admin-body {
  padding: 22px;
}

.ha-admin-body h4 {
  font-size: 1.05rem;
  margin-bottom: 6px;
}

.ha-admin-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 18px;
}

.ha-admin-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.ha-admin-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 600px) {
  .ha-admin-inputs {
    grid-template-columns: 1fr;
  }
}

.ha-admin-form label {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: var(--text-muted);
}

.ha-admin-form input {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: var(--surface-solid);
  color: var(--text);
  font-family: inherit;
  font-size: 0.86rem;
}

.ha-admin-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
}

.ha-rls-console {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.73rem;
  padding: 11px 14px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 18px;
}

.ha-rls-console.ok {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid var(--accent-success);
  color: var(--accent-success);
}

.ha-rls-console.error {
  background: rgba(255, 139, 102, 0.12);
  border: 1px solid var(--accent-warm);
  color: var(--accent-warm);
}

.ha-admin-highlights {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 640px) {
  .ha-admin-highlights {
    grid-template-columns: 1fr;
  }
}

.ha-hl-item {
  display: flex;
  gap: 10px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--surface-solid);
}

.ha-hl-item svg {
  color: var(--accent-primary);
  flex-shrink: 0;
  margin-top: 2px;
}

.ha-hl-item strong {
  font-size: 0.82rem;
  display: block;
}

.ha-hl-item p {
  font-size: 0.76rem;
  color: var(--text-muted);
}

/* Schema & Bug Log Views */
.ha-schema-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

@media (max-width: 920px) {
  .ha-schema-grid {
    grid-template-columns: 1fr;
  }
}

.ha-schema-card {
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ha-schema-head {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--accent-primary);
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 0.9rem;
}

.ha-schema-purpose {
  font-size: 0.83rem;
  color: var(--text-muted);
}

.ha-schema-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.64rem;
  color: var(--accent-primary);
  display: block;
  margin-bottom: 6px;
}

.ha-schema-cols ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.ha-schema-rls {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ha-rls-rule {
  padding: 9px 11px;
  border-radius: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.67rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ha-rls-rule.read {
  background: rgba(34, 197, 94, 0.09);
  border: 1px solid rgba(34, 197, 94, 0.35);
}

.ha-rls-rule.write {
  background: rgba(124, 108, 240, 0.1);
  border: 1px solid rgba(124, 108, 240, 0.35);
}

.ha-bugs-intro {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 12px;
  background: var(--bg);
  border: 1px solid var(--line);
  margin-bottom: 18px;
  font-size: 0.88rem;
  color: var(--text-muted);
}

.ha-bugs-intro svg {
  color: var(--accent-warm);
  flex-shrink: 0;
}

.ha-bugs-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.ha-bug-card {
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 22px;
}

.ha-bug-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
}

.ha-bug-id-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.ha-bug-id {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  background: var(--accent-warm);
  color: #080B12;
}

.ha-bug-sev {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  color: var(--accent-warm);
}

.ha-bug-comp {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  color: var(--text-muted);
}

.ha-bug-metric {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: var(--accent-success);
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.ha-bug-title {
  font-size: 1.15rem;
  margin-bottom: 14px;
}

.ha-bug-cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 14px;
}

@media (max-width: 820px) {
  .ha-bug-cols {
    grid-template-columns: 1fr;
  }
}

.ha-bug-col p {
  font-size: 0.83rem;
  color: var(--text-muted);
}

.ha-bug-code {
  margin: 0;
  padding: 12px 16px;
  border-radius: 10px;
  background: #070A10;
  color: #38DFEA;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.74rem;
  overflow-x: auto;
  border: 1px solid rgba(56, 223, 234, 0.2);
}

/* ---------- EXPERIENCE TIMELINE ---------- */
.ha-timeline {
  border-left: 2px solid var(--line-strong);
  padding-left: clamp(18px, 3.5vw, 34px);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.ha-tl-card {
  position: relative;
  background: var(--surface-solid);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--shadow-card);
}

.ha-tl-dot {
  position: absolute;
  left: calc(-1 * (clamp(18px, 3.5vw, 34px) + 7px));
  top: 28px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--grad-brand);
}

.ha-tl-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 14px;
}

.ha-tl-role {
  font-size: 1.2rem;
}

.ha-tl-company {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  color: var(--accent-primary);
  margin-top: 3px;
}

.ha-tl-company span {
  color: var(--text-muted);
}

.ha-tl-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.ha-tl-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.66rem;
  padding: 4px 9px;
  border-radius: 99px;
  border: 1px solid var(--line);
  background: var(--surface);
}

.ha-tl-date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.74rem;
  color: var(--text-muted);
}

.ha-tl-points {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ha-tl-points li {
  font-size: 0.9rem;
  color: var(--text-muted);
  padding-left: 18px;
  position: relative;
}

.ha-tl-points li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--accent-primary);
}

/* ---------- 4-STEP PROCESS ---------- */
.ha-process-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

@media (max-width: 980px) {
  .ha-process-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 580px) {
  .ha-process-grid {
    grid-template-columns: 1fr;
  }
}

.ha-process-card {
  background: var(--surface-solid);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ha-process-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--accent-primary);
}

.ha-process-title {
  font-size: 1.05rem;
}

.ha-process-sub {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  color: var(--accent-warm);
}

.ha-process-desc {
  font-size: 0.84rem;
  color: var(--text-muted);
  flex-grow: 1;
}

.ha-process-deliv {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 10px;
  border-top: 1px solid var(--line);
}

.ha-process-deliv span {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.64rem;
  padding: 3px 8px;
  border-radius: 5px;
  background: var(--surface);
  color: var(--text-muted);
}

/* ---------- ABOUT, TERMINAL & SKILLS ---------- */
.ha-about-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 28px;
  margin-bottom: 32px;
}

@media (max-width: 880px) {
  .ha-about-grid {
    grid-template-columns: 1fr;
  }
}

.ha-terminal-card {
  background: #090D16;
  color: #E2E8F0;
  border: 1px solid var(--line);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.ha-term-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-wrap: wrap;
}

.ha-term-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: #94A3B8;
}

.ha-term-cmds {
  display: flex;
  gap: 6px;
}

.ha-term-cmds button {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.66rem;
  padding: 4px 8px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #94A3B8;
}

.ha-term-cmds button.active {
  border-color: #38DFEA;
  color: #38DFEA;
}

.ha-term-body {
  padding: 20px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.82rem;
  line-height: 1.7;
}

.ha-term-prompt {
  color: #38DFEA;
  margin-bottom: 10px;
}

.ha-term-out {
  color: #CBD5E1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ha-spec-sheet {
  background: var(--surface-solid);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 20px 24px;
  margin: 0;
}

.ha-spec-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 11px 0;
  border-bottom: 1px solid var(--line);
  font-size: 0.85rem;
}

.ha-spec-row:last-child {
  border-bottom: none;
}

.ha-spec-row dt {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  color: var(--accent-primary);
}

.ha-spec-row dd {
  margin: 0;
  text-align: right;
  font-weight: 500;
}

.ha-spec-live {
  color: var(--accent-success);
}

.ha-skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

@media (max-width: 720px) {
  .ha-skills-grid {
    grid-template-columns: 1fr;
  }
}

.ha-skill-card {
  background: var(--surface-solid);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 22px;
}

.ha-skill-head {
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--accent-primary);
  margin-bottom: 14px;
}

.ha-skill-head h3 {
  font-size: 0.98rem;
}

.ha-skill-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ha-skill-chips span {
  font-size: 0.82rem;
  padding: 7px 12px;
  border-radius: 8px;
  background: var(--surface);
  border: 1px solid var(--line);
}

.ha-edu-cert-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 24px;
}

@media (max-width: 820px) {
  .ha-edu-cert-grid {
    grid-template-columns: 1fr;
  }
}

.ha-edu-box,
.ha-cert-box {
  background: var(--surface-solid);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 24px;
}

.ha-edu-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}

.ha-edu-row:last-child {
  border-bottom: none;
}

.ha-edu-school {
  font-size: 0.84rem;
  color: var(--text-muted);
}

.ha-edu-hl {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: var(--accent-primary);
  margin-top: 3px;
}

.ha-edu-year {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  color: var(--accent-primary);
}

.ha-cert-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ha-cert-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 12px;
  border-radius: 12px;
  background: var(--surface);
  border: 1px solid var(--line);
}

.ha-cert-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(56, 223, 234, 0.12);
  color: var(--accent-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ha-cert-top {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.ha-cert-top h4 {
  font-size: 0.92rem;
}

.ha-cert-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  padding: 2px 7px;
  border-radius: 99px;
  border: 1px solid var(--line);
  color: var(--accent-primary);
}

.ha-cert-row p {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: var(--text-muted);
}

/* ---------- CONTACT SECTION ---------- */
.ha-contact-box {
  background: var(--surface-solid);
  border: 1px solid var(--line-strong);
  border-radius: 22px;
  padding: clamp(24px, 5vw, 52px);
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 36px;
  box-shadow: var(--shadow-card);
}

@media (max-width: 900px) {
  .ha-contact-box {
    grid-template-columns: 1fr;
  }
}

.ha-contact-lead {
  color: var(--text-muted);
  font-size: 0.96rem;
  margin-bottom: 24px;
}

.ha-contact-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 22px;
}

.ha-contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: var(--surface);
  transition: border-color 0.2s ease;
}

.ha-contact-item:hover {
  border-color: var(--accent-primary);
}

.ha-contact-item svg {
  color: var(--accent-primary);
  flex-shrink: 0;
}

.ha-contact-item-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}

.ha-contact-lbl {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  color: var(--text-muted);
  letter-spacing: 0.08em;
}

.ha-copy-mini {
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid var(--line);
}

.ha-quick-links-box {
  padding-top: 14px;
  border-top: 1px solid var(--line);
}

.ha-quick-links-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.ha-quick-links-row a {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  padding: 5px 10px;
  border-radius: 7px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--accent-primary);
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.ha-contact-form {
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.ha-form-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  color: var(--accent-primary);
  letter-spacing: 0.08em;
}

.ha-type-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.ha-type-chip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--text-muted);
}

.ha-type-chip.active {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  background: var(--surface-hover);
}

.ha-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: var(--text-muted);
}

.ha-field input,
.ha-field textarea {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  padding: 11px 13px;
  border-radius: 9px;
  border: 1px solid var(--line);
  background: var(--surface-solid);
  color: var(--text);
  resize: vertical;
}

.ha-field input:focus,
.ha-field textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
}

.ha-submit-btn {
  justify-content: center;
  margin-top: 4px;
}

/* ---------- FOOTER ---------- */
.ha-footer {
  border-top: 1px solid var(--line);
  padding: 26px 0;
}

.ha-footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.74rem;
  color: var(--text-muted);
}

.ha-footer-actions {
  display: flex;
  gap: 18px;
}

.ha-footer-actions button {
  color: var(--accent-primary);
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

/* ---------- MODALS ---------- */
.ha-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(5, 8, 15, 0.78);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.ha-modal-card {
  background: var(--surface-solid);
  border: 1px solid var(--line-strong);
  border-radius: 18px;
  max-width: 880px;
  width: 100%;
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
}

.ha-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  padding: 18px 24px;
  border-bottom: 1px solid var(--line);
}

.ha-modal-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ha-modal-close {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ha-modal-body {
  padding: 24px;
  overflow-y: auto;
}

.ha-resume-sheet {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ha-res-top {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line);
}

.ha-res-contact {
  display: flex;
  flex-direction: column;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: var(--text-muted);
  text-align: right;
}

.ha-res-section h4 {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.74rem;
  color: var(--accent-primary);
  letter-spacing: 0.1em;
  margin-bottom: 6px;
}

.ha-res-section p,
.ha-res-section li {
  font-size: 0.86rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.ha-res-section ul {
  padding-left: 18px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
`;