"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = ".reveal, .reveal-left, .reveal-right, .reveal-scale";

export function useRevealOnScroll() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );

    function observeAll() {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
        if (!el.classList.contains("visible")) {
          io.observe(el);
        }
      });
    }

    // Initial observation (delayed to ensure DOM is ready)
    requestAnimationFrame(() => {
      requestAnimationFrame(observeAll);
    });

    // Watch for new elements added to DOM (e.g. dynamic imports)
    const mo = new MutationObserver(() => {
      observeAll();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
