"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift,
  Star,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Camera,
  Keyboard,
  Loader2,
  PartyPopper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import CounterQRCode from "@/components/dashboard/loyalty/CounterQRCode";
import LoyaltyConfigForm from "@/components/dashboard/loyalty/LoyaltyConfigForm";
import BarcodeScanner from "@/components/dashboard/loyalty/BarcodeScanner";
import ScanResult from "@/components/dashboard/loyalty/ScanResult";
import type { LoyaltyConfig, LoyaltyClient, RedeemResponse } from "@/lib/loyalty/types";

type Mode = "scanner" | "numpad";
type NumpadStep = "phone" | "confirm" | "success" | "redeemed";

export default function KiosquePage() {
  const [config, setConfig] = useState<LoyaltyConfig | null>(null);
  const [loading, setLoading] = useState(true);

  // Scanner state
  const [mode, setMode] = useState<Mode>("scanner");
  const [scannerActive, setScannerActive] = useState(false);
  const [scannedClient, setScannedClient] = useState<LoyaltyClient | null>(null);

  // Numpad state
  const [numpadStep, setNumpadStep] = useState<NumpadStep>("phone");
  const [phone, setPhone] = useState("");
  const [foundClient, setFoundClient] = useState<LoyaltyClient | null>(null);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [redeeming, setRedeeming] = useState(false);
  const [redeemResult, setRedeemResult] = useState<RedeemResponse | null>(null);
  const numpadResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch config on mount
  useEffect(() => {
    fetch("/api/loyalty/config")
      .then((r) => r.json())
      .then((data) => {
        if (data.config) setConfig(data.config);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Scanner handlers
  const handleScan = useCallback(async (barcode: string) => {
    setScannerActive(false);
    try {
      const res = await fetch(`/api/loyalty/clients/${barcode}`);
      if (!res.ok) return;
      const data = await res.json();
      setScannedClient(data.client);
    } catch (err) {
      console.error("Error fetching client:", err);
    }
  }, []);

  const handleScanReset = () => {
    setScannedClient(null);
    setScannerActive(true);
  };

  // Numpad handlers
  const handleDigit = (d: string) => {
    if (phone.length < 10) setPhone((prev) => prev + d);
  };

  const handleDelete = () => setPhone((prev) => prev.slice(0, -1));

  const handlePhoneSubmit = async () => {
    if (phone.length < 10) return;
    setLookupLoading(true);

    try {
      const res = await fetch("/api/loyalty/clients");
      if (!res.ok) {
        setNumpadStep("confirm");
        setFoundClient(null);
        setLookupLoading(false);
        return;
      }
      const data = await res.json();
      const normalizedPhone = phone;
      const match = (data.clients as LoyaltyClient[])?.find(
        (c) => c.phone.replace(/\s/g, "") === normalizedPhone
      );

      setFoundClient(match ?? null);
      const pts = Math.floor(15 * (config?.points_per_euro ?? 10));
      setEarnedPoints(pts);
      setNumpadStep("confirm");
    } catch {
      setNumpadStep("confirm");
    } finally {
      setLookupLoading(false);
    }
  };

  const handleConfirm = () => {
    setNumpadStep("success");
    numpadResetTimer.current = setTimeout(() => {
      handleNumpadReset();
    }, 8000);
  };

  const handleNumpadRedeem = async () => {
    if (!foundClient) return;
    setRedeeming(true);

    // Cancel auto-reset
    if (numpadResetTimer.current) {
      clearTimeout(numpadResetTimer.current);
      numpadResetTimer.current = null;
    }

    try {
      const res = await fetch("/api/loyalty/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barcode: foundClient.barcode }),
      });

      const data = await res.json();
      if (!res.ok) {
        setRedeeming(false);
        return;
      }

      setRedeemResult(data as RedeemResponse);
      setNumpadStep("redeemed");

      numpadResetTimer.current = setTimeout(() => {
        handleNumpadReset();
      }, 6000);
    } catch {
      setRedeeming(false);
    }
  };

  const handleNumpadReset = () => {
    if (numpadResetTimer.current) {
      clearTimeout(numpadResetTimer.current);
      numpadResetTimer.current = null;
    }
    setNumpadStep("phone");
    setPhone("");
    setFoundClient(null);
    setEarnedPoints(0);
    setRedeeming(false);
    setRedeemResult(null);
  };

  const formatPhone = (p: string) => p.replace(/(\d{2})(?=\d)/g, "$1 ");

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Kiosque Fidélité</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Scannez le QR code client ou entrez son numéro pour créditer des points
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Scanner / Numpad */}
        <div className="glass-card rounded-2xl p-6">
          {/* Mode toggle */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => {
                setMode("scanner");
                setScannerActive(true);
                setScannedClient(null);
              }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                mode === "scanner"
                  ? "bg-orange-500 text-white shadow-orange"
                  : "bg-white/50 text-slate-600 hover:bg-white/70"
              )}
            >
              <Camera className="w-3.5 h-3.5" />
              Scanner
            </button>
            <button
              onClick={() => {
                setMode("numpad");
                setScannerActive(false);
                setScannedClient(null);
                handleNumpadReset();
              }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                mode === "numpad"
                  ? "bg-orange-500 text-white shadow-orange"
                  : "bg-white/50 text-slate-600 hover:bg-white/70"
              )}
            >
              <Keyboard className="w-3.5 h-3.5" />
              Numéro
            </button>
          </div>

          {/* Scanner mode */}
          {mode === "scanner" && (
            <>
              {scannedClient && config ? (
                <ScanResult
                  client={scannedClient}
                  config={config}
                  onReset={handleScanReset}
                  primaryColor="#ea580c"
                />
              ) : (
                <BarcodeScanner
                  isActive={scannerActive}
                  onScan={handleScan}
                  onClose={() => setScannerActive(false)}
                />
              )}
              {!scannerActive && !scannedClient && (
                <button
                  onClick={() => setScannerActive(true)}
                  className="w-full mt-4 py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#ea580c" }}
                >
                  <Camera className="w-4 h-4" />
                  Activer le scanner
                </button>
              )}
            </>
          )}

          {/* Numpad mode */}
          {mode === "numpad" && (
            <div className="bg-slate-900 rounded-3xl p-4 max-w-sm mx-auto">
              <div className="bg-white rounded-2xl overflow-hidden min-h-[480px] flex flex-col">
                <AnimatePresence mode="wait">
                  {numpadStep === "phone" && (
                    <motion.div
                      key="phone"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex-1 flex flex-col p-6"
                    >
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mx-auto mb-3">
                          <Gift className="w-6 h-6 text-orange-500" />
                        </div>
                        <h4 className="text-base font-bold text-slate-900">
                          Programme Fidélité
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          Entrez le numéro du client
                        </p>
                      </div>

                      <div className="bg-slate-50 rounded-xl px-4 py-3 mb-4 text-center">
                        <p
                          className={cn(
                            "text-xl font-mono font-bold tracking-wider",
                            phone.length > 0 ? "text-slate-900" : "text-slate-300"
                          )}
                        >
                          {phone.length > 0 ? formatPhone(phone) : "06 XX XX XX XX"}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 flex-1">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                          <button
                            key={n}
                            onClick={() => handleDigit(String(n))}
                            className="h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-lg font-semibold text-slate-900 transition-colors"
                          >
                            {n}
                          </button>
                        ))}
                        <button
                          onClick={handleDelete}
                          className="h-12 rounded-xl bg-red-50 hover:bg-red-100 text-sm font-semibold text-red-500 transition-colors"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => handleDigit("0")}
                          className="h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-lg font-semibold text-slate-900 transition-colors"
                        >
                          0
                        </button>
                        <button
                          onClick={handlePhoneSubmit}
                          disabled={phone.length < 10 || lookupLoading}
                          className={cn(
                            "h-12 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center",
                            phone.length >= 10
                              ? "text-white"
                              : "bg-slate-100 text-slate-300 cursor-not-allowed"
                          )}
                          style={
                            phone.length >= 10
                              ? { backgroundColor: "#ea580c" }
                              : undefined
                          }
                        >
                          {lookupLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            "OK"
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {numpadStep === "confirm" && (
                    <motion.div
                      key="confirm"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex-1 flex flex-col p-6"
                    >
                      <button
                        onClick={handleNumpadReset}
                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 mb-4 self-start"
                      >
                        <ArrowLeft className="w-3 h-3" />
                        Retour
                      </button>

                      <div className="text-center flex-1 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                          <Star className="w-8 h-8 text-orange-500" />
                        </div>

                        {foundClient ? (
                          <>
                            <h4 className="text-lg font-bold text-slate-900">
                              Bonjour {foundClient.name.split(" ")[0]} !
                            </h4>
                            <p className="text-sm text-slate-500 mt-1">
                              Vous avez{" "}
                              <span className="font-bold text-orange-600">
                                {foundClient.points} points
                              </span>
                            </p>
                          </>
                        ) : (
                          <>
                            <h4 className="text-lg font-bold text-slate-900">
                              Bienvenue !
                            </h4>
                            <p className="text-sm text-slate-500 mt-1">
                              Nouveau client — créons votre carte
                            </p>
                          </>
                        )}

                        <div className="mt-6 bg-green-50 rounded-xl px-6 py-4 border border-green-200">
                          <p className="text-sm text-green-700">
                            Vous allez gagner
                          </p>
                          <p className="text-3xl font-bold text-green-600 mt-1">
                            +{earnedPoints} pts
                          </p>
                        </div>

                        <button
                          onClick={handleConfirm}
                          className="mt-6 w-full py-3 rounded-xl text-white font-semibold transition-colors"
                          style={{ backgroundColor: "#ea580c" }}
                        >
                          Confirmer
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {numpadStep === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex-1 flex flex-col items-center justify-center p-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                        className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6"
                      >
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                      </motion.div>

                      <h4 className="text-xl font-bold text-slate-900">Merci !</h4>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-2 mt-3"
                      >
                        <Sparkles className="w-5 h-5 text-orange-500" />
                        <span className="text-lg font-bold text-orange-600">
                          +{earnedPoints} points gagnés
                        </span>
                      </motion.div>

                      {foundClient && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="text-sm text-slate-500 mt-2"
                        >
                          Total :{" "}
                          <span className="font-bold text-slate-700">
                            {foundClient.points + earnedPoints} points
                          </span>
                        </motion.p>
                      )}

                      {foundClient &&
                        config &&
                        foundClient.points + earnedPoints >= config.reward_threshold && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="mt-4 w-full"
                          >
                            <div className="bg-violet-50 rounded-xl px-4 py-3 border border-violet-200 text-center mb-3">
                              <Gift className="w-5 h-5 text-violet-500 mx-auto mb-1" />
                              <p className="text-sm font-semibold text-violet-700">
                                {config.reward_description} disponible !
                              </p>
                            </div>
                            <button
                              onClick={handleNumpadRedeem}
                              disabled={redeeming}
                              className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                            >
                              {redeeming ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <>
                                  <Gift className="w-4 h-4" />
                                  Utiliser la récompense
                                </>
                              )}
                            </button>
                          </motion.div>
                        )}
                    </motion.div>
                  )}

                  {numpadStep === "redeemed" && redeemResult && (
                    <motion.div
                      key="redeemed"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex-1 flex flex-col items-center justify-center p-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                        className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center mb-6"
                      >
                        <PartyPopper className="w-10 h-10 text-violet-600" />
                      </motion.div>

                      <h4 className="text-xl font-bold text-slate-900">
                        Récompense utilisée !
                      </h4>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-3 bg-violet-50 rounded-xl px-4 py-3 border border-violet-200 text-center w-full"
                      >
                        <Gift className="w-5 h-5 text-violet-500 mx-auto mb-1" />
                        <p className="text-sm font-semibold text-violet-700">
                          {redeemResult.reward_description}
                        </p>
                        <p className="text-xs text-violet-400 mt-1">
                          -{redeemResult.points_deducted} points
                        </p>
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-sm text-slate-500 mt-3"
                      >
                        Nouveau solde :{" "}
                        <span className="font-bold text-slate-700">
                          {redeemResult.new_balance} points
                        </span>
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {/* Right: Config & QR */}
        <div className="space-y-6">
          {config && (
            <>
              <CounterQRCode slug={config.slug} />
              <LoyaltyConfigForm
                initialConfig={{
                  points_per_euro: config.points_per_euro,
                  reward_threshold: config.reward_threshold,
                  reward_description: config.reward_description,
                  welcome_points: config.welcome_points,
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
