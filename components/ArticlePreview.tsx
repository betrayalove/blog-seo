import { formatArticleDate } from "@/lib/date";
import Link from "next/link";
import type { ArticleMeta } from "@/types";

interface ArticlePreviewProps {
  article: ArticleMeta;
}


export function ArticlePreview({ article }: ArticlePreviewProps) {
  return (
    <article className="rounded-card bg-surface-light dark:bg-surface-dark p-4 sm:p-6 shadow-card dark:shadow-card-dark transition-shadow hover:shadow-lg dark:hover:shadow-lg">
      <time dateTime={article.date} className="text-body text-secondary block mb-1">
        {formatArticleDate(article.date)}
      </time>
      <h2 className="mb-2">
        <Link
          href={`/blog/${article.slug}`}
          className="text-h2 text-primary hover:underline dark:text-primary"
        >
          {article.title}
        </Link>
      </h2>
      <p className="text-body text-secondary line-clamp-2">
        {article.excerpt ?? article.description}
      </p>
      <Link
        href={`/blog/${article.slug}`}
        aria-label={`Читать статью «${article.title}»`}
        className="mt-2 inline-block text-body font-medium text-primary hover:underline"
      >
        Читать далее →
      </Link>
    </article>
  );
}
