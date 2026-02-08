/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@bodyfat/shared'],
  serverExternalPackages: ['jsdom'],
}

module.exports = nextConfig
