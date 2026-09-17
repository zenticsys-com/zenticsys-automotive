import { expect, test } from "@playwright/test";

test("serves the complete homepage narrative in the initial HTML", async ({
  request,
}) => {
  const response = await request.get("/");
  const html = await response.text();

  expect(response.ok()).toBeTruthy();
  expect(html).toContain(
    "We build the digital systems that keep automotive businesses moving.",
  );
  expect(html).toContain("Built around how automotive businesses actually work.");
  expect(html).toContain("Digital products across the automotive journey.");
  expect(html).toContain("Complex automotive workflows, understood through CarVu.");
  expect(html).toContain('href="/request-a-proposal"');
});

test("uses one clear H1 and a logical homepage section hierarchy", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "We build the digital systems that keep automotive businesses moving.",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);

  const expectedSections = [
    "Built around how automotive businesses actually work.",
    "Digital products across the automotive journey.",
    "We design what customers see—and what your team needs behind it.",
    "Complex automotive workflows, understood through CarVu.",
    "From the first enquiry to platform-wide control.",
    "Thinking beyond the interface.",
    "Ready to put it in motion?",
  ];

  for (const heading of expectedSections) {
    await expect(page.getByRole("heading", { level: 2, name: heading })).toBeAttached();
  }
});

test("publishes homepage metadata and Organization structured data", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page).toHaveTitle(
    "Automotive Websites, Platforms & Custom Software | Zenticsys",
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /dealership websites, fleet systems, service platforms/i,
  );

  const structuredData = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  const organization = JSON.parse(structuredData ?? "{}");

  expect(organization["@type"]).toBe("Organization");
  expect(organization.name).toBe("Zenticsys");
  expect(organization.knowsAbout).toContain("Automotive software development");
});

test("keeps content imagery decorative and product visuals labelled", async ({
  page,
}) => {
  await page.goto("/");

  const images = page.locator("main img");
  const imageCount = await images.count();

  expect(imageCount).toBeGreaterThan(0);
  for (let index = 0; index < imageCount; index += 1) {
    await expect(images.nth(index)).toHaveAttribute("alt", "");
  }

  await expect(
    page.getByLabel("Representative CarVu workflow interface illustration"),
  ).toBeAttached();
});

test("uses distinct, solution-specific imagery in What We Build", async ({
  page,
}) => {
  await page.goto("/");

  const expectedImages = [
    "solution-dealership.jpg",
    "solution-fleet.jpg",
    "service-workshop.jpg",
    "solution-parts.jpg",
    "solution-marketplace.jpg",
    "solution-auction.jpg",
    "solution-custom-software.jpg",
  ];
  const imageSources = await page
    .locator(".solution-card img")
    .evaluateAll((images) =>
      images.map((image) =>
        decodeURIComponent(image.getAttribute("src") ?? ""),
      ),
    );

  expect(imageSources).toHaveLength(expectedImages.length);
  expect(new Set(imageSources).size).toBe(expectedImages.length);

  for (const fileName of expectedImages) {
    expect(imageSources.some((source) => source.includes(fileName))).toBeTruthy();
  }
});
