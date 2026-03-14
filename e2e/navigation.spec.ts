import { test, expect } from "@playwright/test";

test.describe("Навигация по хедеру", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test("Блог → главная → О проекте → Контакты по ссылкам в хедере", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation", { name: "Основная навигация" }).getByRole("link", { name: "Блог" }).click();
    await expect(page).toHaveURL(/\/blog/);
    await expect(page.getByRole("heading", { level: 1, name: "Блог" })).toBeVisible();

    await page.getByRole("link", { name: "Блог SEO" }).click();
    await expect(page).toHaveURL("/");

    const nav = page.getByRole("navigation", { name: "Основная навигация" });
    await nav.getByRole("link", { name: "О проекте" }).click();
    await expect(page).toHaveURL("/about");
    await expect(page.getByRole("heading", { name: /о проекте/i })).toBeVisible();

    await nav.getByRole("link", { name: "Контакты" }).click();
    await expect(page).toHaveURL("/contacts");
    await expect(page.getByRole("heading", { name: /контакты/i })).toBeVisible();
  });
});
