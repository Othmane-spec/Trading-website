import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["motion"],
  images: { unoptimized: true },
};

export default nextConfig;
