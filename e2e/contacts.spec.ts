import { test, expect } from "@playwright/test";

test.describe("Страница «Контакты»", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test("отображает заголовок «Контакты»", async ({ page }) => {
    await page.goto("/contacts");
    await expect(page.getByRole("heading", { name: /контакты/i })).toBeVisible();
  });
});
