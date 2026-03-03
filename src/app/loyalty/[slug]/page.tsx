"use client";

import { useState } from "react";
import { Gift, Star, ArrowRight, CheckCircle2, Sparkles, User, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";

type Step = "form" | "success";

export default function LoyaltyInscriptionPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [clientData, setClientData] = useState<{
    barcode: string;
    points: number;
    existing: boolean;
    welcome_points: number;
  } | null>(null);

  // TODO: Fetch restaurant info (name, logo, colors) from API by slug
  // For now, using defaults
  const restaurantName = "Bowl & Go";
  const primaryColor = "#ea580c";

  const formatPhoneInput = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    return digits.replace(/(\d{2})(?=\d)/g, "$1 ");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneInput(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("Numéro de téléphone invalide");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/loyalty/inscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name: name.trim(), phone: digits }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Une erreur est survenue");
        setLoading(false);
        return;
      }

      setClientData({
        barcode: data.client.barcode,
        points: data.client.points,
        existing: data.existing,
        welcome_points: data.welcome_points || 0,
      });
      setStep("success");
    } catch {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const goToPass = () => {
    if (clientData) {
      router.push(`/loyalty/${slug}/pass/${clientData.barcode}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div
        className="pt-12 pb-8 px-6 text-center"
        style={{ background: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}05)` }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: `${primaryColor}20` }}
        >
          <Gift className="w-8 h-8" style={{ color: primaryColor }} />
        </div>
        <h1 className="text-xl font-bold text-slate-900">{restaurantName}</h1>
        <p className="text-sm text-slate-500 mt-1">Programme de Fidélité</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Benefits */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6">
                <h2 className="text-sm font-semibold text-slate-900 mb-3">
                  Vos avantages
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">10 points par euro</p>
                      <p className="text-xs text-slate-500">Cumulez à chaque visite</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                      <Gift className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">1 Bowl offert à 500 pts</p>
                      <p className="text-xs text-slate-500">Récompense automatique</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-violet-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">50 points offerts</p>
                      <p className="text-xs text-slate-500">Bonus d&apos;inscription</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Votre prénom
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Marie"
                      className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ "--tw-ring-color": `${primaryColor}40` } as React.CSSProperties}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Numéro de téléphone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="06 12 34 56 78"
                      className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ "--tw-ring-color": `${primaryColor}40` } as React.CSSProperties}
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || !name.trim() || phone.replace(/\D/g, "").length < 10}
                  className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ backgroundColor: primaryColor }}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Rejoindre le programme
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-slate-400 text-center mt-4">
                En vous inscrivant, vous acceptez de recevoir des notifications liées à votre fidélité.
              </p>
            </motion.div>
          )}

          {step === "success" && clientData && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </motion.div>

              <h2 className="text-xl font-bold text-slate-900">
                {clientData.existing ? "Bon retour !" : "Bienvenue !"}
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                {clientData.existing
                  ? "Votre carte de fidélité est déjà active."
                  : `Votre compte est créé avec ${clientData.welcome_points} points offerts !`}
              </p>

              {/* Points display */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 bg-white rounded-2xl border border-slate-200 p-6"
              >
                <p className="text-sm text-slate-500">Vos points</p>
                <p className="text-4xl font-bold mt-1" style={{ color: primaryColor }}>
                  {clientData.points}
                </p>
                <p className="text-xs text-slate-400 mt-1">pts</p>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 space-y-3"
              >
                {/* PWA Pass button */}
                <button
                  onClick={goToPass}
                  className="w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Star className="w-4 h-4" />
                  Voir ma carte fidélité
                </button>

                {/* Apple Wallet - Phase 2 */}
                <button
                  disabled
                  className="w-full py-3.5 rounded-xl bg-black text-white font-semibold text-sm flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
                >
                  Ajouter à Apple Wallet
                  <span className="text-xs opacity-60">(bientôt)</span>
                </button>

                {/* Google Wallet - Phase 3 */}
                <button
                  disabled
                  className="w-full py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
                >
                  Ajouter à Google Wallet
                  <span className="text-xs opacity-60">(bientôt)</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
