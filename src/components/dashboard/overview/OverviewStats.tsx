"use client";

import { Puzzle, CreditCard, CalendarClock, Activity } from "lucide-react";
import { useBilling } from "@/hooks/useBilling";
import { moduleDefinitions } from "@/lib/dashboard/constants";

export default function OverviewStats() {
  const { data, loading } = useBilling();

  const activeCount = data?.activeModules.length ?? 0;
  const status = data?.subscription?.status ?? "inactive";

  const activeModuleDefs = moduleDefinitions.filter((m) =>
    data?.activeModules.includes(m.id)
  );
  const total = activeModuleDefs.reduce((sum, m) => sum + m.priceMonthly, 0);

  const nextBilling = data?.subscription?.currentPeriodEnd
    ? new Date(data.subscription.currentPeriodEnd)
    : null;
  const nextBillingLabel = nextBilling
    ? nextBilling.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
    : "\u2014";
  const daysUntil = nextBilling
    ? Math.max(0, Math.ceil((nextBilling.getTime() - Date.now()) / 86400000))
    : null;

  const stats = [
    {
      label: "Modules actifs",
      value: loading ? "\u2026" : `${activeCount}`,
      sub: `sur ${moduleDefinitions.length} disponibles`,
      icon: Puzzle,
      color: "text-orange-600",
      bgGradient: "from-orange-100 to-orange-50",
    },
    {
      label: "Abonnement mensuel",
      value: loading ? "\u2026" : `${total} \u20AC`,
      sub: "/mois",
      icon: CreditCard,
      color: "text-emerald-600",
      bgGradient: "from-emerald-100 to-emerald-50",
    },
    {
      label: "Prochaine facture",
      value: loading ? "\u2026" : nextBillingLabel,
      sub: daysUntil !== null ? `dans ${daysUntil} jours` : "",
      icon: CalendarClock,
      color: "text-blue-600",
      bgGradient: "from-blue-100 to-blue-50",
    },
    {
      label: "Statut",
      value: loading
        ? "\u2026"
        : status === "active"
          ? "Actif"
          : status === "inactive"
            ? "Inactif"
            : status,
      sub:
        status === "active"
          ? "tout fonctionne"
          : status === "inactive"
            ? "aucun abonnement"
            : "",
      icon: Activity,
      color: status === "active" ? "text-green-600" : "text-slate-400",
      bgGradient: status === "active" ? "from-green-100 to-green-50" : "from-slate-100 to-slate-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="glass-card glass-card-hover rounded-2xl p-5 flex items-start gap-4"
          >
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.bgGradient} flex items-center justify-center shrink-0 shadow-inner`}
            >
              <Icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{s.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">
                {s.value}
                {s.sub && (
                  <span className="text-sm font-normal text-slate-400 ml-1">
                    {s.sub}
                  </span>
                )}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
