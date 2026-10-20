import React from 'react';
import { PageTab } from '../types';
import { Flame, ShoppingBag, Bell, Code } from 'lucide-react';

interface NavigationProps {
  currentTab: PageTab;
  onTabChange: (tab: PageTab) => void;
  cartCount: number;
  onCartClick: () => void;
  isVsCodeMode: boolean;
  onToggleVsCodeMode: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onTabChange,
  cartCount,
  onCartClick,
  isVsCodeMode,
  onToggleVsCodeMode,
}) => {
  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-[#0a0e14]/90 backdrop-blur-xl border-b border-white/10 shadow-xl">
      <div className="h-20 max-w-[1440px] mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo and Brand with Flutter Tag */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => onTabChange('nutrition-store')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1UYewceqJdvqBvSWqbqr4lGHl0Kkgsa2EeqlGVguH8cOflglTnTK3rNHKYS-QhBUiMPIJtbH09mn9_W0l7T-ZtVSpWfC347EN2uQCGl96yRC9i-Mqk6zwSXBTVJXaNzG_Jl_9GjjbkZ17UeIKAlEzLBDAtWeDmsIFb_kR0wLv4DfdgHIBHJWqnjdsNDPuEHRqSnnztVJuT1ECLJpNO_GVX-toZFzrO6CgQDZnnKMEHkrXH_s6SSk0Y3tZU"
              alt="Kinetic Apex Logo"
              className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-display text-lg uppercase text-white tracking-tight hidden sm:inline-block font-bold leading-tight">
                Athletica <span className="text-[#caf300]">Supplement Store</span>
              </span>
              <span className="font-mono text-[10px] text-[#00dbe9] tracking-wider hidden sm:flex items-center gap-1 font-semibold">
                <svg className="w-2.5 h-2.5 text-[#00dbe9]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37zM6 15.7L14.314 24h7.37L9.7 12 6 15.7z"/>
                </svg>
                FLUTTER WEB • CANVASKIT RUNTIME
              </span>
            </div>
          </div>

          {/* Mode Switcher Pill */}
          <button
            onClick={onToggleVsCodeMode}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold uppercase transition-all shadow-md ${
              isVsCodeMode
                ? 'bg-[#00dbe9] text-[#00363a] ring-2 ring-[#00dbe9]/50'
                : 'bg-[#181c22] text-[#00dbe9] hover:bg-[#262a31] border border-[#00dbe9]/30 hover:border-[#00dbe9]'
            }`}
            title="Inspect & Edit Flutter / Dart Code in VS Code"
          >
            <Code size={14} />
            <span>{isVsCodeMode ? 'Flutter IDE Active' : 'Open Flutter in VS Code'}</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#181c22]/60 p-1 rounded-xl border border-white/5">
          {[
            { id: 'nutrition-store', label: 'Nutrition Store' },
            { id: 'workout-log', label: 'Workout Log' },
            { id: 'coach-group-chat', label: 'Coach & Group Chat' },
            { id: 'squad-leaderboard', label: 'Squad Leaderboard' },
          ].map(tab => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as PageTab)}
                className={`px-4 py-2 font-sans text-sm rounded-lg transition-all font-medium ${
                  isActive
                    ? 'bg-[#caf300] text-[#171e00] font-bold shadow-lg shadow-[#caf300]/20'
                    : 'text-[#c5c9ac] hover:bg-[#262a31] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons & Telemetry */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Calorie Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#181c22] rounded-xl border border-white/5">
            <Flame size={16} className="text-[#00dbe9]" />
            <span className="font-mono text-sm font-bold text-white">2,400</span>
            <span className="font-mono text-[10px] text-[#c5c9ac] uppercase">kcal</span>
          </div>

          {/* Cart Trigger */}
          <button
            onClick={onCartClick}
            aria-label="View Shopping Cart"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#181c22] hover:bg-[#262a31] rounded-xl text-[#c5c9ac] hover:text-white transition-colors border border-white/5 relative"
          >
            <ShoppingBag size={18} />
            <span className="px-1.5 py-0.2 bg-[#caf300] text-[#171e00] font-mono text-xs font-bold rounded">
              {cartCount}
            </span>
          </button>

          {/* Notification Bell */}
          <button
            aria-label="Notifications"
            className="p-2 text-[#c5c9ac] hover:text-white rounded-xl bg-[#181c22] hover:bg-[#262a31] transition-colors relative"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#caf300] animate-pulse" />
          </button>

          {/* User Profile */}
          <div className="flex items-center pl-1">
            <div className="relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxmF-JVzS5-A4zowWqsoL1L72BHDEpujDHQHu00br6sVwXI60zm1v3G62j0IN5TwaYxfz4QJfjLBcix5DaBGeWec1AOYTBINHx-C-2FkMWdKSvgl-mNlnBlG4-0E_YvkuAHxKd_CZE7cgDRnptt58nJnW2ZUDnrstUDjvQcP8e_0tpguxrZ2R09-_2TtXmViXId5LAbHUxWUuvMOYjEYdnCtrAa2JeLBXcBGCEVWYnM1VjzPUy6Vik"
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#caf300]/40"
              />
              <span className="absolute -bottom-1 -right-1 px-1 bg-[#caf300] text-[#171e00] font-sans text-[9px] font-bold uppercase rounded">
                PRO
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Subheader Terminal Telemetry Strip */}
      <div className="bg-[#10141a] border-t border-white/5 py-1.5 px-4 lg:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-2 text-[#c5c9ac]">
            <span className="hover:text-white uppercase">Athletica Terminal</span>
            <span className="text-white/40">/</span>
            <span className="text-[#caf300] uppercase font-bold tracking-wider">Active Telemetry</span>
            <span className="text-white/40">•</span>
            <span className="text-[#00dbe9] uppercase font-bold flex items-center gap-1">
              Dart / Flutter 3.24
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[#c5c9ac]">
            <span className="flex items-center gap-1.5 text-[#caf300]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#caf300] animate-ping" />
              SYSTEM OPERATIONAL
            </span>
            <span>LATENCY: 12ms</span>
            <span className="text-[#00dbe9]">BATCH 2548 VERIFIED</span>
          </div>
        </div>
      </div>
    </header>
  );
};
