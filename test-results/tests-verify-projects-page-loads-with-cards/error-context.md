# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\verify.spec.ts >> projects page loads with cards
- Location: tests\verify.spec.ts:26:5

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('.project-card')
Expected: 2
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" locator('.project-card') with timeout 5000ms
  - waiting for locator('.project-card')
    14 × locator resolved to 0 elements
       - unexpected value "0"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e6] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=e7]
    - generic [ref=e11]:
      - button "Open issues overlay" [ref=e12]:
        - generic [ref=e13]:
          - generic [aria-hidden] [ref=e14]: "1"
          - generic [ref=e15]: "2"
        - generic [ref=e16]:
          - text: Issue
          - generic [aria-hidden] [ref=e17]: s
      - button "Collapse issues badge" [ref=e18]
  - banner [ref=e21]:
    - generic [ref=e22]:
      - navigation "Primary" [ref=e23]:
        - link "Home" [ref=e24] [cursor=pointer]:
          - /url: /
        - link "Projects" [ref=e25] [cursor=pointer]:
          - /url: /projects
        - link "Resume" [ref=e26] [cursor=pointer]:
          - /url: /resume
        - link "Analytics" [ref=e27] [cursor=pointer]:
          - /url: /analytics
        - link "Tools" [ref=e28] [cursor=pointer]:
          - /url: /uses
      - generic [ref=e29]:
        - button "Star this portfolio" [ref=e30] [cursor=pointer]:
          - generic [ref=e33]: Open-source
        - tooltip "Give a star"
  - main [ref=e34]:
    - heading "Something went wrong" [level=1] [ref=e38]
    - paragraph [ref=e39]: "`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."
  - contentinfo [ref=e40]:
    - paragraph [ref=e41]: “Make it work, then make it feel inevitable.”
    - paragraph [ref=e42]: "- a note to future me"
    - generic [ref=e43]:
      - generic [ref=e44]: © 2026 Big Ben
      - generic [ref=e45]: 10:37:37 PM
  - alert [ref=e46]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("home page loads and hero shows avatar with flanking text", async ({ page }) => {
  4  |   await page.goto("http://localhost:3000");
  5  |   
  6  |   // Check hero section exists
  7  |   await expect(page.locator(".hero-section-profile")).toBeVisible();
  8  |   
  9  |   // Check avatar exists
  10 |   await expect(page.locator(".hero-section-avatar")).toBeVisible();
  11 |   
  12 |   // Check flanking text exists
  13 |   await expect(page.locator(".hero-flank-left")).toBeVisible();
  14 |   await expect(page.locator(".hero-flank-right")).toBeVisible();
  15 |   
  16 |   // Check avatar is centered (roughly in middle of page horizontally)
  17 |   const avatarBox = await page.locator(".hero-section-avatar").boundingBox();
  18 |   const viewportSize = page.viewportSize();
  19 |   expect(avatarBox).not.toBeNull();
  20 |   
  21 |   const centerX = avatarBox!.x + avatarBox!.width / 2;
  22 |   const viewportCenter = viewportSize!.width / 2;
  23 |   expect(Math.abs(centerX - viewportCenter)).toBeLessThan(150);
  24 | });
  25 | 
  26 | test("projects page loads with cards", async ({ page }) => {
  27 |   await page.goto("http://localhost:3000/projects");
  28 |   
  29 |   // Check at least one project card exists
> 30 |   await expect(page.locator(".project-card")).toHaveCount(2);
     |                                               ^ Error: expect(locator).toHaveCount(expected) failed
  31 |   
  32 |   // Check project names are visible
  33 |   await expect(page.getByText("Northline")).toBeVisible();
  34 |   await expect(page.getByText("Pulsekit")).toBeVisible();
  35 | });
  36 | 
  37 | test("project detail page works", async ({ page }) => {
  38 |   await page.goto("http://localhost:3000/projects/northline");
  39 |   
  40 |   await expect(page.getByText("Northline")).toBeVisible();
  41 |   await expect(page.getByText("Technologies")).toBeVisible();
  42 | });
  43 | 
```