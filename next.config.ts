import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'rylqus.ae',
      },
      {
        protocol: 'http',
        hostname: '13.50.85.23',
      },
    ],
    qualities: [100, 75, 90],
  },
};

export default withNextIntl(nextConfig);
