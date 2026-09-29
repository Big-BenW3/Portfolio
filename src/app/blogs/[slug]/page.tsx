import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Article } from "@/components/article";
import { PageLinks } from "@/components/chrome";
import { posts } from "@/data/content";

/**
 * `/blogs/[slug]` — ported from `src/routes/blogs/$slug.tsx`.
 *
 * Two Next-16 details: `params` is a Promise (awaited in both functions), and
 * the route's `loader` becomes a plain lookup — the original was a synchronous
 * in-memory `posts.find`, so there is no data source to fetch from.
 */
type PageProps = { params: Promise<{ slug: string }> };

function findPost(slug: string) {
  return posts.find((item) => item.slug === slug && item.blocks);
}

/** Pre-render the two on-site posts; unknown slugs fall through to notFound(). */
export function generateStaticParams() {
  return posts.filter((post) => post.blocks).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  // REAL: the "| Jordan Hale" suffix. Use your name from profile.name.
  return { title: post ? `${post.title} | Jordan Hale` : "Note" };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();
  const current = post;

  return (
    <main className="blogs-layout page-intro">
      <p className="article-meta">
        <Link href="/blogs">Notes</Link>
        <span>{current.date}</span>
        <span>{current.read}</span>
      </p>
      <h1 className="project-name" style={{ fontSize: "1.6rem", marginBottom: 8 }}>
        {current.title}
      </h1>
      {current.blocks ? <Article blocks={current.blocks} /> : null}
      <PageLinks
        back="/blogs"
        backLabel="All notes"
        forward="/projects"
        forwardLabel="Projects"
      />
    </main>
  );
}
