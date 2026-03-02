"use client";

import { Paintbrush, Palette, Sun, Sparkles, Layers, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRestaurantTheme } from "@/components/dashboard/crm/ThemeProvider";
import { type CuisineType, type Ambiance, generateTheme } from "@/lib/dashboard/theme";

const cuisineOptions: { value: CuisineType; label: string; emoji: string }[] = [
  { value: "mediterraneen", emoji: "🫒", label: "Méditerranéen" },
  { value: "asiatique", emoji: "🥢", label: "Asiatique" },
  { value: "fast_food", emoji: "🍔", label: "Fast Food" },
  { value: "gastronomique", emoji: "🍽️", label: "Gastronomique" },
  { value: "oriental", emoji: "🧆", label: "Oriental" },
  { value: "healthy", emoji: "🥗", label: "Healthy" },
  { value: "pizzeria", emoji: "🍕", label: "Pizzeria" },
  { value: "autre", emoji: "🍴", label: "Autre" },
];

const ambianceOptions: { value: Ambiance; label: string; emoji: string; desc: string }[] = [
  { value: "moderne", emoji: "✨", label: "Moderne", desc: "Clean & minimal" },
  { value: "traditionnel", emoji: "🏡", label: "Traditionnel", desc: "Chaleureux & boisé" },
  { value: "decontracte", emoji: "😎", label: "Décontracté", desc: "Coloré & fun" },
  { value: "elegant", emoji: "💎", label: "Élégant", desc: "Sombre & premium" },
  { value: "industriel", emoji: "🏗️", label: "Industriel", desc: "Brut & contrasté" },
  { value: "nature", emoji: "🌿", label: "Nature", desc: "Vert & organique" },
];

const presetColors = [
  "#ea580c", "#dc2626", "#2563eb", "#16a34a",
  "#7c3aed", "#db2777", "#0891b2", "#92400e",
];

const secondaryPresets = [
  "#0f172a", "#1e293b", "#78350f", "#7c3aed",
  "#1e1b4b", "#18181b", "#14532d", "#4a044e",
];

const backgroundPresets = [
  { color: "#f8fafc", label: "Blanc" },
  { color: "#fef7ed", label: "Crème" },
  { color: "#faf5ff", label: "Lavande" },
  { color: "#0f172a", label: "Sombre" },
  { color: "#e4e4e7", label: "Béton" },
  { color: "#ecfdf5", label: "Menthe" },
  { color: "#fef2f2", label: "Rosé" },
  { color: "#fffbeb", label: "Ambre" },
];

