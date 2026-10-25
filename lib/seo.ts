import type { Metadata } from "next";
import type { ArticleMeta } from "@/types";

// Preview deployments should canonicalize to the public production site.
export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://blog-seo-swart.vercel.app",
).origin;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

export function absoluteUrl(path: string): string {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      siteName: "Блог SEO",
      url,
      title,
      description,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Блог SEO" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] },
  };
}

export function articleJsonLd(article: ArticleMeta) {
  const url = absoluteUrl(`/blog/${article.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description || article.excerpt,
    datePublished: article.date,
    inLanguage: "ru-RU",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: DEFAULT_OG_IMAGE,
    author: { "@type": "Person", name: "betrayalove", url: "https://github.com/betrayalove" },
  };
}

// A title containing </script> must never break out of the JSON-LD script.
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
