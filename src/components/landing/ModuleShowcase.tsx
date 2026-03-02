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

        {/* Vertical timeline — mobile only */}
        <div className="mt-12 mb-4 flex flex-col items-center lg:hidden">
          {/* Chatbot — orange filled */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-orange-500">
              <MessageSquareMore className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Line */}
          <div className="w-px h-10" style={{ backgroundColor: "#cbd5e1" }} />

          {/* Fidélité — violet outlined */}
          <div className="flex flex-col items-center">
            <div
              className="flex items-center justify-center w-14 h-14 rounded-full"
              style={{ backgroundColor: "#f5f3ff", border: "2px solid #c4b5fd" }}
            >
              <Gift className="w-6 h-6" style={{ color: "#8b5cf6" }} />
            </div>
          </div>

          {/* Line */}
          <div className="w-px h-10" style={{ backgroundColor: "#cbd5e1" }} />

          {/* CRM — blue outlined */}
          <div className="flex flex-col items-center">
            <div
              className="flex items-center justify-center w-14 h-14 rounded-full"
              style={{ backgroundColor: "#eff6ff", border: "2px solid #93c5fd" }}
            >
              <LayoutDashboard className="w-6 h-6" style={{ color: "#3b82f6" }} />
            </div>
          </div>
        </div>

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
