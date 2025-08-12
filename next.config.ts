import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Optimize for production
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['framer-motion', 'lucide-react']
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif']
  },

  // Development optimizations
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Fix filesystem watching in development
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules', '**/.git', '**/.next', '**/dist']
      }
    }
    return config
  }
}

export default nextConfig
