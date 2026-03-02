"use client";

import { Clock, MessageCircle, Globe, Phone, MapPin } from "lucide-react";
import type { Order } from "@/lib/dashboard/crm-data";
import { useRestaurantTheme } from "./ThemeProvider";

const channelConfig = {
  whatsapp: { icon: MessageCircle, label: "WhatsApp", color: "text-green-600" },
  web: { icon: Globe, label: "Web", color: "text-blue-600" },
  telephone: { icon: Phone, label: "Téléphone", color: "text-orange-600" },
  surplace: { icon: MapPin, label: "Sur place", color: "text-violet-600" },
};

interface OrderCardProps {
  order: Order;
  onMove?: (id: string, status: Order["status"]) => void;
}

export default function OrderCard({ order, onMove }: OrderCardProps) {
  const { theme } = useRestaurantTheme();
  const channel = channelConfig[order.channel];
  const ChannelIcon = channel.icon;

  const nextStatus: Record<string, Order["status"] | null> = {
    en_attente: "en_preparation",
    en_preparation: "prete",
    prete: null,
  };

  const nextLabel: Record<string, string> = {
    en_attente: "Préparer",
    en_preparation: "Prête",
    prete: "",
  };

  const radius =
    theme.borderRadius === "pill"
      ? "1rem"
      : theme.borderRadius === "rounded"
        ? "0.75rem"
        : "0.375rem";

  const btnRadius =
    theme.borderRadius === "pill"
      ? "9999px"
      : theme.borderRadius === "rounded"
        ? "0.5rem"
        : "0.25rem";

  return (
    <div
      className="p-4 shadow-sm hover:shadow-md transition-shadow"
      style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: radius,
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-slate-400">{order.id}</span>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Clock className="w-3 h-3" />
          {order.time}
        </div>
      </div>

      <p
        className="text-sm mb-1"
        style={{
          color: theme.secondary,
          fontWeight: theme.fontWeight === "bold" ? 700 : 600,
        }}
      >
        {order.customer}
      </p>

      <ul className="space-y-0.5 mb-3">
        {order.items.map((item, i) => (
          <li key={i} className="text-xs text-slate-500">
            {item}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <ChannelIcon className={`w-3.5 h-3.5 ${channel.color}`} />
          <span className="text-xs text-slate-400">{channel.label}</span>
        </div>
        <span className="text-sm font-bold" style={{ color: theme.secondary }}>
          {order.total.toFixed(2)} €
        </span>
      </div>

      {nextStatus[order.status] && onMove && (
        <button
          onClick={() => onMove(order.id, nextStatus[order.status]!)}
          className="mt-3 w-full py-1.5 text-xs font-semibold transition-colors"
          style={{
            backgroundColor: theme.primaryLight,
            color: theme.primaryDark,
            borderRadius: btnRadius,
          }}
        >
          {nextLabel[order.status]} →
        </button>
      )}
    </div>
  );
}
