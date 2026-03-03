"use client";

import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { MessageSquareMore, LayoutDashboard, Gift, ArrowDown } from "lucide-react";
import { ModuleSelectionProvider } from "@/context/ModuleSelectionContext";
import ModuleCartDrawer from "@/components/ui/ModuleCartDrawer";
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
    <ModuleSelectionProvider>
      <Navbar />
      <DemoProgressLine />
      <ModuleCartDrawer />

      <main className="relative">
        <HeroSection />
        <UrgencySection />
        <div className="relative bg-white">
          <LogoBar />
          <ImpactStatsSection />

          {/* ============================================= */}
          {/* TRANSITION — La solution OpexFood             */}
          {/* ============================================= */}
          <div className="relative py-20 sm:py-28 lg:py-32 bg-slate-900 overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px]" />
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-[80px]" />
            </div>

            <Container>
              <div className="relative text-center max-w-3xl mx-auto">
                {/* Label pill */}
                <div className="reveal flex justify-center mb-6 sm:mb-8">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-400 bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                    La solution
                  </span>
                </div>

                {/* Main title */}
                <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                  <span className="text-white">Opex</span>
                  <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Food</span>
                  <br className="sm:hidden" />
                  <span className="text-white">{" "}en action</span>
                </h2>

                {/* Decorative line */}
                <div className="reveal reveal-delay-1 mt-6 sm:mt-8 flex justify-center">
                  <div className="w-16 h-1 rounded-full bg-gradient-to-r from-orange-400 to-amber-400" />
                </div>

                {/* Subtitle */}
                <p className="reveal reveal-delay-2 mt-6 sm:mt-8 text-lg sm:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed">
                  Découvrez comment notre plateforme transforme votre restaurant en{" "}
                  <strong className="text-white font-semibold">3 étapes simples</strong>.
                </p>

                {/* Animated arrow */}
                <div className="reveal reveal-delay-3 mt-8 sm:mt-10">
                  <div className="w-10 h-10 mx-auto rounded-full border-2 border-orange-500/30 flex items-center justify-center">
                    <ArrowDown className="w-5 h-5 text-orange-400 animate-bounce" />
                  </div>
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
    </ModuleSelectionProvider>
  );
}
