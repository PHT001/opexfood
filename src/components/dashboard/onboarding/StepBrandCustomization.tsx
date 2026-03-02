"use client";

import { Palette } from "lucide-react";

export interface BrandData {
  primaryColor: string;
  secondaryColor: string;
}

interface StepBrandCustomizationProps {
  data: BrandData;
  onChange: (data: BrandData) => void;
  onNext: () => void;
  onBack: () => void;
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

export default function StepBrandCustomization({
  data,
  onChange,
  onNext,
  onBack,
}: StepBrandCustomizationProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Personnalisation</h2>
        <p className="text-sm text-slate-500 mt-1">
          Choisissez les couleurs de votre restaurant pour personnaliser votre
          interface client.
        </p>
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
          {/* Custom picker */}
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

      {/* Preview */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
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

      <div className="flex justify-between pt-2">
        <button
          onClick={onBack}
          className="px-6 py-2.5 border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors"
        >
          Retour
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Finaliser
        </button>
      </div>
    </div>
  );
}
