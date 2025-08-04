import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Optimize for production
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
