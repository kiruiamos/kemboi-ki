import { PromptStructure } from '../types/prompt';

export const MASTER_PROMPTS: PromptStructure[] = [
  {
    id: 'uoe-flagship-hub',
    title: 'University of Eldoret (UoE) Official Student Resource Hub',
    subtitle: 'Comprehensive prompt engineered specifically for UoE Main Campus (Chepkoilel) & Town Campus',
    category: 'comprehensive',
    context: `At the University of Eldoret (UoE) in Eldoret, Kenya, students across the 8 Academic Schools (School of Science, School of Agriculture and Biotechnology, School of Business and Management Sciences, School of Environmental Studies, School of Engineering, School of Education, School of Natural Resource Management, and School of Economics) frequently face significant administrative and academic hurdles. 

Essential course materials, past semester examinations (Main Exams and Supplementary papers), Continuous Assessment Tests (CATs), and lecturer notes are scattered across unofficial WhatsApp class groups, disparate Google Drives, and noticeboards outside the Dean's offices. Students struggle to track their degree progression using Kenya's public university grading formula (CATs carrying 30% and End-of-Semester Examinations carrying 70%, with classifications for First Class Honours, Second Class Upper, Second Class Lower, and Pass). 

Furthermore, students navigating Eldoret campus life deal with Higher Education Loans Board (HELB) and New Higher Education Funding (HEF) disbursement delays, Uasin Gishu County Bursary application deadlines, Chepkoilel off-campus hostel housing navigations (Marura, Upper Stage, Lower Stage), ERP fee-clearance deadlines for Exam Cards, and access to the 24/7 University Health Centre. A dedicated, student-first digital University of Eldoret Resource Hub provides a centralized, mobile-optimized, offline-resilient web platform that solves these problems in a single unified interface.`,
    role: `You are an elite Principal Full-Stack Software Engineer, EdTech System Architect, and Senior UI/UX Specialist with deep experience building resilient educational web applications for African university ecosystems, combining world-class modern UI aesthetics with low-bandwidth optimization and intuitive student workflows.`,
    task: `Design, architect, and deliver a production-ready, highly responsive University of Eldoret (UoE) Student Resource Hub web application. The platform must feature:
1. A searchable and filterable Academic Materials & Past Papers Vault organized by UoE Schools, Course Units, and Semesters.
2. An interactive UoE Academic Grade & Degree Class Forecaster based on the standard Kenyan university grading scale (30% CAT + 70% Final Exam).
3. A HELB, HEF, & County Bursary Tracker with deadline countdowns and application guides.
4. A Virtual Study Lounge with a 25/5 Pomodoro focus timer, ambient study audio, and daily revision streak tracker.
5. A Community Notes & Revision Bank where UoE students and class representatives can share verified revision summaries with peer upvoting.
6. A Chepkoilel Campus Survival Guide & Emergency Directory (Health Centre 24/7 clinic, Security, ERP Exam Card guidance, Hostel guide).`,
    requirements: {
      designSystem: [
        'Aesthetic & Brand Colors: Authentic University of Eldoret identity featuring deep Forest Green (#0f3d2e / #064e3b), rich Warm Gold / Amber accents (#f59e0b / #d97706), and clean slate dark backgrounds (#0b0f19 / #111827) for comfortable late-night library study sessions.',
        'Typography: Clean modern sans-serif (Plus Jakarta Sans or Inter) paired with monospaced accents (Fira Code) for UoE Course Codes (e.g. COM 110, AGR 211, BMS 102, MAT 111, ENS 210) and GPA metrics.',
        'Visual Cues: Verified badge chips for lecturer-approved notes, School-specific color badges (Science: Cyan, Agriculture: Emerald, Business: Amber, Engineering: Orange, Environmental: Teal, Education: Indigo).',
        'Mobile-First Responsiveness: Full optimization for smartphones, low data usage, and tablets used by students on the Chepkoilel campus wifi or mobile data bundles.',
        'Accessibility: Full WCAG 2.1 AA compliance with high-contrast text, clear active states, keyboard accessibility, and screen reader-friendly labels.'
      ],
      coreModules: [
        {
          name: '1. UoE Past Paper & Revision Vault (Repository)',
          description: 'Instant multi-parameter search for past university exams, CATs, and lecturer notes.',
          keyFeatures: [
            'Filter by UoE School (Science, Agriculture, Business, Engineering, Education, Environmental Studies).',
            'Filter by Document Type: Past Main Exams (70%), CAT 1 & 2 Question Papers (30%), Lecture Notes, Formula Cheat Sheets, and Practical Lab Manuals.',
            'Course Unit Search: Instant filter by Course Code (e.g., COM 110, MAT 111, AGR 211, EDF 111) and title.',
            'Interactive Resource Card: Displays file size (optimized for low mobile data), download count, peer rating, semester tag, and verified uploader chip.',
            'Resource Preview Modal with simulated download and high-yield topic outline.'
          ]
        },
        {
          name: '2. UoE Degree Classification & GPA Forecaster (30% CAT / 70% Final)',
          description: 'Tailored to the exact Kenyan public university grading system.',
          keyFeatures: [
            'Interactive course table where students enter CAT score (out of 30) and Final Exam score (out of 70) or aggregate letter grade (A: 70-100%, B: 60-69%, C: 50-59%, D: 40-49%, F: <40%).',
            'Instant real-time computation of GPA (4.0 scale and Percentage Average).',
            'Honours Classification Badge: First Class Honours (>=70%), Second Class Upper Division (60-69%), Second Class Lower Division (50-59%), Pass (40-49%).',
            'Target Grade Forecaster: Calculates the exact score needed on the 70% Final Exam to secure an A or B after knowing CAT scores.',
            'Local storage persistence so students can save their semester courses.'
          ]
        },
        {
          name: '3. HELB, HEF & Uasin Gishu Bursary Tracker',
          description: 'Financial aid and scholarship radar for UoE students.',
          keyFeatures: [
            'Track Higher Education Funding (HEF) Bands 1-5 allocations and HELB upkeep loan timelines.',
            'County Bursaries directory: Uasin Gishu County Governor Bursary, Ward CDF Bursaries, and Equity Wings to Fly alumni support.',
            'Live countdown badges showing days remaining until application deadlines.',
            'Required checklist for applications (Chief\'s letter, fee structure, parent death/income certificates).'
          ]
        },
        {
          name: '4. Chepkoilel Focus Lounge & Study Pomodoro Timer',
          description: 'Deep work companion for study sessions in Margaret Thatcher Library or hostels.',
          keyFeatures: [
            '25-minute Pomodoro focus timer with 5-minute break and 50-minute power revision modes.',
            'Toggleable ambient study audio (Library quiet study, Chepkoilel rain soundscapes, Coffee shop, Lo-fi focus beats).',
            'Daily revision streak counter and session counter.'
          ]
        },
        {
          name: '5. Chepkoilel Campus Survival & 24/7 Emergency Directory',
          description: 'Essential student welfare, security, and campus navigation.',
          keyFeatures: [
            'Emergency contact cards with one-tap dialing: University Health Centre / Dispensary (24/7), Campus Security, Dean of Students.',
            'UoE ERP Portal quick instructions: Course registration step-by-step, fee clearance thresholds, and Exam Card printing verification.',
            'Hostel navigation tips (On-campus Halls 1-6 booking versus off-campus Chepkoilel hubs: Upper Stage, Lower Stage, Marura, Kapsoya).'
          ]
        },
        {
          name: '6. Community Notes & Class Rep Contributions Hub',
          description: 'Student-driven peer knowledge sharing network.',
          keyFeatures: [
            'Upload submission modal for students to share notes, assignments, and practical writeups.',
            'Upvoting and rating mechanism to highlight the most reliable revision materials.',
            'Leaderboard acknowledging top peer contributors across UoE schools.'
          ]
        }
      ],
      techStack: [
        'Framework: React 19 (TypeScript) with Vite.',
        'Styling: Tailwind CSS v4 with custom UoE emerald and gold accent tokens.',
        'Icons: Lucide React for consistent, high-clarity iconography.',
        'State & Storage: Pure React Hooks with localStorage persistence for zero external backend dependencies.'
      ],
      stateManagement: [
        'Modern React state management using useState, useMemo, useEffect, and custom hooks.',
        'Local storage persistence for student courses, favorite past papers, and study timers.'
      ],
      accessibilityAndPerf: [
        'Semantic HTML5 elements throughout (<header>, <main>, <section>, <article>, <aside>, <footer>).',
        'ARIA-labeled dialogs, high-contrast ratios for low-light hostel study, and full keyboard navigation support.',
        'Lightweight bundle footprint under 200KB for fast loading on 3G/4G Kenyan mobile networks.'
      ],
      mockDataSchema: [
        'Authentic UoE datasets with real course codes (COM 110, AGR 211, BMS 102, ENS 210, MAT 111, ENG 110, EDF 111, CHE 110).',
        'Realistic past papers, CAT test samples, lecturer names, and Kenyan financial aid opportunities.'
      ]
    },
    outputFormat: [
      'Provide clean, production-ready, fully implemented TypeScript and React code with no placeholders or truncated code blocks.',
      'Organize components modularly with robust TypeScript interfaces for Resources, Courses, Grades, Scholarships, and Campus Services.',
      'Ensure the application builds and runs without runtime errors or missing packages.',
      'Provide clear documentation on how students and developers can customize courses, schools, and grading rules.'
    ]
  },
  {
    id: 'uoe-agri-science',
    title: 'UoE School of Agriculture & Biotechnology Knowledge Hub',
    subtitle: 'Specialized for Chepkoilel Farm Practicals, Agronomy, Animal Science & Lab Reports',
    category: 'stem',
    context: `The School of Agriculture and Biotechnology is the premier pride and heritage of the University of Eldoret (formerly Chepkoilel Agricultural College). Students spend half their academic time conducting field experiments on the University Chepkoilel commercial farm, agronomy trial plots, and greenhouse biotechnology labs. They require dedicated access to farm practical writeup templates, seed science cheat sheets, soil testing data, crop pathology past exams, and agribusiness market trends.`,
    role: `You are a Senior Agricultural EdTech Specialist and Full-Stack React Engineer dedicated to smart agriculture education and academic knowledge portals.`,
    task: `Build a dedicated University of Eldoret School of Agriculture & Biotechnology Resource Hub featuring Chepkoilel farm practical archives, crop pathology field guides, past degree exams, seed germination calculators, and Kenya agriculture grant directories.`,
    requirements: {
      designSystem: ['Earthy Agriculture Aesthetic: Lush emerald greens (#047857), warm harvest amber (#d97706), and soil slate accents.'],
      coreModules: [
        {
          name: '1. Chepkoilel Farm Practical & Lab Report Vault',
          description: 'Standardized practical reports, soil testing data, and agronomy field trial logs.',
          keyFeatures: ['Search by crop: Maize, Wheat, Horticulture, Dairy, Poultry', 'Lab protocol downloads', 'Chepkoilel farm trial archive']
        },
        {
          name: '2. Agricultural Past Exams & CATs',
          description: '10-year collection of UoE agronomy and biotechnology exams.',
          keyFeatures: ['Filter by Soil Science, Animal Nutrition, Crop Protection, Plant Breeding', 'Verified answers']
        },
        {
          name: '3. KALRO & Ministry of Agriculture Student Research Radar',
          description: 'Undergraduate student attachment, internship, and research funding opportunities.',
          keyFeatures: ['KALRO, KEPHIS, and Tea Research Institute student placement guides', 'Grant application deadlines']
        }
      ],
      techStack: ['React 19 + TypeScript + Tailwind CSS v4 + Lucide React.'],
      stateManagement: ['Local storage for saved field manuals and bookmarked papers.'],
      accessibilityAndPerf: ['Optimized for mobile viewing outdoors on farm plots.'],
      mockDataSchema: ['Real UoE agricultural course units: AGR 211, AGR 312, ANS 110, HRT 201, PLP 310.']
    },
    outputFormat: ['Complete, working code files without placeholders.']
  },
  {
    id: 'uoe-business-sciences',
    title: 'UoE School of Business & Management Sciences Hub',
    subtitle: 'For BCom, Economics, Project Management, and Purchasing & Supplies Students',
    category: 'comprehensive',
    context: `University of Eldoret Business and Economics students (both at Main Campus Chepkoilel and Town Campus) face rigorous professional accounting and business requirements (CPA examinations by KASNEB, BCom specializations in Accounting, Finance, Marketing, Human Resource, and Supplies Management). They need combined access to university past papers, KASNEB revision kits, financial calculators, and corporate internship openings in Eldoret town.`,
    role: `You are a Senior EdTech Engineer and Financial Interface Developer with deep familiarity with Kenyan university commerce and business curriculums.`,
    task: `Create a modern University of Eldoret School of Business Resource Hub featuring KASNEB CPA & university past exam banks, financial annuity calculators, Town Campus lecture schedules, and corporate attachment listings in Eldoret and Nairobi.`,
    requirements: {
      designSystem: ['Corporate & Academic Fusion: Navy blue (#1e3a8a) and gold (#eab308) business palette.'],
      coreModules: [
        {
          name: '1. BCom & KASNEB CPA Revision Vault',
          description: 'Comprehensive past papers for university business units and KASNEB CPA foundation to advanced levels.',
          keyFeatures: ['BMS 102, BBM 210, ECO 111, ACC 110 past exams', 'KASNEB study guides and tax tables']
        },
        {
          name: '2. Business Mathematics & Financial Calculator',
          description: 'Interactive calculator for compound interest, Net Present Value (NPV), and statistical hypothesis testing.',
          keyFeatures: ['Break-even analysis', 'Time value of money tools']
        },
        {
          name: '3. Eldoret Corporate Attachment & Internship Portal',
          description: 'Curated list of commercial banks, audit firms, and county offices offering industrial attachment in Uasin Gishu.',
          keyFeatures: ['KRA Eldoret branch, Eldoret Water and Sanitation (ELDOWAS), Moi Teaching and Referral Hospital (MTRH) accounts department']
        }
      ],
      techStack: ['React 19 + TypeScript + Tailwind CSS v4 + Lucide React.'],
      stateManagement: ['React state with local storage.'],
      accessibilityAndPerf: ['Fully keyboard navigable, mobile responsive.'],
      mockDataSchema: ['Real UoE BCom and Economics course units.']
    },
    outputFormat: ['Production-ready TypeScript/React implementation.']
  }
];

