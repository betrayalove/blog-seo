import { test, expect } from "@playwright/test";

test.describe("Страница «О проекте»", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test("отображает заголовок «О проекте»", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { name: /о проекте/i })).toBeVisible();
  });
});
