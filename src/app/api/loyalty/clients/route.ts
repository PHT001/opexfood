import { NextRequest, NextResponse } from "next/server";
import { mockLoyaltyClients } from "@/lib/loyalty/mock-data";

export async function GET(request: NextRequest) {
  try {
    // TODO: Add auth check + filter by restaurant_id
    // const supabase = await createClient();
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    // TODO: Replace with Supabase query filtered by restaurant_id
    return NextResponse.json({ clients: mockLoyaltyClients });
  } catch (error) {
    console.error("Loyalty clients error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des clients" },
      { status: 500 }
    );
  }
}
