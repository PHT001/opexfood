"use client";

import { FileText } from "lucide-react";
import FileDropzone, { type UploadedFile } from "./FileDropzone";

export interface DocumentUploadData {
  menuFiles: UploadedFile[];
}

interface StepDocumentUploadProps {
  data: DocumentUploadData;
  onChange: (data: DocumentUploadData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepDocumentUpload({
  data,
  onChange,
  onNext,
  onBack,
}: StepDocumentUploadProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Documents du restaurant
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Uploadez votre menu pour que nous puissions configurer votre chatbot et
          votre agent IA vocal.
        </p>
      </div>

      <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
        <div className="flex gap-3">
          <FileText className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
          <div className="text-sm text-orange-800">
            <p className="font-medium">Pourquoi votre menu ?</p>
            <p className="mt-1 text-orange-700">
              Votre menu permet à l&apos;IA de répondre aux questions de vos
              clients, prendre les commandes et gérer les réservations avec
              précision.
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
          <FileText className="w-4 h-4" />
          Menu du restaurant
        </label>
        <FileDropzone
          files={data.menuFiles}
          onFilesAdded={(newFiles) =>
            onChange({
              ...data,
              menuFiles: [...data.menuFiles, ...newFiles],
            })
          }
          onFileRemoved={(id) =>
            onChange({
              ...data,
              menuFiles: data.menuFiles.filter((f) => f.id !== id),
            })
          }
          maxFiles={5}
          label="Glissez votre menu ici"
          hint="PDF ou images (PNG, JPG) — plusieurs fichiers possibles"
        />
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
          {data.menuFiles.length > 0 ? "Continuer" : "Passer cette étape"}
        </button>
      </div>
    </div>
  );
}
