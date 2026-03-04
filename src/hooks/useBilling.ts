"use client";

import { useState, useEffect } from "react";

interface BillingData {
  subscription: {
    status: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
  } | null;
  activeModules: string[];
  invoices: Array<{
    id: string;
    date: string;
    amount: number;
    status: string;
    invoice_url: string | null;
    invoice_pdf: string | null;
  }>;
}

let cachedData: BillingData | null = null;
let fetchPromise: Promise<BillingData> | null = null;

async function fetchBilling(): Promise<BillingData> {
  const res = await fetch("/api/dashboard/billing");
  if (!res.ok) throw new Error("Failed to fetch billing");
  return res.json();
}

export function useBilling() {
  const [data, setData] = useState<BillingData | null>(cachedData);
  const [loading, setLoading] = useState(!cachedData);

  useEffect(() => {
    if (cachedData) {
      setData(cachedData);
      setLoading(false);
      return;
    }

    if (!fetchPromise) {
      fetchPromise = fetchBilling();
    }

    fetchPromise
      .then((d) => {
        cachedData = d;
        setData(d);
      })
      .finally(() => {
        setLoading(false);
        fetchPromise = null;
      });
  }, []);

  return { data, loading };
}
