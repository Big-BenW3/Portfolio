import Link from "next/link";
import { AnalyticsPanel } from "@/components/analytics-panel";
import { Calendar } from "@/components/calendar";
import { Hero } from "@/components/hero";
import {
  Contact,
  ExperienceSection,
  ProjectsPreview,
  Skills,
} from "@/components/sections";

/**
 * `/` — ported from `src/routes/index.tsx`.
 *
 * No route-level `metadata`: the root layout's title is already
 * "Big Ben | Blockchain Developer", which is exactly what this page used.
 */
export default function Home() {
  return (
    <main className="home-container">
      <Hero />
      <Skills />
      <ExperienceSection />
      <div className="experience-section calendar-wrapper">
        <Calendar />
      </div>
      <ProjectsPreview />
      {/* <UsesTeaser /> */}
      <section className="project-section">
        <Link href="/analytics" className="card-title">
          <i className="corner top left" />
          <i className="corner top right" />
          <i className="corner bottom left" />
          <i className="corner bottom right" />
          /analytics
        </Link>
        <AnalyticsPanel />
      </section>
      <Contact />
    </main>
  );
}
