import http2 from "node:http2";

const APNS_HOST = "api.push.apple.com";
const APNS_PORT = 443;
const PASS_TOPIC = "pass.com.opexfood.loyalty";

function getCertAndKey(): { cert: string; key: string } {
  if (process.env.APPLE_PASS_CERT_PEM && process.env.APPLE_PASS_KEY_PEM) {
    return {
      cert: Buffer.from(process.env.APPLE_PASS_CERT_PEM, "base64").toString(),
      key: Buffer.from(process.env.APPLE_PASS_KEY_PEM, "base64").toString(),
    };
  }

  const fs = require("fs");
  const path = require("path");
  const certsDir = path.resolve(process.cwd(), "certs");
  return {
    cert: fs.readFileSync(path.join(certsDir, "pass.pem"), "utf-8"),
    key: fs.readFileSync(path.join(certsDir, "pass.key"), "utf-8"),
  };
}

/**
 * Send an empty push notification to an Apple Wallet device.
 * This tells the device to check for pass updates via the web service.
 */
export function sendPassUpdatePush(pushToken: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const { cert, key } = getCertAndKey();

    const client = http2.connect(`https://${APNS_HOST}:${APNS_PORT}`, {
      cert,
      key,
    });

    client.on("error", (err) => {
      console.error("APNs connection error:", err);
      client.close();
      reject(err);
    });

    const req = client.request({
      ":method": "POST",
      ":path": `/3/device/${pushToken}`,
      "apns-topic": PASS_TOPIC,
      "apns-push-type": "background",
      "apns-priority": "5",
    });

    req.setEncoding("utf8");

    let responseData = "";
    let statusCode = 0;

    req.on("response", (headers) => {
      statusCode = headers[":status"] as number;
    });

    req.on("data", (chunk) => {
      responseData += chunk;
    });

    req.on("end", () => {
      client.close();
      if (statusCode === 200) {
        resolve();
      } else {
        console.error(`APNs push failed (${statusCode}):`, responseData);
        // Don't reject — push failures shouldn't break the scan flow
        resolve();
      }
    });

    req.on("error", (err) => {
      console.error("APNs request error:", err);
      client.close();
      resolve(); // Don't reject
    });

    // Empty payload — just a signal to check for updates
    req.end(JSON.stringify({}));
  });
}

/**
 * Send push updates to all registered devices for a given serial number (barcode).
 * Fire-and-forget: errors are logged but don't propagate.
 */
export async function notifyPassUpdate(barcode: string): Promise<void> {
  try {
    const { supabaseAdmin } = await import("@/lib/supabase/admin");

    const { data: registrations } = await supabaseAdmin
      .from("wallet_registrations")
      .select("push_token")
      .eq("serial_number", barcode);

    if (!registrations || registrations.length === 0) return;

    // Fire all pushes in parallel, don't await individually
    await Promise.allSettled(
      registrations.map((reg) => sendPassUpdatePush(reg.push_token))
    );
  } catch (error) {
    console.error("notifyPassUpdate error:", error);
  }
}
