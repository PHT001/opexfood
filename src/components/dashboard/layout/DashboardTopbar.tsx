"use client";

import { usePathname } from "next/navigation";
import { Menu, Bell } from "lucide-react";
import { useRestaurantTheme } from "@/components/dashboard/crm/ThemeProvider";

// Mock user initials
const mockUserInitials = "UR";

const pageTitles: Record<string, string> = {
  "/dashboard": "Vue d'ensemble",
  "/dashboard/onboarding": "Configuration",
  "/dashboard/modules": "Modules",
  "/dashboard/billing": "Facturation",
  "/dashboard/settings": "Paramètres",
};

export default function DashboardTopbar() {
  const pathname = usePathname();
  const { theme } = useRestaurantTheme();

  const pageTitle = pageTitles[pathname] || "Dashboard";

  return (
    <header
      className="sticky top-0 z-30 border-b h-16 px-6 flex items-center justify-between shrink-0"
      style={{
        backgroundColor: theme.sidebarBg,
        borderColor: theme.sidebarBorder,
      }}
    >
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 -ml-2 transition-colors rounded-lg"
          style={{ color: theme.secondary, opacity: 0.6 }}
          aria-label="Ouvrir le menu"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("toggle-sidebar"));
          }}
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1
          className="text-lg font-semibold"
          style={{ color: theme.secondary }}
        >
          {pageTitle}
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button
          className="p-2 transition-colors rounded-lg relative"
          style={{ color: theme.secondary, opacity: 0.5 }}
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
        </button>

        {/* User avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: theme.primaryLight }}
        >
          <span
            className="text-xs font-semibold"
            style={{ color: theme.primaryDark }}
          >
            {mockUserInitials}
          </span>
        </div>
      </div>
    </header>
  );
}
