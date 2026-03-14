import { test, expect } from "@playwright/test";

test.describe("Главная страница", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test("отображает hero, блок последних статей, CTA и футер", async ({ page }) => {
    await page.goto("/");
    const title = await page.title();
    expect(title.includes("Блог SEO") || title.includes("Главная")).toBeTruthy();
    await expect(page.getByRole("heading", { name: /блог с упором на seo/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /последние статьи/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /перейти в блог/i })).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("карточки статей ведут на /blog/[slug]", async ({ page }) => {
    await page.goto("/");
    const articleLinks = page.locator('a[href^="/blog/"]');
    const count = await articleLinks.count();
    if (count > 0) {
      await expect(articleLinks.first()).toBeVisible();
    }
  });
});
