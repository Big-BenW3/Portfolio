import { GH } from "./site";

export interface Project {
  h: number;
  kind: string;
  name: string;
  desc: string;
  tags: string[];
  /** key of a file in public/shots (browser-framed website preview) */
  shot?: string;
  /** key into data/screens.ts (phone-framed app screens) */
  screens?: string;
  live?: string;
  gh: string;
  extra?: [label: string, url: string][];
}

export const WORK_A: Project[] = [
  { h: 18, kind: "Collaboration platform", shot: "avera", name: "Avera",
    desc: "Turn an idea into a shared space. Public ideas, spaces with roles and invites, planning notes, roadmaps and tasks, with realtime and calls underneath.",
    tags: ["Next.js", "Hono", "PostgreSQL", "Redis"],
    live: "https://avera-frontend.vercel.app", gh: GH + "Avera-Frontend", extra: [["API repo", GH + "Avera-backend"]] },
  { h: 172, kind: "Web · Sui", shot: "permalink", name: "Perma.link",
    desc: "Short links for files on Walrus decentralized storage. Connect a Sui wallet, drop a file and get a short link, with storage paid from your own wallet.",
    tags: ["Flutter", "Sui", "Walrus", "Supabase"],
    live: "https://perma-link.vercel.app", gh: GH + "perma-link" },
  { h: 210, kind: "Developer tool", shot: "docsmith", name: "Docsmith",
    desc: "Turn any GitHub SDK repo into beautiful docs. Docsmith reads the source, parses the AST and generates a complete MkDocs site with no manual writing.",
    tags: ["Python", "Flask", "MkDocs", "LLM"],
    live: "https://smithyourdocs.vercel.app/", gh: GH + "Docsmith" },
  { h: 150, kind: "Fintech", shot: "fundflow", name: "FundFlow",
    desc: "Raise money, show where it goes, release it by rule. Kora-powered collection, an immutable ledger and payouts that unlock only when milestones are met.",
    tags: ["FastAPI", "Next.js 15", "TypeScript", "Kora"],
    live: "https://fund-flow-ecru.vercel.app/", gh: GH + "FundFlow-frontend", extra: [["API repo", GH + "FundFlow-backend"]] },
  { h: 84, kind: "Developer tool", shot: "lenear", name: "Lenear",
    desc: "AI code review in your terminal. One command reads your git diff, flags real bugs and security risks, scores the result and saves it to your dashboard.",
    tags: ["Next.js", "TypeScript", "Drizzle", "Neon"],
    live: "https://lenear.vercel.app", gh: GH + "GiitpulseCLI" },
  { h: 222, kind: "Civic tech", shot: "wella", name: "Wella",
    desc: "Turns scattered welfare complaints into a visible, accountable queue. Students raise issues, vote anonymously and follow status updates; staff get a role-gated admin workspace.",
    tags: ["Next.js", "PostgreSQL", "Drizzle"],
    live: "https://sugwella.vercel.app", gh: GH + "WelfApp" },
];

export const WORK_B: Project[] = [
  { h: 30, kind: "Mobile · Student app", screens: "sia", name: "Sia Mobile",
    desc: "The student itinerary app for students and course reps. Level feeds, calendar, personal itinerary with AI-assisted planning, a resource library and a CGPA calculator, on one Expo codebase.",
    tags: ["Expo", "React Native", "Zustand", "TanStack Query"],
    gh: GH + "sia-mobile" },
  { h: 268, kind: "Productivity · local-first", shot: "cbrain", name: "C-Brain",
    desc: "A second brain on an infinite canvas. Markdown notes, shapes, sketches and [[links]] between ideas, saved in your browser with no account and nothing leaving your device.",
    tags: ["Next.js", "React Flow", "TypeScript", "Local-first"],
    live: "https://c-braint.vercel.app", gh: GH + "c-brain" },
  { h: 52, kind: "Design tool", shot: "svgdio", name: "SVGdio",
    desc: "A layer-based SVG and CSS studio. Draw, style and animate on a timeline, then export clean standalone SVG and CSS with no runtime dependency.",
    tags: ["Next.js", "TypeScript", "SVG", "CSS motion"],
    live: "https://svg-dio.vercel.app/", gh: GH + "svgdio" },
  { h: 340, kind: "Mobile · Food ordering", screens: "chowit", name: "ChowIt",
    desc: "The customer side of a food-ordering app, in Flutter. Onboarding, restaurant discovery, cart, checkout, payment and order history in one flow.",
    tags: ["Flutter", "Dart", "Material"],
    gh: GH + "ChowIt-Mobile" },
  { h: 150, kind: "Mobile · AI", screens: "chomp", name: "Chomp",
    desc: "GitHub analytics, watched by AI, on your phone. Connects to your account, scores repos for security, code quality, docs and tests, then rescans on its own and pushes an alert when something slips.",
    tags: ["Flutter", "Riverpod", "Express", "Neon Postgres"],
    gh: GH + "chomp" },
  { h: 250, kind: "Fintech · Escrow", shot: "bridgepay", name: "BridgePay",
    desc: "Escrow for cross-border freelance work. A client pays in BOB, funds sit in non-custodial Stellar escrow, and the freelancer gets USDC the moment milestones are approved.",
    tags: ["Next.js", "Prisma", "Stellar", "Pollar"],
    live: "https://bridgepay-eight.vercel.app/", gh: GH + "bridgepay" },
];
