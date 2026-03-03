// Loyalty system types — mirrors Supabase tables (mock data for now)

export interface LoyaltyConfig {
  id: string;
  restaurant_id: string;
  slug: string;
  points_per_euro: number;
  reward_threshold: number;
  reward_description: string;
  welcome_points: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoyaltyClient {
  id: string;
  restaurant_id: string;
  name: string;
  phone: string;
  email: string | null;
  points: number;
  total_visits: number;
  total_spent: number;
  barcode: string;
  pass_type: "apple" | "google" | "pwa" | null;
  last_visit_at: string | null;
  created_at: string;
  updated_at: string;
}

export type TransactionType = "earn" | "redeem" | "adjust" | "welcome";

export interface LoyaltyTransaction {
  id: string;
  client_id: string;
  restaurant_id: string;
  type: TransactionType;
  points: number;
  amount: number | null;
  description: string | null;
  staff_user_id: string | null;
  created_at: string;
}

export interface LoyaltyPass {
  id: string;
  client_id: string;
  restaurant_id: string;
  pass_type: "apple" | "google" | "pwa";
  serial_number: string;
  push_token: string | null;
  device_library_id: string | null;
  last_updated_at: string;
  created_at: string;
}

export interface LoyaltyReward {
  id: string;
  client_id: string;
  restaurant_id: string;
  transaction_id: string | null;
  reward_description: string;
  points_cost: number;
  redeemed_at: string;
}

// Public restaurant info exposed on the inscription page
export interface LoyaltyPublicInfo {
  restaurant_name: string;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  config: Pick<
    LoyaltyConfig,
    "slug" | "points_per_euro" | "reward_threshold" | "reward_description" | "welcome_points"
  >;
}

// Inscription request body
export interface InscribeRequest {
  slug: string;
  name: string;
  phone: string;
}

// Scan request body
export interface ScanRequest {
  barcode: string;
  amount: number;
}

// Scan response
export interface ScanResponse {
  client: LoyaltyClient;
  points_earned: number;
  new_balance: number;
  reward_available: boolean;
}
