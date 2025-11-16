/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_API_URL: process.env.NEXT_PUBLIC_API_URL,
    REACT_APP_API_GRAPHQL_URL: process.env.NEXT_PUBLIC_API_GRAPHQL_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4003",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
