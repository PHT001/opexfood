"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  QrCode,
  Gift,
  Star,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRestaurantTheme } from "@/components/dashboard/crm/ThemeProvider";
import { mockClients, loyaltyConfig } from "@/lib/dashboard/crm-data";

type KiosqueStep = "phone" | "confirm" | "success";

export default function KiosquePage() {
  const { theme } = useRestaurantTheme();
  const [step, setStep] = useState<KiosqueStep>("phone");
  const [phone, setPhone] = useState("");
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [foundClient, setFoundClient] = useState<(typeof mockClients)[0] | null>(null);

  const handleDigit = (d: string) => {
    if (phone.length < 10) {
      setPhone((prev) => prev + d);
    }
  };

  const handleDelete = () => {
    setPhone((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    // Simulate finding a client by phone
    const formatted = phone.replace(/(\d{2})(?=\d)/g, "$1 ");
    const client = mockClients.find((c) => c.phone.replace(/\s/g, "") === phone);

    if (client) {
      setFoundClient(client);
      const points = Math.floor(15 * loyaltyConfig.pointsPerEuro); // Simulate 15€ order
      setEarnedPoints(points);
      setStep("confirm");
    } else {
      // New client
      setFoundClient(null);
      const points = Math.floor(15 * loyaltyConfig.pointsPerEuro);
      setEarnedPoints(points);
      setStep("confirm");
    }
  };

  const handleConfirm = () => {
    setStep("success");
    // Auto-reset after 4 seconds
    setTimeout(() => {
      setStep("phone");
      setPhone("");
      setFoundClient(null);
      setEarnedPoints(0);
    }, 4000);
  };

  const handleReset = () => {
    setStep("phone");
    setPhone("");
    setFoundClient(null);
    setEarnedPoints(0);
  };

  const formatPhone = (p: string) => {
    return p.replace(/(\d{2})(?=\d)/g, "$1 ");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Kiosque Fidélité</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Interface tactile pour le comptoir — vos clients cumulent des points à
          chaque visite
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Kiosque preview */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-semibold text-slate-900">
              Aperçu Kiosque
            </h3>
          </div>

          {/* Kiosque device frame */}
          <div className="bg-slate-900 rounded-3xl p-4 max-w-sm mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden min-h-[480px] flex flex-col">
              <AnimatePresence mode="wait">
                {step === "phone" && (
                  <motion.div
                    key="phone"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1 flex flex-col p-6"
                  >
                    {/* Header */}
                    <div className="text-center mb-6">
                      <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mx-auto mb-3">
                        <Gift className="w-6 h-6 text-orange-500" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900">
                        Programme Fidélité
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Entrez votre numéro pour cumuler vos points
                      </p>
                    </div>

                    {/* Phone display */}
                    <div className="bg-slate-50 rounded-xl px-4 py-3 mb-4 text-center">
                      <p
                        className={cn(
                          "text-xl font-mono font-bold tracking-wider",
                          phone.length > 0
                            ? "text-slate-900"
                            : "text-slate-300"
                        )}
                      >
                        {phone.length > 0
                          ? formatPhone(phone)
                          : "06 XX XX XX XX"}
                      </p>
                    </div>

                    {/* Numpad */}
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
                        onClick={handleSubmit}
                        disabled={phone.length < 10}
                        className={cn(
                          "h-12 rounded-xl text-sm font-semibold transition-colors",
                          phone.length >= 10
                            ? "text-white"
                            : "bg-slate-100 text-slate-300 cursor-not-allowed"
                        )}
                        style={phone.length >= 10 ? { backgroundColor: theme.primary } : undefined}
                      >
                        OK
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === "confirm" && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1 flex flex-col p-6"
                  >
                    <button
                      onClick={handleReset}
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
                        style={{ backgroundColor: theme.primary }}
                      >
                        Confirmer
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === "success" && (
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
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        delay: 0.2,
                      }}
                      className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </motion.div>

                    <h4 className="text-xl font-bold text-slate-900">
                      Merci !
                    </h4>

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
                      foundClient.points + earnedPoints >=
                        loyaltyConfig.rewardThreshold && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                          className="mt-4 bg-violet-50 rounded-xl px-4 py-3 border border-violet-200 text-center"
                        >
                          <Gift className="w-5 h-5 text-violet-500 mx-auto mb-1" />
                          <p className="text-sm font-semibold text-violet-700">
                            {loyaltyConfig.rewardDescription} disponible !
                          </p>
                        </motion.div>
                      )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right: Config & QR */}
        <div className="space-y-6">
          {/* QR Code section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <QrCode className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-semibold text-slate-900">
                QR Code Comptoir
              </h3>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              Imprimez ce QR code et placez-le sur votre comptoir. Vos clients
              peuvent scanner pour accéder au programme fidélité directement.
            </p>
            <div className="bg-slate-50 rounded-xl p-8 flex items-center justify-center">
              <div className="w-40 h-40 bg-white rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">QR Code</p>
                  <p className="text-xs text-slate-400">généré à la config</p>
                </div>
              </div>
            </div>
            <button className="mt-4 w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm font-medium text-slate-700 transition-colors">
              Télécharger le QR Code
            </button>
          </div>

          {/* Loyalty config summary */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              Configuration fidélité
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-500">Points par euro</span>
                <span className="text-sm font-semibold text-slate-900">
                  {loyaltyConfig.pointsPerEuro} pts/€
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-500">Seuil récompense</span>
                <span className="text-sm font-semibold text-slate-900">
                  {loyaltyConfig.rewardThreshold} pts
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-slate-500">Récompense</span>
                <span className="text-sm font-semibold text-orange-600">
                  {loyaltyConfig.rewardDescription}
                </span>
              </div>
            </div>
            <button className="mt-4 w-full py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-sm font-medium text-slate-700 transition-colors">
              Modifier la configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
