# Блог SEO

## Описание

Pet-проект «Блог/лендинг с упором на SEO» на Next.js: лендинг, список статей блога и страницы статей по slug, страницы «О проекте» и «Контакты». Контент статей подгружается из markdown-файлов в папке `content/`. Демонстрирует Next.js App Router, SSR/SSG, SEO (metadata, Open Graph), React Context API и Tailwind CSS. Backend не используется.

## Возможности

- Главная страница (лендинг)
- Блог: список статей и страница статьи по slug (SSG)
- Страницы «О проекте» и «Контакты»
- SEO: metadata, Open Graph, generateMetadata для статей
- Светлая/тёмная тема (Tailwind darkMode)
- Mock-авторизация (React Context, без backend)

## Стек

- **Framework:** Next.js 14 (App Router)
- **Язык:** TypeScript
- **Стили:** Tailwind CSS (дизайн-токены в lib/tokens.ts)
- **Состояние/контекст:** ThemeContext, AuthContext (mock)
- **Контент:** markdown (gray-matter), react-markdown
- **Тесты:** Jest, React Testing Library; E2E: Playwright

## Переменные окружения

См. [.env.example](.env.example). Скопируйте в `.env.local` и при необходимости измените.

## Команды

- `npm install` — установка зависимостей
- `npm run dev` — запуск dev-сервера (http://localhost:3000)
- `npm run build` — сборка для production (SSG/SSR)
- `npm run start` — запуск production-сервера после `build`
- `npm run test` — unit-тесты (Jest)
- `npm run test:watch` — тесты в watch-режиме
- `npm run lint` — проверка кода (ESLint)
- `npm run e2e` — E2E (Playwright)
- `npm run e2e:ui` — E2E с UI Playwright

## Авторизация

Используется только **mock-авторизация** (AuthContext): состояние isLoggedIn / userName в памяти, без backend и без сохранения токена. Для продакшена при появлении backend рекомендуется перейти на httpOnly cookie и проверку через /auth/me.

## Запуск backend

Backend в проекте отсутствует. Приложение работает полностью на фронтенде (Next.js), контент статей — из папки `content/` (markdown).

## Структура проекта

- **app/** — App Router: layout, страницы (главная, blog, blog/[slug], about, contacts)
- **components/** — Header, Footer, ArticleBody, Hero, CTA и др.
- **context/** — ThemeContext, AuthContext (mock)
- **lib/** — утилиты, парсинг markdown (getArticleBySlug, getAllArticles), tokens.ts
- **styles/** — globals.css
- **content/** — markdown-файлы статей (frontmatter: title, description, date, category)
