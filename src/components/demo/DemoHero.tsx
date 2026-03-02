"use client";

import { Sparkles } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";

export default function DemoHero() {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-white">
      <Container className="relative z-10 pt-28 pb-10">
        <div className="flex flex-col items-center text-center">
          <div className="hero-fade" style={{ animationDelay: "0s" }}>
            <Badge variant="orange" icon={Sparkles}>
              Demo Interactive
            </Badge>
          </div>

          <h1
            className="hero-fade mt-8 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="text-text">Vivez l&apos;experience</span>
            <br />
            <span className="text-text">Opex</span><span className="text-gradient-orange">Food</span>
          </h1>

          <p
            className="hero-fade mt-6 max-w-2xl text-lg sm:text-xl text-text-secondary leading-relaxed"
            style={{ animationDelay: "0.3s" }}
          >
            Suivez le parcours d&apos;un client — par chatbot ou par téléphone —
            et découvrez comment chaque module fonctionne en temps réel.
          </p>

        </div>
      </Container>

      <style jsx>{`
        .hero-fade {
          opacity: 0;
          animation: heroFadeUp 0.6s ease-out forwards;
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
