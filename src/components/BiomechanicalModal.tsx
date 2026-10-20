import React, { useState } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Repeat, Check, FileText, Share2, Send, X, Sparkles } from 'lucide-react';

interface BiomechanicalModalProps {
  onClose: () => void;
  onSendReplyToCoach?: (reply: string) => void;
}

export const BiomechanicalModal: React.FC<BiomechanicalModalProps> = ({ onClose, onSendReplyToCoach }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [selectedRep, setSelectedRep] = useState<number>(4);
  const [coachReply, setCoachReply] = useState('');
  const [sentReplyMessage, setSentReplyMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const repMetrics: Record<number, { velocity: string; accel: string; rom: string; tilt: string; status: string; efficiency: string; time: string }> = {
    1: { velocity: '0.62', accel: '1.34', rom: '43.1', tilt: '0.8°', status: 'SMOOTH', efficiency: '100%', time: '00:01.20' },
    2: { velocity: '0.58', accel: '1.26', rom: '42.9', tilt: '0.9°', status: 'SMOOTH', efficiency: '98%', time: '00:02.85' },
    3: { velocity: '0.52', accel: '1.18', rom: '42.6', tilt: '1.4°', status: 'FLARE 2°', efficiency: '96%', time: '00:04.50' },
    4: { velocity: '0.44', accel: '1.12', rom: '42.8', tilt: '1.2°', status: 'PR BREAK', efficiency: '91%', time: '00:06.80' },
  };

  const currentRepData = repMetrics[selectedRep];

  const handleSendReply = () => {
    if (!coachReply.trim()) return;
    setSentReplyMessage(coachReply);
    if (onSendReplyToCoach) {
      onSendReplyToCoach(coachReply);
    }
    setCoachReply('');
    setToastMessage('Reply transmitted to Coach Marcus');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#0a0e14]/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-[1240px] bg-[#181c22] rounded-xl shadow-2xl border border-white/10 overflow-hidden flex flex-col my-auto max-h-[95vh]">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#caf300] text-[#171e00] font-mono text-xs font-bold px-4 py-2 rounded-lg shadow-xl flex items-center gap-2">
            <Check size={16} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#0a0e14]/90 border-b border-white/10">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#caf300] text-[#171e00] font-sans text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={12} /> AI BIOMECHANICAL TELEMETRY
              </span>
              <span className="px-2 py-0.5 rounded bg-[#262a31] text-[#caf300] font-mono text-[11px] font-semibold">
                SET 03 // 265 LBS (NEW PR)
              </span>
              <span className="font-mono text-[11px] text-[#c5c9ac] flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-[#00dbe9]">schedule</span> COMPLETED 07:44 AM
              </span>
            </div>
            <h2 className="text-lg font-bold text-white uppercase tracking-tight font-display">
              Barbell Bench Press — Velocity &amp; Bar-Path Analysis
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#00dbe9]/20 text-[#00dbe9] border border-[#00dbe9]/30 font-mono text-[11px] uppercase font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">videocam</span> 4K 120FPS SYNC
            </span>
            <button
              aria-label="Close modal"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#262a31] hover:bg-[#31353c] text-[#c5c9ac] hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 p-4 overflow-y-auto">
          {/* Left Column: Visual Video HUD + J-Curve Canvas */}
          <div className="xl:col-span-7 flex flex-col gap-3">
            <div className="relative w-full rounded-xl overflow-hidden bg-[#0a0e14] shadow-md flex items-center justify-center min-h-[360px] sm:min-h-[400px]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjz340HYXeuEVksMxtKB100S6X1QOvHrFi_TNnInfuiRR6GHS8Z1uCkx_y-CMvd8OYsIjcKK_KRhtOarjpCqQbUQPDFk6MFagbJn3FJTMW70DrvkT_FH9iHs2NXvqSk6yRlZ75-uLihTTTywB9E8h1S4iygIi-pAUtQMH6dV9N82nN9mSHYLN_TRXxC2ScZeH_lQl1h9aT4zTyHYh21LMOKCKFTJ4Nf9-SEyqdjk93aIII1rn_n6UU"
                alt="High-contrast barbell bench press execution frame"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14] via-transparent to-[#0a0e14]/60 pointer-events-none" />

              {/* Dynamic J-Curve Vector Overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 400" fill="none">
                <line stroke="rgba(202, 243, 0, 0.25)" strokeDasharray="4 4" strokeWidth="1" x1="290" x2="290" y1="80" y2="320" />
                <path
                  d="M 292 110 C 286 160, 275 220, 280 270 C 282 285, 290 295, 292 295 C 294 295, 300 270, 298 220 C 295 160, 292 110, 292 110 Z"
                  fill="rgba(202, 243, 0, 0.08)"
                />
                <path
                  d="M 292 110 Q 278 200 280 270 Q 284 295 292 295 Q 300 220 292 110"
                  stroke="#caf300"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
                <circle cx="292" cy="110" fill="#caf300" r="6" stroke="#10141a" strokeWidth="2" />
                <circle cx="280" cy="270" fill="#00dbe9" r="5" stroke="#10141a" strokeWidth="2" />
                <circle cx="292" cy="295" fill="#ffb599" r="6" stroke="#10141a" strokeWidth="2" />
                <circle cx="288" cy="210" fill="#caf300" r="5" stroke="#10141a" strokeWidth="2" />
                <text fill="#caf300" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold" x="306" y="114">
                  RACK LOCKOUT (0.0 cm)
                </text>
                <text fill="#ffb599" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold" x="306" y="298">
                  CHEST TOUCH (42.8 cm)
                </text>
                <text fill="#00dbe9" fontFamily="JetBrains Mono" fontSize="10" x="150" y="215">
                  STICKING POINT (18.2 cm) →
                </text>
                <circle cx="240" cy="240" fill="none" r="18" stroke="#00dbe9" strokeDasharray="3 3" strokeWidth="1.5" />
                <line stroke="#00dbe9" strokeWidth="2" x1="225" x2="240" y1="240" y2="240" />
                <line stroke="#00dbe9" strokeWidth="2" x1="240" x2="252" y1="240" y2="222" />
              </svg>

              {/* Corner HUD Tags */}
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                <div className="px-2 py-1 rounded bg-[#0a0e14]/85 backdrop-blur font-mono text-[10px] text-[#caf300] uppercase font-bold flex items-center gap-1.5 border border-[#caf300]/20">
                  <span className="w-2 h-2 rounded-full bg-[#caf300] animate-pulse" /> TELEMETRY HUD ACTIVE
                </div>
                <div className="px-2 py-1 rounded bg-[#0a0e14]/85 backdrop-blur font-mono text-[11px] text-[#00dbe9] flex items-center gap-1 border border-[#00dbe9]/20">
                  <span className="material-symbols-outlined text-[13px]">straighten</span> ELBOW: 86° | SHOULDER: 74°
                </div>
              </div>

              <div className="absolute top-3 right-3 flex flex-col gap-1 text-right">
                <div className="px-2 py-1 rounded bg-[#0a0e14]/85 backdrop-blur font-mono text-[10px] text-[#c5c9ac] uppercase border border-white/10">
                  OPTICAL TRACKER: <span className="text-white font-bold">CALIBRATED</span>
                </div>
                <div className="px-2 py-1 rounded bg-[#0a0e14]/85 backdrop-blur font-mono text-[11px] text-[#caf300] font-bold border border-[#caf300]/20">
                  J-CURVE DEVIATION: ±0.4cm
                </div>
              </div>

              {/* Bottom 4-metric strip */}
              <div className="absolute bottom-3 left-3 right-3 grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                <div className="bg-[#0a0e14]/90 backdrop-blur p-2 rounded-lg border border-white/5">
                  <span className="text-[10px] text-[#c5c9ac] block uppercase">Peak Velocity</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg text-white font-bold">{currentRepData.velocity}</span>
                    <span className="text-[10px] text-[#caf300]">m/s</span>
                  </div>
                </div>
                <div className="bg-[#0a0e14]/90 backdrop-blur p-2 rounded-lg border border-white/5">
                  <span className="text-[10px] text-[#c5c9ac] block uppercase">Acceleration</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg text-[#00dbe9] font-bold">{currentRepData.accel}</span>
                    <span className="text-[10px] text-[#00dbe9]">m/s²</span>
                  </div>
                </div>
                <div className="bg-[#0a0e14]/90 backdrop-blur p-2 rounded-lg border border-white/5">
                  <span className="text-[10px] text-[#c5c9ac] block uppercase">Vertical ROM</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg text-white font-bold">{currentRepData.rom}</span>
                    <span className="text-[10px] text-[#c5c9ac]">cm</span>
                  </div>
                </div>
                <div className="bg-[#0a0e14]/90 backdrop-blur p-2 rounded-lg border border-white/5">
                  <span className="text-[10px] text-[#c5c9ac] block uppercase">Tilt Deviation</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg text-[#caf300] font-bold">{currentRepData.tilt}</span>
                    <span className="text-[10px] text-[#caf300]">BALANCED</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Playback Controls & Rep Selector */}
            <div className="bg-[#1c2026] p-3 rounded-lg flex flex-col gap-2 border border-white/5">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-7 h-7 rounded bg-[#caf300] text-[#171e00] flex items-center justify-center font-bold hover:scale-105 transition-transform"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} fill="#171e00" />}
                  </button>
                  <button
                    onClick={() => setSelectedRep(Math.max(1, selectedRep - 1))}
                    className="p-1 text-[#c5c9ac] hover:text-white"
                    title="Previous rep"
                  >
                    <RotateCcw size={15} />
                  </button>
                  <button
                    onClick={() => setSelectedRep(Math.min(4, selectedRep + 1))}
                    className="p-1 text-[#c5c9ac] hover:text-white"
                    title="Next rep"
                  >
                    <RotateCw size={15} />
                  </button>
                  <span className="text-white font-semibold pl-1">
                    {currentRepData.time} / 00:06.80
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[#c5c9ac] uppercase text-[10px]">Speed:</span>
                  {[0.25, 0.5, 1.0].map(speed => (
                    <button
                      key={speed}
                      onClick={() => setPlaybackSpeed(speed)}
                      className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                        playbackSpeed === speed
                          ? 'bg-[#caf300] text-[#171e00] font-bold'
                          : 'bg-[#262a31] text-[#c5c9ac] hover:text-white'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                  <button className="p-1 rounded bg-[#262a31] text-[#caf300] ml-1" title="Loop playback">
                    <Repeat size={13} />
                  </button>
                </div>
              </div>

              {/* Progress Rail */}
              <div className="relative w-full bg-[#262a31] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#caf300] h-full rounded-full transition-all duration-300"
                  style={{ width: `${(selectedRep / 4) * 100}%` }}
                />
              </div>

              {/* Rep Cluster Buttons */}
              <div className="grid grid-cols-4 gap-2 font-mono text-[10px] mt-1">
                {[1, 2, 3, 4].map(rep => (
                  <button
                    key={rep}
                    onClick={() => setSelectedRep(rep)}
                    className={`py-1.5 px-1 rounded text-center transition-all flex items-center justify-center gap-1 ${
                      selectedRep === rep
                        ? 'bg-[#caf300]/20 text-[#caf300] font-bold border border-[#caf300]/40'
                        : 'bg-[#181c22] hover:bg-[#262a31] text-[#c5c9ac]'
                    }`}
                  >
                    {rep === 4 && <span className="material-symbols-outlined text-[12px]">bolt</span>}
                    REP {rep} ({repMetrics[rep].velocity}m/s)
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Kinematics Breakdown & Coach Directives */}
          <div className="xl:col-span-5 flex flex-col gap-3">
            {/* Rep-by-Rep Kinematics */}
            <div className="bg-[#1c2026] rounded-lg p-3.5 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-[13px] text-white uppercase font-bold tracking-tight flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#00dbe9] text-[16px]">speed</span> REP-BY-REP KINEMATICS
                </span>
                <span className="font-mono text-[10px] text-[#c5c9ac] uppercase">MEAN CONCENTRIC VELOCITY</span>
              </div>
              <div className="flex flex-col gap-1.5 font-mono text-[11px]">
                {[1, 2, 3, 4].map(rep => {
                  const isCurrent = selectedRep === rep;
                  const data = repMetrics[rep];
                  return (
                    <div
                      key={rep}
                      onClick={() => setSelectedRep(rep)}
                      className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                        isCurrent
                          ? 'bg-[#262a31] border border-[#caf300]/40'
                          : 'bg-[#181c22] hover:bg-[#262a31]'
                      }`}
                    >
                      <div>
                        <span className={`font-bold mr-2 ${isCurrent ? 'text-[#caf300]' : 'text-white'}`}>
                          REP {rep}
                        </span>
                        <span className={rep === 4 ? 'text-[#caf300] font-bold' : 'text-[#00dbe9] font-semibold'}>
                          {data.velocity} m/s
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#c5c9ac]">{data.efficiency} Efficiency</span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            rep === 4
                              ? 'bg-[#caf300] text-[#171e00]'
                              : rep === 3
                              ? 'bg-[#ffb599]/20 text-[#ffb599]'
                              : 'bg-[#262a31] text-[#caf300]'
                          }`}
                        >
                          {data.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Biomechanic Diagnostic */}
            <div className="bg-[#1c2026] rounded-lg p-3.5 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-[13px] text-white uppercase font-bold tracking-tight flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#caf300] text-[16px]">biotech</span> AI BIOMECHANIC DIAGNOSTIC
                </span>
                <span className="font-mono text-[10px] text-[#caf300] uppercase font-bold">96.4% OPTIMAL</span>
              </div>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-[#c5c9ac]">Bar Path Stability</span>
                  <span className="text-white font-semibold">96.4% (Optimal 'J-curve' descent)</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-[#c5c9ac]">Symmetry Index</span>
                  <span className="text-[#00dbe9] font-semibold">49.5% L / 50.5% R (Exceptional)</span>
                </div>
                <div className="flex items-baseline justify-between py-1">
                  <span className="text-[#c5c9ac]">Recommendation</span>
                  <span className="text-white text-right max-w-[240px] text-[12px] font-sans">
                    Maintain scapular retraction on transition off chest.
                  </span>
                </div>
              </div>
            </div>

            {/* Coach Marcus Vance Verified Directive */}
            <div className="bg-[#1c2026] rounded-lg p-3.5 border border-white/5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhAwIXc7k5vNtzCXknymmIpRm-W4HlhMz59rpUGV-JkqEsaTbOW8Zq2cobZ1Ha0dyNf1yo0hlDQEYLbT5IKkrIi6Gwy2nsiZ96e3QP4Kr7k_IqHcLOXBjTthGnFgMS8IsCYgCeE3Tm_YhOTSCBAIDsFeta2-p7eEsjGHl5lBKRpUR2JdjkQlJtkMQQBo1V-1k0D2EKxOaQxzTugpZbRag4MXYbfCLMREuyY-Kx5qpBD2DUHGJ-H5xM"
                    alt="Coach Marcus Vance"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-display text-[13px] text-white uppercase font-bold">Coach Marcus Vance</span>
                      <span className="material-symbols-outlined text-[#00dbe9] text-[14px]">verified</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#c5c9ac]">CSCS • HEAD BIOMECHANIST • 15m ago</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#caf300]/20 text-[#caf300] font-mono text-[10px] uppercase font-bold flex items-center gap-1">
                  <Check size={12} /> VERIFIED
                </span>
              </div>

              <p className="font-sans text-[12px] text-white bg-[#181c22] p-2.5 rounded italic border-l-2 border-[#caf300]">
                “Bar speed held solid through the sticking point at 265 lbs. Scapular lock was clean. Approved for 270 lbs in next microcycle.”
              </p>

              {sentReplyMessage && (
                <div className="bg-[#262a31] p-2 rounded text-[11px] font-mono text-[#caf300] flex items-center gap-2">
                  <Check size={12} />
                  <span>You replied: "{sentReplyMessage}"</span>
                </div>
              )}

              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={coachReply}
                  onChange={e => setCoachReply(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendReply()}
                  placeholder="Reply to Coach Marcus..."
                  className="flex-1 bg-[#181c22] text-white text-[12px] px-3 py-1.5 rounded outline-none border border-white/10 focus:border-[#caf300]"
                />
                <button
                  onClick={handleSendReply}
                  className="px-3 py-1.5 bg-[#262a31] hover:bg-[#31353c] text-white font-mono text-[11px] rounded transition-colors uppercase font-bold flex items-center gap-1"
                >
                  <Send size={12} /> Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#0a0e14]/90 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => triggerToast('Biomechanical PDF Report exported.')}
              className="px-3 py-1.5 bg-[#262a31] hover:bg-[#31353c] text-white font-mono text-[11px] uppercase rounded flex items-center gap-1.5 transition-colors"
            >
              <FileText size={14} /> Export Biomechanical PDF Report
            </button>
            <button
              onClick={() => triggerToast('Telemetry report shared with Alpha Squadron channel.')}
              className="px-3 py-1.5 bg-[#262a31] hover:bg-[#31353c] text-[#00dbe9] font-mono text-[11px] uppercase rounded flex items-center gap-1.5 transition-colors"
            >
              <Share2 size={14} /> Share Telemetry with Squad
            </button>
            <button
              onClick={() => triggerToast('120FPS clip forwarded directly to Coach Marcus.')}
              className="px-3 py-1.5 bg-[#262a31] hover:bg-[#31353c] text-[#c5c9ac] hover:text-white font-mono text-[11px] uppercase rounded flex items-center gap-1.5 transition-colors"
            >
              <Send size={14} /> Send Clip to Coach
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#caf300] hover:bg-[#b0d500] text-[#171e00] font-display text-[13px] uppercase font-bold tracking-wider rounded flex items-center gap-1.5 shadow-lg active:scale-95 transition-all"
          >
            <Check size={16} /> Save &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
