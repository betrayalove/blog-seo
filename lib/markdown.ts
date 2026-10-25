import matter from "gray-matter";
import fs from "fs";
import path from "path";
import type { Article, ArticleMeta } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function markdownExcerpt(markdown: string, length = 160): string {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/^\s{0,3}(?:#{1,6}\s+|>\s*|[-*+]\s+|\d+\.\s+)/gm, "")
    .replace(/[`*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= length) return plain;
  const prefix = plain.slice(0, length);
  const boundary = prefix.lastIndexOf(" ");
  return `${prefix.slice(0, boundary > 0 ? boundary : length).trimEnd()}…`;
}

export function getArticleBySlug(slug: string): Article | null {
  // Only file slugs are accepted; URL input must never escape content/.
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  const fullPath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    excerpt: markdownExcerpt(data.excerpt ?? content),
    category: data.category,
    content,
  };
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => getArticleBySlug(file.replace(/\.md$/, "")))
    .filter((article): article is Article => article !== null)
    .map(({ content: _content, ...article }) => article)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}