export default function PersonnaliserPage() {
  const { theme, setTheme } = useRestaurantTheme();

  const radiusClass =
    theme.borderRadius === "pill"
      ? "rounded-full"
      : theme.borderRadius === "rounded"
        ? "rounded-xl"
        : "rounded-md";

  const showAnimatedBg = theme.cuisineType !== "none";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: theme.secondary }}>
          <Paintbrush className="w-5 h-5" style={{ color: theme.primary }} />
          Personnalisation
        </h2>
        <p className="text-sm mt-0.5" style={{ color: theme.secondary, opacity: 0.5 }}>
          Ajustez les couleurs et le style de votre interface CRM
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ───── Left column: Controls ───── */}
        <div className="space-y-5">

          {/* Ambiance presets */}
          <div className="rounded-2xl border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: theme.secondary }}>
              <Sparkles className="w-4 h-4" style={{ color: theme.primary }} />
              Ambiance
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {ambianceOptions.map((a) => (
                <button
                  key={a.value}
                  onClick={() => {
                    const newTheme = generateTheme({
                      cuisineType: theme.cuisineType === ("none" as CuisineType) ? "autre" : theme.cuisineType,
                      ambiance: a.value,
                      serviceMode: theme.serviceMode || "mixte",
                      restaurantStyle: theme.restaurantStyle || "moyen",
                    });
                    setTheme(newTheme);
                  }}
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all text-center",
                  )}
                  style={{
                    borderColor: theme.ambiance === a.value ? theme.primary : theme.cardBorder,
                    backgroundColor: theme.ambiance === a.value ? theme.primaryLight : "transparent",
                  }}
                >
                  <span className="text-xl">{a.emoji}</span>
                  <span className="text-xs font-semibold" style={{ color: theme.secondary }}>{a.label}</span>
                  <span className="text-[10px] leading-tight" style={{ color: theme.secondary, opacity: 0.5 }}>{a.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Primary color */}
          <div className="rounded-2xl border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: theme.secondary }}>
              <Palette className="w-4 h-4" style={{ color: theme.primary }} />
              Couleur principale
            </h3>
            <div className="flex flex-wrap gap-2">
              {presetColors.map((c) => (
                <button
                  key={c}
                  onClick={() => setTheme({ ...theme, primary: c })}
                  className="w-9 h-9 rounded-full border-2 transition-all"
                  style={{
                    backgroundColor: c,
                    borderColor: theme.primary === c ? c : "transparent",
                    boxShadow: theme.primary === c ? `0 0 0 2px ${theme.cardBg}, 0 0 0 4px ${c}` : "none",
                  }}
                />
              ))}
              <label className="w-9 h-9 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden relative" style={{ borderColor: theme.cardBorder }}>
                <input type="color" value={theme.primary} onChange={(e) => setTheme({ ...theme, primary: e.target.value })} className="absolute w-12 h-12 opacity-0 cursor-pointer" />
                <span className="text-xs font-bold" style={{ color: theme.secondary, opacity: 0.4 }}>+</span>
              </label>
            </div>
          </div>

          {/* Secondary color */}
          <div className="rounded-2xl border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: theme.secondary }}>
              <Palette className="w-4 h-4" style={{ color: theme.accent }} />
              Couleur secondaire
            </h3>
            <div className="flex flex-wrap gap-2">
              {secondaryPresets.map((c) => (
                <button
                  key={c}
                  onClick={() => setTheme({ ...theme, secondary: c })}
                  className="w-9 h-9 rounded-full border-2 transition-all"
                  style={{
                    backgroundColor: c,
                    borderColor: theme.secondary === c ? c : "transparent",
                    boxShadow: theme.secondary === c ? `0 0 0 2px ${theme.cardBg}, 0 0 0 4px ${c}` : "none",
                  }}
                />
              ))}
              <label className="w-9 h-9 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden relative" style={{ borderColor: theme.cardBorder }}>
                <input type="color" value={theme.secondary} onChange={(e) => setTheme({ ...theme, secondary: e.target.value })} className="absolute w-12 h-12 opacity-0 cursor-pointer" />
                <span className="text-xs font-bold" style={{ color: theme.secondary, opacity: 0.4 }}>+</span>
              </label>
            </div>
          </div>

          {/* Background color */}
          <div className="rounded-2xl border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: theme.secondary }}>
              <Sun className="w-4 h-4" style={{ color: theme.primary }} />
              Couleur de fond
            </h3>
            <div className="flex flex-wrap gap-2">
              {backgroundPresets.map((bg) => (
                <button
                  key={bg.color}
                  onClick={() => setTheme({ ...theme, background: bg.color })}
                  className="w-9 h-9 rounded-full border-2 transition-all"
                  title={bg.label}
                  style={{
                    backgroundColor: bg.color,
                    borderColor: theme.background === bg.color ? theme.primary : theme.cardBorder,
                    boxShadow: theme.background === bg.color ? `0 0 0 2px ${theme.cardBg}, 0 0 0 4px ${theme.primary}` : "none",
                  }}
                />
              ))}
              <label className="w-9 h-9 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden relative" style={{ borderColor: theme.cardBorder }}>
                <input type="color" value={theme.background} onChange={(e) => setTheme({ ...theme, background: e.target.value })} className="absolute w-12 h-12 opacity-0 cursor-pointer" />
                <span className="text-xs font-bold" style={{ color: theme.secondary, opacity: 0.4 }}>+</span>
              </label>
            </div>
          </div>

          {/* Border radius */}
          <div className="rounded-2xl border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: theme.secondary }}>
              <Layers className="w-4 h-4" style={{ color: theme.primary }} />
              Style des coins
            </h3>
            <div className="flex gap-3">
              {([
                { value: "sharp", label: "Angulaire", preview: "rounded-sm" },
                { value: "rounded", label: "Classique", preview: "rounded-xl" },
                { value: "pill", label: "Arrondi", preview: "rounded-full" },
              ] as const).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setTheme({ ...theme, borderRadius: opt.value })}
                  className="flex-1 flex flex-col items-center gap-2 p-3 border-2 transition-all rounded-lg"
                  style={{
                    borderColor: theme.borderRadius === opt.value ? theme.primary : theme.cardBorder,
                    backgroundColor: theme.borderRadius === opt.value ? theme.primaryLight : "transparent",
                  }}
                >
                  <div className={cn("w-10 h-10", opt.preview)} style={{ backgroundColor: theme.surface }} />
                  <span className="text-xs font-medium" style={{ color: theme.secondary }}>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Animated background */}
          <div className="rounded-2xl border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: theme.secondary }}>
                {showAnimatedBg ? <Eye className="w-4 h-4" style={{ color: theme.primary }} /> : <EyeOff className="w-4 h-4" style={{ color: theme.secondary, opacity: 0.4 }} />}
                Fond animé (emojis)
              </h3>
              <button
                onClick={() => {
                  if (showAnimatedBg) {
                    setTheme({ ...theme, cuisineType: "none" as CuisineType });
                  } else {
                    setTheme({ ...theme, cuisineType: "mediterraneen" });
                  }
                }}
                className="text-xs px-3 py-1 rounded-full border transition-all"
                style={{
                  borderColor: showAnimatedBg ? theme.primary : theme.cardBorder,
                  backgroundColor: showAnimatedBg ? theme.primaryLight : "transparent",
                  color: showAnimatedBg ? theme.primary : theme.secondary,
                  opacity: showAnimatedBg ? 1 : 0.5,
                }}
              >
                {showAnimatedBg ? "Activé" : "Désactivé"}
              </button>
            </div>
            {showAnimatedBg && (
              <div className="grid grid-cols-4 gap-2">
                {cuisineOptions.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setTheme({ ...theme, cuisineType: c.value })}
                    className="flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all"
                    style={{
                      borderColor: theme.cuisineType === c.value ? theme.primary : theme.cardBorder,
                      backgroundColor: theme.cuisineType === c.value ? theme.primaryLight : "transparent",
                    }}
                  >
                    <span className="text-lg">{c.emoji}</span>
                    <span className="text-[10px] font-medium" style={{ color: theme.secondary }}>{c.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ───── Right column: Live preview ───── */}
        <div className="rounded-2xl border p-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: theme.secondary }}>
            Aperçu en direct
          </h3>

          <div
            className="border-2 p-5 space-y-4"
            style={{
              backgroundColor: theme.background,
              borderColor: theme.cardBorder,
              borderRadius: theme.borderRadius === "pill" ? "1.25rem" : theme.borderRadius === "rounded" ? "1rem" : "0.5rem",
            }}
          >
            {/* Nav preview */}
            <div className="flex items-center gap-2">
              <div
                className="px-3 py-1.5 text-white text-xs font-semibold"
                style={{
                  backgroundColor: theme.primary,
                  borderRadius: theme.borderRadius === "pill" ? "9999px" : theme.borderRadius === "rounded" ? "0.5rem" : "0.25rem",
                }}
              >
                Live Commandes
              </div>
              <div
                className="px-3 py-1.5 text-xs font-medium"
                style={{
                  backgroundColor: theme.cardBg,
                  color: theme.secondary,
                  border: `1px solid ${theme.cardBorder}`,
                  borderRadius: theme.borderRadius === "pill" ? "9999px" : theme.borderRadius === "rounded" ? "0.5rem" : "0.25rem",
                }}
              >
                Stocks
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2">
              {["520 €", "35 cmd", "15 €"].map((val, i) => (
                <div
                  key={i}
                  className="p-3"
                  style={{
                    backgroundColor: theme.cardBg,
                    border: `1px solid ${theme.cardBorder}`,
                    borderRadius: theme.borderRadius === "pill" ? "1rem" : theme.borderRadius === "rounded" ? "0.75rem" : "0.375rem",
                  }}
                >
                  <div className="text-xs mb-1" style={{ color: theme.primary, opacity: 0.7 }}>
                    {["CA", "Commandes", "Panier"][i]}
                  </div>
                  <div className="text-sm" style={{ color: theme.secondary, fontWeight: theme.fontWeight === "bold" ? 700 : 600 }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>

            {/* Cards */}
            <div className="space-y-2">
              {["Marie L. — Bowl Méditerranéen", "Thomas D. — Wrap Caesar"].map((item, i) => (
                <div
                  key={i}
                  className="p-3 flex items-center justify-between"
                  style={{
                    backgroundColor: theme.cardBg,
                    border: `1px solid ${theme.cardBorder}`,
                    borderRadius: theme.borderRadius === "pill" ? "1rem" : theme.borderRadius === "rounded" ? "0.75rem" : "0.375rem",
                  }}
                >
                  <span className="text-xs" style={{ color: theme.secondary }}>{item}</span>
                  <span
                    className="text-xs px-2 py-0.5 text-white"
                    style={{
                      backgroundColor: i === 0 ? theme.accent : theme.primary,
                      borderRadius: theme.borderRadius === "pill" ? "9999px" : "0.25rem",
                    }}
                  >
                    {i === 0 ? "En attente" : "Prête"}
                  </span>
                </div>
              ))}
            </div>

            {/* Button */}
            <button
              className={cn("w-full py-2 text-white text-xs font-semibold transition-colors", radiusClass)}
              style={{ backgroundColor: theme.primary }}
            >
              Préparer →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
