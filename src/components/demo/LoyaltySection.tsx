"use client";

import { useEffect, useRef, useState } from "react";
import { Gift, Smartphone, Trophy, Heart, Plus, CheckCircle2 } from "lucide-react";
import { useModuleSelection } from "@/context/ModuleSelectionContext";
import Container from "@/components/ui/Container";
import TabletMockup from "./TabletMockup";
import NumPad from "./NumPad";
import LoyaltyResult from "./LoyaltyResult";
import { LOYALTY_DATA } from "@/lib/demo-data";

export default function LoyaltySection() {
  const { addModule, selectedModules } = useModuleSelection();
  const isModuleSelected = selectedModules.includes(1);
  const [digitIndex, setDigitIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasPlayed) return;
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          setHasPlayed(true);
          observer.disconnect();
          playSequence();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPlayed]);

  function playSequence() {
    const totalDigits = LOYALTY_DATA.phoneDigits.length;

    // Type each digit with 300ms interval
    for (let i = 0; i < totalDigits; i++) {
      setTimeout(() => {
        setDigitIndex(i + 1);
      }, 800 + i * 300);
    }

    // Show result 1s after last digit
    setTimeout(() => {
      setShowResult(true);
    }, 800 + totalDigits * 300 + 1000);
  }

  return (
    <section id="step-3" ref={sectionRef} className="relative py-20 sm:py-28 bg-white overflow-hidden">
      <Container>
        <div className="flex flex-col gap-12 lg:gap-16 items-center overflow-hidden">
          {/* iPad mockup — on top */}
          <div className="reveal flex justify-center w-full max-w-full overflow-hidden">
            <TabletMockup>
              <div className="flex h-full">
                {/* Left: NumPad */}
                <div className="flex-1 px-4 py-3 border-r border-slate-100">
                  <NumPad
                    digits={LOYALTY_DATA.phoneDigits}
                    activeDigitIndex={digitIndex}
                  />
                </div>

                {/* Right: Result */}
                <div className="flex-1 px-4 py-3 flex items-center justify-center">
                  {showResult ? (
                    <LoyaltyResult
                      customerName={LOYALTY_DATA.customerName}
                      pointsEarned={LOYALTY_DATA.pointsEarned}
                      totalPoints={LOYALTY_DATA.totalPoints}
                      nextReward={LOYALTY_DATA.nextReward}
                      visible={showResult}
                    />
                  ) : (
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-2">
                        <Gift className="w-5 h-5 text-slate-300" />
                      </div>
                      <p className="text-xs text-slate-300 font-medium">En attente de saisie...</p>
                    </div>
                  )}
                </div>
              </div>
            </TabletMockup>
          </div>

          {/* Text side — below */}
          <div className="reveal-left min-w-0 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text flex items-center justify-center gap-4">
              <span className="relative inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 shrink-0">
                <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-400 to-violet-600 shadow-lg shadow-violet-500/25 rotate-3" />
                <span className="relative text-white text-base sm:text-lg font-extrabold">3</span>
              </span>
              Programme Fidélité
            </h2>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-200 mt-3 mb-1">
              <Gift className="w-3.5 h-3.5 text-violet-600" />
              <span className="text-xs font-semibold text-violet-700">Vos clients gagnent des points automatiquement</span>
            </div>

            <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
              Le client tape son numéro, ses points s&apos;ajoutent <strong className="text-text font-semibold">automatiquement</strong> — interface{" "}
              <strong className="text-text font-semibold">100% à votre image</strong>.
            </p>

            <div className="mt-8 inline-flex flex-col gap-4 text-left">
              {[
                { icon: Smartphone, text: "Saisie rapide par numéro de téléphone" },
                { icon: Trophy, text: "Récompenses et paliers personnalisés à votre image" },
                { icon: Heart, text: "Interface adaptée à votre identité visuelle" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-50 shrink-0">
                      <Icon className="w-4 h-4 text-violet-600" />
                    </div>
                    <span className="text-sm text-text-secondary font-medium">{item.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <button
                onClick={() => addModule(1)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isModuleSelected
                    ? "bg-green-50 border border-green-300 text-green-700"
                    : "bg-violet-50 border border-violet-200 text-violet-700 hover:bg-violet-100 hover:border-violet-300"
                }`}
              >
                {isModuleSelected ? (
                  <><CheckCircle2 className="w-4 h-4" /> Module ajouté</>
                ) : (
                  <><Plus className="w-4 h-4" /> Ajouter ce module</>
                )}
              </button>
            </div>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes loyaltyResultEnter {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        :global(.loyalty-result-enter) {
          animation: loyaltyResultEnter 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
