/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  trailingSlash: true,
  // Enable static generation for better SEO
  experimental: {
    appDir: true,
  },
  // Ensure all dynamic routes are statically generated
  generateBuildId: async () => {
    return 'static-build-id'
  },
};

module.exports = nextConfig;
