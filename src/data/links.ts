/**
 * The links and handles that change when this stops being a sample.
 *
 * Everything here is an `https://example.com` stand-in in the shipped template.
 * Edit this file and the whole site updates — `src/data/content.ts` reads these
 * values, and every component reads `content.ts`, so nothing else needs touching.
 *
 * How to get each one:
 * - GitHub profile: github.com → your avatar → copy the address bar.
 * - LinkedIn: your profile's address bar, the `linkedin.com/in/…` URL.
 * - Instagram: `instagram.com/<handle>` from your profile's address bar.
 * - X: `x.com/<handle>` from your profile's address bar.
 * - Discord invite: Server → Invite People → copy the invite link.
 * - Email: your real inbox. `LINKS.email` feeds both `profile.email` and the
 *   `mailto:` on the contact row, so they cannot drift apart.
 * - Sponsors: github.com → Settings → Sponsors, or `github.com/sponsors/<you>`.
 * - Coffee: your ko-fi.com or buymeacoffee.com public page address.
 *
 * Deliberately NOT here: project repo/demo URLs, employer homepages, and the
 * `/uses` vendor links. Those live beside their entries in `content.ts`
 * because they change one line at a time, not as a set.
 */
export const LINKS = {
  // --- Identity: the @handle people click, and where it goes ---
  handleText: "@Big-BenW3",
  handleUrl: "https://github.com/Big-BenW3",

  // --- One line about what you are doing now, and a link for it ---
  statusText: "Building Lenear",
  statusUrl: "https://example.com",

  // --- Contact ---
  email: "hello@example.com",

  // --- Social accounts. Used by both the hero icon row and the contact row. ---
  github: "https://github.com/Big-BenW3",
  linkedin: "https://linkedin.com/in/bigbenw3",
  instagram: "https://example.com",
  x: "https://x.com/banditdotsol",

  // --- X profile display name and @handle (can differ from the GitHub one) ---
  xName: "Big Ben",
  xHandle: "@Web3_Banditt",

  // --- Community card under the bio (Discord server, or any community URL) ---
  discord: "https://example.com",

  // --- /support page. These feed the Sponsors and Coffee cards. ---
  sponsor: "https://example.com/sponsor",
  coffee: "https://example.com/coffee",

  // --- Images. See `profileImage` below for sizing guidance. ---
  portrait: "/BigBen.png",
} as const;

/** Build a `mailto:` URL, defaulting to the contact address above. */
export function mailto(address: string = LINKS.email): string {
  return `mailto:${address}`;
}

/**
 * The hero avatar and the article author card both render `LINKS.portrait`.
 *
 * Replace `public/portrait.png` with any square image — a 1:1 ratio is what
 * keeps it from being cropped (the slots are square: 132px in the hero, 42px
 * in the article card). 512×512 is plenty: the largest it ever draws is 132px,
 * or 264px on a retina screen.
 */
export const profileImage = {
  path: LINKS.portrait,
  width: 512,
  height: 512,
} as const;