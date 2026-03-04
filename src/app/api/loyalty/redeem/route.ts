import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  getClientByBarcode,
  getConfigByRestaurantId,
  getRestaurantIdForUser,
  redeemPoints,
  createTransaction,
} from "@/lib/loyalty/queries";
import type { RedeemResponse } from "@/lib/loyalty/types";
import { notifyPassUpdate } from "@/lib/loyalty/apns";

export async function POST(request: NextRequest) {
  try {
    // Auth check
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const restaurantId = await getRestaurantIdForUser(supabase, user.id);
    if (!restaurantId) {
      return NextResponse.json(
        { error: "Restaurant non trouvé" },
        { status: 404 }
      );
    }

    const { barcode } = await request.json();

    if (!barcode) {
      return NextResponse.json(
        { error: "Barcode requis" },
        { status: 400 }
      );
    }

    // Find client
    const client = await getClientByBarcode(supabaseAdmin, barcode);
    if (!client) {
      return NextResponse.json(
        { error: "Client non trouvé" },
        { status: 404 }
      );
    }

    // Verify this client belongs to the staff's restaurant
    if (client.restaurant_id !== restaurantId) {
      return NextResponse.json(
        { error: "Client non autorisé" },
        { status: 403 }
      );
    }

    // Get config
    const config = await getConfigByRestaurantId(supabaseAdmin, restaurantId);
    if (!config) {
      return NextResponse.json(
        { error: "Configuration fidélité non trouvée" },
        { status: 404 }
      );
    }

    // Check client has enough points
    if (client.points < config.reward_threshold) {
      return NextResponse.json(
        {
          error: `Points insuffisants. ${client.points}/${config.reward_threshold} points.`,
        },
        { status: 400 }
      );
    }

    // Atomic point deduction
    const updatedClient = await redeemPoints(
      supabaseAdmin,
      client.id,
      config.reward_threshold
    );

    if (!updatedClient) {
      return NextResponse.json(
        { error: "Erreur lors de la déduction des points" },
        { status: 500 }
      );
    }

    // Create redeem transaction (negative points)
    await createTransaction(supabaseAdmin, {
      client_id: client.id,
      restaurant_id: restaurantId,
      type: "redeem",
      points: -config.reward_threshold,
      amount: null,
      description: config.reward_description,
      staff_user_id: user.id,
    });

    // Fire-and-forget: notify Apple Wallet devices to refresh the pass
    notifyPassUpdate(barcode).catch(() => {});

    const response: RedeemResponse = {
      client: updatedClient,
      points_deducted: config.reward_threshold,
      new_balance: updatedClient.points,
      reward_description: config.reward_description,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Loyalty redeem error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'utilisation de la récompense" },
      { status: 500 }
    );
  }
}
