import { LINKS, mailto } from "@/data/links";

export type Social = {
  name: string;
  href: string;
  color: string;
  internal?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  desc: string;
  tech: string[];
  github: string;
  live?: string;
  demoWarning?: boolean;
  isUnderDevelopment?: boolean;
  isPrivate?: boolean;
  sponsor?: boolean;
  stats?: string;
  featured: boolean;
};

export type Experience = {
  company: string;
  role: string;
  dates: string;
  status: "present" | "past" | "future";
  location: string;
  mark: string;
  description: string[];
  href?: string;
};

export type UsesItem = { label: string; name: string; href?: string };
export type UsesCategory = { category: string; items: UsesItem[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
  tags: string[];
  external?: string;
  blocks?: Block[];
};

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "tip" | "warn" | "dont"; title: string; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "code"; filename: string; language: string; code: string }
  | { type: "term"; title: string; commands: string[] };

// Replace the sample strings in this file with your own. Every `https://example.com`
// is a stand-in. How to get each kind of link:
// - GitHub profile: github.com → your avatar → copy the address bar (`https://github.com/<you>`).
// - A repo: open that repository and copy the address bar.
// - A live site: the URL that actually loads the app. On Vercel that is Project → Settings → Domains
//   (the `*.vercel.app` name or your custom domain).
// - X: x.com → your profile → copy the address bar (`https://x.com/<handle>`).
// - LinkedIn: linkedin.com/in/… from your profile's address bar.
// - Instagram: instagram.com/<handle> from your profile's address bar.
// - Email: your real inbox. The `mailto:` value must be the same address.
// - Company site: the company's own homepage, not a job-board listing.
// - Discord invite: Server name → Invite People → copy the invite link.
// - Share-card name (not a URL): `src/lib/og/site.json` → `title`.
// Page titles that say "Big Ben" live in each file under `src/app/`.
export const profile = {
  name: "Big Ben", // Your name, as you want it on the page.
  handle: LINKS.handleText, // The @ people click. From src/data/links.ts.
  handleHref: LINKS.handleUrl, // Profile URL for that handle.
  role: "Blockchain and Mobile Developer",
  status: LINKS.statusText, // One line about what you are doing now.
  statusHref: LINKS.statusUrl, // Link for that status. The product URL, or your repo if it is not deployed.
  location: "Owerri, Nigeria",
  email: LINKS.email, // From src/data/links.ts. The contact row's mailto reads the same value.
  xName: LINKS.xName, // Display name on your X profile.
  xHandle: LINKS.xHandle, // @handle shown on x.com/<handle>
  xHref: LINKS.x, // https://x.com/<handle> from the address bar on your profile.
  clubName: "Sample Club", // Discord server name, or any community you want in that card.
  clubMeta: "For builders",
  clubCta: "Join",
  clubHref: LINKS.discord, // Discord: Server → Invite People → copy link. Or any community URL.
  clubOnline: "128 online", // Optional. Type a real count, or a short label like "open".
  quote: "Make it work, then make it feel inevitable.",
  quoteBy: "- a note to future me",
};

// Bio under the portrait. **double asterisks** render as bold. Rewrite all three lines.
export const bio = [
  "Hi, I am a **Blockchain Developer**.",
  "Builder of **Sample**, a small toolkit that helps people **ship** side projects.",
  "Always **sketching**, **learning**, and turning rough ideas into products people actually open.",
];

// Icons under the bio. Resume and Writing stay as internal paths (/resume, /blogs).
// The external hrefs come from src/data/links.ts.
export const heroSocials: Social[] = [
  { name: "GitHub", href: LINKS.github, color: "#ffffff" },
  { name: "Resume", href: "/resume", color: "#ff6b6b", internal: true },
  { name: "Writing", href: "/blogs", color: "#b3b3b3", internal: true },
  // { name: "Instagram", href: LINKS.instagram, color: "#e4405f" },
  // { name: "LinkedIn", href: LINKS.linkedin, color: "#0a66c2" },
];

