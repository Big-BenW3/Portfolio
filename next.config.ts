import type { NextConfig } from "next";

/**
 * Unlike the old Vite/TanStack config there is no `nitro()`/`serverDir` here:
 * Next has a native Vercel target, so the build needs no adapter.
 *
 * The platform chrome that used to be a Vite plugin + Nitro middleware
 * (`grokPwaPlugin`, `server/middleware/grok-pwa.ts`) now lives in
 * `src/middleware.ts`; see that file for what it reproduces.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
