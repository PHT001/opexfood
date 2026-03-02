"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  questions,
  type QuestionnaireAnswers,
  type CuisineType,
  type Ambiance,
  type ServiceMode,
  type RestaurantStyle,
  generateTheme,
  themeToCSS,
} from "@/lib/dashboard/theme";
import { useRestaurantTheme } from "./ThemeProvider";

interface ThemeQuestionnaireProps {
  onComplete?: () => void;
}

export default function ThemeQuestionnaire({
  onComplete,
}: ThemeQuestionnaireProps) {
  const { applyAnswers, hasCustomTheme, resetTheme } = useRestaurantTheme();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  const currentQ = questions[step];
  const totalSteps = questions.length;
  const isLast = step === totalSteps - 1;
  const canGoNext = Boolean(answers[currentQ?.id]);

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
  };

  const handleNext = () => {
    if (isLast) {
      setShowPreview(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (showPreview) {
      setShowPreview(false);
    } else if (step > 0) {
      setStep((s) => s - 1);
    }
  };

  const handleConfirm = () => {
    const finalAnswers: QuestionnaireAnswers = {
      cuisineType: (answers.cuisineType as CuisineType) || "mediterraneen",
      ambiance: (answers.ambiance as Ambiance) || "moderne",
      serviceMode: (answers.serviceMode as ServiceMode) || "mixte",
      restaurantStyle: (answers.restaurantStyle as RestaurantStyle) || "moyen",
    };
    applyAnswers(finalAnswers);
    // onComplete triggers the loading overlay at page level
    onComplete?.();
  };

  // Generate preview theme from current answers
  const previewTheme = showPreview
    ? generateTheme({
        cuisineType: (answers.cuisineType as CuisineType) || "mediterraneen",
        ambiance: (answers.ambiance as Ambiance) || "moderne",
        serviceMode: (answers.serviceMode as ServiceMode) || "mixte",
        restaurantStyle: (answers.restaurantStyle as RestaurantStyle) || "moyen",
      })
    : null;

  const previewCSS = previewTheme ? themeToCSS(previewTheme) : {};

  if (hasCustomTheme && !showPreview && step === 0 && !answers[currentQ?.id]) {
    // Show "already configured" state with option to reconfigure
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-lg mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-7 h-7 text-green-600" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          Votre thème est configuré !
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          Votre interface est déjà personnalisée. Vous pouvez relancer le
          questionnaire pour changer de style.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => {
              resetTheme();
              setStep(0);
              setAnswers({});
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-500">
            Étape {showPreview ? totalSteps + 1 : step + 1} /{" "}
            {totalSteps + 1}
          </span>
          <span className="text-xs text-slate-400">
            {showPreview
              ? "Confirmation"
              : currentQ?.question?.slice(0, 30) + "..."}
          </span>
        </div>
        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-orange-500"
            initial={{ width: 0 }}
            animate={{
              width: `${((showPreview ? totalSteps + 1 : step + 1) / (totalSteps + 1)) * 100}%`,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showPreview && previewTheme ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-7 h-7 text-orange-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Voici votre thème !
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Basé sur vos réponses, voici le style généré pour votre
                  interface CRM.
                </p>
              </div>

              {/* Live preview */}
              <div
                className="rounded-xl border-2 p-6 space-y-4 mb-6"
                style={{
                  borderColor: previewCSS["--crm-card-border"],
                  backgroundColor: previewCSS["--crm-surface"],
                  ...previewCSS as React.CSSProperties,
                }}
              >
                {/* Mini nav preview */}
                <div className="flex items-center gap-2">
                  <div
                    className="px-4 py-2 text-white text-sm font-semibold"
                    style={{
                      backgroundColor: previewTheme.primary,
                      borderRadius:
                        previewTheme.borderRadius === "pill"
                          ? "9999px"
                          : previewTheme.borderRadius === "rounded"
                            ? "0.5rem"
                            : "0.25rem",
                    }}
                  >
                    Live Commandes
                  </div>
                  <div
                    className="px-4 py-2 text-sm font-medium"
                    style={{
                      backgroundColor: previewTheme.cardBg,
                      color: previewTheme.secondary,
                      border: `1px solid ${previewTheme.cardBorder}`,
                      borderRadius:
                        previewTheme.borderRadius === "pill"
                          ? "9999px"
                          : previewTheme.borderRadius === "rounded"
                            ? "0.5rem"
                            : "0.25rem",
                    }}
                  >
                    Stocks
                  </div>
                  <div
                    className="px-4 py-2 text-sm font-medium"
                    style={{
                      backgroundColor: previewTheme.cardBg,
                      color: previewTheme.secondary,
                      border: `1px solid ${previewTheme.cardBorder}`,
                      borderRadius:
                        previewTheme.borderRadius === "pill"
                          ? "9999px"
                          : previewTheme.borderRadius === "rounded"
                            ? "0.5rem"
                            : "0.25rem",
                    }}
                  >
                    Historique
                  </div>
                </div>

                {/* Mini card preview */}
                <div className="grid grid-cols-3 gap-3">
                  {["En attente", "En préparation", "Prêtes"].map(
                    (label, i) => (
                      <div
                        key={label}
                        className="p-3"
                        style={{
                          backgroundColor: previewTheme.cardBg,
                          border: `1px solid ${previewTheme.cardBorder}`,
                          borderRadius:
                            previewTheme.borderRadius === "pill"
                              ? "1rem"
                              : previewTheme.borderRadius === "rounded"
                                ? "0.75rem"
                                : "0.375rem",
                        }}
                      >
                        <div
                          className="text-xs font-semibold mb-2"
                          style={{
                            color:
                              i === 0
                                ? previewTheme.accent
                                : i === 1
                                  ? previewTheme.primary
                                  : "#16a34a",
                          }}
                        >
                          {label}
                        </div>
                        <div
                          className="h-2 rounded-full mb-1.5"
                          style={{
                            backgroundColor: previewTheme.primaryLight,
                            width: "80%",
                          }}
                        />
                        <div
                          className="h-2 rounded-full"
                          style={{
                            backgroundColor: previewTheme.cardBorder,
                            width: "50%",
                          }}
                        />
                      </div>
                    )
                  )}
                </div>

                {/* Color swatches */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: previewTheme.primary }}
                    />
                    <span className="text-xs text-slate-500">Primaire</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: previewTheme.secondary }}
                    />
                    <span className="text-xs text-slate-500">Secondaire</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: previewTheme.accent }}
                    />
                    <span className="text-xs text-slate-500">Accent</span>
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-xs text-slate-400">
                      {previewTheme.borderRadius === "pill"
                        ? "Arrondi"
                        : previewTheme.borderRadius === "rounded"
                          ? "Classique"
                          : "Angulaire"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Modifier
                </button>
                <button
                  onClick={handleConfirm}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Appliquer ce thème
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                {currentQ.question}
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                {currentQ.description}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {currentQ.options.map((opt) => {
                  const selected = answers[currentQ.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className={cn(
                        "relative flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200",
                        selected
                          ? "border-orange-500 bg-orange-50 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      )}
                    >
                      <span className="text-2xl leading-none mt-0.5">
                        {opt.emoji}
                      </span>
                      <div className="min-w-0">
                        <p
                          className={cn(
                            "text-sm font-semibold",
                            selected ? "text-orange-700" : "text-slate-900"
                          )}
                        >
                          {opt.label}
                        </p>
                        {opt.description && (
                          <p
                            className={cn(
                              "text-xs mt-0.5",
                              selected ? "text-orange-500" : "text-slate-400"
                            )}
                          >
                            {opt.description}
                          </p>
                        )}
                      </div>
                      {/* Selected check */}
                      {selected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center"
                        >
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className={cn(
                    "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium transition-colors",
                    step === 0
                      ? "border-slate-100 text-slate-300 cursor-not-allowed"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canGoNext}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors",
                    canGoNext
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-slate-100 text-slate-300 cursor-not-allowed"
                  )}
                >
                  {isLast ? "Voir le résultat" : "Suivant"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
