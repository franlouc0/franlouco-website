/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/articles/how-we-raised-715k-ido",
        destination: "/articles/treat-the-raise-like-a-product-launch",
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
