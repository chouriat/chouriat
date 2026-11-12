import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bundle a minimal self-contained server in .next/standalone for Docker
  // hosting (OVHcloud + Coolify). Vercel ignores this setting.
  output: "standalone",
};

export default nextConfig;
