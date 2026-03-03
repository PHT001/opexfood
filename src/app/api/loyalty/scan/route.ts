import { NextRequest, NextResponse } from "next/server";
import {
  mockLoyaltyClients,
  mockLoyaltyConfig,
  mockLoyaltyTransactions,
  findClientByBarcode,
} from "@/lib/loyalty/mock-data";
import type { LoyaltyTransaction, ScanResponse } from "@/lib/loyalty/types";

export async function POST(request: NextRequest) {
  try {
    // TODO: Add auth check (staff must be authenticated)
    // const supabase = await createClient();
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { barcode, amount } = await request.json();

    if (!barcode || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Barcode et montant requis" },
        { status: 400 }
      );
    }

    // Find client by barcode
    // TODO: Replace with Supabase query
    const client = findClientByBarcode(barcode);
    if (!client) {
      return NextResponse.json(
        { error: "Client non trouvé" },
        { status: 404 }
      );
    }

    // Get config for this restaurant
    const config = mockLoyaltyConfig;
    const pointsEarned = Math.floor(amount * config.points_per_euro);

    // Update client points
    // TODO: Replace with Supabase atomic update
    const clientIndex = mockLoyaltyClients.findIndex((c) => c.id === client.id);
    if (clientIndex !== -1) {
      mockLoyaltyClients[clientIndex].points += pointsEarned;
      mockLoyaltyClients[clientIndex].total_visits += 1;
      mockLoyaltyClients[clientIndex].total_spent += amount;
      mockLoyaltyClients[clientIndex].last_visit_at = new Date().toISOString();
      mockLoyaltyClients[clientIndex].updated_at = new Date().toISOString();
    }

    // Create transaction
    const transaction: LoyaltyTransaction = {
      id: `lt-${Date.now()}`,
      client_id: client.id,
      restaurant_id: client.restaurant_id,
      type: "earn",
      points: pointsEarned,
      amount,
      description: null,
      staff_user_id: null,
      created_at: new Date().toISOString(),
    };
    mockLoyaltyTransactions.push(transaction);

    const newBalance = mockLoyaltyClients[clientIndex]?.points ?? client.points + pointsEarned;

    // TODO: Call updateClientPasses() for real-time wallet updates (Phase 4)

    const response: ScanResponse = {
      client: mockLoyaltyClients[clientIndex] ?? client,
      points_earned: pointsEarned,
      new_balance: newBalance,
      reward_available: newBalance >= config.reward_threshold,
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