export const FORMAT_OPTIONS = [
  {
    id: 'standard_markdown',
    name: 'Standard Markdown (Recommended)',
    description: 'Formatted with clear H2 headers, bulleted lists, and bold callouts. Ideal for AI Studio, Claude, and ChatGPT.',
    badge: 'Universal'
  },
  {
    id: 'xml_tags',
    name: 'Structured XML Prompt Tags',
    description: 'Wraps sections in <context>, <role>, <task>, <requirements>, <output> tags. Ideal for Claude 3.7 and Claude Code.',
    badge: 'Claude / LLM Optimized'
  },
  {
    id: 'json_schema',
    name: 'JSON Specification Schema',
    description: 'Structured JSON object specifying all parameters, design tokens, and module requirements.',
    badge: 'Programmatic'
  },
  {
    id: 'concise',
    name: 'Direct Single-Turn Prompt',
    description: 'Tightened, ultra-dense instruction set tailored for immediate code generation in Cursor and v0.',
    badge: 'Fast & Dense'
  }
];

export const TARGET_AI_TOOLS = [
  { id: 'google_ai_studio', name: 'Google AI Studio', tag: 'Gemini 2.5 / 3.8', note: 'Emphasizes complete single-file or multi-file React SPA architecture' },
  { id: 'claude_artifacts', name: 'Claude (Artifacts)', tag: 'Claude 3.7 Sonnet', note: 'Optimized for single-file React component with Lucide icons' },
  { id: 'cursor', name: 'Cursor / Windsurf', tag: 'Composer / Agent', note: 'Tailored for production repository file structure and clean imports' },
  { id: 'v0', name: 'v0 by Vercel', tag: 'Next.js & Tailwind', note: 'Tailored for shadcn/ui and modern component composition' },
  { id: 'chatgpt', name: 'ChatGPT / o3-mini', tag: 'OpenAI 4o / o3', note: 'Clear constraints and step-by-step code generation instructions' }
];

export const UOE_SCHOOLS_LIST = [
  { id: 'science', name: 'School of Science', code: 'SOS', color: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/60' },
  { id: 'agri', name: 'School of Agriculture & Biotechnology', code: 'SOAB', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60' },
  { id: 'biz', name: 'School of Business & Management Sciences', code: 'SOB', color: 'text-amber-400 bg-amber-950/40 border-amber-800/60' },
  { id: 'eng', name: 'School of Engineering', code: 'SOE', color: 'text-orange-400 bg-orange-950/40 border-orange-800/60' },
  { id: 'env', name: 'School of Environmental Studies', code: 'SOES', color: 'text-teal-400 bg-teal-950/40 border-teal-800/60' },
  { id: 'edu', name: 'School of Education', code: 'SOED', color: 'text-indigo-400 bg-indigo-950/40 border-indigo-800/60' },
  { id: 'natres', name: 'School of Natural Resource Management', code: 'SNRM', color: 'text-lime-400 bg-lime-950/40 border-lime-800/60' },
  { id: 'econ', name: 'School of Economics', code: 'SOEC', color: 'text-yellow-400 bg-yellow-950/40 border-yellow-800/60' }
];
