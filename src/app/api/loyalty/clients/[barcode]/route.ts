import { NextRequest, NextResponse } from "next/server";
import {
  mockLoyaltyClients,
  mockLoyaltyTransactions,
  mockLoyaltyConfig,
  mockPublicInfo,
} from "@/lib/loyalty/mock-data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ barcode: string }> }
) {
  try {
    const { barcode } = await params;

    // TODO: Replace with Supabase query
    const client = mockLoyaltyClients.find((c) => c.barcode === barcode);
    if (!client) {
      return NextResponse.json(
        { error: "Client non trouvé" },
        { status: 404 }
      );
    }

    const transactions = mockLoyaltyTransactions
      .filter((t) => t.client_id === client.id)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json({
      client,
      transactions,
      config: mockLoyaltyConfig,
      restaurant: mockPublicInfo,
    });
  } catch (error) {
    console.error("Loyalty client lookup error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recherche" },
      { status: 500 }
    );
  }
}
