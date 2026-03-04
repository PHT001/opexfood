"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CrmThemeProvider from "@/components/dashboard/crm/ThemeProvider";
import DashboardSidebar from "@/components/dashboard/layout/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/layout/DashboardTopbar";
import FloatingBackground from "@/components/dashboard/layout/FloatingBackground";
import PendingCheckout from "@/components/dashboard/PendingCheckout";
import { useOnboarding } from "@/hooks/useOnboarding";

function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { completed, loading } = useOnboarding();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (loading) return;

    const isOnboardingPage = pathname === "/dashboard/onboarding";

    if (!completed && !isOnboardingPage) {
      router.replace("/dashboard/onboarding");
      return;
    }

    setReady(true);
  }, [loading, completed, pathname, router]);

  if (loading || !ready) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-white">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="relative flex-1 overflow-y-auto p-6 lg:p-8">
          <FloatingBackground />
          <PendingCheckout />
          <div className="relative z-10">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CrmThemeProvider>
      <DashboardShell>{children}</DashboardShell>
    </CrmThemeProvider>
  );
}
