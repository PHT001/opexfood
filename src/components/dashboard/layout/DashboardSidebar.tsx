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

// Mock data (will be replaced by Supabase later)
const mockUser = {
  email: "user@restaurant.com",
  initials: "UR",
};
const mockRestaurant = {
  name: "Mon Restaurant",
};

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { theme } = useRestaurantTheme();
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
          <span className="text-xl font-bold" style={{ color: theme.secondary }}>
            Opex
          </span>
          <span
            className="text-xl font-bold"
            style={{ color: theme.primary }}
          >
            Food
          </span>
        </Link>
        <p className="mt-1 text-sm" style={{ color: theme.secondary, opacity: 0.5 }}>{mockRestaurant.name}</p>
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
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                !active && "hover:bg-bg-muted hover:text-text"
              )}
              style={
                active
                  ? {
                      backgroundColor: theme.primaryLight,
                      color: theme.primaryDark,
                    }
                  : { color: theme.secondary, opacity: 0.7 }
              }
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="mt-auto border-t px-4 py-4" style={{ borderColor: theme.sidebarBorder }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: theme.primaryLight }}
          >
            <span
              className="text-sm font-semibold"
              style={{ color: theme.primaryDark }}
            >
              {mockUser.initials}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate" style={{ color: theme.secondary, opacity: 0.7 }}>{mockUser.email}</p>
          </div>
        </div>
        <button
          className="mt-3 flex items-center gap-2 text-sm hover:text-red-500 transition-colors w-full"
          style={{ color: theme.secondary, opacity: 0.5 }}
          onClick={() => {
            // Will be wired to Supabase signOut later
          }}
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex w-64 border-r h-screen flex-col shrink-0"
        style={{
          backgroundColor: theme.sidebarBg,
          borderColor: theme.sidebarBorder,
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Sidebar panel */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-64 border-r flex flex-col lg:hidden"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.cardBorder,
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-1 text-text-muted hover:text-text transition-colors"
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
