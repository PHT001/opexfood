"use client";

import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { MessageSquareMore, LayoutDashboard, Gift, ArrowDown } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Container from "@/components/ui/Container";
import HeroSection from "@/components/landing/HeroSection";
import UrgencySection from "@/components/landing/UrgencySection";
import LogoBar from "@/components/landing/LogoBar";
import ImpactStatsSection from "@/components/landing/ImpactStatsSection";
// Demo sections (replace static ModuleShowcase)
import DemoProgressLine from "@/components/demo/DemoProgressLine";
import PhaseHeader from "@/components/demo/PhaseHeader";
import ChatbotSection from "@/components/demo/ChatbotSection";
import TransitionBridge from "@/components/demo/TransitionBridge";
import AgentSection from "@/components/demo/AgentSection";
import ComboBridge from "@/components/demo/ComboBridge";
import DashboardSection from "@/components/demo/DashboardSection";
import LoyaltySection from "@/components/demo/LoyaltySection";
// Closing sections
import ROISection from "@/components/landing/ROISection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  useRevealOnScroll();

  return (
    <>
      <Navbar />
      <DemoProgressLine />

      <main className="relative">
        <HeroSection />
        <UrgencySection />
        <div className="relative bg-white">
          <LogoBar />
          <ImpactStatsSection />

          {/* ============================================= */}
          {/* TRANSITION — La solution OpexFood             */}
          {/* ============================================= */}
          <div className="relative py-16 sm:py-20 bg-white">
            <Container>
              <div className="text-center max-w-2xl mx-auto">
                <span className="reveal text-xs font-semibold uppercase tracking-widest text-orange-600">
                  La solution
                </span>
                <h2 className="reveal reveal-delay-1 mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-text">
                  <span className="text-slate-900">Opex</span>
                  <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Food</span>
                  {" "}en action
                </h2>
                <p className="reveal reveal-delay-2 mt-4 text-base sm:text-lg text-text-secondary">
                  Découvrez comment notre plateforme transforme votre restaurant en{" "}
                  <strong className="text-text font-semibold">3 étapes simples</strong>.
                </p>
                <div className="reveal reveal-delay-3 mt-6">
                  <ArrowDown className="w-5 h-5 text-orange-300 mx-auto animate-bounce" />
                </div>
              </div>
            </Container>
          </div>

          {/* ============================================= */}
          {/* DEMO INTERACTIVE — modules                    */}
          {/* ============================================= */}
          <div id="modules">
            <PhaseHeader
              number="1"
              title="Acquisition Client"
              description="L'IA gère chatbot et téléphone — deux canaux, zéro effort."
              color="orange"
              icon={<MessageSquareMore className="w-5 h-5 text-orange-600" />}
            />

            <ChatbotSection />

            <TransitionBridge
              text="Et quand le client préfère appeler ?"
              subtext="L'IA décroche aussi — un 2ème canal, zéro client perdu."
            />

            <AgentSection />

            <ComboBridge />

            <PhaseHeader
              number="2"
              title="CRM & Tableau de Bord"
              description="Chatbot ou téléphone — toutes les commandes au même endroit, en temps réel."
              color="blue"
              icon={<LayoutDashboard className="w-5 h-5 text-blue-600" />}
            />

            <DashboardSection />

            <PhaseHeader
              number="3"
              title="Programme Fidélité"
              description="Transformez chaque client en habitué — programme de points automatique."
              color="violet"
              icon={<Gift className="w-5 h-5 text-violet-600" />}
            />

            <LoyaltySection />

            {/* Robot mascot video transition */}
            <div className="relative w-full bg-white overflow-hidden">
              <div className="relative max-w-2xl mx-auto reveal-scale">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-auto block pointer-events-none"
                  src="/robot-demo-2.mp4"
                />
                <div className="absolute inset-y-0 left-0 w-[15%] pointer-events-none" style={{ background: "linear-gradient(to right, white 0%, transparent 100%)" }} />
                <div className="absolute inset-y-0 right-0 w-[15%] pointer-events-none" style={{ background: "linear-gradient(to left, white 0%, transparent 100%)" }} />
                <div className="absolute inset-x-0 top-0 h-[20%] pointer-events-none" style={{ background: "linear-gradient(to bottom, white 0%, transparent 100%)" }} />
                <div className="absolute inset-x-0 bottom-0 h-[20%] pointer-events-none" style={{ background: "linear-gradient(to top, white 0%, transparent 100%)" }} />
              </div>
            </div>
          </div>

          <ROISection />
          <PricingSection />
          <TestimonialsSection />
          <CTASection />
        </div>
      </main>

      <Footer />
    </>
  );
}
