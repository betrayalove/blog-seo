import { test, expect } from "@playwright/test";

test.describe("Страница блога", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test("отображает заголовок и список опубликованных статей", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByRole("heading", { level: 1, name: "Блог" })).toBeVisible();
    await expect(page.locator("main article")).toHaveCount(5);
    await expect(page.getByRole("link", { name: "SEO и метаданные в Next.js", exact: true })).toBeVisible();
  });

  test("переход по ссылке статьи открывает страницу с article и блоком «Читать ещё»", async ({
    page,
  }) => {
    await page.goto("/blog");
    const articleLink = page.locator('a[href^="/blog/"]').first();
    await expect(articleLink).toBeVisible();
    const href = await articleLink.getAttribute("href");
    await articleLink.click();
    await expect(page).toHaveURL(new RegExp(href!.replace("/", "\\/")));
    await expect(page.locator("article")).toBeVisible();
    await expect(page.getByRole("heading", { name: /читать ещё/i })).toBeVisible();
  });
});
