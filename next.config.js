const path = require("path");
const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  // Make sure the locale JSON files are bundled with serverless functions on Vercel
  outputFileTracingIncludes: {
    "/**/*": ["./public/locales/**/*"],
  },
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
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
