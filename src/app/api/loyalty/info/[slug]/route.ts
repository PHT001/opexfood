import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getPublicInfoBySlug } from "@/lib/loyalty/queries";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const info = await getPublicInfoBySlug(supabaseAdmin, slug);
    if (!info) {
      return NextResponse.json(
        { error: "Restaurant non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(info);
  } catch (error) {
    console.error("Loyalty info error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des infos" },
      { status: 500 }
    );
  }
}
