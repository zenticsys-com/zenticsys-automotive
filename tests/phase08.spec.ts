import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const representativeRoutes = [
  "/",
  "/solutions",
  "/solutions/dealership-websites",
  "/services/automotive-website-development",
  "/case-studies/carvu",
  "/insights/modern-dealership-website-beyond-listings",
  "/about",
  "/request-a-proposal",
  "/contact",
  "/privacy",
  "/terms",
];

test("publishes a complete canonical sitemap and safe robots policy", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  const xml = await sitemap.text();
  expect(sitemap.ok()).toBeTruthy();
  for (const path of representativeRoutes) {
    expect(xml).toContain(path === "/" ? "http://localhost:3000/</loc>" : `http://localhost:3000${path}</loc>`);
  }
  expect(xml).not.toContain("/admin");
  expect(xml).not.toContain("/cms-api");

  const robots = await request.get("/robots.txt");
  const text = await robots.text();
  expect(robots.ok()).toBeTruthy();
  expect(text).toContain("Allow: /");
  expect(text).toContain("Disallow: /admin/");
  expect(text).toContain("Disallow: /cms-api/");
  expect(text).toContain("Sitemap: http://localhost:3000/sitemap.xml");
});

test("serves indexable routes with one H1, metadata, canonicals, and initial HTML", async ({ page, request }) => {
  for (const path of representativeRoutes) {
    const response = await request.get(path);
    const html = await response.text();
    expect(response.ok(), path).toBeTruthy();
    expect(html, path).toMatch(/<h1[ >]/);
    expect(html, path).toContain('<meta name="description"');
    expect(html, path).toContain('rel="canonical"');
    expect(html, path).toContain('property="og:title"');
    expect(html, path).toContain('name="twitter:card"');

    await page.goto(path);
    await expect(page.locator("h1"), path).toHaveCount(1);
    await expect(page.locator('meta[name="description"]'), path).toHaveAttribute("content", /\S+/);
    const expectedCanonical = path === "/" ? "http://localhost:3000" : `http://localhost:3000${path}`;
    await expect(page.locator('link[rel="canonical"]'), path).toHaveAttribute("href", expectedCanonical);
  }
});

test("publishes structured data on representative commercial and editorial routes", async ({ page }) => {
  for (const path of ["/", "/solutions", "/solutions/dealership-websites", "/case-studies/carvu", "/insights/modern-dealership-website-beyond-listings"]) {
    await page.goto(path);
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(schemas.length, path).toBeGreaterThan(0);
    for (const schema of schemas) expect(() => JSON.parse(schema), path).not.toThrow();
  }
});

test("adds baseline security and privacy headers", async ({ request }) => {
  const response = await request.get("/");
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response.headers()["x-frame-options"]).toBe("SAMEORIGIN");
  expect(response.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(response.headers()["permissions-policy"]).toContain("camera=()");
  expect(response.headers()["x-powered-by"]).toBeUndefined();
});

test("has no serious or critical automated accessibility violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of representativeRoutes) {
    await page.goto(path);
    await page.waitForTimeout(50);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const blockers = results.violations.filter(({ impact }) => impact === "critical" || impact === "serious");
    const summary = blockers.flatMap(({ id, nodes }) =>
      nodes.map(({ failureSummary, target }) => `${id}: ${target.join(" ")} — ${failureSummary ?? "failed"}`),
    );
    expect(summary, path).toEqual([]);
  }
});

test("does not render or preload the intentionally hidden journey gallery", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".journey-gallery")).toHaveCount(0);
  const imageSources = await page.locator("img").evaluateAll((images) => images.map((image) => (image as HTMLImageElement).currentSrc));
  expect(imageSources.some((source) => source.includes("journey-"))).toBeFalsy();
});
