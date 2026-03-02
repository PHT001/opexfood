"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquareMore, LayoutDashboard, Gift } from "lucide-react";

const steps = [
  { id: "step-chatbot", label: "Acquisition", icon: MessageSquareMore, activeBg: "#f97316", borderColor: "#fdba74", inactiveBg: "#fff7ed" },
  { id: "step-2", label: "CRM", icon: LayoutDashboard, activeBg: "#3b82f6", borderColor: "#93c5fd", inactiveBg: "#eff6ff" },
  { id: "step-3", label: "Fidélité", icon: Gift, activeBg: "#8b5cf6", borderColor: "#c4b5fd", inactiveBg: "#f5f3ff" },
];

export default function DemoProgressLine() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  /* ── Mobile: horizontal bar at bottom ── */
  if (isMobile) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          padding: "12px 24px",
          paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
          backgroundColor: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: "1px solid #f1f5f9",
          boxShadow: "0 -2px 12px rgba(0,0,0,0.06)",
          transition: "opacity 0.4s, transform 0.4s",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(100%)",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = i <= activeIndex;
          const isCurrent = i === activeIndex;

          return (
            <div key={step.id} style={{ display: "flex", alignItems: "center" }}>
              {/* Connector line (before each step except first) */}
              {i > 0 && (
                <div
                  style={{
                    width: 40,
                    height: 2,
                    borderRadius: 1,
                    backgroundColor: isActive ? step.activeBg : "#e2e8f0",
                    transition: "background-color 0.3s",
                  }}
                />
              )}

              {/* Step circle */}
              <button
                onClick={() => {
                  document.getElementById(step.id)?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "2px solid",
                    borderColor: isActive ? step.activeBg : step.borderColor,
                    backgroundColor: isActive ? step.activeBg : step.inactiveBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s",
                    transform: isCurrent ? "scale(1.15)" : "scale(1)",
                    boxShadow: isCurrent ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                  }}
                >
                  <Icon style={{ width: 14, height: 14, color: isActive ? "#ffffff" : "#94a3b8", transition: "color 0.3s" }} />
                </div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: isActive ? step.activeBg : "#94a3b8",
                    transition: "color 0.3s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {step.label}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  /* ── Desktop: vertical bar on left ── */
  return (
    <div
      style={{
        position: "fixed",
        left: 16,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "opacity 0.5s",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Background line */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: 0,
          bottom: 0,
          width: 2,
          backgroundColor: "#e2e8f0",
          borderRadius: 9999,
        }}
      />

      {/* Progress fill */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: 0,
          width: 2,
          borderRadius: 9999,
          transition: "height 0.3s ease-out",
          height: `${progress * 100}%`,
          background: "linear-gradient(to bottom, #ea580c, #7c3aed)",
        }}
      />

      {/* Steps */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 48 }}>
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = i <= activeIndex;
          const isCurrent = i === activeIndex;

          return (
            <button
              key={step.id}
              onClick={() => {
                document.getElementById(step.id)?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor: isActive ? step.activeBg : step.borderColor,
                  backgroundColor: isActive ? step.activeBg : "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s",
                  transform: isCurrent ? "scale(1.1)" : "scale(1)",
                  boxShadow: isCurrent ? "0 2px 8px rgba(0,0,0,0.12)" : "none",
                }}
              >
                <Icon style={{ width: 12, height: 12, color: isActive ? "#ffffff" : "#94a3b8", transition: "color 0.3s" }} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
