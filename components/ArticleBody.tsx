import ReactMarkdown from "react-markdown";
import type { Article } from "@/types";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

interface ArticleBodyProps {
  article: Article;
}

export function ArticleBody({ article }: ArticleBodyProps) {
  return (
    <>
      <header className="mb-4 sm:mb-6">
        <time dateTime={article.date} className="text-body text-secondary block mb-1">
          {formatDate(article.date)}
        </time>
        <h1>{article.title}</h1>
        {article.category && (
          <p className="text-body text-secondary mt-1">{article.category}</p>
        )}
      </header>
      <div className="article-content prose prose-slate dark:prose-invert max-w-none text-body text-secondary [&>p]:mb-3 [&>h2]:mt-6 [&>h2]:mb-2 [&>h3]:mt-4 [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-6 [&>pre]:rounded-card [&>pre]:p-4 [&>pre]:bg-secondary/10 [&>pre]:overflow-x-auto [&>code]:rounded [&>code]:px-1 [&>code]:bg-secondary/10">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
    </>
  );
}
