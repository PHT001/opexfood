"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Paintbrush } from "lucide-react";
import { cn } from "@/lib/utils";
import { crmNav } from "@/lib/dashboard/constants";
import { getIcon } from "@/lib/dashboard/icons";
import { useRestaurantTheme } from "@/components/dashboard/crm/ThemeProvider";

export default function EspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { theme } = useRestaurantTheme();

  const isActive = (href: string) => {
    if (href === "/dashboard/espace") {
      return pathname === "/dashboard/espace";
    }
    return pathname.startsWith(href);
  };

  const isPersonnaliser = pathname === "/dashboard/espace/personnaliser";

  const radiusClass =
    theme.borderRadius === "pill"
      ? "rounded-full"
      : theme.borderRadius === "rounded"
        ? "rounded-lg"
        : "rounded-md";

  return (
    <div className="space-y-10">
      {/* CRM sub-navigation */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {crmNav.map((item) => {
          const Icon = getIcon(item.iconName);
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap transition-all",
                radiusClass,
                active
                  ? "text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 border"
              )}
              style={
                active
                  ? { backgroundColor: theme.primary, fontWeight: theme.fontWeight === "bold" ? 600 : 500 }
                  : { borderColor: theme.cardBorder, fontWeight: theme.fontWeight === "bold" ? 600 : 500 }
              }
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}

        {/* Personnaliser button */}
        <Link
          href="/dashboard/espace/personnaliser"
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap transition-all ml-auto",
            radiusClass,
            isPersonnaliser
              ? "text-white shadow-sm"
              : "border border-dashed text-slate-400 hover:text-slate-600 hover:border-slate-400"
          )}
          style={
            isPersonnaliser
              ? { backgroundColor: theme.primary }
              : { borderColor: theme.cardBorder }
          }
        >
          <Paintbrush className="w-4 h-4" />
          Personnaliser
        </Link>
      </div>

      {/* Page content */}
      {children}
    </div>
  );
}
