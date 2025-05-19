/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    optimisticClientCache: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
    webVitals: { 
      attribution: true 
    },
    ppr: true, // Partial Prerendering
    taint: true, // Taint API to prevent sensitive data exposure
    turbo: {
      rules: {
        // Custom rules for Turbopack
      }
    }
  },
  // Cấu hình môi trường
  env: {
    API_URL: process.env.API_URL,
  },
  // Tối ưu hóa compiler
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Giúp giảm kích thước bundle
  webpack: (config, { dev, isServer }) => {
    // Chỉ áp dụng ở môi trường production
    if (!dev && !isServer) {
      // Split chunks tối ưu hơn
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: '~',
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
  // Cấu hình header bảo mật
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;"
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ];
  },
  // Đảm bảo file nén gzip được sử dụng
  compress: true,
};

// Bật Bundle Analyzer trong development khi cần
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
  module.exports = withBundleAnalyzer(nextConfig);
} else {
  module.exports = nextConfig;
}