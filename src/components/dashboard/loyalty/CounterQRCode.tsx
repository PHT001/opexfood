"use client";

import { useState, useEffect } from "react";
import { QrCode, Download, ExternalLink, Copy, Check } from "lucide-react";
import { generateQRCodeDataURL, generateQRCodeSVG } from "@/lib/loyalty/barcode";

interface CounterQRCodeProps {
  slug: string;
}

export default function CounterQRCode({ slug }: CounterQRCodeProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const inscriptionUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/loyalty/${slug}`;

  useEffect(() => {
    if (!inscriptionUrl) return;
    generateQRCodeDataURL(inscriptionUrl, { width: 400 }).then(setQrDataUrl);
  }, [inscriptionUrl]);

  const handleDownloadSVG = async () => {
    const svg = await generateQRCodeSVG(inscriptionUrl, { width: 800 });
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `qr-fidelite-${slug}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPNG = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `qr-fidelite-${slug}.png`;
    a.click();
  };

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(inscriptionUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <QrCode className="w-4 h-4 text-slate-400" />
        <h3 className="text-sm font-semibold text-slate-900">
          QR Code Comptoir
        </h3>
      </div>
      <p className="text-sm text-slate-500 mb-4">
        Imprimez ce QR code et placez-le sur votre comptoir. Vos clients
        scannent pour s&apos;inscrire au programme fidélité.
      </p>

      {/* QR Code display */}
      <div className="bg-slate-50 rounded-xl p-6 flex items-center justify-center">
        {qrDataUrl ? (
          <img
            src={qrDataUrl}
            alt="QR Code fidélité"
            className="w-48 h-48"
          />
        ) : (
          <div className="w-48 h-48 bg-slate-100 rounded-xl animate-pulse" />
        )}
      </div>

      {/* URL display */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1 bg-slate-50 rounded-lg px-3 py-2 text-xs text-slate-500 font-mono truncate">
          {inscriptionUrl}
        </div>
        <button
          onClick={handleCopyUrl}
          className="shrink-0 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
          title="Copier le lien"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-slate-500" />
          )}
        </button>
        <a
          href={inscriptionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
          title="Ouvrir dans un nouvel onglet"
        >
          <ExternalLink className="w-4 h-4 text-slate-500" />
        </a>
      </div>

      {/* Download buttons */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          onClick={handleDownloadSVG}
          className="py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm font-medium text-slate-700 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          SVG (print)
        </button>
        <button
          onClick={handleDownloadPNG}
          className="py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm font-medium text-slate-700 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          PNG (web)
        </button>
      </div>
    </div>
  );
}
