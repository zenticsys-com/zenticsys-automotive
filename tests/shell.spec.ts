import { expect, test } from "@playwright/test";

test("renders crawlable navigation and stays within the viewport", async ({
  page,
  request,
}) => {
  const response = await request.get("/");
  const html = await response.text();

  expect(response.ok()).toBeTruthy();
  expect(html).toContain('href="/solutions"');
  expect(html).toContain('href="/case-studies"');
  expect(html).toContain('href="/schedule-a-call"');

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
});

test("supports keyboard open, focus containment, Escape, and focus return", async ({
  page,
}) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const trigger = page.getByRole("button", { name: "Open menu" });
  const dialog = page.getByRole("dialog", { name: "Site navigation" });

  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(dialog).toBeVisible();

  for (let index = 0; index < 12; index += 1) {
    await page.keyboard.press("Tab");
    const focusIsInside = await dialog.evaluate((element) =>
      element.contains(document.activeElement),
    );
    expect(focusIsInside).toBeTruthy();
  }

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("provides a static reduced-motion treatment", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const duration = await page.locator(".page-atmosphere__light").evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).animationDuration),
  );

  expect(duration).toBeLessThanOrEqual(0.001);
});
