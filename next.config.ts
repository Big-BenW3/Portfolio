import type { NextConfig } from "next";

// The site is one hand-built HTML file in /public. Next serves it at "/" so the
// existing Vercel project (Next.js preset) keeps deploying with no settings change.
const nextConfig: NextConfig = {
  async rewrites() {
    return { beforeFiles: [{ source: "/", destination: "/index.html" }], afterFiles: [], fallback: [] };
  },
};
export default nextConfig;
