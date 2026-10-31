# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\verify.spec.ts >> project detail page works
- Location: tests\verify.spec.ts:37:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Northline')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('Northline') with timeout 5000ms
  - waiting for getByText('Northline')

```

```yaml
- banner:
  - navigation "Primary":
    - link "Home":
      - /url: /
    - link "Projects":
      - /url: /projects
    - link "Resume":
      - /url: /resume
    - link "Analytics":
      - /url: /analytics
    - link "Tools":
      - /url: /uses
  - button "Star this portfolio": Open-source
  - tooltip "Give a star"
- main:
  - heading "Project Not Found" [level=2]
  - paragraph: The project you're looking for doesn't exist.
  - link "Back to Projects":
    - /url: /projects
- contentinfo:
  - paragraph: “Make it work, then make it feel inevitable.”
  - paragraph: "- a note to future me"
  - text: © 2026 Big Ben 10:37:52 PM
- alert
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
  30 |   await expect(page.locator(".project-card")).toHaveCount(2);
  31 |   
  32 |   // Check project names are visible
  33 |   await expect(page.getByText("Northline")).toBeVisible();
  34 |   await expect(page.getByText("Pulsekit")).toBeVisible();
  35 | });
  36 | 
  37 | test("project detail page works", async ({ page }) => {
  38 |   await page.goto("http://localhost:3000/projects/northline");
  39 |   
> 40 |   await expect(page.getByText("Northline")).toBeVisible();
     |                                             ^ Error: expect(locator).toBeVisible() failed
  41 |   await expect(page.getByText("Technologies")).toBeVisible();
  42 | });
  43 | 
```