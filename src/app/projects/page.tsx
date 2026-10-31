import Link from "next/link";
import type { Metadata } from "next";
import { PageLinks } from "@/components/chrome";
import { ProjectCard } from "@/components/sections";
import { SectionTitle } from "@/components/ui";
import { projects } from "@/data/content";

// REAL: tab title. Use your name from profile.name.
export const metadata: Metadata = { title: "Projects | Big Ben" };

/** `/projects` — ported from `src/routes/projects.tsx`. */
export default function ProjectsPage() {
  return (
    <main className="project-section page-intro">
      <SectionTitle>All Projects</SectionTitle>
      <p className="page-kicker">
        Everything in the sample folder: featured work and the rest of the shelf.
      </p>
      {projects.map((project) => (
        <Link key={project.slug} href={`/projects/${project.slug}`} passHref legacyBehavior>
          <ProjectCard key={project.slug} project={project} />
        </Link>
      ))}
      <PageLinks forward="/blogs" forwardLabel="Read notes" />
    </main>
  );
}
