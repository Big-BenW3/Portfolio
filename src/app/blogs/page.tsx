import type { Metadata } from "next";
import Link from "next/link";
import { Banner } from "@/components/banners";
import { PageLinks } from "@/components/chrome";
import { SectionTitle } from "@/components/ui";
import { posts } from "@/data/content";

// REAL: tab title. Use your name from profile.name.
export const metadata: Metadata = { title: "Notes | Jordan Hale" };

/** `/blogs` — ported from `src/routes/blogs/index.tsx`. */
export default function BlogsPage() {
  return (
    <main className="blogs-layout page-intro">
      <SectionTitle>Notes</SectionTitle>
      <p className="page-kicker">Short write-ups. Two live here, one points outside.</p>
      <div className="blog-posts-grid">
        {posts.map((post) => {
          const body = (
            <>
              <div className="blog-post-image">
                <Banner slug={post.slug === "how-to-plan-a-project" ? "plan" : "essay"} />
              </div>
              <div className="blog-post-content">
                <div className="blog-post-meta">
                  <span className="blog-date">
                    {post.date} · {post.read}
                  </span>
                  {post.external ? <span className="external-pill">External</span> : null}
                </div>
                <h2 className="blog-post-title">{post.title}</h2>
                <p className="blog-post-excerpt">{post.excerpt}</p>
                <div className="blog-post-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="blog-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </>
          );
          if (post.external) {
            return (
              <a
                key={post.slug}
                className="blog-post-card"
                href={post.external}
                target="_blank"
                rel="noreferrer"
              >
                {body}
              </a>
            );
          }
          return (
            <Link key={post.slug} href={`/blogs/${post.slug}`} className="blog-post-card">
              {body}
            </Link>
          );
        })}
      </div>
      <PageLinks forward="/projects" forwardLabel="View Projects" />
    </main>
  );
}