// Same accounts as heroSocials, in the contact row. Email uses the same address
// as profile.email because both read LINKS.email.
export const contactLinks: Social[] = [
  { name: "X", href: LINKS.x, color: "#ffffff" },
  // { name: "LinkedIn", href: LINKS.linkedin, color: "#0a66c2" },
  { name: "GitHub", href: LINKS.github, color: "#ffffff" },
  // { name: "Instagram", href: LINKS.instagram, color: "#e4405f" },
  // { name: "Writing", href: "/blogs", color: "#b3b3b3", internal: true },
  { name: "Email", href: mailto(), color: "#ea4335" },
  { name: "Resume", href: "/resume", color: "#ff6b6b", internal: true },
];

export type Skill = { name: string; color: string; logo: string };

// Skill rows. Change a name only if you do not use that tool.
// Logo files and the URL for each mark are listed in edit.md. To add one: drop an SVG in
// public/logos/ and set `logo` to "/logos/your-file.svg".
export const languages: Skill[] = [
  { name: "TypeScript", color: "#3178c6", logo: "/logos/typescript.svg" },
  { name: "JavaScript", color: "#f7df1e", logo: "/logos/javascript.svg" },
  { name: "Python", color: "#3776ab", logo: "/logos/python.svg" },
  { name: "Rust", color: "#CE422B", logo: "https://cdn.simpleicons.org/rust/CE422B" },
  { name: "Solidity", color: "#363636", logo: "https://cdn.simpleicons.org/solidity/363636" },
  { name: "Dart", color: "#0175C2", logo: "https://cdn.simpleicons.org/dart/0175C2" },
];

export const frameworks: Skill[] = [
  { name: "React", color: "#61dafb", logo: "/logos/react.svg" },
  { name: "Node.js", color: "#5fa04e", logo: "/logos/nodejs.svg" },
  { name: "Next.js", color: "#ffffff", logo: "/logos/nextjs.svg" },
  { name: "Tailwind", color: "#06b6d4", logo: "/logos/tailwind.svg" },
  { name: "Flutter", color: "#02569B", logo: "https://cdn.simpleicons.org/flutter/02569B" },
  { name: "Express", color: "#ffffff", logo: "https://cdn.simpleicons.org/express/FFFFFF" },
  { name: "FastAPI", color: "#009688", logo: "https://cdn.simpleicons.org/fastapi/009688" },
  { name: "Anchor", color: "#9945FF", logo: "https://cdn.simpleicons.org/solana/9945FF" },
  // React Native
  // Honojs 
  // Bun
];

export const tools: Skill[] = [
  { name: "VS Code", color: "#007acc", logo: "/logos/vscode.svg" },
  { name: "Figma", color: "#f24e1e", logo: "/logos/figma.svg" },
  { name: "Notion", color: "#ffffff", logo: "/logos/notion.svg" },
  { name: "Postman", color: "#ff6c37", logo: "/logos/postman.svg" },
  { name: "Vercel", color: "#ffffff", logo: "/logos/vercel.svg" },
  { name: "GitHub", color: "#ffffff", logo: "/logos/github.svg" },
  { name: "Terminal", color: "#4eaa25", logo: "/logos/terminal.svg" },
  { name: "Obsidian", color: "#7c3aed", logo: "/logos/obsidian.svg" },
  { name: "Android Studio", color: "#3DDC84", logo: "https://cdn.simpleicons.org/androidstudio/3DDC84" },
  { name: "PostgreSQL", color: "#4169e1", logo: "/logos/postgresql.svg" },
  { name: "MongoDB", color: "#47a248", logo: "/logos/mongodb.svg" },
  { name: "Redis", color: "#ff4438", logo: "/logos/redis.svg" },
  { name: "Git", color: "#f05032", logo: "/logos/git.svg" },
];

// Jobs. `href` is the company homepage (search the company, open their site, copy the address bar).
// Delete `href` if you do not want the external icon. `mark` is the two letters in the timeline badge.
export const experience: Experience[] = [
  {
    company: "Freelance",
    role: "Full Stack Developer",
    dates: "2025 - 2026",
    status: "present",
    location: "Remote",
    mark: "FL",
    description: [
      "Shipping small side projects end to end, from idea to deploy.",
      "Building mobile and web experiments with Flutter, React, and Node.",
      "Helping indie founders turn rough ideas into products people actually open.",
    ],
  },
  {
    company: "Academy",
    role: "Software Intern",
    dates: "2024 - 2025",
    status: "past",
    location: "Remote",
    mark: "AC",
    description: [
      "Learning full-stack development through hands-on project work.",
      "Building small tools and shipping them to real users.",
      "Iterating in public and growing from real user feedback.",
    ],
  },
];

