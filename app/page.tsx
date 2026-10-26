import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getAllArticles } from "@/lib/markdown";
import { Hero } from "@/components/Hero";
import { ArticlePreview } from "@/components/ArticlePreview";
import { CTA } from "@/components/CTA";
import Link from "next/link";

export const metadata: Metadata = pageMetadata("/", "Главная", "Главная страница блога о Next.js, TypeScript и SEO. Последние статьи и призыв к действию.");

const LATEST_COUNT = 5;

export default function HomePage() {
  const articles = getAllArticles().slice(0, LATEST_COUNT);

  return (
    <>
      <Hero />
      <section className="py-8 sm:py-12" aria-labelledby="latest-heading">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <h2 id="latest-heading" className="mb-4 sm:mb-6">
            Последние статьи
          </h2>
          {articles.length === 0 ? (
            <p className="text-body text-secondary">
              Пока нет статей. Добавьте markdown-файлы в папку <code className="rounded bg-muted px-1">content/</code>.
            </p>
          ) : (
            <ul className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
              {articles.map((article) => (
                <li key={article.slug}>
                  <ArticlePreview article={article} />
                </li>
              ))}
            </ul>
          )}
          {articles.length > 0 && (
            <p className="mt-4">
              <Link
                href="/blog"
                className="text-body font-medium text-link hover:underline"
              >
                Все статьи →
              </Link>
            </p>
          )}
        </div>
      </section>
      <CTA />
    </>
  );
}
