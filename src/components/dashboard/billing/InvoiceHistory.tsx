"use client";

import { Download, FileText } from "lucide-react";
import { useBilling } from "@/hooks/useBilling";

const statusLabels: Record<string, { label: string; className: string }> = {
  paid: { label: "Payee", className: "bg-green-100/80 text-green-700 glass-badge" },
  open: { label: "En attente", className: "bg-yellow-100/80 text-yellow-700 glass-badge" },
  void: { label: "Annulee", className: "bg-slate-100/80 text-slate-500 glass-badge" },
};

export default function InvoiceHistory() {
  const { data, loading } = useBilling();
  const invoices = data?.invoices ?? [];

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/30">
        <h3 className="text-base font-semibold text-slate-900">
          Historique des factures
        </h3>
      </div>

      {loading ? (
        <div className="px-6 py-12 text-center">
          <p className="text-sm text-slate-400">Chargement\u2026</p>
        </div>
      ) : invoices.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500">Aucune facture pour le moment.</p>
        </div>
      ) : (
        <div className="divide-y divide-white/20">
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 px-6 py-3 glass-table-header text-xs font-medium text-slate-400 uppercase tracking-wide">
            <span>Date</span>
            <span>Montant</span>
            <span>Statut</span>
            <span className="text-right">Facture</span>
          </div>

          {/* Rows */}
          {invoices.map((inv) => {
            const status = statusLabels[inv.status] ?? statusLabels.paid;
            const dateStr = inv.date
              ? new Date(inv.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "\u2014";
            return (
              <div
                key={inv.id}
                className="grid grid-cols-4 gap-4 px-6 py-3.5 items-center glass-table-row"
              >
                <span className="text-sm text-slate-700">{dateStr}</span>
                <span className="text-sm font-semibold text-slate-900">
                  {inv.amount.toFixed(2)} \u20AC
                </span>
                <span>
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${status.className}`}
                  >
                    {status.label}
                  </span>
                </span>
                <span className="text-right">
                  <button
                    className="inline-flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
                    onClick={() => {
                      if (inv.invoice_pdf) {
                        window.open(inv.invoice_pdf, "_blank");
                      } else if (inv.invoice_url) {
                        window.open(inv.invoice_url, "_blank");
                      }
                    }}
                  >
                    <Download className="w-3.5 h-3.5" />
                    PDF
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
