import matter from "gray-matter";
import fs from "fs";
import path from "path";
import type { Article, ArticleMeta } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getArticleBySlug(slug: string): Article | null {
  const fullPath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    excerpt: data.excerpt ?? content.slice(0, 160),
    category: data.category,
    content,
  };
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const articles: ArticleMeta[] = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(CONTENT_DIR, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      title: data.title ?? "",
      description: data.description ?? "",
      date: data.date ?? "",
      excerpt: data.excerpt ?? content.slice(0, 160),
      category: data.category,
    };
  });
  articles.sort((a, b) => (b.date > a.date ? 1 : -1));
  return articles;
}
