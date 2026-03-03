import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   output: 'export',
  basePath: '/career-rocket',
  assetPrefix: '/career-rocket/',
  images: {
  domains: ["images.unsplash.com"],
  unoptimized: true,   // ⭐ VERY IMPORTANT
}
};

export default nextConfig;
