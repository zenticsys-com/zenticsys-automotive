import { expect, test } from "@playwright/test";

test("keeps motion-enhanced content crawlable in the initial response", async ({
  request,
}) => {
  const response = await request.get("/");
  const html = await response.text();

  expect(response.ok()).toBeTruthy();
  expect(html).toContain('data-scroll-behavior="smooth"');
  expect(html).toContain('data-atmosphere="amber"');
  expect(html).toContain("Built around how automotive businesses actually work.");
  expect(html).not.toMatch(/motion-reveal[^>]+opacity:\s*0/);
});

test("changes the fixed atmosphere palette as sections become active", async ({
  page,
}) => {
  await page.goto("/");
  const atmosphere = page.locator(".page-atmosphere");

  await expect(atmosphere).toHaveAttribute("data-palette", "brand");

  await page.locator(".audience-section").scrollIntoViewIfNeeded();
  await expect(atmosphere).toHaveAttribute("data-palette", "amber");

  await page.locator(".insights-section").scrollIntoViewIfNeeded();
  await expect(atmosphere).toHaveAttribute("data-palette", "teal");
});

test("runs the Schedule Call perimeter highlight above the button surface", async ({
  page,
}) => {
  await page.goto("/");
  const button = page.locator(".running-border-cta").first();

  const firstFrame = await button.evaluate((element) => {
    const style = getComputedStyle(element, "::before");
    return {
      animationName: style.animationName,
      backgroundImage: style.backgroundImage,
      zIndex: style.zIndex,
    };
  });

  await page.waitForTimeout(120);

  const secondFrame = await button.evaluate(
    (element) => getComputedStyle(element, "::before").backgroundImage,
  );

  expect(firstFrame.animationName).toBe("border-travel");
  expect(firstFrame.zIndex).toBe("0");
  expect(secondFrame).not.toBe(firstFrame.backgroundImage);
});

test("keeps the semantic hero text separate from decorative SVG motion", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.locator(".hero-route-morph")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  await expect(page.locator(".hero-route-morph path")).toHaveCount(1);
});

test("retains the menu during its reverse close choreography", async ({ page }) => {
  await page.goto("/");

  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "Site navigation" });
  await expect(dialog).toBeVisible();
  await page.getByRole("button", { name: "Close menu" }).click();

  await expect(dialog).toBeAttached();
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("hydrates without application-generated mismatch warnings", async ({ page }) => {
  const hydrationWarnings: string[] = [];
  page.on("console", (message) => {
    if (message.text().toLowerCase().includes("hydration")) {
      hydrationWarnings.push(message.text());
    }
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  expect(hydrationWarnings).toEqual([]);
});
