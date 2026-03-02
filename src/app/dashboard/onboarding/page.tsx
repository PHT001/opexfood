import OnboardingShell from "@/components/dashboard/onboarding/OnboardingShell";

export default function OnboardingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Configuration</h1>
      <p className="text-sm text-slate-500 mb-8">
        Configurez votre restaurant pour que nous puissions préparer votre
        espace.
      </p>
      <OnboardingShell />
    </div>
  );
}
