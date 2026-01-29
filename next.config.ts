import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-6dc8c153edcc4cc69f52ac58fc495ab0.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
