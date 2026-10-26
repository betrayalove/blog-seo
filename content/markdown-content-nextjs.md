---
title: "Контент из Markdown в Next.js"
description: "Парсинг .md файлов через gray-matter и отображение статей по slug со статической генерацией."
date: "2024-04-10"
category: "Разработка"
---

Хранить статьи в Markdown удобно: версионирование в Git, редактирование в любом редакторе. В Next.js можно читать .md из папки `content/` на этапе сборки и отдавать готовый HTML.

## gray-matter

Библиотека `gray-matter` разбирает frontmatter (YAML между `---`) и тело документа:

```ts
const { data, content } = matter(readFileSync(path, "utf8"));
// data.title, data.date; content — сырой markdown
```

Для рендера разметки можно использовать `react-markdown` или оставить контент как пре-форматированный текст/HTML, сгенерированный на этапе build.

## generateStaticParams

Чтобы сгенерировать все страницы статей при сборке, в `app/blog/[slug]/page.tsx` экспортируйте:

```ts
export async function generateStaticParams() {
  const articles = getAllSlugs(); // список slug из content/
  return articles.map(slug => ({ slug }));
}
```

Next.js вызовет page для каждого slug и закэширует результат. Статьи будут отдаваться статически без запросов к БД.


## От исходника к странице

| Этап | Результат |
| --- | --- |
| Разбор frontmatter | Заголовок, дата и описание статьи |
| Обработка Markdown | Параграфы, списки, таблицы и блоки кода |
| Статическая генерация | Готовая HTML-страница для читателя и поисковика |

Для коротких имён используйте inline-код, например `getAllArticles()`. Длинные примеры удобнее читать в отдельном блоке с указанным языком.

## Итог

Связка content/*.md + gray-matter + generateStaticParams даёт простой «блог из файлов» с отличной производительностью и SEO.
