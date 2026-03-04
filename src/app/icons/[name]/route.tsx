import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

const SIZES: Record<string, { width: number; height: number; maskable?: boolean }> = {
  "icon-192": { width: 192, height: 192 },
  "icon-512": { width: 512, height: 512 },
  "icon-512-maskable": { width: 512, height: 512, maskable: true },
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const config = SIZES[name];

  if (!config) {
    return new Response("Not found", { status: 404 });
  }

  const { width, height, maskable } = config;
  const fontSize = Math.round(width * 0.22);
  const padding = maskable ? Math.round(width * 0.15) : 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
          padding: `${padding}px`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Fork + knife icon */}
          <div
            style={{
              fontSize: Math.round(width * 0.35),
              marginBottom: Math.round(width * 0.02),
              display: "flex",
            }}
          >
            🍽️
          </div>
          <div style={{ display: "flex" }}>
            <span
              style={{
                fontSize,
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}
            >
              Opex
            </span>
            <span
              style={{
                fontSize,
                fontWeight: 800,
                color: "#fed7aa",
                letterSpacing: "-0.02em",
              }}
            >
              Food
            </span>
          </div>
        </div>
      </div>
    ),
    { width, height }
  );
}
