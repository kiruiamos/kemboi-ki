import React from 'react';
import { Coins, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import { UOE_SCHOLARSHIPS } from '../data/mockHubData';

export const BursariesView: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="rounded-2xl bg-[#001738] border border-[#0f3460] p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#e8c49d] text-xs font-bold uppercase tracking-wider mb-1">
            <Coins className="w-4 h-4" />
            <span>Financial Opportunities</span>
          </div>
          <h1 className="text-2xl font-black text-white">
            HELB, HEF & County Bursaries
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Track active scholarship deadlines and requirements for University of Eldoret students.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {UOE_SCHOLARSHIPS.map((sch) => (
          <div
            key={sch.id}
            className="p-5 rounded-xl bg-[#001a3d] border border-[#0f3460] hover:border-[#8c5837] flex flex-col justify-between transition-colors shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#8c5837]/30 text-[#e8c49d] border border-[#8c5837]/40">
                  {sch.category}
                </span>
                <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{sch.deadline}</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1">
                {sch.title}
              </h3>
              <p className="text-xs font-semibold text-slate-300 mb-2">
                {sch.provider}
              </p>
              <p className="text-xs text-slate-200 leading-relaxed mb-4">
                {sch.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#0f3460] flex items-center justify-between">
              <span className="text-sm font-extrabold text-[#e8c49d]">
                {sch.amount}
              </span>
              <a
                href={sch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#8c5837] hover:bg-[#a06842] text-white font-bold text-xs"
              >
                <span>Portal Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
