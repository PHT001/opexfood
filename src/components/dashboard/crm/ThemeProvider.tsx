"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  type RestaurantTheme,
  defaultTheme,
  loadTheme,
  saveTheme,
  themeToCSS,
  generateTheme,
  type QuestionnaireAnswers,
} from "@/lib/dashboard/theme";

interface ThemeContextValue {
  theme: RestaurantTheme;
  setTheme: (theme: RestaurantTheme) => void;
  applyAnswers: (answers: QuestionnaireAnswers) => void;
  updateColor: (key: "primary" | "secondary" | "accent", value: string) => void;
  cssVars: Record<string, string>;
  hasCustomTheme: boolean;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useRestaurantTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error("useRestaurantTheme must be used inside CrmThemeProvider");
  return ctx;
}

export default function CrmThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setThemeState] = useState<RestaurantTheme>(defaultTheme);
  const [hasCustomTheme, setHasCustomTheme] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    const stored = loadTheme();
    if (stored) {
      setThemeState(stored);
      setHasCustomTheme(true);
    }
  }, []);

  const setTheme = (t: RestaurantTheme) => {
    setThemeState(t);
    saveTheme(t);
    setHasCustomTheme(true);
  };

  const applyAnswers = (answers: QuestionnaireAnswers) => {
    const generated = generateTheme(answers);
    setTheme(generated);
  };

  const updateColor = (
    key: "primary" | "secondary" | "accent",
    value: string
  ) => {
    setTheme({ ...theme, [key]: value });
  };

  const resetTheme = () => {
    setThemeState(defaultTheme);
    setHasCustomTheme(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("opexfood_restaurant_theme");
    }
  };

  const cssVars = themeToCSS(theme);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        applyAnswers,
        updateColor,
        cssVars,
        hasCustomTheme,
        resetTheme,
      }}
    >
      <div style={cssVars as React.CSSProperties}>{children}</div>
    </ThemeContext.Provider>
  );
}
