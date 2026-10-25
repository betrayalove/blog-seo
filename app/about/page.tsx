import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/about", "О проекте", "О проекте «Блог SEO»: учебный pet-проект на Next.js с App Router, Context API и Tailwind.");

export default function AboutPage() {
  return (
    <div className="py-4 sm:py-6">
      <div className="mx-auto max-w-container px-4 sm:px-6 max-w-2xl">
        <h1>О проекте</h1>
        <div className="mt-4 space-y-4 text-body text-secondary">
          <p>
            «Блог SEO» — это учебный pet-проект, демонстрирующий возможности Next.js 16 с App Router, TypeScript, Tailwind CSS и React Context API.
          </p>
          <p>
            Контент статей хранится в markdown-файлах в папке <code className="rounded bg-secondary/10 dark:bg-secondary/20 px-1">content/</code> и парсится на этапе сборки с помощью gray-matter. Страницы статей генерируются статически (SSG) для быстрой загрузки и хорошего SEO.
          </p>
          <p>
            В проекте реализованы переключатель светлой/тёмной темы и mock-авторизация через Context API, семантическая разметка (header, main, article, footer), метаданные и Open Graph для всех страниц.
          </p>
        </div>
      </div>
    </div>
  );
}
