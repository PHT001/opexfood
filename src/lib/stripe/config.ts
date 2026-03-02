export const MODULE_PRICES: Record<string, { monthly: string; annual: string }> = {
  chatbot: {
    monthly: process.env.STRIPE_PRICE_CHATBOT_MONTHLY ?? "price_chatbot_monthly",
    annual: process.env.STRIPE_PRICE_CHATBOT_ANNUAL ?? "price_chatbot_annual",
  },
  agent_vocal: {
    monthly: process.env.STRIPE_PRICE_AGENT_MONTHLY ?? "price_agent_monthly",
    annual: process.env.STRIPE_PRICE_AGENT_ANNUAL ?? "price_agent_annual",
  },
  fidelite: {
    monthly: process.env.STRIPE_PRICE_FIDELITE_MONTHLY ?? "price_fidelite_monthly",
    annual: process.env.STRIPE_PRICE_FIDELITE_ANNUAL ?? "price_fidelite_annual",
  },
};

export const MODULE_LABELS: Record<string, string> = {
  chatbot: "Chatbot IA",
  agent_vocal: "Agent IA Vocal",
  fidelite: "Programme Fidélité",
};

export const MODULE_IDS = ["chatbot", "agent_vocal", "fidelite"] as const;
export type ModuleId = (typeof MODULE_IDS)[number];
