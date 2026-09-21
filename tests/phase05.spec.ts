import { expect, test } from "@playwright/test";

import { caseStudies, insights } from "../src/content/editorial";

test("serves editorial listings and every detail route in the initial HTML", async ({ request }) => {
  const collections = [
    { path: "/case-studies", entries: caseStudies },
    { path: "/insights", entries: insights },
  ] as const;

  for (const collection of collections) {
    const response = await request.get(collection.path);
    const html = await response.text();
    expect(response.ok()).toBeTruthy();
    expect(html).toContain('"@type":"ItemList"');

    for (const entry of collection.entries) {
      const detailPath = `${collection.path}/${entry.slug}`;
      expect(html).toContain(`href="${detailPath}"`);
      const detailResponse = await request.get(detailPath);
      const detailHtml = await detailResponse.text();
      expect(detailResponse.ok()).toBeTruthy();
      expect(detailHtml).toContain(entry.title);
      expect(detailHtml).toContain('href="/request-a-proposal"');
      expect(detailHtml).toContain('"@type":"Article"');
      expect(detailHtml).toContain('"@type":"BreadcrumbList"');
    }
  }
});

test("keeps the case-study listing minimal and the detail page informative", async ({ page }) => {
  await page.goto("/case-studies");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Complex products, made understandable.");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.locator(".case-study-card")).toHaveCount(caseStudies.length);
  await expect(page.locator(".case-study-card__copy > small")).toHaveCount(caseStudies.length);
  await expect(page.locator(".case-study-card__copy > strong")).toHaveCount(caseStudies.length);
  await expect(page.locator(".case-study-card__copy > span")).toHaveCount(caseStudies.length);

  await page.goto("/case-studies/carvu");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(caseStudies[0].title);
  await expect(page.locator(".case-facts dl")).toHaveCount(caseStudies[0].facts.length);
  await expect(page.locator(".case-roles__grid article")).toHaveCount(caseStudies[0].roles.length);
  await expect(page.locator(".case-workflow__track li")).toHaveCount(caseStudies[0].workflows.length);
  await expect(page.locator(".case-capabilities__grid article")).toHaveCount(caseStudies[0].capabilities.length);
  await expect(page.locator(".case-technical__list article")).toHaveCount(caseStudies[0].technicalNotes.length);
  await expect(page.locator(".carvu-landscape")).toHaveAttribute("aria-label", /Representative map/);
  await expect(page.getByText(/not a CarVu product screenshot/i)).toBeAttached();
  await expect(page.getByText(/No unapproved performance figures/i)).toBeAttached();
});

test("renders useful insight listings and long-form article structure", async ({ page }) => {
  await page.goto("/insights");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Practical thinking for what comes next.");
  await expect(page.locator(".insight-list-card")).toHaveCount(insights.length);
  await expect(page.locator(".insight-list-card img")).toHaveCount(insights.length);

  for (const insight of insights) {
    await page.goto(`/insights/${insight.slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(insight.title);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.locator(".insight-toc li")).toHaveCount(insight.sections.length);
    await expect(page.locator(".insight-article__section")).toHaveCount(insight.sections.length);
    await expect(page.locator(".insight-takeaways li")).toHaveCount(insight.takeaways.length);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", insight.excerpt);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/insights/${insight.slug}$`));

    const schemaTypes = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
      scripts.map((script) => JSON.parse(script.textContent ?? "{}")["@type"]),
    );
    expect(schemaTypes).toEqual(["Article", "BreadcrumbList"]);
  }
});

test("uses distinct and documented editorial images", async ({ page }) => {
  await page.goto("/insights");
  const sources = await page.locator(".insight-list-card img").evaluateAll((images) =>
    images.map((image) => decodeURIComponent(image.getAttribute("src") ?? "")),
  );
  const expected = [
    "insight-dealership-digital.jpg",
    "insight-fleet-operations.jpg",
    "insight-service-workflows.jpg",
  ];
  expect(sources).toHaveLength(expected.length);
  expect(new Set(sources).size).toBe(expected.length);
  for (const file of expected) expect(sources.some((source) => source.includes(file))).toBeTruthy();

  await page.goto("/case-studies");
  await expect(page.locator(".case-study-card img")).toHaveAttribute("src", /case-carvu-auction\.jpg/);
});

test("marks unknown dynamic editorial slugs as not found and non-indexable", async ({ request }) => {
  for (const path of ["/case-studies/not-a-case", "/insights/not-an-insight"]) {
    const response = await request.get(path);
    const html = await response.text();
    // Next may stream the not-found boundary with HTTP 200 for dynamic routes,
    // but it must emit the not-found UI and noindex metadata.
    expect([200, 404]).toContain(response.status());
    expect(html).toContain("This page could not be found");
    expect(html).toContain('<meta name="robots" content="noindex"');
  }
});

test("keeps Phase 05 pages inside every target viewport", async ({ page }) => {
  for (const path of [
    "/case-studies",
    "/case-studies/carvu",
    "/insights",
    "/insights/modern-dealership-website-beyond-listings",
  ]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  }
});
