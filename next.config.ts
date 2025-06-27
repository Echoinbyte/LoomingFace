import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Enable image optimization - Next.js will automatically convert to WebP when possible
    formats: ["image/webp", "image/avif"],
    // Add image optimization settings
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable compression
  compress: true,
};

export default nextConfig;
