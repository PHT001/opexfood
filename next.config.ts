import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "/tmp/opexfood-next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
};

export default nextConfig;
