"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface AuthFormProps {
  mode: "login" | "signup";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);

  const isLogin = mode === "login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();

      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(error.message);
          return;
        }

        router.push(redirectTo);
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              restaurant_name: restaurantName,
            },
          },
        });

        if (error) {
          setError(error.message);
          return;
        }

        setConfirmationSent(true);
      }
    } catch {
      setError("Une erreur inattendue est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const inputClassName =
    "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-colors";

  const labelClassName = "block text-sm font-medium text-text mb-1.5";

  if (confirmationSent) {
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
          Vérifiez votre email
        </h2>
        <p className="text-sm text-text-muted">
          Un lien de confirmation a été envoyé à{" "}
          <span className="font-medium text-text">{email}</span>. Cliquez sur le
          lien pour activer votre compte.
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
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">
          {isLogin ? "Connexion" : "Créer un compte"}
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          {isLogin
            ? "Accédez à votre espace restaurant"
            : "Commencez à automatiser votre restaurant"}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className={labelClassName}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@restaurant.com"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="password" className={labelClassName}>
            Mot de passe
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

        {!isLogin && (
          <div>
            <label htmlFor="restaurant-name" className={labelClassName}>
              Nom du restaurant
            </label>
            <input
              id="restaurant-name"
              type="text"
              required
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              placeholder="Mon Restaurant"
              className={inputClassName}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={cn(
            "gradient-primary w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition-opacity",
            loading && "cursor-not-allowed opacity-70"
          )}
        >
          {loading
            ? "Chargement..."
            : isLogin
              ? "Se connecter"
              : "Créer mon compte"}
        </button>
      </form>

      {/* Footer link */}
      <p className="mt-6 text-center text-sm text-text-muted">
        {isLogin ? (
          <>
            Pas encore de compte ?{" "}
            <a
              href="/signup"
              className="font-medium text-orange-500 hover:text-orange-600 transition-colors"
            >
              S&apos;inscrire
            </a>
          </>
        ) : (
          <>
            Déjà un compte ?{" "}
            <a
              href="/login"
              className="font-medium text-orange-500 hover:text-orange-600 transition-colors"
            >
              Se connecter
            </a>
          </>
        )}
      </p>
    </motion.div>
  );
}
