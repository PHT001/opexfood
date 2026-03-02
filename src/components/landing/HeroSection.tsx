"use client";

import { Sparkles } from "lucide-react";
import { trustItems } from "@/lib/constants";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FloatingElements from "@/components/ui/FloatingElements";
import MascotHero from "./MascotHero";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-white"
    >
      <FloatingElements variant="hero" />
      <Container className="relative z-10 pt-28 pb-8 md:pt-36 md:pb-12">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="hero-fade" style={{ animationDelay: "0s" }}>
            <Badge variant="white" icon={Sparkles}>
              Plateforme IA pour la Restauration
            </Badge>
          </div>

          {/* Headline */}
          <h1
            className="hero-fade mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="text-text">Automatisez votre restaurant.</span>
            <br />
            <span className="text-gradient-orange">
              Fidélisez vos clients.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-fade mt-6 max-w-2xl text-lg sm:text-xl text-text-secondary leading-relaxed"
            style={{ animationDelay: "0.3s" }}
          >
            <span className="font-semibold text-slate-900">Opex</span><span className="font-semibold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Food</span> réunit chatbot IA, fidélité, CRM et
            outils de gestion dans une seule plateforme SaaS. Déjà
            déployé dans +50 restaurants.
          </p>

          {/* CTAs */}
          <div
            className="hero-fade mt-10 flex flex-col sm:flex-row gap-4"
            style={{ animationDelay: "0.45s" }}
          >
            <Button variant="primary" size="lg">
              Demander une Démo
            </Button>
            <a href="/demo">
              <Button variant="outline" size="lg">
                Tester maintenant
              </Button>
            </a>
          </div>

          {/* Trust Bar */}
          <div
            className="hero-fade mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8"
            style={{ animationDelay: "0.6s" }}
          >
            {trustItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && (
                    <div className="hidden sm:block w-px h-8 bg-border -ml-4 sm:-ml-4 mr-2 sm:mr-4" />
                  )}
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Icon className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      {/* Mascot + mockup card */}
      <div
        className="hero-fade relative z-10"
        style={{ animationDelay: "0.7s" }}
      >
        <MascotHero />
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />

      <style jsx>{`
        .hero-fade {
          opacity: 0;
          animation: heroFadeUp 0.6s ease-out forwards;
        }
        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
