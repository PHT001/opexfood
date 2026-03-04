"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  type RestaurantTheme,
  defaultTheme,
  themeToCSS,
} from "@/lib/dashboard/theme";

interface ThemeContextValue {
  theme: RestaurantTheme;
  cssVars: Record<string, string>;
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
  const cssVars = themeToCSS(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme: defaultTheme, cssVars }}>
      <div style={cssVars as React.CSSProperties}>{children}</div>
    </ThemeContext.Provider>
  );
}
