import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.postimg.cc',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.ibb.co',
      }
    ]
  },
};

export default nextConfig;
