import { NextRequest, NextResponse } from "next/server";
import { PKPass } from "passkit-generator";
import path from "path";
import fs from "fs";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getClientByBarcode, getConfigByRestaurantId } from "@/lib/loyalty/queries";

const TEMPLATE_DIR = path.resolve(
  process.cwd(),
  "src/lib/loyalty/pass-template.pass"
);

function getCertificates() {
  // In production: read from base64 env vars
  if (process.env.APPLE_PASS_CERT_PEM && process.env.APPLE_PASS_KEY_PEM && process.env.APPLE_WWDR_PEM) {
    return {
      signerCert: Buffer.from(process.env.APPLE_PASS_CERT_PEM, "base64").toString(),
      signerKey: Buffer.from(process.env.APPLE_PASS_KEY_PEM, "base64").toString(),
      wwdr: Buffer.from(process.env.APPLE_WWDR_PEM, "base64").toString(),
    };
  }

  // In development: read from local certs/ directory
  const certsDir = path.resolve(process.cwd(), "certs");
  return {
    signerCert: fs.readFileSync(path.join(certsDir, "pass.pem"), "utf-8"),
    signerKey: fs.readFileSync(path.join(certsDir, "pass.key"), "utf-8"),
    wwdr: fs.readFileSync(path.join(certsDir, "wwdr.pem"), "utf-8"),
  };
}

function loadTemplateBuffers(): Record<string, Buffer> {
  const files = fs.readdirSync(TEMPLATE_DIR);
  const buffers: Record<string, Buffer> = {};
  for (const file of files) {
    if (file === "pass.json") continue; // pass.json is handled by overrides
    buffers[file] = fs.readFileSync(path.join(TEMPLATE_DIR, file));
  }
  return buffers;
}

export async function GET(request: NextRequest) {
  try {
    const barcode = request.nextUrl.searchParams.get("barcode");
    if (!barcode) {
      return NextResponse.json({ error: "Barcode requis" }, { status: 400 });
    }

    // Fetch client data
    const client = await getClientByBarcode(supabaseAdmin, barcode);
    if (!client) {
      return NextResponse.json({ error: "Client non trouvé" }, { status: 404 });
    }

    const config = await getConfigByRestaurantId(supabaseAdmin, client.restaurant_id);
    if (!config) {
      return NextResponse.json({ error: "Config non trouvée" }, { status: 404 });
    }

    // Get restaurant name
    const { data: restaurant } = await supabaseAdmin
      .from("restaurants")
      .select("name")
      .eq("id", client.restaurant_id)
      .single();

    const restaurantName = restaurant?.name || "Restaurant";

    // Load template files as buffers
    const templateBuffers = loadTemplateBuffers();

    // Create the pass
    const pass = new PKPass(templateBuffers, getCertificates(), {
      serialNumber: client.barcode,
      description: `Carte fidélité ${restaurantName}`,
      organizationName: restaurantName,
      passTypeIdentifier: "pass.com.opexfood.loyalty",
      teamIdentifier: "CD5B83L1ZJ",
      foregroundColor: "rgb(255, 255, 255)",
      backgroundColor: "rgb(234, 88, 12)",
      labelColor: "rgb(255, 255, 255)",
    });

    // Set pass type
    pass.type = "storeCard";

    // Header: points
    pass.headerFields.push({
      key: "points",
      label: "POINTS",
      value: client.points,
      textAlignment: "PKTextAlignmentRight",
    });

    // Primary: balance display
    pass.primaryFields.push({
      key: "balance",
      label: "Solde fidélité",
      value: `${client.points} pts`,
    });

    // Secondary: reward info
    pass.secondaryFields.push({
      key: "reward",
      label: "Récompense",
      value: config.reward_description,
    });

    // Auxiliary fields
    pass.auxiliaryFields.push(
      {
        key: "name",
        label: "Client",
        value: client.name,
      },
      {
        key: "threshold",
        label: "Objectif",
        value: `${config.reward_threshold} pts`,
        textAlignment: "PKTextAlignmentRight",
      }
    );

    // Back fields
    pass.backFields.push(
      {
        key: "info",
        label: `Programme fidélité ${restaurantName}`,
        value: `Gagnez ${config.points_per_euro} points par euro dépensé.\nÀ ${config.reward_threshold} points, obtenez : ${config.reward_description} !`,
      },
      {
        key: "member",
        label: "N° de membre",
        value: client.barcode,
      },
      {
        key: "terms",
        label: "Conditions",
        value: "Les points sont cumulables et non transférables. La récompense est délivrée une fois le seuil atteint. Propulsé par OpexFood.",
      }
    );

    // Set barcode (QR code with the client barcode)
    pass.setBarcodes(client.barcode);

    // Generate the .pkpass buffer
    const buffer = pass.getAsBuffer();

    return new NextResponse(buffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.apple.pkpass",
        "Content-Disposition": `attachment; filename="${client.barcode}.pkpass"`,
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
