"use client";

import { useEffect, useRef } from "react";

export default function PendingCheckout() {
  const triggered = useRef(false);

  useEffect(() => {
    if (triggered.current) return;
    const raw = localStorage.getItem("pendingCheckout");
    if (!raw) return;
    triggered.current = true;
    localStorage.removeItem("pendingCheckout");

    try {
      const { moduleIds, billing } = JSON.parse(raw);
      if (!moduleIds?.length) return;

      fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleIds, billing }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.url) window.location.href = data.url;
        });
    } catch {
      // invalid JSON, ignore
    }
  }, []);

  return null;
}
