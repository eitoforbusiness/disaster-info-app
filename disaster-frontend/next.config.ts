import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config: any) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/jma/:path*',
        destination: 'https://www.jma.go.jp/bosai/:path*',
      },
    ];
  },
};

export default nextConfig;
