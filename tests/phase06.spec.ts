import { expect, test } from "@playwright/test";

test("serves conversion content and forms in the initial HTML", async ({ request }) => {
  const proposal = await request.get("/request-a-proposal");
  const contact = await request.get("/contact");
  const schedule = await request.get("/schedule-a-call");

  expect(proposal.ok()).toBeTruthy();
  expect(await proposal.text()).toContain("What are we building?");
  expect(await proposal.text()).toContain('name="kind" value="proposal"');
  expect(contact.ok()).toBeTruthy();
  expect(await contact.text()).toContain("What would you like to discuss?");
  expect(await contact.text()).toContain('name="kind" value="message"');
  expect(schedule.ok()).toBeTruthy();
  expect(await schedule.text()).toContain("Google Meet");
});

test("publishes unique conversion metadata and canonical URLs", async ({ page }) => {
  for (const [path, title] of [
    ["/request-a-proposal", "Request an Automotive Project Proposal"],
    ["/schedule-a-call", "Schedule an Automotive Project Call"],
    ["/contact", "Contact Zenticsys"],
    ["/privacy", "Privacy Notice"],
  ]) {
    await page.goto(path);
    await expect(page).toHaveTitle(new RegExp(title));
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${path}$`));
    await expect(page.locator("h1")).toHaveCount(1);
  }
});

test("guides a proposal through conditional steps and a success state", async ({ page }) => {
  await page.route("**/api/enquiries", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, referenceId: "test-reference" }),
    });
  });
  await page.goto("/request-a-proposal");

  await page.getByText("Fleet management system", { exact: true }).click();
  await page.getByRole("button", { name: /continue/i }).click();
  await page.getByLabel("Business or organisation name").fill("Example Fleet Group");
  await page.getByLabel("What kind of automotive business is it?").fill("Commercial fleet operator");
  await page.getByRole("button", { name: /continue/i }).click();
  await expect(page.getByText("Which fleet operations matter most?")).toBeVisible();
  await page.getByLabel("What is the main goal or problem to solve?").fill("Connect maintenance, vehicle, and driver operations in one system.");
  await page.getByText("Maintenance", { exact: true }).click();
  await page.getByRole("button", { name: /continue/i }).click();
  await page.getByText("3–6 months", { exact: true }).click();
  await page.getByText("$25,000–$50,000", { exact: true }).click();
  await page.getByRole("button", { name: /continue/i }).click();
  await page.getByLabel("Your name").fill("Amina Rahman");
  await page.getByLabel("Work email").fill("amina@example.com");
  await page.getByLabel(/I agree that Zenticsys/).check();
  await page.getByRole("button", { name: /send proposal request/i }).click();

  await expect(page.getByText("Proposal received")).toBeVisible();
  await expect(page.getByText("test-reference")).toBeVisible();
});

test("keeps proposal validation on the current step", async ({ page }) => {
  await page.goto("/request-a-proposal");
  await page.getByRole("button", { name: /continue/i }).click();
  await expect(page.getByRole("heading", { name: "What are we building?" })).toBeVisible();
  await expect(page.getByLabel("Dealership website")).toBeFocused();
});

test("renders contact failure feedback without losing the form", async ({ page }) => {
  await page.route("**/api/enquiries", async (route) => {
    await route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ message: "Delivery is unavailable for this test." }) });
  });
  await page.goto("/contact");
  await page.getByLabel("Your name").fill("Amina Rahman");
  await page.getByLabel("Work email").fill("amina@example.com");
  await page.getByLabel("Subject").fill("Dealer platform");
  await page.getByLabel("How can we help?").fill("We need to replace a legacy dealer operations platform.");
  await page.getByLabel(/I agree that Zenticsys/).check();
  await page.getByRole("button", { name: /send message/i }).click();
  await expect(page.locator(".form-alert")).toContainText("Delivery is unavailable");
  await expect(page.getByLabel("Subject")).toHaveValue("Dealer platform");
});

test("rejects incomplete submissions at the server boundary", async ({ request }) => {
  const response = await request.post("/api/enquiries", {
    multipart: { kind: "message", name: "", email: "invalid", subject: "", message: "" },
  });
  expect(response.status()).toBe(400);
  const result = await response.json();
  expect(result.errors.email).toBeTruthy();
  expect(result.errors.message).toBeTruthy();
});

test("keeps conversion pages inside the viewport", async ({ page }) => {
  for (const path of ["/request-a-proposal", "/schedule-a-call", "/contact", "/privacy"]) {
    await page.goto(path);
    const widths = await page.evaluate(() => ({ body: document.body.scrollWidth, viewport: document.documentElement.clientWidth }));
    expect(widths.body).toBeLessThanOrEqual(widths.viewport + 1);
  }
});
