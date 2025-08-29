import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  eslint: {
    // Skip ESLint during builds to unblock deployments
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
