import { HubResource, CourseGradeItem, ScholarshipItem } from '../types/prompt';

export interface UoEAnnouncement {
  id: string;
  title: string;
  category: 'Academics' | 'Exams' | 'HELB / Fees' | 'Hostels' | 'Student Union';
  date: string;
  urgent: boolean;
  content: string;
  linkText?: string;
}

export interface UoECampusService {
  id: string;
  name: string;
  category: 'Health' | 'Security' | 'Academic' | 'Welfare' | 'Transport';
  location: string;
  contact: string;
  hours: string;
  description: string;
  badge: string;
}

export interface UoEHostel {
  id: string;
  name: string;
  type: 'On-Campus (Chepkoilel)' | 'Off-Campus (Upper Stage)' | 'Off-Campus (Lower Stage)' | 'Off-Campus (Marura)';
  gender: 'Female Only' | 'Male Only' | 'Mixed';
  priceRange: string;
  securityRating: string;
  amenities: string[];
  contact: string;
}

export const UOE_RESOURCES: HubResource[] = [
  {
    id: 'res-1',
    title: 'COM 110: 5-Year Past Examination Papers (2019-2024) with Full Solution Key',
    courseCode: 'COM 110',
    courseName: 'Introduction to Computers & Information Technology',
    department: 'School of Science',
    type: 'past_exam',
    author: 'Kelvin Kiprop (Class Rep)',
    downloads: 1840,
    upvotes: 492,
    rating: 4.9,
    semester: 'Year 1 Semester 1',
    size: '4.8 MB',
    tags: ['Past Papers', 'Main Exam (70%)', 'CAT 1 & 2', 'Algorithms', 'Hardware'],
    description: 'Compilation of official University of Eldoret semester examinations and internal continuous assessment tests with worked solutions, flowchart traces, and binary conversion steps.',
    isVerified: true
  },
  {
    id: 'res-2',
    title: 'AGR 211: Principles of Agronomy & Crop Physiology Fieldwork Manual',
    courseCode: 'AGR 211',
    courseName: 'Principles of Crop Production & Agronomy',
    department: 'School of Agriculture & Biotechnology',
    type: 'lecture_notes',
    author: 'Faith Jepchumba (4th Year Agronomy)',
    downloads: 1220,
    upvotes: 348,
    rating: 4.8,
    semester: 'Year 2 Semester 1',
    size: '12.4 MB',
    tags: ['Chepkoilel Farm', 'Soil Fertility', 'Crop Diseases', 'Maize Trials', 'Weed Science'],
    description: 'Comprehensive course summaries aligned with UoE Chepkoilel commercial farm field practicals, nitrogen cycle breakdowns, and plant pathology slide reviews.',
    isVerified: true
  },
  {
    id: 'res-3',
    title: 'MAT 111: Calculus I, Coordinate Geometry & Proofs Cheat Sheet',
    courseCode: 'MAT 111',
    courseName: 'Basic Mathematics & Calculus I',
    department: 'School of Science',
    type: 'cheat_sheet',
    author: 'Brian Rotich (Math Club President)',
    downloads: 2680,
    upvotes: 780,
    rating: 5.0,
    semester: 'Year 1 Semester 1',
    size: '1.9 MB',
    tags: ['Derivatives', 'Integration Rules', 'Limits', 'Chain Rule', 'L\'Hopital'],
    description: 'Concise 4-page laminated-style formula sheet containing all limits, derivative formulas, integration techniques, coordinate geometry proofs, and practice shortcuts for UoE first-years.',
    isVerified: true
  },
  {
    id: 'res-4',
    title: 'BMS 102: Business Mathematics, Annuities & Statistics Revision Bank',
    courseCode: 'BMS 102',
    courseName: 'Business Mathematics & Statistics',
    department: 'School of Business & Management Sciences',
    type: 'past_exam',
    author: 'Mercy Chebet (BCom Peer Tutor)',
    downloads: 1460,
    upvotes: 380,
    rating: 4.7,
    semester: 'Year 1 Semester 2',
    size: '6.2 MB',
    tags: ['BCom', 'Statistics', 'Annuities', 'Hypothesis Testing', 'Linear Programming'],
    description: 'Past 5 years of University of Eldoret School of Business exams with step-by-step financial calculations, probability distributions, and exam tips.',
    isVerified: true
  },
  {
    id: 'res-5',
    title: 'ENS 210: Environmental Ecology & Sosiani River EIA Field Practical Manual',
    courseCode: 'ENS 210',
    courseName: 'Principles of Environmental Science & Ecology',
    department: 'School of Environmental Studies',
    type: 'lab_report',
    author: 'Emmanuel Kipruto',
    downloads: 890,
    upvotes: 245,
    rating: 4.8,
    semester: 'Year 2 Semester 2',
    size: '8.5 MB',
    tags: ['EIA', 'Ecology', 'Sosiani River', 'Water Quality', 'Biodiversity Sampling'],
    description: 'Standardized laboratory and field excursion reports investigating Sosiani River water quality, sampling procedures, and Environmental Impact Assessment (EIA) templates.',
    isVerified: true
  },
  {
    id: 'res-6',
    title: 'ENG 110: Technical Drawing, Orthographic Projections & CAD Exercises',
    courseCode: 'ENG 110',
    courseName: 'Introduction to Technical & Engineering Drawing',
    department: 'School of Engineering',
    type: 'syllabus',
    author: 'Dennis Koech (Engineering Society)',
    downloads: 1140,
    upvotes: 310,
    rating: 4.9,
    semester: 'Year 1 Semester 1',
    size: '15.1 MB',
    tags: ['AutoCAD', 'Orthographic Projection', 'Isometric', 'Chep Labs', 'Dimensioning'],
    description: 'Approved drawing exercises, isometric conversion tutorials, line conventions, and step-by-step projection exercises for engineering freshmen at the Chepkoilel labs.',
    isVerified: true
  },
  {
    id: 'res-7',
    title: 'EDF 111: History and Evolution of Education in Kenya Summary Guide',
    courseCode: 'EDF 111',
    courseName: 'History and Foundations of Education',
    department: 'School of Education',
    type: 'lecture_notes',
    author: 'Gladys Cherono',
    downloads: 1620,
    upvotes: 420,
    rating: 4.7,
    semester: 'Year 1 Semester 1',
    size: '3.4 MB',
    tags: ['Ominde Commission', 'CBC Transition', 'Phelps Stokes', '8-4-4', 'Mackay Report'],
    description: 'High-yield exam review covering Kenyan educational commissions (Ominde, Gachathi, Mackay, Kamunge, Koech) and Competency Based Curriculum (CBC) policy frameworks.',
    isVerified: true
  },
  {
    id: 'res-8',
    title: 'CHE 110: General and Physical Chemistry CAT 1 & 2 Revision Seminar Video',
    courseCode: 'CHE 110',
    courseName: 'General and Physical Chemistry',
    department: 'School of Science',
    type: 'video_rec',
    author: 'UoE Chem Club & Peer Mentors',
    downloads: 1910,
    upvotes: 560,
    rating: 4.9,
    semester: 'Year 1 Semester 1',
    size: '72 MB (Video)',
    tags: ['Thermodynamics', 'Atomic Structure', 'Equilibrium', 'Titrations', 'Kinetics'],
    description: 'Recorded peer revision session breaking down thermodynamics, chemical equilibrium constants, and titration calculations before UoE main semester examinations.',
    isVerified: true
  },
  {
    id: 'res-9',
    title: 'WLM 211: Wildlife Ecology, Census Techniques & Rangeland Habitat Notes',
    courseCode: 'WLM 211',
    courseName: 'Wildlife Ecology and Management',
    department: 'School of Natural Resource Management',
    type: 'lecture_notes',
    author: 'Caleb Kiplagat (Wildlife Club)',
    downloads: 710,
    upvotes: 195,
    rating: 4.8,
    semester: 'Year 2 Semester 1',
    size: '9.1 MB',
    tags: ['Census Methods', 'KWS Reserves', 'Rangelands', 'Animal Behavior', 'Conservation'],
    description: 'Field notes on transect census methods, habitat carrying capacity, human-wildlife conflict mitigation in the Kerio Valley, and Kenya Wildlife Service (KWS) field guidelines.',
    isVerified: true
  },
  {
    id: 'res-10',
    title: 'ECO 211: Intermediate Microeconomics & Market Structures Problem Sets',
    courseCode: 'ECO 211',
    courseName: 'Intermediate Microeconomics',
    department: 'School of Economics',
    type: 'past_exam',
    author: 'Sharon Jepkosgei',
    downloads: 950,
    upvotes: 270,
    rating: 4.8,
    semester: 'Year 2 Semester 1',
    size: '5.2 MB',
    tags: ['Consumer Theory', 'Lagrangian Multipliers', 'Oligopoly', 'Game Theory'],
    description: 'Complete problem sets and past examination walkthroughs covering utility maximization, indifference curves, Cobb-Douglas production, and Cournot/Stackelberg duopoly models.',
    isVerified: true
  },
  {
    id: 'res-11',
    title: 'BIO 112: Cell Biology, Genetics & Lab Microscopy Practical Guide',
    courseCode: 'BIO 112',
    courseName: 'Basic Cell Biology and Genetics',
    department: 'School of Science',
    type: 'lab_report',
    author: 'Dr. Kemboi / Peer Group',
    downloads: 1410,
    upvotes: 390,
    rating: 4.9,
    semester: 'Year 1 Semester 2',
    size: '7.8 MB',
    tags: ['Mitosis', 'Meiosis', 'Mendelian Genetics', 'Gram Staining', 'Chep Science Labs'],
    description: 'Comprehensive laboratory manual with detailed microscope diagrams, Gram-staining protocol sheets, and Mendelian dihybrid cross problem sets.',
    isVerified: true
  },
  {
    id: 'res-12',
    title: 'ACC 110: Principles of Financial Accounting & Ledger Balancing Cheatsheet',
    courseCode: 'ACC 110',
    courseName: 'Financial Accounting I',
    department: 'School of Business & Management Sciences',
    type: 'cheat_sheet',
    author: 'Victor Mwangi (CPA Level 2)',
    downloads: 1820,
    upvotes: 510,
    rating: 5.0,
    semester: 'Year 1 Semester 1',
    size: '2.3 MB',
    tags: ['Debit & Credit Rules', 'Trial Balance', 'Income Statement', 'Depreciation', 'Balance Sheet'],
    description: 'Step-by-step accounting rules, double-entry bookkeeping mnemonics, bank reconciliation workflows, and depreciation methods (straight-line and reducing balance).',
    isVerified: true
  }
];

