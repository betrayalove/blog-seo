import { render, screen } from "@testing-library/react";
import { ArticlePreview } from "@/components/ArticlePreview";
import { EmptyState } from "@/components/EmptyState";
import type { ArticleMeta } from "@/types";

const MOCK_ARTICLES: ArticleMeta[] = [
  { slug: "first", title: "Первая статья", description: "Описание 1", date: "2024-01-01", excerpt: "Отрывок 1" },
  { slug: "second", title: "Вторая статья", description: "Описание 2", date: "2024-01-02", excerpt: "Отрывок 2" },
];

describe("Страница блога", () => {
  it("показывает список статей с превью и ссылками", () => {
    render(
      <ul>
        {MOCK_ARTICLES.map((a) => (
          <li key={a.slug}>
            <ArticlePreview article={a} />
          </li>
        ))}
      </ul>
    );
    expect(screen.getByText("Первая статья")).toBeInTheDocument();
    expect(screen.getByText("Вторая статья")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^первая статья$/i })).toHaveAttribute("href", "/blog/first");
    expect(screen.getByRole("link", { name: /^вторая статья$/i })).toHaveAttribute("href", "/blog/second");
  });

  it("пустое состояние отображает заголовок и описание", () => {
    render(<EmptyState title="Статей пока нет" description="Добавьте markdown в content/." />);
    expect(screen.getByText("Статей пока нет")).toBeInTheDocument();
    expect(screen.getByText(/добавьте markdown/i)).toBeInTheDocument();
  });
});
