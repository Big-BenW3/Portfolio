"use client";

import { PageLinks } from "@/components/chrome";
import { IconDownload } from "@/components/icons";
import { SectionTitle } from "@/components/ui";
import { experience, profile, resume } from "@/data/content";

/**
 * Client half of `/resume`, split out of `src/routes/resume.tsx` so the page
 * itself can stay a server component and export `metadata` — a `"use client"`
 * file cannot.
 */
function download() {
  const lines = [
    profile.name,
    profile.role,
    profile.email,
    profile.location,
    "",
    resume.summary,
    "",
    "Experience",
    ...experience.flatMap((item) => [
      `${item.role} - ${item.company} (${item.dates})`,
      ...item.description.map((line) => `- ${line}`),
      "",
    ]),
    `Education`,
    `${resume.education.program}, ${resume.education.school} (${resume.education.dates})`,
    "",
    `Skills: ${resume.skills.join(", ")}`,
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  // REAL: file name people download. For a PDF instead of this generated .txt, see the comment on `resume` in src/data/content.ts.
  anchor.download = "jordan-hale-resume.txt";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function ResumeView() {
  return (
    <main className="resume-layout page-intro">
      <SectionTitle>Resume</SectionTitle>
      <p className="page-kicker">
        A one-page sample. Download is a plain-text stand-in until you drop in a PDF.
      </p>
      <div className="resume-actions">
        <button type="button" className="resume-download-btn" onClick={download}>
          <span className="dl">
            <IconDownload size={16} />
          </span>
          Download .txt
        </button>
      </div>
      <article className="resume-sheet">
        <h1>{profile.name}</h1>
        <p className="role">{profile.role}</p>
        <div className="meta">
          <span>{profile.email}</span>
          <span>{profile.location}</span>
          <span>{profile.handle}</span>
        </div>
        <h2>Summary</h2>
        <p>{resume.summary}</p>
        <h2>Experience</h2>
        {experience.map((item) => (
          <div key={item.company} style={{ marginBottom: 10 }}>
            <div className="resume-row">
              <span>
                {item.role}, {item.company}
              </span>
              <span>{item.dates}</span>
            </div>
            <ul>
              {item.description.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
        <h2>Education</h2>
        <div className="resume-row">
          <span>
            {resume.education.program}, {resume.education.school}
          </span>
          <span>{resume.education.dates}</span>
        </div>
        <h2>Skills</h2>
        <p>{resume.skills.join(" · ")}</p>
      </article>
      <PageLinks forward="/projects" forwardLabel="Projects" />
    </main>
  );
}
