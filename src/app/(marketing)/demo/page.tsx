"use client";

import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { MessageSquareMore, LayoutDashboard, Gift } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import DemoHero from "@/components/demo/DemoHero";
import PhaseHeader from "@/components/demo/PhaseHeader";
import ChatbotSection from "@/components/demo/ChatbotSection";
import AgentSection from "@/components/demo/AgentSection";
import TransitionBridge from "@/components/demo/TransitionBridge";
import ComboBridge from "@/components/demo/ComboBridge";
import DashboardSection from "@/components/demo/DashboardSection";
import LoyaltySection from "@/components/demo/LoyaltySection";
import DemoCTA from "@/components/demo/DemoCTA";
import DemoProgressLine from "@/components/demo/DemoProgressLine";

export default function DemoPage() {
  useRevealOnScroll();
  return (
    <>
      <Navbar />

      <DemoProgressLine />

      <main className="relative bg-white">
        <DemoHero />

        {/* ============================================= */}
        {/* PHASE 1 : ACQUISITION CLIENT                  */}
        {/* ============================================= */}
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

        {/* ============================================= */}
        {/* PHASE 2 : CRM                                 */}
        {/* ============================================= */}
        <PhaseHeader
          number="2"
          title="CRM & Tableau de Bord"
          description="Toutes les commandes arrivent au même endroit — chatbot ou téléphone, le restaurateur voit tout en temps réel."
          color="blue"
          icon={<LayoutDashboard className="w-5 h-5 text-blue-600" />}
        />

        <DashboardSection />

        {/* ============================================= */}
        {/* PHASE 3 : FIDELITE                            */}
        {/* ============================================= */}
        <PhaseHeader
          number="3"
          title="Programme Fidélité"
          description="Transformez les clients ponctuels en habitués — un programme de points simple et automatique."
          color="violet"
          icon={<Gift className="w-5 h-5 text-violet-600" />}
        />

        <LoyaltySection />

        {/* Robot video before CTA */}
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

        <DemoCTA />
      </main>

      <Footer />
    </>
  );
}
