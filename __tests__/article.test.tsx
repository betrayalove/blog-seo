import { render, screen } from "@testing-library/react";
import { ArticleBody } from "@/components/ArticleBody";
import type { Article } from "@/types";

jest.mock("@/lib/markdown-options", () => ({ markdownOptions: { skipHtml: true } }));

jest.mock("react-markdown", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: ({ children }: { children: string }) => React.createElement("div", null, children),
  };
});

const MOCK_ARTICLE: Article = {
  slug: "test-article",
  title: "Заголовок статьи",
  description: "Описание",
  date: "2024-03-15",
  excerpt: "Краткое описание",
  category: "Разработка",
  content: "Первый параграф статьи.\n\nВторой параграф с **жирным** текстом.",
};

describe("Страница статьи", () => {
  it("отображает заголовок и контент статьи", () => {
    render(
      <article>
        <ArticleBody article={MOCK_ARTICLE} />
      </article>
    );
    expect(
      screen.getByRole("heading", { name: /заголовок статьи/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/первый параграф статьи/i)).toBeInTheDocument();
    expect(screen.getByText(/второй параграф/i)).toBeInTheDocument();
  });
});
