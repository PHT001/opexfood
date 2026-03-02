"use client";

import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import UrgencySection from "@/components/landing/UrgencySection";
import LogoBar from "@/components/landing/LogoBar";
import ImpactStatsSection from "@/components/landing/ImpactStatsSection";
import ModuleShowcase from "@/components/landing/ModuleShowcase";
import ROISection from "@/components/landing/ROISection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PricingSection from "@/components/landing/PricingSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  useRevealOnScroll();

  return (
    <>
      <Navbar />

      <main className="relative">
        <HeroSection />
        <UrgencySection />
        <div className="relative bg-white">
          <LogoBar />
          <ImpactStatsSection />
          <ModuleShowcase />
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
