"use client";

import { useEffect, useState, useRef } from "react";
import { ShoppingBag, Euro, Users } from "lucide-react";

interface StatsBarProps {
  ordersToday: number;
  revenue: number;
  loyaltyCustomers: number;
  animate: boolean;
  /** Extra orders/revenue to add after initial count-up */
  bonus?: { orders: number; revenue: number };
}

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(interval);
      } else {
        setValue(start);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [active, target, duration]);

  return value;
}

export default function StatsBar({ ordersToday, revenue, loyaltyCustomers, animate, bonus }: StatsBarProps) {
  const [showBonus, setShowBonus] = useState(false);
  const prevAnimate = useRef(false);

  const orders = useCountUp(ordersToday, animate);
  const rev = useCountUp(revenue, animate);
  const loyalty = useCountUp(loyaltyCustomers, animate);

  // When bonus data comes in, flash the update
  useEffect(() => {
    if (bonus && animate && !showBonus && prevAnimate.current) {
      setShowBonus(true);
    }
    prevAnimate.current = animate;
  }, [bonus, animate, showBonus]);

  const displayOrders = showBonus && bonus ? ordersToday + bonus.orders : orders;
  const displayRevenue = showBonus && bonus ? revenue + bonus.revenue : rev;

  const stats = [
    {
      icon: ShoppingBag,
      label: "Commandes",
      value: displayOrders,
      format: (v: number) => v.toString(),
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      icon: Euro,
      label: "CA du jour",
      value: displayRevenue,
      format: (v: number) => `${v}\u20AC`,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: Users,
      label: "Clients fidélisés",
      value: loyalty,
      format: (v: number) => v.toString(),
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="bg-white rounded-xl border border-border p-3 text-center">
            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${stat.bg} mb-1.5`}>
              <Icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <p className="text-lg font-bold text-text">{stat.format(stat.value)}</p>
            <p className="text-[10px] text-text-muted font-medium">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
