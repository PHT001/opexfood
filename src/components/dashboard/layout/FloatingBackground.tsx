"use client";

export default function FloatingBackground() {
  return (
    <>
      {/* Mesh gradient background — Liquid Glass */}
      <div className="pointer-events-none absolute inset-0 z-0 mesh-bg" />

      {/* Decorative glass orbs — visible orange/peach/amber */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Large orange orb — top right */}
        <div
          className="absolute animate-float-gentle"
          style={{
            top: "3%",
            right: "8%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(234, 88, 12, 0.20) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Medium peach orb — bottom left */}
        <div
          className="absolute animate-float-gentle-delayed"
          style={{
            bottom: "10%",
            left: "3%",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251, 146, 60, 0.18) 0%, transparent 70%)",
            filter: "blur(35px)",
          }}
        />
        {/* Small accent orb — center right */}
        <div
          className="absolute animate-float-gentle-slow"
          style={{
            top: "45%",
            right: "20%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(254, 215, 170, 0.22) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
        {/* Extra orb — top left for more coverage */}
        <div
          className="absolute animate-float-gentle-delayed"
          style={{
            top: "15%",
            left: "15%",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)",
            filter: "blur(45px)",
          }}
        />
      </div>
    </>
  );
}
