/** @type {import('next').NextConfig} */

const API_URL = "https://test-api.v-max.shop";

const nextConfig = {
  trailingSlash: true,
  async headers() {
    return [
      {
        // Routes this applies to
        source: "/api/:path*",
        // destination: `${API_URL}/:path*`,

        // Headers
        headers: [
          // Allow for specific domains to have access or * for all
          {
            key: "Access-Control-Allow-Origin",
            // value: "*",
            // DOES NOT WORK
            value: process.env.ALLOWED_ORIGIN,
          },
          // Allows for specific methods accepted
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          // Allows for specific headers accepted (These are a few standard ones)
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*/",
        destination: "http://localhost:3000/:path*/",
      },
    ];
  },
};

export default nextConfig;
