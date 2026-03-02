"use client";

import { coreModules } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import FloatingElements from "@/components/ui/FloatingElements";
import ModuleCard from "@/components/landing/ModuleCard";

const moduleColors = [
  { bg: "bg-orange-500", border: "border-orange-200", text: "text-white" },
  { bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-500" },
  { bg: "bg-violet-50", border: "border-violet-300", text: "text-violet-500" },
];

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
          {coreModules.map((module, index) => {
            const Icon = module.icon;
            const color = moduleColors[index];
            const isFirst = index === 0;
            return (
              <div key={module.id} className="flex flex-col items-center">
                {index > 0 && (
                  <div className="w-px h-10 bg-slate-200" />
                )}
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-full border-2 ${
                    isFirst
                      ? `${color.bg} border-transparent`
                      : `${color.bg} ${color.border}`
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${isFirst ? color.text : color.text}`}
                  />
                </div>
              </div>
            );
          })}
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
