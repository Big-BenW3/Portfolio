#!/usr/bin/env node
/**
 * Route-by-route smoke test for the Next.js build.
 *
 * Replaces the TanStack project's `browser-smoke.mjs` + `brand-check.mjs` +
 * `check-auth-invariant.mjs` trio, which were wired to sandbox-specific
 * concerns (`/__app-env`, the auth-invariant flag, `/workspace` output paths)
 * that do not exist here.
 *
 * Two things this asserts that a screenshot alone cannot:
 *  1. every route returns 200 and renders real body text, and
 *  2. the tab title matches the expected string exactly — which is how the
 *     `head()` -> `metadata` port is verified per route.
 *
 * Usage: node scripts/smoke.mjs [baseUrl]
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";

const BASE = process.argv[2] || "http://127.0.0.1:8080";
const OUT_DIR = "screenshots";
const MIN_BODY_TEXT = 200;

/** null title = accepted as-is (dynamic route). */
const ROUTES = [
  { path: "/", title: "Jordan Hale | Full Stack Developer" },
  { path: "/projects", title: "Projects | Jordan Hale" },
  { path: "/blogs", title: "Notes | Jordan Hale" },
  {
    path: "/blogs/how-to-plan-a-project",
    title: "How to plan a project from a blank page | Jordan Hale",
  },
  {
    path: "/blogs/portfolio-notes",
    title: "Notes before you publish a portfolio | Jordan Hale",
  },
  { path: "/resume", title: "Resume | Jordan Hale" },
  { path: "/uses", title: "Uses | Jordan Hale" },
  { path: "/support", title: "Support | Jordan Hale" },
  { path: "/analytics", title: "Analytics | Jordan Hale" },
  { path: "/this-route-does-not-exist", title: "Page not found | Jordan Hale", expect404: true },
];

const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "mobile", width: 390, height: 844 },
];

mkdirSync(OUT_DIR, { recursive: true });

const slugFor = (route, vp) =>
  `${vp.name}-${route.path === "/" ? "home" : route.path.replace(/^\//, "").replace(/\//g, "-")}.png`;

const results = [];
let browser;

try {
  browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });

  for (const vp of VIEWPORTS) {
    for (const route of ROUTES) {
      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height },
      });
      const consoleErrors = [];
      const pageErrors = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });
      page.on("pageerror", (err) => pageErrors.push(String(err?.message || err)));

      const response = await page.goto(`${BASE}${route.path}`, {
        waitUntil: "domcontentloaded",
        timeout: 45000,
      });
      // Let client hydration + the emulated chart/marquee timers settle.
      await page.waitForTimeout(1200);

      const status = response?.status() ?? 0;
      const title = await page.title();
      const bodyText = (await page.locator("body").innerText().catch(() => "")).replace(/\s+/g, " ").trim();
      const horizontalOverflow = await page.evaluate(() => {
        const el = document.documentElement;
        return el.scrollWidth > el.clientWidth + 1;
      });
      const screenshot = `${OUT_DIR}/${slugFor(route, vp)}`;
      await page.screenshot({ path: screenshot, fullPage: false });
      await page.close();

      const problems = [];
      if (status !== 200) problems.push(`status ${status}`);
      if (route.title && title !== route.title) {
        problems.push(`title "${title}" != expected "${route.title}"`);
      }
      if (bodyText.length < MIN_BODY_TEXT) {
        problems.push(`body text too short (${bodyText.length} chars) — possible blank render`);
      }
      if (consoleErrors.length) problems.push(`${consoleErrors.length} console error(s)`);
      if (pageErrors.length) problems.push(`${pageErrors.length} page error(s)`);
      if (horizontalOverflow) problems.push("horizontal overflow");

      results.push({
        viewport: vp.name,
        path: route.path,
        status,
        title,
        bodyTextLen: bodyText.length,
        bodyTextPrefix: bodyText.slice(0, 80),
        horizontalOverflow,
        consoleErrors,
        pageErrors,
        screenshot,
        problems,
      });
    }
  }
} catch (err) {
  console.error(JSON.stringify({ ok: false, error: String(err?.message || err) }, null, 2));
  process.exitCode = 1;
} finally {
  await browser?.close();
}

const failures = results.filter((r) => r.problems.length > 0);
const verdict = {
  base: BASE,
  checked: results.length,
  failures: failures.length,
  ok: failures.length === 0,
  results,
};

writeFileSync(`${OUT_DIR}/smoke-verdict.json`, JSON.stringify(verdict, null, 2));

for (const r of results) {
  const mark = r.problems.length ? "FAIL" : "ok  ";
  console.log(`${mark} [${r.viewport.padEnd(7)}] ${r.path} (${r.status}) ${r.bodyTextLen} chars`);
  for (const p of r.problems) console.log(`       - ${p}`);
}
console.log(`\n${verdict.ok ? "PASS" : "FAIL"}: ${results.length - failures.length}/${results.length} checks clean`);

if (!verdict.ok) process.exitCode = 1;
