import { PageLinks } from "@/components/chrome";

/**
 * The `notFoundComponent` from `src/routes/blogs/$slug.tsx`, now a route-scoped
 * `not-found.tsx` — `notFound()` in the sibling `page.tsx` renders this one,
 * leaving the global `app/not-found.tsx` for unmatched URLs.
 */
export default function Missing() {
  return (
    <main className="blogs-layout page-intro">
      <p className="page-kicker">That note is not in the sample set.</p>
      <PageLinks back="/blogs" backLabel="All notes" />
    </main>
  );
}
