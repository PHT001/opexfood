"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

interface Message {
  from: "bot" | "user";
  text: string;
  type?: "summary";
}

const allMessages: Message[] = [
  { from: "bot", text: "Bonjour ! Bienvenue chez Fresh Bowl" },
  { from: "bot", text: "Que souhaitez-vous commander ?" },
  { from: "user", text: "Un Poke Saumon svp !" },
  { from: "bot", text: "Taille normale ou XL ?" },
  { from: "user", text: "XL merci !" },
  { from: "bot", text: "Commande confirmée !", type: "summary" },
];

export default function ChatbotPreview() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasPlayed = useRef(false);

  // Trigger animation when in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true;
          playSequence();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function playSequence() {
    let delay = 600;
    allMessages.forEach((msg, i) => {
      // Show typing before bot messages
      if (msg.from === "bot") {
        setTimeout(() => setShowTyping(true), delay);
        delay += 800;
      }
      setTimeout(() => {
        setShowTyping(false);
        setVisibleCount(i + 1);
      }, delay);
      delay += msg.from === "user" ? 600 : 900;
    });
  }

  // Auto-scroll chat
  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [visibleCount, showTyping]);

  const visible = allMessages.slice(0, visibleCount);

  return (
    <div ref={sectionRef} className="relative mx-auto" style={{ width: 280, maxWidth: "85vw" }}>
      {/* Chat container — no phone shell, just the conversation */}
      <div className="relative bg-white rounded-2xl shadow-xl shadow-black/8 border border-slate-200/60 overflow-hidden">

        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
              FB
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-none">Fresh Bowl</p>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-300" />
                <span className="text-[10px] text-white/80">En ligne</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div
          ref={chatRef}
          className="bg-[#f8f9fa] px-3 py-3 space-y-2 overflow-hidden"
          style={{ height: 300 }}
        >
          {visible.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} animate-[fadeSlideUp_0.3s_ease-out]`}
            >
              {msg.type === "summary" ? (
                <div className="max-w-[85%] rounded-xl overflow-hidden shadow-sm border border-slate-100">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1.5">
                    <p className="text-[11px] font-semibold text-white">{msg.text}</p>
                  </div>
                  <div className="bg-white px-3 py-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-600">Poke Saumon XL</span>
                      <span className="font-bold text-slate-800">14.90&euro;</span>
                    </div>
                    <div className="mt-1.5 pt-1.5 border-t border-slate-50 flex justify-between text-[11px]">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-orange-600">14.90&euro;</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                      <span className="text-[10px] text-orange-500">Prête dans 15 min</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`max-w-[80%] px-3 py-2 text-[12px] leading-snug ${
                    msg.from === "user"
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl rounded-br-sm"
                      : "bg-white text-slate-700 rounded-2xl rounded-bl-sm shadow-sm border border-slate-100"
                  }`}
                >
                  {msg.text}
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {showTyping && (
            <div className="flex justify-start animate-[fadeSlideUp_0.2s_ease-out]">
              <div className="bg-white rounded-2xl rounded-bl-sm px-3 py-2.5 shadow-sm border border-slate-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-slate-100 px-3 py-2.5">
          <div className="flex items-center gap-2 bg-slate-50 rounded-full px-3 py-2 border border-slate-200">
            <span className="text-[11px] text-slate-400 flex-1">Votre message...</span>
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
              <Send className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
