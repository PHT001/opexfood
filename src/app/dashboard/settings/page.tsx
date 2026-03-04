"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  MapPin,
  Phone,
  Save,
  Check,
  Loader2,
} from "lucide-react";

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