export const INITIAL_UOE_GRADES: CourseGradeItem[] = [
  { id: 'g-1', name: 'COM 110: Intro to Computers', credits: 3, grade: 'A' },
  { id: 'g-2', name: 'MAT 111: Calculus I', credits: 3, grade: 'A-' },
  { id: 'g-3', name: 'AGR 211: Crop Production', credits: 3, grade: 'B+' },
  { id: 'g-4', name: 'BMS 102: Business Mathematics', credits: 3, grade: 'A' },
  { id: 'g-5', name: 'CHE 110: General Chemistry', credits: 3, grade: 'B' },
  { id: 'g-6', name: 'EDF 111: Foundations of Education', credits: 3, grade: 'A' }
];

export const UOE_SCHOLARSHIPS: ScholarshipItem[] = [
  {
    id: 'sch-1',
    title: 'HELB Undergraduate Upkeep Loan & Subsequent Bursary (2024/2025)',
    provider: 'Higher Education Loans Board (Kenya)',
    amount: 'KSh 40,000 - 60,000 / Year',
    deadline: 'December 15, 2024',
    category: 'Need-Based',
    gpaRequirement: 2.0,
    description: 'Tuition financing and upkeep allocation for Government-sponsored and self-sponsored students enrolled at the University of Eldoret.',
    url: 'https://hef.co.ke'
  },
  {
    id: 'sch-2',
    title: 'Uasin Gishu County Governor Bursary Fund',
    provider: 'County Government of Uasin Gishu',
    amount: 'KSh 15,000 - 30,000 / Semester',
    deadline: 'January 20, 2025',
    category: 'Need-Based',
    gpaRequirement: 2.5,
    description: 'Financial assistance for vulnerable, orphan, and deserving students residing in Eldoret sub-counties (Soy, Turbo, Ainabkoi, Kapseret, Kesses, Moiben).',
    url: 'https://uasingishu.go.ke'
  },
  {
    id: 'sch-3',
    title: 'UoE Vice-Chancellor Academic Excellence Merit Award',
    provider: 'University of Eldoret Senate',
    amount: 'KSh 50,000 + Certificate of Honours',
    deadline: 'End of Academic Year',
    category: 'Merit',
    gpaRequirement: 3.7,
    description: 'Annual tuition relief granted to the highest-scoring First Class Honours students across every academic school.',
    url: 'https://uoeld.ac.ke'
  },
  {
    id: 'sch-4',
    title: 'Kenya National Research Fund (NRF) Science & Agronomy Grant',
    provider: 'National Research Fund (NRF)',
    amount: 'KSh 150,000 / Research Team',
    deadline: 'February 28, 2025',
    category: 'STEM',
    gpaRequirement: 3.2,
    description: 'Undergraduate and post-graduate innovation grant supporting agriculture, food security, environmental conservation, and renewable energy.',
    url: 'https://researchfund.go.ke'
  },
  {
    id: 'sch-5',
    title: 'UoEGSU Emergency Student Kitty',
    provider: 'University of Eldoret General Students Union',
    amount: 'KSh 5,000 - 10,000 (Immediate relief)',
    deadline: 'Rolling Basis (Throughout Semester)',
    category: 'Need-Based',
    gpaRequirement: 2.0,
    description: 'Emergency micro-grant for students facing unexpected medical bills, bereavement, or sudden food insecurity during exam periods.',
    url: '#'
  }
];

