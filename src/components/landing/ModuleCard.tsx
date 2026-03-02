"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import type { ModuleData } from "@/lib/constants";
import ChatbotPreview from "./ChatbotPreview";
import DashboardPreview from "./DashboardPreview";

interface ModuleCardProps {
  module: ModuleData;
  reversed: boolean;
  index: number;
}

const moduleVisuals: Record<string, React.ComponentType> = {
  chatbot: ChatbotPreview,
  crm: DashboardPreview,
};

export default function ModuleCard({ module, reversed }: ModuleCardProps) {
  const Icon = module.icon;
  const videoRef = useRef<HTMLVideoElement>(null);
  const CustomVisual = moduleVisuals[module.id];

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
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center max-w-5xl mx-auto">
      {/* Text Side */}
      <div className={`${reversed ? "reveal-right lg:order-last" : "reveal-left"}`}>
        <div
          className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${module.iconBg}`}
        >
          <Icon className={`w-6 h-6 ${module.iconColor}`} />
        </div>

        <h3 className="mt-4 text-2xl font-bold text-text">{module.title}</h3>

        <p className="mt-3 text-text-secondary leading-relaxed">
          {module.description}
        </p>

        <ul className="mt-6 space-y-3">
          {module.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start gap-3">
              <div className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-orange-100 shrink-0">
                <Check className="w-3 h-3 text-orange-600" />
              </div>
              <span className="text-sm text-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Visual Side */}
      <div className={`${reversed ? "reveal-left lg:order-first" : "reveal-right"}`}>
        {module.videoSrc ? (
          <div className="relative overflow-hidden">
            <video
              ref={videoRef}
              src={module.videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-auto block pointer-events-none"
            />
            {/* Vignette — blend video edges into white background */}
            <div className="absolute inset-y-0 left-0 w-[12%] pointer-events-none"
              style={{ background: "linear-gradient(to right, white 0%, transparent 100%)" }} />
            <div className="absolute inset-y-0 right-0 w-[12%] pointer-events-none"
              style={{ background: "linear-gradient(to left, white 0%, transparent 100%)" }} />
            <div className="absolute inset-x-0 top-0 h-[15%] pointer-events-none"
              style={{ background: "linear-gradient(to bottom, white 0%, transparent 100%)" }} />
            <div className="absolute inset-x-0 bottom-0 h-[15%] pointer-events-none"
              style={{ background: "linear-gradient(to top, white 0%, transparent 100%)" }} />
          </div>
        ) : CustomVisual ? (
          <CustomVisual />
        ) : (
          <div
            className={`rounded-2xl bg-gradient-to-br ${module.iconBg} p-8 aspect-video flex flex-col items-center justify-center shadow-soft`}
          >
            <Icon className={`w-16 h-16 ${module.iconColor}`} />
            <span className={`mt-4 text-lg font-semibold ${module.iconColor}`}>
              {module.title}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
