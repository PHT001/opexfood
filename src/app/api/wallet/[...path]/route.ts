import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { generatePassBuffer } from "@/lib/loyalty/pass-generator";

/**
 * Apple Wallet Web Service — catch-all route handler.
 * Implements the 5 required endpoints for automatic pass updates.
 * See: https://developer.apple.com/documentation/walletpasses/adding-a-web-service-to-update-passes
 */

function parsePath(path: string[]): {
  endpoint: string;
  deviceId?: string;
  passTypeId?: string;
  serial?: string;
} {
  // v1/devices/{deviceId}/registrations/{passTypeId}/{serial}
  // v1/devices/{deviceId}/registrations/{passTypeId}
  // v1/passes/{passTypeId}/{serial}
  // v1/log

  if (path[0] !== "v1") return { endpoint: "unknown" };

  if (path[1] === "devices" && path[3] === "registrations") {
    return {
      endpoint: path.length >= 6 ? "register" : "serials",
      deviceId: path[2],
      passTypeId: path[4],
      serial: path[5],
    };
  }

  if (path[1] === "passes") {
    return {
      endpoint: "latest",
      passTypeId: path[2],
      serial: path[3],
    };
  }

  if (path[1] === "log") {
    return { endpoint: "log" };
  }

  return { endpoint: "unknown" };
}

function getAuthToken(request: NextRequest): string | null {
  const auth = request.headers.get("authorization");
  if (!auth) return null;
  // Format: "ApplePass <token>"
  return auth.replace("ApplePass ", "");
}

// ─── POST /api/wallet/v1/devices/{deviceId}/registrations/{passTypeId}/{serial}
async function registerDevice(
  request: NextRequest,
  deviceId: string,
  passTypeId: string,
  serial: string
) {
  const token = getAuthToken(request);
  if (!token || token !== serial) {
    return new NextResponse(null, { status: 401 });
  }

  let body: { pushToken?: string };
  try {
    body = await request.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  if (!body.pushToken) {
    return new NextResponse(null, { status: 400 });
  }

  // Check if already registered
  const { data: existing } = await supabaseAdmin
    .from("wallet_registrations")
    .select("id")
    .eq("device_library_id", deviceId)
    .eq("pass_type_id", passTypeId)
    .eq("serial_number", serial)
    .maybeSingle();

  if (existing) {
    // Update push token if changed
    await supabaseAdmin
      .from("wallet_registrations")
      .update({ push_token: body.pushToken })
      .eq("id", existing.id);
    return new NextResponse(null, { status: 200 });
  }

  // New registration
  await supabaseAdmin.from("wallet_registrations").insert({
    device_library_id: deviceId,
    push_token: body.pushToken,
    pass_type_id: passTypeId,
    serial_number: serial,
  });

  return new NextResponse(null, { status: 201 });
}

// ─── DELETE /api/wallet/v1/devices/{deviceId}/registrations/{passTypeId}/{serial}
async function unregisterDevice(
  request: NextRequest,
  deviceId: string,
  passTypeId: string,
  serial: string
) {
  const token = getAuthToken(request);
  if (!token || token !== serial) {
    return new NextResponse(null, { status: 401 });
  }

  await supabaseAdmin
    .from("wallet_registrations")
    .delete()
    .eq("device_library_id", deviceId)
    .eq("pass_type_id", passTypeId)
    .eq("serial_number", serial);

  return new NextResponse(null, { status: 200 });
}

// ─── GET /api/wallet/v1/devices/{deviceId}/registrations/{passTypeId}
async function getSerials(
  request: NextRequest,
  deviceId: string,
  passTypeId: string
) {
  const passesUpdatedSince = request.nextUrl.searchParams.get(
    "passesUpdatedSince"
  );

  // Get all serial numbers registered by this device
  const { data: registrations } = await supabaseAdmin
    .from("wallet_registrations")
    .select("serial_number")
    .eq("device_library_id", deviceId)
    .eq("pass_type_id", passTypeId);

  if (!registrations || registrations.length === 0) {
    return new NextResponse(null, { status: 204 });
  }

  const serialNumbers = registrations.map((r) => r.serial_number);

  // If passesUpdatedSince is provided, filter to only updated passes
  if (passesUpdatedSince) {
    const { data: updatedClients } = await supabaseAdmin
      .from("loyalty_clients")
      .select("barcode, updated_at")
      .in("barcode", serialNumbers)
      .gt("updated_at", passesUpdatedSince);

    if (!updatedClients || updatedClients.length === 0) {
      return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json({
      serialNumbers: updatedClients.map((c) => c.barcode),
      lastUpdated: new Date().toISOString(),
    });
  }

  return NextResponse.json({
    serialNumbers,
    lastUpdated: new Date().toISOString(),
  });
}

// ─── GET /api/wallet/v1/passes/{passTypeId}/{serial}
async function getLatestPass(
  request: NextRequest,
  passTypeId: string,
  serial: string
) {
  const token = getAuthToken(request);
  if (!token || token !== serial) {
    return new NextResponse(null, { status: 401 });
  }

  try {
    const buffer = await generatePassBuffer(serial);

    return new NextResponse(buffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.apple.pkpass",
        "Last-Modified": new Date().toUTCString(),
      },
    });
  } catch (error) {
    console.error("Wallet getLatestPass error:", error);
    return new NextResponse(null, { status: 500 });
  }
}

// ─── POST /api/wallet/v1/log
async function handleLog(request: NextRequest) {
  try {
    const body = await request.json();
    console.error("Apple Wallet log:", JSON.stringify(body));
  } catch {
    // Ignore parse errors
  }
  return new NextResponse(null, { status: 200 });
}

// ─── Route handlers ───

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const parsed = parsePath(path);

  if (parsed.endpoint === "serials" && parsed.deviceId && parsed.passTypeId) {
    return getSerials(request, parsed.deviceId, parsed.passTypeId);
  }

  if (parsed.endpoint === "latest" && parsed.passTypeId && parsed.serial) {
    return getLatestPass(request, parsed.passTypeId, parsed.serial);
  }

  return new NextResponse(null, { status: 404 });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const parsed = parsePath(path);

  if (
    parsed.endpoint === "register" &&
    parsed.deviceId &&
    parsed.passTypeId &&
    parsed.serial
  ) {
    return registerDevice(
      request,
      parsed.deviceId,
      parsed.passTypeId,
      parsed.serial
    );
  }

  if (parsed.endpoint === "log") {
    return handleLog(request);
  }

  return new NextResponse(null, { status: 404 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const parsed = parsePath(path);

  if (
    parsed.endpoint === "register" &&
    parsed.deviceId &&
    parsed.passTypeId &&
    parsed.serial
  ) {
    return unregisterDevice(
      request,
      parsed.deviceId,
      parsed.passTypeId,
      parsed.serial
    );
  }

  return new NextResponse(null, { status: 404 });
}
