import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");

  if (!slug || slug.length < 3) {
    return NextResponse.json({ available: false, error: "Slug trop court (min 3 caractères)" });
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ available: false, error: "Caractères invalides" });
  }

  const supabase = await createClient();

  const { data } = await supabase
    .from("loyalty_configs")
    .select("id, restaurant_id")
    .eq("slug", slug)
    .maybeSingle();

  // If slug exists, check if it belongs to the current user's restaurant
  if (data) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: restaurant } = await supabase
        .from("restaurants")
        .select("id")
        .eq("user_id", user.id)
        .single();

      // Slug belongs to the current user's restaurant — it's "available" for them
      if (restaurant && restaurant.id === data.restaurant_id) {
        return NextResponse.json({ available: true });
      }
    }
  }

  return NextResponse.json({ available: !data });
}
