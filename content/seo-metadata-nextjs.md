---
title: "SEO и метаданные в Next.js"
description: "Настройка title, description и Open Graph для лучшей индексации и превью в соцсетях."
date: "2024-03-20"
category: "SEO"
---

Правильные метаданные критичны для поисковой оптимизации и отображения ссылок в соцсетях. В Next.js App Router это делается через объект `metadata` и функцию `generateMetadata`.

## Статические метаданные

В любом `layout.tsx` или `page.tsx` экспортируйте объект:

```ts
export const metadata = {
  title: "Заголовок страницы",
  description: "Краткое описание для поисковиков и превью.",
};
```

## Динамические метаданные для статей

Для страницы вида `/blog/[slug]` используйте `generateMetadata`:

```ts
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description },
  };
}
```

## Open Graph

Добавьте поля `openGraph` и при необходимости `twitter` в `metadata`, чтобы ссылки красиво отображались в соцсетях и мессенджерах.

Итог: уделите время метаданным на каждой странице — это быстро окупается трафиком и кликами.
