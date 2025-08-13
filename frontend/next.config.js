/** @type {import('next').NextConfig} */
const API_HOST = process.env.NEXT_PUBLIC_API_URL || 'https://rudnex.com';
const nextConfig = {
	reactStrictMode: true,
  
	images: {
	  domains: [
		'rudnex.com',
		'www.rudnex.com',
		'localhost',
		'your-s3-bucket.amazonaws.com'
	  ],
	},
  
	async rewrites() {
	  return [
		{
		  source: '/api/:path*',
		  destination: `${API_HOST}/api/:path*`, // backend API
		},
	  ];
	},
  };
  
  module.exports = nextConfig;
  