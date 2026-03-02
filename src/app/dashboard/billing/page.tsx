"use client";

import CurrentPlan from "@/components/dashboard/billing/CurrentPlan";
import InvoiceHistory from "@/components/dashboard/billing/InvoiceHistory";

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Facturation</h1>
        <p className="text-sm text-slate-500 mt-1">
          Consultez vos factures et gérez votre abonnement.
        </p>
      </div>

      <CurrentPlan />
      <InvoiceHistory />
    </div>
  );
}
