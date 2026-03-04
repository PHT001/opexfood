"use client";

import { useEffect, useState, useCallback } from "react";

interface OnboardingState {
  step: number;
  completed: boolean;
}

let cachedState: OnboardingState | null = null;
let fetchPromise: Promise<OnboardingState | null> | null = null;

async function fetchOnboarding(): Promise<OnboardingState | null> {
  try {
    const res = await fetch("/api/dashboard/onboarding");
    if (!res.ok) return null;
    const data = await res.json();
    return {
      step: data.onboarding_step ?? 0,
      completed: data.onboarding_completed ?? false,
    };
  } catch {
    return null;
  }
}

export function useOnboarding() {
  const [state, setState] = useState<OnboardingState | null>(cachedState);
  const [loading, setLoading] = useState(!cachedState);

  useEffect(() => {
    if (cachedState) return;
    if (!fetchPromise) {
      fetchPromise = fetchOnboarding().then((s) => {
        cachedState = s;
        fetchPromise = null;
        return s;
      });
    }
    fetchPromise.then((s) => {
      setState(s);
      setLoading(false);
    });
  }, []);

  const setStep = useCallback(async (step: number) => {
    await fetch("/api/dashboard/onboarding", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step }),
    });
    const newState = { step, completed: cachedState?.completed ?? false };
    cachedState = newState;
    setState(newState);
  }, []);

  const complete = useCallback(async () => {
    await fetch("/api/dashboard/onboarding", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true, step: 3 }),
    });
    const newState = { step: 3, completed: true };
    cachedState = newState;
    setState(newState);
  }, []);

  return {
    step: state?.step ?? 0,
    completed: state?.completed ?? false,
    loading,
    setStep,
    complete,
  };
}

export function invalidateOnboardingCache() {
  cachedState = null;
  fetchPromise = null;
}
