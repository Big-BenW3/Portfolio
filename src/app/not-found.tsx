import type { Metadata } from "next";
import { NotFoundView } from "@/components/not-found-view";

// REAL: tab title. Use your name from profile.name.
export const metadata: Metadata = { title: "Page not found | Big Ben" };

/**
 * The 404 for unmatched URLs, replacing `src/routes/$.tsx`.
 *
 * Split into a server file (so it can export `metadata`, which client
 * components cannot) plus a client view for the "Go back" history control.
 */
export default function NotFound() {
  return <NotFoundView />;
}
