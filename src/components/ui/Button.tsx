"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

const variantStyles = {
  primary:
    "gradient-primary text-white shadow-orange hover:shadow-orange-lg hover:brightness-110 transition-all",
  outline:
    "border-2 border-orange-600 text-orange-600 hover:bg-orange-50 transition-colors",
  ghost: "text-orange-600 hover:bg-orange-50 transition-colors",
  white:
    "bg-white text-orange-600 hover:bg-orange-50 shadow-soft transition-all",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
  md: "px-6 py-3 text-base rounded-xl gap-2",
  lg: "px-8 py-4 text-lg rounded-xl gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon className="w-5 h-5" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="w-5 h-5" />}
    </button>
  );
}
