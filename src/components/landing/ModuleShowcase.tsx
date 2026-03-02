"use client";

import { MessageSquareMore, Gift, LayoutDashboard } from "lucide-react";
import { coreModules } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import FloatingElements from "@/components/ui/FloatingElements";
import ModuleCard from "@/components/landing/ModuleCard";

export default function ModuleShowcase() {
  return (
    <section id="modules" className="relative py-16 sm:py-20">
      <FloatingElements variant="modules" />
      <Container>
        <SectionHeader
          label="NOS MODULES"
          title="Tout ce dont votre restaurant a besoin"
          subtitle="Trois modules puissants qui travaillent ensemble pour automatiser votre activité."
        />

        {/* Vertical timeline — mobile & tablet only (hidden on lg+) */}
        <div
          id="module-timeline"
          style={{
            marginTop: "3rem",
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Chatbot — orange filled */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: "50%", backgroundColor: "#f97316" }}>
            <MessageSquareMore style={{ width: 24, height: 24, color: "#ffffff" }} />
          </div>

          {/* Line */}
          <div style={{ width: 1, height: 40, backgroundColor: "#cbd5e1" }} />

          {/* Fidélité — violet outlined */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: "50%", backgroundColor: "#f5f3ff", border: "2px solid #c4b5fd" }}>
            <Gift style={{ width: 24, height: 24, color: "#8b5cf6" }} />
          </div>

          {/* Line */}
          <div style={{ width: 1, height: 40, backgroundColor: "#cbd5e1" }} />

          {/* CRM — blue outlined */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: "50%", backgroundColor: "#eff6ff", border: "2px solid #93c5fd" }}>
            <LayoutDashboard style={{ width: 24, height: 24, color: "#3b82f6" }} />
          </div>
        </div>

        <style jsx>{`
          @media (min-width: 1024px) {
            #module-timeline {
              display: none !important;
            }
          }
        `}</style>

        <div className="mt-16 space-y-16 lg:space-y-20">
          {coreModules.map((module, index) => (
            <ModuleCard
              key={module.id}
              module={module}
              reversed={index % 2 !== 0}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
