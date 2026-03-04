import { PKPass } from "passkit-generator";
import path from "path";
import fs from "fs";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getClientByBarcode, getConfigByRestaurantId } from "@/lib/loyalty/queries";

const TEMPLATE_DIR = path.resolve(
  process.cwd(),
  "src/lib/loyalty/pass-template.pass"
);

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://opexfood.vercel.app";

function getCertificates() {
  if (process.env.APPLE_PASS_CERT_PEM && process.env.APPLE_PASS_KEY_PEM && process.env.APPLE_WWDR_PEM) {
    return {
      signerCert: Buffer.from(process.env.APPLE_PASS_CERT_PEM, "base64").toString(),
      signerKey: Buffer.from(process.env.APPLE_PASS_KEY_PEM, "base64").toString(),
      wwdr: Buffer.from(process.env.APPLE_WWDR_PEM, "base64").toString(),
    };
  }

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
    if (file === "pass.json") continue;
    buffers[file] = fs.readFileSync(path.join(TEMPLATE_DIR, file));
  }
  return buffers;
}

/**
 * Generate a .pkpass buffer for a loyalty client.
 * Used by both the initial download endpoint and the Wallet web service update endpoint.
 */
export async function generatePassBuffer(barcode: string): Promise<Buffer> {
  const client = await getClientByBarcode(supabaseAdmin, barcode);
  if (!client) throw new Error("Client non trouvé");

  const config = await getConfigByRestaurantId(supabaseAdmin, client.restaurant_id);
  if (!config) throw new Error("Config non trouvée");

  const { data: restaurant } = await supabaseAdmin
    .from("restaurants")
    .select("name")
    .eq("id", client.restaurant_id)
    .single();

  const restaurantName = restaurant?.name || "Restaurant";
  const templateBuffers = loadTemplateBuffers();

  const pass = new PKPass(templateBuffers, getCertificates(), {
    serialNumber: client.barcode,
    description: `Carte fidélité ${restaurantName}`,
    organizationName: restaurantName,
    passTypeIdentifier: "pass.com.opexfood.loyalty",
    teamIdentifier: "CD5B83L1ZJ",
    foregroundColor: "rgb(255, 255, 255)",
    backgroundColor: "rgb(234, 88, 12)",
    labelColor: "rgb(255, 255, 255)",
    // Web Service for automatic updates
    webServiceURL: `${APP_URL}/api/wallet`,
    authenticationToken: client.barcode,
  });

  pass.type = "storeCard";

  pass.headerFields.push({
    key: "points",
    label: "POINTS",
    value: client.points,
    textAlignment: "PKTextAlignmentRight",
  });

  pass.primaryFields.push({
    key: "balance",
    label: "Solde fidélité",
    value: `${client.points} pts`,
  });

  pass.secondaryFields.push({
    key: "reward",
    label: "Récompense",
    value: config.reward_description,
  });

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

  pass.setBarcodes(client.barcode);

  return pass.getAsBuffer();
}
