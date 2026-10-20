import React, { useState } from 'react';
import { 
  TrendingUp, Calendar, CheckCircle2, FileDown, 
  Sliders, PlusCircle, Video, Check, Flame, Award, Dumbbell, Clock, MessageSquare 
} from 'lucide-react';

interface WorkoutLogProps {
  onOpenBiomechanicalModal: () => void;
  onNavigateToNutrition: () => void;
}

export const WorkoutLog: React.FC<WorkoutLogProps> = ({
  onOpenBiomechanicalModal,
  onNavigateToNutrition,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(4); // Friday Today
  const [selectedSetRow, setSelectedSetRow] = useState<number>(2); // Set 3
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoggingNewSet, setIsLoggingNewSet] = useState<boolean>(false);

  const days = [
    { day: 'MON 20', title: 'Lower Posterior', subtitle: '11,400 lbs • 62m', status: 'completed' },
    { day: 'TUE 21', title: 'Zone 2 Aerobic', subtitle: '8.5 km • 45m', status: 'completed' },
    { day: 'WED 22', title: 'Quad / Calves', subtitle: '14,200 lbs • 70m', status: 'completed' },
    { day: 'THU 23', title: 'Active Rest', subtitle: 'Mobility • Cold Dip', status: 'recovery' },
    { day: 'TODAY 24', title: 'Heavy Upper Push', subtitle: '22,650 lbs • 75m', status: 'today' },
    { day: 'SAT 25', title: 'Posterior & Arms', subtitle: 'Target: 16k lbs', status: 'planned' },
    { day: 'SUN 26', title: 'Full Rest', subtitle: 'Sleep 9.0h Target', status: 'recovery' },
  ];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="w-full flex flex-col gap-8 pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#caf300] text-[#171e00] font-mono text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-[#caf300]">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Performance Telemetry Banner */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Stat 1: Weekly Volume */}
        <div className="bg-[#181c22] rounded-xl p-5 border border-white/5 shadow-md flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#caf300]/10 blur-xl" />
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-[#c5c9ac] uppercase tracking-wider">Weekly Volume</span>
            <span className="px-2 py-0.5 rounded bg-[#caf300]/20 text-[#caf300] font-mono text-[10px] uppercase font-bold flex items-center gap-1 border border-[#caf300]/30">
              <TrendingUp size={12} /> +12%
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-4xl text-white font-bold">48,250</span>
              <span className="font-mono text-sm text-[#caf300] uppercase font-semibold">lbs</span>
            </div>
            <p className="font-sans text-xs text-[#c5c9ac] mt-1">vs 43,080 lbs last cycle</p>
          </div>
          <div className="w-full bg-[#262a31] h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-[#caf300] h-full w-[84%] rounded-full shadow-[0_0_8px_rgba(202,243,0,0.5)]" />
          </div>
        </div>

        {/* Stat 2: Sessions Completed */}
        <div className="bg-[#181c22] rounded-xl p-5 border border-white/5 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-[#c5c9ac] uppercase tracking-wider">Microcycle Strain</span>
            <span className="px-2 py-0.5 rounded bg-[#262a31] text-[#00dbe9] font-mono text-[10px] uppercase font-bold">
              In-Phase
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-4xl text-white font-bold">4</span>
                <span className="font-mono text-2xl text-[#c5c9ac]">/</span>
                <span className="font-mono text-2xl text-[#c5c9ac]">5</span>
              </div>
              <p className="font-sans text-xs text-[#c5c9ac] mt-1">Sessions Executed</p>
            </div>
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="none" stroke="#262a31" strokeWidth="4" />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="#00dbe9"
                  strokeWidth="4"
                  strokeDasharray="125.6"
                  strokeDashoffset="25.1"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute font-mono text-xs font-bold text-white">80%</span>
            </div>
          </div>
          <div className="flex gap-1.5 mt-4">
            <span className="h-1.5 flex-1 rounded bg-[#00dbe9]" />
            <span className="h-1.5 flex-1 rounded bg-[#00dbe9]" />
            <span className="h-1.5 flex-1 rounded bg-[#00dbe9]" />
            <span className="h-1.5 flex-1 rounded bg-[#00dbe9]" />
            <span className="h-1.5 flex-1 rounded bg-[#262a31]" />
          </div>
        </div>

        {/* Stat 3: PRs Broken This Month */}
        <div className="bg-[#181c22] rounded-xl p-5 border border-white/5 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-[#c5c9ac] uppercase tracking-wider">Benchmark Surge</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#caf300] animate-ping" />
              <span className="font-mono text-[10px] text-[#caf300] uppercase font-bold">Apex Peak</span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-4xl text-white font-bold">03</span>
              <span className="font-mono text-xs text-[#c5c9ac] uppercase font-medium">New PRs</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="px-2 py-0.5 rounded bg-[#262a31] text-[#caf300] font-mono text-[11px] font-semibold border border-[#caf300]/20">
                DL 455#
              </span>
              <span className="px-2 py-0.5 rounded bg-[#262a31] text-[#caf300] font-mono text-[11px] font-semibold border border-[#caf300]/20">
                INC 275#
              </span>
              <span className="px-2 py-0.5 rounded bg-[#262a31] text-[#00dbe9] font-mono text-[11px] font-semibold border border-[#00dbe9]/20">
                +1 TODAY
              </span>
            </div>
          </div>
          <p className="font-sans text-xs text-[#c5c9ac] mt-2 truncate">Top PR index: 98.4th percentile</p>
        </div>

        {/* Stat 4: Daily Energy Delta */}
        <div className="bg-[#181c22] rounded-xl p-5 border border-white/5 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-[#c5c9ac] uppercase tracking-wider">Metabolic Differential</span>
            <span className="px-2 py-0.5 rounded bg-[#ffb599]/20 text-[#ffb599] font-mono text-[10px] uppercase font-bold">
              Surplus (+150)
            </span>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <div>
                <span className="font-mono text-2xl text-white font-bold">2,650</span>
                <span className="block font-mono text-[10px] text-[#c5c9ac] uppercase">Burned</span>
              </div>
              <span className="font-mono text-xs text-[#c5c9ac]">vs</span>
              <div className="text-right">
                <span className="font-mono text-2xl text-[#caf300] font-bold">2,800</span>
                <span className="block font-mono text-[10px] text-[#c5c9ac] uppercase">Ingested</span>
              </div>
            </div>
            <div className="w-full flex h-2 rounded-full bg-[#0a0e14] mt-3 overflow-hidden">
              <div className="bg-[#caf300] h-full" style={{ width: '52%' }} />
              <div className="bg-[#00dbe9] h-full" style={{ width: '32%' }} />
              <div className="bg-[#ffb599] h-full" style={{ width: '16%' }} />
            </div>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-[#c5c9ac] mt-2">
            <span className="text-[#caf300]">PRO: 210g</span>
            <span className="text-[#00dbe9]">CHO: 315g</span>
            <span className="text-[#ffb599]">FAT: 78g</span>
          </div>
        </div>
      </section>

      {/* Interactive Week Strip Section */}
      <section className="bg-[#181c22] rounded-xl p-4 sm:p-5 border border-white/5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-[#caf300]" />
            <h2 className="font-display text-lg uppercase tracking-tight text-white font-bold">
              Microcycle Schedule
            </h2>
            <span className="font-mono text-xs text-[#c5c9ac] pl-2 border-l border-white/10 hidden sm:inline">
              WK 42 • HYPERTROPHY-RPE 8.0
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#c5c9ac]">
            <span>OCT 20 - OCT 26</span>
          </div>
        </div>

        {/* 7-Day Day Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {days.map((d, index) => {
            const isToday = d.status === 'today';
            const isSelected = selectedDay === index;

            return (
              <div
                key={d.day}
                onClick={() => setSelectedDay(index)}
                className={`p-3 rounded-xl flex flex-col justify-between h-28 cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-[#262a31] border-[#caf300] shadow-lg shadow-[#caf300]/15'
                    : isToday
                    ? 'bg-[#1c2026] border-[#caf300]/40'
                    : 'bg-[#10141a] hover:bg-[#1c2026] border-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs uppercase font-bold ${isToday ? 'text-[#caf300]' : 'text-[#c5c9ac]'}`}>
                    {d.day}
                  </span>
                  {d.status === 'completed' && <CheckCircle2 size={16} className="text-[#caf300]" />}
                  {d.status === 'today' && (
                    <span className="font-mono text-[9px] bg-[#caf300] text-[#171e00] px-1.5 py-0.2 rounded font-bold">
                      DONE
                    </span>
                  )}
                  {d.status === 'recovery' && (
                    <span className="font-mono text-[9px] text-[#00dbe9] bg-[#00dbe9]/10 px-1 rounded">
                      REST
                    </span>
                  )}
                </div>

                <div>
                  <span className="font-display text-xs text-white block font-bold leading-tight">
                    {d.title}
                  </span>
                  <span className="font-mono text-[10px] text-[#c5c9ac] mt-0.5 block truncate">
                    {d.subtitle}
                  </span>
                </div>

                <div className={`h-1 rounded-full w-full ${isToday ? 'bg-[#caf300]' : 'bg-[#262a31]'}`} />
              </div>
            );
          })}
        </div>
      </section>

      {/* Global Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#181c22] p-4 rounded-xl border border-white/5 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#caf300] animate-pulse" />
          <span className="font-mono text-xs text-white font-semibold tracking-wider uppercase">
            SESSION COMPLETED • 07:30 AM • DATA COMMITTED
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => triggerToast('Workout session export compiled as CSV/PDF.')}
            className="px-3.5 py-2 bg-[#262a31] hover:bg-[#31353c] text-white font-mono text-xs uppercase rounded-lg flex items-center gap-1.5 border border-white/10 transition-colors"
          >
            <FileDown size={14} /> Export History
          </button>
          <button
            onClick={onOpenBiomechanicalModal}
            className="px-3.5 py-2 bg-[#262a31] hover:bg-[#31353c] text-[#00dbe9] font-mono text-xs uppercase rounded-lg flex items-center gap-1.5 border border-[#00dbe9]/30 transition-colors"
          >
            <Sliders size={14} /> 4K Biomechanical Modal
          </button>
          <button
            onClick={() => {
              setIsLoggingNewSet(!isLoggingNewSet);
              triggerToast('Active set logging drawer ready.');
            }}
            className="px-4 py-2 bg-[#caf300] hover:bg-[#b0d500] text-[#171e00] font-display text-xs uppercase tracking-wider font-bold rounded-lg flex items-center gap-1.5 shadow-md transition-transform active:scale-95"
          >
            <PlusCircle size={15} /> + Log New Set
          </button>
        </div>
      </div>

      {/* Detailed Workout Analysis Layout (Bento Split) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column: Exercises & Notes (8 cols) */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <div className="bg-[#181c22] p-6 rounded-xl border border-white/5 shadow-md">
            {/* Session Header Card */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-[#caf300] text-[#171e00] font-sans text-[10px] font-bold uppercase">
                    Hypertrophy Block
                  </span>
                  <span className="font-mono text-xs text-[#c5c9ac]">PHASE 2 • SESSION #28</span>
                </div>
                <h1 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-tight font-extrabold">
                  Upper Body Strength A
                </h1>
                <p className="font-sans text-xs text-[#c5c9ac] mt-1 flex items-center gap-1.5">
                  <Clock size={14} className="text-[#00dbe9]" /> Logged Today • 07:30 AM - 08:45 AM (75 min elapsed)
                </p>
              </div>

              <div className="flex items-center gap-4 bg-[#10141a] p-3 rounded-xl border border-white/5">
                <div className="text-right">
                  <span className="font-mono text-[10px] text-[#c5c9ac] uppercase block">Session Load</span>
                  <span className="font-mono text-2xl text-[#caf300] font-bold">22,650</span>
                  <span className="font-mono text-[10px] text-[#c5c9ac] ml-1">lbs</span>
                </div>
                <div className="h-8 w-[1px] bg-white/10" />
                <div className="text-right">
                  <span className="font-mono text-[10px] text-[#c5c9ac] uppercase block">Avg Heart Rate</span>
                  <span className="font-mono text-2xl text-[#00dbe9] font-bold">142</span>
                  <span className="font-mono text-[10px] text-[#c5c9ac] ml-1">bpm</span>
                </div>
              </div>
            </div>

            {/* Exercise 1: Barbell Bench Press (Detailed PR) */}
            <div className="bg-[#1c2026] rounded-xl p-4 sm:p-5 mt-6 border border-white/5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded bg-[#262a31] font-mono text-xs text-white flex items-center justify-center font-bold border border-white/10">
                    01
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-white uppercase tracking-tight font-bold">
                      Barbell Bench Press
                    </h3>
                    <span className="font-mono text-[11px] text-[#c5c9ac]">
                      Primary Push Mechanism • 3m Rest Protocol
                    </span>
                  </div>
                </div>

                <button
                  onClick={onOpenBiomechanicalModal}
                  className="px-3 py-1.5 rounded-lg bg-[#caf300] hover:bg-[#b0d500] text-[#171e00] font-mono text-xs uppercase font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <Award size={14} /> PR BROKEN: SET 3 (OPEN 4K HUD)
                </button>
              </div>

              {/* Set Matrix Table */}
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="text-[#c5c9ac] text-[11px] uppercase border-b border-white/10">
                      <th className="py-2.5 px-3">Set</th>
                      <th className="py-2.5 px-3">Previous</th>
                      <th className="py-2.5 px-3">Target</th>
                      <th className="py-2.5 px-3">Weight (lbs)</th>
                      <th className="py-2.5 px-3">Reps</th>
                      <th className="py-2.5 px-3">RPE</th>
                      <th className="py-2.5 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {/* Set 1 */}
                    <tr
                      onClick={() => setSelectedSetRow(0)}
                      className={`cursor-pointer transition-colors ${
                        selectedSetRow === 0 ? 'bg-[#262a31]' : 'hover:bg-[#181c22]'
                      }`}
                    >
                      <td className="py-3 px-3 font-semibold text-white">01</td>
                      <td className="py-3 px-3 text-[#c5c9ac]">225 x 8</td>
                      <td className="py-3 px-3 text-[#c5c9ac]">225 x 8</td>
                      <td className="py-3 px-3 font-bold text-white">225</td>
                      <td className="py-3 px-3 font-bold text-white">8</td>
                      <td className="py-3 px-3 text-[#c5c9ac]">7.5</td>
                      <td className="py-3 px-3 text-right">
                        <CheckCircle2 size={16} className="text-[#caf300] inline-block" />
                      </td>
                    </tr>

                    {/* Set 2 */}
                    <tr
                      onClick={() => setSelectedSetRow(1)}
                      className={`cursor-pointer transition-colors ${
                        selectedSetRow === 1 ? 'bg-[#262a31]' : 'hover:bg-[#181c22]'
                      }`}
                    >
                      <td className="py-3 px-3 font-semibold text-white">02</td>
                      <td className="py-3 px-3 text-[#c5c9ac]">245 x 5</td>
                      <td className="py-3 px-3 text-[#c5c9ac]">245 x 6</td>
                      <td className="py-3 px-3 font-bold text-white">245</td>
                      <td className="py-3 px-3 font-bold text-white">6</td>
                      <td className="py-3 px-3 text-[#c5c9ac]">8.0</td>
                      <td className="py-3 px-3 text-right">
                        <CheckCircle2 size={16} className="text-[#caf300] inline-block" />
                      </td>
                    </tr>

                    {/* Set 3: PR Trigger */}
                    <tr
                      onClick={() => {
                        setSelectedSetRow(2);
                        onOpenBiomechanicalModal();
                      }}
                      className="bg-[#caf300]/10 hover:bg-[#caf300]/15 cursor-pointer transition-colors border-l-2 border-[#caf300]"
                    >
                      <td className="py-3 px-3 font-bold text-[#caf300] flex items-center gap-1">
                        03 <span className="material-symbols-outlined text-[14px]">bolt</span>
                      </td>
                      <td className="py-3 px-3 text-[#c5c9ac]">255 x 3</td>
                      <td className="py-3 px-3 text-[#caf300]">265 x 3</td>
                      <td className="py-3 px-3 font-bold text-[#caf300] text-sm">265</td>
                      <td className="py-3 px-3 font-bold text-[#caf300] text-sm">4</td>
                      <td className="py-3 px-3 font-bold text-[#caf300]">9.5</td>
                      <td className="py-3 px-3 text-right">
                        <span className="px-2 py-0.5 rounded bg-[#caf300] text-[#171e00] font-sans text-[9px] uppercase font-bold tracking-wider">
                          NEW PR (TAP 4K)
                        </span>
                      </td>
                    </tr>

                    {/* Set 4 */}
                    <tr
                      onClick={() => setSelectedSetRow(3)}
                      className={`cursor-pointer transition-colors ${
                        selectedSetRow === 3 ? 'bg-[#262a31]' : 'hover:bg-[#181c22]'
                      }`}
                    >
                      <td className="py-3 px-3 font-semibold text-white">04</td>
                      <td className="py-3 px-3 text-[#c5c9ac]">225 x 7</td>
                      <td className="py-3 px-3 text-[#c5c9ac]">225 x 8</td>
                      <td className="py-3 px-3 font-bold text-white">225</td>
                      <td className="py-3 px-3 font-bold text-white">8</td>
                      <td className="py-3 px-3 text-[#c5c9ac]">8.5</td>
                      <td className="py-3 px-3 text-right">
                        <CheckCircle2 size={16} className="text-[#caf300] inline-block" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Exercise 2: Incline Dumbbell Press */}
            <div className="bg-[#1c2026] rounded-xl p-4 sm:p-5 mt-4 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded bg-[#262a31] font-mono text-xs text-white flex items-center justify-center font-bold">
                    02
                  </span>
                  <div>
                    <h3 className="font-display text-base text-white uppercase tracking-tight font-bold">
                      Incline Dumbbell Press
                    </h3>
                    <span className="font-mono text-[11px] text-[#c5c9ac]">
                      30 Degree Angle • Controlled Eccentric (3s)
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#00dbe9] font-semibold">
                  3 SETS • 10 REPS @ 85 LBS
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                <div className="bg-[#181c22] p-2.5 rounded-lg border border-white/5">
                  <span className="text-[#c5c9ac] text-[10px] block uppercase">Set 1</span>
                  <span className="text-white font-bold text-sm">85# × 10</span>
                  <span className="text-[#c5c9ac] text-[10px] block mt-0.5">RPE 8</span>
                </div>
                <div className="bg-[#181c22] p-2.5 rounded-lg border border-white/5">
                  <span className="text-[#c5c9ac] text-[10px] block uppercase">Set 2</span>
                  <span className="text-white font-bold text-sm">85# × 10</span>
                  <span className="text-[#c5c9ac] text-[10px] block mt-0.5">RPE 8.5</span>
                </div>
                <div className="bg-[#181c22] p-2.5 rounded-lg border border-white/5">
                  <span className="text-[#c5c9ac] text-[10px] block uppercase">Set 3</span>
                  <span className="text-white font-bold text-sm">85# × 10</span>
                  <span className="text-[#c5c9ac] text-[10px] block mt-0.5">RPE 9</span>
                </div>
              </div>
            </div>

            {/* Exercise 3: Weighted Dips */}
            <div className="bg-[#1c2026] rounded-xl p-4 sm:p-5 mt-4 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded bg-[#262a31] font-mono text-xs text-white flex items-center justify-center font-bold">
                    03
                  </span>
                  <div>
                    <h3 className="font-display text-base text-white uppercase tracking-tight font-bold">
                      Weighted Triceps Dips
                    </h3>
                    <span className="font-mono text-[11px] text-[#c5c9ac]">
                      Full Lockout • Neutral Grip Parallel Bars
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#00dbe9] font-semibold">
                  3 SETS • 12 REPS @ +45 LBS
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                <div className="bg-[#181c22] p-2.5 rounded-lg border border-white/5">
                  <span className="text-[#c5c9ac] text-[10px] block uppercase">Set 1</span>
                  <span className="text-white font-bold text-sm">+45# × 12</span>
                  <span className="text-[#c5c9ac] text-[10px] block mt-0.5">RPE 7.5</span>
                </div>
                <div className="bg-[#181c22] p-2.5 rounded-lg border border-white/5">
                  <span className="text-[#c5c9ac] text-[10px] block uppercase">Set 2</span>
                  <span className="text-white font-bold text-sm">+45# × 12</span>
                  <span className="text-[#c5c9ac] text-[10px] block mt-0.5">RPE 8</span>
                </div>
                <div className="bg-[#181c22] p-2.5 rounded-lg border border-white/5">
                  <span className="text-[#c5c9ac] text-[10px] block uppercase">Set 3</span>
                  <span className="text-white font-bold text-sm">+45# × 12</span>
                  <span className="text-[#c5c9ac] text-[10px] block mt-0.5">RPE 8.5</span>
                </div>
              </div>
            </div>

            {/* Exercise 4: Cable Lateral Raises */}
            <div className="bg-[#1c2026] rounded-xl p-4 sm:p-5 mt-4 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded bg-[#262a31] font-mono text-xs text-white flex items-center justify-center font-bold">
                    04
                  </span>
                  <div>
                    <h3 className="font-display text-base text-white uppercase tracking-tight font-bold">
                      Cable Lateral Raises
                    </h3>
                    <span className="font-mono text-[11px] text-[#c5c9ac]">
                      Cuff Attachment • 4 Sets x 15 Reps (Drop Set Final)
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#ffb599] font-semibold">FINISHER INTENSITY</span>
              </div>
              <div className="flex flex-wrap items-center justify-between bg-[#181c22] p-3 rounded-lg border border-white/5 gap-2">
                <span className="font-mono text-xs text-[#c5c9ac]">4 Consecutive Clusters Completed</span>
                <div className="flex items-center gap-2 font-mono text-xs text-white">
                  <span className="px-2 py-0.5 bg-[#262a31] rounded">25 lbs × 15</span>
                  <span>→</span>
                  <span className="px-2 py-0.5 bg-[#262a31] rounded">20 lbs × 15</span>
                  <span>→</span>
                  <span className="px-2 py-0.5 bg-[#262a31] rounded">15 lbs × 15</span>
                </div>
              </div>
            </div>
          </div>

          {/* Athlete Logged Notes & Qualitative Debrief */}
          <div className="bg-[#181c22] p-6 rounded-xl border border-white/5 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[#caf300] text-[20px]">edit_note</span>
              <h2 className="font-display text-base uppercase text-white font-bold">Athlete Session Notes</h2>
            </div>
            <div className="bg-[#1c2026] p-4 rounded-xl border border-white/5">
              <p className="font-sans text-sm text-[#dfe2eb] italic leading-relaxed">
                “Felt explosive on set 3 of bench, pre-workout nutrition definitely helped maintain shoulder stability and high rate of force development throughout the drop sets.”
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-white/10 text-[#c5c9ac] font-mono text-xs">
                <span>CNS RECOVERY: 92%</span>
                <span>REST PER SET: 180s</span>
                <span>BAR SPEED: 0.68 m/s</span>
                <span className="text-[#caf300] font-bold">RPE ACROSS: 8.2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Telemetry, Nutrient Pairing, Load Curve (4 cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Performance Photo / Video Launcher */}
          <div
            onClick={onOpenBiomechanicalModal}
            className="relative rounded-xl overflow-hidden shadow-xl h-56 bg-[#181c22] border border-white/10 cursor-pointer group"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjz340HYXeuEVksMxtKB100S6X1QOvHrFi_TNnInfuiRR6GHS8Z1uCkx_y-CMvd8OYsIjcKK_KRhtOarjpCqQbUQPDFk6MFagbJn3FJTMW70DrvkT_FH9iHs2NXvqSk6yRlZ75-uLihTTTywB9E8h1S4iygIi-pAUtQMH6dV9N82nN9mSHYLN_TRXxC2ScZeH_lQl1h9aT4zTyHYh21LMOKCKFTJ4Nf9-SEyqdjk93aIII1rn_n6UU"
              alt="Barbell bench press execution"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14] via-[#0a0e14]/40 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div>
                <span className="font-sans text-[10px] text-[#caf300] uppercase tracking-wider block font-bold">
                  Bio-Telemetry Stream
                </span>
                <span className="font-display text-sm text-white font-bold">
                  Apex Barbell Tracking Unit #04
                </span>
              </div>
              <span className="p-2 rounded-full bg-[#caf300] text-[#171e00] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Video size={16} />
              </span>
            </div>
          </div>

          {/* Integrated Nutrition Stack Sync Card */}
          <div className="bg-[#181c22] p-5 rounded-xl border border-white/5 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00dbe9] text-[20px]">nutrition</span>
                <h2 className="font-display text-base uppercase text-white font-bold">Nutrient Pairing</h2>
              </div>
              <span className="font-mono text-[10px] text-[#caf300] bg-[#caf300]/15 px-2 py-0.5 rounded uppercase font-bold border border-[#caf300]/30">
                Live Synced
              </span>
            </div>

            <div className="space-y-3">
              {/* Pre-workout */}
              <div className="bg-[#1c2026] p-3 rounded-lg border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs text-[#00dbe9] uppercase font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">bolt</span> Pre-Session (T-30m)
                  </span>
                  <span className="font-mono text-xs text-[#c5c9ac]">320 kcal</span>
                </div>
                <p className="font-sans text-xs text-white font-medium">1 scoop Pre-Ignite V2 + 1 medium banana</p>
                <div className="flex items-center gap-3 mt-2 font-mono text-[11px] text-[#c5c9ac]">
                  <span>CHO: 28g</span>
                  <span>NITRATES: 400mg</span>
                  <span>CAFFEINE: 200mg</span>
                </div>
              </div>

              {/* Post-workout */}
              <div className="bg-[#1c2026] p-3 rounded-lg border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs text-[#caf300] uppercase font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">autorenew</span> Post-Session (T+15m)
                  </span>
                  <span className="font-mono text-xs text-[#c5c9ac]">280 kcal</span>
                </div>
                <p className="font-sans text-xs text-white font-medium">1.5 scoops Apex Nitro Isolate</p>
                <div className="flex items-center gap-3 mt-2 font-mono text-[11px] text-[#c5c9ac]">
                  <span className="text-[#caf300] font-bold">PROTEIN: 42g</span>
                  <span>BCAA: 8.4g</span>
                  <span>LEUCINE: 4.2g</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10">
              <div className="flex justify-between items-center mb-1.5 font-mono text-xs">
                <span className="text-[#c5c9ac] uppercase">Daily Protein Target</span>
                <span className="text-white font-bold">174g / 210g (82%)</span>
              </div>
              <div className="w-full bg-[#262a31] h-2 rounded-full overflow-hidden">
                <div className="bg-[#caf300] h-full rounded-full" style={{ width: '82%' }} />
              </div>
            </div>

            <button
              onClick={onNavigateToNutrition}
              className="w-full mt-4 py-2 bg-[#262a31] hover:bg-[#31353c] text-[#caf300] font-mono text-xs uppercase font-bold rounded-lg transition-colors flex items-center justify-center gap-1 border border-[#caf300]/20"
            >
              Order Additional Post-Workout Isolates →
            </button>
          </div>

          {/* Real-time Load Curve Progression SVG Sparkline */}
          <div className="bg-[#181c22] p-5 rounded-xl border border-white/5 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs text-[#c5c9ac] uppercase">Load Curve Progression</span>
                <span className="font-mono text-[11px] text-[#00dbe9] font-bold">4-WEEK TREND</span>
              </div>
              <h3 className="font-display text-base text-white uppercase font-bold">
                Bench Press Est. 1RM
              </h3>
            </div>

            {/* Sparkline Curve */}
            <div className="py-4">
              <svg className="w-full h-24 overflow-visible" viewBox="0 0 320 80">
                <line stroke="#262a31" strokeDasharray="3 3" x1="0" x2="320" y1="20" y2="20" />
                <line stroke="#262a31" strokeDasharray="3 3" x1="0" x2="320" y1="50" y2="50" />
                <path d="M 0 70 L 60 62 L 120 54 L 180 48 L 240 38 L 320 18 L 320 80 L 0 80 Z" fill="rgba(202, 243, 0, 0.1)" />
                <path d="M 0 70 L 60 62 L 120 54 L 180 48 L 240 38 L 320 18" fill="none" stroke="#caf300" strokeWidth="3" />
                <circle cx="0" cy="70" r="3.5" fill="#10141a" stroke="#caf300" strokeWidth="2" />
                <circle cx="60" cy="62" r="3.5" fill="#10141a" stroke="#caf300" strokeWidth="2" />
                <circle cx="120" cy="54" r="3.5" fill="#10141a" stroke="#caf300" strokeWidth="2" />
                <circle cx="180" cy="48" r="3.5" fill="#10141a" stroke="#caf300" strokeWidth="2" />
                <circle cx="240" cy="38" r="3.5" fill="#10141a" stroke="#caf300" strokeWidth="2" />
                <circle cx="320" cy="18" r="5" fill="#caf300" stroke="#10141a" strokeWidth="2" />
              </svg>
              <div className="flex justify-between font-mono text-[11px] text-[#c5c9ac] mt-2">
                <span>WK 1: 275#</span>
                <span>WK 2: 280#</span>
                <span>WK 3: 285#</span>
                <span className="text-[#caf300] font-bold">WK 4: 298#</span>
              </div>
            </div>

            <div className="bg-[#1c2026] p-2.5 rounded-lg flex items-center justify-between text-xs font-mono border border-white/5">
              <span className="text-[#c5c9ac] uppercase">Neural Readiness Score</span>
              <span className="text-[#00dbe9] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">network_check</span> 9.6 / 10.0
              </span>
            </div>
          </div>

          {/* Coach Validation Badge */}
          <div className="bg-[#181c22] p-4 rounded-xl border border-white/5 shadow-md flex items-center gap-3">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhAwIXc7k5vNtzCXknymmIpRm-W4HlhMz59rpUGV-JkqEsaTbOW8Zq2cobZ1Ha0dyNf1yo0hlDQEYLbT5IKkrIi6Gwy2nsiZ96e3QP4Kr7k_IqHcLOXBjTthGnFgMS8IsCYgCeE3Tm_YhOTSCBAIDsFeta2-p7eEsjGHl5lBKRpUR2JdjkQlJtkMQQBo1V-1k0D2EKxOaQxzTugpZbRag4MXYbfCLMREuyY-Kx5qpBD2DUHGJ-H5xM"
              alt="Coach Marcus Vance"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#caf300]/40"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-display text-sm text-white truncate uppercase font-bold">
                  Coach Marcus Vance
                </span>
                <span className="material-symbols-outlined text-[#00dbe9] text-[16px]">verified</span>
              </div>
              <p className="font-sans text-xs text-[#c5c9ac] truncate">Reviewed • Approved 1RM progression</p>
            </div>
            <button
              onClick={onOpenBiomechanicalModal}
              className="p-2 bg-[#262a31] hover:bg-[#31353c] rounded text-white transition-colors"
              title="Open Coach Biomechanics Dialog"
            >
              <MessageSquare size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
