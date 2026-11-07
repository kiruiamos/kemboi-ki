import React from 'react';
import { ShieldAlert, Phone, MapPin, Clock, BookOpen } from 'lucide-react';
import { UOE_CAMPUS_SERVICES } from '../data/mockHubData';

export const EmergencyView: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="rounded-2xl bg-[#001738] border border-red-900/60 p-6 shadow-xl">
        <div className="flex items-center space-x-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-1">
          <ShieldAlert className="w-4 h-4" />
          <span>Campus Safety & Health</span>
        </div>
        <h1 className="text-2xl font-black text-white">
          24/7 University Health Centre & Security
        </h1>
        <p className="text-xs text-slate-300 mt-1">
          Immediate access to medical assistance, security patrols, and student counseling.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {UOE_CAMPUS_SERVICES.map((serv) => (
          <div
            key={serv.id}
            className="p-5 rounded-xl bg-[#001a3d] border border-[#0f3460] hover:border-red-600/70 flex flex-col justify-between transition-colors shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-900/40 text-red-300 border border-red-800/60">
                  {serv.badge}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{serv.hours}</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1">
                {serv.name}
              </h3>
              <div className="flex items-center space-x-1 text-xs text-[#e8c49d] mb-2">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{serv.location}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {serv.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#0f3460] flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-300">
                {serv.contact}
              </span>
              <button
                onClick={() => alert(`Calling emergency line: ${serv.contact}`)}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-red-700 hover:bg-red-600 text-white font-bold text-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Exam Card Instructions */}
      <div className="p-6 rounded-2xl bg-[#001738] border border-[#0f3460] space-y-3">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#e8c49d]" />
          <span>UoE ERP Fee Clearance & Exam Card Steps</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs text-slate-200">
          <div className="p-3 rounded-lg bg-[#001026] border border-[#0f3460]">
            <span className="font-bold text-[#e8c49d] block mb-0.5">1. Clear 75% Fee</span>
            <p className="text-slate-400">Pay tuition through the eCitizen / KCB account.</p>
          </div>
          <div className="p-3 rounded-lg bg-[#001026] border border-[#0f3460]">
            <span className="font-bold text-[#e8c49d] block mb-0.5">2. Register Units</span>
            <p className="text-slate-400">Complete semester units in portal.uoeld.ac.ke.</p>
          </div>
          <div className="p-3 rounded-lg bg-[#001026] border border-[#0f3460]">
            <span className="font-bold text-[#e8c49d] block mb-0.5">3. Print Exam Card</span>
            <p className="text-slate-400">Download and print the card under Academics.</p>
          </div>
          <div className="p-3 rounded-lg bg-[#001026] border border-[#0f3460]">
            <span className="font-bold text-[#e8c49d] block mb-0.5">4. Stamping</span>
            <p className="text-slate-400">Present with Student ID at examination hall.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
