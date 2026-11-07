import React from 'react';
import { X, Download, ThumbsUp, Bookmark, Star } from 'lucide-react';
import { HubResource } from '../types/prompt';

interface ResourcePreviewModalProps {
  resource: HubResource | null;
  onClose: () => void;
  onSimulateDownload: (res: HubResource) => void;
  onUpvote: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  isSaved: boolean;
}

export const ResourcePreviewModal: React.FC<ResourcePreviewModalProps> = ({
  resource,
  onClose,
  onSimulateDownload,
  onUpvote,
  onToggleBookmark,
  isSaved,
}) => {
  if (!resource) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-[#001738] border border-[#0f3460] rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] flex flex-col justify-between overflow-hidden">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[#0f3460]">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-[#8c5837]/30 text-[#e8c49d] border border-[#8c5837]/40">
                {resource.courseCode}
              </span>
              <span className="text-xs text-slate-300">
                {resource.department}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              {resource.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 overflow-y-auto space-y-3 text-xs">
          <div className="grid grid-cols-3 gap-2 text-[11px]">
            <div className="p-2.5 rounded-lg bg-[#001026] border border-[#0f3460]">
              <span className="text-slate-400 block">Uploaded By:</span>
              <span className="font-bold text-white truncate block">{resource.author}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#001026] border border-[#0f3460]">
              <span className="text-slate-400 block">File Size:</span>
              <span className="font-bold text-[#e8c49d] block">{resource.size}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#001026] border border-[#0f3460]">
              <span className="text-slate-400 block">Rating:</span>
              <div className="flex items-center space-x-1 font-bold text-[#e8c49d]">
                <Star className="w-3 h-3 fill-current" />
                <span>{resource.rating} / 5.0</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#001026] border border-[#0f3460] text-slate-200 leading-relaxed">
            <span className="font-bold text-[#e8c49d] block mb-1">Description:</span>
            <p>{resource.description}</p>
          </div>

          {/* Exam Paper Sample Preview */}
          <div className="p-4 rounded-xl bg-[#000d21] border border-[#0f3460] font-mono text-[11px] text-slate-300 space-y-2">
            <div className="text-center pb-2 border-b border-[#0f3460]">
              <p className="font-bold text-white">UNIVERSITY OF ELDORET</p>
              <p className="text-[10px] text-[#e8c49d] font-bold">END OF SEMESTER MAIN EXAMINATION (70% MARKS)</p>
              <p className="text-[10px] text-slate-400">{resource.courseCode}: {resource.courseName}</p>
            </div>
            <p><strong className="text-white">INSTRUCTIONS:</strong> Answer Question ONE (Compulsory) and any TWO other questions.</p>
            <p className="text-slate-300">Q1. (a) State core principles and derivations. [10 Marks]</p>
            <p className="text-slate-300">Q1. (b) Explain practical applications in Kenyan contexts. [20 Marks]</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#0f3460] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onUpvote(resource.id)}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-[#00224f] hover:bg-[#002b66] text-white text-xs border border-[#0f3460]"
            >
              <ThumbsUp className="w-3.5 h-3.5 text-[#e8c49d]" />
              <span>{resource.upvotes}</span>
            </button>
            <button
              onClick={() => onToggleBookmark(resource.id)}
              className={`p-1.5 rounded-lg border border-[#0f3460] ${isSaved ? 'text-[#e8c49d] bg-[#8c5837]/20' : 'text-slate-400'}`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-300 hover:text-white"
            >
              Close
            </button>
            <button
              onClick={() => {
                onSimulateDownload(resource);
                onClose();
              }}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#8c5837] hover:bg-[#a06842] text-white font-bold text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
