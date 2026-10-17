import type { NextConfig } from 'next'

// Static export: `npm run build` writes plain HTML/CSS/JS into `out/`, which
// nginx serves directly on the VPS. No Node process runs in production.
const nextConfig: NextConfig = {
  output: 'export',
  // `/en/` -> `out/en/index.html`, which nginx resolves without rewrites.
  trailingSlash: true,
  // The image optimiser needs a running server; a static export has none.
  images: { unoptimized: true },
  reactStrictMode: true,
  // The Next.js "N" badge in the corner during `npm run dev`. It never
  // reaches the built site, but it sat exactly where the free-demo button goes.
  devIndicators: false
}

export default nextConfig
