"use client";

import Image from "next/image";
import { ArrowDown, Layers } from "lucide-react";

export default function ComboBridge() {
  return (
    <div className="relative py-8 sm:py-10 bg-bg-soft overflow-hidden">
      <div className="max-w-3xl mx-auto px-4">
        {/* Robot images side by side with vignettes */}
        <div className="reveal flex items-end justify-center gap-6 sm:gap-10 mb-5">
          {/* Chatbot robot */}
          <div className="relative w-[130px] h-[110px] sm:w-[160px] sm:h-[130px] pointer-events-none">
            <Image
              src="/canape-nobg.png"
              alt="Robot qui commande en ligne"
              width={160}
              height={130}
              className="object-contain w-full h-full"
            />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, var(--color-bg-soft) 75%)" }} />
          </div>

          {/* Divider */}
          <div className="flex flex-col items-center gap-1 pb-4">
            <span className="text-lg font-bold text-slate-300">+</span>
          </div>

          {/* Agent robot */}
          <div className="relative w-[110px] h-[110px] sm:w-[140px] sm:h-[130px] pointer-events-none">
            <Image
              src="/appel-tel.png"
              alt="Robot qui répond au téléphone"
              width={140}
              height={130}
              className="object-contain w-full h-full"
            />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, var(--color-bg-soft) 75%)" }} />
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h3 className="reveal reveal-delay-1 text-2xl sm:text-3xl font-bold text-text">
            En ligne ou par téléphone, même résultat
          </h3>
          <p className="reveal reveal-delay-2 mt-3 text-lg text-text-secondary max-w-lg mx-auto">
            Les deux canaux arrivent sur le même tableau de bord.
            Combinez-les pour ne rater aucun client.
          </p>

          {/* Combo suggestion badge */}
          <div className="reveal reveal-delay-2 mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
            <Layers className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-semibold text-text-secondary">
              Combiner les deux modules = couverture totale de vos clients
            </span>
          </div>

          <div className="reveal reveal-delay-2 mt-5">
            <ArrowDown className="w-6 h-6 text-slate-300 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
