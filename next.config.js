/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
  }
}

module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
  }
}
