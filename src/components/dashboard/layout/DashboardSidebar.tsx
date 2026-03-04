"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarNav } from "@/lib/dashboard/constants";
import { getIcon } from "@/lib/dashboard/icons";
import { useRestaurantTheme } from "@/components/dashboard/crm/ThemeProvider";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { theme } = useRestaurantTheme();
  const { user: userInfo } = useUser();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Listen for toggle-sidebar event from the topbar hamburger button
  useEffect(() => {
    const handleToggle = () => setMobileOpen((prev) => !prev);
    window.addEventListener("toggle-sidebar", handleToggle);
    return () => window.removeEventListener("toggle-sidebar", handleToggle);
  }, []);

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="py-6 px-6">
        <Link href="/dashboard" className="flex items-center gap-0.5">
          <span className="text-xl font-bold text-slate-800">
            Opex
          </span>
          <span className="text-xl font-bold text-orange-600">
            Food
          </span>
        </Link>
        <p className="mt-1 text-sm text-slate-400 truncate">
          {userInfo?.restaurantName || "Mon Restaurant"}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {sidebarNav.map((item) => {
          const Icon = getIcon(item.iconName);
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                active
                  ? "bg-orange-500/10 text-orange-600 border-l-[3px] border-orange-500 ml-0"
                  : "text-slate-600 hover:bg-white/50 hover:text-slate-900"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="mt-auto mx-3 mb-4 rounded-xl bg-white/40 p-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-orange-100">
            <span className="text-sm font-semibold text-orange-700">
              {userInfo?.initials || "?"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-600 truncate">{userInfo?.email || "..."}</p>
          </div>
        </div>
        <button
          className="mt-3 flex items-center gap-2 text-sm text-slate-400 hover:text-red-500 transition-colors w-full"
          onClick={async () => {
            const supabase = createClient();
            await supabase.auth.signOut();
            router.push("/");
          }}
        >
          <LogOut className="w-4 h-4" />
          Deconnexion
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar — Liquid Glass */}
      <aside className="hidden lg:flex w-64 h-screen flex-col shrink-0 glass-sidebar">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop — frosted */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Sidebar panel — Glass */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-64 flex flex-col lg:hidden glass-sidebar"
            >
              {/* Close button */}
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700 transition-colors"
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
