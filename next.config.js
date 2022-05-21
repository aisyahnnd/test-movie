/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  },
  serverRuntimeConfig: {
    // Will be available on both server and client
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  },
}

module.exports = nextConfig