// Projects. `github` is the repo address bar. `live` is the deployed URL (Vercel → Domains, or the host you use).
// Delete `live` if there is no demo. `stats` is the star line on the card — read it off the repo, or delete the field.
// `demoWarning` shows the "demo may be asleep" note. Leave it only when that is true.
export const projects: Project[] = [
  {
    slug: "northline",
    name: "Northline",
    desc: "A quiet kanban for teams that refuse another bloated workspace.",
    tech: ["React", "TypeScript", "Node"],
    github: "https://example.com",
    live: "https://example.com",
    stats: "2.4k stars",
    featured: true,
  },
  {
    slug: "pulsekit",
    name: "Pulsekit",
    desc: "Self-hosted product analytics with a chart that stays out of the way.",
    tech: ["Go", "ClickHouse", "React"],
    github: "https://example.com",
    isPrivate: true,
    featured: true,
  },
  {
    slug: "harbor",
    name: "Harbor",
    desc: "Link shortener that paints a preview card before you hit send.",
    tech: ["Next.js", "Redis", "Postgres"],
    github: "https://example.com",
    live: "https://example.com",
    demoWarning: true,
    featured: true,
  },
  {
    slug: "fieldnotes",
    name: "Fieldnotes",
    desc: "A writing desk for long essays, with a terminal-plain editor.",
    tech: ["MDX", "Tailwind", "Vite"],
    github: "https://example.com",
    sponsor: true,
    isUnderDevelopment: true,
    featured: true,
  },
  {
    slug: "ledgerlite",
    name: "Ledgerlite",
    desc: "Local-first personal finance. Your numbers stay on your machine.",
    tech: ["TypeScript", "SQLite", "React"],
    github: "https://example.com",
    live: "https://example.com",
    featured: false,
  },
  {
    slug: "orbit",
    name: "Orbit",
    desc: "A calm team chat with threads that collapse when the day is done.",
    tech: ["React", "WebSocket", "Go"],
    github: "https://example.com",
    isUnderDevelopment: true,
    featured: false,
  },
];

// /uses. Software links below are the vendors' real homepages; change an item if you use something else
// (open the product site, copy the address bar).
// Hardware `href`s are still example.com. Use the manufacturer's product page, not a random shop listing.
export const uses: UsesCategory[] = [
  {
    category: "Software",
    items: [
      { label: "Editor", name: "VS Code", href: "https://code.visualstudio.com/" },
      { label: "Browser", name: "Arc", href: "https://arc.net/" },
      { label: "Notes", name: "Notion", href: "https://www.notion.so/" },
      { label: "Design", name: "Figma", href: "https://www.figma.com/" },
      { label: "API", name: "Postman", href: "https://www.postman.com/" },
      { label: "Terminal", name: "Ghostty", href: "https://ghostty.org/" },
      { label: "Music", name: "YouTube Music", href: "https://music.youtube.com/" },
    ],
  },
  {
    category: "Hardware",
    items: [
      { label: "Laptop", name: "14\" placeholder ultrabook", href: "https://example.com" },
      { label: "Monitor", name: "27\" QHD IPS", href: "https://example.com" },
      { label: "Keyboard", name: "65% mechanical, sample switches", href: "https://example.com" },
      { label: "Mouse", name: "Lightweight wireless", href: "https://example.com" },
    ],
  },
];

