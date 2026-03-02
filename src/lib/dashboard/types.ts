export interface Restaurant {
  id: string;
  user_id: string;
  name: string;
  address: string | null;
  phone: string | null;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  style_preferences: Record<string, unknown>;
  onboarding_step: number;
  onboarding_completed: boolean;
  crm_configured: boolean;
  crm_configured_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface RestaurantDocument {
  id: string;
  restaurant_id: string;
  file_name: string;
  file_url: string;
  file_type: "menu_pdf" | "menu_image" | "logo" | "other";
  file_size: number | null;
  uploaded_at: string;
}

export interface Subscription {
  id: string;
  restaurant_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string | null;
  status: "active" | "past_due" | "canceled" | "incomplete";
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionItem {
  id: string;
  subscription_id: string;
  stripe_item_id: string;
  module_id: "chatbot" | "agent_vocal" | "fidelite";
  stripe_price_id: string;
  quantity: number;
  created_at: string;
}

export interface Invoice {
  id: string;
  subscription_id: string;
  stripe_invoice_id: string;
  amount_paid: number;
  currency: string;
  status: "paid" | "open" | "void" | "uncollectible";
  invoice_url: string | null;
  invoice_pdf: string | null;
  period_start: string | null;
  period_end: string | null;
  created_at: string;
}
