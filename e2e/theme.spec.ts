import { test, expect } from "@playwright/test";

test.describe("Переключатель темы", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test("кнопка темы меняет data-theme после клика", async ({ page }) => {
    await page.goto("/");
    const themeButton = page.getByRole("button", {
      name: /включить (светлую|тёмную) тему/i,
    });
    await expect(themeButton).toBeVisible();
    const before = await themeButton.getAttribute("data-theme");
    await themeButton.click();
    await expect(themeButton).toHaveAttribute("data-theme", before === "light" ? "dark" : "light");
  });
});
