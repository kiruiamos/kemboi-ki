import React, { useState } from 'react';
import { Home, ShieldCheck, Phone } from 'lucide-react';
import { UOE_HOSTELS } from '../data/mockHubData';

export const HostelsView: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('All');

  const filteredHostels = UOE_HOSTELS.filter((h) => {
    if (filterType === 'All') return true;
    return h.type.includes(filterType);
  });

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="rounded-2xl bg-[#001738] border border-[#0f3460] p-6 shadow-xl">
        <div className="flex items-center space-x-2 text-[#e8c49d] text-xs font-bold uppercase tracking-wider mb-1">
          <Home className="w-4 h-4" />
          <span>Accommodation Directory</span>
        </div>
        <h1 className="text-2xl font-black text-white">
          Chepkoilel Hostels & Student Living
        </h1>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mt-4">
          {['All', 'On-Campus', 'Upper Stage', 'Marura', 'Lower Stage'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterType(tab)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                filterType === tab ? 'bg-[#8c5837] text-white shadow-sm' : 'bg-[#001126] text-slate-300 hover:text-white border border-[#0f3460]'
              }`}
            >
              {tab === 'On-Campus' ? 'Halls 1-6' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHostels.map((hostel) => (
          <div
            key={hostel.id}
            className="p-5 rounded-xl bg-[#001a3d] border border-[#0f3460] hover:border-[#8c5837] flex flex-col justify-between transition-colors shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#8c5837]/30 text-[#e8c49d]">
                  {hostel.type}
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  {hostel.gender}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1">
                {hostel.name}
              </h3>
              <div className="text-sm font-extrabold text-[#e8c49d] mb-2">
                {hostel.priceRange}
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-300 mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#e8c49d]" />
                <span>Security: {hostel.securityRating}</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {hostel.amenities.map((am, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#001026] text-slate-300 border border-[#0f3460]">
                    {am}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#0f3460] flex items-center justify-between text-xs">
              <span className="text-slate-300 font-mono text-[11px]">{hostel.contact}</span>
              <button
                onClick={() => alert(`Contacting ${hostel.name}: ${hostel.contact}`)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#8c5837] hover:bg-[#a06842] text-white font-bold"
              >
                <Phone className="w-3 h-3" />
                <span>Inquire</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
