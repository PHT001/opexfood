"use client";

import { ArrowRight, Globe, Bot, Smartphone, AlertTriangle, TrendingUp } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function UrgencySection() {
  return (
    <section className="relative py-16 sm:py-20 bg-white overflow-hidden">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          {/* Alert badge */}
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-xs font-semibold text-red-600">
              Vos concurrents sont déjà en ligne
            </span>
          </div>

          {/* title */}
          <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl md:text-5xl font-black text-text leading-tight">
            La révolution digitale{" "}
            <span className="text-gradient-orange">n&apos;attend pas</span>
          </h2>

          {/* description */}
          <p className="reveal reveal-delay-2 mt-5 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">

            Vos clients commandent <strong className="text-text font-semibold">en ligne</strong> et comparent sur Google.
            Sans présence digitale, vous <strong className="text-text font-semibold">perdez des clients</strong> chaque jour.
          </p>

          {/* 3 stats */}
          <div className="reveal reveal-delay-2 mt-10 grid grid-cols-3 gap-3 sm:gap-5">
            {[
              { icon: Globe, stat: "80%", label: "cherchent en ligne avant de commander" },
              { icon: Bot, stat: "3x", label: "plus de commandes avec un chatbot IA" },
              { icon: Smartphone, stat: "67%", label: "des commandes passent par mobile" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.stat} className="px-3 py-5 rounded-xl bg-orange-50/60 border border-orange-100">
                  <Icon className="w-5 h-5 text-orange-500 mx-auto mb-2" />
                  <p className="text-2xl sm:text-3xl font-black text-text">{item.stat}</p>
                  <p className="text-[11px] sm:text-xs text-text-secondary mt-1 leading-tight">{item.label}</p>
                </div>
              );
            })}
          </div>

          {/* Urgency nudge */}
          <div className="reveal reveal-delay-3 mt-8 relative rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-5 py-4 flex items-center justify-center gap-3 shadow-lg">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-orange-500/20 shrink-0">
              <TrendingUp className="w-5 h-5 text-orange-400" />
            </div>
            <p className="text-sm sm:text-base font-semibold text-white">
              +200 restaurants ont déjà automatisé leur activité{" "}
              <span className="text-orange-400">ce mois-ci</span>
            </p>
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
          </div>

          {/* CTA */}
          <div className="reveal reveal-delay-3 mt-8">
            <a href="#modules">
              <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                Passer au digital maintenant
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
