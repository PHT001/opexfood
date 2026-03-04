import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_FIELDS = [
  "name",
  "address",
  "phone",
  "primary_color",
  "secondary_color",
] as const;

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
    .select("name, address, phone, primary_color, secondary_color, logo_url")
    .eq("user_id", user.id)
    .single();

  if (error || !restaurant) {
    return NextResponse.json(
      { error: "Restaurant non trouvé" },
      { status: 404 }
    );
  }

  return NextResponse.json(restaurant);
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

  // Only allow known fields
  const updates: Record<string, string> = {};
  for (const field of ALLOWED_FIELDS) {
    if (field in body && typeof body[field] === "string") {
      updates[field] = body[field].trim();
    }
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
