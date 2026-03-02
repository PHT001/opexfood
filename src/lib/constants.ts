import {
  MessageSquareMore,
  Gift,
  LayoutDashboard,
  Star,
  TrendingUp,
  CalendarClock,
  Megaphone,
  QrCode,
  Truck,
  Clock,
  Headset,
  Building2,
  type LucideIcon,
} from "lucide-react";

// Navigation
export const navLinks = [
  { label: "Modules", href: "#modules" },
  { label: "Services", href: "#services" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Témoignages", href: "#temoignages" },
];

// Trust indicators (enhanced)
export const trustItems = [
  { icon: Building2, text: "+50 restaurants équipés" },
  { icon: TrendingUp, text: "+2M de commandes traitées" },
  { icon: Clock, text: "Déployé en 48h" },
  { icon: Headset, text: "Support 7j/7" },
  { icon: Star, text: "4.9/5 de satisfaction" },
];

// Impact stats (animated counters)
export interface ImpactStat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export const impactStats: ImpactStat[] = [
  {
    value: 40,
    suffix: "%",
    label: "de commandes en plus",
    description: "en moyenne grâce au chatbot IA",
  },
  {
    value: 3,
    suffix: "x",
    label: "plus de clients fidèles",
    description: "avec le programme de fidélité",
  },
  {
    value: 25,
    suffix: "%",
    label: "de pertes en moins",
    description: "grâce aux prévisions IA",
  },
  {
    value: 2,
    suffix: "h",
    label: "gagnées par jour",
    description: "sur la gestion administrative",
  },
];

// ROI comparisons (before/after)
export interface ROIComparison {
  metric: string;
  without: string;
  with: string;
  icon: LucideIcon;
  beforePercent: number;
  afterPercent: number;
  gain: string;
}

export const roiComparisons: ROIComparison[] = [
  {
    metric: "Commandes en ligne",
    without: "Seulement par téléphone",
    with: "24h/24 via chatbot IA",
    icon: MessageSquareMore,
    beforePercent: 25,
    afterPercent: 95,
    gain: "+280%",
  },
  {
    metric: "Clients fidèles",
    without: "Aucun suivi des habitudes",
    with: "Programme fidélité à votre image",
    icon: Gift,
    beforePercent: 15,
    afterPercent: 60,
    gain: "x4",
  },
  {
    metric: "Temps de gestion",
    without: "3h+ par jour en admin",
    with: "Dashboard personnalisé, 1h max",
    icon: Clock,
    beforePercent: 80,
    afterPercent: 25,
    gain: "-67%",
  },
  {
    metric: "Gaspillage alimentaire",
    without: "Estimation au feeling",
    with: "Prévisions IA : -30% de pertes",
    icon: TrendingUp,
    beforePercent: 70,
    afterPercent: 20,
    gain: "-30%",
  },
  {
    metric: "Réputation en ligne",
    without: "Avis sans réponse",
    with: "Réponses automatiques en 5 min",
    icon: Star,
    beforePercent: 20,
    afterPercent: 90,
    gain: "4.8★",
  },
];

// Core modules
export interface ModuleData {
  id: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  features: string[];
  videoSrc?: string;
}

export const coreModules: ModuleData[] = [
  {
    id: "chatbot",
    icon: MessageSquareMore,
    iconColor: "text-orange-600",
    iconBg: "from-orange-100 to-orange-50",
    title: "Chatbot IA de Commande",
    description:
      "Votre assistant IA prend les commandes en ligne 24h/24. Intégration WhatsApp, site web et QR code en salle.",
    features: [
      "Prend les commandes en langage naturel",
      "Intégration WhatsApp, Web, QR Code",
      "Suggestions personnalisées selon l'historique",
      "Notification instantanée en cuisine",
    ],
  },
  {
    id: "fidelite",
    icon: Gift,
    iconColor: "text-violet-600",
    iconBg: "from-violet-100 to-violet-50",
    title: "Programme Fidélité sur Tablette",
    description:
      "Transformez vos clients de passage en habitués. Interface 100% personnalisable aux couleurs de votre restaurant.",
    features: [
      "Saisie rapide par numéro de téléphone",
      "Points automatiques à chaque visite",
      "Récompenses et paliers à votre image",
      "Interface personnalisée à votre identité visuelle",
    ],
    videoSrc: "/robot-ipad.mp4",
  },
  {
    id: "crm",
    icon: LayoutDashboard,
    iconColor: "text-emerald-600",
    iconBg: "from-emerald-100 to-emerald-50",
    title: "CRM & Gestion des Commandes",
    description:
      "Tableau de bord entièrement personnalisé à votre restaurant. Vos commandes, vos stats, votre identité.",
    features: [
      "Commandes en temps réel avec statut live",
      "Dashboard personnalisé à votre marque",
      "Historique complet de chaque client",
      "Rapports et analytics sur mesure",
    ],
  },
];

// Additional modules
export const additionalModules: ModuleData[] = [
  {
    id: "avis",
    icon: Star,
    iconColor: "text-amber-600",
    iconBg: "from-amber-100 to-amber-50",
    title: "Avis & Réputation",
    description:
      "Centralisez tous vos avis Google, TripAdvisor et UberEats. Répondez automatiquement grâce à l'IA.",
    features: [
      "Agrégation multi-plateforme",
      "Réponses IA adaptées au ton du restaurant",
      "Alertes sur les avis négatifs",
      "Suivi de votre note moyenne",
    ],
  },
  {
    id: "previsions",
    icon: TrendingUp,
    iconColor: "text-cyan-600",
    iconBg: "from-cyan-100 to-cyan-50",
    title: "Prévisions & Anti-Gaspillage",
    description:
      "L'IA prédit vos ventes selon la météo, l'historique et les événements. Réduisez le gaspillage de 30%.",
    features: [
      "Prévision des ventes sur 7 jours",
      "Prise en compte météo et événements",
      "Suggestions de quantités à préparer",
      "Rapport de gaspillage hebdomadaire",
    ],
  },
  {
    id: "planning",
    icon: CalendarClock,
    iconColor: "text-indigo-600",
    iconBg: "from-indigo-100 to-indigo-50",
    title: "Planning Équipe",
    description:
      "Planifiez vos équipes en 5 minutes. Planning automatique basé sur les prévisions d'affluence.",
    features: [
      "Planning drag-and-drop",
      "Suggestions basées sur l'affluence",
      "Gestion absences et remplacements SMS",
      "Conformité droit du travail",
    ],
  },
  {
    id: "marketing",
    icon: Megaphone,
    iconColor: "text-rose-600",
    iconBg: "from-rose-100 to-rose-50",
    title: "Marketing SMS & Campagnes",
    description:
      "Envoyez des campagnes ciblées à vos clients. Promotions automatiques basées sur le comportement d'achat.",
    features: [
      "Segmentation automatique des clients",
      "Campagnes déclenchées automatiquement",
      "Templates de promotions prêts à l'emploi",
      "Analytics : ouverture, conversion, ROI",
    ],
  },
  {
    id: "qrcode",
    icon: QrCode,
    iconColor: "text-teal-600",
    iconBg: "from-teal-100 to-teal-50",
    title: "QR Code & Commande en Salle",
    description:
      "Vos clients scannent, commandent et paient depuis leur table. Ticket moyen en hausse de 20%.",
    features: [
      "Menu digital interactif avec photos",
      "Commande et paiement sans application",
      "Upselling automatique intelligent",
      "Synchronisation directe en cuisine",
    ],
  },
  {
    id: "livraison",
    icon: Truck,
    iconColor: "text-orange-600",
    iconBg: "from-orange-100 to-orange-50",
    title: "Livraison & Dispatch",
    description:
      "Centralisez UberEats, Deliveroo et JustEat. Gérez vos livreurs en propre avec suivi GPS.",
    features: [
      "Agrégation des plateformes de livraison",
      "Gestion de flotte avec suivi GPS",
      "Optimisation automatique des tournées",
      "Suivi en temps réel pour vos clients",
    ],
  },
];

// Pricing
export interface PricingTier {
  name: string;
  price: string;
  priceAnnual: string;
  priceStriked?: string;
  priceStrikedAnnual?: string;
  period?: string;
  subtitle: string;
  features: string[];
  setup?: string;
  cta: string;
  ctaVariant: "primary" | "outline";
  highlighted?: boolean;
  badge?: string;
  badgeAnnual?: string;
}

export const pricingModules: PricingTier[] = [
  {
    name: "Chatbot",
    price: "139€",
    priceAnnual: "99€",
    period: "/mois",
    subtitle: "Prenez les commandes en ligne 24h/24 avec l'IA",
    features: [
      "Chatbot IA WhatsApp + Web + QR Code",
      "CRM & tableau de bord offert",
      "Gestion des commandes live",
      "Historique clients & analytics",
      "Notifications cuisine instantanées",
      "Support email",
    ],
    setup: "Tablette optionnelle · 120€ (si vous n'en avez pas déjà une)",
    cta: "Choisir ce module",
    ctaVariant: "outline",
    highlighted: true,
  },
  {
    name: "Programme Fidélité",
    price: "89€",
    priceAnnual: "59€",
    period: "/mois",
    subtitle: "Transformez vos clients de passage en habitués",
    features: [
      "Kiosque tactile sur comptoir",
      "Saisie rapide par n° de téléphone",
      "Points automatiques à chaque visite",
      "Récompenses personnalisables",
      "Stats fidélisation en temps réel",
      "Support email",
    ],
    setup: "Tablette optionnelle · 120€ (si vous n'en avez pas déjà une)",
    cta: "Choisir ce module",
    ctaVariant: "outline",
  },
  {
    name: "Agent Réceptionniste IA",
    price: "99€",
    priceAnnual: "69€",
    period: "/mois",
    subtitle: "Ne ratez plus jamais un appel grâce à l'IA vocale",
    features: [
      "500 min d'appels offertes/mois (0.18€/min au-delà)",
      "Réponse automatique 24h/24 aux appels",
      "Prise de réservation par téléphone",
      "Réponses FAQ personnalisées (horaires, menu…)",
      "Transfert intelligent vers le gérant",
      "Résumé des appels & transcriptions",
      "CRM & tableau de bord offert",
    ],
    setup: "Tablette optionnelle · 120€ (si vous n'en avez pas déjà une)",
    cta: "Choisir ce module",
    ctaVariant: "outline",
  },
];

// Testimonials
export interface Testimonial {
  quote: string;
  authorName: string;
  authorRole: string;
  restaurantName: string;
  avatarUrl: string;
  verified?: boolean;
  date?: string;
  highlight?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "On a viré UberEats. Le chatbot WhatsApp ramène autant de commandes et on garde 100% de la marge. Meilleure décision de l'année. On a même des clients qui préfèrent commander via le chatbot plutôt qu'appeler.",
    authorName: "Karim B.",
    authorRole: "Gérant",
    restaurantName: "Le Kebab Gourmet",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    verified: true,
    date: "Jan. 2026",
    highlight: "+40% de commandes",
  },
  {
    quote: "Installé en 2h. Simple et efficace.",
    authorName: "Sophie L.",
    authorRole: "Propriétaire",
    restaurantName: "Pasta Mia",
    avatarUrl: "https://i.pravatar.cc/150?img=23",
    verified: true,
  },
  {
    quote: "Le CRM m'a ouvert les yeux. Je vois enfin qui sont mes vrais clients réguliers et ce qu'ils commandent. J'adapte ma carte en fonction.",
    authorName: "Thomas R.",
    authorRole: "Directeur",
    restaurantName: "Fresh Bowl Paris",
    avatarUrl: "https://i.pravatar.cc/150?img=53",
    verified: true,
    date: "Déc. 2025",
  },
  {
    quote: "Je gère tout depuis mon tél. Commandes, stock, avis. Avant c'était 3h par jour là-dessus. Maintenant c'est 30 min max le matin et c'est réglé.",
    authorName: "Fatima E.",
    authorRole: "Gérante",
    restaurantName: "Chez Fatima",
    avatarUrl: "https://i.pravatar.cc/150?img=44",
    verified: true,
    highlight: "2h gagnées / jour",
  },
  {
    quote: "+40% de commandes en un mois. Les chiffres parlent.",
    authorName: "Marc D.",
    authorRole: "Propriétaire",
    restaurantName: "Le Bistrot du Coin",
    avatarUrl: "https://i.pravatar.cc/150?img=60",
    verified: true,
    date: "Nov. 2025",
  },
  {
    quote: "Le QR code en salle a tout changé. Les clients commandent eux-mêmes, mes serveurs soufflent, et le ticket moyen a monté. Je recommande à tous les restos qui veulent moderniser leur service sans perdre le contact humain.",
    authorName: "Julie P.",
    authorRole: "Directrice",
    restaurantName: "Nikkei Paris 11",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
    verified: true,
    date: "Fév. 2026",
    highlight: "+18% ticket moyen",
  },
  {
    quote: "200 commandes par semaine, en partant de zéro. Tout automatisé.",
    authorName: "Youssef A.",
    authorRole: "Gérant",
    restaurantName: "Tacos House Lyon",
    avatarUrl: "https://i.pravatar.cc/150?img=33",
  },
  {
    quote: "L'outil de prévision m'a sauvé. Avant je jetais 30% de mes prépa le dimanche soir. Maintenant je sais exactement quoi préparer. Et mes équipes sont moins stressées aussi.",
    authorName: "Claire M.",
    authorRole: "Chef propriétaire",
    restaurantName: "Bistrot Cantine",
    avatarUrl: "https://i.pravatar.cc/150?img=26",
    verified: true,
    date: "Jan. 2026",
    highlight: "-30% de gaspillage",
  },
];
