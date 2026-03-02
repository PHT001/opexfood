import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface BadgeProps {
  variant?: "orange" | "green" | "gray" | "white";
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

const variantStyles = {
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  gray: "bg-slate-100 text-slate-600 border-slate-200",
  white: "bg-white/80 text-orange-700 border-orange-100 backdrop-blur-sm",
};

export default function Badge({
  variant = "orange",
  children,
  icon: Icon,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border",
        variantStyles[variant],
        className
      )}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
}
