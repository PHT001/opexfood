import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.VERCEL ? {} : { distDir: "/tmp/opexfood-next" }),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/demo",
        destination: "/#modules",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
