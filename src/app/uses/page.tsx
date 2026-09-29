import type { Metadata } from "next";
import { PageLinks } from "@/components/chrome";
import { IconExternal } from "@/components/icons";
import { SectionTitle } from "@/components/ui";
import { uses } from "@/data/content";

// REAL: tab title. Use your name from profile.name.
export const metadata: Metadata = { title: "Uses | Jordan Hale" };

/** `/uses` — ported from `src/routes/uses.tsx`. */
export default function UsesPage() {
  return (
    <main className="uses-layout page-intro">
      <SectionTitle>Uses</SectionTitle>
      <p className="page-kicker">Tools, software, and gear in the sample setup.</p>
      {uses.map((group) => (
        <section key={group.category} className="uses-category">
          <h2 className="uses-category-title">{group.category}</h2>
          <div className="uses-list">
            {group.items.map((item) => (
              <div key={item.label} className="uses-item">
                <span className="uses-item-label">{item.label}</span>
                <span className="uses-item-sep">—</span>
                <span className="uses-item-name">
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.name}
                    </a>
                  ) : (
                    item.name
                  )}
                </span>
                {item.href ? (
                  <span className="uses-item-link-icon">
                    <IconExternal size={14} />
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ))}
      <PageLinks forward="/projects" forwardLabel="View Projects" />
    </main>
  );
}
