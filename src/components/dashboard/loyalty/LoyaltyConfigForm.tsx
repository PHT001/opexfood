"use client";

import { useState } from "react";
import { Save, Check } from "lucide-react";

interface LoyaltyConfigFormProps {
  initialConfig: {
    points_per_euro: number;
    reward_threshold: number;
    reward_description: string;
    welcome_points: number;
  };
  onSave?: (config: LoyaltyConfigFormProps["initialConfig"]) => void;
}

export default function LoyaltyConfigForm({ initialConfig, onSave }: LoyaltyConfigFormProps) {
  const [config, setConfig] = useState(initialConfig);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/loyalty/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        setSaved(true);
        onSave?.(config);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch {
      // TODO: error handling
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">
        Configuration fidélité
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-500 mb-1">Points par euro</label>
          <input
            type="number"
            min={1}
            max={100}
            value={config.points_per_euro}
            onChange={(e) => setConfig({ ...config, points_per_euro: Number(e.target.value) })}
            className="w-full px-3 py-2 text-sm rounded-xl glass-input"
          />
          <p className="text-xs text-slate-400 mt-1">
            Ex: 10 pts/€ = une commande de 15€ donne 150 points
          </p>
        </div>
        <div>
          <label className="block text-sm text-slate-500 mb-1">Seuil de récompense</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={10}
              value={config.reward_threshold}
              onChange={(e) => setConfig({ ...config, reward_threshold: Number(e.target.value) })}
              className="w-full px-3 py-2 text-sm rounded-xl glass-input"
              />
            <span className="text-sm text-slate-500 shrink-0">pts</span>
          </div>
        </div>
        <div>
          <label className="block text-sm text-slate-500 mb-1">Récompense</label>
          <input
            type="text"
            value={config.reward_description}
            onChange={(e) => setConfig({ ...config, reward_description: e.target.value })}
            placeholder="Ex: 1 Bowl offert"
            className="w-full px-3 py-2 text-sm rounded-xl glass-input"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-500 mb-1">Bonus de bienvenue</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              value={config.welcome_points}
              onChange={(e) => setConfig({ ...config, welcome_points: Number(e.target.value) })}
              className="w-full px-3 py-2 text-sm rounded-xl glass-input"
              />
            <span className="text-sm text-slate-500 shrink-0">pts</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Points offerts à l&apos;inscription (0 pour désactiver)
          </p>
        </div>
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-4 w-full py-2.5 rounded-xl glass-button-primary text-sm flex items-center justify-center gap-2"
      >
        {saved ? (
          <>
            <Check className="w-4 h-4" />
            Enregistré
          </>
        ) : saving ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Save className="w-4 h-4" />
            Enregistrer
          </>
        )}
      </button>
    </div>
  );
}
