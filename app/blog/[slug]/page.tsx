import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getAllArticles } from "@/lib/markdown";
import { ArticleBody } from "@/components/ArticleBody";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Статья не найдена" };
  return {
    title: article.title,
    description: article.description || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.description || article.excerpt,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: article.title }],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const allArticles = getAllArticles();
  const others = allArticles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div className="py-4 sm:py-6">
      <article className="mx-auto max-w-container px-4 sm:px-6">
        <ArticleBody article={article} />
      </article>

      {others.length > 0 && (
        <section className="mt-8 mx-auto max-w-container px-4 sm:px-6" aria-labelledby="read-more-heading">
          <h2 id="read-more-heading" className="mb-4">Читать ещё</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
            {others.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/blog/${a.slug}`}
                  className="block rounded-card bg-surface-light dark:bg-surface-dark p-4 shadow-card dark:shadow-card-dark hover:shadow-lg transition-shadow"
                >
                  <span className="text-body font-medium text-primary hover:underline">
                    {a.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
