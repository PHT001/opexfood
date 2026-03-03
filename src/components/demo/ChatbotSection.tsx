"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquareMore, Zap, Globe, Clock, Plus, CheckCircle2 } from "lucide-react";
import { useModuleSelection } from "@/context/ModuleSelectionContext";
import Container from "@/components/ui/Container";
import PhoneMockup from "./PhoneMockup";
import ChatBubble from "./ChatBubble";
import { CHAT_MESSAGES, type ChatMessage } from "@/lib/demo-data";

function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div className="flex gap-2 max-w-[85%]">
        <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-1">
          VR
        </div>
        <div className="px-3.5 py-3 bg-white border border-border rounded-2xl rounded-tl-md flex items-center gap-1">
          <span className="typing-dot w-2 h-2 rounded-full bg-slate-400" style={{ animationDelay: "0s" }} />
          <span className="typing-dot w-2 h-2 rounded-full bg-slate-400" style={{ animationDelay: "0.15s" }} />
          <span className="typing-dot w-2 h-2 rounded-full bg-slate-400" style={{ animationDelay: "0.3s" }} />
        </div>
      </div>
    </div>
  );
}

export default function ChatbotSection() {
  const { addModule, selectedModules } = useModuleSelection();
  const isModuleSelected = selectedModules.includes(0);
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Auto-scroll chat to bottom inside phone mockup only (not the page)
  useEffect(() => {
    const el = chatEndRef.current;
    if (!el) return;
    // Find the scrollable parent (overflow-y-auto container inside PhoneMockup)
    const scrollParent = el.closest(".overflow-y-auto");
    if (scrollParent) {
      scrollParent.scrollTo({ top: scrollParent.scrollHeight, behavior: "smooth" });
    }
  }, [visibleMessages, showTyping]);

  // Trigger animation sequence when section enters viewport
  useEffect(() => {
    if (hasStarted) return;
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
          playSequence();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStarted]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => timeoutsRef.current.forEach(clearTimeout);
  }, []);

  function playSequence() {
    // Clear any previous timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // Reset state
    setVisibleMessages([]);
    setShowTyping(false);

    const delays = [
      { typing: true, wait: 0 },
      { typing: false, msgIndex: 0, wait: 800 },
      { typing: false, msgIndex: 1, wait: 1200 },
      { typing: true, wait: 800 },
      { typing: false, msgIndex: 2, wait: 800 },
      { typing: false, msgIndex: 3, wait: 800 },
      { typing: true, wait: 800 },
      { typing: false, msgIndex: 4, wait: 800 },
      { typing: false, msgIndex: 5, wait: 600 },
      { typing: true, wait: 800 },
      { typing: false, msgIndex: 6, wait: 800 },
    ];

    let totalDelay = 300;

    delays.forEach((step) => {
      totalDelay += step.wait;
      const d = totalDelay;

      const t = setTimeout(() => {
        if (step.typing) {
          setShowTyping(true);
        } else {
          setShowTyping(false);
          if (step.msgIndex !== undefined) {
            setVisibleMessages((prev) => [...prev, CHAT_MESSAGES[step.msgIndex!]]);
          }
        }
      }, d);
      timeoutsRef.current.push(t);
    });

    // Loop: wait 2s after last step, then replay
    const loopTimeout = setTimeout(() => {
      playSequence();
    }, totalDelay + 2000);
    timeoutsRef.current.push(loopTimeout);
  }

  return (
    <section id="step-chatbot" ref={sectionRef} className="relative py-10 sm:py-16 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center overflow-hidden">
          {/* Text side */}
          <div className="reveal-left min-w-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text flex items-center gap-4">
              <span className="relative inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 shrink-0">
                <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/25 rotate-3" />
                <span className="relative text-white text-base sm:text-lg font-extrabold">1</span>
              </span>
              Chatbot + CRM
            </h2>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 mt-3 mb-1">
              <MessageSquareMore className="w-3.5 h-3.5 text-orange-600" />
              <span className="text-xs font-semibold text-orange-700">Votre client commande en ligne</span>
            </div>

            <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
              En quelques messages, le <strong className="text-text font-semibold">chatbot</strong> prend la commande
              — <strong className="text-text font-semibold">sans appli</strong>, <strong className="text-text font-semibold">sans attente</strong>.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: Zap, text: "Commande en langage naturel, 24h/24" },
                { icon: Globe, text: "Accessible via Web, WhatsApp ou QR Code" },
                { icon: Clock, text: "Temps moyen de commande : 45 secondes" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-50 shrink-0">
                      <Icon className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-sm text-text-secondary font-medium">{item.text}</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => addModule(0)}
              className={`inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                isModuleSelected
                  ? "bg-green-50 border border-green-300 text-green-700"
                  : "bg-orange-50 border border-orange-200 text-orange-700 hover:bg-orange-100 hover:border-orange-300"
              }`}
            >
              {isModuleSelected ? (
                <><CheckCircle2 className="w-4 h-4" /> Module ajouté</>
              ) : (
                <><Plus className="w-4 h-4" /> Ajouter ce module</>
              )}
            </button>
          </div>

          {/* Phone mockup */}
          <div className="reveal-right flex justify-center max-w-full overflow-hidden">
            <PhoneMockup>
              {visibleMessages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              {showTyping && <TypingIndicator />}
              <div ref={chatEndRef} />
            </PhoneMockup>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        .typing-dot {
          animation: typingBounce 1.2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
