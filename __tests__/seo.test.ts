/** @jest-environment node */
import { absoluteUrl, articleJsonLd, pageMetadata, serializeJsonLd, SITE_URL } from "@/lib/seo";
import { getAllArticles, getArticleBySlug, markdownExcerpt } from "@/lib/markdown";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { formatArticleDate } from "@/lib/date";

describe("Production SEO", () => {
  it("uses the public origin and a page-specific canonical and OG URL", () => {
    expect(SITE_URL).toBe("https://blog-seo-swart.vercel.app");
    const metadata = pageMetadata("/about", "О проекте", "Описание");
    expect(metadata.alternates?.canonical).toBe(absoluteUrl("/about"));
    expect(metadata.openGraph).toMatchObject({ url: absoluteUrl("/about") });
  });

  it("lists every public article once in the sitemap and links it from robots", () => {
    const entries = sitemap().map((entry) => entry.url);
    expect(new Set(entries).size).toBe(entries.length);
    for (const article of getAllArticles()) {
      expect(entries).toContain(absoluteUrl(`/blog/${article.slug}`));
    }
    expect(entries).toHaveLength(getAllArticles().length + 4);
    expect(robots().sitemap).toBe(absoluteUrl("/sitemap.xml"));
  });

  it("emits article structured data and escapes unsafe script content", () => {
    const article = getArticleBySlug("seo-metadata-nextjs")!;
    expect(articleJsonLd(article)).toMatchObject({
      "@type": "BlogPosting", headline: article.title, datePublished: article.date,
      url: absoluteUrl(`/blog/${article.slug}`),
    });
    const value = { headline: "</script><script>alert(1)</script>" };
    const serialized = serializeJsonLd(value);
    expect(serialized).not.toContain("<");
    expect(JSON.parse(serialized)).toEqual(value);
  });
});

describe("Markdown loading", () => {
  it("rejects traversal rather than reading files outside content", () => {
    expect(getArticleBySlug("../README")).toBeNull();
    expect(getArticleBySlug("missing-article")).toBeNull();
  });

  it("makes readable excerpts without Markdown syntax, URLs or code blocks", () => {
    const text = "## Title\n\n**Bold** and `code` [link](https://example.com).\n```js\nalert(1)\n```\n![alt](image.png)";
    expect(markdownExcerpt(text)).toBe("Title Bold and code link.");
    expect(markdownExcerpt("One two three four", 13)).toBe("One two…");
    expect(getAllArticles().every((article) => !article.excerpt?.includes("##"))).toBe(true);
  });
});

describe("Editorial dates", () => {
  it("preserves the publication day and handles invalid content safely", () => {
    expect(formatArticleDate("2024-03-20")).toBe("20 марта 2024 г.");
    expect(formatArticleDate("invalid")).toBe("invalid");
    expect(formatArticleDate("")).toBe("");
  });
});
