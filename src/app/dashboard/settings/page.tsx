"use client";

import { useState } from "react";
import {
  Building2,
  MapPin,
  Phone,
  Camera,
  Palette,
  Save,
  Check,
} from "lucide-react";
import FileDropzone, {
  type UploadedFile,
} from "@/components/dashboard/onboarding/FileDropzone";

// Mock data (will come from Supabase later)
const initialData = {
  name: "Le Petit Bistro",
  address: "12 rue de la Paix, 75002 Paris",
  phone: "01 23 45 67 89",
  primaryColor: "#ea580c",
  secondaryColor: "#171717",
};

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

export default function SettingsPage() {
  const [name, setName] = useState(initialData.name);
  const [address, setAddress] = useState(initialData.address);
  const [phone, setPhone] = useState(initialData.phone);
  const [primaryColor, setPrimaryColor] = useState(initialData.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(
    initialData.secondaryColor
  );
  const [logoFiles, setLogoFiles] = useState<UploadedFile[]>([]);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Will save to Supabase later
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>
        <p className="text-sm text-slate-500 mt-1">
          Modifiez les informations et l&apos;apparence de votre restaurant.
        </p>
      </div>

      {/* Restaurant info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
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
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
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
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
            <Phone className="w-4 h-4" />
            Téléphone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
            <Camera className="w-4 h-4" />
            Logo
          </label>
          <FileDropzone
            files={logoFiles}
            onFilesAdded={(newFiles) =>
              setLogoFiles((prev) => [...prev, ...newFiles])
            }
            onFileRemoved={(id) =>
              setLogoFiles((prev) => prev.filter((f) => f.id !== id))
            }
            accept={{ "image/*": [".png", ".jpg", ".jpeg", ".svg", ".webp"] }}
            maxFiles={1}
            label="Glissez votre nouveau logo"
            hint="PNG, JPG, SVG — 5 Mo max"
          />
        </div>
      </div>

      {/* Brand */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
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
                      ? `0 0 0 2px white, 0 0 0 4px ${c.value}`
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
                      ? `0 0 0 2px white, 0 0 0 4px ${c.value}`
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
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500 mb-3 uppercase tracking-wide">
            Aperçu
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
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Enregistré !
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
