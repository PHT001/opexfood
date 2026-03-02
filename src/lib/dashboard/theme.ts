// ─── Restaurant Theme System ────────────────────────────────────────────────
// Questionnaire answers → Theme preset → CSS variables applied to CRM

export interface RestaurantTheme {
  // Identity
  restaurantStyle: RestaurantStyle;
  cuisineType: CuisineType;
  ambiance: Ambiance;
  serviceMode: ServiceMode;

  // Generated palette
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceHover: string;
  cardBg: string;
  cardBorder: string;
  sidebarBg: string;
  sidebarBorder: string;

  // Generated style
  borderRadius: "sharp" | "rounded" | "pill";
  fontWeight: "normal" | "bold";
  navStyle: "solid" | "outline" | "ghost";
}

export type CuisineType =
  | "mediterraneen"
  | "asiatique"
  | "fast_food"
  | "gastronomique"
  | "oriental"
  | "healthy"
  | "pizzeria"
  | "autre";

export type Ambiance =
  | "moderne"
  | "traditionnel"
  | "decontracte"
  | "elegant"
  | "industriel"
  | "nature";

export type ServiceMode = "surplace" | "livraison" | "mixte";

export type RestaurantStyle = "petit" | "moyen" | "grand" | "chaine";

// ─── Questionnaire definitions ──────────────────────────────────────────────

export interface QuestionDef {
  id: string;
  question: string;
  description: string;
  options: { value: string; label: string; emoji: string; description?: string }[];
}

export const questions: QuestionDef[] = [
  {
    id: "cuisineType",
    question: "Quel type de cuisine proposez-vous ?",
    description: "Cela influence les couleurs et le style de votre interface.",
    options: [
      { value: "mediterraneen", label: "Méditerranéen", emoji: "🫒", description: "Bowls, salades, grillades" },
      { value: "asiatique", label: "Asiatique", emoji: "🥢", description: "Sushi, ramen, wok" },
      { value: "fast_food", label: "Fast Food", emoji: "🍔", description: "Burgers, wraps, frites" },
      { value: "gastronomique", label: "Gastronomique", emoji: "🍽️", description: "Cuisine raffinée" },
      { value: "oriental", label: "Oriental", emoji: "🧆", description: "Couscous, tajines, grillades" },
      { value: "healthy", label: "Healthy / Veggie", emoji: "🥗", description: "Bio, végétarien, smoothies" },
      { value: "pizzeria", label: "Pizzeria", emoji: "🍕", description: "Pizzas, calzones, pasta" },
      { value: "autre", label: "Autre", emoji: "🍴", description: "Cuisine variée" },
    ],
  },
  {
    id: "ambiance",
    question: "Quelle ambiance décrit le mieux votre restaurant ?",
    description: "L'ambiance détermine l'atmosphère visuelle de votre CRM.",
    options: [
      { value: "moderne", label: "Moderne & Épuré", emoji: "✨", description: "Lignes nettes, minimaliste" },
      { value: "traditionnel", label: "Traditionnel & Chaleureux", emoji: "🏡", description: "Bois, textures naturelles" },
      { value: "decontracte", label: "Décontracté & Fun", emoji: "😎", description: "Coloré, dynamique" },
      { value: "elegant", label: "Élégant & Luxe", emoji: "💎", description: "Sombre, doré, premium" },
      { value: "industriel", label: "Industriel & Urban", emoji: "🏗️", description: "Brut, contrasté" },
      { value: "nature", label: "Nature & Organique", emoji: "🌿", description: "Vert, terre, doux" },
    ],
  },
  {
    id: "serviceMode",
    question: "Quel est votre mode de service principal ?",
    description: "Cela adapte la priorité des informations affichées.",
    options: [
      { value: "surplace", label: "Sur place", emoji: "🪑", description: "Service à table uniquement" },
      { value: "livraison", label: "Livraison / Click & Collect", emoji: "🛵", description: "Commandes en ligne" },
      { value: "mixte", label: "Les deux", emoji: "🔄", description: "Sur place + livraison" },
    ],
  },
  {
    id: "restaurantStyle",
    question: "Quelle est la taille de votre établissement ?",
    description: "Influence la densité d'information de l'interface.",
    options: [
      { value: "petit", label: "Petit (< 30 couverts)", emoji: "🏪" },
      { value: "moyen", label: "Moyen (30-80 couverts)", emoji: "🏢" },
      { value: "grand", label: "Grand (80+ couverts)", emoji: "🏨" },
      { value: "chaine", label: "Chaîne / Multi-sites", emoji: "🌐" },
    ],
  },
];

