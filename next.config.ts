import type { NextConfig } from "next";
// @ts-ignore
import withPWA from 'next-pwa';

const nextConfig: NextConfig = withPWA({
  webpack: (config: any) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  },
  async rewrites() {
    return [
      {
        source: '/api/jma/:path*',
        destination: 'https://www.jma.go.jp/bosai/:path*',
      },
    ];
  },
});

export default nextConfig;
