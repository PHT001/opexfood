"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquareMore, LayoutDashboard, Gift } from "lucide-react";

const steps = [
  { id: "step-chatbot", label: "Chatbot", icon: MessageSquareMore, activeBg: "#f97316", borderColor: "#fdba74" },
  { id: "step-2", label: "CRM", icon: LayoutDashboard, activeBg: "#3b82f6", borderColor: "#93c5fd" },
  { id: "step-3", label: "Fidélité", icon: Gift, activeBg: "#8b5cf6", borderColor: "#c4b5fd" },
];

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
      style={{
        position: "fixed",
        top: 64,
        left: 0,
        right: 0,
        zIndex: 45,
        transition: "opacity 0.4s, transform 0.4s",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Background bar */}
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid #e2e8f0",
          padding: "8px 16px",
        }}
      >
        <div
          style={{
            maxWidth: 400,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 0,
          }}
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = i <= activeIndex;
            const isCurrent = i === activeIndex;
            const isLast = i === steps.length - 1;

            return (
              <div key={step.id} style={{ display: "flex", alignItems: "center", flex: isLast ? "0 0 auto" : "1 1 0%" }}>
                {/* Dot + label */}
                <button
                  onClick={() => {
                    document.getElementById(step.id)?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    padding: "2px 0",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      border: "2px solid",
                      borderColor: isActive ? step.activeBg : step.borderColor,
                      backgroundColor: isActive ? step.activeBg : "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s",
                      transform: isCurrent ? "scale(1.15)" : "scale(1)",
                      boxShadow: isCurrent ? `0 2px 8px ${step.activeBg}40` : "none",
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      style={{
                        width: 11,
                        height: 11,
                        color: isActive ? "#ffffff" : "#94a3b8",
                        transition: "color 0.3s",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: isActive ? step.activeBg : "#94a3b8",
                      transition: "color 0.3s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {step.label}
                  </span>
                </button>

                {/* Connecting line between dots */}
                {!isLast && (
                  <div
                    style={{
                      flex: 1,
                      height: 2,
                      marginLeft: 8,
                      marginRight: 8,
                      borderRadius: 9999,
                      backgroundColor: "#e2e8f0",
                      position: "relative",
                      overflow: "hidden",
                      minWidth: 20,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        borderRadius: 9999,
                        transition: "width 0.3s ease-out",
                        width: i < activeIndex ? "100%" : i === activeIndex ? `${Math.min(progress * 100 * steps.length - i * 100, 100)}%` : "0%",
                        background: `linear-gradient(to right, ${step.activeBg}, ${steps[i + 1]?.activeBg || step.activeBg})`,
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
