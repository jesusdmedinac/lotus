import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'i3.ytimg.com',
        port: '',
        pathname: '/vi/**',
      }
    ]
  }
};

export default nextConfig;
