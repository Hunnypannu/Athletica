import React, { useState } from 'react';
import { LeaderboardAthlete, ActivityFeedItem } from '../types';
import { 
  Users, Dumbbell, Gauge, Trophy, Award, Star, 
  MessageCircle, Send, ChevronDown, ChevronUp, UtensilsCrossed, ArrowRight, Check 
} from 'lucide-react';

interface SquadLeaderboardProps {
  athletes: LeaderboardAthlete[];
  activityFeed: ActivityFeedItem[];
  onAddActivityCheer: (content: string) => void;
  onNavigateToNutrition: () => void;
}

export const SquadLeaderboard: React.FC<SquadLeaderboardProps> = ({
  athletes,
  activityFeed,
  onAddActivityCheer,
  onNavigateToNutrition,
}) => {
  const [standingsMode, setStandingsMode] = useState<'weekly' | 'cumulative'>('weekly');
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [broadcastInput, setBroadcastInput] = useState('');
  const [feedItems, setFeedItems] = useState<ActivityFeedItem[]>(activityFeed);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleCheer = (feedId: string, type: 'fist' | 'fire' | 'bolt' | 'salute') => {
    setFeedItems(prev =>
      prev.map(item => {
        if (item.id !== feedId) return item;
        const userCheered = item.cheers.userCheered || {};
        const isActed = !!userCheered[type];
        const currentCount = item.cheers[type] || 0;
        return {
          ...item,
          cheers: {
            ...item.cheers,
            [type]: isActed ? currentCount - 1 : currentCount + 1,
            userCheered: {
              ...userCheered,
              [type]: !isActed,
            },
          },
        };
      })
    );
  };

  const handleBroadcast = () => {
    if (!broadcastInput.trim()) return;
    const newCheerItem: ActivityFeedItem = {
      id: `cheer-${Date.now()}`,
      author: 'David K.',
      isUser: true,
      initials: 'DK',
      timeAgo: 'Just now',
      source: 'Squad Comms',
      badge: 'BROADCAST',
      badgeColor: 'text-[#caf300]',
      title: 'Squad Motivational Broadcast',
      metrics: 'Tactical Uplink Committed',
      subtext: broadcastInput,
      cheers: {
        fist: 1,
        fire: 2,
        userCheered: { fire: true },
      },
      commentsCount: 0,
    };

    setFeedItems(prev => [newCheerItem, ...prev]);
    onAddActivityCheer(broadcastInput);
    setBroadcastInput('');
    setToastMessage('Tactical cheer broadcasted across squad terminals.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const rank1 = athletes.find(a => a.rank === 1);
  const rank2 = athletes.find(a => a.rank === 2);
  const rank3 = athletes.find(a => a.rank === 3);
  const remainingAthletes = showAllMembers ? athletes.slice(3) : athletes.slice(3, 8);

  return (
    <div className="w-full flex flex-col gap-6 pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#caf300] text-[#171e00] font-mono text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-[#caf300]">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sub-Header / League Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#1c2026] p-6 sm:p-8 border border-white/5 shadow-xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#caf300]/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#00dbe9]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-[#caf300]/15 text-[#caf300] font-sans text-[11px] font-bold tracking-widest uppercase border border-[#caf300]/30">
                Apex Division 01
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#caf300] animate-pulse" />
              <span className="font-mono text-xs text-[#c5c9ac] uppercase tracking-wider">
                Active Cycle • Week 4 of 6
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-white tracking-tight uppercase font-extrabold">
              Spring Hypertrophy League
            </h1>
            <p className="font-sans text-sm text-[#c5c9ac] leading-relaxed">
              Live telemetry synced across squad biometric nodes. High strain thresholds, volume aggregate ranking, and direct coach audits enabled.
            </p>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="grid grid-cols-3 gap-3 w-full xl:w-auto font-mono">
            <div className="bg-[#0a0e14] p-4 rounded-xl flex flex-col justify-center min-w-[130px] border border-white/5">
              <span className="text-[11px] text-[#c5c9ac] uppercase tracking-wider flex items-center gap-1.5">
                <Users size={14} className="text-[#00dbe9]" /> Squad Active
              </span>
              <span className="text-2xl text-white font-bold mt-1">
                14<span className="text-xs text-[#00dbe9] ml-1">/16</span>
              </span>
              <span className="text-[10px] text-[#c5c9ac] uppercase mt-1">92% In Zone</span>
            </div>

            <div className="bg-[#0a0e14] p-4 rounded-xl flex flex-col justify-center min-w-[130px] border border-white/5">
              <span className="text-[11px] text-[#c5c9ac] uppercase tracking-wider flex items-center gap-1.5">
                <Dumbbell size={14} className="text-[#caf300]" /> Sessions
              </span>
              <span className="text-2xl text-[#caf300] font-bold mt-1">184</span>
              <span className="text-[10px] text-[#c5c9ac] uppercase mt-1">+18% vs W3</span>
            </div>

            <div className="bg-[#0a0e14] p-4 rounded-xl flex flex-col justify-center min-w-[130px] border border-white/5">
              <span className="text-[11px] text-[#c5c9ac] uppercase tracking-wider flex items-center gap-1.5">
                <Gauge size={14} className="text-[#ffb599]" /> Team Vol
              </span>
              <span className="text-2xl text-white font-bold mt-1">
                412k<span className="text-xs text-[#c5c9ac] ml-0.5">lbs</span>
              </span>
              <span className="text-[10px] text-[#ffb599] uppercase mt-1">Target Pace</span>
            </div>
          </div>
        </div>
      </div>

      {/* Squad Milestone Banner: 50,000 Squat Reps */}
      <div className="relative bg-[#181c22] rounded-xl p-5 border border-white/5 shadow-md flex flex-col gap-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#caf300] text-[#171e00] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(202,243,0,0.35)]">
              <Trophy size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans text-[11px] font-bold text-[#caf300] uppercase tracking-wider">
                  Squad Objective Target
                </span>
                <span className="text-[#c5c9ac] font-mono text-xs">• March Strain</span>
              </div>
              <h2 className="font-display text-xl text-white tracking-tight font-bold">
                50,000 Squat Reps Squad Blitz
              </h2>
            </div>
          </div>

          <div className="flex items-baseline gap-2 md:self-end font-mono">
            <span className="text-2xl text-white font-bold">34,120</span>
            <span className="text-xs text-[#c5c9ac] uppercase">/ 50,000 Reps</span>
            <span className="text-lg text-[#caf300] ml-2 font-bold">68.2%</span>
          </div>
        </div>

        {/* Progress track */}
        <div className="w-full bg-[#0a0e14] h-3 rounded-lg overflow-hidden p-0.5 flex">
          <div
            className="h-full bg-gradient-to-r from-[#00dbe9] via-[#caf300] to-[#caf300] rounded-lg transition-all duration-1000 shadow-[0_0_12px_rgba(202,243,0,0.6)]"
            style={{ width: '68.2%' }}
          />
        </div>

        <div className="flex justify-between items-center font-mono text-xs text-[#c5c9ac]">
          <span>15,880 Reps to Unlock Apex Prototype Pre-Workout drop</span>
          <span className="text-[#caf300] flex items-center gap-1 font-bold">
            <span className="material-symbols-outlined text-[14px]">timer</span> 4d 18h remaining
          </span>
        </div>
      </div>

      {/* Main Split: Podium & Division Standings Table Left, Live Activity Feed Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Podium & Leaderboard Table (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Top 3 Podium Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end pt-6">
            {/* Rank 2: David K (You) */}
            {rank2 && (
              <div className="relative bg-[#262a31] rounded-xl p-4 flex flex-col items-center text-center order-2 sm:order-1 border border-white/5 shadow-xl hover:-translate-y-1 transition-transform">
                <div className="absolute -top-6 w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#c5c9ac] to-[#00dbe9]">
                  <img
                    src={rank2.avatarUrl}
                    alt={rank2.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <span className="px-2 py-0.5 mt-5 rounded-lg bg-[#1c2026] text-[#00dbe9] font-mono text-[10px] uppercase font-bold flex items-center gap-1">
                  <Award size={12} /> Rank 02 • YOU
                </span>
                <h3 className="font-display text-base font-bold text-white mt-1">{rank2.name}</h3>
                <span className="font-mono text-lg font-bold text-[#caf300] mt-0.5">
                  {rank2.points.toLocaleString()} <span className="text-[10px] text-[#c5c9ac]">PTS</span>
                </span>
                <div className="w-full bg-[#0a0e14] rounded-lg p-2.5 mt-3 space-y-1 text-left font-mono text-xs border border-white/5">
                  <div className="flex justify-between text-[#c5c9ac]">
                    <span>Streak</span>
                    <span className="text-white font-semibold">{rank2.streak}</span>
                  </div>
                  <div className="flex justify-between text-[#c5c9ac]">
                    <span>PRs Set</span>
                    <span className="text-[#00dbe9] font-semibold">{rank2.prsBroken} Broken</span>
                  </div>
                  <div className="flex justify-between text-[#c5c9ac]">
                    <span>Nutrition</span>
                    <span className="text-[#caf300] font-semibold">{rank2.nutritionLog}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Rank 1: Marcus V. (Coach / Elite) */}
            {rank1 && (
              <div className="relative bg-[#1c2026] rounded-xl p-5 flex flex-col items-center text-center order-1 sm:order-2 -mt-4 border border-[#caf300]/40 shadow-2xl shadow-[#caf300]/10">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#caf300] text-[#171e00] font-sans text-[10px] font-bold uppercase tracking-widest shadow-[0_0_12px_rgba(202,243,0,0.5)]">
                  Apex Leader
                </div>
                <div className="w-16 h-16 rounded-full p-1 bg-[#caf300] mt-3 shadow-[0_0_20px_rgba(202,243,0,0.4)]">
                  <img
                    src={rank1.avatarUrl}
                    alt={rank1.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <span className="px-2 py-0.5 mt-2 rounded-lg bg-[#caf300]/20 text-[#caf300] font-mono text-[10px] uppercase font-bold flex items-center gap-1 border border-[#caf300]/30">
                  <Trophy size={12} /> Coach / Elite
                </span>
                <h3 className="font-display text-lg font-bold text-white mt-1">{rank1.name}</h3>
                <span className="font-mono text-xl font-bold text-[#caf300] mt-0.5">
                  {rank1.points.toLocaleString()} <span className="text-[10px] text-[#c5c9ac]">PTS</span>
                </span>
                <div className="w-full bg-[#0a0e14] rounded-lg p-2.5 mt-3 space-y-1 text-left font-mono text-xs border border-white/5">
                  <div className="flex justify-between text-[#c5c9ac]">
                    <span>Streak</span>
                    <span className="text-[#caf300] font-semibold">{rank1.streak}</span>
                  </div>
                  <div className="flex justify-between text-[#c5c9ac]">
                    <span>Workouts</span>
                    <span className="text-white font-semibold">{rank1.sessions} Logged</span>
                  </div>
                  <div className="flex justify-between text-[#c5c9ac]">
                    <span>Compliance</span>
                    <span className="text-[#caf300] font-semibold">100% Track</span>
                  </div>
                </div>
              </div>
            )}

            {/* Rank 3: Elena R. */}
            {rank3 && (
              <div className="relative bg-[#262a31] rounded-xl p-4 flex flex-col items-center text-center order-3 sm:order-3 border border-white/5 shadow-xl hover:-translate-y-1 transition-transform">
                <div className="absolute -top-6 w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#c5c9ac] to-[#ffb599]">
                  <img
                    src={rank3.avatarUrl}
                    alt={rank3.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <span className="px-2 py-0.5 mt-5 rounded-lg bg-[#1c2026] text-[#ffb599] font-mono text-[10px] uppercase font-bold flex items-center gap-1">
                  <Star size={12} /> Rank 03 • Tier A
                </span>
                <h3 className="font-display text-base font-bold text-white mt-1">{rank3.name}</h3>
                <span className="font-mono text-lg font-bold text-[#00dbe9] mt-0.5">
                  {rank3.points.toLocaleString()} <span className="text-[10px] text-[#c5c9ac]">PTS</span>
                </span>
                <div className="w-full bg-[#0a0e14] rounded-lg p-2.5 mt-3 space-y-1 text-left font-mono text-xs border border-white/5">
                  <div className="flex justify-between text-[#c5c9ac]">
                    <span>Streak</span>
                    <span className="text-white font-semibold">{rank3.streak}</span>
                  </div>
                  <div className="flex justify-between text-[#c5c9ac]">
                    <span>Cardio Strain</span>
                    <span className="text-[#ffb599] font-semibold">{rank3.cardioStrain}</span>
                  </div>
                  <div className="flex justify-between text-[#c5c9ac]">
                    <span>Fuel Ratio</span>
                    <span className="text-white font-semibold">{rank3.fuelRatio}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Division Standings Table */}
          <div className="bg-[#181c22] rounded-xl overflow-hidden border border-white/5 shadow-xl">
            <div className="p-4 flex items-center justify-between bg-[#1c2026] border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#caf300] text-[20px]">table_rows</span>
                <h3 className="font-display text-base font-bold text-white uppercase">Division Standings</h3>
              </div>
              <div className="flex gap-1.5 font-mono text-xs">
                <button
                  onClick={() => setStandingsMode('weekly')}
                  className={`px-3 py-1 rounded-lg transition-colors font-semibold ${
                    standingsMode === 'weekly'
                      ? 'bg-[#262a31] text-[#caf300] border border-[#caf300]/30'
                      : 'text-[#c5c9ac] hover:text-white'
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setStandingsMode('cumulative')}
                  className={`px-3 py-1 rounded-lg transition-colors font-semibold ${
                    standingsMode === 'cumulative'
                      ? 'bg-[#262a31] text-[#caf300] border border-[#caf300]/30'
                      : 'text-[#c5c9ac] hover:text-white'
                  }`}
                >
                  Cumulative
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="bg-[#0a0e14] text-[#c5c9ac] uppercase text-[10px] tracking-wider border-b border-white/5">
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Athlete</th>
                    <th className="py-3 px-4">Telemetry Points</th>
                    <th className="py-3 px-4 hidden sm:table-cell">Completed</th>
                    <th className="py-3 px-4 hidden md:table-cell">Primary Fuel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {remainingAthletes.map(athlete => {
                    const rankStr = athlete.rank < 10 ? `0${athlete.rank}` : `${athlete.rank}`;
                    const barWidth = Math.max(40, (athlete.points / 18400) * 100);

                    return (
                      <tr key={athlete.rank} className="hover:bg-[#262a31]/50 transition-colors">
                        <td className="py-3 px-4 font-bold text-[#c5c9ac]">{rankStr}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#262a31] flex items-center justify-center text-white font-bold text-xs border border-white/5">
                              {athlete.initials}
                            </div>
                            <div>
                              <div className="font-display text-sm font-bold text-white">{athlete.name}</div>
                              <div className="text-[#c5c9ac] text-[11px]">{athlete.tag}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm font-bold text-white">{athlete.points.toLocaleString()}</div>
                          <div className="w-20 bg-[#0a0e14] h-1.5 rounded-full overflow-hidden mt-1">
                            <div className="bg-[#caf300] h-full" style={{ width: `${barWidth}%` }} />
                          </div>
                        </td>
                        <td className="py-3 px-4 hidden sm:table-cell">
                          <span className="text-white">{athlete.sessions} Sessions</span>
                          <div className="text-[10px] text-[#c5c9ac] uppercase">{athlete.volume}</div>
                        </td>
                        <td className="py-3 px-4 hidden md:table-cell">
                          <span className="px-2 py-0.5 rounded bg-[#0a0e14] text-[#00dbe9] border border-white/5 text-[11px]">
                            {athlete.primaryFuel}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-[#0a0e14] text-center border-t border-white/5">
              <button
                onClick={() => setShowAllMembers(!showAllMembers)}
                className="font-mono text-xs text-[#caf300] hover:underline uppercase tracking-wider flex items-center justify-center gap-1 mx-auto font-bold"
              >
                <span>{showAllMembers ? 'Collapse Squad Members' : 'View All 16 Squad Members'}</span>
                {showAllMembers ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Live Workout Activity Feed & Real-time Cheers (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#181c22] rounded-xl p-5 border border-white/5 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00dbe9] animate-ping" />
                <h3 className="font-display text-base font-bold text-white tracking-tight">
                  Live Squad Telemetry
                </h3>
              </div>
              <span className="font-mono text-xs text-[#caf300] bg-[#0a0e14] px-2.5 py-0.5 rounded border border-[#caf300]/30 font-semibold">
                STREAM ACTIVE
              </span>
            </div>

            {/* Feed Cards */}
            <div className="flex flex-col gap-3">
              {feedItems.map(item => (
                <div
                  key={item.id}
                  className="bg-[#1c2026] rounded-xl p-4 border border-white/5 transition-all hover:border-[#caf300]/30"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        {item.avatarUrl ? (
                          <img
                            src={item.avatarUrl}
                            alt={item.author}
                            className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-[#caf300] text-[#171e00] font-mono text-xs font-bold flex items-center justify-center">
                            {item.initials || 'AT'}
                          </div>
                        )}
                        {item.isUser && (
                          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#caf300] text-[#171e00] flex items-center justify-center text-[9px] font-bold">
                            ★
                          </span>
                        )}
                        {item.isCoach && (
                          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#caf300] text-[#171e00] flex items-center justify-center text-[9px] font-bold">
                            C
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-display text-sm font-bold text-white">{item.author}</span>
                          {item.isUser && (
                            <span className="px-1.5 py-0.2 rounded bg-[#caf300]/20 text-[#caf300] font-sans text-[9px] font-bold">
                              YOU
                            </span>
                          )}
                          {item.isCoach && (
                            <span className="px-1.5 py-0.2 rounded bg-[#caf300]/20 text-[#caf300] font-sans text-[9px] font-bold">
                              COACH
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[10px] text-[#c5c9ac]">
                          {item.timeAgo} • {item.source}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded font-sans text-[10px] uppercase font-bold bg-[#0a0e14] border border-white/5 ${
                        item.badgeColor || 'text-[#caf300]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <div className="mt-3 pl-3 border-l-2 border-[#caf300] bg-[#0a0e14]/60 p-2.5 rounded-r-lg">
                    <div className="font-display text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                      {item.title}
                    </div>
                    <div className="font-mono text-sm text-[#caf300] font-bold mt-0.5">
                      {item.metrics}
                    </div>
                    <div className="font-mono text-[11px] text-[#c5c9ac] mt-1">{item.subtext}</div>
                    {item.coachQuote && (
                      <div className="mt-1 font-mono text-[11px] text-[#caf300] italic">
                        {item.coachQuote}
                      </div>
                    )}
                    {item.fuelBadge && (
                      <div className="mt-2 flex items-center gap-1.5 px-2 py-1 rounded bg-[#00dbe9]/10 w-fit text-[#00dbe9] font-mono text-[11px]">
                        <span className="material-symbols-outlined text-[15px]">local_drink</span>
                        <span>{item.fuelBadge}</span>
                      </div>
                    )}
                  </div>

                  {/* Cheers Panel */}
                  <div className="mt-3 flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      {item.cheers.fist !== undefined && (
                        <button
                          onClick={() => toggleCheer(item.id, 'fist')}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                            item.cheers.userCheered?.fist
                              ? 'bg-[#caf300]/20 text-[#caf300] border border-[#caf300]/40'
                              : 'bg-[#0a0e14] hover:bg-[#262a31] text-white border border-white/5'
                          }`}
                        >
                          <span>👊</span>
                          <span className="font-bold">{item.cheers.fist}</span>
                        </button>
                      )}

                      {item.cheers.fire !== undefined && (
                        <button
                          onClick={() => toggleCheer(item.id, 'fire')}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                            item.cheers.userCheered?.fire
                              ? 'bg-[#ffb599]/20 text-[#ffb599] border border-[#ffb599]/40'
                              : 'bg-[#0a0e14] hover:bg-[#262a31] text-white border border-white/5'
                          }`}
                        >
                          <span>🔥</span>
                          <span className="font-bold">{item.cheers.fire}</span>
                        </button>
                      )}

                      {item.cheers.bolt !== undefined && (
                        <button
                          onClick={() => toggleCheer(item.id, 'bolt')}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                            item.cheers.userCheered?.bolt
                              ? 'bg-[#00dbe9]/20 text-[#00dbe9] border border-[#00dbe9]/40'
                              : 'bg-[#0a0e14] hover:bg-[#262a31] text-white border border-white/5'
                          }`}
                        >
                          <span>⚡</span>
                          <span className="font-bold">{item.cheers.bolt}</span>
                        </button>
                      )}
                    </div>

                    <span className="font-mono text-[11px] text-[#c5c9ac] flex items-center gap-1">
                      <MessageCircle size={13} /> {item.commentsCount} comments
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Cheer Dispatch Box */}
            <div className="bg-[#0a0e14] rounded-xl p-2 flex items-center gap-2 border border-white/10 mt-1">
              <input
                type="text"
                value={broadcastInput}
                onChange={e => setBroadcastInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleBroadcast()}
                placeholder="Broadcast cheer or tactical tip to squad..."
                className="flex-1 bg-transparent px-2 text-xs sm:text-sm text-white placeholder:text-[#c5c9ac]/40 focus:outline-none font-sans"
              />
              <button
                onClick={handleBroadcast}
                className="px-4 py-2 rounded-lg bg-[#caf300] hover:bg-[#b0d500] text-[#171e00] font-display text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-1 active:scale-95 shadow-md"
              >
                <span>Send</span>
                <Send size={13} />
              </button>
            </div>
          </div>

          {/* Squad Macro Target Average Teaser */}
          <div className="bg-[#181c22] rounded-xl p-4 border border-white/5 flex items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#262a31] text-[#00dbe9] flex items-center justify-center border border-white/5">
                <UtensilsCrossed size={20} />
              </div>
              <div>
                <div className="font-display text-sm font-bold text-white">Squad Macro Target Average</div>
                <div className="font-mono text-[11px] text-[#c5c9ac]">
                  Protein intake compliance at 94.6% today
                </div>
              </div>
            </div>
            <button
              onClick={onNavigateToNutrition}
              className="shrink-0 px-3 py-1.5 rounded-lg bg-[#262a31] hover:bg-[#31353c] text-[#caf300] font-mono text-xs uppercase font-bold transition-colors border border-[#caf300]/20 flex items-center gap-1"
            >
              <span>Apex Pantry</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
