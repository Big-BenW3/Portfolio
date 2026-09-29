# Edit guide

Two jobs: count a real open when someone lands on the site, and swap the skill logos.

**Most links live in one place now: [`src/data/links.ts`](src/data/links.ts).** Your `@handle`, status line, email, GitHub / LinkedIn / Instagram / X, the Discord card, and the support page destinations all read from there. [`src/data/content.ts`](src/data/content.ts) imports those values, so editing `links.ts` updates the whole site — you do not need to touch any component.

What is deliberately **not** in `links.ts`: the sample projects' repo and demo URLs, the employer sites, and the `/uses` vendor links. Those sit beside their entries in `content.ts` because they change one line at a time, not as a set.

The scrolling skill rows are rendered by `Skills` in [`src/components/sections.tsx`](src/components/sections.tsx).

The charts on the home page and on `/analytics` are still **sample data**. They do not know when a person opens the site. Wiring a tracker does not change those charts until you replace the fake series (last section).

---

## Track when someone opens the site

Count a pageview in two moments:

1. The first time the site opens.
2. Every later in-app navigation. This is a single-page app, so a script that only runs on the first HTML load will miss `/projects`, `/blogs`, and the rest.

The section below covers all three providers. Only one thing changes, so set it up once.

### Where the script tag goes

In the TanStack version these went in a `head()` `scripts` array on `src/routes/__root.tsx`. That file no longer exists. In Next you add the script to the root layout, [`src/app/layout.tsx`](src/app/layout.tsx), inside `<body>` next to `<PreviewHostBridge />`:

```tsx
<Script src="…" strategy="afterInteractive" />
```

imported from `next/script`:

```tsx
import Script from "next/script";
```

### Where the pageview call goes

Marketing scripts follow the client router, and this app uses the App Router. Mount a tracker once inside a client component. Create `src/components/open-tracker.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function OpenTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const plausible = (window as Window & { plausible?: (event: string) => void }).plausible;
    const umami = (window as Window & { umami?: { track: (payload?: object) => void } }).umami;
    plausible?.("pageview");
    umami?.track();
  }, [pathname]);

  return null;
}
```

Then render `<OpenTracker />` in [`src/app/layout.tsx`](src/app/layout.tsx) inside `<body>`. It is a client component, so it can be mounted from the server layout without any other change.

### Plausible

