"use client";

import { useState } from "react";
import { Building2, MapPin, Phone, Palette, Loader2 } from "lucide-react";

export interface RestaurantInfoData {
  name: string;
  address: string;
  phone: string;
  primaryColor: string;
  secondaryColor: string;
}

interface StepRestaurantInfoProps {
  data: RestaurantInfoData;
  onChange: (data: RestaurantInfoData) => void;
  onNext: () => void;
}

const presetColors = [
  { label: "Orange", value: "#ea580c" },
  { label: "Rouge", value: "#dc2626" },
  { label: "Bleu", value: "#2563eb" },
  { label: "Vert", value: "#16a34a" },
  { label: "Violet", value: "#7c3aed" },
  { label: "Rose", value: "#db2777" },
  { label: "Noir", value: "#171717" },
  { label: "Marron", value: "#92400e" },
];

export default function StepRestaurantInfo({
  data,
  onChange,
  onNext,
}: StepRestaurantInfoProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};
    if (!data.name.trim()) newErrors.name = "Le nom est requis";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSaving(true);

    try {
      // Save restaurant info
      await fetch("/api/dashboard/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          address: data.address,
          phone: data.phone,
          primary_color: data.primaryColor,
          secondary_color: data.secondaryColor,
        }),
      });

      onNext();
    } catch {
      setErrors({ submit: "Erreur réseau" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Informations du restaurant
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Ces informations seront affichées à vos clients sur la page fidélité.
        </p>
      </div>

      <div className="space-y-4">
        {/* Nom */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
            <Building2 className="w-4 h-4" />
            Nom du restaurant *
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            placeholder="Ex : Le Petit Bistro"
            className="w-full rounded-xl glass-input px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Adresse */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
            <MapPin className="w-4 h-4" />
            Adresse
          </label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => onChange({ ...data, address: e.target.value })}
            placeholder="Ex : 12 rue de la Paix, 75002 Paris"
            className="w-full rounded-xl glass-input px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>

        {/* Téléphone */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
            <Phone className="w-4 h-4" />
            Téléphone
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            placeholder="Ex : 01 23 45 67 89"
            className="w-full rounded-xl glass-input px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>

        {/* Couleur principale */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
            <Palette className="w-4 h-4" />
            Couleur principale
          </label>
          <div className="flex flex-wrap gap-2">
            {presetColors.map((c) => (
              <button
                key={c.value}
                onClick={() => onChange({ ...data, primaryColor: c.value })}
                className="relative w-10 h-10 rounded-full border-2 transition-all"
                style={{
                  backgroundColor: c.value,
                  borderColor:
                    data.primaryColor === c.value ? c.value : "transparent",
                  boxShadow:
                    data.primaryColor === c.value
                      ? `0 0 0 2px white, 0 0 0 4px ${c.value}`
                      : "none",
                }}
                title={c.label}
              />
            ))}
            <label className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-orange-300 transition-colors overflow-hidden">
              <input
                type="color"
                value={data.primaryColor}
                onChange={(e) =>
                  onChange({ ...data, primaryColor: e.target.value })
                }
                className="absolute w-12 h-12 opacity-0 cursor-pointer"
              />
              <span className="text-xs text-slate-400 font-bold">+</span>
            </label>
          </div>
        </div>

        {/* Couleur secondaire */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
            <Palette className="w-4 h-4" />
            Couleur secondaire
          </label>
          <div className="flex flex-wrap gap-2">
            {presetColors.map((c) => (
              <button
                key={c.value}
                onClick={() => onChange({ ...data, secondaryColor: c.value })}
                className="relative w-10 h-10 rounded-full border-2 transition-all"
                style={{
                  backgroundColor: c.value,
                  borderColor:
                    data.secondaryColor === c.value ? c.value : "transparent",
                  boxShadow:
                    data.secondaryColor === c.value
                      ? `0 0 0 2px white, 0 0 0 4px ${c.value}`
                      : "none",
                }}
                title={c.label}
              />
            ))}
            <label className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-orange-300 transition-colors overflow-hidden">
              <input
                type="color"
                value={data.secondaryColor}
                onChange={(e) =>
                  onChange({ ...data, secondaryColor: e.target.value })
                }
                className="absolute w-12 h-12 opacity-0 cursor-pointer"
              />
              <span className="text-xs text-slate-400 font-bold">+</span>
            </label>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-xl bg-white/40 backdrop-blur p-4 border border-white/60">
        <p className="text-xs font-medium text-slate-500 mb-3 uppercase tracking-wide">
          Aperçu
        </p>
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl shadow-sm"
            style={{ backgroundColor: data.primaryColor }}
          />
          <div
            className="w-12 h-12 rounded-xl shadow-sm"
            style={{ backgroundColor: data.secondaryColor }}
          />
          <div className="flex-1 ml-2">
            <div
              className="h-3 rounded-full w-3/4 mb-2"
              style={{ backgroundColor: data.primaryColor, opacity: 0.8 }}
            />
            <div
              className="h-2 rounded-full w-1/2"
              style={{ backgroundColor: data.secondaryColor, opacity: 0.5 }}
            />
          </div>
        </div>
      </div>

      {errors.submit && (
        <p className="text-sm text-red-500">{errors.submit}</p>
      )}

      <div className="flex justify-end pt-2">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="px-6 py-2.5 glass-button-primary rounded-xl text-sm flex items-center gap-2"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          Continuer
        </button>
      </div>
    </div>
  );
}
