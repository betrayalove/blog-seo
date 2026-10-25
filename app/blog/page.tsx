import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getAllArticles } from "@/lib/markdown";
import { ArticlePreview } from "@/components/ArticlePreview";
import { EmptyState } from "@/components/EmptyState";

export const metadata: Metadata = pageMetadata("/blog", "Блог", "Список всех статей блога: Next.js, TypeScript, Tailwind, SEO.");

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="py-4 sm:py-6">
      <div className="mx-auto max-w-container px-4 sm:px-6">
        <h1 className="mb-4 sm:mb-6">Блог</h1>
        {articles.length === 0 ? (
          <EmptyState
            title="Статей пока нет"
            description="Добавьте markdown-файлы в папку content/."
          />
        ) : (
          <ul className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
            {articles.map((article) => (
              <li key={article.slug}>
                <ArticlePreview article={article} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
