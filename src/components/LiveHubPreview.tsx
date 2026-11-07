import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Search, 
  FileText, 
  Download, 
  ThumbsUp, 
  Calculator, 
  Clock, 
  HeartHandshake, 
  Coins, 
  ShieldAlert, 
  CheckCircle, 
  Phone, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Plus, 
  Trash2, 
  ExternalLink,
  Building,
  Sparkles,
  ArrowRight,
  BookMarked,
  X
} from 'lucide-react';
import { 
  UOE_RESOURCES, 
  INITIAL_UOE_GRADES, 
  UOE_SCHOLARSHIPS, 
  UOE_ANNOUNCEMENTS, 
  UOE_CAMPUS_SERVICES 
} from '../data/mockHubData';
import { HubResource, CourseGradeItem } from '../types/prompt';

export const LiveHubPreview: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'vault' | 'gpa' | 'pomodoro' | 'bursaries' | 'emergency'>('vault');
  
  // Search and filter state for resources
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [resources, setResources] = useState<HubResource[]>(UOE_RESOURCES);
  const [previewResource, setPreviewResource] = useState<HubResource | null>(null);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  // GPA Calculator State (Kenyan 30% CAT + 70% Final Exam)
  const [courseGrades, setCourseGrades] = useState<CourseGradeItem[]>(INITIAL_UOE_GRADES);
  const [catScoreInput, setCatScoreInput] = useState<number>(24); // out of 30
  const [targetFinalGrade, setTargetFinalGrade] = useState<'A' | 'B' | 'C'>('A');

  // Pomodoro Timer State
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'focus' | 'break'>('focus');
  const [soundscape, setSoundscape] = useState<'silence' | 'rain' | 'lofi'>('silence');
  const [sessionsCompleted, setSessionsCompleted] = useState(3);

  // New Note Modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteCode, setNewNoteCode] = useState('COM 110');
  const [newNoteSchool, setNewNoteSchool] = useState('School of Science');

  // Pomodoro countdown effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      if (timerMode === 'focus') {
        setTimerMode('break');
        setTimerSeconds(5 * 60);
        setSessionsCompleted((c) => c + 1);
      } else {
        setTimerMode('focus');
        setTimerSeconds(25 * 60);
      }
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, timerMode]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleUpvote = (id: string) => {
    setResources((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item
      )
    );
  };

  const handleSimulateDownload = (resource: HubResource) => {
    setDownloadSuccessMessage(`Downloading "${resource.title}" (${resource.size})...`);
    setResources((prev) =>
      prev.map((item) =>
        item.id === resource.id ? { ...item, downloads: item.downloads + 1 } : item
      )
    );
    setTimeout(() => {
      setDownloadSuccessMessage(null);
    }, 3500);
  };

  // GPA Computations according to Kenyan Public University standards
  const gradePoints: Record<string, number> = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'D': 1.0, 'F': 0.0
  };

  const totalCredits = courseGrades.reduce((acc, c) => acc + c.credits, 0);
  const totalQualityPoints = courseGrades.reduce(
    (acc, c) => acc + c.credits * (gradePoints[c.grade] || 0),
    0
  );
  const currentGPA = totalCredits > 0 ? (totalQualityPoints / totalCredits).toFixed(2) : '0.00';

  // Determine Kenyan Degree Classification
  const getDegreeClass = (gpa: number) => {
    if (gpa >= 3.68) return { title: 'First Class Honours', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
    if (gpa >= 3.0) return { title: 'Second Class Honours (Upper Division)', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    if (gpa >= 2.3) return { title: 'Second Class Honours (Lower Division)', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' };
    if (gpa >= 2.0) return { title: 'Pass', color: 'text-slate-300 bg-slate-800 border-slate-700' };
    return { title: 'Fail / Academic Warning', color: 'text-red-400 bg-red-950/40 border-red-800' };
  };

  const degreeClass = getDegreeClass(parseFloat(currentGPA));

  // Compute marks needed on 70% exam
  // Kenyan universities: Grade A is >= 70 total marks, Grade B is >= 60, Grade C is >= 50
  const targetThreshold = targetFinalGrade === 'A' ? 70 : targetFinalGrade === 'B' ? 60 : 50;
  const marksNeededOnExam = Math.max(0, targetThreshold - catScoreInput);
  const percentageOnFinalExam = ((marksNeededOnExam / 70) * 100).toFixed(1);

  // Filtered resources
  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSchool = selectedSchool === 'All' || res.department === selectedSchool;
    const matchesType = selectedType === 'All' || res.type === selectedType;

    return matchesSearch && matchesSchool && matchesType;
  });

  const handleAddCourse = () => {
    const newCourse: CourseGradeItem = {
      id: `g-${Date.now()}`,
      name: `UoE Unit ${courseGrades.length + 1}`,
      credits: 3,
      grade: 'A'
    };
    setCourseGrades([...courseGrades, newCourse]);
  };

  const handleRemoveCourse = (id: string) => {
    setCourseGrades(courseGrades.filter((c) => c.id !== id));
  };

  const handleUpdateCourseGrade = (id: string, grade: CourseGradeItem['grade']) => {
    setCourseGrades(
      courseGrades.map((c) => (c.id === id ? { ...c, grade } : c))
    );
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;

    const newRes: HubResource = {
      id: `res-${Date.now()}`,
      title: newNoteTitle,
      courseCode: newNoteCode,
      courseName: 'Custom Course Upload',
      department: newNoteSchool,
      type: 'lecture_notes',
      author: 'You (Student Contributor)',
      downloads: 1,
      upvotes: 1,
      rating: 5.0,
      semester: '2024/2025 Current',
      size: '2.4 MB',
      tags: ['Student Contribution', 'Revision Guide'],
      description: 'Newly contributed revision guide uploaded by a University of Eldoret student.',
      isVerified: false
    };

    setResources([newRes, ...resources]);
    setIsUploadModalOpen(false);
    setNewNoteTitle('');
    setDownloadSuccessMessage('Resource contributed successfully to UoE repository!');
    setTimeout(() => setDownloadSuccessMessage(null), 3000);
  };

  return (
    <div className="rounded-2xl border border-emerald-800/80 bg-[#071710] shadow-2xl overflow-hidden">
      
      {/* Simulation Header / Badge */}
      <div className="bg-[#040f0a] px-4 py-2 border-b border-emerald-950/90 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2 text-amber-400 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive Prototype Generated from the Prompt</span>
        </div>
        <span className="text-slate-400 text-[11px]">
          Simulating: University of Eldoret Main Campus (Chepkoilel) & Town Campus
        </span>
      </div>

      {/* Download Alert Notification */}
      {downloadSuccessMessage && (
        <div className="bg-emerald-900 text-white px-4 py-2.5 text-xs font-semibold flex items-center justify-between border-b border-emerald-700 animate-fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-amber-400" />
            <span>{downloadSuccessMessage}</span>
          </div>
          <button onClick={() => setDownloadSuccessMessage(null)} className="text-slate-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* UoE Hero Navigation inside the Hub */}
      <div className="p-6 bg-gradient-to-br from-[#0a291e] via-[#071c14] to-[#04120d] border-b border-emerald-900/60">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-amber-500 p-0.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-[#051a12] rounded-[14px] flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  UoE Student Resource Hub
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Chepkoilel
                </span>
              </div>
              <p className="text-xs text-emerald-300/80">
                Flame of Knowledge and Innovation • Academic Repository, CAT Calculators & Campus Life
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Contribute Notes</span>
            </button>
          </div>
        </div>

        {/* Hub Navigation Tabs */}
        <div className="flex items-center space-x-1.5 mt-6 overflow-x-auto pb-1 text-xs sm:text-sm">
          <button
            onClick={() => setActiveSubTab('vault')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeSubTab === 'vault'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-emerald-950/60'
            }`}
          >
            <BookMarked className="w-4 h-4 text-amber-300" />
            <span>Past Papers & Vault</span>
          </button>

          <button
            onClick={() => setActiveSubTab('gpa')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeSubTab === 'gpa'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-emerald-950/60'
            }`}
          >
            <Calculator className="w-4 h-4 text-emerald-300" />
            <span>Grade & CAT Forecaster</span>
          </button>

          <button
            onClick={() => setActiveSubTab('pomodoro')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeSubTab === 'pomodoro'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-emerald-950/60'
            }`}
          >
            <Clock className="w-4 h-4 text-cyan-300" />
            <span>Study Lounge</span>
          </button>

          <button
            onClick={() => setActiveSubTab('bursaries')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeSubTab === 'bursaries'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-emerald-950/60'
            }`}
          >
            <Coins className="w-4 h-4 text-yellow-300" />
            <span>HELB & Bursaries</span>
          </button>

          <button
            onClick={() => setActiveSubTab('emergency')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeSubTab === 'emergency'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-emerald-950/60'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>Campus Emergency & Health</span>
          </button>
        </div>
      </div>

      {/* Main Prototype Content Area */}
      <div className="p-6">
        
        {/* SUBTAB 1: PAST PAPERS & REVISION VAULT */}
        {activeSubTab === 'vault' && (
          <div className="space-y-6">
            
            {/* Search and Filters Bar */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search course code (e.g. COM 110, AGR 211, BMS 102), exam year, or keywords..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#091b14] border border-emerald-900/60 text-slate-200 text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* School Filter */}
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#091b14] border border-emerald-900/60 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="All">All UoE Schools</option>
                <option value="School of Science">School of Science</option>
                <option value="School of Agriculture & Biotechnology">School of Agriculture & Biotech</option>
                <option value="School of Business & Management Sciences">School of Business & Mgt</option>
                <option value="School of Environmental Studies">School of Environmental Studies</option>
                <option value="School of Engineering">School of Engineering</option>
                <option value="School of Education">School of Education</option>
              </select>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#091b14] border border-emerald-900/60 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="All">All Document Types</option>
                <option value="past_exam">Main Past Exams (70%)</option>
                <option value="lecture_notes">Lecture Notes</option>
                <option value="cheat_sheet">Formula & Cheat Sheets</option>
                <option value="lab_report">Lab Manuals & Excursions</option>
                <option value="video_rec">Video Seminar Recaps</option>
              </select>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResources.map((res) => (
                <div
                  key={res.id}
                  className="p-5 rounded-2xl bg-[#091b14]/90 border border-emerald-900/50 hover:border-emerald-600/70 transition-all flex flex-col justify-between shadow-md"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          {res.courseCode}
                        </span>
                        <span className="text-[11px] text-emerald-300/80 font-medium truncate max-w-[180px]">
                          {res.department}
                        </span>
                      </div>
                      {res.isVerified && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0">
                          Lecturer Verified
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-white hover:text-amber-300 transition-colors line-clamp-2 mb-1.5 cursor-pointer" onClick={() => setPreviewResource(res)}>
                      {res.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                      {res.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {res.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#06140e] text-slate-400 border border-emerald-950">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Metadata & Actions */}
                  <div className="pt-3 border-t border-emerald-900/40 flex items-center justify-between text-xs">
                    <div className="text-slate-400 text-[11px]">
                      <span>{res.size}</span> • <span>{res.downloads} downloads</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpvote(res.id)}
                        className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 text-xs border border-emerald-800/40 transition-colors"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{res.upvotes}</span>
                      </button>

                      <button
                        onClick={() => handleSimulateDownload(res)}
                        className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Get Paper</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12 p-6 rounded-2xl bg-[#091b14] border border-emerald-900/40">
                <Search className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-white">No resources matching your query</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Try adjusting the school filter or searching for another UoE course unit.
                </p>
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 2: UOE GPA & CAT FORECASTER */}
        {activeSubTab === 'gpa' && (
          <div className="space-y-6">
            
            {/* Top Explanation Banner */}
            <div className="p-4 rounded-xl bg-[#091e16] border border-amber-500/30 text-xs text-slate-200 leading-relaxed">
              <span className="font-bold text-amber-300 block mb-1">
                🇰🇪 Kenyan Public University Degree Classification System:
              </span>
              Final course mark is composed of <strong className="text-white">30% Continuous Assessment Test (CAT 1 & 2 + Practicals)</strong> and <strong className="text-white">70% End-of-Semester Main Examination</strong>. 
              First Class Honours: 70%+ (4.0) | 2nd Upper: 60-69% (3.0-3.99) | 2nd Lower: 50-59% (2.0-2.99) | Pass: 40-49%.
            </div>

            {/* GPA Score Card Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#091b14] border border-emerald-900/50">
                <span className="text-xs text-slate-400 font-medium">Cumulative GPA (4.0 Scale)</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 mt-1">
                  {currentGPA}
                </div>
                <span className="text-xs text-emerald-400/80 mt-1 block">
                  Calculated from {totalCredits} Total Credits
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#091b14] border border-emerald-900/50 sm:col-span-2 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-medium">Projected Degree Classification</span>
                  <div className={`mt-2 inline-block px-3.5 py-1.5 rounded-xl border text-sm sm:text-base font-bold ${degreeClass.color}`}>
                    {degreeClass.title}
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Official senate graduation status for University of Eldoret students.
                </p>
              </div>
            </div>

            {/* Interactive Course Unit Table */}
            <div className="rounded-2xl bg-[#091b14] border border-emerald-900/50 overflow-hidden">
              <div className="p-4 border-b border-emerald-900/40 flex items-center justify-between">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  <span>Semester Course Units & Grades</span>
                </h3>
                <button
                  onClick={handleAddCourse}
                  className="flex items-center space-x-1 text-xs px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Course Unit</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#06140e] text-slate-400 font-semibold border-b border-emerald-900/40">
                    <tr>
                      <th className="py-3 px-4">Course Unit</th>
                      <th className="py-3 px-4">Credit Hours</th>
                      <th className="py-3 px-4">Grade Achieved</th>
                      <th className="py-3 px-4">Grade Points</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-900/30 text-slate-200">
                    {courseGrades.map((course) => (
                      <tr key={course.id} className="hover:bg-emerald-950/30 transition-colors">
                        <td className="py-3 px-4 font-medium">{course.name}</td>
                        <td className="py-3 px-4">{course.credits} Credits</td>
                        <td className="py-3 px-4">
                          <select
                            value={course.grade}
                            onChange={(e) => handleUpdateCourseGrade(course.id, e.target.value as any)}
                            className="bg-[#091f16] border border-emerald-800/60 rounded-md px-2 py-1 text-amber-300 font-bold focus:outline-none"
                          >
                            <option value="A">A (70-100%) - 4.0</option>
                            <option value="A-">A- (65-69%) - 3.7</option>
                            <option value="B+">B+ (60-64%) - 3.3</option>
                            <option value="B">B (55-59%) - 3.0</option>
                            <option value="B-">B- (50-54%) - 2.7</option>
                            <option value="C+">C+ (45-49%) - 2.3</option>
                            <option value="C">C (40-44%) - 2.0</option>
                            <option value="D">D (35-39%) - 1.0</option>
                            <option value="F">F (&lt;35%) - 0.0</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 font-mono text-emerald-400 font-bold">
                          {(gradePoints[course.grade] * course.credits).toFixed(1)} QP
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleRemoveCourse(course.id)}
                            className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Target Final Exam Forecaster (CAT 30% + Final 70%) */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#091e16] to-[#0d2a20] border border-amber-500/40 space-y-4">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <h3>Target Final Exam Forecaster (What score do I need on the 70% exam?)</h3>
              </div>
              <p className="text-xs text-slate-300">
                Enter your Continuous Assessment Test (CAT) total out of 30, and select your target grade for the course.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Your Total CAT Score (out of 30):</label>
                  <input
                    type="number"
                    min={0}
                    max={30}
                    value={catScoreInput}
                    onChange={(e) => setCatScoreInput(Math.min(30, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-full px-3 py-2 rounded-xl bg-[#06140e] border border-emerald-800 text-amber-300 font-bold text-base focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Target Desired Letter Grade:</label>
                  <select
                    value={targetFinalGrade}
                    onChange={(e) => setTargetFinalGrade(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#06140e] border border-emerald-800 text-emerald-300 font-bold text-base focus:outline-none"
                  >
                    <option value="A">Grade A (First Class - 70%+ overall)</option>
                    <option value="B">Grade B (Second Class Upper - 60%+ overall)</option>
                    <option value="C">Grade C (Pass - 50%+ overall)</option>
                  </select>
                </div>

                <div className="p-3.5 rounded-xl bg-[#06140e] border border-emerald-900 text-center">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Score Needed on 70% Exam</span>
                  <div className="text-2xl font-black text-amber-400 mt-0.5">
                    {marksNeededOnExam} / 70
                  </div>
                  <span className="text-[11px] text-emerald-400">
                    ({percentageOnFinalExam}% on the exam paper)
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* SUBTAB 3: CHEPKOILEL FOCUS LOUNGE & POMODORO */}
        {activeSubTab === 'pomodoro' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Margaret Thatcher Library • Virtual Study Station
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                Deep Work Focus Lounge
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Eliminate exam stress with science-backed 25-minute study intervals.
              </p>
            </div>

            {/* Pomodoro Timer Card */}
            <div className="p-8 rounded-3xl bg-[#091b14] border border-emerald-800/80 text-center shadow-2xl relative overflow-hidden">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-emerald-950 text-emerald-300 border border-emerald-800">
                {timerMode === 'focus' ? '🎯 Focus Session (25 Min)' : '☕ Rest Break (5 Min)'}
              </div>

              <div className="text-6xl sm:text-7xl font-mono font-black text-amber-400 tracking-wider my-4">
                {formatTimer(timerSeconds)}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-3 mt-6">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg transition-transform active:scale-95"
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="w-5 h-5" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" />
                      <span>Start Focus</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(timerMode === 'focus' ? 25 * 60 : 5 * 60);
                  }}
                  className="p-3 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 text-slate-300 hover:text-white border border-emerald-800 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              {/* Soundscape Selector */}
              <div className="mt-8 pt-6 border-t border-emerald-900/40 flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Ambient Audio:</span>
                <button
                  onClick={() => setSoundscape('silence')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    soundscape === 'silence' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-emerald-950 text-slate-300'
                  }`}
                >
                  Library Silence
                </button>
                <button
                  onClick={() => setSoundscape('rain')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    soundscape === 'rain' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-emerald-950 text-slate-300'
                  }`}
                >
                  🌧️ Chepkoilel Rain
                </button>
                <button
                  onClick={() => setSoundscape('lofi')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    soundscape === 'lofi' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-emerald-950 text-slate-300'
                  }`}
                >
                  🎧 Lofi Study Beats
                </button>
              </div>
            </div>

            {/* Daily Streak Stats */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-4 rounded-xl bg-[#091b14] border border-emerald-900/50">
                <div className="text-xl font-bold text-emerald-400">{sessionsCompleted} Sessions</div>
                <span className="text-xs text-slate-400">Completed Today</span>
              </div>
              <div className="p-4 rounded-xl bg-[#091b14] border border-emerald-900/50">
                <div className="text-xl font-bold text-amber-400">🔥 5-Day Streak</div>
                <span className="text-xs text-slate-400">Study Consistency</span>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: HELB & BURSARIES */}
        {activeSubTab === 'bursaries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-white">
                  University of Eldoret Financial Aid & Bursary Radar
                </h3>
                <p className="text-xs text-slate-400">
                  Track deadlines for Higher Education Loans Board (HELB), New HEF Funding Model, and County Bursaries.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {UOE_SCHOLARSHIPS.map((sch) => (
                <div
                  key={sch.id}
                  className="p-5 rounded-2xl bg-[#091b14] border border-emerald-900/50 hover:border-amber-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        {sch.category}
                      </span>
                      <span className="text-xs font-semibold text-red-400">
                        Deadline: {sch.deadline}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm sm:text-base text-white mb-1">
                      {sch.title}
                    </h4>
                    <p className="text-xs text-emerald-400 font-medium mb-2">
                      Provider: {sch.provider}
                    </p>
                    <p className="text-xs text-slate-300 mb-3">
                      {sch.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-emerald-900/40 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-amber-400">
                      {sch.amount}
                    </span>
                    <a
                      href={sch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-xs text-emerald-300 hover:text-white font-semibold"
                    >
                      <span>Check Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Checklist */}
            <div className="p-4 rounded-xl bg-[#091e16] border border-emerald-900/50 text-xs text-slate-300 space-y-2">
              <div className="font-bold text-amber-400">
                📋 Required Documents Checklist for Bursaries at UoE:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <div>✓ Certified Fee Statement from UoE Finance Office</div>
                <div>✓ Chief’s Letter of Recommendation / Residence Proof</div>
                <div>✓ Copy of National ID Card & Student ID Card</div>
                <div>✓ Admission Letter & KUCCPS Verification</div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 5: CAMPUS EMERGENCY & HEALTH */}
        {activeSubTab === 'emergency' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">
                Chepkoilel Campus Safety & Emergency Helplines
              </h3>
              <p className="text-xs text-slate-400">
                Immediate 24/7 assistance for medical emergencies, student security, and hostel support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {UOE_CAMPUS_SERVICES.map((serv, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#091b14] border border-emerald-900/50 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                        {serv.badge}
                      </span>
                      <span className="text-xs text-slate-400">{serv.hours}</span>
                    </div>
                    <h4 className="font-bold text-base text-white mb-1">
                      {serv.name}
                    </h4>
                    <p className="text-xs text-emerald-300 mb-2">
                      📍 {serv.location}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-emerald-900/40 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {serv.contact}
                    </span>
                    <button
                      onClick={() => alert(`Calling ${serv.name}: ${serv.contact}`)}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Now</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ERP Exam Card Fee Clearance Guide */}
            <div className="p-5 rounded-2xl bg-[#06140e] border border-amber-500/40 text-xs space-y-2">
              <h4 className="font-bold text-sm text-amber-300">
                💡 UoE ERP Portal Exam Card Printing Guide:
              </h4>
              <p className="text-slate-300">
                1. Ensure tuition fees are cleared to at least 75% threshold.<br />
                2. Log into the student portal: <span className="font-mono text-emerald-300">portal.uoeld.ac.ke</span>.<br />
                3. Navigate to <strong>Academics &gt; Examination Card</strong> and click <strong>Verify &amp; Print</strong>.<br />
                4. Present the signed Exam Card alongside your official UoE Student ID at the examination room entrance.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Resource Preview Modal */}
      {previewResource && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#091b14] border border-emerald-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setPreviewResource(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono">
              {previewResource.courseCode}
            </span>

            <h3 className="text-lg font-bold text-white mt-2 mb-1">
              {previewResource.title}
            </h3>
            <p className="text-xs text-emerald-300/80 mb-4">
              {previewResource.department} • {previewResource.semester}
            </p>

            <div className="p-4 rounded-xl bg-[#06140e] border border-emerald-950 text-xs text-slate-300 leading-relaxed mb-4">
              <p className="font-semibold text-white mb-1">Resource Overview:</p>
              <p>{previewResource.description}</p>
              <div className="mt-3 pt-2 border-t border-emerald-900/40 flex justify-between text-slate-400 text-[11px]">
                <span>Contributed by: {previewResource.author}</span>
                <span>File size: {previewResource.size}</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setPreviewResource(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:text-white font-medium"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  handleSimulateDownload(previewResource);
                  setPreviewResource(null);
                }}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download Past Paper</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Notes Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#091b14] border border-emerald-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">
              Contribute UoE Study Material
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Share revision notes, CAT questions, or formula cheat sheets with Chepkoilel classmates.
            </p>

            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Document Title:</label>
                <input
                  type="text"
                  required
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="e.g. AGR 211 CAT 2 Revision Questions 2024"
                  className="w-full px-3 py-2 rounded-xl bg-[#06140e] border border-emerald-900 text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Course Code:</label>
                <input
                  type="text"
                  required
                  value={newNoteCode}
                  onChange={(e) => setNewNoteCode(e.target.value)}
                  placeholder="e.g. COM 110, AGR 211"
                  className="w-full px-3 py-2 rounded-xl bg-[#06140e] border border-emerald-900 text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">UoE School:</label>
                <select
                  value={newNoteSchool}
                  onChange={(e) => setNewNoteSchool(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#06140e] border border-emerald-900 text-slate-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="School of Science">School of Science</option>
                  <option value="School of Agriculture & Biotechnology">School of Agriculture & Biotechnology</option>
                  <option value="School of Business & Management Sciences">School of Business & Management Sciences</option>
                  <option value="School of Environmental Studies">School of Environmental Studies</option>
                  <option value="School of Engineering">School of Engineering</option>
                  <option value="School of Education">School of Education</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Submit Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
