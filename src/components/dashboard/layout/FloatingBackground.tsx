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

  // If background animation is disabled, only show the gradient
  if (theme.cuisineType === "none") {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 80% 10%, ${theme.primary}08 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 15% 85%, ${theme.accent}06 0%, transparent 70%)
          `,
        }}
      />
    );
  }

  // Generate stable random positions for floating elements
  const items = useMemo<FloatingItem[]>(() => {
    const emojis = cuisineEmojis[theme.cuisineType] || cuisineEmojis.autre;
    const count = 10;
    const result: FloatingItem[] = [];

    // Use a simple seeded pseudo-random for consistent positions
    let seed = theme.cuisineType.length * 17 + 42;
    const rand = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let i = 0; i < count; i++) {
      result.push({
        emoji: emojis[i % emojis.length],
        x: rand() * 90 + 5,       // 5% to 95%
        y: rand() * 85 + 5,       // 5% to 90%
        size: rand() * 16 + 18,    // 18px to 34px
        duration: rand() * 8 + 12, // 12s to 20s
        delay: rand() * -15,       // stagger start
        drift: rand() * 40 + 15,   // 15px to 55px vertical float
        rotate: rand() * 30 - 15,  // -15deg to 15deg
      });
    }
    return result;
  }, [theme.cuisineType]);

  return (
    <>
      {/* Subtle radial gradient in the top corner using theme primary */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 80% 10%, ${theme.primary}08 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 15% 85%, ${theme.accent}06 0%, transparent 70%)
          `,
        }}
      />

      {/* Floating emoji elements */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {items.map((item, i) => (
          <div
            key={`${theme.cuisineType}-${i}`}
            className="absolute select-none"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              fontSize: `${item.size}px`,
              opacity: 0.12,
              animation: `floatEmoji${i % 3} ${item.duration}s ease-in-out ${item.delay}s infinite`,
              filter: "blur(0.5px)",
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