// ─── Theme generation from answers ──────────────────────────────────────────

// Palettes intelligentes — chaque cuisine évoque ses couleurs culturelles
const cuisinePalettes: Record<CuisineType, { primary: string; accent: string; secondary: string }> = {
  mediterraneen: { primary: "#0ea5e9", accent: "#f59e0b", secondary: "#0c4a6e" },   // Bleu mer + sable doré
  asiatique:     { primary: "#dc2626", accent: "#eab308", secondary: "#7f1d1d" },    // Rouge tradition + or
  fast_food:     { primary: "#ef4444", accent: "#f97316", secondary: "#1e293b" },    // Rouge vif + orange
  gastronomique: { primary: "#1e3a5f", accent: "#d4a017", secondary: "#0f172a" },    // Bleu marine + or luxe
  oriental:      { primary: "#c2410c", accent: "#d97706", secondary: "#7c2d12" },    // Terracotta + safran
  healthy:       { primary: "#16a34a", accent: "#84cc16", secondary: "#14532d" },    // Vert nature + citron vert
  pizzeria:      { primary: "#dc2626", accent: "#15803d", secondary: "#450a0a" },    // Rouge tomate + vert basilic
  autre:         { primary: "#6366f1", accent: "#8b5cf6", secondary: "#1e1b4b" },    // Indigo + violet
};

interface AmbianceStyle {
  secondary: string;
  background: string;
  surface: string;
  surfaceHover: string;
  cardBg: string;
  cardBorder: string;
  sidebarBg: string;
  sidebarBorder: string;
  borderRadius: RestaurantTheme["borderRadius"];
  fontWeight: RestaurantTheme["fontWeight"];
  navStyle: RestaurantTheme["navStyle"];
}

// ─── Ambiance Styles ─────────────────────────────────────────────────────────
// Principe : l'ambiance définit surfaces, bordures, coins et typo.
// La couleur primary/secondary vient TOUJOURS de la cuisine palette,
// sauf "elegant" (dark mode) qui override secondary en clair.
// Pas de sidebar sombre en mode clair (sinon texte illisible).
const ambianceStyles: Record<Ambiance, AmbianceStyle> = {
  // Moderne — blanc épuré, tons bleu-gris froids, professionnel
  moderne: {
    secondary: "",
    background: "#f8fafc",
    surface: "#f1f5f9",
    surfaceHover: "#e2e8f0",
    cardBg: "#ffffff",
    cardBorder: "#e2e8f0",
    sidebarBg: "#ffffff",
    sidebarBorder: "#e2e8f0",
    borderRadius: "rounded",
    fontWeight: "normal",
    navStyle: "solid",
  },
  // Traditionnel — crème chaud, sous-tons ambrés, chaleureux
  traditionnel: {
    secondary: "",
    background: "#faf8f5",
    surface: "#f3ede5",
    surfaceHover: "#ebe3d7",
    cardBg: "#ffffff",
    cardBorder: "#e5ddd2",
    sidebarBg: "#f7f3ee",
    sidebarBorder: "#e5ddd2",
    borderRadius: "rounded",
    fontWeight: "bold",
    navStyle: "solid",
  },
  // Décontracté — léger, coins très arrondis, bold, feel ludique
  decontracte: {
    secondary: "",
    background: "#fafafa",
    surface: "#f5f5f5",
    surfaceHover: "#ececec",
    cardBg: "#ffffff",
    cardBorder: "#e5e5e5",
    sidebarBg: "#fafafa",
    sidebarBorder: "#e5e5e5",
    borderRadius: "pill",
    fontWeight: "bold",
    navStyle: "solid",
  },
  // Élégant — full dark mode, premium, contrasté
  elegant: {
    secondary: "#f1f5f9",
    background: "#0f172a",
    surface: "#1e293b",
    surfaceHover: "#334155",
    cardBg: "#1e293b",
    cardBorder: "#334155",
    sidebarBg: "#0b1120",
    sidebarBorder: "#1e293b",
    borderRadius: "rounded",
    fontWeight: "normal",
    navStyle: "outline",
  },
  // Industriel — gris pierre clair, bordures marquées, sharp, urbain brut
  industriel: {
    secondary: "",
    background: "#f5f5f4",
    surface: "#e7e5e4",
    surfaceHover: "#d6d3d1",
    cardBg: "#ffffff",
    cardBorder: "#c8c5c3",
    sidebarBg: "#f0efed",
    sidebarBorder: "#c8c5c3",
    borderRadius: "sharp",
    fontWeight: "bold",
    navStyle: "ghost",
  },
  // Nature — vert d'eau subtil, organique, arrondi, doux
  nature: {
    secondary: "",
    background: "#f5faf7",
    surface: "#e8f3ec",
    surfaceHover: "#d5e8dc",
    cardBg: "#ffffff",
    cardBorder: "#cde5d4",
    sidebarBg: "#f2f8f4",
    sidebarBorder: "#cde5d4",
    borderRadius: "pill",
    fontWeight: "normal",
    navStyle: "solid",
  },
};

