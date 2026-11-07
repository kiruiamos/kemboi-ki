import React, { useState } from 'react';
import { 
  Calculator, 
  Plus, 
  Trash2, 
  Sparkles, 
  GraduationCap
} from 'lucide-react';
import { CourseGradeItem } from '../types/prompt';
import { INITIAL_UOE_GRADES } from '../data/mockHubData';

export const GpaCalculatorView: React.FC = () => {
  const [courses, setCourses] = useState<CourseGradeItem[]>(INITIAL_UOE_GRADES);
  const [catScoreInput, setCatScoreInput] = useState<number>(24);
  const [targetFinalGrade, setTargetFinalGrade] = useState<'A' | 'B' | 'C'>('A');
  const [newUnitCode, setNewUnitCode] = useState('');
  const [newUnitCredits, setNewUnitCredits] = useState(3);

  const gradePoints: Record<string, number> = {
    'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'D': 1.0, 'F': 0.0
  };

  const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);
  const totalQualityPoints = courses.reduce(
    (acc, c) => acc + c.credits * (gradePoints[c.grade] || 0),
    0
  );
  const currentGPA = totalCredits > 0 ? (totalQualityPoints / totalCredits).toFixed(2) : '0.00';

  const getDegreeClass = (gpa: number) => {
    if (gpa >= 3.68) {
      return { 
        title: 'First Class Honours', 
        color: 'text-white bg-[#8c5837] border-[#d49b6a]',
        badge: 'Top Honours'
      };
    }
    if (gpa >= 3.0) {
      return { 
        title: 'Second Class Honours (Upper Division)', 
        color: 'text-white bg-[#00275c] border-[#3b82f6]',
        badge: 'Upper Division'
      };
    }
    if (gpa >= 2.3) {
      return { 
        title: 'Second Class Honours (Lower Division)', 
        color: 'text-white bg-[#001f47] border-[#0f3460]',
        badge: 'Lower Division'
      };
    }
    if (gpa >= 2.0) {
      return { 
        title: 'Pass', 
        color: 'text-slate-200 bg-[#001738] border-slate-700',
        badge: 'Pass'
      };
    }
    return { 
      title: 'Fail / Academic Warning', 
      color: 'text-white bg-red-900 border-red-700',
      badge: 'Warning'
    };
  };

  const degreeClass = getDegreeClass(parseFloat(currentGPA));

  const targetThreshold = targetFinalGrade === 'A' ? 70 : targetFinalGrade === 'B' ? 60 : 50;
  const marksNeededOnExam = Math.max(0, targetThreshold - catScoreInput);
  const percentageOnFinalExam = ((marksNeededOnExam / 70) * 100).toFixed(1);

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUnitCode.trim()) return;

    const newCourse: CourseGradeItem = {
      id: `c-${Date.now()}`,
      name: newUnitCode.trim().toUpperCase(),
      credits: newUnitCredits,
      grade: 'A'
    };

    setCourses([...courses, newCourse]);
    setNewUnitCode('');
  };

  const handleRemoveCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const handleUpdateGrade = (id: string, grade: CourseGradeItem['grade']) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, grade } : c)));
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="rounded-2xl bg-[#001738] border border-[#0f3460] p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#e8c49d] text-xs font-bold uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Performance Forecaster</span>
          </div>
          <h1 className="text-2xl font-black text-white">
            UoE Grade & Degree Classification Calculator
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Official Kenyan university scale: 30% Continuous Assessment (CAT) + 70% Final Main Exam.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#001126] border border-[#8c5837] text-center shrink-0">
          <span className="text-[10px] text-slate-300 uppercase font-bold block">Cumulative GPA</span>
          <div className="text-3xl font-black text-[#e8c49d] font-mono">
            {currentGPA}
          </div>
          <span className="text-[10px] text-white font-medium block">
            4.0 Scale • {totalCredits} Credits
          </span>
        </div>
      </div>

      {/* Degree Status */}
      <div className={`p-4 rounded-xl border flex items-center justify-between ${degreeClass.color}`}>
        <div>
          <span className="text-[10px] uppercase tracking-wider font-bold opacity-80">Projected Classification</span>
          <div className="text-lg font-black">{degreeClass.title}</div>
        </div>
        <div className="text-xs font-mono font-bold px-3 py-1 bg-black/30 rounded-lg border border-white/20">
          {totalQualityPoints.toFixed(1)} Quality Points
        </div>
      </div>

      {/* What do I need on 70% exam */}
      <div className="p-5 rounded-2xl bg-[#001a3d] border border-[#0f3460] space-y-3">
        <h3 className="text-sm font-bold text-[#e8c49d] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" />
          <span>Final Exam Score Forecaster (CAT 30% + Exam 70%)</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center pt-1 text-xs">
          <div>
            <label className="text-slate-300 block mb-1 font-semibold">Your CAT Score (out of 30):</label>
            <input
              type="number"
              min={0}
              max={30}
              value={catScoreInput}
              onChange={(e) => setCatScoreInput(Math.min(30, Math.max(0, parseInt(e.target.value) || 0)))}
              className="w-full px-3 py-2 rounded-xl bg-[#001026] border border-[#0f3460] text-[#e8c49d] font-bold text-base focus:outline-none"
            />
          </div>

          <div>
            <label className="text-slate-300 block mb-1 font-semibold">Target Grade:</label>
            <select
              value={targetFinalGrade}
              onChange={(e) => setTargetFinalGrade(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-[#001026] border border-[#0f3460] text-white font-bold text-sm focus:outline-none"
            >
              <option value="A">Grade A (70%+ Total)</option>
              <option value="B">Grade B (60%+ Total)</option>
              <option value="C">Grade C (50%+ Total)</option>
            </select>
          </div>

          <div className="p-3 rounded-xl bg-[#001026] border border-[#8c5837] text-center">
            <span className="text-[10px] text-slate-300 block">Score Needed on 70% Exam:</span>
            <div className="text-xl font-black text-[#e8c49d]">
              {marksNeededOnExam} / 70
            </div>
            <span className="text-[10px] text-white">({percentageOnFinalExam}% on the exam)</span>
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <div className="rounded-2xl bg-[#001a3d] border border-[#0f3460] overflow-hidden shadow-lg">
        <div className="p-4 border-b border-[#0f3460] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h3 className="font-bold text-sm text-white">Current Semester Course Units</h3>
          
          <form onSubmit={handleAddCourse} className="flex items-center space-x-2 text-xs">
            <input
              type="text"
              required
              value={newUnitCode}
              onChange={(e) => setNewUnitCode(e.target.value)}
              placeholder="e.g. COM 210"
              className="px-3 py-1.5 rounded-lg bg-[#001026] border border-[#0f3460] text-white focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-[#8c5837] hover:bg-[#a06842] text-white font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#001229] text-slate-300 border-b border-[#0f3460]">
              <tr>
                <th className="py-2.5 px-4">Course Unit</th>
                <th className="py-2.5 px-4">Credits</th>
                <th className="py-2.5 px-4">Grade</th>
                <th className="py-2.5 px-4">Quality Points</th>
                <th className="py-2.5 px-4 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0f3460]">
              {courses.map((c) => (
                <tr key={c.id} className="hover:bg-[#00224f] transition-colors">
                  <td className="py-2.5 px-4 font-bold text-white font-mono">{c.name}</td>
                  <td className="py-2.5 px-4 text-slate-200">{c.credits}</td>
                  <td className="py-2.5 px-4">
                    <select
                      value={c.grade}
                      onChange={(e) => handleUpdateGrade(c.id, e.target.value as any)}
                      className="bg-[#001229] border border-[#0f3460] rounded px-2 py-0.5 text-[#e8c49d] font-bold"
                    >
                      <option value="A">A (4.0)</option>
                      <option value="A-">A- (3.7)</option>
                      <option value="B+">B+ (3.3)</option>
                      <option value="B">B (3.0)</option>
                      <option value="B-">B- (2.7)</option>
                      <option value="C+">C+ (2.3)</option>
                      <option value="C">C (2.0)</option>
                      <option value="D">D (1.0)</option>
                      <option value="F">F (0.0)</option>
                    </select>
                  </td>
                  <td className="py-2.5 px-4 font-mono font-bold text-[#e8c49d]">
                    {(gradePoints[c.grade] * c.credits).toFixed(1)}
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <button
                      onClick={() => handleRemoveCourse(c.id)}
                      className="text-slate-400 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
