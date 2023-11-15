/** @type {import('next').NextConfig} */
const nextConfig = {}

// next.config.js

module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/signIn',
          permanent: true,
        },
      ];
    },
  };
  
