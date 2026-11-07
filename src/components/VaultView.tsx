import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  ThumbsUp, 
  Bookmark, 
  CheckCircle, 
  FileText, 
  Eye, 
  Sparkles, 
  Building, 
  SlidersHorizontal,
  Plus,
  BookOpen,
  Filter
} from 'lucide-react';
import { HubResource } from '../types/prompt';
import { UOE_SCHOOLS } from '../data/mockHubData';

interface VaultViewProps {
  resources: HubResource[];
  onUpvote: (id: string) => void;
  onSimulateDownload: (res: HubResource) => void;
  onToggleBookmark: (id: string) => void;
  savedResourceIds: string[];
  onPreview: (res: HubResource) => void;
  onOpenUpload: () => void;
}

export const VaultView: React.FC<VaultViewProps> = ({
  resources,
  onUpvote,
  onSimulateDownload,
  onToggleBookmark,
  savedResourceIds,
  onPreview,
  onOpenUpload,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedSemester, setSelectedSemester] = useState<string>('All');

  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSchool = selectedSchool === 'All' || res.department === selectedSchool;
    const matchesType = selectedType === 'All' || res.type === selectedType;
    const matchesSemester = selectedSemester === 'All' || res.semester.includes(selectedSemester);

    return matchesSearch && matchesSchool && matchesType && matchesSemester;
  });

  return (
    <div className="space-y-6">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#06241a] via-[#093527] to-[#041a13] border border-emerald-800/60 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Official UoE Academic Repository
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
              Chepkoilel & Town Campuses
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Past Exam Papers, CATs & Lecturer Handouts
          </h1>
          <p className="text-emerald-200/80 text-xs sm:text-sm mt-2 leading-relaxed">
            Instant peer access to vetted revision materials across all 8 University of Eldoret schools. 
            Download past main exams (70%), CAT questions (30%), formula cheat sheets, and practical lab writeups.
          </p>

          {/* Quick Metrics */}
          <div className="mt-5 pt-4 border-t border-emerald-900/50 flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div>
              <span className="font-extrabold text-amber-400 text-base sm:text-lg">1,480+</span>
              <p className="text-slate-400 text-[11px]">Exam Papers Indexed</p>
            </div>
            <div className="w-px h-8 bg-emerald-900/60" />
            <div>
              <span className="font-extrabold text-emerald-400 text-base sm:text-lg">8 Schools</span>
              <p className="text-slate-400 text-[11px]">Academic Departments</p>
            </div>
            <div className="w-px h-8 bg-emerald-900/60" />
            <div>
              <span className="font-extrabold text-white text-base sm:text-lg">100% Free</span>
              <p className="text-slate-400 text-[11px]">Peer Contributed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Multi-Filtering System */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#091b14]/90 border border-emerald-900/60 space-y-3.5 shadow-lg">
        
        {/* Main Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by course code (e.g. COM 110, AGR 211, BMS 102, MAT 111, ENS 210), topic, or lecturer..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#06140e] border border-emerald-900/80 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          
          {/* UoE School Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 max-w-full text-xs">
            <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1 shrink-0 mr-1">
              <Building className="w-3.5 h-3.5 text-amber-400" />
              School:
            </span>
            {UOE_SCHOOLS.map((sch) => (
              <button
                key={sch.id}
                onClick={() => setSelectedSchool(sch.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                  selectedSchool === sch.id
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                    : 'bg-[#06140e] text-slate-300 hover:text-white hover:bg-emerald-950/70 border border-emerald-900/40'
                }`}
              >
                {sch.short}
              </button>
            ))}
          </div>

          {/* Type & Year Dropdowns */}
          <div className="flex items-center space-x-2 text-xs">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#06140e] border border-emerald-900/60 text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="All">All Types</option>
              <option value="past_exam">Main Exams (70%)</option>
              <option value="lecture_notes">Lecture Notes</option>
              <option value="cheat_sheet">Formula Sheets</option>
              <option value="lab_report">Lab Manuals</option>
              <option value="video_rec">Video Recaps</option>
            </select>

            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#06140e] border border-emerald-900/60 text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="All">All Academic Years</option>
              <option value="Year 1">Year 1 (Freshmen)</option>
              <option value="Year 2">Year 2 (Sophomores)</option>
              <option value="Year 3">Year 3 (Juniors)</option>
              <option value="Year 4">Year 4 (Seniors)</option>
            </select>
          </div>

        </div>
      </div>

      {/* Resources Result Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((res) => {
          const isSaved = savedResourceIds.includes(res.id);
          return (
            <div
              key={res.id}
              className="p-5 rounded-2xl bg-[#091b14]/90 border border-emerald-900/50 hover:border-emerald-600/70 transition-all flex flex-col justify-between shadow-md group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-black text-xs px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      {res.courseCode}
                    </span>
                    <span className="text-[11px] text-emerald-300/80 font-medium truncate max-w-[200px]">
                      {res.department}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    {res.isVerified && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        Verified
                      </span>
                    )}
                    <button
                      onClick={() => onToggleBookmark(res.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isSaved ? 'text-amber-400 bg-amber-400/10' : 'text-slate-400 hover:text-white'
                      }`}
                      title={isSaved ? 'Remove from Saved' : 'Save for Offline'}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 
                  onClick={() => onPreview(res)}
                  className="font-bold text-sm sm:text-base text-white hover:text-amber-300 transition-colors line-clamp-2 mb-1.5 cursor-pointer"
                >
                  {res.title}
                </h3>
                
                {/* Description */}
                <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
                  {res.description}
                </p>

                {/* Tags */}
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
                <div className="text-slate-400 text-[11px] flex items-center space-x-2">
                  <span>{res.size}</span>
                  <span>•</span>
                  <span>{res.downloads} downloads</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpvote(res.id)}
                    className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 text-xs border border-emerald-800/40 transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{res.upvotes}</span>
                  </button>

                  <button
                    onClick={() => onPreview(res)}
                    className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-slate-300 hover:text-white border border-emerald-800/40 transition-colors"
                    title="Quick Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSimulateDownload(res)}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-transform active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-16 p-8 rounded-3xl bg-[#091b14] border border-emerald-900/40">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No course materials match your filter</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try searching for another course code or school, or be the first student to upload revision materials for this course!
          </p>
          <button
            onClick={onOpenUpload}
            className="mt-4 inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
          >
            <Plus className="w-4 h-4" />
            <span>Contribute Notes for This Unit</span>
          </button>
        </div>
      )}

    </div>
  );
};
