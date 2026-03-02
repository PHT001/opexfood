import type { ModuleData } from "@/lib/constants";

const moduleStats: Record<string, { stat: string; label: string }> = {
  avis: { stat: "4.8", label: "note moyenne" },
  previsions: { stat: "-30%", label: "de gaspillage" },
  planning: { stat: "5 min", label: "pour planifier" },
  marketing: { stat: "x3", label: "retour client" },
  qrcode: { stat: "+20%", label: "ticket moyen" },
  livraison: { stat: "1", label: "seul dashboard" },
};

interface MiniModuleCardProps {
  module: ModuleData;
  index: number;
}

export default function MiniModuleCard({ module, index }: MiniModuleCardProps) {
  const Icon = module.icon;
  const delayClass = `reveal-delay-${Math.min(index + 1, 5)}`;
  const heroStat = moduleStats[module.id];

  return (
    <div
      className={`reveal ${delayClass} group bg-white rounded-2xl border border-border p-5 hover:shadow-soft-md hover:border-orange-200 transition-all duration-300 flex items-center gap-4`}
    >
      {/* Icon */}
      <div
        className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${module.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className={`w-6 h-6 ${module.iconColor}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-text leading-tight">{module.title}</h3>
        {heroStat && (
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-gradient-orange">
              {heroStat.stat}
            </span>
            <span className="text-[11px] text-text-secondary">{heroStat.label}</span>
          </div>
        )}
      </div>
    </div>
  );
}
