/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8090',
        pathname: '/app-manager/v1/images/view/**',
      },
    ],
  },
};

module.exports = nextConfig;
