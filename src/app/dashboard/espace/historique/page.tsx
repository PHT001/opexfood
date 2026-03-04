"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  ShoppingBag,
  Euro,
  Trophy,
  MessageCircle,
  Globe,
  Phone,
  MapPin,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  mockDailyRevenue,
  mockTopMenus,
  mockHistoryOrders,
  type HistoryOrder,
} from "@/lib/dashboard/crm-data";

const channelIcons: Record<string, React.ElementType> = {
  whatsapp: MessageCircle,
  web: Globe,
  telephone: Phone,
  surplace: MapPin,
};

const statusBadge: Record<
  HistoryOrder["status"],
  { label: string; color: string; bg: string }
> = {
  livree: { label: "Livrée", color: "text-green-700", bg: "bg-green-50/80" },
  annulee: { label: "Annulée", color: "text-red-700", bg: "bg-red-50/80" },
  remboursee: { label: "Remboursée", color: "text-amber-700", bg: "bg-amber-50/80" },
};

export default function HistoriquePage() {
  const [period, setPeriod] = useState<"semaine" | "mois">("semaine");

  const totalRevenue = mockDailyRevenue.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = mockDailyRevenue.reduce((s, d) => s + d.orders, 0);
  const avgOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const stats = [
    {
      label: "Chiffre d'affaires",
      value: `${totalRevenue.toLocaleString("fr-FR")} €`,
      icon: Euro,
      color: "text-green-600",
      bg: "bg-green-50/80",
    },
    {
      label: "Commandes",
      value: totalOrders.toString(),
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50/80",
    },
    {
      label: "Panier moyen",
      value: `${avgOrder.toFixed(1)} €`,
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-50/80",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Historique</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Analysez vos performances et votre historique de commandes
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="glass-card glass-card-hover rounded-xl p-4 flex items-center gap-4"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
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

      {/* Revenue chart */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900">
            Chiffre d&apos;affaires
          </h3>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPeriod("semaine")}
              className={cn(
                "text-xs px-3 py-1 rounded-full font-medium transition-colors",
                period === "semaine"
                  ? "bg-orange-500 text-white"
                  : "bg-white/50 text-slate-500 hover:bg-white/80"
              )}
            >
              Semaine
            </button>
            <button
              onClick={() => setPeriod("mois")}
              className={cn(
                "text-xs px-3 py-1 rounded-full font-medium transition-colors",
                period === "mois"
                  ? "bg-orange-500 text-white"
                  : "bg-white/50 text-slate-500 hover:bg-white/80"
              )}
            >
              Mois
            </button>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockDailyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v} €`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.5)",
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
                }}
                formatter={(value) => [
                  `${value} €`,
                  "Chiffre d'affaires",
                ]}
              />
              <Bar
                dataKey="revenue"
                fill="#ea580c"
                radius={[6, 6, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top menus */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-semibold text-slate-900">
            Top 5 des menus
          </h3>
        </div>
        <div className="space-y-3">
          {mockTopMenus.map((menu, i) => (
            <div
              key={menu.name}
              className="flex items-center gap-4"
            >
              <span
                className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 bg-orange-100 text-orange-700"
              >
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {menu.name}
                </p>
                <div className="mt-1 h-1.5 rounded-full bg-white/50 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-orange-500"
                    style={{
                      width: `${(menu.count / mockTopMenus[0].count) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-slate-900">
                  {menu.count} vendus
                </p>
                <p className="text-xs text-slate-400">
                  {menu.revenue.toLocaleString("fr-FR")} €
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order history table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/30">
          <h3 className="text-sm font-semibold text-slate-900">
            Historique des commandes
          </h3>
          <button className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-orange-600 transition-colors">
            <Download className="w-3.5 h-3.5" />
            Exporter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3 glass-table-header">
                  Commande
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3 glass-table-header">
                  Date
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3 glass-table-header">
                  Client
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3 glass-table-header">
                  Articles
                </th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3 glass-table-header">
                  Total
                </th>
                <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3 glass-table-header">
                  Canal
                </th>
                <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3 glass-table-header">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {mockHistoryOrders.map((order) => {
                const badge = statusBadge[order.status];
                const ChannelIcon = channelIcons[order.channel];
                return (
                  <tr
                    key={order.id}
                    className="border-b border-white/15 last:border-0 glass-table-row"
                  >
                    <td className="px-6 py-3 text-sm font-semibold text-slate-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-3 text-sm font-medium text-slate-700">
                      {order.customer}
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-500">
                      {order.items.join(", ")}
                    </td>
                    <td className="px-6 py-3 text-sm font-semibold text-slate-900 text-right">
                      {order.total.toFixed(2)} €
                    </td>
                    <td className="px-6 py-3 text-center">
                      {ChannelIcon && (
                        <ChannelIcon className="w-4 h-4 text-slate-400 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <span
                        className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold glass-badge",
                          badge.bg,
                          badge.color
                        )}
                      >
                        {badge.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
