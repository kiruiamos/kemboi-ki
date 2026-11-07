export interface AcademicBook {
  id: string;
  title: string;
  author: string;
  edition: string;
  isbn: string;
  courseCodes: string[];
  department: string;
  pages: number;
  fileSize: string;
  downloads: number;
  rating: number;
  coverColor: string;
  description: string;
  chapters: string[];
  format: 'PDF E-Book' | 'E-Pub' | 'Library Physical Shelf';
  shelfLocation?: string;
  isAvailableOnline: boolean;
}

export const UOE_BOOKS_DATABASE: AcademicBook[] = [
  {
    id: 'book-1',
    title: 'Introduction to Algorithms & Data Structures',
    author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest',
    edition: '4th Global Edition',
    isbn: '978-0262046305',
    courseCodes: ['COM 110', 'COM 210', 'COM 311'],
    department: 'School of Science',
    pages: 1312,
    fileSize: '18.4 MB (PDF)',
    downloads: 3240,
    rating: 5.0,
    coverColor: 'from-blue-600 to-indigo-900',
    description: 'The definitive textbook for computer science students covering asymptotic analysis, sorting algorithms, dynamic programming, and graph theory. Prescribed text for UoE Computer Science & IT programs.',
    chapters: [
      'Foundations of Asymptotic Growth of Functions',
      'Divide-and-Conquer & Recurrence Equations',
      'Heapsort, Quicksort & Linear Time Sorting',
      'Binary Search Trees & Red-Black Trees',
      'Dynamic Programming & Greedy Algorithms',
      'Graph Algorithms (BFS, DFS, Dijkstra, Bellman-Ford)'
    ],
    format: 'PDF E-Book',
    shelfLocation: 'Margaret Thatcher Library, Stack Area 3 (QA 76.6 .C66)',
    isAvailableOnline: true
  },
  {
    id: 'book-2',
    title: 'Principles of Crop Production: Theory, Techniques & Technology',
    author: 'George Acquaah (Adapted for East African Agronomy)',
    edition: '3rd Edition',
    isbn: '978-0131145566',
    courseCodes: ['AGR 211', 'AGR 312', 'HRT 201'],
    department: 'School of Agriculture & Biotechnology',
    pages: 754,
    fileSize: '24.1 MB (PDF)',
    downloads: 2890,
    rating: 4.9,
    coverColor: 'from-emerald-600 to-green-950',
    description: 'Core reference for agriculture and biotechnology undergraduates at Chepkoilel Farm. Explores plant physiology, climate factors, soil fertility management, seedbed preparation, crop protection, and modern harvest mechanics.',
    chapters: [
      'The Science of Plant Agriculture & Food Security',
      'Crop Morphology, Anatomy & Photosynthesis',
      'Soil Chemistry, Nitrogen Cycle & Rift Valley Soil Profiles',
      'Plant Breeding, Hybrid Seed Production & Biotechnology',
      'Chepkoilel Farm Field Trials: Cereal & Legume Management',
      'Post-Harvest Handling & Grain Storage in Kenya'
    ],
    format: 'PDF E-Book',
    shelfLocation: 'Chepkoilel Agri-Library Section, Shelf SB 185 .A38',
    isAvailableOnline: true
  },
  {
    id: 'book-3',
    title: 'Calculus: Early Transcendentals',
    author: 'James Stewart',
    edition: '8th International Edition',
    isbn: '978-1285741550',
    courseCodes: ['MAT 111', 'MAT 112', 'ENG 110'],
    department: 'School of Science',
    pages: 1368,
    fileSize: '32.6 MB (PDF)',
    downloads: 4120,
    rating: 5.0,
    coverColor: 'from-cyan-600 to-blue-950',
    description: 'The standard calculus text for pure mathematics, computer science, and engineering students at UoE. Features thorough explanations of limits, differential equations, polar coordinates, and multiple integrals.',
    chapters: [
      'Functions and Models',
      'Limits and Derivatives with Epsilon-Delta Rigor',
      'Differentiation Rules & Related Rates Problems',
      'Integrals & The Fundamental Theorem of Calculus',
      'Differential Equations & Modeling',
      'Vectors and the Geometry of Space'
    ],
    format: 'PDF E-Book',
    shelfLocation: 'Main Library Ground Floor, QA 303.2 .S74',
    isAvailableOnline: true
  },
  {
    id: 'book-4',
    title: 'Financial Accounting & Reporting for East African Universities',
    author: 'Frank Wood & Alan Sangster (Kenyan Edition)',
    edition: '14th Edition',
    isbn: '978-1292211664',
    courseCodes: ['BMS 102', 'ACC 110', 'BBM 210'],
    department: 'School of Business & Management Sciences',
    pages: 820,
    fileSize: '16.2 MB (PDF)',
    downloads: 2450,
    rating: 4.8,
    coverColor: 'from-amber-600 to-yellow-950',
    description: 'The essential business and BCom accounting handbook. Covers double-entry bookkeeping, trial balance preparation, partnership dissolution, company cash flow statements, and IFRS/KASNEB standards.',
    chapters: [
      'The Accounting Equation & Basis of Double-Entry',
      'Financial Statements of Sole Traders',
      'Books of Original Entry & Ledgers',
      'Adjustments for Financial Statements & Depreciation',
      'Partnership Accounts & Dissolutions',
      'Company Financial Statements under IFRS'
    ],
    format: 'PDF E-Book',
    shelfLocation: 'Town Campus Library & Main Library HF 5635 .W86',
    isAvailableOnline: true
  },
  {
    id: 'book-5',
    title: 'Ecology: Concepts and Applications & Environmental Assessment',
    author: 'Manuel C. Molles Jr.',
    edition: '7th Edition',
    isbn: '978-0077837204',
    courseCodes: ['ENS 210', 'ENS 310', 'WLM 211'],
    department: 'School of Environmental Studies',
    pages: 608,
    fileSize: '19.8 MB (PDF)',
    downloads: 1670,
    rating: 4.8,
    coverColor: 'from-teal-600 to-slate-900',
    description: 'Prescribed reading for Environmental Science and Natural Resource students. Highlights ecological principles across aquatic, terrestrial, and tropical East African ecosystems.',
    chapters: [
      'Terrestrial Biomes & Temperature Relations',
      'Water Relations & Energy Budgets in Tropical Environments',
      'Population Genetics & Natural Selection',
      'Species Interactions: Competition & Mutualism',
      'Primary Production and Energy Flow in Sosiani Basin',
      'Environmental Impact Assessment (EIA) Regulations in Kenya'
    ],
    format: 'PDF E-Book',
    shelfLocation: 'Main Library 2nd Floor QH 541 .M65',
    isAvailableOnline: true
  },
  {
    id: 'book-6',
    title: 'Technical Drawing & Engineering Graphics with AutoCAD',
    author: 'Frederick E. Giesecke, Alva Mitchell',
    edition: '15th Edition',
    isbn: '978-0134306414',
    courseCodes: ['ENG 110', 'ENG 210'],
    department: 'School of Engineering',
    pages: 940,
    fileSize: '28.5 MB (PDF)',
    downloads: 1980,
    rating: 4.9,
    coverColor: 'from-orange-600 to-amber-950',
    description: 'Standard textbook for UoE engineering students covering geometric construction, multi-view projections, sectioning, dimensioning, tolerances, and computer-aided drafting (CAD).',
    chapters: [
      'Engineering Graphics as a Language',
      'Geometric Constructions and Orthographic Projections',
      'Sectional Views and Conventions',
      'Auxiliary Views and Isometric Sketching',
      'Dimensioning & Tolerancing (ISO Standards)',
      'Working Drawings & Introduction to Computer-Aided Drafting'
    ],
    format: 'PDF E-Book',
    shelfLocation: 'Engineering Department Library T 353 .G54',
    isAvailableOnline: true
  },
  {
    id: 'book-7',
    title: 'Sociology & Foundations of Education in Kenya',
    author: 'Prof. George Eshiwani & Daniel Sifuna',
    edition: 'Revised 2nd Edition',
    isbn: '978-9966465436',
    courseCodes: ['EDF 111', 'EDF 211', 'PSY 210'],
    department: 'School of Education',
    pages: 412,
    fileSize: '11.3 MB (PDF)',
    downloads: 2190,
    rating: 4.7,
    coverColor: 'from-purple-600 to-indigo-950',
    description: 'Crucial textbook for Bachelor of Education candidates exploring the historical development of schooling in Kenya, policy commissions (Ominde, Mackay), and CBC pedagogical shifts.',
    chapters: [
      'Indigenous Traditional African Education in Kenya',
      'Colonial Missionary Education and the Phelps-Stokes Commission',
      'Post-Independence Education Commissions (Ominde to Koech)',
      'The Transition from 8-4-4 to Competency Based Curriculum (CBC)',
      'Sociology of the Kenyan Classroom & Gender Equity',
      'Ethics and the Role of the Teachers Service Commission (TSC)'
    ],
    format: 'PDF E-Book',
    shelfLocation: 'Main Library Education Stack LA 1561 .S54',
    isAvailableOnline: true
  },
  {
    id: 'book-8',
    title: 'Organic Chemistry: Structure, Mechanism & Spectroscopy',
    author: 'Paula Yurkanis Bruice',
    edition: '8th Global Edition',
    isbn: '978-0134042282',
    courseCodes: ['CHE 110', 'CHE 210', 'BIO 112'],
    department: 'School of Science',
    pages: 1340,
    fileSize: '36.8 MB (PDF)',
    downloads: 2950,
    rating: 4.9,
    coverColor: 'from-red-600 to-rose-950',
    description: 'The core organic chemistry textbook for Science, Biochemistry, and Agriculture students. Features detailed reaction mechanisms, stereochemistry, NMR/IR spectroscopy, and biomolecules.',
    chapters: [
      'Electronic Structure and Bonding (Acids & Bases)',
      'An Introduction to Organic Compounds: Nomenclature & Physical Properties',
      'Alkenes: Structure, Reactivity, and Mechanisms',
      'Stereochemistry: Arrangement of Atoms in Space',
      'Substitution & Elimination Reactions of Alkyl Halides',
      'Mass Spectrometry, Infrared & NMR Spectroscopy'
    ],
    format: 'PDF E-Book',
    shelfLocation: 'Main Library QD 251.3 .B78',
    isAvailableOnline: true
  }
];