const planBlocks: Block[] = [
  {
    type: "p",
    text: "A blank repo is not a plan. Before a single component, write down who it is for, what done looks like, and what you will refuse to build.",
  },
  { type: "h", text: "Start with the constraint" },
  {
    type: "p",
    text: "Pick one user, one job, and one afternoon. If the idea needs a platform, it is not ready. **Name the smallest version** that would still be useful on a Tuesday.",
  },
  {
    type: "tip",
    title: "Tip",
    text: "Write the README first. If you cannot describe the product in eight lines, you are still collecting opinions, not building.",
  },
  { type: "h", text: "Draw the path, not the system" },
  {
    type: "ol",
    items: [
      "What does the person open?",
      "What do they type or tap?",
      "What should be true when they leave?",
      "What are you explicitly not doing this week?",
    ],
  },
  {
    type: "p",
    text: "Only then sketch data. A note, a list, a status. Resist a microservice diagram until something has been clicked by someone who is not you.",
  },
  {
    type: "warn",
    title: "Warning",
    text: "Tools feel like progress. A new library is not a plan. Install something only when the current stack blocks the next click.",
  },
  { type: "h", text: "A shape you can actually ship" },
  {
    type: "code",
    filename: "plan.md",
    language: "Markdown",
    code: `## Northline v0
- One board
- Three columns
- No accounts
- Local save

Done when a friend can move a card
without a tour.`,
  },
  {
    type: "term",
    title: "First hour",
    commands: ["mkdir sample-app && cd sample-app", "git init", "echo '# Sample' > README.md"],
  },
  {
    type: "dont",
    title: "Don't do this",
    text: "Don't design the logo, the billing page, and the admin role matrix before the core loop works once.",
  },
  {
    type: "p",
    text: "Ship the loop. Then write down what surprised you. That note is the next plan.",
  },
];

const notesBlocks: Block[] = [
  {
    type: "p",
    text: "A portfolio is a product. The reader has ninety seconds and a thumb. Treat every section like it has to earn the next scroll.",
  },
  { type: "h", text: "What to show" },
  {
    type: "ul",
    items: [
      "A name, a handle, and one sentence of what you are building now.",
      "Two or three projects with a picture, not a paragraph of adjectives.",
      "Proof of work: a date range, a result, a link.",
    ],
  },
  {
    type: "tip",
    title: "Tip",
    text: "Replace every 'passionate' with a noun. Projects, dates, and links do more than adjectives.",
  },
  {
    type: "code",
    filename: "hero.tsx",
    language: "TSX",
    code: `status: "Building sample.app"
location: "City, Country"`,
  },
  {
    type: "p",
    text: "Then swap the sample. The layout can stay. The story should be yours.",
  },
];

// Posts. A post with `blocks` renders on this site at /blogs/<slug>.
// A post with `external` leaves the site. Get that URL from the address bar of the published essay.
// Delete `external` and add `blocks` if the essay should live here instead.
export const posts: BlogPost[] = [
  {
    slug: "how-to-plan-a-project",
    title: "How to plan a project from a blank page",
    excerpt: "A short sequence for turning a vague idea into something you can finish this week.",
    date: "Oct 23, 2025",
    read: "8 min read",
    tags: ["Planning", "Practice", "Shipping"],
    blocks: planBlocks,
  },
  {
    slug: "portfolio-notes",
    title: "Notes before you publish a portfolio",
    excerpt: "What to keep, what to cut, and why the first screen should answer one question.",
    date: "Jan 18, 2026",
    read: "4 min read",
    tags: ["Portfolio", "Writing", "Editing"],
    blocks: notesBlocks,
  },
  {
    slug: "small-tools",
    title: "Why small tools still matter",
    excerpt: "A short external note on shipping utilities instead of platforms.",
    date: "Jan 20, 2026",
    read: "3 min read",
    tags: ["Tools", "Essay"],
    external: "https://example.com",
  },
];

// Resume copy. The Download button builds a .txt from this object plus `experience` (see src/routes/resume.tsx).
// For a real PDF: export one from your editor, save it as public/resume.pdf, and link that file instead of the .txt.
export const resume = {
  summary:
    "Full-stack developer who likes small products, clear interfaces, and code that another person can run on a Monday morning.",
  education: {
    school: "Federal University of Technology Owerri",
    program: "B.S. Computer Science",
    dates: "2024 - 2029 (in view)",
  },
  skills: ["TypeScript", "React", "Node.js", "PostgreSQL", "Python", "Docker"],
};
