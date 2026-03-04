"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?redirect=/reset-password`,
      });

      if (error) {
        setError(error.message);
        return;
      }

      setSent(true);
    } catch {
      setError("Une erreur inattendue est survenue.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-2xl border-t-4 border-orange-500 bg-white p-8 shadow-soft-lg text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
          <svg
            className="h-7 w-7 text-orange-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-text mb-2">
          Email envoyé
        </h2>
        <p className="text-sm text-text-muted">
          Si un compte existe pour{" "}
          <span className="font-medium text-text">{email}</span>, vous recevrez
          un lien pour réinitialiser votre mot de passe.
        </p>
        <a
          href="/login"
          className="mt-6 inline-block text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
        >
          Retour à la connexion
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl border-t-4 border-orange-500 bg-white p-8 shadow-soft-lg"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Mot de passe oublié</h1>
        <p className="mt-1 text-sm text-text-muted">
          Entrez votre email pour recevoir un lien de réinitialisation.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@restaurant.com"
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`gradient-primary w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition-opacity ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
        >
          {loading ? "Envoi..." : "Envoyer le lien"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        <a
          href="/login"
          className="font-medium text-orange-500 hover:text-orange-600 transition-colors"
        >
          Retour à la connexion
        </a>
      </p>
    </motion.div>
  );
}
