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

test("keeps the header and page width stable while the menu locks scrolling", async ({
  page,
}) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const measureShell = () =>
    page.evaluate(() => {
      const headerElement =
        document.querySelector<HTMLElement>(".site-header__inner")!;
      const glassElement =
        document.querySelector<HTMLElement>(".site-header__glass")!;
      const header = headerElement.getBoundingClientRect();

      return {
        headerLeft: header.left,
        headerWidth: header.width,
        documentWidth: document.documentElement.clientWidth,
        gutter: getComputedStyle(document.documentElement).scrollbarGutter,
        rootOverflow: getComputedStyle(document.documentElement).overflowY,
        bodyOverflow: getComputedStyle(document.body).overflowY,
        headerBackground: getComputedStyle(glassElement).backgroundColor,
        headerBlur: getComputedStyle(glassElement).backdropFilter,
      };
    });

  const closed = await measureShell();
  expect(closed.gutter).toContain("stable");
  expect(closed.headerBlur).toContain("blur(28px)");
  expect(closed.headerBackground).toBe("rgba(5, 6, 7, 0.68)");

  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeVisible();
  await expect
    .poll(() =>
      page.locator(".menu-overlay").evaluate((element) =>
        getComputedStyle(element).backdropFilter,
      ),
    )
    .toContain("blur(28px)");
  const open = await measureShell();
  const overlayGlass = await page.locator(".menu-overlay").evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      background: styles.backgroundColor,
      blur: styles.backdropFilter,
    };
  });
  expect(open.headerBackground).toBe(overlayGlass.background);
  expect(open.headerBlur).toBe(overlayGlass.blur);
  expect(open.rootOverflow).toBe("hidden");
  expect(open.bodyOverflow).not.toBe("hidden");

  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(page.locator(".menu-motion-root")).toHaveCount(0);
  const closedAgain = await measureShell();
  expect(closedAgain.rootOverflow).toBe("auto");

  for (const measurement of [open, closedAgain]) {
    expect(Math.abs(measurement.headerLeft - closed.headerLeft)).toBeLessThan(1);
    expect(Math.abs(measurement.headerWidth - closed.headerWidth)).toBeLessThan(1);
    expect(measurement.documentWidth).toBe(closed.documentWidth);
  }
});

test("provides a static reduced-motion treatment", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const duration = await page.locator(".page-atmosphere__light").evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).animationDuration),
  );

  expect(duration).toBeLessThanOrEqual(0.001);
});
