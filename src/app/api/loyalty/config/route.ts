import { NextRequest, NextResponse } from "next/server";
import { mockLoyaltyConfig } from "@/lib/loyalty/mock-data";

export async function GET() {
  try {
    // TODO: Add auth check + filter by restaurant_id
    return NextResponse.json({ config: mockLoyaltyConfig });
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
    // TODO: Add auth check
    const updates = await request.json();

    // Validate fields
    if (updates.points_per_euro !== undefined) {
      if (typeof updates.points_per_euro !== "number" || updates.points_per_euro < 1) {
        return NextResponse.json(
          { error: "Points par euro invalide (minimum 1)" },
          { status: 400 }
        );
      }
    }
    if (updates.reward_threshold !== undefined) {
      if (typeof updates.reward_threshold !== "number" || updates.reward_threshold < 10) {
        return NextResponse.json(
          { error: "Seuil de récompense invalide (minimum 10)" },
          { status: 400 }
        );
      }
    }

    // TODO: Replace with Supabase update
    if (updates.points_per_euro) mockLoyaltyConfig.points_per_euro = updates.points_per_euro;
    if (updates.reward_threshold) mockLoyaltyConfig.reward_threshold = updates.reward_threshold;
    if (updates.reward_description) mockLoyaltyConfig.reward_description = updates.reward_description;
    if (updates.welcome_points !== undefined) mockLoyaltyConfig.welcome_points = updates.welcome_points;
    mockLoyaltyConfig.updated_at = new Date().toISOString();

    return NextResponse.json({ config: mockLoyaltyConfig });
  } catch (error) {
    console.error("Loyalty config PUT error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la config" },
      { status: 500 }
    );
  }
}
