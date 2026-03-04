"use client";

import { useState, useEffect, useCallback } from "react";
import { Building2, Gift, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useUser } from "@/hooks/useUser";
import StepRestaurantInfo, {
  type RestaurantInfoData,
} from "./StepRestaurantInfo";
import StepLoyaltyConfig, {
  type LoyaltyConfigData,
} from "./StepLoyaltyConfig";
import StepReady from "./StepReady";

const steps = [
  { label: "Restaurant", icon: Building2 },
  { label: "Fidélité", icon: Gift },
  { label: "Prêt !", icon: Rocket },
];

function generateSlugFromName(name: string): string {
  return (
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "mon-restaurant"
  );
}

export default function OnboardingShell() {
  const { step: savedStep, setStep: saveStep, complete } = useOnboarding();
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState(0);

  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfoData>({
    name: "",
    address: "",
    phone: "",
  });

  const [loyaltyConfig, setLoyaltyConfig] = useState<LoyaltyConfigData>({
    slug: "",
    points_per_euro: 10,
    reward_threshold: 500,
    reward_description: "1 Bowl offert",
    welcome_points: 50,
  });

  // Pre-fill restaurant name from signup
  useEffect(() => {
    if (user?.restaurantName && !restaurantInfo.name) {
      const name = user.restaurantName;
      setRestaurantInfo((prev) => ({ ...prev, name }));
      setLoyaltyConfig((prev) => ({
        ...prev,
        slug: prev.slug || generateSlugFromName(name),
      }));
    }
  }, [user?.restaurantName, restaurantInfo.name]);

  // Resume from saved step
  useEffect(() => {
    if (savedStep > 0 && savedStep <= 2) {
      setCurrentStep(savedStep);
    }
  }, [savedStep]);

  const goNext = useCallback(async () => {
    const nextStep = Math.min(currentStep + 1, steps.length - 1);
    setCurrentStep(nextStep);
    await saveStep(nextStep);
  }, [currentStep, saveStep]);

  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

  // When step 1 completes, auto-generate slug if empty
  const handleStep1Next = async () => {
    if (!loyaltyConfig.slug) {
      setLoyaltyConfig((prev) => ({
        ...prev,
        slug: generateSlugFromName(restaurantInfo.name),
      }));
    }
    await goNext();
  };

  const handleComplete = useCallback(async () => {
    await complete();
  }, [complete]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-4xl">
      {/* Stepper — left side */}
      <div className="lg:w-56 shrink-0">
        <nav className="flex lg:flex-col gap-2 lg:gap-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isCompleted = i < currentStep;
            const isCurrent = i === currentStep;
            const isFuture = i > currentStep;

            return (
              <div key={step.label} className="flex items-start gap-3">
                {/* Dot + line (vertical on desktop) */}
                <div className="hidden lg:flex flex-col items-center">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 shrink-0",
                      isCompleted &&
                        "bg-orange-500 border-orange-500 text-white",
                      isCurrent &&
                        "border-orange-500 bg-orange-50 text-orange-600",
                      isFuture && "border-slate-300 bg-white text-slate-400"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={cn(
                        "w-0.5 h-10 transition-colors duration-300",
                        i < currentStep ? "bg-orange-400" : "bg-slate-200"
                      )}
                    />
                  )}
                </div>

                {/* Label */}
                <button
                  onClick={() => {
                    if (i <= currentStep) setCurrentStep(i);
                  }}
                  disabled={isFuture}
                  className={cn(
                    "lg:pt-1 text-sm font-medium whitespace-nowrap transition-colors",
                    "flex lg:block items-center gap-2",
                    isCurrent && "text-orange-600",
                    isCompleted &&
                      "text-slate-700 hover:text-orange-600 cursor-pointer",
                    isFuture && "text-slate-400 cursor-not-allowed"
                  )}
                >
                  {/* Mobile dot */}
                  <div
                    className={cn(
                      "lg:hidden w-7 h-7 rounded-full flex items-center justify-center border-2 shrink-0",
                      isCompleted &&
                        "bg-orange-500 border-orange-500 text-white",
                      isCurrent &&
                        "border-orange-500 bg-orange-50 text-orange-600",
                      isFuture && "border-slate-300 bg-white text-slate-400"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Step content — right side */}
      <div className="flex-1 min-w-0">
        <div className="glass-card rounded-2xl p-6 lg:p-8">
          {currentStep === 0 && (
            <StepRestaurantInfo
              data={restaurantInfo}
              onChange={setRestaurantInfo}
              onNext={handleStep1Next}
            />
          )}
          {currentStep === 1 && (
            <StepLoyaltyConfig
              data={loyaltyConfig}
              onChange={setLoyaltyConfig}
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {currentStep === 2 && (
            <StepReady slug={loyaltyConfig.slug} onComplete={handleComplete} />
          )}
        </div>
      </div>
    </div>
  );
}
