import { expect, test } from "@playwright/test";

import {
  serviceEntries,
  solutionEntries,
} from "../src/content/solutions-services";

const collections = [
  {
    path: "/solutions",
    heading: "Digital products across the automotive journey.",
    entries: solutionEntries,
  },
  {
    path: "/services",
    heading: "The capabilities behind the product.",
    entries: serviceEntries,
  },
] as const;

test("serves both catalogues and every detail page in the initial HTML", async ({
  request,
}) => {
  for (const collection of collections) {
    const listingResponse = await request.get(collection.path);
    const listingHtml = await listingResponse.text();

    expect(listingResponse.ok()).toBeTruthy();
    expect(listingHtml).toContain(collection.heading);
    expect(listingHtml).toContain('"@type":"ItemList"');

    for (const entry of collection.entries) {
      const path = `${collection.path}/${entry.slug}`;
      expect(listingHtml).toContain(`href="${path}"`);

      const detailResponse = await request.get(path);
      const detailHtml = await detailResponse.text();

      expect(detailResponse.ok()).toBeTruthy();
      expect(detailHtml).toContain(entry.title);
      expect(detailHtml).toContain(entry.challengeTitle);
      expect(detailHtml).toContain('href="/request-a-proposal"');
      expect(detailHtml).toContain('"@type":"Service"');
      expect(detailHtml).toContain('"@type":"BreadcrumbList"');
      expect(detailHtml).toContain('"@type":"FAQPage"');
    }
  }
});

test("keeps the listing experience image-led, minimal, and correctly linked", async ({
  page,
}) => {
  for (const collection of collections) {
    await page.goto(collection.path);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      collection.heading,
    );
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.locator(".catalog-card")).toHaveCount(
      collection.entries.length,
    );

    const links = await page
      .locator(".catalog-card > a")
      .evaluateAll((elements) => elements.map((element) => element.getAttribute("href")));

    expect(links).toEqual(
      collection.entries.map((entry) => `${collection.path}/${entry.slug}`),
    );

    const jsonLd = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').textContent()) ??
        "{}",
    );
    expect(jsonLd["@type"]).toBe("ItemList");
    expect(jsonLd.itemListElement).toHaveLength(collection.entries.length);
  }
});

test("uses distinct service-specific stock imagery", async ({ page }) => {
  await page.goto("/services");

  const expectedImages = [
    "service-website-development.jpg",
    "service-custom-software.jpg",
    "service-ui-ux.jpg",
    "service-mobile-app-phone.jpg",
    "service-integrations.jpg",
  ];
  const imageSources = await page.locator(".catalog-card img").evaluateAll((images) =>
    images.map((image) => decodeURIComponent(image.getAttribute("src") ?? "")),
  );

  expect(imageSources).toHaveLength(expectedImages.length);
  expect(new Set(imageSources).size).toBe(expectedImages.length);

  for (const fileName of expectedImages) {
    expect(imageSources.some((source) => source.includes(fileName))).toBeTruthy();
  }
  expect(imageSources.some((source) => source.includes("solution-"))).toBeFalsy();
});

test("renders informative detail pages with unique metadata and structured content", async ({
  page,
}) => {
  const representativeEntries = [solutionEntries[0], serviceEntries[0]];

  for (const entry of representativeEntries) {
    const collection = entry.kind === "solution" ? "solutions" : "services";
    const path = `/${collection}/${entry.slug}`;
    await page.goto(path);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(entry.title);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(`${path.replaceAll("/", "\\/")}$`),
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      entry.summary,
    );
    await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toContainText(
      entry.listingTitle,
    );
    if (entry.kind === "solution") {
      await expect(page.locator(".detail-capability-grid article")).toHaveCount(
        entry.capabilities.length,
      );
      await expect(page.locator(".detail-workflow__track li")).toHaveCount(
        entry.workflow.length,
      );
      await expect(page.locator(".detail-page")).toHaveCount(1);
      await expect(page.locator(".service-detail-page")).toHaveCount(0);
    } else {
      await expect(page.locator(".service-deliverables__list article")).toHaveCount(
        entry.capabilities.length,
      );
      await expect(page.locator(".service-collaboration li")).toHaveCount(
        entry.process.length,
      );
      await expect(page.locator(".service-engagement__grid article")).toHaveCount(3);
      await expect(page.locator(".service-detail-page")).toHaveCount(1);
      await expect(page.locator(".detail-page")).toHaveCount(0);
    }
    await expect(page.locator(".detail-faq details")).toHaveCount(entry.faqs.length);
    await expect(
      page.getByRole("link", { name: /Request a Proposal/ }).last(),
    ).toHaveAttribute("href", "/request-a-proposal");

    const schemaTypes = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) =>
        scripts.map((script) => JSON.parse(script.textContent ?? "{}")["@type"]),
      );
    expect(schemaTypes).toEqual(["Service", "BreadcrumbList", "FAQPage"]);
  }
});

test("uses distinct product and delivery-partner narratives", async ({ page }) => {
  await page.goto("/solutions/dealership-websites");
  await expect(
    page.getByRole("heading", { level: 2, name: "A connected operational workflow" }),
  ).toBeVisible();
  await expect(page.locator(".product-concept")).toBeVisible();
  await expect(page.locator(".service-engagement")).toHaveCount(0);

  await page.goto("/services/automotive-website-development");
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "An engagement shaped around the decision or outcome.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Concrete work your team can use." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "The work should remain useful after delivery.",
    }),
  ).toBeVisible();
  await expect(page.locator(".service-output__status")).toBeVisible();
  await expect(page.locator(".product-concept")).toHaveCount(0);
});

test("keeps listings and detail editorial layouts inside every target viewport", async ({
  page,
}) => {
  for (const path of [
    "/solutions",
    "/solutions/fleet-management",
    "/services",
    "/services/custom-software-development",
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
