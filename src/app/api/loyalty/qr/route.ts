import { NextRequest, NextResponse } from "next/server";
import { generateQRCodeBuffer } from "@/lib/loyalty/barcode";
import { getLoyaltyInscriptionURL } from "@/lib/loyalty/config";
import { mockLoyaltyConfig } from "@/lib/loyalty/mock-data";

export async function GET(request: NextRequest) {
  try {
    // TODO: Auth check + get restaurant's slug from Supabase
    const slug = request.nextUrl.searchParams.get("slug") || mockLoyaltyConfig.slug;
    const url = getLoyaltyInscriptionURL(slug);
    const buffer = await generateQRCodeBuffer(url, { width: 800 });

    return new NextResponse(buffer, {
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
