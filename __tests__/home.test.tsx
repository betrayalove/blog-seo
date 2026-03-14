import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/Hero";
import { ArticlePreview } from "@/components/ArticlePreview";
import { CTA } from "@/components/CTA";
import type { ArticleMeta } from "@/types";

const MOCK_ARTICLES: ArticleMeta[] = [
  {
    slug: "test-slug",
    title: "Тестовая статья",
    description: "Описание",
    date: "2024-01-15",
    excerpt: "Отрывок текста",
  },
];

describe("Главная страница", () => {
  it("рендерит hero-блок с заголовком и описанием", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { name: /блог с упором на seo/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/статьи о next\.js, typescript, tailwind/i)
    ).toBeInTheDocument();
  });

  it("рендерит блок последних статей с карточками", () => {
    render(
      <>
        <Hero />
        {MOCK_ARTICLES.map((a) => (
          <ArticlePreview key={a.slug} article={a} />
        ))}
        <CTA />
      </>
    );
    expect(screen.getByText("Тестовая статья")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /тестовая статья/i })).toHaveAttribute(
      "href",
      "/blog/test-slug"
    );
    expect(screen.getByRole("link", { name: /перейти в блог/i })).toHaveAttribute(
      "href",
      "/blog"
    );
  });
});
