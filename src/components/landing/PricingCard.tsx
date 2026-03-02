import { Check, MessageSquareMore, Gift, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { PricingTier } from "@/lib/constants";

interface PricingCardProps {
  tier: PricingTier;
  index: number;
}

const icons: Record<string, { icon: typeof MessageSquareMore; bg: string; color: string }> = {
  "Chatbot + CRM": { icon: MessageSquareMore, bg: "bg-orange-50", color: "text-orange-600" },
  "Pack Complet": { icon: Sparkles, bg: "bg-gradient-to-br from-orange-50 to-amber-50", color: "text-orange-600" },
  "Fidélité": { icon: Gift, bg: "bg-violet-50", color: "text-violet-600" },
};

export default function PricingCard({ tier, index }: PricingCardProps) {
  const delayClass = `reveal-delay-${Math.min(index + 1, 5)}`;
  const iconData = icons[tier.name];

  return (
    <div
      className={cn(
        `reveal-scale ${delayClass} relative bg-white rounded-2xl p-8 transition-all`,
        tier.highlighted
          ? "border-2 border-orange-500 shadow-orange lg:scale-105"
          : "border border-border"
      )}
    >
      {/* Badge */}
      {tier.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="orange">{tier.badge}</Badge>
        </div>
      )}

      {/* Icon */}
      {iconData && (
        <div className={`w-12 h-12 rounded-2xl ${iconData.bg} flex items-center justify-center mb-5`}>
          <iconData.icon className={`w-6 h-6 ${iconData.color}`} />
        </div>
      )}

      {/* Name */}
      <h3 className="text-xl font-semibold text-text">{tier.name}</h3>

      {/* Price */}
      <div className="mt-4 flex items-baseline gap-2">
        {tier.priceStriked && (
          <span className="text-2xl font-medium text-slate-300 line-through">
            {tier.priceStriked}
          </span>
        )}
        <span className={cn("font-bold text-text", tier.priceStriked ? "text-4xl" : "text-5xl")}>
          {tier.price}
        </span>
        {tier.period && (
          <span className="text-text-secondary font-medium">{tier.period}</span>
        )}
      </div>

      {/* Subtitle */}
      <p className="mt-2 text-sm text-text-secondary">{tier.subtitle}</p>

      {/* Divider */}
      <div className="my-6 h-px bg-border" />

      {/* Features */}
      <ul className="space-y-3">
        {tier.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
            <span className="text-sm text-text-secondary">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Setup cost */}
      {tier.setup && (
        <div className="mt-5 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
          <span className="text-xs text-slate-500">{tier.setup}</span>
        </div>
      )}

      {/* CTA */}
      <div className="mt-8">
        <Button
          variant={tier.ctaVariant}
          size="md"
          className="w-full"
        >
          {tier.cta}
        </Button>
      </div>
    </div>
  );
}
