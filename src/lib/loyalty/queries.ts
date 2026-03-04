import { SupabaseClient } from "@supabase/supabase-js";
import type {
  LoyaltyConfig,
  LoyaltyClient,
  LoyaltyTransaction,
  LoyaltyPublicInfo,
} from "./types";

// --- Config ---

export async function getConfigBySlug(
  supabase: SupabaseClient,
  slug: string
): Promise<LoyaltyConfig | null> {
  const { data } = await supabase
    .from("loyalty_configs")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();
  return data;
}

export async function getConfigByRestaurantId(
  supabase: SupabaseClient,
  restaurantId: string
): Promise<LoyaltyConfig | null> {
  const { data } = await supabase
    .from("loyalty_configs")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .single();
  return data;
}

export async function upsertConfig(
  supabase: SupabaseClient,
  restaurantId: string,
  updates: Partial<
    Pick<
      LoyaltyConfig,
      | "slug"
      | "points_per_euro"
      | "reward_threshold"
      | "reward_description"
      | "welcome_points"
      | "is_active"
    >
  >
): Promise<LoyaltyConfig | null> {
  const { data } = await supabase
    .from("loyalty_configs")
    .upsert(
      { restaurant_id: restaurantId, ...updates },
      { onConflict: "restaurant_id" }
    )
    .select()
    .single();
  return data;
}

// --- Clients ---

export async function getClientByBarcode(
  supabase: SupabaseClient,
  barcode: string
): Promise<LoyaltyClient | null> {
  const { data } = await supabase
    .from("loyalty_clients")
    .select("*")
    .eq("barcode", barcode)
    .single();
  return data;
}

export async function getClientByPhone(
  supabase: SupabaseClient,
  restaurantId: string,
  phone: string
): Promise<LoyaltyClient | null> {
  const { data } = await supabase
    .from("loyalty_clients")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .eq("phone", phone)
    .single();
  return data;
}

export async function getClientsByRestaurant(
  supabase: SupabaseClient,
  restaurantId: string
): Promise<LoyaltyClient[]> {
  const { data } = await supabase
    .from("loyalty_clients")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .order("updated_at", { ascending: false });
  return data ?? [];
}

export async function createClient(
  supabase: SupabaseClient,
  client: Omit<LoyaltyClient, "id" | "created_at" | "updated_at">
): Promise<LoyaltyClient | null> {
  const { data } = await supabase
    .from("loyalty_clients")
    .insert(client)
    .select()
    .single();
  return data;
}

/** Atomic point credit via Postgres RPC */
export async function creditPoints(
  supabase: SupabaseClient,
  clientId: string,
  points: number,
  amount: number
): Promise<LoyaltyClient | null> {
  const { data } = await supabase.rpc("credit_loyalty_points", {
    p_client_id: clientId,
    p_points: points,
    p_amount: amount,
  });
  // rpc returns an array for SETOF
  return Array.isArray(data) ? data[0] ?? null : data;
}

// --- Transactions ---

export async function createTransaction(
  supabase: SupabaseClient,
  txn: Omit<LoyaltyTransaction, "id" | "created_at">
): Promise<LoyaltyTransaction | null> {
  const { data } = await supabase
    .from("loyalty_transactions")
    .insert(txn)
    .select()
    .single();
  return data;
}

export async function getTransactionsByClient(
  supabase: SupabaseClient,
  clientId: string
): Promise<LoyaltyTransaction[]> {
  const { data } = await supabase
    .from("loyalty_transactions")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

// --- Public info (JOIN configs + restaurants) ---

export async function getPublicInfoBySlug(
  supabase: SupabaseClient,
  slug: string
): Promise<LoyaltyPublicInfo | null> {
  const { data } = await supabase
    .from("loyalty_configs")
    .select(
      `
      slug,
      points_per_euro,
      reward_threshold,
      reward_description,
      welcome_points,
      restaurants (
        name,
        logo_url,
        primary_color,
        secondary_color
      )
    `
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!data) return null;

  // Supabase may return the relation as object or array depending on FK inference
  const raw = data.restaurants as unknown;
  const r = Array.isArray(raw) ? (raw[0] as Record<string, unknown> | undefined) : (raw as Record<string, unknown> | null);
  return {
    restaurant_name: (r?.name as string) ?? "Restaurant",
    logo_url: (r?.logo_url as string | null) ?? null,
    primary_color: (r?.primary_color as string) ?? "#ea580c",
    secondary_color: (r?.secondary_color as string) ?? "#f97316",
    config: {
      slug: data.slug,
      points_per_euro: data.points_per_euro,
      reward_threshold: data.reward_threshold,
      reward_description: data.reward_description,
      welcome_points: data.welcome_points,
    },
  };
}

// --- Helper: get restaurant_id for authenticated user ---

export async function getRestaurantIdForUser(
  supabase: SupabaseClient,
  userId: string
): Promise<string | null> {
  const { data } = await supabase
    .from("restaurants")
    .select("id")
    .eq("user_id", userId)
    .single();
  return data?.id ?? null;
}

/** Atomic point redemption via Postgres RPC */
export async function redeemPoints(
  supabase: SupabaseClient,
  clientId: string,
  points: number
): Promise<LoyaltyClient | null> {
  const { data, error } = await supabase.rpc("redeem_loyalty_points", {
    p_client_id: clientId,
    p_points: points,
  });
  if (error) throw error;
  return Array.isArray(data) ? data[0] ?? null : data;
}

/** Generate a slug from a restaurant name */
export function generateSlug(name: string, fallbackId: string): string {
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || `restaurant-${fallbackId.slice(0, 8)}`;
}
