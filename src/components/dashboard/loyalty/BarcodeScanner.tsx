"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Camera, XCircle, AlertCircle, RotateCcw } from "lucide-react";

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
  isActive: boolean;
}

export default function BarcodeScanner({
  onScan,
  onClose,
  isActive,
}: BarcodeScannerProps) {
  const scannerRef = useRef<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const onScanRef = useRef(onScan);
  onScanRef.current = onScan;

  const startScanner = useCallback(async () => {
    setError(null);
    setReady(false);

    try {
      const { Html5Qrcode } = await import("html5-qrcode");

      // Clean up any existing instance
      if (scannerRef.current) {
        try {
          await (scannerRef.current as { stop: () => Promise<void> }).stop();
        } catch {
          // ignore
        }
      }

      const scanner = new Html5Qrcode("barcode-scanner-region");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1,
        },
        (decodedText: string) => {
          if (decodedText.startsWith("OPX-")) {
            scanner.stop().catch(() => {});
            scannerRef.current = null;
            onScanRef.current(decodedText);
          }
        },
        () => {
          // Scan failure — normal during scanning, ignore
        }
      );

      setReady(true);
    } catch (err) {
      console.error("Scanner error:", err);
      setError(
        "Impossible d'accéder à la caméra. Vérifiez les permissions du navigateur."
      );
    }
  }, []);

  useEffect(() => {
    if (!isActive) return;

    startScanner();

    return () => {
      if (scannerRef.current) {
        const s = scannerRef.current as {
          stop: () => Promise<void>;
          isScanning?: boolean;
        };
        if (s.isScanning !== false) {
          s.stop().catch(() => {});
        }
        scannerRef.current = null;
      }
    };
  }, [isActive, startScanner]);

  if (!isActive) return null;

  return (
    <div className="relative bg-slate-900 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800">
        <div className="flex items-center gap-2 text-white">
          <Camera className="w-4 h-4" />
          <span className="text-sm font-medium">Scanner QR Code</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-slate-700 transition-colors"
        >
          <XCircle className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {/* Scanner area */}
      <div className="relative">
        <div id="barcode-scanner-region" className="w-full" />

        {!ready && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-slate-400">
                Activation de la caméra...
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-8 text-center">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <p className="text-sm text-red-300 mb-4">{error}</p>
            <button
              onClick={startScanner}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Réessayer
            </button>
          </div>
        )}
      </div>

      {/* Instructions */}
      {ready && (
        <div className="px-4 py-3 bg-slate-800 text-center">
          <p className="text-xs text-slate-400">
            Placez le QR code du client devant la caméra
          </p>
        </div>
      )}
    </div>
  );
}