1. Add the domain in [Plausible](https://plausible.io/).
2. Add the script to `layout.tsx`. Use `script.manual.js` — it does not fire by itself, which is what you want, because `OpenTracker` sends the pageview on every path change including the first open:

```tsx
<Script
  defer
  data-domain="your-domain.com"
  src="https://plausible.io/js/script.manual.js"
  strategy="afterInteractive"
/>
```

### Umami

1. Create a website in [Umami](https://umami.is/) and copy the website id.

```tsx
<Script
  defer
  data-website-id="YOUR-WEBSITE-ID"
  src="https://cloud.umami.is/script.js"
  strategy="afterInteractive"
/>
```

Current Umami scripts listen for history changes, so the first open and later routes both count. `OpenTracker` covers it if a route is missing from the dashboard.

### Vercel Web Analytics

The deployed site already runs on Vercel.

1. In the Vercel project, enable **Web Analytics**.
2. Install the package (it has to be a normal dependency, not a dev dependency):

```bash
npm install @vercel/analytics
```

3. Render it once in the root body in [`src/app/layout.tsx`](src/app/layout.tsx):

```tsx
import { Analytics } from "@vercel/analytics/react";

// inside <body>, next to <PreviewHostBridge />
<Analytics />
```

Each open is a pageview in the Vercel Analytics tab. You do not get that data inside this repo until you call their API yourself.

### Point the on-site chart at real numbers

[`src/components/analytics-panel.tsx`](src/components/analytics-panel.tsx) builds the lines in `series()`. That function invents visitors. After a tracker is live, replace `series()` with a fetch against the provider's stats API:

| Tracker | Stats API |
|---|---|
| Plausible | [Stats API](https://plausible.io/docs/stats-api) — `GET /api/v1/stats/timeseries` |
| Umami | [API](https://umami.is/docs/api) — website pageviews by date |
| Vercel | [Web Analytics API](https://vercel.com/docs/analytics/api) |

Keep the request on the server, and pass only the public site id to the browser. In Next a server endpoint is a route handler — `src/app/api/analytics/route.ts` exporting `GET` — rather than the `src/routes/api/` file the TanStack version used. The API key stays on the server. Until that fetch exists, the chart is labeled as a sample and the Refresh button only redraws it.

---

## Skill logos

Each row is an array in [`src/data/content.ts`](src/data/content.ts):

- `languages` — first row
- `frameworks` — second row
- `tools` — third row

A row looks like this:

```ts
{ name: "TypeScript", color: "#3178c6", logo: "/logos/typescript.svg" }
```

`logo` is a file in [`public/logos/`](public/logos/). `color` is only a spare brand color; the image is the mark people see.

To add one, copy a line into the right array and drop the SVG into `public/logos/`. To replace one, either overwrite that SVG or point `logo` at a new file. The tables below are the exact files already on the site, plus the source URL for each mark.

Logos are the brand marks from [Simple Icons](https://simpleicons.org/) unless the table says Devicon. Simple Icons serves a single-color SVG: `https://cdn.simpleicons.org/<slug>/<hex>`.

### Languages

| Name | File on this site | Logo |
|---|---|---|
| TypeScript | `/logos/typescript.svg` | https://cdn.simpleicons.org/typescript/3178C6 |
| JavaScript | `/logos/javascript.svg` | https://cdn.simpleicons.org/javascript/F7DF1E |
| Python | `/logos/python.svg` | https://cdn.simpleicons.org/python/3776AB |
| Java | `/logos/java.svg` | https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg |
| GraphQL | `/logos/graphql.svg` | https://cdn.simpleicons.org/graphql/E10098 |

Java uses the Devicon coffee-cup mark. The single-color OpenJDK cup is the other free option: https://cdn.simpleicons.org/openjdk/ED8B00

### Frameworks

| Name | File on this site | Logo |
|---|---|---|
| React | `/logos/react.svg` | https://cdn.simpleicons.org/react/61DAFB |
| Node.js | `/logos/nodejs.svg` | https://cdn.simpleicons.org/nodedotjs/5FA04E |
| Next.js | `/logos/nextjs.svg` | https://cdn.simpleicons.org/nextdotjs/FFFFFF |
| Tailwind | `/logos/tailwind.svg` | https://cdn.simpleicons.org/tailwindcss/06B6D4 |
| Spring | `/logos/spring.svg` | https://cdn.simpleicons.org/spring/6DB33F |

Next.js is white so it stays visible on the dark page. A black wordmark would disappear.

### Tools

| Name | File on this site | Logo |
|---|---|---|
| VS Code | `/logos/vscode.svg` | https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg |
| Figma | `/logos/figma.svg` | https://cdn.simpleicons.org/figma/F24E1E |
| Notion | `/logos/notion.svg` | https://cdn.simpleicons.org/notion/FFFFFF |
| Postman | `/logos/postman.svg` | https://cdn.simpleicons.org/postman/FF6C37 |
| Vercel | `/logos/vercel.svg` | https://cdn.simpleicons.org/vercel/FFFFFF |
| GitHub | `/logos/github.svg` | https://cdn.simpleicons.org/github/FFFFFF |
| Linear | `/logos/linear.svg` | https://cdn.simpleicons.org/linear/5E6AD2 |
| Arc | `/logos/arc.svg` | https://cdn.simpleicons.org/arc/FFFFFF |
| Terminal | `/logos/terminal.svg` | https://cdn.simpleicons.org/gnubash/4EAA25 |
| Chrome | `/logos/chrome.svg` | https://cdn.simpleicons.org/googlechrome/4285F4 |
| Obsidian | `/logos/obsidian.svg` | https://cdn.simpleicons.org/obsidian/7C3AED |
| Slack | `/logos/slack.svg` | https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg |
| Discord | `/logos/discord.svg` | https://cdn.simpleicons.org/discord/5865F2 |
| Neovim | `/logos/neovim.svg` | https://cdn.simpleicons.org/neovim/57A143 |
| Zed | `/logos/zed.svg` | https://cdn.simpleicons.org/zedindustries/FFFFFF |
| PostgreSQL | `/logos/postgresql.svg` | https://cdn.simpleicons.org/postgresql/4169E1 |
| MongoDB | `/logos/mongodb.svg` | https://cdn.simpleicons.org/mongodb/47A248 |
| Docker | `/logos/docker.svg` | https://cdn.simpleicons.org/docker/2496ED |
| Redis | `/logos/redis.svg` | https://cdn.simpleicons.org/redis/FF4438 |
| Git | `/logos/git.svg` | https://cdn.simpleicons.org/git/F05032 |

VS Code and Slack are not on Simple Icons, so those two come from [Devicon](https://devicon.dev/). Terminal uses the Bash mark. Zed's slug is `zedindustries`.

Ghostty and YouTube Music are on the `/uses` page, not in the scrolling rows. Their marks, if you want them later:

- Ghostty: https://cdn.simpleicons.org/ghostty/FFFFFF
- YouTube Music: https://cdn.simpleicons.org/youtubemusic/FF0000

---

## The profile picture

The hero avatar and the article author card both render [`LINKS.portrait`](src/data/links.ts) — `/portrait.png` by default. Replace `public/portrait.png` with any **square** image and it fits both slots without cropping (they are 132px and 42px square). 512×512 is plenty.

`alt` is left empty on purpose: your name is already in the `<h1>` beside the image, so a description would make screen readers announce it twice.

---

## Suggestions only

Nothing below is built. The contribution graph and `/support` stay as they are until you pick one.

### Instead of the contribution graph

The green year-grid is `<Calendar />` in [`src/components/calendar.tsx`](src/components/calendar.tsx), rendered on the home page in [`src/app/page.tsx`](src/app/page.tsx) under Work Experience. Two replacements that still prove you show up, without a fake GitHub heatmap:

1. **Shipping log.** A short list of the last five things you actually finished: a date, one sentence, and a link. Same slot on the home page, same dashed frame as the experience cards. Better if your real GitHub graph is sparse or private, because a reader can scan it in one pass.
2. **Year in numbers.** Three figures in a row — projects shipped, posts published, days you coded — plus one caption under them. Quieter than the grid, and the numbers are yours to type instead of a seeded square chart.

### Instead of the support route

`/support` is the nav item in [`src/components/chrome.tsx`](src/components/chrome.tsx) and the page in [`src/app/support/page.tsx`](src/app/support/page.tsx) (email, sponsor, coffee, sample wallets). If you do not want a tipping page, two ways to drop it:

1. **Delete the route and give that nav slot to Uses.** `/uses` already exists and is not in the nav. Remove the Support link, point the slot at `/uses`, and delete `src/app/support/page.tsx` along with `src/components/support-view.tsx`. Contact on the home page still covers email.
2. **Keep one thanks line, no page.** Remove `/support` entirely and add a single "Buy me a coffee" or sponsor link under the contact row on the home page. No wallet, no second route, no nav item. Use this if you still want a tip jar but not a whole page for it.