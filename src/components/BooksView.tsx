import React, { useState } from 'react';
import { 
  Book, 
  Search, 
  Download, 
  BookOpen, 
  Bookmark, 
  Check, 
  Star, 
  ExternalLink, 
  MapPin, 
  Layers, 
  Building,
  GraduationCap,
  Eye,
  X
} from 'lucide-react';
import { AcademicBook, UOE_BOOKS_DATABASE } from '../data/booksData';
import { UOE_SCHOOLS } from '../data/mockHubData';

interface BooksViewProps {
  onSimulateDownload: (title: string, size: string) => void;
  onToggleBookmark: (id: string) => void;
  savedBookIds: string[];
}

export const BooksView: React.FC<BooksViewProps> = ({
  onSimulateDownload,
  onToggleBookmark,
  savedBookIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<string>('All');
  const [activeReadingBook, setActiveReadingBook] = useState<AcademicBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number>(0);

  const filteredBooks = UOE_BOOKS_DATABASE.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.courseCodes.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      book.isbn.includes(searchQuery);

    const matchesSchool = selectedSchool === 'All' || book.department === selectedSchool;

    return matchesSearch && matchesSchool;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#06241a] via-[#093527] to-[#041a13] border border-emerald-800/60 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow-sm">
              <Book className="w-3.5 h-3.5" />
              Margaret Thatcher Digital Library Shelf
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
              Core Prescribed Academic Textbooks
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Academic Books & E-Textbooks
          </h1>
          <p className="text-emerald-200/80 text-xs sm:text-sm mt-2 leading-relaxed">
            Free digital access to prescribed textbooks across all 8 University of Eldoret schools. 
            Read online chapter-by-chapter, view physical shelf locations in the Main Library, or download PDF versions for offline study in your hostels.
          </p>

          <div className="mt-5 pt-4 border-t border-emerald-900/50 flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div>
              <span className="font-extrabold text-amber-400 text-base sm:text-lg">8,500+</span>
              <p className="text-slate-400 text-[11px]">Total Student Downloads</p>
            </div>
            <div className="w-px h-8 bg-emerald-900/60" />
            <div>
              <span className="font-extrabold text-emerald-400 text-base sm:text-lg">100% Free</span>
              <p className="text-slate-400 text-[11px]">Open Academic Access</p>
            </div>
            <div className="w-px h-8 bg-emerald-900/60" />
            <div>
              <span className="font-extrabold text-white text-base sm:text-lg">Physical Stacks</span>
              <p className="text-slate-400 text-[11px]">Main Campus Chepkoilel</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#091b14]/90 border border-emerald-900/60 space-y-3.5 shadow-lg">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search textbook title, author (e.g. Cormen, Stewart, Bruice, Acquaah), course code, or ISBN..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#06140e] border border-emerald-900/80 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
          />
        </div>

        {/* School Tabs */}
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
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredBooks.map((book) => {
          const isSaved = savedBookIds.includes(book.id);
          return (
            <div
              key={book.id}
              className="p-5 rounded-2xl bg-[#091b14]/90 border border-emerald-900/50 hover:border-emerald-600/70 transition-all flex flex-col justify-between shadow-md group"
            >
              <div className="flex gap-4">
                {/* Book Spine / Cover Mockup */}
                <div className={`w-24 sm:w-28 h-36 sm:h-40 rounded-xl bg-gradient-to-br ${book.coverColor} p-2 flex flex-col justify-between text-white shrink-0 shadow-lg border border-white/10 relative overflow-hidden group-hover:scale-105 transition-transform`}>
                  <div className="text-[9px] uppercase tracking-wider font-extrabold text-amber-300 truncate">
                    {book.department.replace('School of ', '')}
                  </div>
                  <div>
                    <div className="text-xs font-black line-clamp-3 leading-tight mb-1">
                      {book.title}
                    </div>
                    <div className="text-[9px] text-slate-200 truncate">
                      {book.author.split(',')[0]}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[8px] text-slate-300 pt-1 border-t border-white/20">
                    <span>{book.edition}</span>
                    <span className="font-mono text-amber-300 font-bold">PDF</span>
                  </div>
                </div>

                {/* Book Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <div className="flex flex-wrap gap-1">
                        {book.courseCodes.map((c) => (
                          <span key={c} className="font-mono font-bold text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                            {c}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => onToggleBookmark(book.id)}
                        className={`p-1 rounded-lg transition-colors ${
                          isSaved ? 'text-amber-400' : 'text-slate-400 hover:text-white'
                        }`}
                        title={isSaved ? 'Remove from Saved' : 'Save Book'}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    <h3 
                      onClick={() => setActiveReadingBook(book)}
                      className="font-bold text-sm sm:text-base text-white hover:text-amber-300 transition-colors line-clamp-2 cursor-pointer mb-1"
                    >
                      {book.title}
                    </h3>
                    <p className="text-xs text-emerald-400/90 font-medium truncate mb-2">
                      by {book.author}
                    </p>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-2">
                      {book.description}
                    </p>
                  </div>

                  {/* Physical Shelf Location */}
                  {book.shelfLocation && (
                    <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 truncate mb-3">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{book.shelfLocation}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-emerald-900/40 flex items-center justify-between text-xs">
                <div className="text-slate-400 text-[11px] flex items-center space-x-2">
                  <span>{book.pages} pages</span>
                  <span>•</span>
                  <span>{book.fileSize}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveReadingBook(book)}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-200 text-xs font-semibold border border-emerald-800/40 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>Read / Preview</span>
                  </button>

                  <button
                    onClick={() => onSimulateDownload(book.title, book.fileSize)}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-transform active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Get E-Book</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Interactive E-Book Reader / Preview Modal */}
      {activeReadingBook && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
          <div className="bg-[#091b14] border border-emerald-800 rounded-3xl max-w-3xl w-full p-6 shadow-2xl relative max-h-[90vh] flex flex-col justify-between overflow-hidden">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-emerald-900/60">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono">
                    {activeReadingBook.format}
                  </span>
                  <span className="text-xs text-slate-400">
                    ISBN: {activeReadingBook.isbn}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-white">
                  {activeReadingBook.title}
                </h2>
                <p className="text-xs text-emerald-300">
                  {activeReadingBook.author} • {activeReadingBook.edition} ({activeReadingBook.pages} Pages)
                </p>
              </div>

              <button
                onClick={() => setActiveReadingBook(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content: Chapter Index & Reading Preview */}
            <div className="py-4 overflow-y-auto space-y-4">
              <div className="p-4 rounded-xl bg-[#06140e] border border-emerald-950 text-xs text-slate-200 leading-relaxed">
                <span className="font-bold text-amber-400 block mb-1">
                  Course Relevance & Prescribed Syllabus:
                </span>
                <p>{activeReadingBook.description}</p>
                <div className="mt-2 text-slate-400">
                  Prescribed for UoE units: <strong className="text-white">{activeReadingBook.courseCodes.join(', ')}</strong>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Table of Contents & Core Chapters
                </h4>
                <div className="space-y-1.5">
                  {activeReadingBook.chapters.map((ch, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedChapter(idx)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                        selectedChapter === idx
                          ? 'bg-emerald-950/80 border-amber-400 text-white font-semibold'
                          : 'bg-[#06140e] border-emerald-900/40 text-slate-300 hover:border-emerald-700/60'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-md bg-emerald-900/70 text-emerald-300 flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        <span>{ch}</span>
                      </div>
                      <span className="text-[10px] text-amber-400">Available</span>
                    </div>
                  ))}
                </div>
              </div>

              {activeReadingBook.shelfLocation && (
                <div className="p-3 rounded-xl bg-[#071d15] border border-emerald-900/50 flex items-center space-x-2 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Physical Copy Location: <strong className="text-white">{activeReadingBook.shelfLocation}</strong></span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-emerald-900/60 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {activeReadingBook.downloads} students downloaded this book
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveReadingBook(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onSimulateDownload(activeReadingBook.title, activeReadingBook.fileSize);
                    setActiveReadingBook(null);
                  }}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full PDF E-Book</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
