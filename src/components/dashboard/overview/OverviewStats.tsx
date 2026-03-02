"use client";

import { Puzzle, CreditCard, CalendarClock, Activity } from "lucide-react";

interface StatCard {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const stats: StatCard[] = [
  {
    label: "Modules actifs",
    value: "2",
    sub: "sur 3 disponibles",
    icon: Puzzle,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    label: "Abonnement mensuel",
    value: "238 €",
    sub: "/mois",
    icon: CreditCard,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    label: "Prochaine facture",
    value: "1er Avr.",
    sub: "dans 31 jours",
    icon: CalendarClock,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    label: "Statut",
    value: "Actif",
    sub: "tout fonctionne",
    icon: Activity,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
];

export default function OverviewStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-4"
          >
            <div
              className={`w-10 h-10 rounded-lg ${s.bgColor} flex items-center justify-center shrink-0`}
            >
              <Icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">{s.label}</p>
              <p className="text-xl font-bold text-slate-900 mt-0.5">
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
