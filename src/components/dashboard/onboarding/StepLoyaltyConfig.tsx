"use client";

import { useState, useEffect, useCallback } from "react";
import { Gift, Link2, Coins, Trophy, Star, Check, X, Loader2 } from "lucide-react";

export interface LoyaltyConfigData {
  slug: string;
  points_per_euro: number;
  reward_threshold: number;
  reward_description: string;
  welcome_points: number;
}

interface StepLoyaltyConfigProps {
  data: LoyaltyConfigData;
  onChange: (data: LoyaltyConfigData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepLoyaltyConfig({
  data,
  onChange,
  onNext,
  onBack,
}: StepLoyaltyConfigProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const [saving, setSaving] = useState(false);

  // Debounced slug availability check
  useEffect(() => {
    if (!data.slug || data.slug.length < 3) {
      setSlugStatus("idle");
      return;
    }
    if (!/^[a-z0-9-]+$/.test(data.slug)) {
      setSlugStatus("idle");
      return;
    }

    setSlugStatus("checking");
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/loyalty/config/check-slug?slug=${encodeURIComponent(data.slug)}`);
        const json = await res.json();
        setSlugStatus(json.available ? "available" : "taken");
      } catch {
        setSlugStatus("idle");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [data.slug]);

  const handleSlugChange = useCallback(
    (raw: string) => {
      const slug = raw
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-/, "");
      onChange({ ...data, slug });
    },
    [data, onChange]
  );

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};
    if (!data.slug || data.slug.length < 3) newErrors.slug = "Minimum 3 caractères";
    if (slugStatus === "taken") newErrors.slug = "Ce slug est déjà pris";
    if (data.points_per_euro < 1) newErrors.points_per_euro = "Minimum 1";
    if (data.reward_threshold < 10) newErrors.reward_threshold = "Minimum 10";
    if (!data.reward_description.trim()) newErrors.reward_description = "Requis";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSaving(true);

    try {
      // Trigger lazy creation of config
      await fetch("/api/loyalty/config");

      // Update with user values
      const res = await fetch("/api/loyalty/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: data.slug,
          points_per_euro: data.points_per_euro,
          reward_threshold: data.reward_threshold,
          reward_description: data.reward_description,
          welcome_points: data.welcome_points,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setErrors({ submit: err.error || "Erreur" });
        setSaving(false);
        return;
      }

      onNext();
    } catch {
      setErrors({ submit: "Erreur réseau" });
    } finally {
      setSaving(false);
    }
  };

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://opexfood.vercel.app";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Programme de fidélité
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Configurez les règles de votre programme. Vos clients pourront s&apos;inscrire via le lien et le QR code.
        </p>
      </div>

      <div className="space-y-4">
        {/* Slug */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
            <Link2 className="w-4 h-4" />
            Lien d&apos;inscription *
          </label>
          <div className="flex items-center gap-0 rounded-xl glass-input overflow-hidden focus-within:border-orange-400/40 focus-within:shadow-[0_0_0_3px_rgba(234,88,12,0.1)]">
            <span className="px-3 py-2.5 bg-white/30 text-xs text-slate-400 border-r border-white/40 whitespace-nowrap">
              {baseUrl}/loyalty/
            </span>
            <input
              type="text"
              value={data.slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="mon-restaurant"
              className="flex-1 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
            />
            <div className="pr-3">
              {slugStatus === "checking" && <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />}
              {slugStatus === "available" && <Check className="w-4 h-4 text-green-500" />}
              {slugStatus === "taken" && <X className="w-4 h-4 text-red-500" />}
            </div>
          </div>
          {slugStatus === "taken" && (
            <p className="text-xs text-red-500 mt-1">Ce slug est déjà utilisé</p>
          )}
          {errors.slug && slugStatus !== "taken" && (
            <p className="text-xs text-red-500 mt-1">{errors.slug}</p>
          )}
        </div>

        {/* Points par euro */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
            <Coins className="w-4 h-4" />
            Points par euro dépensé
          </label>
          <input
            type="number"
            min={1}
            value={data.points_per_euro}
            onChange={(e) =>
              onChange({ ...data, points_per_euro: parseInt(e.target.value) || 1 })
            }
            className="w-full rounded-xl glass-input px-3 py-2.5 text-sm text-slate-900"
          />
          <p className="text-xs text-slate-400 mt-1">
            Ex : 10 pts/€ → un repas à 15€ = 150 points
          </p>
          {errors.points_per_euro && (
            <p className="text-xs text-red-500 mt-1">{errors.points_per_euro}</p>
          )}
        </div>

        {/* Seuil de récompense */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
            <Trophy className="w-4 h-4" />
            Seuil de récompense (points)
          </label>
          <input
            type="number"
            min={10}
            value={data.reward_threshold}
            onChange={(e) =>
              onChange({ ...data, reward_threshold: parseInt(e.target.value) || 10 })
            }
            className="w-full rounded-xl glass-input px-3 py-2.5 text-sm text-slate-900"
          />
          {errors.reward_threshold && (
            <p className="text-xs text-red-500 mt-1">{errors.reward_threshold}</p>
          )}
        </div>

        {/* Description récompense */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
            <Gift className="w-4 h-4" />
            Récompense *
          </label>
          <input
            type="text"
            value={data.reward_description}
            onChange={(e) =>
              onChange({ ...data, reward_description: e.target.value })
            }
            placeholder="Ex : 1 Bowl offert, 1 café gratuit..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
          />
          {errors.reward_description && (
            <p className="text-xs text-red-500 mt-1">{errors.reward_description}</p>
          )}
        </div>

        {/* Bonus de bienvenue */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
            <Star className="w-4 h-4" />
            Bonus de bienvenue (points)
          </label>
          <input
            type="number"
            min={0}
            value={data.welcome_points}
            onChange={(e) =>
              onChange({ ...data, welcome_points: parseInt(e.target.value) || 0 })
            }
            className="w-full rounded-xl glass-input px-3 py-2.5 text-sm text-slate-900"
          />
          <p className="text-xs text-slate-400 mt-1">
            Points offerts automatiquement à l&apos;inscription (0 pour désactiver)
          </p>
        </div>
      </div>

      {/* Preview card */}
      <div className="rounded-xl bg-gradient-to-r from-orange-50/80 to-orange-100/60 backdrop-blur p-4 border border-orange-200/40">
        <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
          Aperçu pour vos clients
        </p>
        <p className="text-sm text-slate-700">
          🎉 Gagnez <strong>{data.points_per_euro} points</strong> par euro dépensé.
          {" "}À <strong>{data.reward_threshold} points</strong>, obtenez : <strong>{data.reward_description || "..."}</strong> !
          {data.welcome_points > 0 && (
            <> 🎁 <strong>{data.welcome_points} points</strong> offerts à l&apos;inscription.</>
          )}
        </p>
      </div>

      {errors.submit && (
        <p className="text-sm text-red-500">{errors.submit}</p>
      )}

      <div className="flex justify-between pt-2">
        <button
          onClick={onBack}
          className="px-6 py-2.5 glass-button-secondary rounded-xl text-sm"
        >
          Retour
        </button>
        <button
          onClick={handleSubmit}
          disabled={saving || slugStatus === "taken"}
          className="px-6 py-2.5 glass-button-primary rounded-xl text-sm flex items-center gap-2"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          Continuer
        </button>
      </div>
    </div>
  );
}
