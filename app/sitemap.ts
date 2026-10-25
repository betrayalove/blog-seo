import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/markdown";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["/", "/blog", "/about", "/contacts"].map((path) => ({ url: absoluteUrl(path) })),
    ...getAllArticles().map((article) => ({ url: absoluteUrl(`/blog/${article.slug}`) })),
  ];
}
