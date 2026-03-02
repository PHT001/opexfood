// ============================================
// Demo data — scripted conversation, orders, loyalty
// ============================================

// --- Chat types ---
export interface MenuItem {
  name: string;
  price: number;
  emoji: string;
}

export interface OrderSummary {
  items: { name: string; qty: number; price: number }[];
  total: number;
  estimatedTime: string;
}

export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  type: "text" | "menu-card" | "order-summary";
  text?: string;
  items?: MenuItem[];
  order?: OrderSummary;
}

export const CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "bot-1",
    sender: "bot",
    type: "text",
    text: "Bonjour et bienvenue ! 👋 Que souhaitez-vous commander aujourd'hui ?",
  },
  {
    id: "user-1",
    sender: "user",
    type: "text",
    text: "Salut ! Je voudrais voir le menu svp",
  },
  {
    id: "bot-2",
    sender: "bot",
    type: "menu-card",
    text: "Voici nos plats du jour :",
    items: [
      { name: "Buddha Bowl Avocat", price: 12.9, emoji: "🥑" },
      { name: "Poke Saumon", price: 14.5, emoji: "🍣" },
      { name: "Salade Caesar Poulet", price: 11.9, emoji: "🥗" },
    ],
  },
  {
    id: "user-2",
    sender: "user",
    type: "text",
    text: "Un Poke Saumon et un Buddha Bowl svp !",
  },
  {
    id: "bot-3",
    sender: "bot",
    type: "order-summary",
    text: "Parfait ! Voici votre recapitulatif :",
    order: {
      items: [
        { name: "Poke Saumon", qty: 1, price: 14.5 },
        { name: "Buddha Bowl Avocat", qty: 1, price: 12.9 },
      ],
      total: 27.4,
      estimatedTime: "15-20 min",
    },
  },
  {
    id: "user-3",
    sender: "user",
    type: "text",
    text: "C'est parfait, je confirme !",
  },
  {
    id: "bot-4",
    sender: "bot",
    type: "text",
    text: "Commande #247 confirmée ! Votre commande sera prête dans 15-20 minutes. Bon appétit ! 🎉",
  },
];

// --- Dashboard types ---
export interface DemoOrder {
  id: string;
  number: number;
  customerName: string;
  items: string;
  total: number;
  status: "nouvelle" | "en-preparation" | "prete" | "livree";
  time: string;
  isNew?: boolean;
}

export const DASHBOARD_ORDERS: DemoOrder[] = [
  {
    id: "order-1",
    number: 244,
    customerName: "Marie L.",
    items: "2x Salade Caesar, 1x Jus d'orange",
    total: 28.7,
    status: "prete",
    time: "12:15",
  },
  {
    id: "order-2",
    number: 245,
    customerName: "Thomas K.",
    items: "1x Poke Saumon, 1x Smoothie Vert",
    total: 19.9,
    status: "en-preparation",
    time: "12:22",
  },
  {
    id: "order-3",
    number: 246,
    customerName: "Sarah M.",
    items: "3x Buddha Bowl, 2x Limonade",
    total: 46.7,
    status: "en-preparation",
    time: "12:28",
  },
];

export const NEW_ORDER: DemoOrder = {
  id: "order-new",
  number: 247,
  customerName: "Thomas B.",
  items: "1x Poke Saumon, 1x Buddha Bowl Avocat",
  total: 27.4,
  status: "nouvelle",
  time: "12:34",
  isNew: true,
};

export const DASHBOARD_STATS = {
  ordersToday: 23,
  revenue: 847,
  loyaltyCustomers: 156,
};

// --- Agent Receptionniste (phone call) ---
export interface CallTranscriptLine {
  id: string;
  speaker: "agent" | "client";
  text: string;
}

export const CALL_TRANSCRIPT: CallTranscriptLine[] = [
  {
    id: "agent-1",
    speaker: "agent",
    text: "Bonjour, Fresh Bowl, que puis-je faire pour vous ?",
  },
  {
    id: "client-1",
    speaker: "client",
    text: "Bonjour, je voudrais réserver une table pour 4 personnes ce soir à 20h.",
  },
  {
    id: "agent-2",
    speaker: "agent",
    text: "Bien sûr ! J'ai une table disponible à 20h pour 4 personnes. Souhaitez-vous commander à l'avance ?",
  },
  {
    id: "client-2",
    speaker: "client",
    text: "Oui, on voudrait 2 Poke Saumon et 2 Buddha Bowls svp.",
  },
  {
    id: "agent-3",
    speaker: "agent",
    text: "Parfait ! Réservation confirmée pour ce soir 20h, table de 4. Votre pré-commande de 2 Poke Saumon et 2 Buddha Bowl sera prête à votre arrivée. À ce soir !",
  },
  {
    id: "client-3",
    speaker: "client",
    text: "Merci beaucoup, à ce soir !",
  },
];

export const CALL_STATS = {
  duration: "1 min 24 s",
  reservation: "Ce soir — 20h00",
  couverts: 4,
  preCommande: "54.80€",
};

// --- Loyalty types ---
export const LOYALTY_DATA = {
  phoneDigits: ["0", "6", "1", "2", "3", "4", "5", "6", "7", "8"],
  phoneFormatted: "06 12 34 56 78",
  customerName: "Thomas B.",
  pointsEarned: 10,
  totalPoints: 85,
  nextReward: { name: "Dessert offert", threshold: 100 },
};
