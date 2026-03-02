import type { ReactNode } from "react";

interface PhaseHeaderProps {
  number: string;
  title: string;
  description: string;
  color: "orange" | "blue" | "violet";
  icon: ReactNode;
}

const colorMap = {
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    number: "text-orange-400",
    title: "text-orange-600",
    iconBg: "bg-orange-100",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    number: "text-blue-400",
    title: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  violet: {
    bg: "bg-violet-50",
    border: "border-violet-200",
    number: "text-violet-400",
    title: "text-violet-600",
    iconBg: "bg-violet-100",
  },
};

export default function PhaseHeader({ number, title, description, color, icon }: PhaseHeaderProps) {
  const c = colorMap[color];

  return (
    <div className={`relative py-14 sm:py-16 ${c.bg} border-y ${c.border}`}>
      <div className="max-w-3xl mx-auto px-4 text-center">
        {/* Phase number */}
        <div className="reveal flex items-center justify-center gap-3 mb-4">
          <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${c.iconBg}`}>
            {icon}
          </div>
          <span className={`text-sm font-bold uppercase tracking-widest ${c.number}`}>
            Phase {number}
          </span>
        </div>

        {/* Title */}
        <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl font-bold text-text">
          {title}
        </h2>

        {/* Description */}
        <p className="reveal reveal-delay-2 mt-3 text-lg text-text-secondary max-w-xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}
