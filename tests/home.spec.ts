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

test("keeps editorial imagery decorative and meaningful visuals labelled", async ({
  page,
}) => {
  const fillPositionWarnings: string[] = [];
  page.on("console", (message) => {
    if (
      message.text().includes('has "fill" and parent element with invalid "position"')
    ) {
      fillPositionWarnings.push(message.text());
    }
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const images = page.locator("main img");
  const imageCount = await images.count();

  expect(imageCount).toBeGreaterThan(0);
  for (let index = 0; index < imageCount; index += 1) {
    await expect(images.nth(index)).toHaveAttribute("alt", "");
  }

  await expect(
    page.getByText("One industry, connected at every turn."),
  ).toBeAttached();
  await expect(page.locator(".journey-road")).toHaveAttribute("aria-hidden", "true");

  await expect(
    page.getByLabel("Representative CarVu workflow interface illustration"),
  ).toBeAttached();
  expect(fillPositionWarnings).toEqual([]);
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

test("separates operation imagery and presentation from solution cards", async ({
  page,
}) => {
  await page.goto("/");

  const operationSources = await page
    .locator(".audience-stage img")
    .evaluateAll((images) =>
      images.map((image) => decodeURIComponent(image.getAttribute("src") ?? "")),
    );
  const solutionSources = await page
    .locator(".solution-card img")
    .evaluateAll((images) =>
      images.map((image) => decodeURIComponent(image.getAttribute("src") ?? "")),
    );
  const journeySources = await page
    .locator(".journey-station img")
    .evaluateAll((images) =>
      images.map((image) => decodeURIComponent(image.getAttribute("src") ?? "")),
    );

  expect(operationSources).toHaveLength(6);
  expect(new Set(operationSources).size).toBe(6);
  expect(operationSources.every((source) => source.includes("operation-"))).toBeTruthy();
  expect(operationSources.some((source) => solutionSources.includes(source))).toBeFalsy();
  expect(journeySources).toHaveLength(4);
  expect(new Set(journeySources).size).toBe(4);
  expect(journeySources.every((source) => source.includes("journey-"))).toBeTruthy();
  expect(journeySources.some((source) => operationSources.includes(source))).toBeFalsy();
  expect(journeySources.some((source) => solutionSources.includes(source))).toBeFalsy();

  const journeyGeometry = await page
    .locator(".journey-station")
    .evaluateAll((stations) =>
      stations.map((station) => {
        const bounds = station.getBoundingClientRect();
        const surface = station.querySelector<HTMLElement>(".journey-station__surface");
        const styles = window.getComputedStyle(surface!);

        return {
          left: Math.round(bounds.left),
          right: Math.round(bounds.right),
          width: Math.round(bounds.width),
          height: Math.round(bounds.height),
          radii: [
            parseFloat(styles.borderTopLeftRadius),
            parseFloat(styles.borderTopRightRadius),
            parseFloat(styles.borderBottomRightRadius),
            parseFloat(styles.borderBottomLeftRadius),
          ],
        };
      }),
    );

  expect(new Set(journeyGeometry.map(({ width }) => width)).size).toBe(1);
  expect(new Set(journeyGeometry.map(({ height }) => height)).size).toBe(1);
  const journeyGaps = journeyGeometry.slice(0, -1).map(
    ({ right }, index) => journeyGeometry[index + 1].left - right,
  );
  expect(Math.max(...journeyGaps) - Math.min(...journeyGaps)).toBeLessThanOrEqual(1);
  expect(journeyGeometry[0].radii[3]).toBeGreaterThan(journeyGeometry[0].radii[0]);
  expect(journeyGeometry[1].radii[0]).toBeGreaterThan(journeyGeometry[1].radii[1]);
  expect(journeyGeometry[1].radii[2]).toBeGreaterThan(journeyGeometry[1].radii[3]);
  expect(journeyGeometry[2].radii[1]).toBeGreaterThan(journeyGeometry[2].radii[0]);
  expect(journeyGeometry[2].radii[3]).toBeGreaterThan(journeyGeometry[2].radii[2]);
  expect(journeyGeometry[3].radii[1]).toBeGreaterThan(journeyGeometry[3].radii[0]);

  await page.waitForLoadState("networkidle");
  const fleetSelector = page.locator(".audience-selector__item").nth(1);
  await fleetSelector.focus();
  await expect(fleetSelector).toHaveClass(/is-active/);
  await expect(page.locator(".audience-stage img").nth(1)).toHaveClass(/is-active/);
});
