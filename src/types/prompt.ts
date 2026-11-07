export interface PromptStructure {
  id: string;
  title: string;
  subtitle: string;
  category: 'comprehensive' | 'stem' | 'medical' | 'highschool' | 'notion_style';
  context: string;
  role: string;
  task: string;
  requirements: {
    designSystem: string[];
    coreModules: {
      name: string;
      description: string;
      keyFeatures: string[];
    }[];
    techStack: string[];
    stateManagement: string[];
    accessibilityAndPerf: string[];
    mockDataSchema: string[];
  };
  outputFormat: string[];
}

export interface PromptConfig {
  institutionType: 'university' | 'community_college' | 'stem_institute' | 'medical_school' | 'high_school';
  primaryFocus: 'academic_vault' | 'gpa_study_planner' | 'peer_collaboration' | 'campus_survival' | 'all_in_one';
  techStack: 'react_tailwind' | 'nextjs_tailwind' | 'vue_tailwind' | 'vanilla_tailwind';
  targetAiTool: 'google_ai_studio' | 'claude_artifacts' | 'cursor' | 'v0' | 'chatgpt';
  selectedModules: string[];
  includeInteractiveDemos: boolean;
  includeLofiAudio: boolean;
  includeGpaCalculator: boolean;
  includeExamCountdown: boolean;
  includeNotesExchange: boolean;
  includeScholarships: boolean;
  includeMentalWellness: boolean;
  outputFormatStyle: 'standard_markdown' | 'xml_tags' | 'json_schema' | 'concise';
  customNotes: string;
}

export interface HubResource {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  department: string;
  type: 'past_exam' | 'lecture_notes' | 'cheat_sheet' | 'syllabus' | 'lab_report' | 'video_rec';
  author: string;
  downloads: number;
  upvotes: number;
  rating: number;
  semester: string;
  size: string;
  tags: string[];
  description: string;
  isVerified: boolean;
}

export interface CourseGradeItem {
  id: string;
  name: string;
  credits: number;
  grade: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D' | 'F';
}

export interface ScholarshipItem {
  id: string;
  title: string;
  provider: string;
  amount: string;
  deadline: string;
  category: 'Merit' | 'Need-Based' | 'STEM' | 'First-Gen' | 'Diversity';
  gpaRequirement: number;
  description: string;
  url: string;
}
