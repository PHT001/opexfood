import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { data: restaurant, error } = await supabase
    .from("restaurants")
    .select("onboarding_completed, onboarding_step")
    .eq("user_id", user.id)
    .single();

  if (error || !restaurant) {
    return NextResponse.json(
      { error: "Restaurant non trouvé" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    onboarding_completed: restaurant.onboarding_completed ?? false,
    onboarding_step: restaurant.onboarding_step ?? 0,
  });
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();

  const updates: Record<string, unknown> = {};

  if (typeof body.step === "number") {
    updates.onboarding_step = body.step;
  }
  if (typeof body.completed === "boolean") {
    updates.onboarding_completed = body.completed;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Aucune modification" }, { status: 400 });
  }

  const { error } = await supabase
    .from("restaurants")
    .update(updates)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json(
      { error: "Erreur lors de la sauvegarde" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
