"use client";

import { useState } from "react";
import {
  Users,
  Search,
  Star,
  TrendingUp,
  Gift,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRestaurantTheme } from "@/components/dashboard/crm/ThemeProvider";
import { mockClients, loyaltyConfig, type Client } from "@/lib/dashboard/crm-data";

type SortKey = "name" | "points" | "visits" | "totalSpent";

export default function ClientsPage() {
  const { theme } = useRestaurantTheme();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("points");
  const [sortAsc, setSortAsc] = useState(false);

  const totalPoints = mockClients.reduce((s, c) => s + c.points, 0);
  const avgVisits =
    mockClients.length > 0
      ? mockClients.reduce((s, c) => s + c.visits, 0) / mockClients.length
      : 0;
  const totalRevenue = mockClients.reduce((s, c) => s + c.totalSpent, 0);

  const stats = [
    {
      label: "Clients inscrits",
      value: mockClients.length.toString(),
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Points distribués",
      value: totalPoints.toLocaleString("fr-FR"),
      icon: Star,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Visites moy.",
      value: avgVisits.toFixed(1),
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "CA fidélité",
      value: `${totalRevenue.toLocaleString("fr-FR")} €`,
      icon: Gift,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
  ];

  const filtered = mockClients
    .filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortAsc
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return null;
    return sortAsc ? (
      <ChevronUp className="w-3 h-3 ml-1 inline" />
    ) : (
      <ChevronDown className="w-3 h-3 ml-1 inline" />
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          Clients & Fidélité
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Gérez vos clients et leur programme de fidélité ({loyaltyConfig.pointsPerEuro} pts/€ — {loyaltyConfig.rewardDescription} à {loyaltyConfig.rewardThreshold} pts)
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                  s.bg
                )}
              >
                <Icon className={cn("w-5 h-5", s.color)} />
              </div>
              <div>
                <p className="text-xs text-slate-500">{s.label}</p>
                <p className="text-lg font-bold text-slate-900">{s.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search + table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400"
              style={{ "--tw-ring-color": theme.primaryLight } as React.CSSProperties}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                  <button
                    onClick={() => handleSort("name")}
                    className="hover:text-slate-700"
                  >
                    Client
                    <SortIcon col="name" />
                  </button>
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                  Contact
                </th>
                <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                  <button
                    onClick={() => handleSort("points")}
                    className="hover:text-slate-700"
                  >
                    Points
                    <SortIcon col="points" />
                  </button>
                </th>
                <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                  <button
                    onClick={() => handleSort("visits")}
                    className="hover:text-slate-700"
                  >
                    Visites
                    <SortIcon col="visits" />
                  </button>
                </th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                  <button
                    onClick={() => handleSort("totalSpent")}
                    className="hover:text-slate-700"
                  >
                    Total dépensé
                    <SortIcon col="totalSpent" />
                  </button>
                </th>
                <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                  Dernière visite
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((client) => {
                const progress = Math.min(
                  (client.points / loyaltyConfig.rewardThreshold) * 100,
                  100
                );
                const nearReward = client.points >= loyaltyConfig.rewardThreshold;
                return (
                  <tr
                    key={client.id}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: theme.primaryLight }}
                        >
                          <span className="text-xs font-bold" style={{ color: theme.primaryDark }}>
                            {client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-slate-900">
                          {client.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <p className="text-sm text-slate-700">{client.phone}</p>
                      <p className="text-xs text-slate-400">{client.email}</p>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex flex-col items-center gap-1">
                        <span
                          className={cn(
                            "text-sm font-bold",
                            nearReward
                              ? "text-green-600"
                              : "text-slate-900"
                          )}
                        >
                          {client.points}
                          {nearReward && (
                            <Gift className="w-3.5 h-3.5 inline ml-1 text-green-500" />
                          )}
                        </span>
                        <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: nearReward ? "#4ade80" : theme.primary,
                              width: `${progress}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <span className="text-sm font-semibold text-slate-900">
                        {client.visits}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <span className="text-sm font-semibold text-slate-900">
                        {client.totalSpent.toFixed(1)} €
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <span className="text-sm text-slate-500">
                        {client.lastVisit}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-sm text-slate-400"
                  >
                    Aucun client trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
