"use client";

import { useState, useEffect } from "react";

export function useDemoProgress() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const ids = ["step-1", "step-2", "step-3"];
    const elements = ids.map((id) => document.getElementById(id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = elements.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveStep(idx + 1);
          }
        });
      },
      { threshold: 0.3 }
    );

    elements.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return { activeStep };
}
