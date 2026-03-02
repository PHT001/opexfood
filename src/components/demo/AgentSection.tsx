"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, PhoneIncoming, Clock, Users, ShoppingBag, Mic } from "lucide-react";
import Container from "@/components/ui/Container";
import { CALL_TRANSCRIPT, CALL_STATS, type CallTranscriptLine } from "@/lib/demo-data";

function CallMockup({
  lines,
  isRinging,
  isActive,
  callDuration,
}: {
  lines: CallTranscriptLine[];
  isRinging: boolean;
  isActive: boolean;
  callDuration: number;
}) {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative mx-auto" style={{ width: 320, maxWidth: "90vw" }}>
      <div className="relative bg-white rounded-2xl shadow-xl shadow-black/8 border border-slate-200/60 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-emerald-500 to-teal-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                {isRinging ? (
                  <PhoneIncoming className="w-4 h-4 text-white animate-pulse" />
                ) : (
                  <Phone className="w-4 h-4 text-white" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-none">
                  {isRinging ? "Appel entrant..." : "Agent IA — Fresh Bowl"}
                </p>
                <span className="text-[10px] text-white/80">
                  {isRinging
                    ? "+33 6 12 34 56 78"
                    : isActive
                    ? `En cours — ${formatTime(callDuration)}`
                    : "Appel termine"}
                </span>
              </div>
            </div>
            {isActive && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-[10px] text-white/80 font-medium">REC</span>
              </div>
            )}
          </div>
        </div>

        {/* Ringing state */}
        {isRinging && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
                <Phone className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-emerald-400/40 animate-ping" style={{ animationDuration: "1.5s" }} />
            </div>
            <p className="text-sm font-medium text-slate-500">L&apos;agent IA décroche...</p>
          </div>
        )}

        {/* Transcript area */}
        {!isRinging && (
          <div ref={chatRef} className="px-3 py-3 space-y-2.5 overflow-hidden" style={{ height: 340 }}>
            {/* Waveform indicator */}
            {isActive && lines.length > 0 && (
              <div className="flex items-center justify-center gap-1 py-2">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-full bg-emerald-400"
                    style={{
                      height: `${8 + Math.random() * 16}px`,
                      animation: `waveBar 0.8s ease-in-out ${i * 0.05}s infinite alternate`,
                    }}
                  />
                ))}
              </div>
            )}

            {lines.map((line) => (
              <div
                key={line.id}
                className={`flex ${line.speaker === "client" ? "justify-end" : "justify-start"} animate-[fadeSlideUp_0.3s_ease-out]`}
              >
                <div className="flex items-start gap-2 max-w-[85%]">
                  {line.speaker === "agent" && (
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Mic className="w-3 h-3 text-emerald-600" />
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] font-medium text-slate-400 mb-0.5 block">
                      {line.speaker === "agent" ? "Agent IA" : "Client"}
                    </span>
                    <div
                      className={`px-3 py-2 text-[12px] leading-relaxed rounded-2xl ${
                        line.speaker === "client"
                          ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-br-sm"
                          : "bg-slate-100 text-slate-700 rounded-bl-sm"
                      }`}
                    >
                      {line.text}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Call summary card */}
            {!isActive && lines.length === CALL_TRANSCRIPT.length && (
              <div className="animate-[fadeSlideUp_0.4s_ease-out] mt-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
                <p className="text-[11px] font-bold text-emerald-700 mb-2">Résumé de l&apos;appel</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] text-slate-600">{CALL_STATS.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] text-slate-600">{CALL_STATS.couverts} couverts</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] text-slate-600">{CALL_STATS.reservation}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShoppingBag className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] text-slate-600">{CALL_STATS.preCommande}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes waveBar {
          0% { height: 4px; }
          100% { height: 20px; }
        }
      `}</style>
    </div>
  );
}

export default function AgentSection() {
  const [visibleLines, setVisibleLines] = useState<CallTranscriptLine[]>([]);
  const [isRinging, setIsRinging] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
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

    // Play transcript lines
    let delay = 2500;
    CALL_TRANSCRIPT.forEach((line, i) => {
      const speakTime = line.speaker === "agent" ? 1200 : 800;
      delay += speakTime;
      const d = delay;
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, CALL_TRANSCRIPT[i]]);
      }, d);
    });

    // End call
    setTimeout(() => {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }, delay + 1500);
  }

  return (
    <section id="step-agent" ref={sectionRef} className="relative py-10 sm:py-16 bg-white overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center overflow-hidden">
          {/* Text side */}
          <div className="reveal-right lg:order-last min-w-0">
            {/* Module badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-5 max-w-full flex-wrap">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-700">Module Agent Receptionniste IA</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text">
              Ou il appelle, et l&apos;IA répond
            </h2>

            <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
              Thomas préfère appeler ? L&apos;agent IA décroche en moins de 2 secondes,
              prend la réservation et la pré-commande — comme un vrai réceptionniste,
              disponible 24h/24.
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

            <a href="#tarifs" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
              Ajouter ce module →
            </a>
          </div>

          {/* Call mockup */}
          <div className="reveal-left lg:order-first flex justify-center">
            <CallMockup
              lines={visibleLines}
              isRinging={isRinging}
              isActive={isActive}
              callDuration={callDuration}
            />
          </div>
        </div>
      </Container>

    </section>
  );
}
