import { formatArticleDate } from "@/lib/date";
import { markdownOptions } from "@/lib/markdown-options";
import ReactMarkdown from "react-markdown";
import type { Article } from "@/types";

interface ArticleBodyProps {
  article: Article;
}

// This is a server component: Markdown and highlighting are rendered into HTML at build time.
export function ArticleBody({ article }: ArticleBodyProps) {
  return (
    <>
      <header className="article-header mb-8">
        <time dateTime={article.date} className="text-body text-secondary block mb-2">
          {formatArticleDate(article.date)}
        </time>
        <h1>{article.title}</h1>
        {article.category && (
          <p className="text-body text-accent mt-2">{article.category}</p>
        )}
      </header>
      <div className="article-content">
        <ReactMarkdown
          {...markdownOptions}
          components={{
            table: ({ children }) => (
              <div className="article-table-scroll" tabIndex={0} role="region" aria-label="Таблица в статье">
                <table>{children}</table>
              </div>
            ),
          }}
        >
          {article.content}
        </ReactMarkdown>
      </div>
    </>
  );
}
