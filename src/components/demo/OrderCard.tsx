import type { DemoOrder } from "@/lib/demo-data";

interface OrderCardProps {
  order: DemoOrder;
  highlight?: boolean;
}

const statusConfig: Record<
  DemoOrder["status"],
  { label: string; bg: string; text: string; dot: string }
> = {
  nouvelle: { label: "Nouvelle", bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
  "en-preparation": { label: "En préparation", bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  prete: { label: "Prête", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  livree: { label: "Livrée", bg: "bg-slate-50", text: "text-slate-600", dot: "bg-slate-400" },
};

export default function OrderCard({ order, highlight }: OrderCardProps) {
  const status = statusConfig[order.status];

  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-500 ${
        highlight
          ? "bg-orange-50 border-l-4 border-orange-500 order-card-enter"
          : "bg-white hover:bg-slate-50"
      }`}
    >
      {/* Order number */}
      <div className="shrink-0">
        <span className="text-xs font-bold text-text-muted">#{order.number}</span>
      </div>

      {/* Customer & items */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text truncate">{order.customerName}</p>
        <p className="text-xs text-text-muted truncate">{order.items}</p>
      </div>

      {/* Total */}
      <div className="shrink-0 text-right">
        <p className="text-sm font-bold text-text">{order.total.toFixed(2)}&euro;</p>
        <p className="text-[10px] text-text-muted">{order.time}</p>
      </div>

      {/* Status badge */}
      <div className={`shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-full ${status.bg}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
        <span className={`text-[10px] font-semibold ${status.text} whitespace-nowrap`}>{status.label}</span>
      </div>
    </div>
  );
}
