"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  User,
  Star,
  Gift,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Loader2,
  PartyPopper,
} from "lucide-react";
import type { LoyaltyClient, LoyaltyConfig, ScanResponse, RedeemResponse } from "@/lib/loyalty/types";

interface ScanResultProps {
  client: LoyaltyClient;
  config: LoyaltyConfig;
  onReset: () => void;
  primaryColor: string;
}

type Step = "amount" | "confirming" | "success" | "redeemed";

export default function ScanResult({
  client,
  config,
  onReset,
  primaryColor,
}: ScanResultProps) {
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<ScanResponse | null>(null);
  const [redeemResult, setRedeemResult] = useState<RedeemResponse | null>(null);
  const [redeeming, setRedeeming] = useState(false);
  const autoResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const numericAmount = parseFloat(amount) || 0;
  const pointsPreview = Math.floor(numericAmount * config.points_per_euro);
  const progress = Math.min(
    (client.points / config.reward_threshold) * 100,
    100
  );

  const handleRedeemDirect = async () => {
    setRedeeming(true);
    setError("");

    try {
      const res = await fetch("/api/loyalty/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barcode: client.barcode }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur");
        setRedeeming(false);
        return;
      }

      setRedeemResult(data as RedeemResponse);
      setStep("redeemed");

      autoResetTimer.current = setTimeout(() => {
        onReset();
      }, 6000);
    } catch {
      setError("Erreur de connexion");
      setRedeeming(false);
    }
  };

  const handleDigit = (d: string) => {
    if (d === "." && amount.includes(".")) return;
    if (amount.includes(".") && amount.split(".")[1]?.length >= 2) return;
    setAmount((prev) => prev + d);
  };

  const handleDelete = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  const handleRedeem = async () => {
    if (!result) return;
    setRedeeming(true);
    setError("");

    // Cancel auto-reset
    if (autoResetTimer.current) {
      clearTimeout(autoResetTimer.current);
      autoResetTimer.current = null;
    }

    try {
      const res = await fetch("/api/loyalty/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barcode: client.barcode }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur");
        setRedeeming(false);
        return;
      }

      setRedeemResult(data as RedeemResponse);
      setStep("redeemed");

      // Auto-reset after 6 seconds
      autoResetTimer.current = setTimeout(() => {
        onReset();
      }, 6000);
    } catch {
      setError("Erreur de connexion");
      setRedeeming(false);
    }
  };

  const handleConfirm = async () => {
    if (numericAmount <= 0) return;
    setError("");
    setStep("confirming");

    try {
      const res = await fetch("/api/loyalty/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barcode: client.barcode, amount: numericAmount }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur");
        setStep("amount");
        return;
      }

      setResult(data as ScanResponse);
      setStep("success");

      // Auto-reset after 8 seconds (longer to allow redeem)
      autoResetTimer.current = setTimeout(() => {
        onReset();
      }, 8000);
    } catch {
      setError("Erreur de connexion");
      setStep("amount");
    }
  };

  // Redeemed view
  if (step === "redeemed" && redeemResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8 px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
          className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-4"
        >
          <PartyPopper className="w-8 h-8 text-violet-600" />
        </motion.div>

        <h3 className="text-lg font-bold text-slate-900">Récompense utilisée !</h3>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-3 bg-violet-50 rounded-xl px-4 py-3 border border-violet-200"
        >
          <Gift className="w-5 h-5 text-violet-500 mx-auto mb-1" />
          <p className="text-sm font-semibold text-violet-700">
            {redeemResult.reward_description}
          </p>
          <p className="text-xs text-violet-500 mt-1">
            -{redeemResult.points_deducted} points déduits
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

        <button
          onClick={onReset}
          className="mt-6 text-sm text-slate-400 hover:text-slate-600 transition-colors"
        >
          Scanner un autre client
        </button>
      </motion.div>
    );
  }

  if (step === "success" && result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8 px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
          className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </motion.div>

        <h3 className="text-lg font-bold text-slate-900">Points crédités !</h3>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 mt-3"
        >
          <Sparkles className="w-5 h-5" style={{ color: primaryColor }} />
          <span className="text-xl font-bold" style={{ color: primaryColor }}>
            +{result.points_earned} points
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-slate-500 mt-2"
        >
          Nouveau solde :{" "}
          <span className="font-bold text-slate-700">
            {result.new_balance} points
          </span>
        </motion.p>

        {result.reward_available && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-4"
          >
            <div className="bg-violet-50 rounded-xl px-4 py-3 border border-violet-200 mb-3">
              <Gift className="w-5 h-5 text-violet-500 mx-auto mb-1" />
              <p className="text-sm font-semibold text-violet-700">
                {config.reward_description} disponible !
              </p>
              <p className="text-xs text-violet-400 mt-1">
                {result.new_balance} / {config.reward_threshold} points
              </p>
            </div>

            {error && (
              <p className="text-xs text-red-500 mb-2">{error}</p>
            )}

            <button
              onClick={handleRedeem}
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

        <button
          onClick={onReset}
          className="mt-4 text-sm text-slate-400 hover:text-slate-600 transition-colors"
        >
          Scanner un autre client
        </button>
      </motion.div>
    );
  }

  return (
    <div className="p-4">
      {/* Back button */}
      <button
        onClick={onReset}
        className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 mb-4"
      >
        <ArrowLeft className="w-3 h-3" />
        Retour au scanner
      </button>

      {/* Client info */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${primaryColor}20` }}
          >
            <User className="w-5 h-5" style={{ color: primaryColor }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{client.name}</p>
            <p className="text-xs text-slate-500">
              {client.total_visits} visites • {client.barcode}
            </p>
          </div>
        </div>

        {/* Points + progress */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4" style={{ color: primaryColor }} />
            <span className="text-lg font-bold text-slate-900">
              {client.points} pts
            </span>
          </div>
          <span className="text-xs text-slate-400">
            {Math.max(0, config.reward_threshold - client.points)} pts restants
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              backgroundColor: primaryColor,
              width: `${progress}%`,
            }}
          />
        </div>

        {/* Reward available banner */}
        {client.points >= config.reward_threshold && (
          <div className="mt-3 bg-violet-50 rounded-lg px-3 py-2 border border-violet-200">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-4 h-4 text-violet-500" />
              <p className="text-xs font-semibold text-violet-700">
                {config.reward_description} disponible !
              </p>
            </div>
            <button
              onClick={handleRedeemDirect}
              disabled={redeeming}
              className="w-full py-2 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              {redeeming ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <Gift className="w-3.5 h-3.5" />
                  Utiliser la récompense
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Amount input */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
        <p className="text-xs text-slate-500 mb-2">Montant de la commande</p>
        <div className="text-center mb-3">
          <span className="text-3xl font-bold text-slate-900">
            {amount || "0"}
          </span>
          <span className="text-xl text-slate-400 ml-1">€</span>
        </div>

        {/* Points preview */}
        {numericAmount > 0 && (
          <div className="text-center mb-3 py-2 rounded-lg bg-green-50 border border-green-100">
            <span className="text-sm text-green-700">
              +{pointsPreview} points à gagner
            </span>
          </div>
        )}

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              onClick={() => handleDigit(String(n))}
              className="h-11 rounded-lg bg-slate-50 hover:bg-slate-100 text-base font-semibold text-slate-900 transition-colors"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => handleDigit(".")}
            className="h-11 rounded-lg bg-slate-50 hover:bg-slate-100 text-base font-semibold text-slate-900 transition-colors"
          >
            .
          </button>
          <button
            onClick={() => handleDigit("0")}
            className="h-11 rounded-lg bg-slate-50 hover:bg-slate-100 text-base font-semibold text-slate-900 transition-colors"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="h-11 rounded-lg bg-red-50 hover:bg-red-100 text-sm font-semibold text-red-500 transition-colors"
          >
            ←
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 text-center mb-3">{error}</p>
      )}

      {/* Confirm button */}
      <button
        onClick={handleConfirm}
        disabled={numericAmount <= 0 || step === "confirming"}
        className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{ backgroundColor: primaryColor }}
      >
        {step === "confirming" ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <CheckCircle2 className="w-4 h-4" />
            Créditer {pointsPreview} points
          </>
        )}
      </button>
    </div>
  );
}
