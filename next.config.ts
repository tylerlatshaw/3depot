import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/__/:path*",
        destination: "https://tylerlatshaw-3depot-dev.firebaseapp.com://*",
      },
    ];
  },
};

export default nextConfig;
