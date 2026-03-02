"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquareMore, Zap, Globe, Clock } from "lucide-react";
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
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

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

  function playSequence() {
    const delays = [
      // msg 0 (bot): typing 800ms then show
      { typing: true, wait: 0 },
      { typing: false, msgIndex: 0, wait: 800 },
      // msg 1 (user): pause 1200ms then show
      { typing: false, msgIndex: 1, wait: 1200 },
      // msg 2 (bot menu-card): typing 800ms then show
      { typing: true, wait: 800 },
      { typing: false, msgIndex: 2, wait: 800 },
      // msg 3 (user): pause 800ms
      { typing: false, msgIndex: 3, wait: 800 },
      // msg 4 (bot order-summary): typing 800ms then show
      { typing: true, wait: 800 },
      { typing: false, msgIndex: 4, wait: 800 },
      // msg 5 (user): pause 600ms
      { typing: false, msgIndex: 5, wait: 600 },
      // msg 6 (bot confirmation): typing 800ms then show
      { typing: true, wait: 800 },
      { typing: false, msgIndex: 6, wait: 800 },
    ];

    let totalDelay = 300; // Initial small delay after intersection

    delays.forEach((step) => {
      totalDelay += step.wait;
      const d = totalDelay;

      setTimeout(() => {
        if (step.typing) {
          setShowTyping(true);
        } else {
          setShowTyping(false);
          if (step.msgIndex !== undefined) {
            setVisibleMessages((prev) => [...prev, CHAT_MESSAGES[step.msgIndex!]]);
          }
        }
      }, d);
    });
  }

  return (
    <section id="step-chatbot" ref={sectionRef} className="relative py-10 sm:py-16 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center overflow-hidden">
          {/* Text side */}
          <div className="reveal-left min-w-0">
            {/* Module badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 mb-5">
              <MessageSquareMore className="w-3.5 h-3.5 text-orange-600" />
              <span className="text-xs font-semibold text-orange-700">Module Chatbot + CRM</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text">
              Votre client commande en&nbsp;ligne
            </h2>

            <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
              Thomas decouvre votre restaurant en ligne. En quelques messages, le chatbot IA prend sa commande
              — sans application, sans attente.
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

            <a href="#tarifs" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors">
              Ajouter ce module →
            </a>
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
