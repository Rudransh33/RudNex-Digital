/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  
    images: {
      domains: [
        'rudnexdigital.com',
        'localhost',
        'your-s3-bucket.amazonaws.com'
      ],
    },
  
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5000/:path*', // Flask backend
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  