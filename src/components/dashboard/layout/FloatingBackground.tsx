"use client";

import { useMemo } from "react";
import { useRestaurantTheme } from "@/components/dashboard/crm/ThemeProvider";

// Each cuisine type gets its own set of floating emojis
const cuisineEmojis: Record<string, string[]> = {
  mediterraneen: ["🫒", "🍋", "🌊", "🐟", "🌿", "☀️"],
  asiatique: ["🥢", "🍣", "🍜", "🎎", "🐉", "🌸"],
  fast_food: ["🍔", "🍟", "🥤", "🌭", "🧀", "🔥"],
  gastronomique: ["🍷", "⭐", "🍽️", "🌹", "💎", "✨"],
  oriental: ["🧆", "🫖", "🌶️", "⭐", "🕌", "🌙"],
  healthy: ["🥑", "🥗", "🍃", "🌱", "🍋", "💚"],
  pizzeria: ["🍕", "🍅", "🌿", "🧀", "🇮🇹", "🫒"],
  autre: ["🍴", "⭐", "✨", "🎯", "💫", "🔮"],
};

interface FloatingItem {
  emoji: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotate: number;
}

export default function FloatingBackground() {
  const { theme } = useRestaurantTheme();

  // Generate stable random positions for floating elements
  const items = useMemo<FloatingItem[]>(() => {
    const cuisineType = theme.cuisineType === "none" ? "autre" : theme.cuisineType;
    const emojis = cuisineEmojis[cuisineType] || cuisineEmojis.autre;
    const count = 10;
    const result: FloatingItem[] = [];

    // Use a simple seeded pseudo-random for consistent positions
    let seed = cuisineType.length * 17 + 42;
    const rand = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let i = 0; i < count; i++) {
      result.push({
        emoji: emojis[i % emojis.length],
        x: rand() * 90 + 5,
        y: rand() * 85 + 5,
        size: rand() * 16 + 18,
        duration: rand() * 8 + 12,
        delay: rand() * -15,
        drift: rand() * 40 + 15,
        rotate: rand() * 30 - 15,
      });
    }
    return result;
  }, [theme.cuisineType]);

  return (
    <>
      {/* Mesh gradient background — Liquid Glass */}
      <div className="pointer-events-none absolute inset-0 z-0 mesh-bg" />

      {/* Decorative glass orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Large orange orb — top right */}
        <div
          className="absolute animate-float-gentle"
          style={{
            top: "5%",
            right: "10%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(234, 88, 12, 0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Medium peach orb — bottom left */}
        <div
          className="absolute animate-float-gentle-delayed"
          style={{
            bottom: "15%",
            left: "5%",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251, 146, 60, 0.06) 0%, transparent 70%)",
            filter: "blur(35px)",
          }}
        />
        {/* Small accent orb — center right */}
        <div
          className="absolute animate-float-gentle-slow"
          style={{
            top: "50%",
            right: "25%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(254, 215, 170, 0.08) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
      </div>

      {/* Floating emoji elements — subtle */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {items.map((item, i) => (
          <div
            key={`${theme.cuisineType}-${i}`}
            className="absolute select-none"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              fontSize: `${item.size}px`,
              opacity: 0.06,
              animation: `floatEmoji${i % 3} ${item.duration}s ease-in-out ${item.delay}s infinite`,
              filter: "blur(1px)",
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* CSS animations injected via style tag */}
      <style>{`
        @keyframes floatEmoji0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(10px) rotate(-3deg); }
        }
        @keyframes floatEmoji1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(15px) rotate(-4deg); }
          75% { transform: translateY(-25px) rotate(6deg); }
        }
        @keyframes floatEmoji2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(8deg); }
        }
      `}</style>
    </>
  );
}
