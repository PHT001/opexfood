"use client";

import { useState } from "react";
import { Clock, ChefHat, CheckCircle2 } from "lucide-react";
import OrderCard from "@/components/dashboard/crm/OrderCard";
import { useRestaurantTheme } from "@/components/dashboard/crm/ThemeProvider";
import { mockOrders, type Order, type OrderStatus } from "@/lib/dashboard/crm-data";

const columns: { key: OrderStatus; label: string; icon: React.ElementType; staticColor: string; staticBg: string }[] = [
  { key: "en_attente", label: "En attente", icon: Clock, staticColor: "#d97706", staticBg: "#fffbeb" },
  { key: "en_preparation", label: "En préparation", icon: ChefHat, staticColor: "#2563eb", staticBg: "#eff6ff" },
  { key: "prete", label: "Prêtes", icon: CheckCircle2, staticColor: "#16a34a", staticBg: "#f0fdf4" },
];

export default function LiveCommandesPage() {
  const { theme } = useRestaurantTheme();
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const handleMove = (id: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  const radius =
    theme.borderRadius === "pill"
      ? "0.75rem"
      : theme.borderRadius === "rounded"
        ? "0.5rem"
        : "0.25rem";

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-bold" style={{ color: theme.secondary }}>
          Live Commandes
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Gérez vos commandes en temps réel
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map((col) => {
          const Icon = col.icon;
          const colOrders = orders.filter((o) => o.status === col.key);
          return (
            <div key={col.key}>
              <div
                className="flex items-center gap-2 mb-3 px-3 py-2"
                style={{
                  backgroundColor: col.staticBg,
                  borderRadius: radius,
                }}
              >
                <Icon className="w-4 h-4" style={{ color: col.staticColor }} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: col.staticColor }}
                >
                  {col.label}
                </span>
                <span
                  className="ml-auto text-xs font-bold bg-white/60 px-2 py-0.5 rounded-full"
                  style={{ color: col.staticColor }}
                >
                  {colOrders.length}
                </span>
              </div>
              <div className="space-y-3">
                {colOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onMove={handleMove}
                  />
                ))}
                {colOrders.length === 0 && (
                  <div className="text-center py-8 text-sm text-slate-400">
                    Aucune commande
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
