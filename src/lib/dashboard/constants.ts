import type { LucideIcon } from "lucide-react";

export interface SidebarNavItem {
  label: string;
  href: string;
  iconName: string;
}

export const sidebarNav: SidebarNavItem[] = [
  { label: "Vue d'ensemble", href: "/dashboard", iconName: "LayoutDashboard" },
  { label: "Mon Espace", href: "/dashboard/espace", iconName: "Store" },
  { label: "Modules", href: "/dashboard/modules", iconName: "Puzzle" },
  { label: "Facturation", href: "/dashboard/billing", iconName: "CreditCard" },
  { label: "Paramètres", href: "/dashboard/settings", iconName: "Settings" },
];

export interface CrmNavItem {
  label: string;
  href: string;
  iconName: string;
}

export const crmNav: CrmNavItem[] = [
  { label: "Live Commandes", href: "/dashboard/espace", iconName: "ClipboardList" },
  { label: "Stocks", href: "/dashboard/espace/stocks", iconName: "Package" },
  { label: "Historique", href: "/dashboard/espace/historique", iconName: "BarChart3" },
  { label: "Clients & Fidélité", href: "/dashboard/espace/clients", iconName: "Users" },
  { label: "Kiosque Fidélité", href: "/dashboard/espace/kiosque", iconName: "Smartphone" },
];

export interface ModuleDefinition {
  id: "chatbot" | "agent_vocal" | "fidelite";
  name: string;
  description: string;
  iconName: string;
  color: string;
  colorBg: string;
  colorBorder: string;
  priceMonthly: number;
  priceAnnual: number;
  features: string[];
}

export const moduleDefinitions: ModuleDefinition[] = [
  {
    id: "chatbot",
    name: "Chatbot IA",
    description: "Prenez les commandes en ligne 24h/24 via WhatsApp, Web et QR Code.",
    iconName: "MessageSquareMore",
    color: "text-orange-600",
    colorBg: "bg-orange-50",
    colorBorder: "border-orange-200",
    priceMonthly: 139,
    priceAnnual: 99,
    features: [
      "Chatbot IA WhatsApp + Web + QR Code",
      "CRM & tableau de bord offert",
      "Gestion des commandes live",
      "Notifications cuisine instantanées",
    ],
  },
  {
    id: "agent_vocal",
    name: "Agent IA Vocal",
    description: "Ne ratez plus jamais un appel grâce à l'IA vocale.",
    iconName: "Phone",
    color: "text-emerald-600",
    colorBg: "bg-emerald-50",
    colorBorder: "border-emerald-200",
    priceMonthly: 99,
    priceAnnual: 69,
    features: [
      "500 min d'appels offertes/mois",
      "Réponse automatique 24h/24",
      "Prise de réservation par téléphone",
      "CRM & tableau de bord offert",
    ],
  },
  {
    id: "fidelite",
    name: "Programme Fidélité",
    description: "Transformez vos clients de passage en habitués.",
    iconName: "Gift",
    color: "text-violet-600",
    colorBg: "bg-violet-50",
    colorBorder: "border-violet-200",
    priceMonthly: 89,
    priceAnnual: 59,
    features: [
      "Kiosque tactile sur comptoir",
      "Points automatiques à chaque visite",
      "Récompenses personnalisables",
      "Stats fidélisation en temps réel",
    ],
  },
];

// Icon resolver — use in client components only
export { type LucideIcon };
