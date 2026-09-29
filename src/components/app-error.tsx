"use client";

function AlertTriangleIcon() {
  // Inline triangle-alert, matching the lucide mark the TanStack version used.
  // This replaced `lucide-react` for the whole project: that package's only use
  // was this one icon, and it was the dependency whose tarball failed to
  // download — one SVG is cheaper than a multi-megabyte dependency.
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

const FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

/**
 * Ported from `src/lib/error-component.tsx` (TanStack's `defaultErrorComponent`).
 *
 * Next's error boundary also hands us a `reset()`, but the original design has
 * no retry control — its copy says to reload — so none is added here.
 */
export function AppError({ error }: { error: unknown }) {
  return (
    <main
      className={
        "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center " +
        "bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50"
      }
    >
      <span className="text-red-500" aria-hidden="true">
        <AlertTriangleIcon />
      </span>
      <h1 className="text-lg font-semibold">Something went wrong</h1>
      <p className="max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400">
        {errorMessage(error)}
      </p>
    </main>
  );
}
