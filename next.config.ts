import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'itx-frontend-test.onrender.com',
      },
    ],
  },
};

export default nextConfig;
