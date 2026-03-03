import { NextRequest, NextResponse } from "next/server";
import { generateQRCodeBuffer } from "@/lib/loyalty/barcode";
import { getLoyaltyInscriptionURL } from "@/lib/loyalty/config";
import { createClient } from "@/lib/supabase/server";
import {
  getRestaurantIdForUser,
  getConfigByRestaurantId,
} from "@/lib/loyalty/queries";

export async function GET(request: NextRequest) {
  try {
    // Try to get slug from query param first (public usage)
    const slugParam = request.nextUrl.searchParams.get("slug");

    let slug = slugParam;

    // If no slug provided, get it from authenticated user's config
    if (!slug) {
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

      const config = await getConfigByRestaurantId(supabase, restaurantId);
      if (!config) {
        return NextResponse.json(
          { error: "Config fidélité non trouvée" },
          { status: 404 }
        );
      }

      slug = config.slug;
    }

    const url = getLoyaltyInscriptionURL(slug);
    const buffer = await generateQRCodeBuffer(url, { width: 800 });

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Loyalty QR error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération du QR code" },
      { status: 500 }
    );
  }
}
