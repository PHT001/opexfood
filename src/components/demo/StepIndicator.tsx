"use client";

interface StepIndicatorProps {
  activeStep: number;
}

const steps = [
  { id: "step-1", label: "Commande" },
  { id: "step-2", label: "Restaurant" },
  { id: "step-3", label: "Fidelite" },
];

export default function StepIndicator({ activeStep }: StepIndicatorProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1">
      {steps.map((step, i) => {
        const isActive = activeStep === i + 1;
        const isPast = activeStep > i + 1;

        return (
          <div key={step.id} className="flex flex-col items-center">
            {i > 0 && (
              <div
                className="w-px h-8 transition-colors duration-300"
                style={{ backgroundColor: isPast || isActive ? "#ea580c" : "#e2e8f0" }}
              />
            )}
            <button
              onClick={() => scrollTo(step.id)}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div
                className="w-3.5 h-3.5 rounded-full border-2 transition-all duration-300"
                style={{
                  borderColor: isActive || isPast ? "#ea580c" : "#cbd5e1",
                  backgroundColor: isActive ? "#ea580c" : isPast ? "#fed7aa" : "transparent",
                  boxShadow: isActive ? "0 0 8px rgba(234,88,12,0.4)" : "none",
                }}
              />
              <span
                className="text-xs font-medium transition-colors duration-300 whitespace-nowrap"
                style={{ color: isActive ? "#ea580c" : "#94a3b8" }}
              >
                {step.label}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
