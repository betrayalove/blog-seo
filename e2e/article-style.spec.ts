import { test, expect } from "@playwright/test";

for (const theme of ["light", "dark"] as const) {
  for (const width of [390, 1440]) {
    test(`${theme} article remains readable and contained at ${width}px`, async ({ page, request }, testInfo) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.addInitScript((value) => localStorage.setItem("blog-seo-theme", value), theme);
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto("/blog/markdown-content-nextjs");
      await expect(page.getByRole("button", { name: /включить .* тему/i })).toHaveAttribute("data-theme", theme);
      await page.evaluate(() => document.fonts.ready);

      const styles = await page.evaluate(() => {
        const article = document.querySelector(".article-shell")!;
        const content = document.querySelector(".article-content")!;
        const heading = content.querySelector("h2")!;
        const paragraph = content.querySelector("p")!;
        const pre = content.querySelector("pre")!;
        const inline = content.querySelector("p code")!;
        const keyword = pre.querySelector(".hljs-keyword")!;
        const body = getComputedStyle(document.body);
        const preStyle = getComputedStyle(pre);
        const toRgb = (color: string) => (color.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
        const luminance = (color: string) => toRgb(color).map((channel) => {
          const value = channel / 255;
          return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
        }).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
        const contrast = (a: string, b: string) => {
          const values = [luminance(a), luminance(b)].sort((a, b) => b - a);
          return (values[0] + .05) / (values[1] + .05);
        };
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          width: article.getBoundingClientRect().width,
          gutter: parseFloat(getComputedStyle(article).paddingLeft),
          font: body.fontFamily,
          bodyColor: body.color,
          bodyBackground: body.backgroundColor,
          bodyContrast: contrast(body.color, body.backgroundColor),
          textLineHeight: parseFloat(getComputedStyle(paragraph).lineHeight),
          headingMargin: parseFloat(getComputedStyle(heading).marginTop),
          paragraphMargin: parseFloat(getComputedStyle(paragraph).marginTop),
          preBackground: preStyle.backgroundColor,
          preOverflow: preStyle.overflowX,
          preRadius: parseFloat(preStyle.borderRadius),
          inlineDisplay: getComputedStyle(inline).display,
          keywordColor: getComputedStyle(keyword).color,
          keywordContrast: contrast(getComputedStyle(keyword).color, preStyle.backgroundColor),
          codeColor: preStyle.color,
          listStyle: getComputedStyle(content.querySelector("table")!).borderCollapse,
        };
      });
      expect(styles.overflow).toBe(false);
      expect(styles.width).toBeLessThanOrEqual(Math.min(width, 900));
      expect(styles.gutter).toBe(width < 768 ? 16 : 32);
      expect(styles.font).toContain("Inter Variable");
      expect(styles.bodyBackground).toBe(theme === "light" ? "rgb(248, 250, 252)" : "rgb(2, 6, 23)");
      expect(styles.bodyContrast).toBeGreaterThanOrEqual(7);
      expect(styles.textLineHeight).toBeGreaterThanOrEqual(24);
      expect(styles.headingMargin).toBeGreaterThan(styles.paragraphMargin);
      expect(styles.preOverflow).toBe("auto");
      expect(styles.preRadius).toBeGreaterThanOrEqual(8);
      expect(styles.inlineDisplay).toBe("inline");
      expect(styles.keywordColor).not.toBe(styles.codeColor);
      expect(styles.keywordContrast).toBeGreaterThanOrEqual(4.5);
      expect(styles.listStyle).toBe("collapse");
      await expect(page.getByRole("region", { name: "Таблица в статье" })).toBeVisible();
      expect(errors).toEqual([]);

      // The colors are CSS-only: the server HTML already includes highlighted tokens.
      const html = await (await request.get("/blog/markdown-content-nextjs")).text();
      expect(html).toContain('class="hljs-keyword"');
      await page.screenshot({ path: testInfo.outputPath("article.png"), fullPage: true });

      await page.goto("/blog/context-api-react");
      await expect(page.locator(".article-content ul").first()).toBeVisible();
      const listStyle = await page.locator(".article-content ul").first().evaluate((element) => getComputedStyle(element).listStyleType);
      expect(listStyle).toBe("disc");
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);

      await page.goto("/");
      const cta = page.getByRole("link", { name: "Перейти в блог" });
      const ctaStyles = await cta.evaluate((element) => ({ color: getComputedStyle(element).color, background: getComputedStyle(element).backgroundColor, radius: getComputedStyle(element).borderRadius }));
      expect(ctaStyles).toEqual({ color: "rgb(255, 255, 255)", background: "rgb(37, 99, 235)", radius: "8px" });
      await page.screenshot({ path: testInfo.outputPath("home.png"), fullPage: true });
    });
  }
}
