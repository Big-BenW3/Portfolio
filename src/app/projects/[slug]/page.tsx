import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/data/content";
import { SectionTitle } from "@/components/ui";
import { AppLink } from "@/components/app-link";
import { IconExternal, IconGithub } from "@/components/icons";
import { Banner } from "@/components/banners";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: `${project.name} | Big Ben`,
    description: project.desc,
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return (
      <main className="project-section page-intro">
        <SectionTitle>Project Not Found</SectionTitle>
        <p className="page-kicker">The project you're looking for doesn't exist.</p>
        <AppLink to="/projects" className="view-all-btn">
          <span>Back to Projects</span>
        </AppLink>
      </main>
    );
  }

  return (
    <main className="project-section page-intro">
      <div className="project-detail-banner">
        <Banner slug={project.slug} />
      </div>

      <article className="project-detail-card">
        <div className="project-detail-header">
          <h1 className="project-detail-name">{project.name}</h1>
          <div className="project-detail-meta">
            {project.isPrivate && <span className="project-detail-tag">Private</span>}
            {project.isUnderDevelopment && <span className="project-detail-tag">In Progress</span>}
            {project.sponsor && <span className="project-detail-tag">Sponsor</span>}
          </div>
        </div>

        <p className="project-detail-desc">{project.desc}</p>

        <div className="project-detail-tech">
          <span className="project-detail-tech-label">Technologies</span>
          <div className="project-detail-tech-list">
            {project.tech.map((tag) => (
              <span key={tag} className="project-detail-tech-item">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="project-detail-links">
          <div className="project-detail-link-group">
            <span className="project-detail-link-label">Source</span>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="project-detail-link-btn"
              >
                <IconGithub size={16} /> View on GitHub
              </a>
            )}
          </div>
          {project.live && (
            <div className="project-detail-link-group">
              <span className="project-detail-link-label">Live Demo</span>
              <a href={project.live} target="_blank" rel="noreferrer" className="project-detail-link-btn">
                <IconExternal size={16} /> Open Live Site
              </a>
            </div>
          )}
        </div>

        <div className="project-detail-back">
          <AppLink to="/projects" className="view-all-btn">
            <span>← Back to Projects</span>
          </AppLink>
        </div>
      </article>
    </main>
  );
}
