import { NextRequest, NextResponse } from "next/server";
import { generatePassBuffer } from "@/lib/loyalty/pass-generator";

export async function GET(request: NextRequest) {
  try {
    const barcode = request.nextUrl.searchParams.get("barcode");
    if (!barcode) {
      return NextResponse.json({ error: "Barcode requis" }, { status: 400 });
    }

    const buffer = await generatePassBuffer(barcode);

    return new NextResponse(buffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.apple.pkpass",
        "Content-Disposition": `attachment; filename="${barcode}.pkpass"`,
      },
    });
  } catch (error) {
    console.error("Apple Wallet pass error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération du pass" },
      { status: 500 }
    );
  }
}
