"use client";

import { CreditCard } from "lucide-react";
import { moduleDefinitions } from "@/lib/dashboard/constants";
import { getIcon } from "@/lib/dashboard/icons";

// Mock data (will come from Supabase later)
const activeModuleIds = ["chatbot", "agent_vocal"];
const billing: "monthly" | "annual" = "monthly";
const nextBillingDate = "1er avril 2026";

export default function CurrentPlan() {
  const activeModules = moduleDefinitions.filter((m) =>
    activeModuleIds.includes(m.id)
  );
  const total = activeModules.reduce(
    (sum, m) => sum + (billing === "annual" ? m.priceAnnual : m.priceMonthly),
    0
  );

  const handleManageSubscription = async () => {
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // Stripe portal not configured yet
      alert("Le portail Stripe n'est pas encore configuré.");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Plan actuel
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            {activeModules.length} module{activeModules.length > 1 ? "s" : ""}{" "}
            actif{activeModules.length > 1 ? "s" : ""} — facturation{" "}
            {billing === "annual" ? "annuelle" : "mensuelle"}
          </p>
        </div>
        <button
          onClick={handleManageSubscription}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
        >
          <CreditCard className="w-4 h-4" />
          Gérer l&apos;abonnement
        </button>
      </div>

      <div className="space-y-3">
        {activeModules.map((m) => {
          const Icon = getIcon(m.iconName);
          const price =
            billing === "annual" ? m.priceAnnual : m.priceMonthly;
          return (
            <div
              key={m.id}
              className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg ${m.colorBg} flex items-center justify-center`}
                >
                  <Icon className={`w-4 h-4 ${m.color}`} />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {m.name}
                </span>
              </div>
              <span className="text-sm font-semibold text-slate-900">
                {price} €/mois
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Total mensuel</p>
          <p className="text-xl font-bold text-slate-900">{total} €</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Prochaine facture</p>
          <p className="text-sm font-medium text-slate-700">
            {nextBillingDate}
          </p>
        </div>
      </div>
    </div>
  );
}
