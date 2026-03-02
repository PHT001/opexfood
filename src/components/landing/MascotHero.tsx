"use client";

import { useEffect, useRef } from "react";

/**
 * Hero mascot — custom OpexFood robot video.
 * Raw video, no shadow or effects — displayed as-is.
 */
export default function MascotHero() {
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
    <div className="relative w-full max-w-[650px] mx-auto select-none px-4">
      <video
        ref={videoRef}
        src="/robot-hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-auto block pointer-events-none"
      />
    </div>
  );
}
