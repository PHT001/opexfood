"use client";

import { useState } from "react";
import { CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import type { ModuleDefinition } from "@/lib/dashboard/constants";
import { getIcon } from "@/lib/dashboard/icons";

interface AvailableModuleCardProps {
  module: ModuleDefinition;
}

export default function AvailableModuleCard({
  module: m,
}: AvailableModuleCardProps) {
  const Icon = getIcon(m.iconName);
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const [loading, setLoading] = useState(false);
  const price = billing === "annual" ? m.priceAnnual : m.priceMonthly;

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleIds: [m.id],
          billing,
          successUrl: `${window.location.origin}/dashboard/modules?success=1`,
          cancelUrl: `${window.location.origin}/dashboard/modules`,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Erreur lors de la souscription");
      }
    } catch {
      alert("Erreur reseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col">
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-11 h-11 rounded-xl ${m.colorBg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${m.color}`} />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">{m.name}</h3>
          <p className="text-xs text-slate-500">{m.description}</p>
        </div>
      </div>

      <ul className="space-y-2 flex-1">
        {m.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2 text-sm text-slate-600"
          >
            <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-5 pt-4 border-t border-white/40">
        {/* Billing toggle — glass style */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex bg-white/50 backdrop-blur rounded-lg p-0.5">
            <button
              onClick={() => setBilling("monthly")}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                billing === "monthly"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                billing === "annual"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Annuel
            </button>
          </div>
          {billing === "annual" && (
            <span className="text-xs text-green-600 font-medium">
              -{Math.round(((m.priceMonthly - m.priceAnnual) / m.priceMonthly) * 100)}%
            </span>
          )}
        </div>

        <p className="text-sm text-slate-500 mb-3">
          <span className="text-lg font-bold text-slate-900">{price} \u20AC</span>
          <span className="text-slate-400">/mois</span>
        </p>

        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full py-2.5 rounded-xl glass-button-primary text-sm flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {loading ? "Redirection\u2026" : "Ajouter ce module"}
        </button>
      </div>
    </div>
  );
}
