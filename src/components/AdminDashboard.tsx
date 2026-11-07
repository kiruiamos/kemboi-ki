import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  FileText, 
  Book, 
  Bell, 
  TrendingUp, 
  Download, 
  Users, 
  Eye, 
  Search,
  Filter,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { HubResource } from '../types/prompt';
import { AcademicBook } from '../data/booksData';
import { UoEAnnouncement } from '../data/mockHubData';

interface AdminDashboardProps {
  resources: HubResource[];
  setResources: React.Dispatch<React.SetStateAction<HubResource[]>>;
  books: AcademicBook[];
  setBooks: React.Dispatch<React.SetStateAction<AcademicBook[]>>;
  announcements: UoEAnnouncement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<UoEAnnouncement[]>>;
  onSwitchToStudentView: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  resources,
  setResources,
  books,
  setBooks,
  announcements,
  setAnnouncements,
  onSwitchToStudentView,
}) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'resources' | 'books' | 'announcements'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  // New Item Modals
  const [isAddResourceOpen, setIsAddResourceOpen] = useState(false);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isAddNoticeOpen, setIsAddNoticeOpen] = useState(false);

  // Form states for new resource
  const [resTitle, setResTitle] = useState('');
  const [resCode, setResCode] = useState('');
  const [resDept, setResDept] = useState('School of Science');
  const [resType, setResType] = useState<HubResource['type']>('past_exam');
  const [resSemester, setResSemester] = useState('Year 1 Semester 1');
  const [resSize, setResSize] = useState('3.5 MB');

  // Form states for new book
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookCode, setBookCode] = useState('');
  const [bookDept, setBookDept] = useState('School of Science');
  const [bookShelf, setBookShelf] = useState('Main Library Ground Floor');

  // Form states for new announcement
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<UoEAnnouncement['category']>('Academics');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeUrgent, setNoticeUrgent] = useState(false);

  // Statistics
  const totalDownloads = resources.reduce((acc, r) => acc + r.downloads, 0);
  const totalUpvotes = resources.reduce((acc, r) => acc + r.upvotes, 0);
  const pendingApprovals = resources.filter((r) => !r.isVerified);

  // Action Handlers
  const handleToggleVerify = (id: string) => {
    setResources(resources.map((r) => (r.id === id ? { ...r, isVerified: !r.isVerified } : r)));
  };

  const handleDeleteResource = (id: string) => {
    if (confirm('Delete this resource from the UoE repository?')) {
      setResources(resources.filter((r) => r.id !== id));
    }
  };

  const handleDeleteBook = (id: string) => {
    if (confirm('Delete this book from the digital library?')) {
      setBooks(books.filter((b) => b.id !== id));
    }
  };

  const handleDeleteNotice = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resTitle.trim()) return;

    const newRes: HubResource = {
      id: `res-${Date.now()}`,
      title: resTitle.trim(),
      courseCode: resCode.trim().toUpperCase(),
      courseName: 'Academic Unit',
      department: resDept,
      type: resType,
      author: 'Admin Office',
      downloads: 0,
      upvotes: 0,
      rating: 5.0,
      semester: resSemester,
      size: resSize,
      tags: ['Admin Verified', resCode.toUpperCase()],
      description: 'Official academic paper uploaded by University of Eldoret Administration.',
      isVerified: true
    };

    setResources([newRes, ...resources]);
    setIsAddResourceOpen(false);
    setResTitle('');
    setResCode('');
  };

  const handleCreateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle.trim()) return;

    const newBook: AcademicBook = {
      id: `book-${Date.now()}`,
      title: bookTitle.trim(),
      author: bookAuthor.trim() || 'Academic Publisher',
      edition: 'Latest Edition',
      isbn: '978-' + Math.floor(100000000 + Math.random() * 900000000),
      courseCodes: [bookCode.trim().toUpperCase() || 'GEN 101'],
      department: bookDept,
      pages: 450,
      fileSize: '15.2 MB (PDF)',
      downloads: 0,
      rating: 5.0,
      coverColor: 'from-[#8c5837] to-[#001738]',
      description: 'Prescribed course textbook verified by University of Eldoret Faculty.',
      chapters: ['Introduction & Foundations', 'Methodologies', 'Advanced Applications'],
      format: 'PDF E-Book',
      shelfLocation: bookShelf,
      isAvailableOnline: true
    };

    setBooks([newBook, ...books]);
    setIsAddBookOpen(false);
    setBookTitle('');
    setBookAuthor('');
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim()) return;

    const newNotice: UoEAnnouncement = {
      id: `ann-${Date.now()}`,
      title: noticeTitle.trim(),
      category: noticeCategory,
      date: 'Just now',
      urgent: noticeUrgent,
      content: noticeContent.trim()
    };

    setAnnouncements([newNotice, ...announcements]);
    setIsAddNoticeOpen(false);
    setNoticeTitle('');
    setNoticeContent('');
  };

  return (
    <div className="space-y-6">
      
      {/* Admin Top Banner */}
      <div className="p-6 rounded-2xl bg-[#001738] border border-[#8c5837] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#e8c49d] text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-[#e8c49d]" />
            <span>Administrator Control Center</span>
          </div>
          <h1 className="text-2xl font-black text-white">
            UoE Hub Management Dashboard
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Manage repository past papers, prescribed textbooks, student upload approvals, and campus notices.
          </p>
        </div>

        <button
          onClick={onSwitchToStudentView}
          className="px-4 py-2 rounded-xl bg-[#002759] hover:bg-[#003478] text-white text-xs font-bold border border-[#0f3460] flex items-center space-x-1.5 transition-colors"
        >
          <Eye className="w-4 h-4 text-[#e8c49d]" />
          <span>Switch to Student View</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-[#001a3d] border border-[#0f3460]">
          <span className="text-[11px] text-slate-400 font-bold block">Total Past Papers & Notes</span>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1">
            {resources.length}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">{resources.filter(r => r.isVerified).length} Verified</span>
        </div>

        <div className="p-4 rounded-xl bg-[#001a3d] border border-[#0f3460]">
          <span className="text-[11px] text-slate-400 font-bold block">Library E-Books</span>
          <div className="text-2xl sm:text-3xl font-black text-[#e8c49d] mt-1">
            {books.length}
          </div>
          <span className="text-[10px] text-slate-400">8 UoE Schools</span>
        </div>

        <div className="p-4 rounded-xl bg-[#001a3d] border border-[#0f3460]">
          <span className="text-[11px] text-slate-400 font-bold block">Total Downloads</span>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1 font-mono">
            {totalDownloads.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">Active Student Usage</span>
        </div>

        <div className="p-4 rounded-xl bg-[#001a3d] border border-[#0f3460]">
          <span className="text-[11px] text-slate-400 font-bold block">Pending Approvals</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
            {pendingApprovals.length}
          </div>
          <span className="text-[10px] text-amber-300">Requires verification</span>
        </div>
      </div>

      {/* Section Switcher Tabs */}
      <div className="flex items-center space-x-2 border-b border-[#0f3460] pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveSection('overview')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            activeSection === 'overview' ? 'bg-[#8c5837] text-white' : 'text-slate-300 hover:text-white'
          }`}
        >
          Overview & Approvals ({pendingApprovals.length})
        </button>
        <button
          onClick={() => setActiveSection('resources')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            activeSection === 'resources' ? 'bg-[#8c5837] text-white' : 'text-slate-300 hover:text-white'
          }`}
        >
          Manage Past Papers & Notes ({resources.length})
        </button>
        <button
          onClick={() => setActiveSection('books')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            activeSection === 'books' ? 'bg-[#8c5837] text-white' : 'text-slate-300 hover:text-white'
          }`}
        >
          Manage Textbooks ({books.length})
        </button>
        <button
          onClick={() => setActiveSection('announcements')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            activeSection === 'announcements' ? 'bg-[#8c5837] text-white' : 'text-slate-300 hover:text-white'
          }`}
        >
          Campus Notices ({announcements.length})
        </button>
      </div>

      {/* 1. OVERVIEW & PENDING APPROVALS */}
      {activeSection === 'overview' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm sm:text-base text-white">
              Student Submissions Awaiting Admin Verification
            </h3>
          </div>

          {pendingApprovals.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#001738] border border-[#0f3460] text-center text-xs text-slate-400">
              <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p>All student uploads have been verified and approved.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingApprovals.map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-xl bg-[#001a3d] border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-amber-300 bg-[#8c5837]/30 px-2 py-0.5 rounded">
                        {r.courseCode}
                      </span>
                      <span className="text-slate-300">{r.department}</span>
                      <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded">
                        Pending
                      </span>
                    </div>
                    <div className="font-bold text-white text-sm">{r.title}</div>
                    <p className="text-slate-400 text-[11px]">
                      By: {r.author} • {r.size}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => handleToggleVerify(r.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve & Verify</span>
                    </button>
                    <button
                      onClick={() => handleDeleteResource(r.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-800 hover:bg-red-700 text-white font-bold flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. MANAGE RESOURCES */}
      {activeSection === 'resources' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h3 className="font-extrabold text-sm sm:text-base text-white">
              Repository Past Papers & Revision Bank
            </h3>
            <button
              onClick={() => setIsAddResourceOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#8c5837] hover:bg-[#a06842] text-white text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Material</span>
            </button>
          </div>

          <div className="rounded-2xl bg-[#001738] border border-[#0f3460] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#001229] text-slate-300 border-b border-[#0f3460]">
                  <tr>
                    <th className="py-2.5 px-3">Unit</th>
                    <th className="py-2.5 px-3">Title</th>
                    <th className="py-2.5 px-3">School</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Downloads</th>
                    <th className="py-2.5 px-3">Verified</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0f3460] text-slate-200">
                  {resources.map((r) => (
                    <tr key={r.id} className="hover:bg-[#00224f] transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#e8c49d]">{r.courseCode}</td>
                      <td className="py-2.5 px-3 font-semibold text-white max-w-xs truncate">{r.title}</td>
                      <td className="py-2.5 px-3 text-slate-300 truncate max-w-[140px]">{r.department.replace('School of ', '')}</td>
                      <td className="py-2.5 px-3 capitalize">{r.type.replace('_', ' ')}</td>
                      <td className="py-2.5 px-3 font-mono">{r.downloads}</td>
                      <td className="py-2.5 px-3">
                        <button
                          onClick={() => handleToggleVerify(r.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            r.isVerified ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}
                        >
                          {r.isVerified ? 'Verified' : 'Pending'}
                        </button>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => handleDeleteResource(r.id)}
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
      )}

      {/* 3. MANAGE BOOKS */}
      {activeSection === 'books' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h3 className="font-extrabold text-sm sm:text-base text-white">
              Margaret Thatcher Digital Library Textbooks
            </h3>
            <button
              onClick={() => setIsAddBookOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#8c5837] hover:bg-[#a06842] text-white text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Textbook</span>
            </button>
          </div>

          <div className="rounded-2xl bg-[#001738] border border-[#0f3460] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#001229] text-slate-300 border-b border-[#0f3460]">
                  <tr>
                    <th className="py-2.5 px-3">Units</th>
                    <th className="py-2.5 px-3">Title</th>
                    <th className="py-2.5 px-3">Author</th>
                    <th className="py-2.5 px-3">Shelf Location</th>
                    <th className="py-2.5 px-3">Downloads</th>
                    <th className="py-2.5 px-3 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0f3460] text-slate-200">
                  {books.map((b) => (
                    <tr key={b.id} className="hover:bg-[#00224f] transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#e8c49d]">{b.courseCodes.join(', ')}</td>
                      <td className="py-2.5 px-3 font-semibold text-white max-w-xs truncate">{b.title}</td>
                      <td className="py-2.5 px-3 text-slate-300">{b.author}</td>
                      <td className="py-2.5 px-3 text-slate-400 text-[11px] truncate max-w-[160px]">{b.shelfLocation || 'Main Library'}</td>
                      <td className="py-2.5 px-3 font-mono">{b.downloads}</td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => handleDeleteBook(b.id)}
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
      )}

      {/* 4. MANAGE ANNOUNCEMENTS */}
      {activeSection === 'announcements' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h3 className="font-extrabold text-sm sm:text-base text-white">
              Campus Live Notices & Examination Alerts
            </h3>
            <button
              onClick={() => setIsAddNoticeOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#8c5837] hover:bg-[#a06842] text-white text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Notice</span>
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map((a) => (
              <div
                key={a.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
                  a.urgent ? 'bg-[#001738] border-red-800' : 'bg-[#001a3d] border-[#0f3460]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[#e8c49d] bg-[#8c5837]/20 px-2 py-0.5 rounded">
                      {a.category}
                    </span>
                    {a.urgent && (
                      <span className="text-[10px] font-bold text-red-300 bg-red-950 px-2 py-0.5 rounded">
                        Urgent
                      </span>
                    )}
                    <span className="text-slate-400 text-[11px]">{a.date}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{a.title}</h4>
                  <p className="text-slate-300 text-xs">{a.content}</p>
                </div>

                <button
                  onClick={() => handleDeleteNotice(a.id)}
                  className="text-slate-400 hover:text-red-400 p-1 shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Add Resource */}
      {isAddResourceOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#001738] border border-[#0f3460] rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setIsAddResourceOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-base text-white mb-3">Add Past Paper or Revision Guide</h3>

            <form onSubmit={handleCreateResource} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-200 font-semibold block mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={resTitle}
                  onChange={(e) => setResTitle(e.target.value)}
                  placeholder="e.g. COM 110 Semester 1 2024 Main Exam with Solutions"
                  className="w-full px-3 py-2 rounded-xl bg-[#001026] border border-[#0f3460] text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-200 font-semibold block mb-1">Course Code *</label>
                  <input
                    type="text"
                    required
                    value={resCode}
                    onChange={(e) => setResCode(e.target.value)}
                    placeholder="e.g. COM 110"
                    className="w-full px-3 py-2 rounded-xl bg-[#001026] border border-[#0f3460] text-white uppercase font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-200 font-semibold block mb-1">Type</label>
                  <select
                    value={resType}
                    onChange={(e) => setResType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#001026] border border-[#0f3460] text-white"
                  >
                    <option value="past_exam">Main Exam (70%)</option>
                    <option value="lecture_notes">Lecture Notes</option>
                    <option value="cheat_sheet">Formula Sheet</option>
                    <option value="lab_report">Lab Manual</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-200 font-semibold block mb-1">School</label>
                <select
                  value={resDept}
                  onChange={(e) => setResDept(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#001026] border border-[#0f3460] text-white"
                >
                  <option value="School of Science">School of Science</option>
                  <option value="School of Agriculture & Biotechnology">School of Agriculture & Biotech</option>
                  <option value="School of Business & Management Sciences">School of Business</option>
                  <option value="School of Engineering">School of Engineering</option>
                  <option value="School of Environmental Studies">School of Environmental Studies</option>
                  <option value="School of Education">School of Education</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setIsAddResourceOpen(false)} className="px-3 py-1.5 text-slate-300">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#8c5837] hover:bg-[#a06842] text-white font-bold rounded-xl">Save & Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Book */}
      {isAddBookOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#001738] border border-[#0f3460] rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setIsAddBookOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-base text-white mb-3">Add Library Textbook</h3>

            <form onSubmit={handleCreateBook} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-200 font-semibold block mb-1">Book Title *</label>
                <input
                  type="text"
                  required
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder="e.g. Modern Operating Systems"
                  className="w-full px-3 py-2 rounded-xl bg-[#001026] border border-[#0f3460] text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-200 font-semibold block mb-1">Author</label>
                  <input
                    type="text"
                    value={bookAuthor}
                    onChange={(e) => setBookAuthor(e.target.value)}
                    placeholder="e.g. Andrew S. Tanenbaum"
                    className="w-full px-3 py-2 rounded-xl bg-[#001026] border border-[#0f3460] text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-200 font-semibold block mb-1">Course Code</label>
                  <input
                    type="text"
                    value={bookCode}
                    onChange={(e) => setBookCode(e.target.value)}
                    placeholder="e.g. COM 210"
                    className="w-full px-3 py-2 rounded-xl bg-[#001026] border border-[#0f3460] text-white uppercase font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-200 font-semibold block mb-1">Physical Shelf Location</label>
                <input
                  type="text"
                  value={bookShelf}
                  onChange={(e) => setBookShelf(e.target.value)}
                  placeholder="e.g. Stack Area 2, QA 76"
                  className="w-full px-3 py-2 rounded-xl bg-[#001026] border border-[#0f3460] text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setIsAddBookOpen(false)} className="px-3 py-1.5 text-slate-300">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#8c5837] hover:bg-[#a06842] text-white font-bold rounded-xl">Add Textbook</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Notice */}
      {isAddNoticeOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#001738] border border-[#0f3460] rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setIsAddNoticeOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-base text-white mb-3">Broadcast Campus Notice</h3>

            <form onSubmit={handleCreateNotice} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-200 font-semibold block mb-1">Notice Headline *</label>
                <input
                  type="text"
                  required
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  placeholder="e.g. Semester I Examination Cards Verification Notice"
                  className="w-full px-3 py-2 rounded-xl bg-[#001026] border border-[#0f3460] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-200 font-semibold block mb-1">Category</label>
                <select
                  value={noticeCategory}
                  onChange={(e) => setNoticeCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-[#001026] border border-[#0f3460] text-white"
                >
                  <option value="Exams">Exams & CATs</option>
                  <option value="Academics">Academics & Timetables</option>
                  <option value="HELB / Fees">HELB & Fees</option>
                  <option value="Hostels">Hostels</option>
                  <option value="Student Union">Student Union (UoEGSU)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-200 font-semibold block mb-1">Notice Body *</label>
                <textarea
                  rows={3}
                  required
                  value={noticeContent}
                  onChange={(e) => setNoticeContent(e.target.value)}
                  placeholder="Provide clear instructions for students..."
                  className="w-full px-3 py-2 rounded-xl bg-[#001026] border border-[#0f3460] text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={noticeUrgent}
                  onChange={(e) => setNoticeUrgent(e.target.checked)}
                  className="rounded text-[#8c5837]"
                />
                <label htmlFor="urgent" className="text-slate-200 font-semibold cursor-pointer">
                  Mark as Urgent Alert
                </label>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setIsAddNoticeOpen(false)} className="px-3 py-1.5 text-slate-300">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#8c5837] hover:bg-[#a06842] text-white font-bold rounded-xl">Broadcast Notice</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
