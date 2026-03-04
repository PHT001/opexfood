"use client";

import CrmThemeProvider, {
  useRestaurantTheme,
} from "@/components/dashboard/crm/ThemeProvider";
import DashboardSidebar from "@/components/dashboard/layout/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/layout/DashboardTopbar";
import FloatingBackground from "@/components/dashboard/layout/FloatingBackground";
import PendingCheckout from "@/components/dashboard/PendingCheckout";

function DashboardShell({ children }: { children: React.ReactNode }) {
  const { theme } = useRestaurantTheme();

  return (
    <div className="flex h-screen" style={{ backgroundColor: theme.background }}>
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
