"use client";

import { usePathname } from "next/navigation";
import { Menu, Bell } from "lucide-react";
import { useUser } from "@/hooks/useUser";

const pageTitles: Record<string, string> = {
  "/dashboard": "Vue d'ensemble",
  "/dashboard/onboarding": "Configuration",
  "/dashboard/modules": "Modules",
  "/dashboard/billing": "Facturation",
  "/dashboard/settings": "Parametres",
};

export default function DashboardTopbar() {
  const pathname = usePathname();
  const { user: userInfo } = useUser();

  const pageTitle = pageTitles[pathname] || "Dashboard";

  return (
    <header className="sticky top-0 z-30 h-16 px-6 flex items-center justify-between shrink-0 glass-topbar">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-orange-500 transition-colors rounded-lg"
          aria-label="Ouvrir le menu"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("toggle-sidebar"));
          }}
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-lg font-semibold text-slate-800">
          {pageTitle}
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button
          className="p-2 text-slate-400 hover:text-orange-500 transition-colors rounded-lg relative"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
        </button>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-orange-100 ring-2 ring-orange-200">
          <span className="text-xs font-semibold text-orange-700">
            {userInfo?.initials || "?"}
          </span>
        </div>
      </div>
    </header>
  );
}
