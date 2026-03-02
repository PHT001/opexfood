"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquareMore, LayoutDashboard, Gift } from "lucide-react";

const steps = [
  { id: "step-chatbot", label: "Acquisition", icon: MessageSquareMore, color: "orange" },
  { id: "step-2", label: "CRM", icon: LayoutDashboard, color: "blue" },
  { id: "step-3", label: "Fidélité", icon: Gift, color: "violet" },
] as const;

const colorClasses: Record<string, { dot: string; dotActive: string; text: string; bg: string }> = {
  orange: { dot: "border-orange-300", dotActive: "bg-orange-500 border-orange-500", text: "text-orange-600", bg: "bg-orange-500" },
  blue: { dot: "border-blue-300", dotActive: "bg-blue-500 border-blue-500", text: "text-blue-600", bg: "bg-blue-500" },
  violet: { dot: "border-violet-300", dotActive: "bg-violet-500 border-violet-500", text: "text-violet-600", bg: "bg-violet-500" },
};

export default function DemoProgressLine() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const sectionEls = steps.map((s) => document.getElementById(s.id));

    function onScroll() {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const viewportCenter = window.innerHeight / 2;

        // Find active section
        let newActive = -1;
        for (let i = sectionEls.length - 1; i >= 0; i--) {
          const el = sectionEls[i];
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportCenter + 100) {
            newActive = i;
            break;
          }
        }
        setActiveIndex(newActive);

        // Calculate overall progress (0-1)
        const firstEl = sectionEls[0];
        const lastEl = sectionEls[sectionEls.length - 1];
        if (firstEl && lastEl) {
          const firstRect = firstEl.getBoundingClientRect();
          const lastRect = lastEl.getBoundingClientRect();
          const totalHeight = lastRect.bottom - firstRect.top;
          const scrolled = viewportCenter - firstRect.top;
          const p = Math.max(0, Math.min(1, scrolled / totalHeight));
          setProgress(p);
        }

        // Show/hide based on first/last section visibility
        const first = sectionEls[0];
        const last = sectionEls[sectionEls.length - 1];
        if (first && last) {
          const firstTop = first.getBoundingClientRect().top;
          const lastBottom = last.getBoundingClientRect().bottom;
          setVisible(firstTop < window.innerHeight && lastBottom > 0);
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed left-4 xl:left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Background line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-slate-200 rounded-full" />

      {/* Progress fill */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] rounded-full transition-all duration-300 ease-out"
        style={{
          height: `${progress * 100}%`,
          background: "linear-gradient(to bottom, #ea580c, #7c3aed)",
        }}
      />

      {/* Steps */}
      <div className="relative flex flex-col gap-12">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const c = colorClasses[step.color];
          const isActive = i <= activeIndex;
          const isCurrent = i === activeIndex;

          return (
            <button
              key={step.id}
              onClick={() => {
                document.getElementById(step.id)?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="group relative flex items-center justify-center cursor-pointer"
            >
              {/* Dot */}
              <div
                className={`relative w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isActive ? c.dotActive : `${c.dot} bg-white`
                } ${isCurrent ? "scale-110 shadow-md" : ""}`}
              >
                <Icon className={`w-3 h-3 transition-colors duration-300 ${isActive ? "text-white" : "text-slate-400"}`} />
                {isCurrent && (
                  <div className={`absolute inset-0 rounded-full ${c.bg} opacity-20 animate-ping`} style={{ animationDuration: "2s" }} />
                )}
              </div>

              {/* Label — tooltip on hover */}
              <span
                className={`absolute left-full ml-3 text-xs font-semibold whitespace-nowrap px-2 py-1 rounded-md transition-all duration-200 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 ${
                  isActive ? `${c.text} bg-white shadow-sm` : "text-slate-400 bg-white shadow-sm"
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
