"use client";

import { CheckCircle2 } from "lucide-react";
import type { ModuleDefinition } from "@/lib/dashboard/constants";
import { getIcon } from "@/lib/dashboard/icons";

interface SubscribedModuleCardProps {
  module: ModuleDefinition;
  billing: "monthly" | "annual";
}

export default function SubscribedModuleCard({
  module: m,
  billing,
}: SubscribedModuleCardProps) {
  const Icon = getIcon(m.iconName);
  const price = billing === "annual" ? m.priceAnnual : m.priceMonthly;

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col border-l-4 border-l-orange-500">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/80 flex items-center justify-center shadow-sm">
            <Icon className={`w-6 h-6 ${m.color}`} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{m.name}</h3>
            <p className="text-xs text-slate-500">{m.description}</p>
          </div>
        </div>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100/80 text-green-700 glass-badge">
          Actif
        </span>
      </div>

      <ul className="space-y-2 flex-1">
        {m.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-5 pt-4 border-t border-white/40">
        <p className="text-sm text-slate-500">
          <span className="text-lg font-bold text-slate-900">{price} \u20AC</span>
          <span className="text-slate-400">
            /mois{billing === "annual" ? " (annuel)" : ""}
          </span>
        </p>
      </div>
    </div>
  );
}
