import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(process.cwd()),
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
  },
};

export default nextConfig;
