/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  trailingSlash: false, // Changed to false for better SEO
  // Ensure all dynamic routes are statically generated
  generateBuildId: async () => {
    return 'static-build-id'
  },
};

module.exports = nextConfig;
