// next.config.ts
import type { NextConfig } from "next";

const nextConfig = {
  reactCompiler: true,

  experimental: {
    // @ts-expect-error - turbopack rules are not yet in type definitions, but Next supports them
    turbopack: {
      rules: {
        "*.svg": {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      },
    },
  },
} satisfies NextConfig;

export default nextConfig;
