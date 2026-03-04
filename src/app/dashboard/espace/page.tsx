"use client";

import { useState } from "react";
import { Clock, ChefHat, CheckCircle2 } from "lucide-react";
import OrderCard from "@/components/dashboard/crm/OrderCard";
import { mockOrders, type Order, type OrderStatus } from "@/lib/dashboard/crm-data";

const columns: { key: OrderStatus; label: string; icon: React.ElementType; staticColor: string; staticBg: string }[] = [
  { key: "en_attente", label: "En attente", icon: Clock, staticColor: "#d97706", staticBg: "rgba(255, 251, 235, 0.7)" },
  { key: "en_preparation", label: "En préparation", icon: ChefHat, staticColor: "#2563eb", staticBg: "rgba(239, 246, 255, 0.7)" },
  { key: "prete", label: "Prêtes", icon: CheckCircle2, staticColor: "#16a34a", staticBg: "rgba(240, 253, 244, 0.7)" },
];

export default function LiveCommandesPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const handleMove = (id: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">
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
            <div key={col.key} className="glass-column p-3">
              <div
                className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg"
                style={{ backgroundColor: col.staticBg }}
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
