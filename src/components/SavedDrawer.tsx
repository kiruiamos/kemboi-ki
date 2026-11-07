import React from 'react';
import { Bookmark, X, Download, Trash2 } from 'lucide-react';
import { HubResource } from '../types/prompt';
import { AcademicBook } from '../data/booksData';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedResources: HubResource[];
  savedBooks: AcademicBook[];
  onRemoveResource: (id: string) => void;
  onRemoveBook: (id: string) => void;
  onDownloadItem: (title: string, size: string) => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedResources,
  savedBooks,
  onRemoveResource,
  onRemoveBook,
  onDownloadItem,
}) => {
  if (!isOpen) return null;

  const totalSaved = savedResources.length + savedBooks.length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-xs" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#001738] border-l border-[#0f3460] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-[#0f3460] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bookmark className="w-5 h-5 text-[#e8c49d]" />
              <h2 className="text-base font-black text-white">
                Saved Materials ({totalSaved})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
            
            {/* Papers & Notes */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#e8c49d] mb-2.5">
                Past Papers & Revision Notes ({savedResources.length})
              </h3>

              {savedResources.length === 0 ? (
                <p className="text-slate-400 italic">No past papers saved.</p>
              ) : (
                <div className="space-y-2.5">
                  {savedResources.map((res) => (
                    <div
                      key={res.id}
                      className="p-3 rounded-xl bg-[#001026] border border-[#0f3460] flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-[#e8c49d]">
                          {res.courseCode}
                        </span>
                        <button
                          onClick={() => onRemoveResource(res.id)}
                          className="text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="font-bold text-white line-clamp-1 mb-1.5">
                        {res.title}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>{res.size}</span>
                        <button
                          onClick={() => onDownloadItem(res.title, res.size)}
                          className="text-[#e8c49d] hover:text-white font-bold flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Books */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-2.5">
                Saved Books ({savedBooks.length})
              </h3>

              {savedBooks.length === 0 ? (
                <p className="text-slate-400 italic">No books saved.</p>
              ) : (
                <div className="space-y-2.5">
                  {savedBooks.map((book) => (
                    <div
                      key={book.id}
                      className="p-3 rounded-xl bg-[#001026] border border-[#0f3460] flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-[10px] font-bold text-[#e8c49d]">
                          {book.courseCodes.join(', ')}
                        </span>
                        <button
                          onClick={() => onRemoveBook(book.id)}
                          className="text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="font-bold text-white line-clamp-1 mb-0.5">
                        {book.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mb-1.5">{book.author}</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>{book.fileSize}</span>
                        <button
                          onClick={() => onDownloadItem(book.title, book.fileSize)}
                          className="text-[#e8c49d] hover:text-white font-bold flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#0f3460] bg-[#001126]">
            <button
              onClick={onClose}
              className="w-full py-2 rounded-xl bg-[#8c5837] hover:bg-[#a06842] text-white font-bold text-xs"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
