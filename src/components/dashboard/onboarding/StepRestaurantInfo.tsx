"use client";

import { useState } from "react";
import { Building2, MapPin, Phone, Loader2 } from "lucide-react";

export interface RestaurantInfoData {
  name: string;
  address: string;
  phone: string;
}

interface StepRestaurantInfoProps {
  data: RestaurantInfoData;
  onChange: (data: RestaurantInfoData) => void;
  onNext: () => void;
}

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
