"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { pricingModules } from "@/lib/constants";
import { useModuleSelection } from "@/context/ModuleSelectionContext";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import FloatingElements from "@/components/ui/FloatingElements";
import {
  Check,
  MessageSquareMore,
  Gift,
  Phone,
  CheckCircle2,
  Sparkles,
  Plus,
  ArrowRight,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ─── module style map ─── */
const moduleStyles = [
  {
    icon: MessageSquareMore,
    gradient: "from-orange-500 to-orange-600",
    checkColor: "text-orange-500",
    bg: "bg-orange-500",
  },
  {
    icon: Gift,
    gradient: "from-violet-500 to-purple-600",
    checkColor: "text-violet-500",
    bg: "bg-violet-500",
  },
  {
    icon: Phone,
    gradient: "from-emerald-500 to-teal-600",
    checkColor: "text-emerald-500",
    bg: "bg-emerald-500",
  },
];

/* ─── helpers ─── */
const parsePrice = (s: string) => parseInt(s.replace(/[^\d]/g, ""), 10);

const getPositionDiscount = (position: number) => {
  if (position === 1) return 10;
  if (position >= 2) return 15;
  return 0;
};

// Map pricing module index to Stripe module ID
const indexToModuleId = ["chatbot", "fidelite", "agent_vocal"] as const;

export default function PricingSection() {
  const router = useRouter();
  const {
    selectedModules,
    addModule,
    removeModule,
    toggleModule,
    isAnnual,
    setIsAnnual,
    justAdded,
  } = useModuleSelection();
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const MOBILE_VISIBLE_FEATURES = 3;

  /* ─── derived ─── */
  const hasSelection = selectedModules.length > 0;
  const allSelected = selectedModules.length === pricingModules.length;

  /* discount for a module that's NOT yet selected */
  const discountForAvailable = hasSelection
    ? selectedModules.length === 1
      ? 10
      : selectedModules.length === 2
        ? 15
        : 0
    : 0;

  /* ─── total price calc ─── */
  let total = 0;
  selectedModules.forEach((idx, position) => {
    const base = parsePrice(isAnnual ? pricingModules[idx].priceAnnual : pricingModules[idx].price);
    const disc = getPositionDiscount(position);
    total += Math.round(base * (1 - disc / 100));
  });

  /* ─── checkout handler ─── */
  const handleCheckout = async () => {
    if (checkoutLoading) return;
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
    <section id="tarifs" className="relative py-16 sm:py-20 overflow-hidden">
      <FloatingElements variant="pricing" />
      <Container>
        <SectionHeader
          label="TARIFS"
          title="3 modules, 1 seule plateforme"
          subtitle="Choisissez vos modules ou prenez les tous. Sans engagement."
        />

        {/* ─── Toggle mensuel / annuel ─── */}
        <div className="reveal mt-10 flex items-center justify-center gap-3">
          <span
            className={`text-sm font-medium transition-colors ${!isAnnual ? "text-slate-900" : "text-slate-400"}`}
          >
            Mensuel
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none"
            style={{ backgroundColor: isAnnual ? "#f97316" : "#cbd5e1" }}
          >
            <div
              className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300"
              style={{
                transform: isAnnual ? "translateX(28px)" : "translateX(0)",
              }}
            />
          </button>
          <span
            className={`text-sm font-medium transition-colors ${isAnnual ? "text-slate-900" : "text-slate-400"}`}
          >
            Annuel
          </span>
          {isAnnual && (
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full animate-[fadeSlideUp_0.3s_ease-out]">
              Jusqu&apos;à -34%
            </span>
          )}
        </div>

        {/* ─── 3 module cards ─── */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto items-stretch overflow-visible">
          {pricingModules.map((tier, index) => {
            const style = moduleStyles[index];
            const Icon = style.icon;
            const isSelected = selectedModules.includes(index);
            const isFirst = index === 0;

            /* price logic */
            const basePrice = parsePrice(
              isAnnual ? tier.priceAnnual : tier.price
            );
            const showDiscount =
              !isSelected && hasSelection && discountForAvailable > 0;
            const discountedPrice = showDiscount
              ? Math.round(basePrice * (1 - discountForAvailable / 100))
              : basePrice;

            return (
              <div
                key={tier.name}
                className={`reveal reveal-delay-1 relative bg-white rounded-2xl flex flex-col overflow-visible ${
                  isSelected
                    ? "border-2 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.15)]"
                    : showDiscount
                      ? "border-2 border-orange-400 shadow-[0_0_30px_rgba(249,115,22,0.15)]"
                      : tier.highlighted
                        ? "border-2 border-orange-400 shadow-[0_0_40px_rgba(249,115,22,0.15)]"
                        : "border border-slate-200 hover:shadow-lg"
                }`}
              >
                {/* Robot peek — only on Chatbot card & no selection */}
                {isFirst && !hasSelection && (
                  <div className="absolute -left-34 top-[38%] -translate-y-1/2 z-20 hidden lg:block pointer-events-none">
                    <Image
                      src="/robot-peek.png"
                      alt="Orbot"
                      width={220}
                      height={391}
                      className="drop-shadow-xl"
                    />
                  </div>
                )}

                {/* FOMO badge — only when no selection on highlighted */}
                {tier.highlighted && !hasSelection && (
                  <div className="absolute -top-3 right-4 z-10 bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Choisi par{" "}
                    <span className="text-green-400">68%</span> de nos clients
                  </div>
                )}

                {/* Discount badge */}
                <AnimatePresence>
                  {showDiscount && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute -top-3 left-4 z-10 bg-green-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />-{discountForAvailable}%
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Selected checkmark overlay (top-right) */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-3 right-3 z-10"
                    >
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-md">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* "Ajouté !" toast */}
                <AnimatePresence>
                  {justAdded === index && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="absolute top-14 left-1/2 -translate-x-1/2 z-20 bg-green-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Ajouté !
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Colored header */}
                <div
                  className={`relative bg-gradient-to-r ${style.gradient} px-5 py-4 md:px-6 md:py-5 flex items-center gap-3 rounded-t-2xl transition-opacity duration-300 ${
                    isSelected ? "opacity-60" : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-white leading-tight">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-white/70 mt-0.5">{tier.subtitle}</p>
                  </div>
                </div>

                {/* Body */}
                <div className={`p-5 md:p-6 flex flex-col flex-1 transition-opacity duration-300 ${isSelected ? "opacity-50" : ""}`}>
                  {/* Price */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-baseline gap-1">
                      {showDiscount && (
                        <span className="text-lg md:text-xl font-bold text-slate-300 line-through mr-1">
                          {isAnnual ? tier.priceAnnual : tier.price}
                        </span>
                      )}
                      <span className="text-3xl md:text-4xl font-bold text-slate-900 transition-all duration-300">
                        {showDiscount
                          ? `${discountedPrice}€`
                          : isAnnual
                            ? tier.priceAnnual
                            : tier.price}
                      </span>
                      <span className="text-sm md:text-base text-slate-400 font-medium">/mois</span>
                    </div>
                  </div>
                  <div className="h-5">
                    {isAnnual && (
                      <p className="text-xs text-slate-400 mt-1">
                        Facturé annuellement
                      </p>
                    )}
                  </div>

                  {/* Features — show first N on mobile, all on desktop */}
                  {(() => {
                    const isExpanded = expandedCards.includes(index);
                    const hasMore = tier.features.length > MOBILE_VISIBLE_FEATURES;
                    const hiddenCount = tier.features.length - MOBILE_VISIBLE_FEATURES;

                    return (
                      <>
                        <ul className="mt-4 md:mt-5 space-y-2 md:space-y-2.5 flex-1">
                          {tier.features.map((feature, i) => (
                            <li
                              key={i}
                              className={`flex items-start gap-2.5 ${
                                i >= MOBILE_VISIBLE_FEATURES && !isExpanded
                                  ? "hidden md:flex"
                                  : "flex"
                              }`}
                            >
                              <Check
                                className={`w-4 h-4 ${style.checkColor} mt-0.5 shrink-0`}
                              />
                              <span className="text-sm text-slate-600 leading-tight">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* "voir +" toggle — mobile only */}
                        {hasMore && (
                          <button
                            onClick={() =>
                              setExpandedCards((prev) =>
                                prev.includes(index)
                                  ? prev.filter((i) => i !== index)
                                  : [...prev, index]
                              )
                            }
                            className={`mt-2 text-xs font-semibold ${style.checkColor} hover:underline md:hidden`}
                          >
                            {isExpanded ? "voir moins ↑" : `voir + (${hiddenCount} avantages)`}
                          </button>
                        )}
                      </>
                    );
                  })()}

                  {/* Setup */}
                  {tier.setup && (
                    <div className="mt-4 rounded-lg bg-slate-50 px-3 py-2">
                      <span className="text-xs text-slate-400">
                        {tier.setup}
                      </span>
                    </div>
                  )}
                </div>

                {/* CTA — always full opacity */}
                <div className="px-5 pb-5 md:px-6 md:pb-6">
                  <AnimatePresence mode="wait">
                    {isSelected ? (
                      <motion.div
                        key="selected"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-2"
                      >
                        <button
                          onClick={handleCheckout}
                          disabled={checkoutLoading}
                          className="flex-1 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                        >
                          {checkoutLoading ? "..." : "Paiement"} <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeModule(index)}
                          className="w-12 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-400 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.button
                        key="add"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => addModule(index)}
                        className="w-full py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> Ajouter ce module
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── FOMO nudge ─── */}
        <AnimatePresence>
          {hasSelection && !allSelected && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 text-center text-sm font-medium text-orange-600"
            >
              <Sparkles className="w-4 h-4 inline mr-1 -mt-0.5" />
              {selectedModules.length === 1
                ? "Ajoutez un 2e module et économisez -10% !"
                : "Plus qu'un module pour le Pack Complet à -15% !"}
            </motion.p>
          )}
        </AnimatePresence>

        {/* ─── Checkout CTA bar ─── */}
        <AnimatePresence>
          {hasSelection && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-8 max-w-5xl mx-auto"
            >
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full rounded-xl bg-slate-900 p-5 flex items-center justify-between gap-4 hover:bg-slate-800 transition-colors group disabled:opacity-70"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {selectedModules.map((idx) => {
                      const s = moduleStyles[idx];
                      const MIcon = s.icon;
                      return (
                        <div
                          key={idx}
                          className={`w-8 h-8 rounded-full ${s.bg} flex items-center justify-center border-2 border-slate-900`}
                        >
                          <MIcon className="w-3.5 h-3.5 text-white" />
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">
                      {allSelected ? "Pack Complet" : `${selectedModules.length} module${selectedModules.length > 1 ? "s" : ""} sélectionné${selectedModules.length > 1 ? "s" : ""}`}
                      {" · "}
                      <span className="text-orange-400">{total}€/mois</span>
                    </p>
                    {allSelected && (
                      <p className="text-xs text-green-400 font-medium">
                        <Sparkles className="w-3 h-3 inline mr-1" />
                        Réduction maximale activée
                      </p>
                    )}
                  </div>
                </div>
                <span className="text-sm font-bold text-orange-400 group-hover:text-orange-300 transition-colors flex items-center gap-1.5">
                  {checkoutLoading ? "Chargement..." : "Procéder au paiement"}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
