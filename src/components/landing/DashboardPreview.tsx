"use client";

import { ShoppingBag, Users, TrendingUp, Bell } from "lucide-react";

const stats = [
  { label: "Commandes", value: "24", icon: ShoppingBag, color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Clients", value: "156", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "CA Jour", value: "874€", icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50" },
];

const orders = [
  { id: "#247", client: "Thomas B.", items: "Poke Saumon XL", total: "14.90€", status: "En cours", statusColor: "bg-orange-100 text-orange-700" },
  { id: "#246", client: "Marie L.", items: "Buddha Bowl", total: "12.50€", status: "Prête", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: "#245", client: "Lucas D.", items: "Wrap Poulet", total: "9.90€", status: "Livrée", statusColor: "bg-slate-100 text-slate-600" },
];

export default function DashboardPreview() {
  return (
    <div className="relative mx-auto" style={{ maxWidth: 420 }}>
      {/* Browser frame */}
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Title bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white border border-slate-200 rounded-md px-3 py-0.5 text-[9px] text-slate-400">
              app.opexfood.com/dashboard
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-bold text-slate-800">Tableau de bord</p>
              <p className="text-[9px] text-slate-400">Aujourd&apos;hui</p>
            </div>
            <div className="relative">
              <Bell className="w-4 h-4 text-slate-400" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-orange-500" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white border border-slate-100 rounded-lg p-2 text-center">
                  <div className={`w-6 h-6 rounded-lg ${stat.bg} flex items-center justify-center mx-auto mb-1`}>
                    <Icon className={`w-3 h-3 ${stat.color}`} />
                  </div>
                  <p className="text-sm font-bold text-slate-800">{stat.value}</p>
                  <p className="text-[8px] text-slate-400">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Orders table */}
          <div className="border border-slate-100 rounded-lg overflow-hidden">
            <div className="bg-slate-50 px-2.5 py-1.5">
              <p className="text-[9px] font-semibold text-slate-600">Commandes récentes</p>
            </div>
            <div className="divide-y divide-slate-50">
              {orders.map((order) => (
                <div key={order.id} className={`px-2.5 py-2 flex items-center gap-2 ${order.id === "#247" ? "bg-orange-50/50 border-l-2 border-orange-400" : ""}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold text-slate-700">{order.id}</span>
                      <span className="text-[9px] text-slate-400">{order.client}</span>
                    </div>
                    <p className="text-[9px] text-slate-400 truncate">{order.items}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-700">{order.total}</span>
                  <span className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
