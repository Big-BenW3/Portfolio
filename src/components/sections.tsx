"use client";


import Link from "next/link";
import { AppLink } from "@/components/app-link";
import { useState } from "react";
import {
  contactLinks,
  experience,
  frameworks,
  languages,
  projects,
  tools,
  type Experience,
  type Project,
  type Skill,
} from "@/data/content";
import { Banner } from "@/components/banners";
import { IconArrow, IconChevron, IconExternal, IconGithub, SocialIcon } from "@/components/icons";
import { SectionTitle } from "@/components/ui";

function SkillRow({ items, reverse, label }: { items: Skill[]; reverse?: boolean; label: string }) {
  const copies = Math.max(1, Math.ceil(12 / items.length));
  const set = Array.from({ length: copies }, () => items).flat();
  const loop = [...set, ...set, ...set];
  return (
    <div className="skill-row">
      <div className="skill-row-label">{label}</div>
      <div className="marquee-container">
        <div className={reverse ? "marquee reverse" : "marquee"}>
          {loop.map((item, index) => (
            <div className="skill-pill" key={`${label}-${item.name}-${index}`}>
              <span className="skill-icon">
                <img src={item.logo} alt="" width={18} height={18} />
              </span>
              <span className="skill-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section className="skill-section">
      <SectionTitle>My Skills</SectionTitle>
      <SkillRow label="Languages" items={languages} />
      <SkillRow label="Frameworks" items={frameworks} reverse />
      <SkillRow label="Tools" items={tools} />
    </section>
  );
}

const statusLabel = { present: "Active", past: "Done", future: "Upcoming" };

function ExperienceCard({
  item,
  open,
  onToggle,
}: {
  item: Experience;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="exp-timeline-item">
      <i className={`exp-timeline-dot ${item.status === "present" ? "" : item.status}`} />
      <article className="exp-card">
        <div className="exp-header">
          <div className="exp-header-left">
            <div className="exp-logo">{item.mark}</div>
            <div>
              <div className="exp-company-name">
                {item.company}
                {item.href ? (
                  <a className="exp-company-link" href={item.href} target="_blank" rel="noreferrer" aria-label={`${item.company} site`}>
                    <IconExternal size={12} />
                  </a>
                ) : null}
                <span className={`exp-status-badge ${item.status === "present" ? "" : item.status}`}>
                  <i className={`exp-status-dot ${item.status === "present" ? "" : item.status}`} />
                  {statusLabel[item.status]}
                </span>
              </div>
              <div className="exp-role-text">{item.role}</div>
            </div>
          </div>
          <div className="exp-header-right">
            <div className="exp-meta">
              <span>{item.dates}</span>
              <span>{item.location}</span>
            </div>
            <button type="button" className="exp-expand-btn" aria-expanded={open} aria-label="Toggle details" onClick={onToggle}>
              <span className={open ? "exp-expand-icon open" : "exp-expand-icon"}>
                <IconChevron size={16} />
              </span>
            </button>
          </div>
        </div>
        <div className={open ? "exp-details expanded" : "exp-details"}>
          <ul className="exp-bullets">
            {item.description.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}

export function ExperienceSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="experience-section">
      <SectionTitle>Work Experience</SectionTitle>
      <div className="exp-timeline-container">
        <div className="exp-timeline-line" />
        {experience.map((item, index) => (
          <ExperienceCard
            key={item.company}
            item={item}
            open={open === index}
            onToggle={() => setOpen(open === index ? -1 : index)}
          />
        ))}
      </div>
    </section>
  );
}

export function ProjectCard({
  project,
}: {
  project: Project;
}) {
  return (
    <article className="project-card">
      <div className="banner">
        <Banner slug={project.slug} />
        {project.stats ? <div className="stats-badge">{project.stats}</div> : null}
        {project.sponsor ? <div className="sponsor-badge">Sponsor</div> : null}
        {project.isUnderDevelopment ? (
          <div className={project.sponsor ? "flag-badge warn lower" : "flag-badge warn"}>In progress</div>
        ) : null}
        {project.isPrivate ? <div className="flag-badge lock">Private</div> : null}
      </div>
      <div className="project-details">
        <div className="project-header-row">
          <h3 className="project-name">
            {project.name}
            {project.demoWarning ? (
              <button type="button" className="warn-btn" aria-label="Demo note">
                !
                <span className="warn-pop">
                  <strong>Demo may be asleep</strong>
                  The sample link is a placeholder.
                </span>
              </button>
            ) : null}
          </h3>
          <div className="project-link-icons">
            <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.name} source`}>
              <IconGithub size={14} />
            </a>
            {project.live ? (
              <a href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.name} live`}>
                <IconExternal size={14} />
              </a>
            ) : null}
          </div>
        </div>
        <p className="project-desc">{project.desc}</p>
        <div className="project-tech">
          {project.tech.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function ProjectsPreview() {
  const featured = projects.filter((project) => project.featured);
  return (
    <section className="project-section">
      <SectionTitle>My Projects</SectionTitle>
      {featured.map((project) => (
        <Link key={project.slug} href={`/projects/${project.slug}`} passHref legacyBehavior>
          <ProjectCard key={project.slug} project={project} />
        </Link>
      ))}
      <div className="view-all-projects">
        <span />
        <AppLink to="/projects" className="view-all-btn">
          <span>More Projects</span>
          <span className="arrow-icon">
            <IconArrow size={16} />
          </span>
        </AppLink>
      </div>
    </section>
  );
}

// export function UsesTeaser() {
//   return (
//     <section className="project-section">
//       <SectionTitle>/uses</SectionTitle>
//       <div className="uses-section-content">
//         <span>Curious about the setup? Tools, gear, and software behind the daily work.</span>
//         <AppLink to="/uses" className="uses-section-link">
//           <span>See my setup</span>
//           <span className="arrow-icon">
//             <IconArrow size={16} />
//           </span>
//         </AppLink>
//       </div>
//     </section>
//   );
// }

export function Contact() {
  return (
    <section className="contact-me-section">
      <div className="contact-me-card">
        <h3 className="contact-me-title">Let's Connect</h3>
        <p className="contact-me-description">Reach out through any of these platforms.</p>
        <div className="contact-links">
          {contactLinks.map((item) =>
            item.internal ? (
              <AppLink key={item.name} to={item.href} className="contact-link-btn">
                <span className="contact-link-icon" style={{ color: item.color }}>
                  <SocialIcon name={item.name} />
                </span>
                {item.name}
              </AppLink>
            ) : (
              <a key={item.name} href={item.href} className="contact-link-btn" target={item.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
                <span className="contact-link-icon" style={{ color: item.color }}>
                  <SocialIcon name={item.name} />
                </span>
                {item.name}
              </a>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
