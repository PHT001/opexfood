"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModuleSelection } from "@/context/ModuleSelectionContext";
import { pricingModules } from "@/lib/constants";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const indexToModuleId = ["chatbot", "fidelite", "agent_vocal"] as const;

const parsePrice = (s: string) => parseInt(s.replace(/[^\d]/g, ""), 10);

const getPositionDiscount = (position: number) => {
  if (position === 1) return 10;
  if (position >= 2) return 15;
  return 0;
};

export default function ModuleCartDrawer() {
  const router = useRouter();
  const { selectedModules, isAnnual } = useModuleSelection();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const hasSelection = selectedModules.length > 0;

  /* price calc */
  let total = 0;
  selectedModules.forEach((idx, position) => {
    const base = parsePrice(isAnnual ? pricingModules[idx].priceAnnual : pricingModules[idx].price);
    const disc = getPositionDiscount(position);
    total += Math.round(base * (1 - disc / 100));
  });

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
    <AnimatePresence>
      {hasSelection && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={handleCheckout}
          disabled={checkoutLoading}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white pl-3.5 pr-4 py-3 rounded-full shadow-2xl hover:bg-slate-800 transition-colors disabled:opacity-70"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2.5 w-4.5 h-4.5 rounded-full bg-orange-500 text-[10px] font-bold flex items-center justify-center">
              {selectedModules.length}
            </span>
          </div>
          <span className="text-sm font-semibold">
            {checkoutLoading ? "..." : `${total}€/mois`}
          </span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
