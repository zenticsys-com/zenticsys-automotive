import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    channel: "chrome",
    headless: true,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "mobile-320", use: { viewport: { width: 320, height: 760 } } },
    { name: "tablet-768", use: { viewport: { width: 768, height: 900 } } },
    { name: "desktop-1024", use: { viewport: { width: 1024, height: 900 } } },
    { name: "desktop-wide", use: { viewport: { width: 1440, height: 1000 } } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
