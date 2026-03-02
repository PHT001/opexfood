"use client";

import { additionalModules } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MiniModuleCard from "@/components/landing/MiniModuleCard";

export default function AdditionalModules() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-bg-soft">
      <Container>
        <SectionHeader
          label="ET BIEN PLUS ENCORE"
          title="Des modules pour chaque besoin"
          subtitle="Complétez votre plateforme avec des outils spécialisés."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {additionalModules.map((module, index) => (
            <MiniModuleCard key={module.id} module={module} index={index} />
          ))}
        </div>

        <div className="reveal mt-10 flex justify-center">
          <a href="/demo">
            <Button variant="outline" size="lg">
              Tester maintenant
            </Button>
          </a>
        </div>
      </Container>
    </section>
  );
}
