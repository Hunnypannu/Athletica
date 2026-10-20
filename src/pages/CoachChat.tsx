import React, { useState } from 'react';
import { ChatMessage } from '../types';
import { 
  Bolt, MessageSquare, Headphones, Pin, MoreVertical, 
  Play, Pause, Send, Mic, Video, FileSpreadsheet, 
  Check, Lock, Repeat, CheckCircle2, Circle, Flame, Smile 
} from 'lucide-react';

interface CoachChatProps {
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  onNavigateToNutrition: () => void;
  onNavigateToWorkout: () => void;
}

export const CoachChat: React.FC<CoachChatProps> = ({
  messages,
  onSendMessage,
  onNavigateToNutrition,
  onNavigateToWorkout,
}) => {
  const [activeChannel, setActiveChannel] = useState<string>('daily-prs-and-hype');
  const [inputText, setInputText] = useState<string>('');
  const [isPlayingVoice, setIsPlayingVoice] = useState<boolean>(false);
  const [localReactions, setLocalReactions] = useState<{ fire: number; bolt: number; bicep: number; userReacted: Record<string, boolean> }>({
    fire: 6,
    bolt: 4,
    bicep: 8,
    userReacted: {},
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleTransmit = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
    setToastMessage('Telemetry message transmitted to squad feed.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleReaction = (type: 'fire' | 'bolt' | 'bicep') => {
    setLocalReactions(prev => {
      const isReacted = prev.userReacted[type];
      return {
        ...prev,
        [type]: isReacted ? prev[type] - 1 : prev[type] + 1,
        userReacted: {
          ...prev.userReacted,
          [type]: !isReacted,
        },
      };
    });
  };

  const applyShortcut = (shortcut: string) => {
    setInputText(shortcut + ' ');
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-16">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#caf300] text-[#171e00] font-mono text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-[#caf300]">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: SQUAD CHANNELS & DMS (3 Cols) */}
        <aside className="xl:col-span-3 flex flex-col gap-4">
          {/* Squad Terminal Selector Card */}
          <div className="bg-[#181c22] rounded-xl p-4 border border-white/5 shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#caf300] animate-ping" />
                <span className="font-sans text-[11px] font-bold uppercase text-[#caf300] tracking-wider">
                  Apex Squad Telemetry
                </span>
              </div>
              <span className="font-mono text-xs text-[#c5c9ac] bg-[#1c2026] px-2 py-0.5 rounded">
                SQ-09
              </span>
            </div>

            <div className="flex items-center gap-3 bg-[#1c2026] p-3 rounded-lg border border-white/5">
              <div className="w-10 h-10 rounded-lg bg-[#262a31] flex items-center justify-center text-[#caf300]">
                <Bolt size={22} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-display text-sm font-bold text-white truncate">Alpha Squadron</span>
                <span className="font-mono text-[11px] text-[#c5c9ac] truncate">
                  Strength Block IV • 14 Athletes
                </span>
              </div>
            </div>
          </div>

          {/* Channels List */}
          <div className="bg-[#181c22] rounded-xl p-4 border border-white/5 shadow-xl flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="font-sans text-[11px] font-bold uppercase text-[#c5c9ac]">Squad Channels</span>
              <span className="material-symbols-outlined text-[#c5c9ac] text-[16px] hover:text-white cursor-pointer">
                add
              </span>
            </div>

            <nav className="flex flex-col gap-1 mt-1 font-mono text-xs">
              <button
                onClick={() => setActiveChannel('general-chat')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left ${
                  activeChannel === 'general-chat'
                    ? 'bg-[#caf300]/15 text-white font-bold border border-[#caf300]/30'
                    : 'bg-[#1c2026] hover:bg-[#262a31] text-[#c5c9ac]'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span>#</span>
                  <span className="font-sans text-xs">general-chat</span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              </button>

              <button
                onClick={() => setActiveChannel('daily-prs-and-hype')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-left ${
                  activeChannel === 'daily-prs-and-hype'
                    ? 'bg-[#caf300]/15 text-white font-bold border border-[#caf300]/40 shadow-[0_0_12px_rgba(202,243,0,0.15)]'
                    : 'bg-[#1c2026] hover:bg-[#262a31] text-[#c5c9ac]'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[#caf300]">#</span>
                  <span className="font-sans text-xs text-white">daily-prs-and-hype</span>
                </div>
                <span className="px-1.5 py-0.2 rounded-full bg-[#caf300] text-[#171e00] font-mono text-[9px] font-bold animate-pulse">
                  ACTIVE
                </span>
              </button>

              <button
                onClick={() => setActiveChannel('form-check-video')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left ${
                  activeChannel === 'form-check-video'
                    ? 'bg-[#caf300]/15 text-white font-bold border border-[#caf300]/30'
                    : 'bg-[#1c2026] hover:bg-[#262a31] text-[#c5c9ac]'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span>#</span>
                  <span className="font-sans text-xs">form-check-video</span>
                </div>
                <span className="px-1.5 py-0.2 bg-[#262a31] text-[#c5c9ac] font-mono text-[10px] rounded">3</span>
              </button>
            </nav>
          </div>

          {/* Direct Messages List */}
          <div className="bg-[#181c22] rounded-xl p-4 border border-white/5 shadow-xl flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="font-sans text-[11px] font-bold uppercase text-[#c5c9ac]">Direct Telemetry</span>
              <span className="material-symbols-outlined text-[#c5c9ac] text-[16px] hover:text-white cursor-pointer">
                tune
              </span>
            </div>

            <div className="flex flex-col gap-2 mt-1">
              {/* Coach Marcus Vance */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#262a31] border border-white/5 hover:border-[#caf300]/40 cursor-pointer transition-all">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative flex-shrink-0">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxmF-JVzS5-A4zowWqsoL1L72BHDEpujDHQHu00br6sVwXI60zm1v3G62j0IN5TwaYxfz4QJfjLBcix5DaBGeWec1AOYTBINHx-C-2FkMWdKSvgl-mNlnBlG4-0E_YvkuAHxKd_CZE7cgDRnptt58nJnW2ZUDnrstUDjvQcP8e_0tpguxrZ2R09-_2TtXmViXId5LAbHUxWUuvMOYjEYdnCtrAa2JeLBXcBGCEVWYnM1VjzPUy6Vik"
                      alt="Coach Marcus Vance"
                      className="w-9 h-9 rounded-lg object-cover"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#caf300] ring-2 ring-[#181c22]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-display text-xs font-bold text-white truncate">Coach Marcus</span>
                      <span className="material-symbols-outlined text-[#caf300] text-[14px]">verified</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#caf300] truncate">Head Strength Coach</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#c5c9ac] text-[18px]">radio_button_checked</span>
              </div>

              {/* Alex Rivera */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#1c2026] hover:bg-[#262a31] cursor-pointer transition-colors border border-white/5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative flex-shrink-0">
                    <div className="w-9 h-9 rounded-lg bg-[#262a31] flex items-center justify-center font-mono text-xs font-bold text-[#00dbe9]">
                      AR
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00dbe9] ring-2 ring-[#181c22]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-display text-xs font-bold text-white truncate">Alex Rivera</span>
                    <span className="font-mono text-[10px] text-[#c5c9ac] truncate">Training Partner</span>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-[#c5c9ac]">4m</span>
              </div>

              {/* Sarah Chen */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#1c2026] hover:bg-[#262a31] cursor-pointer transition-colors border border-white/5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative flex-shrink-0">
                    <div className="w-9 h-9 rounded-lg bg-[#262a31] flex items-center justify-center font-mono text-xs font-bold text-[#ffb599]">
                      SC
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-white/20 ring-2 ring-[#181c22]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-display text-xs font-bold text-white truncate">Sarah Chen</span>
                    <span className="font-mono text-[10px] text-[#c5c9ac] truncate">Olympic Weightlifting</span>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-[#c5c9ac]">2h</span>
              </div>
            </div>
          </div>

          {/* Quick Session Vitals Metric Widget */}
          <div className="bg-[#181c22] rounded-xl p-4 border border-white/5 shadow-xl flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[11px] font-bold uppercase text-[#c5c9ac]">Squad Readiness</span>
              <span className="font-mono text-xs text-[#caf300] font-bold">94.2%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#0a0e14] flex overflow-hidden">
              <div className="bg-[#caf300] h-full w-[65%]" title="Optimal" />
              <div className="bg-[#00dbe9] h-full w-[25%]" title="Recovering" />
              <div className="bg-[#ffb599] h-full w-[10%]" title="Fatigued" />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-[#c5c9ac] pt-1">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#caf300]" /> 9 Prime
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00dbe9]" /> 4 Load
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffb599]" /> 1 Deload
              </span>
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN: MAIN INTERACTIVE CHAT STREAM (6 Cols) */}
        <main className="xl:col-span-6 flex flex-col bg-[#181c22] rounded-xl shadow-2xl border border-white/5 overflow-hidden min-h-[820px] justify-between">
          {/* Chat Header */}
          <div className="p-4 bg-[#1c2026] flex items-center justify-between border-b border-white/5 z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#262a31] flex items-center justify-center text-[#caf300] border border-white/5">
                <span className="material-symbols-outlined text-[20px]">fitness_center</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-display text-base font-bold text-white"># {activeChannel}</span>
                  <span className="px-2 py-0.2 rounded bg-[#caf300]/15 text-[#caf300] font-mono text-[10px] font-bold border border-[#caf300]/30">
                    LIVE HUD
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#c5c9ac]">
                  Sub-protocol: High-Velocity Squats • Coach Command Sync Active
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setToastMessage('Tactical Audio Channel: Connected to squad voice node.');
                  setTimeout(() => setToastMessage(null), 2500);
                }}
                className="p-2 rounded-lg bg-[#262a31] text-[#c5c9ac] hover:text-white transition-colors"
                title="Audio Channel"
              >
                <Headphones size={16} />
              </button>
              <button
                className="p-2 rounded-lg bg-[#262a31] text-[#c5c9ac] hover:text-white transition-colors"
                title="Pinned Directives"
              >
                <Pin size={16} />
              </button>
              <button
                className="p-2 rounded-lg bg-[#262a31] text-[#c5c9ac] hover:text-white transition-colors"
                title="Stream Settings"
              >
                <MoreVertical size={16} />
              </button>
            </div>
          </div>

          {/* Message Feed */}
          <div className="p-4 sm:p-6 flex flex-col gap-6 overflow-y-auto max-h-[640px]">
            {/* Timeline Marker */}
            <div className="flex items-center justify-center gap-3 py-1">
              <div className="h-[1px] flex-1 bg-white/10" />
              <span className="font-sans text-[10px] font-bold text-[#c5c9ac] tracking-widest uppercase">
                Session Protocol Broadcast • 05:30 AM EST
              </span>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>

            {/* 1. Official Coach Command Card (Hero Highlight) */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxmF-JVzS5-A4zowWqsoL1L72BHDEpujDHQHu00br6sVwXI60zm1v3G62j0IN5TwaYxfz4QJfjLBcix5DaBGeWec1AOYTBINHx-C-2FkMWdKSvgl-mNlnBlG4-0E_YvkuAHxKd_CZE7cgDRnptt58nJnW2ZUDnrstUDjvQcP8e_0tpguxrZ2R09-_2TtXmViXId5LAbHUxWUuvMOYjEYdnCtrAa2JeLBXcBGCEVWYnM1VjzPUy6Vik"
                  alt="Coach Marcus Vance"
                  className="w-8 h-8 rounded-lg object-cover ring-1 ring-[#caf300]"
                />
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-bold text-white">Coach Marcus Vance</span>
                  <span className="bg-[#caf300] text-[#171e00] font-sans text-[10px] font-bold px-1.5 py-0.2 rounded uppercase">
                    COACH
                  </span>
                  <span className="font-mono text-[11px] text-[#c5c9ac]">06:12 AM</span>
                </div>
              </div>

              {/* Highlighted Bubble */}
              <div className="ml-11 bg-[#1c2026] rounded-xl p-4 sm:p-5 border border-white/5 relative overflow-hidden shadow-[0_0_30px_rgba(202,243,0,0.12)]">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#caf300]" />
                <div className="flex items-center justify-between pb-2 pt-1">
                  <div className="flex items-center gap-1.5 text-[#caf300]">
                    <span className="material-symbols-outlined text-[18px]">notification_important</span>
                    <span className="font-sans text-[11px] font-bold uppercase tracking-wider">
                      OFFICIAL COACH COMMAND • PHASE 3
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#c5c9ac]">REQ_ACK: REQUIRED</span>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-white mt-1">
                  TOMORROW: High Intensity Lower Body Density Block
                </h3>
                <p className="font-sans text-sm text-[#dfe2eb] mt-2 leading-relaxed">
                  “Team, increase load by <span className="text-[#caf300] font-semibold">5% on primary squats</span>. Track bar velocity on Set 3. Don't skip your intra-workout carbs—glycogen depletion threshold is elevated for this volume block.”
                </p>

                {/* Prescribed Workout Matrix Box */}
                <div className="mt-4 bg-[#0a0e14] rounded-lg p-3 sm:p-4 border border-white/5 flex flex-col gap-2">
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-sans text-[10px] font-bold text-[#c5c9ac] uppercase tracking-wider">
                      Prescribed Session Telemetry
                    </span>
                    <span className="font-mono text-xs text-[#00dbe9]">RPE TARGET: 8.5 – 9.0</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="p-2.5 bg-[#181c22] rounded-lg border border-white/5 flex flex-col justify-between">
                      <span className="font-mono text-[10px] text-[#c5c9ac]">PRIMARY LIFT</span>
                      <span className="font-display text-xs text-white font-bold mt-0.5">5x5 Barbell Back Squat</span>
                      <span className="font-mono text-base font-bold text-[#caf300] mt-1">
                        315 <span className="text-[10px] text-[#c5c9ac]">LBS</span>
                      </span>
                    </div>
                    <div className="p-2.5 bg-[#181c22] rounded-lg border border-white/5 flex flex-col justify-between">
                      <span className="font-mono text-[10px] text-[#c5c9ac]">POSTERIOR CHAIN</span>
                      <span className="font-display text-xs text-white font-bold mt-0.5">4x8 Romanian Deadlift</span>
                      <span className="font-mono text-base font-bold text-[#00dbe9] mt-1">
                        275 <span className="text-[10px] text-[#c5c9ac]">LBS</span>
                      </span>
                    </div>
                    <div className="p-2.5 bg-[#181c22] rounded-lg border border-white/5 flex flex-col justify-between">
                      <span className="font-mono text-[10px] text-[#c5c9ac]">UNILATERAL ACC</span>
                      <span className="font-display text-xs text-white font-bold mt-0.5">3x15 Bulgarian Split Squats</span>
                      <span className="font-mono text-base font-bold text-white mt-1">
                        70 <span className="text-[10px] text-[#c5c9ac]">DBs</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      onNavigateToWorkout();
                      setToastMessage('Session added to your workout schedule calendar.');
                    }}
                    className="px-4 py-2 bg-[#caf300] text-[#171e00] font-display text-xs uppercase font-bold rounded-lg hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[16px]">calendar_add_on</span>
                    + Add to My Workout Calendar
                  </button>
                  <button
                    onClick={() => {
                      setToastMessage('Session protocol PDF downloaded.');
                      setTimeout(() => setToastMessage(null), 2500);
                    }}
                    className="px-4 py-2 bg-[#262a31] hover:bg-[#31353c] text-white font-sans text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    Download Session Protocol
                  </button>
                  <button
                    onClick={() => setInputText('@coach results ready: 315x5 completed at RPE 8.5 ')}
                    className="px-4 py-2 bg-[#262a31] text-[#caf300] hover:bg-[#31353c] font-sans text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors border border-[#caf300]/20"
                  >
                    <span className="material-symbols-outlined text-[16px]">reply</span>
                    Log Results &amp; Reply
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Athlete Voice Note (Alex Rivera) */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#262a31] flex items-center justify-center font-mono text-xs font-bold text-[#00dbe9]">
                  AR
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-bold text-white">Alex Rivera</span>
                  <span className="font-mono text-[11px] text-[#c5c9ac]">06:28 AM</span>
                </div>
              </div>
              <div className="ml-11 bg-[#1c2026] rounded-xl p-3.5 max-w-lg flex flex-col gap-2 border border-white/5">
                <p className="font-sans text-xs text-[#dfe2eb]">
                  “Locked in. Hit my pre-fatigue warmups just now. Here is a note on hip tightness from set 1:”
                </p>
                {/* Voice Note Player Component */}
                <div className="bg-[#0a0e14] p-3 rounded-lg flex items-center gap-3 border border-white/5">
                  <button
                    onClick={() => setIsPlayingVoice(!isPlayingVoice)}
                    className="w-8 h-8 rounded-full bg-[#00dbe9] text-[#00363a] flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0"
                  >
                    {isPlayingVoice ? <Pause size={14} /> : <Play size={14} fill="#00363a" />}
                  </button>
                  <div className="flex items-center gap-1 flex-1 h-6">
                    {[30, 60, 90, 45, 80, 40, 70, 85, 50, 30, 95, 60, 20].map((height, idx) => (
                      <span
                        key={idx}
                        className={`w-1 rounded-full transition-all ${
                          isPlayingVoice
                            ? idx % 2 === 0
                              ? 'bg-[#00dbe9] animate-pulse'
                              : 'bg-[#caf300]'
                            : idx < 6
                            ? 'bg-[#00dbe9]'
                            : 'bg-[#262a31]'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[11px] text-[#c5c9ac]">0:42</span>
                </div>
              </div>
            </div>

            {/* 3. Squad Video Form Check & Reactions (Sarah Chen) */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#262a31] flex items-center justify-center font-mono text-xs font-bold text-[#ffb599]">
                  SC
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-bold text-white">Sarah Chen</span>
                  <span className="font-mono text-[11px] text-[#c5c9ac]">07:05 AM</span>
                </div>
              </div>
              <div className="ml-11 bg-[#1c2026] rounded-xl p-4 max-w-xl flex flex-col gap-3 border border-white/5">
                <p className="font-sans text-xs text-[#dfe2eb]">
                  “@Coach Marcus Vance Form check on 310lb warmup single. Knee tracking felt much more stable with the cue to root the big toe:”
                </p>
                {/* Video Thumbnail with Telemetry */}
                <div className="relative rounded-lg overflow-hidden bg-[#0a0e14] border border-white/10">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAsQXma8FMeVFV4P__w4hj_QcvfkFi7lXWtrembbQEtjbCqFxv_dQI8mUohV0fMj0nYkBvNYPiws93VP7BKvJ-ePkb4ChCGCR5UioX0ZrB6dFVS55Cefy8F-CWLgAPhaYGK2IrMNriNoTuCKK6zS-ajh-_wYCfeJ5N6p-sfdN3oUJJLy-5f5oC2P4-eqy2vpKW6stIggg-QeB6HPuh5IjJ6scODf-RLqS0xLJ8pHc2NJHFVuFasjuh"
                    alt="Female athlete squat form check"
                    className="w-full h-48 object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14]/90 via-transparent to-transparent flex flex-col justify-between p-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-[#0a0e14]/80 font-mono text-[10px] text-[#caf300]">
                        VELOCITY: 0.68 m/s
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#ffb4ab]/20 text-[#ffb4ab] border border-[#ffb4ab]/30 font-sans text-[10px] uppercase font-bold">
                        FORM CHECK READY
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#1c2026]/90 text-white flex items-center justify-center backdrop-blur-md">
                          <Play size={14} fill="white" />
                        </div>
                        <span className="font-mono text-xs text-white">00:14 / 4K 60FPS</span>
                      </div>
                      <span className="font-mono text-[11px] text-[#c5c9ac]">DEPTH: OPTIMAL (104°)</span>
                    </div>
                  </div>
                </div>

                {/* Reactions */}
                <div className="flex items-center gap-2 pt-1 font-mono text-xs">
                  <button
                    onClick={() => toggleReaction('fire')}
                    className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                      localReactions.userReacted.fire
                        ? 'bg-[#caf300]/20 text-[#caf300] border border-[#caf300]/50'
                        : 'bg-[#262a31] text-white hover:bg-[#31353c]'
                    }`}
                  >
                    <span>🔥</span>
                    <span className="font-bold text-[#caf300]">{localReactions.fire}</span>
                  </button>
                  <button
                    onClick={() => toggleReaction('bolt')}
                    className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                      localReactions.userReacted.bolt
                        ? 'bg-[#00dbe9]/20 text-[#00dbe9] border border-[#00dbe9]/50'
                        : 'bg-[#262a31] text-white hover:bg-[#31353c]'
                    }`}
                  >
                    <span>⚡</span>
                    <span className="font-bold text-[#00dbe9]">{localReactions.bolt}</span>
                  </button>
                  <button
                    onClick={() => toggleReaction('bicep')}
                    className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                      localReactions.userReacted.bicep
                        ? 'bg-white/20 text-white border border-white/50'
                        : 'bg-[#262a31] text-white hover:bg-[#31353c]'
                    }`}
                  >
                    <span>💪</span>
                    <span className="font-bold text-white">{localReactions.bicep}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Render any additional dynamically transmitted messages */}
            {messages.slice(3).map(msg => (
              <div key={msg.id} className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#caf300] text-[#171e00] flex items-center justify-center font-mono text-xs font-bold">
                    ME
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm font-bold text-white">{msg.author}</span>
                    <span className="font-mono text-[11px] text-[#c5c9ac]">{msg.timestamp}</span>
                  </div>
                </div>
                <div className="ml-11 bg-[#1c2026] rounded-xl p-3 max-w-xl text-xs font-sans text-white border border-[#caf300]/30 shadow-md">
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* CHAT INPUT DOCK WITH TELEMETRY CONTROLS */}
          <div className="p-4 bg-[#1c2026] border-t border-white/5 flex flex-col gap-2 shadow-2xl">
            {/* Shortcuts */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[#c5c9ac] font-mono text-[11px]">
              <span className="uppercase text-[#c5c9ac]/70 text-[10px]">Shortcuts:</span>
              {['/log-set 315x5', '/check-depth', '@coach rpe-check'].map(cmd => (
                <button
                  key={cmd}
                  onClick={() => applyShortcut(cmd)}
                  className="px-2.5 py-0.5 rounded bg-[#262a31] hover:bg-[#31353c] hover:text-[#caf300] transition-colors whitespace-nowrap border border-white/5"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Input Field & Media buttons */}
            <div className="bg-[#0a0e14] rounded-xl p-2 flex items-center gap-2 border border-white/10">
              <div className="flex items-center gap-1 text-[#c5c9ac]">
                <button
                  onClick={() => applyShortcut('/attach-workout-log')}
                  className="p-1.5 hover:text-[#caf300] hover:bg-[#181c22] rounded transition-colors"
                  title="Attach Workout Log"
                >
                  <FileSpreadsheet size={18} />
                </button>
                <button
                  onClick={() => applyShortcut('/upload-form-video')}
                  className="p-1.5 hover:text-[#00dbe9] hover:bg-[#181c22] rounded transition-colors"
                  title="Upload Form Video"
                >
                  <Video size={18} />
                </button>
                <button
                  onClick={() => applyShortcut('/record-voice-note')}
                  className="p-1.5 hover:text-[#ffb599] hover:bg-[#181c22] rounded transition-colors"
                  title="Voice Note"
                >
                  <Mic size={18} />
                </button>
                <button
                  onClick={() => applyShortcut('@coach')}
                  className="px-2 py-1 hover:text-[#caf300] hover:bg-[#181c22] rounded transition-colors font-mono text-xs font-bold text-[#caf300]"
                  title="Tag Coach"
                >
                  @coach
                </button>
              </div>

              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleTransmit()}
                placeholder="Reply to squad or submit workout set log..."
                className="flex-1 bg-transparent text-white font-sans text-xs sm:text-sm placeholder:text-[#c5c9ac]/40 focus:outline-none px-2"
              />

              <button
                onClick={handleTransmit}
                className="px-4 py-2 bg-[#caf300] hover:bg-[#b0d500] text-[#171e00] font-display text-xs font-bold uppercase rounded-lg shadow-md flex items-center gap-1 active:scale-95 transition-all"
              >
                <span>Transmit</span>
                <Send size={13} />
              </button>
            </div>
          </div>
        </main>

        {/* RIGHT COLUMN: COACH PROFILE & PROGRAM SNAPSHOT (3 Cols) */}
        <aside className="xl:col-span-3 flex flex-col gap-4">
          {/* Coach Profile Card */}
          <div className="bg-[#181c22] rounded-xl p-5 border border-white/5 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[11px] font-bold uppercase text-[#c5c9ac]">Head Tactician</span>
              <span className="px-2 py-0.5 rounded bg-[#caf300]/20 text-[#caf300] font-mono text-[10px] font-bold border border-[#caf300]/30">
                VERIFIED CSCS
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxmF-JVzS5-A4zowWqsoL1L72BHDEpujDHQHu00br6sVwXI60zm1v3G62j0IN5TwaYxfz4QJfjLBcix5DaBGeWec1AOYTBINHx-C-2FkMWdKSvgl-mNlnBlG4-0E_YvkuAHxKd_CZE7cgDRnptt58nJnW2ZUDnrstUDjvQcP8e_0tpguxrZ2R09-_2TtXmViXId5LAbHUxWUuvMOYjEYdnCtrAa2JeLBXcBGCEVWYnM1VjzPUy6Vik"
                  alt="Coach Marcus Vance"
                  className="w-20 h-20 rounded-xl object-cover ring-2 ring-[#caf300]/50 shadow-xl"
                />
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 bg-[#caf300] text-[#171e00] font-sans text-[9px] font-bold uppercase rounded">
                  ACTIVE
                </span>
              </div>
              <h2 className="font-display text-lg font-bold text-white">Marcus Vance</h2>
              <span className="font-mono text-xs text-[#00dbe9] mt-0.5">Apex Master Strength Coach</span>
              <p className="font-sans text-xs text-[#c5c9ac] mt-2 text-center leading-relaxed">
                USAPL Elite Competitor • High-Performance Biomechanics Specialist • 12+ Yrs Coaching Apex Athletes
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="bg-[#1c2026] p-2.5 rounded-lg flex flex-col text-center border border-white/5">
                <span className="font-mono text-[10px] text-[#c5c9ac]">SQUAD PR RATE</span>
                <span className="font-mono text-base font-bold text-[#caf300]">+18.4%</span>
              </div>
              <div className="bg-[#1c2026] p-2.5 rounded-lg flex flex-col text-center border border-white/5">
                <span className="font-mono text-[10px] text-[#c5c9ac]">AVG RESPONSE</span>
                <span className="font-mono text-base font-bold text-[#00dbe9]">3 min</span>
              </div>
            </div>
          </div>

          {/* Pinned Directives */}
          <div className="bg-[#181c22] rounded-xl p-4 border border-white/5 shadow-xl flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Pin size={15} className="text-[#caf300]" />
                <span className="font-sans text-[11px] font-bold uppercase text-[#c5c9ac]">
                  Pinned Coach Directives
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#c5c9ac]">2 ACTIVE</span>
            </div>

            <div className="flex flex-col gap-2 mt-1">
              <div className="p-3 rounded-lg bg-[#1c2026] flex flex-col gap-1 border border-white/5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#caf300] font-bold">NUTRITION PROTOCOL</span>
                  <Lock size={12} className="text-[#c5c9ac]" />
                </div>
                <p className="font-sans text-xs text-white">
                  Target minimum 200g protein daily. Spread evenly across 4 discrete feeding windows.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#1c2026] flex flex-col gap-1 border border-white/5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#00dbe9] font-bold">PERIODIZATION</span>
                  <Repeat size={12} className="text-[#c5c9ac]" />
                </div>
                <p className="font-sans text-xs text-white">
                  Deload block officially initiates next Monday. Finish current microcycle with max intensity.
                </p>
              </div>
            </div>
          </div>

          {/* Today's Fueling Assignment Card */}
          <div className="bg-[#181c22] rounded-xl p-4 border border-white/5 shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#ffb599] text-[18px]">water_drop</span>
                <span className="font-sans text-[11px] font-bold uppercase text-[#c5c9ac]">
                  Fueling Assignment
                </span>
              </div>
              <span className="px-1.5 py-0.2 rounded bg-[#ffb599]/20 text-[#ffb599] font-mono text-[10px] font-bold">
                MANDATORY
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="p-2.5 rounded-lg bg-[#1c2026] flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-[#262a31] flex items-center justify-center text-[#caf300]">
                    <Bolt size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display text-xs font-bold text-white">Apex Glyco-Matrix</span>
                    <span className="font-mono text-[10px] text-[#c5c9ac]">50g during squat block</span>
                  </div>
                </div>
                <CheckCircle2 size={18} className="text-[#caf300]" />
              </div>

              <div className="p-2.5 rounded-lg bg-[#1c2026] flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-[#262a31] flex items-center justify-center text-[#00dbe9]">
                    <span className="material-symbols-outlined text-[18px]">medication_liquid</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display text-xs font-bold text-white">Apex Isolate</span>
                    <span className="font-mono text-[10px] text-[#c5c9ac]">30 min post-session window</span>
                  </div>
                </div>
                <Circle size={18} className="text-[#c5c9ac]" />
              </div>
            </div>

            <button
              onClick={onNavigateToNutrition}
              className="w-full mt-1 py-2 bg-[#262a31] hover:bg-[#31353c] text-white font-mono text-xs uppercase font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-white/5"
            >
              <span className="material-symbols-outlined text-[14px]">inventory_2</span>
              Re-order Intra/Post Formula
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
