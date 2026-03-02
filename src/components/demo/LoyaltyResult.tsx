import { Check, Gift } from "lucide-react";

interface LoyaltyResultProps {
  customerName: string;
  pointsEarned: number;
  totalPoints: number;
  nextReward: { name: string; threshold: number };
  visible: boolean;
}

export default function LoyaltyResult({
  customerName,
  pointsEarned,
  totalPoints,
  nextReward,
  visible,
}: LoyaltyResultProps) {
  if (!visible) return null;

  const progress = Math.round((totalPoints / nextReward.threshold) * 100);

  return (
    <div className="w-full loyalty-result-enter">
      <div className="bg-white rounded-lg border border-emerald-200 p-3 shadow-soft">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 mx-auto mb-1.5">
          <Check className="w-4 h-4 text-emerald-600" strokeWidth={3} />
        </div>

        <h3 className="text-center text-sm font-bold text-text">
          Bienvenue {customerName} !
        </h3>
        <p className="text-center text-[11px] text-emerald-600 font-semibold">
          +{pointsEarned} points gagnes
        </p>

        <div className="mt-2">
          <div className="flex items-center justify-between text-[9px] text-text-muted mb-0.5">
            <span>{totalPoints} pts</span>
            <span>{nextReward.threshold} pts</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full gradient-primary rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2 bg-orange-50 rounded-md px-2.5 py-1.5">
          <Gift className="w-3.5 h-3.5 text-orange-600 shrink-0" />
          <div>
            <p className="text-[9px] text-text-muted">Prochaine récompense</p>
            <p className="text-[11px] font-semibold text-orange-700">{nextReward.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
