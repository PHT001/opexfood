import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  getClientByBarcode,
  getConfigByRestaurantId,
  getRestaurantIdForUser,
  creditPoints,
  createTransaction,
} from "@/lib/loyalty/queries";
import type { ScanResponse } from "@/lib/loyalty/types";

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

    const { barcode, amount } = await request.json();

    if (!barcode || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Barcode et montant requis" },
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

    const pointsEarned = Math.floor(amount * config.points_per_euro);

    // Atomic point credit
    const updatedClient = await creditPoints(
      supabaseAdmin,
      client.id,
      pointsEarned,
      amount
    );

    if (!updatedClient) {
      return NextResponse.json(
        { error: "Erreur lors de la mise à jour des points" },
        { status: 500 }
      );
    }

    // Create transaction
    await createTransaction(supabaseAdmin, {
      client_id: client.id,
      restaurant_id: restaurantId,
      type: "earn",
      points: pointsEarned,
      amount,
      description: null,
      staff_user_id: user.id,
    });

    const response: ScanResponse = {
      client: updatedClient,
      points_earned: pointsEarned,
      new_balance: updatedClient.points,
      reward_available: updatedClient.points >= config.reward_threshold,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Loyalty scan error:", error);
    return NextResponse.json(
      { error: "Erreur lors du scan" },
      { status: 500 }
    );
  }
}
