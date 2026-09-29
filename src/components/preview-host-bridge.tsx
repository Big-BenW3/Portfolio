/**
 * Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
 * (and later receive registered routes). Noops when the app is not embedded.
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { posts } from "@/data/content";

/**
 * Route table advertised to the preview host for autosuggest.
 *
 * The TanStack version walked the live `router.routeTree`. Next has no runtime
 * route tree to introspect, so the same paths are declared here — blog entries
 * are derived from `content.ts` rather than duplicated so they cannot drift.
 */
const BLOG_PATHS = posts.filter((post) => post.blocks).map((post) => `/blogs/${post.slug}`);

export const ROUTE_PATHS = [
  "/",
  "/projects",
  "/blogs",
  ...BLOG_PATHS,
  "/resume",
  "/uses",
  "/support",
  "/analytics",
];

export function PreviewHostBridge() {
  const router = useRouter();

  useEffect(() => {
    // Install once on mount. Next's router object is not a stable identity
    // across renders, so putting it in the deps would tear down and rebuild
    // the bridge (and re-announce) on unrelated re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
