import type { ReactNode } from "react";

interface SectionHeaderProps {
  label: string;
  title: ReactNode;
  subtitle?: string;
  labelColor?: string;
  centered?: boolean;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  labelColor = "text-orange-600",
  centered = true,
}: SectionHeaderProps) {
  return (
    <div
      className={`reveal ${centered ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}`}
    >
      <span
        className={`text-xs font-semibold uppercase tracking-widest ${labelColor}`}
      >
        {label}
      </span>
      <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-text leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-text-secondary leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
