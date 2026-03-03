"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Star, Gift, Clock, TrendingUp, ArrowUp, ArrowDown, Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { generateQRCodeDataURL } from "@/lib/loyalty/barcode";
import type { LoyaltyClient, LoyaltyTransaction, LoyaltyConfig, LoyaltyPublicInfo } from "@/lib/loyalty/types";

export default function LoyaltyPassPage() {
  const params = useParams();
  const barcode = params.barcode as string;

  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [client, setClient] = useState<LoyaltyClient | null>(null);
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([]);
  const [config, setConfig] = useState<LoyaltyConfig | null>(null);
  const [info, setInfo] = useState<LoyaltyPublicInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const primaryColor = info?.primary_color ?? "#ea580c";

  useEffect(() => {
    // Fetch client data from API
    fetch(`/api/loyalty/clients/${barcode}`)
      .then((res) => {
        if (!res.ok) {
          setNotFound(true);
          setLoading(false);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setClient(data.client);
          setTransactions(data.transactions || []);
          setConfig(data.config);
          setInfo(data.restaurant);
        }
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });

    // Generate QR code for this barcode
    generateQRCodeDataURL(barcode, { width: 250 }).then(setQrDataUrl);
  }, [barcode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
      </div>
    );
  }

  if (notFound || !client || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-slate-500">Carte non trouvée</p>
      </div>
    );
  }

  const progress = Math.min((client.points / config.reward_threshold) * 100, 100);
  const pointsToReward = Math.max(config.reward_threshold - client.points, 0);
  const rewardAvailable = client.points >= config.reward_threshold;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Card */}
      <div
        className="pt-10 pb-8 px-6"
        style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)` }}
      >
        <div className="max-w-md mx-auto">
          {/* Restaurant name */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-lg font-bold text-white">{info?.restaurant_name ?? "Restaurant"}</h1>
              <p className="text-xs text-white/70">Carte de fidélité</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Client name */}
          <p className="text-sm text-white/80">{client.name}</p>

          {/* Points */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <p className="text-5xl font-bold text-white">{client.points}</p>
            <p className="text-sm text-white/70 mt-1">points</p>
          </motion.div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-white/70 mb-2">
              <span>Progression</span>
              <span>
                {rewardAvailable
                  ? "Récompense disponible !"
                  : `${pointsToReward} pts restants`}
              </span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-white/50 mt-1">
              <span>0</span>
              <span>{config.reward_threshold} pts = {config.reward_description}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reward banner */}
      {rewardAvailable && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-green-50 border-b border-green-200 px-6 py-4"
        >
          <div className="max-w-md mx-auto flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-green-800">
                {config.reward_description} disponible !
              </p>
              <p className="text-xs text-green-600">
                Présentez cette carte au comptoir
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* QR Code */}
      <div className="px-6 py-6 max-w-md mx-auto w-full">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
          <p className="text-sm font-medium text-slate-700 mb-4">
            Montrez ce code au comptoir
          </p>
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="QR Code fidélité"
              className="mx-auto w-48 h-48"
            />
          ) : (
            <div className="w-48 h-48 mx-auto bg-slate-100 rounded-xl animate-pulse" />
          )}
          <p className="text-xs text-slate-400 mt-3 font-mono">{barcode}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 max-w-md mx-auto w-full">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
            <TrendingUp className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-slate-900">{client.total_visits}</p>
            <p className="text-xs text-slate-500">visites</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
            <Star className="w-4 h-4 text-amber-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-slate-900">{client.points}</p>
            <p className="text-xs text-slate-500">points</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
            <Sparkles className="w-4 h-4 text-violet-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-slate-900">{client.total_spent.toFixed(0)}€</p>
            <p className="text-xs text-slate-500">dépensé</p>
          </div>
        </div>
      </div>

      {/* Transaction history */}
      <div className="px-6 py-6 max-w-md mx-auto w-full flex-1">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Historique</h3>
        {transactions.length > 0 ? (
          <div className="space-y-2">
            {transactions.map((txn) => (
              <div
                key={txn.id}
                className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      txn.type === "earn" || txn.type === "welcome"
                        ? "bg-green-50"
                        : "bg-red-50"
                    }`}
                  >
                    {txn.type === "earn" || txn.type === "welcome" ? (
                      <ArrowUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {txn.type === "welcome"
                        ? "Bonus de bienvenue"
                        : txn.type === "earn"
                          ? txn.description || `Achat ${txn.amount?.toFixed(2)}€`
                          : txn.type === "redeem"
                            ? txn.description || "Récompense utilisée"
                            : "Ajustement"}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(txn.created_at)} à {formatTime(txn.created_at)}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`text-sm font-bold ${
                    txn.points > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {txn.points > 0 ? "+" : ""}
                  {txn.points} pts
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 px-4 py-8 text-center">
            <Clock className="w-6 h-6 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-400">Aucune transaction pour le moment</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="py-4 px-6 text-center">
        <p className="text-xs text-slate-400">
          Propulsé par <span className="font-semibold text-slate-500">OpexFood</span>
        </p>
      </div>
    </div>
  );
}
