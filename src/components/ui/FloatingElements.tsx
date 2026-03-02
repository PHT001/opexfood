"use client";

/**
 * Floating decorative elements for landing page sections.
 * Renders animated blobs, circles, dots, and geometric shapes
 * with varying sizes, colors, and float speeds.
 */

interface FloatingShape {
  type: "blob" | "circle" | "dot" | "ring" | "square" | "cross";
  size: number;
  x: string;
  y: string;
  color: string;
  delay: number;
  duration: number;
  blur?: number;
  opacity?: number;
  rotate?: number;
}

interface FloatingElementsProps {
  /** Predefined theme for the section */
  variant: "hero" | "modules" | "roi" | "pricing" | "testimonials" | "cta";
}

const variants: Record<string, FloatingShape[]> = {
  hero: [
    { type: "blob", size: 300, x: "-5%", y: "10%", color: "bg-orange-200", delay: 0, duration: 8, blur: 80, opacity: 0.3 },
    { type: "blob", size: 250, x: "85%", y: "20%", color: "bg-amber-200", delay: 2, duration: 10, blur: 70, opacity: 0.25 },
    { type: "circle", size: 12, x: "12%", y: "25%", color: "bg-orange-300", delay: 1, duration: 6, opacity: 0.4 },
    { type: "circle", size: 8, x: "88%", y: "60%", color: "bg-amber-400", delay: 3, duration: 5, opacity: 0.35 },
    { type: "ring", size: 40, x: "80%", y: "15%", color: "border-orange-200", delay: 0, duration: 12, opacity: 0.3 },
    { type: "ring", size: 28, x: "8%", y: "70%", color: "border-amber-200", delay: 4, duration: 9, opacity: 0.25 },
    { type: "dot", size: 6, x: "25%", y: "18%", color: "bg-orange-400", delay: 2, duration: 4, opacity: 0.3 },
    { type: "dot", size: 5, x: "70%", y: "75%", color: "bg-amber-300", delay: 1, duration: 5, opacity: 0.35 },
    { type: "dot", size: 4, x: "50%", y: "8%", color: "bg-orange-300", delay: 3, duration: 6, opacity: 0.25 },
    { type: "square", size: 16, x: "92%", y: "40%", color: "bg-orange-200", delay: 2, duration: 8, opacity: 0.2, rotate: 45 },
    { type: "cross", size: 14, x: "5%", y: "45%", color: "bg-orange-300", delay: 1, duration: 7, opacity: 0.2 },
  ],
  modules: [
    { type: "blob", size: 200, x: "90%", y: "5%", color: "bg-orange-100", delay: 0, duration: 9, blur: 60, opacity: 0.3 },
    { type: "blob", size: 180, x: "-3%", y: "50%", color: "bg-violet-100", delay: 3, duration: 11, blur: 50, opacity: 0.25 },
    { type: "circle", size: 10, x: "95%", y: "30%", color: "bg-orange-300", delay: 2, duration: 5, opacity: 0.3 },
    { type: "circle", size: 7, x: "3%", y: "80%", color: "bg-violet-300", delay: 0, duration: 6, opacity: 0.25 },
    { type: "ring", size: 32, x: "85%", y: "70%", color: "border-emerald-200", delay: 1, duration: 10, opacity: 0.2 },
    { type: "dot", size: 5, x: "15%", y: "15%", color: "bg-orange-400", delay: 2, duration: 4, opacity: 0.25 },
    { type: "dot", size: 4, x: "75%", y: "90%", color: "bg-violet-300", delay: 3, duration: 5, opacity: 0.2 },
    { type: "square", size: 12, x: "7%", y: "35%", color: "bg-orange-200", delay: 1, duration: 8, opacity: 0.15, rotate: 30 },
  ],
  roi: [
    { type: "blob", size: 220, x: "-5%", y: "15%", color: "bg-green-100", delay: 0, duration: 10, blur: 60, opacity: 0.3 },
    { type: "blob", size: 180, x: "92%", y: "60%", color: "bg-orange-100", delay: 2, duration: 8, blur: 50, opacity: 0.25 },
    { type: "circle", size: 9, x: "10%", y: "80%", color: "bg-green-300", delay: 1, duration: 5, opacity: 0.3 },
    { type: "circle", size: 7, x: "90%", y: "20%", color: "bg-orange-300", delay: 3, duration: 6, opacity: 0.25 },
    { type: "ring", size: 36, x: "50%", y: "5%", color: "border-orange-200", delay: 0, duration: 12, opacity: 0.2 },
    { type: "dot", size: 5, x: "30%", y: "90%", color: "bg-emerald-400", delay: 2, duration: 4, opacity: 0.2 },
    { type: "cross", size: 12, x: "88%", y: "10%", color: "bg-orange-200", delay: 1, duration: 7, opacity: 0.15 },
  ],
  pricing: [
    { type: "blob", size: 260, x: "88%", y: "10%", color: "bg-orange-100", delay: 0, duration: 9, blur: 70, opacity: 0.25 },
    { type: "blob", size: 200, x: "-5%", y: "60%", color: "bg-amber-100", delay: 3, duration: 11, blur: 60, opacity: 0.2 },
    { type: "circle", size: 10, x: "5%", y: "15%", color: "bg-orange-300", delay: 1, duration: 5, opacity: 0.25 },
    { type: "circle", size: 6, x: "92%", y: "80%", color: "bg-amber-300", delay: 2, duration: 6, opacity: 0.2 },
    { type: "ring", size: 30, x: "15%", y: "85%", color: "border-orange-200", delay: 0, duration: 10, opacity: 0.2 },
    { type: "dot", size: 5, x: "80%", y: "50%", color: "bg-orange-400", delay: 3, duration: 4, opacity: 0.2 },
    { type: "square", size: 14, x: "95%", y: "35%", color: "bg-amber-200", delay: 2, duration: 8, opacity: 0.15, rotate: 20 },
  ],
  testimonials: [
    { type: "blob", size: 200, x: "85%", y: "15%", color: "bg-orange-100", delay: 0, duration: 10, blur: 60, opacity: 0.2 },
    { type: "blob", size: 160, x: "-3%", y: "70%", color: "bg-violet-100", delay: 2, duration: 8, blur: 50, opacity: 0.2 },
    { type: "circle", size: 8, x: "10%", y: "20%", color: "bg-orange-300", delay: 1, duration: 5, opacity: 0.2 },
    { type: "dot", size: 5, x: "90%", y: "85%", color: "bg-violet-300", delay: 3, duration: 4, opacity: 0.2 },
    { type: "ring", size: 28, x: "50%", y: "90%", color: "border-orange-200", delay: 0, duration: 11, opacity: 0.15 },
  ],
  cta: [
    { type: "blob", size: 240, x: "-8%", y: "20%", color: "bg-orange-200", delay: 0, duration: 8, blur: 70, opacity: 0.25 },
    { type: "blob", size: 200, x: "90%", y: "40%", color: "bg-amber-200", delay: 2, duration: 10, blur: 60, opacity: 0.2 },
    { type: "circle", size: 10, x: "20%", y: "70%", color: "bg-orange-300", delay: 1, duration: 5, opacity: 0.3 },
    { type: "circle", size: 7, x: "85%", y: "15%", color: "bg-amber-400", delay: 3, duration: 6, opacity: 0.25 },
    { type: "dot", size: 6, x: "40%", y: "10%", color: "bg-orange-400", delay: 2, duration: 4, opacity: 0.25 },
    { type: "ring", size: 34, x: "8%", y: "50%", color: "border-orange-200", delay: 0, duration: 12, opacity: 0.2 },
  ],
};

