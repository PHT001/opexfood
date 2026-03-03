import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  getClientByBarcode,
  getTransactionsByClient,
  getConfigByRestaurantId,
  getPublicInfoBySlug,
} from "@/lib/loyalty/queries";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ barcode: string }> }
) {
  try {
    const { barcode } = await params;

    const client = await getClientByBarcode(supabaseAdmin, barcode);
    if (!client) {
      return NextResponse.json(
        { error: "Client non trouvé" },
        { status: 404 }
      );
    }

    const config = await getConfigByRestaurantId(
      supabaseAdmin,
      client.restaurant_id
    );
    if (!config) {
      return NextResponse.json(
        { error: "Configuration non trouvée" },
        { status: 404 }
      );
    }

    const [transactions, restaurant] = await Promise.all([
      getTransactionsByClient(supabaseAdmin, client.id),
      getPublicInfoBySlug(supabaseAdmin, config.slug),
    ]);

    return NextResponse.json({
      client,
      transactions,
      config,
      restaurant,
    });
  } catch (error) {
    console.error("Loyalty client lookup error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recherche" },
      { status: 500 }
    );
  }
}
