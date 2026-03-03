import { NextRequest, NextResponse } from "next/server";
import { generateBarcode, normalizePhone } from "@/lib/loyalty/barcode";
import {
  mockLoyaltyClients,
  mockLoyaltyConfig,
  mockLoyaltyTransactions,
} from "@/lib/loyalty/mock-data";
import type { LoyaltyClient, LoyaltyTransaction } from "@/lib/loyalty/types";
import { LOYALTY_DEFAULTS } from "@/lib/loyalty/config";

export async function POST(request: NextRequest) {
  try {
    const { slug, name, phone } = await request.json();

    if (!slug || !name || !phone) {
      return NextResponse.json(
        { error: "Nom et numéro de téléphone requis" },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizePhone(phone);
    if (normalizedPhone.length !== 10 || !normalizedPhone.startsWith("0")) {
      return NextResponse.json(
        { error: "Numéro de téléphone invalide" },
        { status: 400 }
      );
    }

    // Check if config exists for this slug
    // TODO: Replace with Supabase query
    const config = mockLoyaltyConfig.slug === slug ? mockLoyaltyConfig : null;
    if (!config) {
      return NextResponse.json(
        { error: "Restaurant non trouvé" },
        { status: 404 }
      );
    }

    // Check if client already exists for this restaurant + phone
    // TODO: Replace with Supabase query
    const existing = mockLoyaltyClients.find(
      (c) => c.phone === normalizedPhone && c.restaurant_id === config.restaurant_id
    );
    if (existing) {
      // Return existing client (re-inscription)
      return NextResponse.json({ client: existing, existing: true });
    }

    // Create new client
    const barcode = generateBarcode(slug);
    const welcomePoints = config.welcome_points || LOYALTY_DEFAULTS.welcomePoints;

    const newClient: LoyaltyClient = {
      id: `lc-${Date.now()}`,
      restaurant_id: config.restaurant_id,
      name: name.trim(),
      phone: normalizedPhone,
      email: null,
      points: welcomePoints,
      total_visits: 0,
      total_spent: 0,
      barcode,
      pass_type: null,
      last_visit_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // TODO: Replace with Supabase insert
    mockLoyaltyClients.push(newClient);

    // Create welcome transaction if applicable
    if (welcomePoints > 0) {
      const welcomeTransaction: LoyaltyTransaction = {
        id: `lt-${Date.now()}`,
        client_id: newClient.id,
        restaurant_id: config.restaurant_id,
        type: "welcome",
        points: welcomePoints,
        amount: null,
        description: "Bonus de bienvenue",
        staff_user_id: null,
        created_at: new Date().toISOString(),
      };
      mockLoyaltyTransactions.push(welcomeTransaction);
    }

    return NextResponse.json({
      client: newClient,
      existing: false,
      welcome_points: welcomePoints,
    });
  } catch (error) {
    console.error("Loyalty inscribe error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'inscription" },
      { status: 500 }
    );
  }
}
