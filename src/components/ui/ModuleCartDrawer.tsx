"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModuleSelection } from "@/context/ModuleSelectionContext";
import { pricingModules } from "@/lib/constants";
import {
  X,
  ShoppingBag,
  MessageSquareMore,
  Gift,
  Phone,
  Sparkles,
  ArrowRight,
  Trash2,
  ChevronRight,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── style map (same order as pricingModules) ─── */
const moduleStyles = [
  { icon: MessageSquareMore, bg: "bg-orange-500", border: "border-orange-200", bgLight: "bg-orange-50" },
  { icon: Gift, bg: "bg-violet-500", border: "border-violet-200", bgLight: "bg-violet-50" },
  { icon: Phone, bg: "bg-emerald-500", border: "border-emerald-200", bgLight: "bg-emerald-50" },
];

const indexToModuleId = ["chatbot", "fidelite", "agent_vocal"] as const;

const parsePrice = (s: string) => parseInt(s.replace(/[^\d]/g, ""), 10);

const getPositionDiscount = (position: number) => {
  if (position === 1) return 10;
  if (position >= 2) return 15;
  return 0;
};

export default function ModuleCartDrawer() {
  const router = useRouter();
  const {
    selectedModules,
    removeModule,
    resetModules,
    isAnnual,
    drawerOpen,
    setDrawerOpen,
  } = useModuleSelection();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const hasSelection = selectedModules.length > 0;
  const allSelected = selectedModules.length === pricingModules.length;

  /* price calc */
  let total = 0;
  let fullTotal = 0;
  selectedModules.forEach((idx, position) => {
    const base = parsePrice(isAnnual ? pricingModules[idx].priceAnnual : pricingModules[idx].price);
    fullTotal += base;
    const disc = getPositionDiscount(position);
    total += Math.round(base * (1 - disc / 100));
  });
  const savings = fullTotal - total;

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const moduleIds = selectedModules.map((idx) => indexToModuleId[idx]);
      const billing = isAnnual ? "annual" : "monthly";
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleIds, billing }),
      });
      if (res.status === 401) {
        router.push("/signup");
        return;
      }
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      router.push("/signup");
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <>
      {/* ─── Floating trigger badge (visible when drawer closed + modules selected) ─── */}
      <AnimatePresence>
        {hasSelection && !drawerOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={() => setDrawerOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white pl-3.5 pr-4 py-3 rounded-full shadow-2xl hover:bg-slate-800 transition-colors"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span
                className="absolute -top-2 -right-2.5 w-4.5 h-4.5 rounded-full bg-orange-500 text-[10px] font-bold flex items-center justify-center"
              >
                {selectedModules.length}
              </span>
            </div>
            <span className="text-sm font-semibold">{total}€/mois</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Drawer overlay + panel ─── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white z-[60] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Votre sélection</h3>
                    <p className="text-[11px] text-slate-400">
                      {selectedModules.length === 0
                        ? "Aucun module"
                        : `${selectedModules.length} module${selectedModules.length > 1 ? "s" : ""}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-5 py-4">
                {!hasSelection ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                      <ShoppingBag className="w-7 h-7 text-slate-300" />
                    </div>
                    <p className="text-sm font-medium text-slate-500">Aucun module sélectionné</p>
                    <p className="text-xs text-slate-400 mt-1.5 max-w-[200px]">
                      Explorez les modules et ajoutez-les à votre sélection
                    </p>
                    <button
                      onClick={() => {
                        setDrawerOpen(false);
                        document.getElementById("tarifs")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="mt-4 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      Voir les modules →
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Discount banner */}
                    {selectedModules.length === 1 && (
                      <div className="rounded-xl bg-orange-50 border border-orange-200 px-4 py-3 flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-orange-500 shrink-0" />
                        <p className="text-xs text-orange-700 font-medium">
                          Ajoutez un 2e module et économisez <strong>-10%</strong>
                        </p>
                      </div>
                    )}
                    {selectedModules.length === 2 && (
                      <div className="rounded-xl bg-orange-50 border border-orange-200 px-4 py-3 flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-orange-500 shrink-0" />
                        <p className="text-xs text-orange-700 font-medium">
                          Ajoutez le dernier module pour <strong>-15%</strong> sur tout !
                        </p>
                      </div>
                    )}
                    {allSelected && (
                      <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-green-500 shrink-0" />
                        <p className="text-xs text-green-700 font-bold">
                          Pack Complet activé ! Vous économisez {savings}€/mois
                        </p>
                      </div>
                    )}

                    {/* Module cards */}
                    <AnimatePresence mode="popLayout">
                      {selectedModules.map((idx, position) => {
                        const tier = pricingModules[idx];
                        const s = moduleStyles[idx];
                        const Icon = s.icon;
                        const base = parsePrice(isAnnual ? tier.priceAnnual : tier.price);
                        const disc = getPositionDiscount(position);
                        const finalPrice = Math.round(base * (1 - disc / 100));

                        return (
                          <motion.div
                            key={idx}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 80 }}
                            transition={{ duration: 0.25 }}
                            className={`rounded-xl border ${s.border} ${s.bgLight} p-4`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-slate-900">{tier.name}</p>
                                  <div className="flex items-baseline gap-1.5 mt-0.5">
                                    {disc > 0 && (
                                      <span className="text-xs text-slate-400 line-through">
                                        {isAnnual ? tier.priceAnnual : tier.price}
                                      </span>
                                    )}
                                    <span className="text-lg font-bold text-slate-900">{finalPrice}€</span>
                                    <span className="text-xs text-slate-400">/mois</span>
                                    {disc > 0 && (
                                      <span className="text-[10px] font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full">
                                        -{disc}%
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => removeModule(idx)}
                                className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors group mt-1"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-500 transition-colors" />
                              </button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>

                    {/* Add more modules prompt */}
                    {!allSelected && (
                      <button
                        onClick={() => {
                          setDrawerOpen(false);
                          document.getElementById("tarifs")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="w-full rounded-xl border-2 border-dashed border-slate-200 p-4 text-center hover:border-orange-300 hover:bg-orange-50/50 transition-all group"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Plus className="w-4 h-4 text-slate-400 group-hover:text-orange-500 transition-colors" />
                          <p className="text-sm font-medium text-slate-400 group-hover:text-orange-600 transition-colors">
                            Ajouter un module
                          </p>
                        </div>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Footer with total + CTA */}
              {hasSelection && (
                <div className="border-t border-slate-100 px-5 py-5 bg-slate-50/80">
                  {/* Total row */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-500 font-medium">Total</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-slate-900">{total}€</span>
                      <span className="text-sm text-slate-400">/mois</span>
                    </div>
                  </div>

                  {savings > 0 && (
                    <div className="flex justify-end mb-2">
                      <span className="text-[11px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                        Économie : {savings}€/mois
                      </span>
                    </div>
                  )}

                  <p className="text-[10px] text-slate-400 text-center mb-3">
                    {isAnnual ? "Facturé annuellement" : "Sans engagement"} · Déployé en 48h
                  </p>

                  {/* Checkout button */}
                  <button
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold shadow-lg hover:shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {checkoutLoading ? "Chargement..." : "Procéder au paiement"}
                    {!checkoutLoading && <ArrowRight className="w-4 h-4" />}
                  </button>

                  {/* Reset link */}
                  <button
                    onClick={resetModules}
                    className="w-full mt-2.5 text-xs text-slate-400 hover:text-slate-600 transition-colors text-center py-1"
                  >
                    Réinitialiser la sélection
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
