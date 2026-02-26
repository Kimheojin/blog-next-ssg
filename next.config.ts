import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === "production" ? "https://HeoJin1109.github.io" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;