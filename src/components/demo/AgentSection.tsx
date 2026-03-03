"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, PhoneIncoming, Clock, Users, ShoppingBag, PhoneOff, Volume2, Plus, CheckCircle2 } from "lucide-react";
import { useModuleSelection } from "@/context/ModuleSelectionContext";
import Container from "@/components/ui/Container";
import { CALL_TRANSCRIPT, CALL_STATS, type CallTranscriptLine } from "@/lib/demo-data";

/* ─── Audio waveform bars ─── */
function WaveformBars({ active, color = "emerald" }: { active: boolean; color?: string }) {
  const barCount = 24;
  const bgClass = color === "emerald" ? "bg-emerald-400" : "bg-slate-300";
  return (
    <div className="flex items-center justify-center gap-[2px] h-10">
      {[...Array(barCount)].map((_, i) => (
        <div
          key={i}
          className={`w-[2.5px] rounded-full transition-all ${active ? bgClass : "bg-slate-200"}`}
          style={{
            height: active ? `${6 + Math.random() * 28}px` : "4px",
            animation: active ? `waveBar 0.6s ease-in-out ${i * 0.03}s infinite alternate` : "none",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Phone call UI ─── */
function CallMockup({
  lines,
  isRinging,
  isActive,
  callDuration,
  currentSpeaker,
}: {
  lines: CallTranscriptLine[];
  isRinging: boolean;
  isActive: boolean;
  callDuration: number;
  currentSpeaker: "agent" | "client" | null;
}) {
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = subtitleRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const lastLine = lines.length > 0 ? lines[lines.length - 1] : null;
  const callEnded = !isRinging && !isActive && lines.length === CALL_TRANSCRIPT.length;

  return (
    <div className="relative mx-auto" style={{ width: 320, maxWidth: "90vw" }}>
      <div className="relative bg-slate-900 rounded-3xl shadow-xl shadow-black/15 overflow-hidden">
        {/* ─── Ringing state ─── */}
        {isRinging && (
          <div className="flex flex-col items-center justify-center py-14 px-6 gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <PhoneIncoming className="w-9 h-9 text-emerald-400" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-ping" style={{ animationDuration: "1.5s" }} />
              <div className="absolute -inset-3 rounded-full border border-emerald-400/15 animate-ping" style={{ animationDuration: "2s" }} />
            </div>
            <div className="text-center">
              <p className="text-white font-semibold text-base">Appel entrant</p>
              <p className="text-slate-400 text-sm mt-1">+33 6 12 34 56 78</p>
            </div>
            <div className="flex items-center gap-6 mt-2">
              <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center">
                <PhoneOff className="w-6 h-6 text-red-400" />
              </div>
              <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center animate-pulse">
                <Phone className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-emerald-400 text-xs font-medium animate-pulse">L&apos;agent IA décroche...</p>
          </div>
        )}

        {/* ─── Active call / ended call ─── */}
        {!isRinging && (
          <div className="flex flex-col" style={{ height: 420 }}>
            {/* Top: call info */}
            <div className="text-center pt-6 pb-4 px-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                <Phone className="w-7 h-7 text-emerald-400" />
              </div>
              <p className="text-white font-semibold text-base">Agent IA — Fresh Bowl</p>
              <p className={`text-sm mt-1 ${isActive ? "text-emerald-400" : "text-slate-500"}`}>
                {isActive ? formatTime(callDuration) : `Appel terminé · ${CALL_STATS.duration}`}
              </p>
            </div>

            {/* Waveform */}
            <div className="px-8 py-3">
              <WaveformBars active={isActive && currentSpeaker !== null} />
              {isActive && currentSpeaker && (
                <p className="text-center text-[10px] text-slate-500 mt-1.5 font-medium">
                  {currentSpeaker === "agent" ? "🤖 Agent IA parle..." : "🎤 Client parle..."}
                </p>
              )}
            </div>

            {/* Live subtitle area */}
            <div ref={subtitleRef} className="flex-1 overflow-hidden px-5 pb-3">
              <div className="space-y-2">
                {lines.map((line) => (
                  <div
                    key={line.id}
                    className="animate-[fadeSlideUp_0.3s_ease-out]"
                  >
                    <div className={`rounded-xl px-3 py-2 ${
                      line.speaker === "agent"
                        ? "bg-emerald-500/10 border border-emerald-500/20"
                        : "bg-white/5 border border-white/10"
                    }`}>
                      <span className={`text-[10px] font-bold block mb-0.5 ${
                        line.speaker === "agent" ? "text-emerald-400" : "text-slate-400"
                      }`}>
                        {line.speaker === "agent" ? "🤖 Agent IA" : "👤 Client"}
                      </span>
                      <p className={`text-[12px] leading-relaxed ${
                        line.speaker === "agent" ? "text-emerald-100" : "text-slate-300"
                      }`}>
                        {line.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call summary */}
              {callEnded && (
                <div className="animate-[fadeSlideUp_0.4s_ease-out] mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                  <p className="text-[11px] font-bold text-emerald-400 mb-2">📋 Résumé de l&apos;appel</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-emerald-500" />
                      <span className="text-[10px] text-slate-400">{CALL_STATS.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3 h-3 text-emerald-500" />
                      <span className="text-[10px] text-slate-400">{CALL_STATS.couverts} couverts</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-emerald-500" />
                      <span className="text-[10px] text-slate-400">{CALL_STATS.reservation}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShoppingBag className="w-3 h-3 text-emerald-500" />
                      <span className="text-[10px] text-slate-400">{CALL_STATS.preCommande}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom: call controls */}
            {isActive && (
              <div className="px-6 pb-5 pt-2 flex items-center justify-center gap-5">
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-white" />
                </div>
                <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center">
                  <PhoneOff className="w-6 h-6 text-white" />
                </div>
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">HP</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes waveBar {
          0% { height: 4px; }
          100% { height: 28px; }
        }
      `}</style>
    </div>
  );
}

export default function AgentSection() {
  const { addModule, selectedModules } = useModuleSelection();
  const isModuleSelected = selectedModules.includes(2);
  const [visibleLines, setVisibleLines] = useState<CallTranscriptLine[]>([]);
  const [isRinging, setIsRinging] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [currentSpeaker, setCurrentSpeaker] = useState<"agent" | "client" | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (hasPlayed) return;
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          setHasPlayed(true);
          observer.disconnect();
          playSequence();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPlayed]);

  // Call duration timer
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setCallDuration((d) => d + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  function playSequence() {
    // Ring for 2s
    setTimeout(() => {
      setIsRinging(false);
      setIsActive(true);
    }, 2000);

    // Play transcript lines with speaker tracking
    let delay = 2500;
    CALL_TRANSCRIPT.forEach((line, i) => {
      const speakTime = line.speaker === "agent" ? 1400 : 1000;
      delay += speakTime;
      const d = delay;
      // Set current speaker slightly before the line appears
      setTimeout(() => {
        setCurrentSpeaker(line.speaker);
      }, d - speakTime + 200);
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, CALL_TRANSCRIPT[i]]);
      }, d);
    });

    // End call
    setTimeout(() => {
      setIsActive(false);
      setCurrentSpeaker(null);
      if (timerRef.current) clearInterval(timerRef.current);
    }, delay + 1500);
  }

  return (
    <section id="step-agent" ref={sectionRef} className="relative py-10 sm:py-16 bg-white overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center overflow-hidden">
          {/* Text side */}
          <div className="reveal-right lg:order-last min-w-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-500 text-white text-sm sm:text-base font-bold shrink-0">2</span>
              Agent Réceptionniste IA
            </h2>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mt-3 mb-1 max-w-full flex-wrap">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-700">Ou il appelle, et l&apos;IA répond</span>
            </div>

            <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
              L&apos;agent IA décroche en <strong className="text-text font-semibold">moins de 2 secondes</strong>,
              prend réservation et pré-commande — <strong className="text-text font-semibold">disponible 24h/24</strong>.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: PhoneIncoming, text: "Décroche en moins de 2 secondes, jour et nuit" },
                { icon: Users, text: "Réservations, commandes et infos pratiques" },
                { icon: Clock, text: "500 min incluses, 0.18€/min au-delà" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 shrink-0">
                      <Icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-sm text-text-secondary font-medium">{item.text}</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => addModule(2)}
              className={`inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                isModuleSelected
                  ? "bg-green-50 border border-green-300 text-green-700"
                  : "bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300"
              }`}
            >
              {isModuleSelected ? (
                <><CheckCircle2 className="w-4 h-4" /> Module ajouté</>
              ) : (
                <><Plus className="w-4 h-4" /> Ajouter ce module</>
              )}
            </button>
          </div>

          {/* Call mockup */}
          <div className="reveal-left lg:order-first flex justify-center">
            <CallMockup
              lines={visibleLines}
              isRinging={isRinging}
              isActive={isActive}
              callDuration={callDuration}
              currentSpeaker={currentSpeaker}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
