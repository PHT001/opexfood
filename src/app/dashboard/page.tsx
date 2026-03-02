"use client";

import OverviewStats from "@/components/dashboard/overview/OverviewStats";
import ActiveModules from "@/components/dashboard/overview/ActiveModules";
import Link from "next/link";
import { Plus, CreditCard, Settings } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Vue d&apos;ensemble</h1>
        <p className="text-sm text-slate-500 mt-1">
          Bienvenue sur votre espace OpexFood.
        </p>
      </div>

      {/* Stats */}
      <OverviewStats />

      {/* Quick actions */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">
          Actions rapides
        </h3>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/dashboard/modules"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-orange-200 bg-orange-50 text-sm font-medium text-orange-700 hover:bg-orange-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Ajouter un module
          </Link>
          <Link
            href="/dashboard/billing"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            Gérer l&apos;abonnement
          </Link>
          <Link
            href="/dashboard/settings"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Paramètres
          </Link>
        </div>
      </div>

      {/* Modules */}
      <ActiveModules />
    </div>
  );
}
