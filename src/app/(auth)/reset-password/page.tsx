"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setError(error.message);
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch {
      setError("Une erreur inattendue est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const inputClassName =
    "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-colors";

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-2xl border-t-4 border-orange-500 bg-white p-8 shadow-soft-lg text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-7 w-7 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-text mb-2">
          Mot de passe modifié
        </h2>
        <p className="text-sm text-text-muted">
          Redirection vers votre tableau de bord...
        </p>
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
        <h1 className="text-2xl font-bold text-text">
          Nouveau mot de passe
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Choisissez un nouveau mot de passe pour votre compte.
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
            htmlFor="password"
            className="block text-sm font-medium text-text mb-1.5"
          >
            Nouveau mot de passe
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            minLength={6}
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="confirm"
            className="block text-sm font-medium text-text mb-1.5"
          >
            Confirmer le mot de passe
          </label>
          <input
            id="confirm"
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            minLength={6}
            className={inputClassName}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`gradient-primary w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition-opacity ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
        >
          {loading ? "Modification..." : "Modifier le mot de passe"}
        </button>
      </form>
    </motion.div>
  );
}
