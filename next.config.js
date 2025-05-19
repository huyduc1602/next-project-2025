/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  // External packages used in server components
  // Note: date-fns removed to resolve conflict with auto-transpilation
  serverExternalPackages: [],
  experimental: {
    optimizeCss: true,
    optimisticClientCache: true,
    serverActions: {
      bodySizeLimit: "2mb",
    },
    // Optimize memory usage
    memoryBasedWorkersCount: true,
    // ppr: true, // Partial Prerendering
    taint: true, // Taint API to prevent sensitive data exposure
  },
  // Configuration environment
  env: {
    API_URL: process.env.API_URL,
  },
  // Compiler optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Helps reduce bundle size
  webpack: (config, { dev, isServer }) => {
    // Only apply in production environment
    if (!dev && !isServer) {
      // Optimized chunk splitting
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: "~",
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }

    return config;
  },
  // Security headers configuration
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  // Enable gzip compression
  compress: true,
};

// Enable Bundle Analyzer in development when needed
if (process.env.ANALYZE === "true") {
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
  });
  module.exports = withBundleAnalyzer(nextConfig);
} else {
  module.exports = nextConfig;
}
