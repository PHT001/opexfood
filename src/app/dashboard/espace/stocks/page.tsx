"use client";

import { useState } from "react";
import { AlertTriangle, Package, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockStockCategories, type StockItem } from "@/lib/dashboard/crm-data";

const statusConfig = {
  ok: { label: "OK", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
  low: { label: "Bas", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  critical: { label: "Critique", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
};

export default function StocksPage() {
  const [categories, setCategories] = useState(mockStockCategories);
  const [activeCategory, setActiveCategory] = useState(categories[0].name);

  const activeItems = categories.find((c) => c.name === activeCategory)?.items ?? [];

  const totalAlerts = categories.reduce(
    (sum, cat) =>
      sum + cat.items.filter((i) => i.status === "low" || i.status === "critical").length,
    0
  );

  const adjustQuantity = (itemId: string, delta: number) => {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        items: cat.items.map((item) => {
          if (item.id !== itemId) return item;
          const newQty = Math.max(0, item.quantity + delta);
          const newStatus: StockItem["status"] =
            newQty <= item.min * 0.5 ? "critical" : newQty <= item.min ? "low" : "ok";
          return { ...item, quantity: newQty, status: newStatus };
        }),
      }))
    );
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Gestion des Stocks</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Suivez vos ingrédients en temps réel
          </p>
        </div>
        {totalAlerts > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50/80 border border-amber-200/60 glass-badge">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-700">
              {totalAlerts} alerte{totalAlerts > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-6">
        {categories.map((cat) => {
          const alerts = cat.items.filter(
            (i) => i.status === "low" || i.status === "critical"
          ).length;
          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-all",
                activeCategory === cat.name
                  ? "glass-tab-active"
                  : "glass-tab text-slate-600"
              )}
            >
              {cat.name}
              {alerts > 0 && (
                <span
                  className={cn(
                    "w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center",
                    activeCategory === cat.name
                      ? "bg-amber-400 text-slate-900"
                      : "bg-amber-100 text-amber-700"
                  )}
                >
                  {alerts}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Stock items table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/30">
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3 glass-table-header">
                Ingrédient
              </th>
              <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3 glass-table-header">
                Quantité
              </th>
              <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3 glass-table-header">
                Min. requis
              </th>
              <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3 glass-table-header">
                Statut
              </th>
              <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3 glass-table-header">
                Ajuster
              </th>
            </tr>
          </thead>
          <tbody>
            {activeItems.map((item) => {
              const status = statusConfig[item.status];
              return (
                <tr
                  key={item.id}
                  className={cn(
                    "border-b border-white/20 last:border-0 glass-table-row",
                    item.status === "critical" && "bg-red-50/30"
                  )}
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-900">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span className="text-sm font-semibold text-slate-900">
                      {item.quantity} {item.unit}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span className="text-sm text-slate-400">
                      {item.min} {item.unit}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
                        status.bg,
                        status.color,
                        "border",
                        status.border
                      )}
                    >
                      {item.status === "critical" && (
                        <AlertTriangle className="w-3 h-3 mr-1" />
                      )}
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => adjustQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-lg bg-white/50 hover:bg-white/80 flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5 text-slate-600" />
                      </button>
                      <button
                        onClick={() => adjustQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-lg bg-white/50 hover:bg-white/80 flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5 text-slate-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
