"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import FloatingElements from "@/components/ui/FloatingElements";
import { roiComparisons } from "@/lib/constants";
import { X, Check } from "lucide-react";

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function ROISection() {
  const { ref, inView } = useInView(0.15);

  return (
    <section className="relative py-16 sm:py-20 bg-white">
      <FloatingElements variant="roi" />
      <Container>
        <SectionHeader
          label="POURQUOI OPEXFOOD"
          title={<>Avant vs. Après <span className="text-slate-900">Opex</span><span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Food</span></>}
          subtitle="Découvrez l'impact concret sur votre restaurant au quotidien."
        />

        <div ref={ref} className="mt-16 max-w-4xl mx-auto grid md:grid-cols-2 gap-6 md:gap-0">
          {/* Sans OpexFood */}
          <div className="reveal-left rounded-2xl md:rounded-r-none border border-slate-200 bg-slate-50 px-5 py-6 sm:px-6">
            <h3 className="text-lg font-bold text-slate-400 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-3.5 h-3.5 text-red-400" />
              </div>
              Sans <span className="text-slate-400">Opex</span><span className="text-slate-400">Food</span>
            </h3>
            <div className="mt-6 space-y-4">
              {roiComparisons.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.metric}
                    className="flex items-center gap-3 rounded-xl bg-white/60 border border-slate-100 px-4 py-3"
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? "translateX(0)" : "translateX(-20px)",
                      transition: `all 0.4s ease-out ${i * 100}ms`,
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                      <X className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-500">{item.metric}</p>
                      <p className="text-xs text-slate-400 truncate">{item.without}</p>
                    </div>
                    <Icon className="w-4 h-4 text-slate-300 shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Avec OpexFood */}
          <div className="reveal-right rounded-2xl md:rounded-l-none border-2 border-orange-500 bg-white px-5 py-6 sm:px-6 shadow-orange">
            <h3 className="text-lg font-bold text-orange-600 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-orange-600" />
              </div>
              Avec <span className="text-orange-600">Opex</span><span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Food</span>
            </h3>
            <div className="mt-6 space-y-4">
              {roiComparisons.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.metric}
                    className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-50/80 to-emerald-50/50 border border-green-100 px-4 py-3"
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? "translateX(0)" : "translateX(20px)",
                      transition: `all 0.4s ease-out ${i * 100 + 200}ms`,
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800">{item.metric}</p>
                      <p className="text-xs text-slate-600 truncate">{item.with}</p>
                    </div>
                    <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md shrink-0">
                      {item.gain}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="reveal mt-10 flex justify-center">
          <a href="/demo">
            <Button variant="primary" size="lg">
              Tester maintenant
            </Button>
          </a>
        </div>
      </Container>
    </section>
  );
}