function lighten(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, ((num >> 16) & 0xff) + Math.round(255 * amount));
  const g = Math.min(255, ((num >> 8) & 0xff) + Math.round(255 * amount));
  const b = Math.min(255, (num & 0xff) + Math.round(255 * amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function darken(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, ((num >> 16) & 0xff) - Math.round(255 * amount));
  const g = Math.max(0, ((num >> 8) & 0xff) - Math.round(255 * amount));
  const b = Math.max(0, (num & 0xff) - Math.round(255 * amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export interface QuestionnaireAnswers {
  cuisineType: CuisineType;
  ambiance: Ambiance;
  serviceMode: ServiceMode;
  restaurantStyle: RestaurantStyle;
}

export function generateTheme(answers: QuestionnaireAnswers): RestaurantTheme {
  const palette = cuisinePalettes[answers.cuisineType];
  const style = ambianceStyles[answers.ambiance];

  // Only elegant (dark mode) overrides secondary to light text
  const useAmbianceSecondary = answers.ambiance === "elegant";

  // For elegant (dark mode), adapt primaryLight/Dark differently
  const isDarkMode = answers.ambiance === "elegant";

  return {
    ...answers,
    primary: palette.primary,
    primaryLight: isDarkMode
      ? darken(palette.primary, 0.25)
      : lighten(palette.primary, 0.35),
    primaryDark: isDarkMode
      ? lighten(palette.primary, 0.2)
      : darken(palette.primary, 0.15),
    secondary: useAmbianceSecondary ? style.secondary : palette.secondary,
    accent: palette.accent,
    background: style.background,
    surface: style.surface,
    surfaceHover: style.surfaceHover,
    cardBg: style.cardBg,
    cardBorder: style.cardBorder,
    sidebarBg: style.sidebarBg,
    sidebarBorder: style.sidebarBorder,
    borderRadius: style.borderRadius,
    fontWeight: style.fontWeight,
    navStyle: style.navStyle,
  };
}

export function themeToCSS(theme: RestaurantTheme): Record<string, string> {
  const radiusMap = { sharp: "0.375rem", rounded: "0.75rem", pill: "9999px" };
  const radiusCardMap = { sharp: "0.5rem", rounded: "1rem", pill: "1.25rem" };

  return {
    "--crm-primary": theme.primary,
    "--crm-primary-light": theme.primaryLight,
    "--crm-primary-dark": theme.primaryDark,
    "--crm-secondary": theme.secondary,
    "--crm-accent": theme.accent,
    "--crm-background": theme.background,
    "--crm-surface": theme.surface,
    "--crm-surface-hover": theme.surfaceHover,
    "--crm-card-bg": theme.cardBg,
    "--crm-card-border": theme.cardBorder,
    "--crm-sidebar-bg": theme.sidebarBg,
    "--crm-sidebar-border": theme.sidebarBorder,
    "--crm-radius": radiusMap[theme.borderRadius],
    "--crm-radius-card": radiusCardMap[theme.borderRadius],
    "--crm-font-weight": theme.fontWeight === "bold" ? "600" : "500",
  };
}

export const defaultTheme: RestaurantTheme = generateTheme({
  cuisineType: "mediterraneen",
  ambiance: "moderne",
  serviceMode: "mixte",
  restaurantStyle: "moyen",
});

const STORAGE_KEY = "opexfood_restaurant_theme";

export function saveTheme(theme: RestaurantTheme) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  }
}

export function loadTheme(): RestaurantTheme | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as RestaurantTheme;
  } catch {
    return null;
  }
}
