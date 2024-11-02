import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'i3.ytimg.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'static.platzi.com',
        port: '',
        pathname: '/cdn-cgi/image/**',
      }
    ]
  }
};

export default nextConfig;
