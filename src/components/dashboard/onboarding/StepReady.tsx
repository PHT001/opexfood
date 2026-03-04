"use client";

import { useEffect, useState } from "react";
import { Rocket, Users, Smartphone, LayoutDashboard, ExternalLink, PartyPopper } from "lucide-react";
import CounterQRCode from "@/components/dashboard/loyalty/CounterQRCode";

interface StepReadyProps {
  slug: string;
  onComplete: () => void;
}

export default function StepReady({ slug, onComplete }: StepReadyProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Mark onboarding as complete
    onComplete();
    // Animate in
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="space-y-6">
      <div className={`text-center transition-all duration-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <PartyPopper className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          Votre programme est prêt !
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Imprimez le QR code ci-dessous et placez-le sur votre comptoir.
          Vos clients n&apos;ont plus qu&apos;à scanner pour s&apos;inscrire.
        </p>
      </div>

      {/* QR Code */}
      <div className={`transition-all duration-500 delay-200 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <CounterQRCode slug={slug} />
      </div>

      {/* Action buttons */}
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 transition-all duration-500 delay-400 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <a
          href="/dashboard/espace/clients"
          className="flex items-center justify-center gap-2 py-3 px-4 glass-button-secondary rounded-xl text-sm"
        >
          <Users className="w-4 h-4" />
          Mes clients
        </a>
        <a
          href="/dashboard/espace/kiosque"
          className="flex items-center justify-center gap-2 py-3 px-4 glass-button-secondary rounded-xl text-sm"
        >
          <Smartphone className="w-4 h-4" />
          Kiosque scan
        </a>
        <a
          href={`/loyalty/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-4 glass-button-secondary rounded-xl text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          Tester
        </a>
      </div>

      {/* Go to dashboard */}
      <div className="flex justify-center pt-2">
        <a
          href="/dashboard"
          className="px-8 py-3 glass-button-primary rounded-xl text-sm flex items-center gap-2"
        >
          <LayoutDashboard className="w-4 h-4" />
          Aller au dashboard
        </a>
      </div>
    </div>
  );
}