function renderShape(shape: FloatingShape, index: number) {
  const baseStyle: React.CSSProperties = {
    position: "absolute",
    left: shape.x,
    top: shape.y,
    width: shape.size,
    height: shape.size,
    opacity: shape.opacity ?? 0.3,
    animation: `float${index % 4} ${shape.duration}s ease-in-out ${shape.delay}s infinite`,
    filter: shape.blur ? `blur(${shape.blur}px)` : undefined,
    transform: shape.rotate ? `rotate(${shape.rotate}deg)` : undefined,
  };

  switch (shape.type) {
    case "blob":
      return (
        <div
          key={index}
          className={`rounded-full ${shape.color}`}
          style={baseStyle}
        />
      );

    case "circle":
      return (
        <div
          key={index}
          className={`rounded-full ${shape.color}`}
          style={baseStyle}
        />
      );

    case "dot":
      return (
        <div
          key={index}
          className={`rounded-full ${shape.color}`}
          style={baseStyle}
        />
      );

    case "ring":
      return (
        <div
          key={index}
          className={`rounded-full border-2 ${shape.color}`}
          style={{ ...baseStyle, background: "transparent" }}
        />
      );

    case "square":
      return (
        <div
          key={index}
          className={`rounded-md ${shape.color}`}
          style={baseStyle}
        />
      );

    case "cross":
      return (
        <div
          key={index}
          style={{ ...baseStyle, background: "transparent" }}
        >
          <div className={`absolute top-1/2 left-0 w-full h-[2px] ${shape.color} rounded-full -translate-y-1/2`} />
          <div className={`absolute left-1/2 top-0 h-full w-[2px] ${shape.color} rounded-full -translate-x-1/2`} />
        </div>
      );

    default:
      return null;
  }
}

export default function FloatingElements({ variant }: FloatingElementsProps) {
  const shapes = variants[variant] || [];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {shapes.map((shape, i) => renderShape(shape, i))}

      <style>{`
        @keyframes float0 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-15px) translateX(8px); }
          66% { transform: translateY(8px) translateX(-5px); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(12px) translateX(-10px); }
          75% { transform: translateY(-10px) translateX(6px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-18px) translateX(12px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          40% { transform: translateY(10px) translateX(-8px); }
          80% { transform: translateY(-12px) translateX(4px); }
        }
      `}</style>
    </div>
  );
}
