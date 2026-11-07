import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { HubResource } from '../types/prompt';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContribute: (newRes: HubResource) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onContribute,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('COM 110');
  const [department, setDepartment] = useState('School of Science');
  const [type, setType] = useState<HubResource['type']>('past_exam');
  const [semester, setSemester] = useState('Year 1 Semester 1');
  const [authorName, setAuthorName] = useState('');
  const [description, setDescription] = useState('');
  const [fileAttached, setFileAttached] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newResource: HubResource = {
      id: `res-user-${Date.now()}`,
      title: title.trim(),
      courseCode: courseCode.trim().toUpperCase(),
      courseName: 'Student Shared Material',
      department,
      type,
      author: authorName.trim() || 'Student Contributor',
      downloads: 1,
      upvotes: 1,
      rating: 5.0,
      semester,
      size: '2.8 MB',
      tags: ['Student Contribution', courseCode.trim().toUpperCase()],
      description: description.trim() || 'Revision material contributed by a University of Eldoret student.',
      isVerified: false
    };

    onContribute(newResource);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#001738] border border-[#0f3460] rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[#0f3460] mb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#e8c49d] block">
              Peer Upload
            </span>
            <h3 className="text-lg font-black text-white">
              Contribute Past Paper or Notes
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          
          <div>
            <label className="text-slate-200 font-semibold block mb-1">
              Document Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. COM 110 Semester 1 Main Exam 2024"
              className="w-full px-3 py-2 rounded-xl bg-[#001026] border border-[#0f3460] text-white focus:outline-none focus:border-[#8c5837]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-200 font-semibold block mb-1">
                Course Code *
              </label>
              <input
                type="text"
                required
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="e.g. COM 110"
                className="w-full px-3 py-2 rounded-xl bg-[#001026] border border-[#0f3460] text-white uppercase font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-200 font-semibold block mb-1">
                Category *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#001026] border border-[#0f3460] text-white focus:outline-none"
              >
                <option value="past_exam">Main Exam (70%)</option>
                <option value="lecture_notes">Lecture Notes</option>
                <option value="cheat_sheet">Formula Sheet</option>
                <option value="lab_report">Lab Manual</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-slate-200 font-semibold block mb-1">
              UoE Academic School *
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#001026] border border-[#0f3460] text-white focus:outline-none"
            >
              <option value="School of Science">School of Science</option>
              <option value="School of Agriculture & Biotechnology">School of Agriculture & Biotech</option>
              <option value="School of Business & Management Sciences">School of Business & Management</option>
              <option value="School of Environmental Studies">School of Environmental Studies</option>
              <option value="School of Engineering">School of Engineering</option>
              <option value="School of Education">School of Education</option>
            </select>
          </div>

          <div 
            onClick={() => setFileAttached('uoe_doc_' + Date.now().toString().slice(-4) + '.pdf')}
            className="p-3.5 rounded-xl border border-dashed border-[#0f3460] bg-[#001026] text-center cursor-pointer hover:border-[#8c5837]"
          >
            <Upload className="w-4 h-4 mx-auto text-[#e8c49d] mb-1" />
            <span className="text-slate-300">
              {fileAttached ? `Attached: ${fileAttached}` : 'Click to attach PDF / Word document'}
            </span>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#8c5837] hover:bg-[#a06842] text-white font-bold"
            >
              Upload Document
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
