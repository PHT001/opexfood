"use client";

import { useState } from "react";
import { Building2, FileText, Palette, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import StepRestaurantInfo, {
  type RestaurantInfoData,
} from "./StepRestaurantInfo";
import StepDocumentUpload, {
  type DocumentUploadData,
} from "./StepDocumentUpload";
import StepBrandCustomization, { type BrandData } from "./StepBrandCustomization";
import StepWaiting from "./StepWaiting";

const steps = [
  { label: "Restaurant", icon: Building2 },
  { label: "Documents", icon: FileText },
  { label: "Personnalisation", icon: Palette },
  { label: "En attente", icon: Clock },
];

export default function OnboardingShell() {
  const [currentStep, setCurrentStep] = useState(0);

  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfoData>({
    name: "",
    address: "",
    phone: "",
    logoFiles: [],
  });

  const [documentData, setDocumentData] = useState<DocumentUploadData>({
    menuFiles: [],
  });

  const [brandData, setBrandData] = useState<BrandData>({
    primaryColor: "#ea580c",
    secondaryColor: "#171717",
  });

  const goNext = () =>
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

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
        <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-sm">
          {currentStep === 0 && (
            <StepRestaurantInfo
              data={restaurantInfo}
              onChange={setRestaurantInfo}
              onNext={goNext}
            />
          )}
          {currentStep === 1 && (
            <StepDocumentUpload
              data={documentData}
              onChange={setDocumentData}
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {currentStep === 2 && (
            <StepBrandCustomization
              data={brandData}
              onChange={setBrandData}
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {currentStep === 3 && <StepWaiting onBack={goBack} />}
        </div>
      </div>
    </div>
  );
}
