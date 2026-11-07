import React, { useState } from 'react';
import { 
  GraduationCap, 
  FileText, 
  Book, 
  Calculator, 
  Clock, 
  Coins, 
  ShieldAlert, 
  Bookmark, 
  Plus, 
  Search, 
  Download, 
  ThumbsUp, 
  Check, 
  X,
  Building,
  Home,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { UOE_RESOURCES, UOE_SCHOOLS, UOE_ANNOUNCEMENTS, UoEAnnouncement } from './data/mockHubData';
import { UOE_BOOKS_DATABASE, AcademicBook } from './data/booksData';
import { HubResource } from './types/prompt';
import { GpaCalculatorView } from './components/GpaCalculatorView';
import { PomodoroLoungeView } from './components/PomodoroLoungeView';
import { BursariesView } from './components/BursariesView';
import { HostelsView } from './components/HostelsView';
import { EmergencyView } from './components/EmergencyView';
import { SavedDrawer } from './components/SavedDrawer';
import { UploadModal } from './components/UploadModal';
import { ResourcePreviewModal } from './components/ResourcePreviewModal';
import { AdminDashboard } from './components/AdminDashboard';

type Tab = 'all' | 'past_papers' | 'revision' | 'books' | 'gpa' | 'timer' | 'helb' | 'hostels' | 'emergency';
type ViewMode = 'student' | 'admin';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('student');
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [search, setSearch] = useState('');
  const [school, setSchool] = useState('All');
  
  // Dynamic Datasets
  const [resources, setResources] = useState<HubResource[]>(UOE_RESOURCES);
  const [books, setBooks] = useState<AcademicBook[]>(UOE_BOOKS_DATABASE);
  const [announcements, setAnnouncements] = useState<UoEAnnouncement[]>(UOE_ANNOUNCEMENTS);
  const [savedIds, setSavedIds] = useState<string[]>(['res-1', 'book-1']);
  
  // Modals & Drawers
  const [previewRes, setPreviewRes] = useState<HubResource | null>(null);
  const [previewBook, setPreviewBook] = useState<AcademicBook | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleDownload = (title: string, size: string) => {
    showToast(`Downloading: ${title} (${size})`);
    // increment download count
    setResources(resources.map((r) => r.title === title ? { ...r, downloads: r.downloads + 1 } : r));
    setBooks(books.map((b) => b.title === title ? { ...b, downloads: b.downloads + 1 } : b));
  };

  const toggleSave = (id: string) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((item) => item !== id));
      showToast('Removed from saved items');
    } else {
      setSavedIds([...savedIds, id]);
      showToast('Saved to library');
    }
  };

  const handleUpvote = (id: string) => {
    setResources(resources.map((r) => (r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r)));
  };

  const handleContribute = (newRes: HubResource) => {
    setResources([newRes, ...resources]);
    showToast('Submitted for admin review');
  };

  const filteredResources = resources.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.courseCode.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesSchool = school === 'All' || r.department === school;
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'past_papers' && r.type === 'past_exam') ||
      (activeTab === 'revision' && r.type !== 'past_exam');

    return matchesSearch && matchesSchool && matchesTab;
  });

  const filteredBooks = books.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.courseCodes.some((c) => c.toLowerCase().includes(search.toLowerCase()));

    const matchesSchool = school === 'All' || b.department === school;
    return matchesSearch && matchesSchool;
  });

  const savedResourcesList = resources.filter((r) => savedIds.includes(r.id));
  const savedBooksList = books.filter((b) => savedIds.includes(b.id));

  return (
    <div className="min-h-screen bg-[#001026] text-white flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-[#0f3460] bg-[#001738]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => {
              setViewMode('student');
              setActiveTab('all');
            }}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8c5837] to-[#b27346] flex items-center justify-center text-white font-bold shadow-md border border-[#d49b6a]/30">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-white text-base leading-tight tracking-tight">
                University of Eldoret
              </div>
              <div className="text-[11px] text-[#e8c49d] font-semibold tracking-wide">
                Student Resource Hub
              </div>
            </div>
          </div>

          {/* Student Nav Tabs (Shown in student mode) */}
          {viewMode === 'student' && (
            <nav className="hidden lg:flex items-center space-x-1 bg-[#001f4d] p-1 rounded-xl border border-[#0f3460] text-xs font-bold">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'all' ? 'bg-[#8c5837] text-white shadow-sm' : 'text-slate-200 hover:text-white hover:bg-[#002d6e]'
                }`}
              >
                All Hub
              </button>
              <button
                onClick={() => setActiveTab('past_papers')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'past_papers' ? 'bg-[#8c5837] text-white shadow-sm' : 'text-slate-200 hover:text-white hover:bg-[#002d6e]'
                }`}
              >
                Past Papers
              </button>
              <button
                onClick={() => setActiveTab('revision')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'revision' ? 'bg-[#8c5837] text-white shadow-sm' : 'text-slate-200 hover:text-white hover:bg-[#002d6e]'
                }`}
              >
                Revision Notes
              </button>
              <button
                onClick={() => setActiveTab('books')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'books' ? 'bg-[#8c5837] text-white shadow-sm' : 'text-slate-200 hover:text-white hover:bg-[#002d6e]'
                }`}
              >
                Books
              </button>
              <button
                onClick={() => setActiveTab('gpa')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'gpa' ? 'bg-[#8c5837] text-white shadow-sm' : 'text-slate-200 hover:text-white hover:bg-[#002d6e]'
                }`}
              >
                GPA Forecaster
              </button>
              <button
                onClick={() => setActiveTab('timer')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'timer' ? 'bg-[#8c5837] text-white shadow-sm' : 'text-slate-200 hover:text-white hover:bg-[#002d6e]'
                }`}
              >
                Study Timer
              </button>
              <button
                onClick={() => setActiveTab('helb')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'helb' ? 'bg-[#8c5837] text-white shadow-sm' : 'text-slate-200 hover:text-white hover:bg-[#002d6e]'
                }`}
              >
                HELB
              </button>
              <button
                onClick={() => setActiveTab('hostels')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'hostels' ? 'bg-[#8c5837] text-white shadow-sm' : 'text-slate-200 hover:text-white hover:bg-[#002d6e]'
                }`}
              >
                Hostels
              </button>
              <button
                onClick={() => setActiveTab('emergency')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'emergency' ? 'bg-red-800 text-white shadow-sm' : 'text-slate-200 hover:text-white hover:bg-[#002d6e]'
                }`}
              >
                Clinic 24/7
              </button>
            </nav>
          )}

          {/* Right Mode Switcher & Tools */}
          <div className="flex items-center space-x-2.5">
            
            {/* View Mode Toggle Switch */}
            <div className="flex items-center bg-[#001126] p-0.5 rounded-xl border border-[#0f3460] text-xs font-bold">
              <button
                onClick={() => setViewMode('student')}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'student' ? 'bg-[#8c5837] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>
              <button
                onClick={() => setViewMode('admin')}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'admin' ? 'bg-[#002f6c] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#e8c49d]" />
                <span>Admin</span>
              </button>
            </div>

            {/* Saved Items */}
            {viewMode === 'student' && (
              <button
                onClick={() => setIsSavedDrawerOpen(true)}
                className="relative p-2 rounded-xl bg-[#00214d] border border-[#0f3460] text-white hover:bg-[#002b66]"
                title="Saved Items"
              >
                <Bookmark className="w-4 h-4 text-[#e8c49d]" />
                {savedIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#8c5837] text-white text-[10px] font-black flex items-center justify-center border border-white/20">
                    {savedIds.length}
                  </span>
                )}
              </button>
            )}

            {/* Upload Button */}
            {viewMode === 'student' && (
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#8c5837] hover:bg-[#a06842] text-white text-xs font-bold border border-[#d49b6a]/40 shadow-sm active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Upload</span>
              </button>
            )}

          </div>

        </div>

        {/* Mobile Navigation Row (in student mode) */}
        {viewMode === 'student' && (
          <div className="lg:hidden flex overflow-x-auto px-4 py-2 gap-1.5 text-xs font-bold border-t border-[#0f3460] bg-[#001433]">
            {(['all', 'past_papers', 'revision', 'books', 'gpa', 'timer', 'helb', 'hostels', 'emergency'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-3 py-1 rounded-md whitespace-nowrap capitalize transition-colors ${
                  activeTab === t ? 'bg-[#8c5837] text-white' : 'text-slate-300'
                }`}
              >
                {t.replace('_', ' ')}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#002759] border border-[#8c5837] text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold flex items-center space-x-2">
          <Check className="w-4 h-4 text-[#e8c49d]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        
        {/* ADMIN MODE */}
        {viewMode === 'admin' ? (
          <AdminDashboard
            resources={resources}
            setResources={setResources}
            books={books}
            setBooks={setBooks}
            announcements={announcements}
            setAnnouncements={setAnnouncements}
            onSwitchToStudentView={() => setViewMode('student')}
          />
        ) : (
          /* STUDENT MODE */
          <>
            {/* GPA View */}
            {activeTab === 'gpa' && <GpaCalculatorView />}

            {/* Timer View */}
            {activeTab === 'timer' && <PomodoroLoungeView />}

            {/* HELB View */}
            {activeTab === 'helb' && <BursariesView />}

            {/* Hostels View */}
            {activeTab === 'hostels' && <HostelsView />}

            {/* Emergency View */}
            {activeTab === 'emergency' && <EmergencyView />}

            {/* Resource & Book Catalog */}
            {(activeTab === 'all' || activeTab === 'past_papers' || activeTab === 'revision' || activeTab === 'books') && (
              <div className="space-y-6">
                
                {/* Search & School Filters */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#001a3d] border border-[#0f3460] space-y-3.5 shadow-lg">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search course code (COM 110, AGR 211, BMS 102), title, or textbook author..."
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#001229] border border-[#0f3460] text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#8c5837] focus:ring-1 focus:ring-[#8c5837]"
                    />
                  </div>

                  {/* School Filters */}
                  <div className="flex items-center space-x-1.5 overflow-x-auto text-xs pb-1">
                    {UOE_SCHOOLS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSchool(s.id)}
                        className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold transition-colors ${
                          school === s.id ? 'bg-[#8c5837] text-white shadow-sm' : 'bg-[#00224f] text-slate-200 hover:text-white border border-[#0f3460]'
                        }`}
                      >
                        {s.short}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prescribed Books Section */}
                {(activeTab === 'all' || activeTab === 'books') && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="font-extrabold text-base sm:text-lg text-white flex items-center gap-2">
                        <Book className="w-4 h-4 text-[#e8c49d]" />
                        <span>Prescribed Academic Books ({filteredBooks.length})</span>
                      </h2>
                      {activeTab === 'all' && (
                        <button
                          onClick={() => setActiveTab('books')}
                          className="text-xs text-[#e8c49d] hover:underline font-bold"
                        >
                          View All Books &rarr;
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {filteredBooks.slice(0, activeTab === 'all' ? 4 : 12).map((book) => {
                        const isSaved = savedIds.includes(book.id);
                        return (
                          <div
                            key={book.id}
                            className="p-4 rounded-xl bg-[#001a3d] border border-[#0f3460] hover:border-[#8c5837] flex flex-col justify-between transition-colors shadow-md"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#8c5837]/30 text-[#e8c49d] border border-[#8c5837]/40">
                                  {book.courseCodes[0]}
                                </span>
                                <button
                                  onClick={() => toggleSave(book.id)}
                                  className={`p-1 rounded ${isSaved ? 'text-[#e8c49d]' : 'text-slate-400 hover:text-white'}`}
                                >
                                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                                </button>
                              </div>

                              <h3 
                                onClick={() => setPreviewBook(book)}
                                className="font-bold text-xs sm:text-sm text-white line-clamp-2 hover:text-[#e8c49d] cursor-pointer mb-1"
                              >
                                {book.title}
                              </h3>
                              <p className="text-[11px] text-slate-300 line-clamp-1 mb-2">
                                {book.author}
                              </p>
                            </div>

                            <div className="pt-2 border-t border-[#0f3460] flex items-center justify-between text-[11px]">
                              <span className="text-slate-300">{book.fileSize}</span>
                              <button
                                onClick={() => handleDownload(book.title, book.fileSize)}
                                className="text-[#e8c49d] hover:text-white font-bold flex items-center gap-1"
                              >
                                <Download className="w-3 h-3" />
                                <span>Download</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Past Papers & Revision Materials */}
                {(activeTab === 'all' || activeTab === 'past_papers' || activeTab === 'revision') && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="font-extrabold text-base sm:text-lg text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#e8c49d]" />
                        <span>
                          {activeTab === 'past_papers'
                            ? 'Past Examination Papers (70%)'
                            : activeTab === 'revision'
                            ? 'Revision Notes & Formula Sheets'
                            : `Past Papers & Revision Notes (${filteredResources.length})`}
                        </span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredResources.map((res) => {
                        const isSaved = savedIds.includes(res.id);
                        return (
                          <div
                            key={res.id}
                            className="p-4 sm:p-5 rounded-xl bg-[#001a3d] border border-[#0f3460] hover:border-[#8c5837] flex flex-col justify-between transition-colors shadow-md"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-[#8c5837]/30 text-[#e8c49d] border border-[#8c5837]/40">
                                    {res.courseCode}
                                  </span>
                                  <span className="text-[11px] text-slate-200 font-semibold">
                                    {res.department.replace('School of ', '')}
                                  </span>
                                </div>
                                <button
                                  onClick={() => toggleSave(res.id)}
                                  className={`p-1 rounded ${isSaved ? 'text-[#e8c49d]' : 'text-slate-400 hover:text-white'}`}
                                >
                                  <Bookmark className="w-4 h-4 fill-current" />
                                </button>
                              </div>

                              <h3
                                onClick={() => setPreviewRes(res)}
                                className="font-bold text-sm text-white hover:text-[#e8c49d] cursor-pointer line-clamp-2 mb-1.5"
                              >
                                {res.title}
                              </h3>
                              <p className="text-xs text-slate-200 line-clamp-2 mb-3 leading-relaxed">
                                {res.description}
                              </p>
                            </div>

                            <div className="pt-3 border-t border-[#0f3460] flex items-center justify-between text-xs">
                              <span className="text-slate-300 text-[11px]">
                                {res.size} • {res.downloads} downloads
                              </span>

                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleUpvote(res.id)}
                                  className="px-2.5 py-1 rounded-lg bg-[#002454] hover:bg-[#002f6c] text-white text-xs flex items-center gap-1 border border-[#0f3460]"
                                >
                                  <ThumbsUp className="w-3 h-3 text-[#e8c49d]" />
                                  <span>{res.upvotes}</span>
                                </button>

                                <button
                                  onClick={() => handleDownload(res.title, res.size)}
                                  className="px-3.5 py-1.5 rounded-lg bg-[#8c5837] hover:bg-[#a06842] text-white font-bold text-xs flex items-center gap-1 border border-[#d49b6a]/30"
                                >
                                  <Download className="w-3 h-3" />
                                  <span>Get PDF</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            )}
          </>
        )}

      </main>

      {/* Book Preview Modal */}
      {previewBook && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#001a3d] border border-[#8c5837] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setPreviewBook(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs font-bold text-[#e8c49d] px-2 py-0.5 rounded bg-[#8c5837]/30 border border-[#8c5837]/40">
              {previewBook.courseCodes.join(', ')}
            </span>
            <h3 className="text-lg font-bold text-white mt-2 mb-1">{previewBook.title}</h3>
            <p className="text-xs text-[#e8c49d] mb-3">{previewBook.author} • {previewBook.edition}</p>
            <p className="text-xs text-slate-200 mb-4 leading-relaxed">{previewBook.description}</p>
            
            <div className="space-y-1.5 mb-5 text-xs">
              <span className="font-bold text-white block">Key Prescribed Chapters:</span>
              {previewBook.chapters.slice(0, 4).map((ch, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-[#001229] border border-[#0f3460] text-slate-200">
                  {idx + 1}. {ch}
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-2">
              <button onClick={() => setPreviewBook(null)} className="px-3 py-1.5 text-xs text-slate-300">Close</button>
              <button 
                onClick={() => {
                  handleDownload(previewBook.title, previewBook.fileSize);
                  setPreviewBook(null);
                }}
                className="px-4 py-2 bg-[#8c5837] hover:bg-[#a06842] text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download E-Book ({previewBook.fileSize})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resource Preview Modal */}
      <ResourcePreviewModal
        resource={previewRes}
        onClose={() => setPreviewRes(null)}
        onSimulateDownload={(r) => handleDownload(r.title, r.size)}
        onUpvote={handleUpvote}
        onToggleBookmark={toggleSave}
        isSaved={previewRes ? savedIds.includes(previewRes.id) : false}
      />

      {/* Saved Drawer */}
      <SavedDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedResources={savedResourcesList}
        savedBooks={savedBooksList}
        onRemoveResource={toggleSave}
        onRemoveBook={toggleSave}
        onDownloadItem={handleDownload}
      />

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onContribute={handleContribute}
      />

      {/* Footer */}
      <footer className="border-t border-[#0f3460] bg-[#000d21] py-6 text-xs text-slate-300 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-extrabold text-white text-sm">University of Eldoret</span>
            <p className="text-[11px] text-[#e8c49d] font-semibold">Flame of Knowledge and Innovation • Official Colors: Stratos, Potters Clay & White</p>
          </div>
          <div className="flex items-center space-x-3 text-[11px] text-slate-400">
            <span>Mode: {viewMode === 'admin' ? '🛡️ Administrator Control Center' : '🎓 Student Portal'}</span>
            <button
              onClick={() => setViewMode(viewMode === 'admin' ? 'student' : 'admin')}
              className="text-[#e8c49d] hover:underline font-bold"
            >
              Switch to {viewMode === 'admin' ? 'Student' : 'Admin'}
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