export const UOE_ANNOUNCEMENTS: UoEAnnouncement[] = [
  {
    id: 'ann-1',
    title: '2024/2025 Semester I Main Examination Timetable Released',
    category: 'Exams',
    date: 'Updated 2 hours ago',
    urgent: true,
    content: 'The Senate-approved draft timetable for Semester I Main Examinations is available for download. Course unit clashes must be reported to the Dean of School before Friday 5:00 PM.'
  },
  {
    id: 'ann-2',
    title: 'UoE ERP Portal Fee Clearance Deadline for Exam Cards',
    category: 'HELB / Fees',
    date: 'Published yesterday',
    urgent: true,
    content: 'Students must clear at least 75% of tuition fees to verify and print the official Examination Card. Students with pending HELB/HEF disbursement should present verification slips at the Finance Office.'
  },
  {
    id: 'ann-3',
    title: 'Chepkoilel Hostel Room Allocation for Semester II Booking Open',
    category: 'Hostels',
    date: 'Nov 06, 2024',
    urgent: false,
    content: 'Internal room allocation for Halls 1 to 6 will be processed on a first-come, first-served basis via the student portal. Off-campus listings in Marura and Upper Stage have been updated.'
  },
  {
    id: 'ann-4',
    title: 'Margaret Thatcher Library Extended Hours During Exam Season',
    category: 'Academics',
    date: 'Nov 04, 2024',
    urgent: false,
    content: 'The Main Campus Library will remain open until 11:00 PM on weekdays and 7:00 PM on Saturdays starting this week to facilitate group and individual revisions.'
  }
];

