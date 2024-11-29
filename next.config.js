/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Ensures React strict mode is enabled
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Match all secure image URLs
        hostname: '**',    // Match all hostnames
      },
    ],
  },
  i18n: {
    locales: ['en', 'hi', 'ur'], // Supported locales
    defaultLocale: 'en',         // Default language
  },
};

module.exports = nextConfig;
