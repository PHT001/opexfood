"use client";

import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { MessageSquareMore, LayoutDashboard, Gift } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
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
          {/* DEMO INTERACTIVE — remplace ModuleShowcase    */}
          {/* ============================================= */}
          <div id="modules">
            <PhaseHeader
              number="1"
              title="Acquisition Client"
              description="Vos clients vous contactent par chatbot ou par téléphone — l'IA gère les deux canaux automatiquement."
              color="orange"
              icon={<MessageSquareMore className="w-5 h-5 text-orange-600" />}
            />

            <ChatbotSection />

            <TransitionBridge
              text="Et quand le client préfère appeler ?"
              subtext="L'IA décroche aussi — un deuxième canal pour ne rater aucun client."
            />

            <AgentSection />

            <ComboBridge />

            <PhaseHeader
              number="2"
              title="CRM & Tableau de Bord"
              description="Toutes les commandes arrivent au même endroit — chatbot ou téléphone, le restaurateur voit tout en temps réel."
              color="blue"
              icon={<LayoutDashboard className="w-5 h-5 text-blue-600" />}
            />

            <DashboardSection />

            <PhaseHeader
              number="3"
              title="Programme Fidélité"
              description="Transformez les clients ponctuels en habitués — un programme de points simple et automatique."
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