export const UOE_CAMPUS_SERVICES: UoECampusService[] = [
  {
    id: 'serv-1',
    name: 'University Health Centre (Chepkoilel Clinic)',
    category: 'Health',
    location: 'Main Campus, near Administration Block',
    contact: 'Emergency: +254 722 000 112 / Ext 220',
    hours: '24 Hours Daily (Doctors, Clinical Officers & Pharmacy on Duty)',
    description: 'Outpatient consultations, emergency ambulance triage, laboratory testing, and basic pharmaceuticals for all registered UoE students.',
    badge: '24/7 Medical'
  },
  {
    id: 'serv-2',
    name: 'UoE Security Operations & Emergency Patrol',
    category: 'Security',
    location: 'Main Gate & Hostels Checkpoint',
    contact: 'Hotline: +254 712 345 678 / +254 733 999 111',
    hours: '24 Hours Daily Patrols',
    description: 'Campus perimeter security, Chepkoilel night patrols, lost and found, and emergency response across academic zones and hostels.',
    badge: '24/7 Security'
  },
  {
    id: 'serv-3',
    name: 'Dean of Students & Counselling Center',
    category: 'Welfare',
    location: 'Student Centre Building, 1st Floor',
    contact: 'deanofstudents@uoeld.ac.ke / +254 774 249 552',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM',
    description: 'Mental health guidance, bursary endorsement, clubs coordination, and student welfare support.',
    badge: 'Mental Wellness & Bursary'
  },
  {
    id: 'serv-4',
    name: 'Margaret Thatcher Main Campus Library',
    category: 'Academic',
    location: 'Central Campus Plaza, Main Campus',
    contact: 'library@uoeld.ac.ke / Digital Repository Desk',
    hours: 'Mon - Fri: 8:00 AM - 11:00 PM | Sat: 9:00 AM - 7:00 PM',
    description: 'Over 120,000 physical volumes, high-speed Wi-Fi, silent study cubicles, past examination hardcopy archives, and e-book repositories.',
    badge: 'Library & Wi-Fi'
  },
  {
    id: 'serv-5',
    name: 'Chepkoilel - Eldoret CBD Matatu Stage',
    category: 'Transport',
    location: 'Outside University Main Gate',
    contact: 'Chepkoilel Sacco / Town Shuttles',
    hours: '5:30 AM - 10:30 PM Daily (Every 5 minutes)',
    description: 'Standard fare KSh 40 - 50 to Eldoret Town (Uganda Road / Oginga Odinga Street). Safe and reliable transport for Town Campus students.',
    badge: 'Transit'
  }
];

