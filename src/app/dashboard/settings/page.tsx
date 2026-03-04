"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  MapPin,
  Phone,
  Palette,
  Save,
  Check,
  Loader2,
} from "lucide-react";

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

interface RestaurantSettings {
  name: string;
  address: string | null;
  phone: string | null;
  primary_color: string | null;
  secondary_color: string | null;
}

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#ea580c");
  const [secondaryColor, setSecondaryColor] = useState("#171717");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard/settings")
      .then((res) => res.json())
      .then((data: RestaurantSettings) => {
        setName(data.name || "");
        setAddress(data.address || "");
        setPhone(data.phone || "");
        setPrimaryColor(data.primary_color || "#ea580c");
        setSecondaryColor(data.secondary_color || "#171717");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/dashboard/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          address,
          phone,
          primary_color: primaryColor,
          secondary_color: secondaryColor,
        }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Parametres</h1>
        <p className="text-sm text-slate-500 mt-1">
          Modifiez les informations et l&apos;apparence de votre restaurant.
        </p>
      </div>

      {/* Restaurant info */}
      <div className="glass-card rounded-2xl p-6 space-y-5">
        <h2 className="text-base font-semibold text-slate-900">
          Informations du restaurant
        </h2>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
            <Building2 className="w-4 h-4" />
            Nom
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl glass-input px-3 py-2.5 text-sm text-slate-900"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
            <MapPin className="w-4 h-4" />
            Adresse
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="12 rue de la Paix, 75002 Paris"
            className="w-full rounded-xl glass-input px-3 py-2.5 text-sm text-slate-900"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
            <Phone className="w-4 h-4" />
            Telephone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="01 23 45 67 89"
            className="w-full rounded-xl glass-input px-3 py-2.5 text-sm text-slate-900"
          />
        </div>
      </div>

      {/* Brand */}
      <div className="glass-card rounded-2xl p-6 space-y-5">
        <h2 className="text-base font-semibold text-slate-900">
          Personnalisation visuelle
        </h2>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
            <Palette className="w-4 h-4" />
            Couleur principale
          </label>
          <div className="flex flex-wrap gap-2">
            {presetColors.map((c) => (
              <button
                key={c.value}
                onClick={() => setPrimaryColor(c.value)}
                className="w-9 h-9 rounded-full border-2 transition-all"
                style={{
                  backgroundColor: c.value,
                  borderColor:
                    primaryColor === c.value ? c.value : "transparent",
                  boxShadow:
                    primaryColor === c.value
                      ? `0 0 0 2px white, 0 0 0 4px ${c.value}, 0 4px 12px ${c.value}40`
                      : "none",
                }}
                title={c.label}
              />
            ))}
            <label className="w-9 h-9 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-orange-300 transition-colors overflow-hidden">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="absolute w-12 h-12 opacity-0 cursor-pointer"
              />
              <span className="text-xs text-slate-400 font-bold">+</span>
            </label>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
            <Palette className="w-4 h-4" />
            Couleur secondaire
          </label>
          <div className="flex flex-wrap gap-2">
            {presetColors.map((c) => (
              <button
                key={c.value}
                onClick={() => setSecondaryColor(c.value)}
                className="w-9 h-9 rounded-full border-2 transition-all"
                style={{
                  backgroundColor: c.value,
                  borderColor:
                    secondaryColor === c.value ? c.value : "transparent",
                  boxShadow:
                    secondaryColor === c.value
                      ? `0 0 0 2px white, 0 0 0 4px ${c.value}, 0 4px 12px ${c.value}40`
                      : "none",
                }}
                title={c.label}
              />
            ))}
            <label className="w-9 h-9 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-orange-300 transition-colors overflow-hidden">
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="absolute w-12 h-12 opacity-0 cursor-pointer"
              />
              <span className="text-xs text-slate-400 font-bold">+</span>
            </label>
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-xl bg-white/40 backdrop-blur p-4 border border-white/60">
          <p className="text-xs font-medium text-slate-500 mb-3 uppercase tracking-wide">
            Apercu
          </p>
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl shadow-sm"
              style={{ backgroundColor: primaryColor }}
            />
            <div
              className="w-10 h-10 rounded-xl shadow-sm"
              style={{ backgroundColor: secondaryColor }}
            />
            <div className="flex-1 ml-2">
              <div
                className="h-2.5 rounded-full w-3/4 mb-2"
                style={{ backgroundColor: primaryColor, opacity: 0.8 }}
              />
              <div
                className="h-2 rounded-full w-1/2"
                style={{ backgroundColor: secondaryColor, opacity: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="glass-button-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Enregistre !
            </>
          ) : saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Enregistrer
            </>
          )}
        </button>
      </div>
    </div>
  );
}
