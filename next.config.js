const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['chart.googleapis.com','resenha.app', 'media.resenha.app', 'api.pagar.me', 'api.resenha.app'],
    },
};


  
module.exports = withPWA(nextConfig);