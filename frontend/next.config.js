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
  
  async headers() {
    return [
      {
        // Prevent aggressive caching for app assets like the Checklio favicon
        source: '/checkliotasks/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
        ],
      },
    ]
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
  