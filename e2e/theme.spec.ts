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
    const after = before === "light" ? "dark" : "light";
    await expect(themeButton).toHaveAttribute("data-theme", after);
    await page.reload();
    await expect(themeButton).toHaveAttribute("data-theme", after);
    expect(await page.locator("html").evaluate((element) => element.classList.contains("dark"))).toBe(after === "dark");
  });
});
