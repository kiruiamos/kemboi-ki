import React from 'react';
import { 
  GraduationCap, 
  BookMarked, 
  Calculator, 
  Clock, 
  Coins, 
  Home, 
  ShieldAlert, 
  Bookmark, 
  Plus, 
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';

export type ActiveWebsiteTab = 'vault' | 'gpa' | 'pomodoro' | 'bursaries' | 'hostels' | 'emergency';

interface HeaderProps {
  activeTab: ActiveWebsiteTab;
  setActiveTab: (tab: ActiveWebsiteTab) => void;
  savedCount: number;
  onOpenSavedDrawer: () => void;
  onOpenUploadModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenSavedDrawer,
  onOpenUploadModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'vault' as ActiveWebsiteTab, label: 'Past Papers & Vault', icon: BookMarked },
    { id: 'gpa' as ActiveWebsiteTab, label: 'Grade & CAT Forecaster', icon: Calculator },
    { id: 'pomodoro' as ActiveWebsiteTab, label: 'Study Lounge', icon: Clock },
    { id: 'bursaries' as ActiveWebsiteTab, label: 'HELB & Bursaries', icon: Coins },
    { id: 'hostels' as ActiveWebsiteTab, label: 'Hostels & Living', icon: Home },
    { id: 'emergency' as ActiveWebsiteTab, label: 'Emergency & Clinic', icon: ShieldAlert },
  ];

  const handleNavClick = (id: ActiveWebsiteTab) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-950/80 bg-[#061811]/95 backdrop-blur-md">
      
      {/* Top University Announcement Bar */}
      <div className="bg-[#030e0a] text-slate-300 text-[11px] py-1.5 px-4 border-b border-emerald-950/90 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-bold text-amber-400">UoE Notice:</span>
            <span>2024/2025 Semester I Main Exam Draft Timetable Released • Clear 75% fee for Exam Cards</span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <span>Chepkoilel Main Campus</span>
            <span>•</span>
            <span>Town Campus (Eldoret CBD)</span>
            <span>•</span>
            <span className="text-amber-400 font-medium">Margaret Thatcher Library Open till 11 PM</span>
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* UoE Crest and Title */}
          <div 
            onClick={() => setActiveTab('vault')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-700 to-amber-500 p-0.5 shadow-lg shadow-emerald-950/60 flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#051c13] rounded-[14px] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base sm:text-xl text-white tracking-tight">
                  University of Eldoret
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 hidden md:inline-block">
                  Student Resource Hub
                </span>
              </div>
              <p className="text-[11px] text-emerald-400/80 hidden sm:block font-medium">
                Flame of Knowledge and Innovation • Academic Repository & Student Services
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-[#092218]/90 p-1 rounded-2xl border border-emerald-900/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                      : 'text-slate-300 hover:text-white hover:bg-emerald-950/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Action Buttons */}
          <div className="flex items-center space-x-2.5">
            
            {/* Bookmarks / Saved Button */}
            <button
              onClick={onOpenSavedDrawer}
              className="relative p-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-800/60 text-slate-200 hover:text-white transition-colors"
              title="Saved Study Materials"
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center shadow-md">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Contribute Notes Button */}
            <button
              onClick={onOpenUploadModal}
              className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs sm:text-sm font-bold shadow-md shadow-amber-950/40 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Upload Notes</span>
              <span className="sm:hidden">Upload</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-900/60 bg-[#061811] px-4 pt-3 pb-5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-emerald-950/60 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

    </header>
  );
};
