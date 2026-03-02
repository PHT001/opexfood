"use client";

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
