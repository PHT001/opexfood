import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "OpexFood — Plateforme IA pour la Restauration";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", marginBottom: 24 }}>
          <span style={{ fontSize: 64, fontWeight: 800, color: "#f8fafc" }}>
            Opex
          </span>
          <span style={{ fontSize: 64, fontWeight: 800, color: "#ea580c" }}>
            Food
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 28,
            color: "#94a3b8",
            margin: 0,
            marginBottom: 48,
          }}
        >
          Plateforme IA pour la Restauration
        </p>

        {/* Modules */}
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "Chatbot IA", color: "#f97316" },
            { label: "Programme Fidélité", color: "#8b5cf6" },
            { label: "Agent Vocal", color: "#10b981" },
          ].map((m) => (
            <div
              key={m.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "12px 24px",
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: m.color,
                }}
              />
              <span style={{ fontSize: 20, color: "#e2e8f0", fontWeight: 600 }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
