import { expect, test } from "@playwright/test";

test("keeps approved public content available before CMS configuration", async ({ request }) => {
  for (const [path, text] of [
    ["/", "We build the digital systems that keep automotive businesses moving."],
    ["/solutions", "Digital products across the automotive journey."],
    ["/services", "The capabilities behind the product."],
    ["/case-studies", "CarVu"],
    ["/insights", "Practical thinking for what comes next."],
  ]) {
    const response = await request.get(path);
    expect(response.ok()).toBeTruthy();
    expect(await response.text()).toContain(text);
  }
});

test("explains incomplete CMS setup without exposing a broken admin", async ({ request }) => {
  const admin = await request.get("/admin");
  expect(admin.ok()).toBeTruthy();
  expect(await admin.text()).toContain("CMS setup pending");

  const api = await request.get("/cms-api/solutions");
  expect(api.status()).toBe(503);
  await expect(api.json()).resolves.toMatchObject({ error: expect.stringContaining("CMS setup is incomplete") });
});

test("publishes CMS-backed routes as crawlable server HTML", async ({ request }) => {
  const detail = await request.get("/solutions/dealership-websites");
  const html = await detail.text();
  expect(detail.ok()).toBeTruthy();
  expect(html).toContain("Dealership websites built around inventory and enquiries");
  expect(html).toContain('rel="canonical"');
  expect(html).not.toContain("CMS setup pending");
});
