import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  getRestaurantIdForUser,
  getClientsByRestaurant,
  getConfigByRestaurantId,
} from "@/lib/loyalty/queries";

export async function GET() {
  try {
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

    const [clients, config] = await Promise.all([
      getClientsByRestaurant(supabase, restaurantId),
      getConfigByRestaurantId(supabase, restaurantId),
    ]);

    return NextResponse.json({ clients, config });
  } catch (error) {
    console.error("Loyalty clients error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des clients" },
      { status: 500 }
    );
  }
}
