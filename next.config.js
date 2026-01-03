/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.formula1.com',
        pathname: '/content/dam/**',
      },
    ],
  },
};

module.exports = nextConfig;

