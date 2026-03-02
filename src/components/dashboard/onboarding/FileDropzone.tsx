"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
}

interface FileDropzoneProps {
  files: UploadedFile[];
  onFilesAdded: (files: UploadedFile[]) => void;
  onFileRemoved: (id: string) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  label?: string;
  hint?: string;
}

export default function FileDropzone({
  files,
  onFilesAdded,
  onFileRemoved,
  accept = {
    "application/pdf": [".pdf"],
    "image/*": [".png", ".jpg", ".jpeg", ".webp"],
  },
  maxFiles = 10,
  label = "Glissez vos fichiers ici",
  hint = "PDF, PNG, JPG — 10 Mo max",
}: FileDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      }));
      onFilesAdded(newFiles);
    },
    [onFilesAdded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: maxFiles - files.length,
    maxSize: 10 * 1024 * 1024,
  });

  const getFileIcon = (file: File) => {
    if (file.type === "application/pdf") return FileText;
    if (file.type.startsWith("image/")) return ImageIcon;
    return FileText;
  };

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
          isDragActive
            ? "border-orange-400 bg-orange-50"
            : "border-slate-300 hover:border-orange-300 hover:bg-orange-50/50"
        )}
      >
        <input {...getInputProps()} />
        <Upload
          className={cn(
            "w-8 h-8 mx-auto mb-3 transition-colors",
            isDragActive ? "text-orange-500" : "text-slate-400"
          )}
        />
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="text-xs text-slate-500 mt-1">{hint}</p>
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f) => {
            const Icon = getFileIcon(f.file);
            return (
              <li
                key={f.id}
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2"
              >
                <Icon className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="text-sm text-slate-700 truncate flex-1">
                  {f.file.name}
                </span>
                <span className="text-xs text-slate-400 shrink-0">
                  {(f.file.size / 1024).toFixed(0)} Ko
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFileRemoved(f.id);
                  }}
                  className="p-1 hover:bg-slate-100 rounded transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
