import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OpexFood — Gestion Restaurant",
    short_name: "OpexFood",
    description:
      "Gérez votre programme de fidélité, scannez les QR codes clients et suivez vos performances en temps réel.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#ea580c",
    orientation: "any",
    categories: ["business", "food", "productivity"],
    icons: [
      {
        src: "/icons/icon-192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512-maskable",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
