"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export type AppTo = "/" | "/projects" | "/resume" | "/analytics" | "/support" | "/blogs" | "/uses";

/**
 * Every internal link in the site routes through here.
 *
 * The TanStack version needed an exhaustive `if` chain because `<Link to>`
 * was typed against the generated route union. Next's `href` takes a plain
 * string, so a single `<Link>` covers the same inputs — including the `/`
 * fallback — and the call sites in `chrome.tsx`/`hero.tsx`/`sections.tsx`
 * are unchanged.
 */
export function AppLink({
  to,
  className,
  children,
  ariaLabel,
}: {
  to: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  return (
    <Link href={to} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
