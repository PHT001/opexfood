import { NextRequest, NextResponse } from "next/server";
import { generateBarcode, normalizePhone } from "@/lib/loyalty/barcode";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  getConfigBySlug,
  getClientByPhone,
  createClient,
  createTransaction,
} from "@/lib/loyalty/queries";

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

    const config = await getConfigBySlug(supabaseAdmin, slug);
    if (!config) {
      return NextResponse.json(
        { error: "Restaurant non trouvé" },
        { status: 404 }
      );
    }

    // Check if client already exists
    const existing = await getClientByPhone(
      supabaseAdmin,
      config.restaurant_id,
      normalizedPhone
    );
    if (existing) {
      return NextResponse.json({ client: existing, existing: true });
    }

    // Create new client
    const barcode = generateBarcode(slug);
    const welcomePoints = config.welcome_points;

    const newClient = await createClient(supabaseAdmin, {
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
    });

    if (!newClient) {
      return NextResponse.json(
        { error: "Erreur lors de la création du client" },
        { status: 500 }
      );
    }

    // Create welcome transaction
    if (welcomePoints > 0) {
      await createTransaction(supabaseAdmin, {
        client_id: newClient.id,
        restaurant_id: config.restaurant_id,
        type: "welcome",
        points: welcomePoints,
        amount: null,
        description: "Bonus de bienvenue",
        staff_user_id: null,
      });
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
