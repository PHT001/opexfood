import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  getRestaurantIdForUser,
  getConfigByRestaurantId,
  upsertConfig,
  generateSlug,
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

    let config = await getConfigByRestaurantId(supabase, restaurantId);

    // Lazy creation: if no config exists, create defaults
    if (!config) {
      const { data: restaurant } = await supabase
        .from("restaurants")
        .select("name")
        .eq("id", restaurantId)
        .single();

      const slug = generateSlug(
        restaurant?.name ?? "restaurant",
        restaurantId
      );

      config = await upsertConfig(supabase, restaurantId, {
        slug,
        points_per_euro: 10,
        reward_threshold: 500,
        reward_description: "1 Bowl offert",
        welcome_points: 50,
        is_active: true,
      });
    }

    return NextResponse.json({ config });
  } catch (error) {
    console.error("Loyalty config GET error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la config" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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

    const updates = await request.json();

    // Validate
    if (updates.points_per_euro !== undefined) {
      if (
        typeof updates.points_per_euro !== "number" ||
        updates.points_per_euro < 1
      ) {
        return NextResponse.json(
          { error: "Points par euro invalide (minimum 1)" },
          { status: 400 }
        );
      }
    }
    if (updates.reward_threshold !== undefined) {
      if (
        typeof updates.reward_threshold !== "number" ||
        updates.reward_threshold < 10
      ) {
        return NextResponse.json(
          { error: "Seuil de récompense invalide (minimum 10)" },
          { status: 400 }
        );
      }
    }

    const allowedFields = [
      "points_per_euro",
      "reward_threshold",
      "reward_description",
      "welcome_points",
    ] as const;
    const filtered: Record<string, unknown> = {};
    for (const key of allowedFields) {
      if (updates[key] !== undefined) {
        filtered[key] = updates[key];
      }
    }

    const config = await upsertConfig(supabase, restaurantId, filtered);

    return NextResponse.json({ config });
  } catch (error) {
    console.error("Loyalty config PUT error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la config" },
      { status: 500 }
    );
  }
}
