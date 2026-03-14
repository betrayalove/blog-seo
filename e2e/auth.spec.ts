import { test, expect } from "@playwright/test";

test.describe("Mock-авторизация", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test("после «Войти» отображается имя «Пользователь»", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Войти" })).toBeVisible();
    await page.getByRole("button", { name: "Войти" }).click();
    await expect(page.getByText("Пользователь")).toBeVisible();
  });

  test("после «Выйти» отображается «Гость»", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Войти" }).click();
    await expect(page.getByText("Пользователь")).toBeVisible();
    await page.getByRole("button", { name: "Выйти" }).click();
    await expect(page.getByText("Гость")).toBeVisible();
  });
});
