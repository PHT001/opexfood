"use client";

import { useEffect, useRef } from "react";

/**
 * CTA mascot — custom OpexFood robot emerging from clouds.
 * Full-width video with white vignette overlay to blend edges into the page.
 */
export default function MascotCTA() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = () => {
      v.play().catch(() => {});
    };

    v.addEventListener("loadeddata", tryPlay);
    if (v.readyState >= 2) tryPlay();

    return () => v.removeEventListener("loadeddata", tryPlay);
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto select-none overflow-hidden bg-white">
      <video
        ref={videoRef}
        src="/robot-clouds.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-auto block pointer-events-none"
      />

      {/* Vignette — white gradients that fade the edges into the page */}
      {/* Left edge */}
      <div className="absolute inset-y-0 left-0 w-[15%] pointer-events-none"
        style={{ background: "linear-gradient(to right, white 0%, transparent 100%)" }} />
      {/* Right edge */}
      <div className="absolute inset-y-0 right-0 w-[15%] pointer-events-none"
        style={{ background: "linear-gradient(to left, white 0%, transparent 100%)" }} />
      {/* Top edge */}
      <div className="absolute inset-x-0 top-0 h-[20%] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, white 0%, transparent 100%)" }} />
      {/* Bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-[20%] pointer-events-none"
        style={{ background: "linear-gradient(to top, white 0%, transparent 100%)" }} />
    </div>
  );
}
