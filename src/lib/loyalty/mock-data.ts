// Mock loyalty data — will be replaced by Supabase queries later

import type {
  LoyaltyConfig,
  LoyaltyClient,
  LoyaltyTransaction,
  LoyaltyPublicInfo,
} from "./types";

export const mockLoyaltyConfig: LoyaltyConfig = {
  id: "lc-001",
  restaurant_id: "r-001",
  slug: "demo-restaurant",
  points_per_euro: 10,
  reward_threshold: 500,
  reward_description: "1 Bowl offert",
  welcome_points: 50,
  is_active: true,
  created_at: "2026-01-15T10:00:00Z",
  updated_at: "2026-01-15T10:00:00Z",
};

export const mockLoyaltyClients: LoyaltyClient[] = [
  { id: "lc1", restaurant_id: "r-001", name: "Marie Lefèvre", phone: "0612345678", email: "marie.l@gmail.com", points: 280, total_visits: 14, total_spent: 234.5, barcode: "OPX-DEMO-aB3kLm9x", pass_type: "apple", last_visit_at: "2026-03-01T12:30:00Z", created_at: "2026-01-20T09:00:00Z", updated_at: "2026-03-01T12:30:00Z" },
  { id: "lc2", restaurant_id: "r-001", name: "Thomas Dubois", phone: "0623456789", email: "thomas.d@gmail.com", points: 450, total_visits: 23, total_spent: 387.0, barcode: "OPX-DEMO-cD5nPq2y", pass_type: "google", last_visit_at: "2026-02-28T19:15:00Z", created_at: "2026-01-22T14:00:00Z", updated_at: "2026-02-28T19:15:00Z" },
  { id: "lc3", restaurant_id: "r-001", name: "Sophie Martin", phone: "0634567890", email: "sophie.m@outlook.fr", points: 120, total_visits: 6, total_spent: 98.5, barcode: "OPX-DEMO-eF7rSt4z", pass_type: "pwa", last_visit_at: "2026-02-27T13:00:00Z", created_at: "2026-02-01T11:00:00Z", updated_at: "2026-02-27T13:00:00Z" },
  { id: "lc4", restaurant_id: "r-001", name: "Lucas Renault", phone: "0645678901", email: "lucas.r@gmail.com", points: 670, total_visits: 34, total_spent: 562.0, barcode: "OPX-DEMO-gH9vWx6a", pass_type: "apple", last_visit_at: "2026-03-01T20:00:00Z", created_at: "2026-01-18T16:00:00Z", updated_at: "2026-03-01T20:00:00Z" },
  { id: "lc5", restaurant_id: "r-001", name: "Camille Bernard", phone: "0656789012", email: "camille.b@yahoo.fr", points: 340, total_visits: 17, total_spent: 289.5, barcode: "OPX-DEMO-iJ1bYz8c", pass_type: null, last_visit_at: "2026-02-25T18:30:00Z", created_at: "2026-01-25T10:00:00Z", updated_at: "2026-02-25T18:30:00Z" },
  { id: "lc6", restaurant_id: "r-001", name: "Antoine Petit", phone: "0667890123", email: "antoine.p@gmail.com", points: 90, total_visits: 5, total_spent: 76.0, barcode: "OPX-DEMO-kL3dAb0e", pass_type: "pwa", last_visit_at: "2026-02-24T12:00:00Z", created_at: "2026-02-10T09:00:00Z", updated_at: "2026-02-24T12:00:00Z" },
  { id: "lc7", restaurant_id: "r-001", name: "Julie Fontaine", phone: "0678901234", email: "julie.f@gmail.com", points: 520, total_visits: 26, total_spent: 445.0, barcode: "OPX-DEMO-mN5fCd2g", pass_type: "google", last_visit_at: "2026-03-01T13:45:00Z", created_at: "2026-01-19T15:00:00Z", updated_at: "2026-03-01T13:45:00Z" },
  { id: "lc8", restaurant_id: "r-001", name: "Pierre Garcia", phone: "0689012345", email: "pierre.g@outlook.fr", points: 180, total_visits: 9, total_spent: 153.5, barcode: "OPX-DEMO-oP7hEf4i", pass_type: null, last_visit_at: "2026-02-26T17:00:00Z", created_at: "2026-02-05T11:00:00Z", updated_at: "2026-02-26T17:00:00Z" },
];

export const mockLoyaltyTransactions: LoyaltyTransaction[] = [
  { id: "lt1", client_id: "lc1", restaurant_id: "r-001", type: "welcome", points: 50, amount: null, description: "Bonus de bienvenue", staff_user_id: null, created_at: "2026-01-20T09:00:00Z" },
  { id: "lt2", client_id: "lc1", restaurant_id: "r-001", type: "earn", points: 165, amount: 16.5, description: "Bowl Méditerranéen + Limonade", staff_user_id: "staff-001", created_at: "2026-03-01T12:30:00Z" },
  { id: "lt3", client_id: "lc2", restaurant_id: "r-001", type: "earn", points: 180, amount: 18.0, description: "Bowl Thaï + Smoothie", staff_user_id: "staff-001", created_at: "2026-02-28T19:15:00Z" },
  { id: "lt4", client_id: "lc4", restaurant_id: "r-001", type: "redeem", points: -500, amount: null, description: "1 Bowl offert", staff_user_id: "staff-001", created_at: "2026-02-20T13:00:00Z" },
  { id: "lt5", client_id: "lc4", restaurant_id: "r-001", type: "earn", points: 195, amount: 19.5, description: "Bowl Saumon + Thé glacé", staff_user_id: "staff-001", created_at: "2026-03-01T20:00:00Z" },
  { id: "lt6", client_id: "lc7", restaurant_id: "r-001", type: "earn", points: 145, amount: 14.5, description: "Salade Niçoise + Eau", staff_user_id: "staff-001", created_at: "2026-03-01T13:45:00Z" },
];

export const mockPublicInfo: LoyaltyPublicInfo = {
  restaurant_name: "Bowl & Go",
  logo_url: null,
  primary_color: "#ea580c",
  secondary_color: "#0f172a",
  config: {
    slug: "demo-restaurant",
    points_per_euro: 10,
    reward_threshold: 500,
    reward_description: "1 Bowl offert",
    welcome_points: 50,
  },
};

// Helper to find a client by barcode
export function findClientByBarcode(barcode: string): LoyaltyClient | undefined {
  return mockLoyaltyClients.find((c) => c.barcode === barcode);
}

// Helper to find a client by phone (normalized)
export function findClientByPhone(phone: string): LoyaltyClient | undefined {
  const normalized = phone.replace(/\D/g, "");
  return mockLoyaltyClients.find((c) => c.phone === normalized);
}

// Helper to get transactions for a client
export function getClientTransactions(clientId: string): LoyaltyTransaction[] {
  return mockLoyaltyTransactions
    .filter((t) => t.client_id === clientId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}
