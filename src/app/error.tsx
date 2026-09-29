"use client";

import { AppError } from "@/components/app-error";

/**
 * Replaces TanStack's `defaultErrorComponent` (wired in `src/router.tsx`).
 * Must be a client component — Next requires it.
 */
export default function ErrorBoundary({ error }: { error: Error & { digest?: string } }) {
  return <AppError error={error} />;
}
