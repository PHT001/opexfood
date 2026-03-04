import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 36,
        }}
      >
        <div
          style={{
            fontSize: 64,
            marginBottom: 2,
            display: "flex",
          }}
        >
          🍽️
        </div>
        <div style={{ display: "flex" }}>
          <span
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            Opex
          </span>
          <span
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#fed7aa",
              letterSpacing: "-0.02em",
            }}
          >
            Food
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
