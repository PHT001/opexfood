"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { crmNav } from "@/lib/dashboard/constants";
import { getIcon } from "@/lib/dashboard/icons";

export default function EspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard/espace") {
      return pathname === "/dashboard/espace";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="space-y-10">
      {/* CRM sub-navigation — glass tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {crmNav.map((item) => {
          const Icon = getIcon(item.iconName);
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-all",
                active
                  ? "glass-tab-active"
                  : "glass-tab text-slate-600 hover:text-slate-900"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Page content */}
      {children}
    </div>
  );
}
