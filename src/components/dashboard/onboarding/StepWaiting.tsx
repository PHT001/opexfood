"use client";

import { useEffect, useState } from "react";
import { Clock, CheckCircle2, Loader2, Sparkles } from "lucide-react";

interface StepWaitingProps {
  onBack: () => void;
}

const milestones = [
  { label: "Informations reçues", done: true },
  { label: "Documents analysés", done: true },
  { label: "Configuration de votre CRM", done: false, active: true },
  { label: "Interface prête", done: false },
];

export default function StepWaiting({ onBack }: StepWaitingProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        {/* Animated icon */}
        <div className="relative inline-flex items-center justify-center w-20 h-20 mb-4">
          <div className="absolute inset-0 rounded-full bg-orange-100 animate-pulse" />
          <Sparkles className="relative w-8 h-8 text-orange-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Votre espace est en cours de préparation{dots}
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          Notre équipe configure votre CRM personnalisé. Vous recevrez un email
          dès que tout sera prêt. Temps estimé : <strong>48h maximum</strong>.
        </p>
      </div>

      {/* Progress milestones */}
      <div className="max-w-sm mx-auto mt-8">
        <div className="space-y-0">
          {milestones.map((m, i) => (
            <div key={m.label} className="flex items-start gap-3">
              {/* Line + dot */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    m.done
                      ? "bg-green-100"
                      : m.active
                        ? "bg-orange-100"
                        : "bg-slate-100"
                  }`}
                >
                  {m.done ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : m.active ? (
                    <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
                  ) : (
                    <Clock className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                {i < milestones.length - 1 && (
                  <div
                    className={`w-0.5 h-8 ${m.done ? "bg-green-300" : "bg-slate-200"}`}
                  />
                )}
              </div>
              {/* Label */}
              <div className="pt-1">
                <p
                  className={`text-sm font-medium ${
                    m.done
                      ? "text-green-700"
                      : m.active
                        ? "text-orange-700"
                        : "text-slate-400"
                  }`}
                >
                  {m.label}
                </p>
                {m.active && (
                  <p className="text-xs text-orange-500 mt-0.5">En cours...</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info card */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
        <p className="text-sm text-slate-600">
          Vous pouvez fermer cette page. Nous vous enverrons un email à
          l&apos;adresse associée à votre compte dès que votre espace sera prêt.
        </p>
      </div>

      <div className="flex justify-between pt-2">
        <button
          onClick={onBack}
          className="px-6 py-2.5 border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors"
        >
          Retour
        </button>
        <a
          href="/dashboard"
          className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors inline-flex items-center"
        >
          Aller au dashboard
        </a>
      </div>
    </div>
  );
}
