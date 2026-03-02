"use client";

import { useState } from "react";
import { Building2, MapPin, Phone, Camera } from "lucide-react";
import FileDropzone, { type UploadedFile } from "./FileDropzone";

export interface RestaurantInfoData {
  name: string;
  address: string;
  phone: string;
  logoFiles: UploadedFile[];
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

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!data.name.trim()) newErrors.name = "Le nom est requis";
    if (!data.phone.trim()) newErrors.phone = "Le téléphone est requis";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Informations du restaurant
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Ces informations seront utilisées pour configurer votre espace.
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
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
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
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
          />
        </div>

        {/* Téléphone */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
            <Phone className="w-4 h-4" />
            Téléphone *
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            placeholder="Ex : 01 23 45 67 89"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Logo */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
            <Camera className="w-4 h-4" />
            Logo du restaurant
          </label>
          <FileDropzone
            files={data.logoFiles}
            onFilesAdded={(newFiles) =>
              onChange({ ...data, logoFiles: [...data.logoFiles, ...newFiles] })
            }
            onFileRemoved={(id) =>
              onChange({
                ...data,
                logoFiles: data.logoFiles.filter((f) => f.id !== id),
              })
            }
            accept={{ "image/*": [".png", ".jpg", ".jpeg", ".svg", ".webp"] }}
            maxFiles={1}
            label="Glissez votre logo ici"
            hint="PNG, JPG, SVG — 5 Mo max"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
