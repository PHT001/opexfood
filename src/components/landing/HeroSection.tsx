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
            className="hero-fade mt-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight"
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
            <strong className="text-slate-900">Chatbot IA</strong>, <strong className="text-slate-900">agent vocal</strong>, <strong className="text-slate-900">fidélité</strong> et <strong className="text-slate-900">CRM</strong> — tout dans une seule plateforme. Déjà adopté par <strong className="text-slate-900">+50 restaurants</strong>.
          </p>

          {/* CTAs */}
          <div
            className="hero-fade mt-10 flex flex-col sm:flex-row gap-4"
            style={{ animationDelay: "0.45s" }}
          >
            <a href="#modules">
              <Button variant="primary" size="lg">
                Tester maintenant
              </Button>
            </a>
          </div>

          {/* Social Proof — avatars + rating */}
          <div
            className="hero-fade mt-10 flex items-center justify-center gap-3"
            style={{ animationDelay: "0.6s" }}
          >
            {/* Stacked avatars */}
            <div className="flex -space-x-2.5">
              {[
                "/avatars/avatar-1.jpg",
                "/avatars/avatar-2.jpg",
                "/avatars/avatar-3.jpg",
                "/avatars/avatar-4.jpg",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Client satisfait"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-white"
                />
              ))}
            </div>

            {/* Rating text */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm sm:text-base font-semibold text-slate-800">4.9/5</span>
              <span className="text-xs sm:text-sm text-slate-500">de</span>
              <span className="text-sm sm:text-base font-bold text-slate-800">1 783</span>
              <span className="text-xs sm:text-sm text-slate-500">restaurateurs</span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#3B82F6" />
                <path d="M8.5 12.5l2 2 5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Trust Bar */}
          <div
            className="hero-fade mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8"
            style={{ animationDelay: "0.75s" }}
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
