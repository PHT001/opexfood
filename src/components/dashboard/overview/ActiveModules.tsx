"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { moduleDefinitions } from "@/lib/dashboard/constants";
import { getIcon } from "@/lib/dashboard/icons";
import { useBilling } from "@/hooks/useBilling";

export default function ActiveModules() {
  const { data } = useBilling();
  const activeModuleIds = data?.activeModules ?? [];

  const activeModules = moduleDefinitions.filter((m) =>
    activeModuleIds.includes(m.id)
  );
  const availableModules = moduleDefinitions.filter(
    (m) => !activeModuleIds.includes(m.id)
  );

  return (
    <div className="space-y-6">
      {/* Active */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">
          Modules actifs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activeModules.map((m) => {
            const Icon = getIcon(m.iconName);
            return (
              <div
                key={m.id}
                className={`rounded-xl border ${m.colorBorder} ${m.colorBg} p-4 flex items-start gap-3`}
              >
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className={`w-5 h-5 ${m.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    {m.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                    {m.description}
                  </p>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  Actif
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upsell teaser */}
      {availableModules.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-3">
            Modules disponibles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableModules.map((m) => {
              const Icon = getIcon(m.iconName);
              return (
                <Link
                  key={m.id}
                  href="/dashboard/modules"
                  className="rounded-xl border border-slate-200 bg-white p-4 flex items-start gap-3 hover:border-orange-300 hover:shadow-sm transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-orange-50 transition-colors">
                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">
                      {m.name}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      À partir de {m.priceAnnual} €/mois
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-orange-400 transition-colors shrink-0 mt-1" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
