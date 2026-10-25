import { test, expect } from "@playwright/test";

const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://blog-seo-swart.vercel.app";

test("each public page exposes its canonical URL and a reachable preview image", async ({ page, request }) => {
  for (const path of ["/", "/blog", "/about", "/contacts", "/blog/seo-metadata-nextjs"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    const url = path === "/" ? new URL(origin).origin : new URL(path, origin).href;
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", url);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", url);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", `${origin}/og-default.png`);
  }
  const image = await request.get("/og-default.png");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  expect((await image.body()).subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
});

test("article HTML includes dates and matching structured data", async ({ page }) => {
  await page.goto("/blog/seo-metadata-nextjs");
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
  await expect(page.locator('meta[property="article:published_time"]')).toHaveAttribute("content", "2024-03-20");
  const json = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  expect(json["@type"]).toBe("BlogPosting");
  expect(json.headline).toBe(await page.locator("h1").innerText());
  expect(json.mainEntityOfPage["@id"]).toBe(`${origin}/blog/seo-metadata-nextjs`);
  const missing = await page.goto("/blog/missing-article");
  expect(missing?.status()).toBe(404);
});

test("robots and sitemap refer to the public origin and include every article", async ({ request, page }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain(`Sitemap: ${origin}/sitemap.xml`);
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();
  expect(xml).not.toContain("localhost");
  await page.goto("/blog");
  const links = await page.locator('h2 a[href^="/blog/"]').evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")));
  expect(links.length).toBeGreaterThan(0);
  for (const path of links) expect(xml).toContain(`${origin}${path}`);
});

test("article links have unique names and mock login does not pretend to create a session", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("link", { name: "Читать статью «SEO и метаданные в Next.js»" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Войти" })).toHaveAccessibleDescription(/Демонстрационный вход/);
  await page.getByRole("button", { name: "Войти" }).click();
  await expect(page.getByText("Пользователь", { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("button", { name: "Войти" })).toBeVisible();
});
