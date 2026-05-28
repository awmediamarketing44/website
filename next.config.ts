import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve the most modern image format the browser supports.
  // AVIF is ~30-50% smaller than WebP, WebP ~25% smaller than JPEG.
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // Add common widths used in next/image sizes attribute
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Tree-shake heavy ESM packages on import (motion ships a lot of features)
  experimental: {
    optimizePackageImports: ["motion", "motion/react"],
  },

  // Modern browsers; smaller polyfill payload
  compress: true,
  poweredByHeader: false,

  // Long-cache static assets, short-cache HTML
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
