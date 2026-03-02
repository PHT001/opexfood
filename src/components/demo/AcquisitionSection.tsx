"use client";

import Image from "next/image";
import { MessageSquareMore, Phone, ArrowDown } from "lucide-react";
import Container from "@/components/ui/Container";

export default function AcquisitionSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
      <Container>
        {/* Section title */}
        <div className="text-center mb-14">
          <span className="reveal text-xs font-semibold uppercase tracking-widest text-orange-600">
            2 canaux d&apos;acquisition
          </span>
          <h2 className="reveal reveal-delay-1 mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-text leading-tight">
            Vos clients commandent comme ils veulent
          </h2>
          <p className="reveal reveal-delay-2 mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
            Par message ou par téléphone, l&apos;IA prend la commande automatiquement.
            Deux modules, un seul objectif : ne plus rater aucun client.
          </p>
        </div>

        {/* Two channel cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Canal 1 — Chatbot */}
          <a href="#step-chatbot" className="group reveal reveal-delay-1">
            <div className="relative rounded-2xl border-2 border-orange-200 bg-gradient-to-b from-orange-50/80 to-white p-6 pb-0 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 hover:border-orange-300">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-orange-200 shadow-sm">
                <MessageSquareMore className="w-3.5 h-3.5 text-orange-600" />
                <span className="text-xs font-bold text-orange-700">Module Chatbot + CRM</span>
                <span className="text-[10px] text-orange-500 font-semibold">159€/mois</span>
              </div>

              {/* Title + description */}
              <h3 className="mt-4 text-xl font-bold text-text">
                Il commande en ligne
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                Via WhatsApp, votre site ou un QR code en salle.
                Le chatbot IA prend la commande en langage naturel, 24h/24.
              </p>

              {/* Robot image */}
              <div className="relative mt-6 flex justify-center">
                <Image
                  src="/canape-nobg.png"
                  alt="Robot sur canape qui commande en ligne"
                  width={280}
                  height={220}
                  className="object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Arrow hint */}
              <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowDown className="w-5 h-5 text-orange-400 animate-bounce" />
              </div>
            </div>
          </a>

          {/* Canal 2 — Agent Réceptionniste */}
          <a href="#step-agent" className="group reveal reveal-delay-2">
            <div className="relative rounded-2xl border-2 border-emerald-200 bg-gradient-to-b from-emerald-50/80 to-white p-6 pb-0 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:border-emerald-300">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-emerald-200 shadow-sm">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-700">Module Agent Receptionniste IA</span>
                <span className="text-[10px] text-emerald-500 font-semibold">99€/mois</span>
              </div>

              {/* Title + description */}
              <h3 className="mt-4 text-xl font-bold text-text">
                Ou il appelle directement
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                L&apos;agent IA décroche en moins de 2 secondes.
                Réservations, commandes, informations — comme un vrai réceptionniste.
              </p>

              {/* Robot image */}
              <div className="relative mt-6 flex justify-center">
                <Image
                  src="/appel-tel.png"
                  alt="Robot qui répond au téléphone"
                  width={240}
                  height={220}
                  className="object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Arrow hint */}
              <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowDown className="w-5 h-5 text-emerald-400 animate-bounce" />
              </div>
            </div>
          </a>
        </div>

        {/* Bottom flow arrow */}
        <div className="reveal mt-12 flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-orange-200" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Les 2 arrivent sur le meme CRM</span>
            <div className="h-px w-16 bg-emerald-200" />
          </div>
          <ArrowDown className="w-5 h-5 text-slate-300" />
        </div>
      </Container>
    </section>
  );
}
