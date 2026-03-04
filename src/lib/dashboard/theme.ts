// ─── Fixed Orange Theme — Liquid Glass ────────────────────────────────────────
// Single orange theme for all restaurants. No customization.

export interface RestaurantTheme {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  borderRadius: "rounded";
}

export function themeToCSS(theme: RestaurantTheme): Record<string, string> {
  return {
    "--crm-primary": theme.primary,
    "--crm-primary-light": theme.primaryLight,
    "--crm-primary-dark": theme.primaryDark,
    "--crm-secondary": theme.secondary,
    "--crm-accent": theme.accent,
    "--crm-radius": "0.75rem",
    "--crm-radius-card": "1rem",
    "--crm-font-weight": "500",
  };
}

export const defaultTheme: RestaurantTheme = {
  primary: "#ea580c",
  primaryLight: "#fed7aa",
  primaryDark: "#c2410c",
  secondary: "#0f172a",
  accent: "#f97316",
  borderRadius: "rounded",
};
