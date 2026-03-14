import { test, expect } from "@playwright/test";

test.describe("Страница блога", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test("отображает заголовок и список статей или пустое состояние", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByRole("heading", { level: 1, name: "Блог" })).toBeVisible();
    const hasList = await page.locator("ul").first().isVisible().catch(() => false);
    const hasEmpty = await page.getByText(/статей пока нет/i).isVisible().catch(() => false);
    expect(hasList || hasEmpty).toBeTruthy();
  });

  test("переход по ссылке статьи открывает страницу с article и блоком «Читать ещё»", async ({
    page,
  }) => {
    await page.goto("/blog");
    const articleLink = page.locator('a[href^="/blog/"]').first();
    const visible = await articleLink.isVisible().catch(() => false);
    if (!visible) {
      test.skip();
      return;
    }
    const href = await articleLink.getAttribute("href");
    await articleLink.click();
    await expect(page).toHaveURL(new RegExp(href!.replace("/", "\\/")));
    await expect(page.locator("article")).toBeVisible();
    await expect(page.getByRole("heading", { name: /читать ещё/i })).toBeVisible();
  });
});