export const UOE_HOSTELS: UoEHostel[] = [
  {
    id: 'hos-1',
    name: 'Hall 1 & Hall 2 (Chepkoilel Internal)',
    type: 'On-Campus (Chepkoilel)',
    gender: 'Female Only',
    priceRange: 'KSh 3,500 - 4,500 / Semester',
    securityRating: 'Very High (Campus Guarded)',
    amenities: ['Free Water & Electricity', 'Wi-Fi Near Reading Room', 'Direct Library Access', 'CCTV on Corridors'],
    contact: 'Book via UoE ERP Student Portal'
  },
  {
    id: 'hos-2',
    name: 'Hall 3, 4 & 5 (Chepkoilel Internal)',
    type: 'On-Campus (Chepkoilel)',
    gender: 'Male Only',
    priceRange: 'KSh 3,500 - 4,500 / Semester',
    securityRating: 'Very High (Campus Guarded)',
    amenities: ['Free Water & Electricity', 'Walking distance to Science labs', 'Football pitch adjacent'],
    contact: 'Book via UoE ERP Student Portal'
  },
  {
    id: 'hos-3',
    name: 'Upper Stage Heights Apartments',
    type: 'Off-Campus (Upper Stage)',
    gender: 'Mixed',
    priceRange: 'KSh 3,500 - 6,000 / Month (Single / Bedsitter)',
    securityRating: 'High (Gated & Guarded)',
    amenities: ['Borehole Water 24/7', 'Tokens Electricity', 'Fibre Wi-Fi Available', 'Near Supermarkets & Cafes'],
    contact: '+254 720 112 344 (Caretaker Kimutai)'
  },
  {
    id: 'hos-4',
    name: 'Marura Green Palms Residences',
    type: 'Off-Campus (Marura)',
    gender: 'Mixed',
    priceRange: 'KSh 3,000 - 5,000 / Month',
    securityRating: 'Moderate to High',
    amenities: ['Quiet Study Environment', 'Spacious Bedsitters', 'Ample Cloth Drying Lines', 'Perimeter Wall'],
    contact: '+254 711 889 002 (Mama Brian Rentals)'
  },
  {
    id: 'hos-5',
    name: 'Lower Stage Executive Hostels',
    type: 'Off-Campus (Lower Stage)',
    gender: 'Mixed',
    priceRange: 'KSh 2,500 - 4,000 / Month',
    securityRating: 'Moderate',
    amenities: ['Affordable Single Rooms', 'Near Matatu Boarding Point', 'Boda-boda Stage 20m away'],
    contact: '+254 725 334 119'
  }
];

export const UOE_SCHOOLS = [
  { id: 'All', name: 'All 8 Academic Schools', short: 'All Schools' },
  { id: 'School of Science', name: 'School of Science', short: 'Science' },
  { id: 'School of Agriculture & Biotechnology', name: 'School of Agriculture & Biotechnology', short: 'Agriculture' },
  { id: 'School of Business & Management Sciences', name: 'School of Business & Management Sciences', short: 'Business' },
  { id: 'School of Environmental Studies', name: 'School of Environmental Studies', short: 'Environmental' },
  { id: 'School of Engineering', name: 'School of Engineering', short: 'Engineering' },
  { id: 'School of Education', name: 'School of Education', short: 'Education' },
  { id: 'School of Natural Resource Management', name: 'School of Natural Resource Management', short: 'Natural Resources' },
  { id: 'School of Economics', name: 'School of Economics', short: 'Economics' }
];
