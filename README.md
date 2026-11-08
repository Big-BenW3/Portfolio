# Big Ben portfolio

Next.js 16 (App Router), React 19, TypeScript. No UI framework: the styles are one hand-written stylesheet.

```
app/            layout, home page, /resume page, global CSS
components/     Hero, Stack (logo marquees), Work (pinned project stages), About, Contact,
                Loader, Nav, Engine (scroll / tilt / parallax), ResumeViewer
data/           site config + links, projects, stack logos, phone screenshots
public/         shots/ (project previews), resume.pdf + resume/ (page images)
```

## Edit

- Contact details and roles: `data/site.ts` (email, WhatsApp number are still placeholders)
- Projects: `data/projects.ts`; previews go in `public/shots/<key>.webp`
- Phone screens for the mobile cards: `data/screens.ts` + images in `public/screens/`
- Resume: replace `public/resume.pdf` and the page images in `public/resume/`

## Run

```
npm install
npm run dev
```
