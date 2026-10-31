import { test, expect } from "@playwright/test";

test("home page loads and hero shows avatar with flanking text", async ({ page }) => {
  await page.goto("http://localhost:3000");
  
  // Check hero section exists
  await expect(page.locator(".hero-section-profile")).toBeVisible();
  
  // Check avatar exists
  await expect(page.locator(".hero-section-avatar")).toBeVisible();
  
  // Check flanking text exists
  await expect(page.locator(".hero-flank-left")).toBeVisible();
  await expect(page.locator(".hero-flank-right")).toBeVisible();
  
  // Check avatar is centered (roughly in middle of page horizontally)
  const avatarBox = await page.locator(".hero-section-avatar").boundingBox();
  const viewportSize = page.viewportSize();
  expect(avatarBox).not.toBeNull();
  
  const centerX = avatarBox!.x + avatarBox!.width / 2;
  const viewportCenter = viewportSize!.width / 2;
  expect(Math.abs(centerX - viewportCenter)).toBeLessThan(150);
});

test("projects page loads with cards", async ({ page }) => {
  await page.goto("http://localhost:3000/projects");
  
  // Check at least one project card exists
  await expect(page.locator(".project-card")).toHaveCount(2);
  
  // Check project names are visible
  await expect(page.getByText("Northline")).toBeVisible();
  await expect(page.getByText("Pulsekit")).toBeVisible();
});

test("project detail page works", async ({ page }) => {
  await page.goto("http://localhost:3000/projects/northline");
  
  await expect(page.getByText("Northline")).toBeVisible();
  await expect(page.getByText("Technologies")).toBeVisible();
});
