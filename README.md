# Блог SEO

## Описание

Pet-проект «Блог/лендинг с упором на SEO» на Next.js: лендинг, список статей блога и страницы статей по slug, страницы «О проекте» и «Контакты». Контент статей подгружается из markdown-файлов в папке `content/`. Демонстрирует Next.js App Router, SSR/SSG, SEO (metadata, Open Graph), React Context API и Tailwind CSS. Backend не используется.

## Возможности

- Главная страница (лендинг)
- Блог: список статей и страница статьи по slug (SSG)
- Страницы «О проекте» и «Контакты»
- SEO: canonical, metadata, Open Graph, sitemap, robots, BlogPosting JSON-LD
- Светлая/тёмная тема (Tailwind darkMode)
- Mock-авторизация (React Context, без backend)

## Стек

- **Framework:** Next.js 16 / React 19 (App Router)
- **Язык:** TypeScript
- **Стили:** Tailwind CSS (дизайн-токены в lib/tokens.ts)
- **Состояние/контекст:** ThemeContext, AuthContext (mock)
- **Контент:** markdown (gray-matter), react-markdown
- **Тесты:** Jest, React Testing Library; E2E: Playwright

## Переменные окружения

См. [.env.example](.env.example). Скопируйте в `.env.local` и при необходимости измените.

## Команды

- `npm ci` — установка зависимостей по lock-файлу
- `npm run dev` — запуск dev-сервера (http://localhost:3000)
- `npm run build` — сборка для production (SSG/SSR)
- `npm run start` — запуск production-сервера после `build`
- `npm run test` — unit-тесты (Jest)
- `npm run test:watch` — тесты в watch-режиме
- `npm run lint` — проверка кода (ESLint)
- `npm run e2e` — E2E готовой production-сборки (Playwright)
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

## Проверки и deployment

Используйте Node.js 24 (`nvm use`, версия закреплена в `.nvmrc`) и `npm ci`. Проверки: `npm run typecheck`, `npm run lint`, `npm run test:ci`, `npm run build`, затем `npx playwright install chromium` и `npm run e2e`. E2E запускает готовую production-сборку на `127.0.0.1:3300`; не запускайте dev-сервер одновременно с build в одном checkout. `BASE_URL` позволяет проверить уже работающий deployment. GitHub Actions выполняет эти проверки при push в main и в pull request и сохраняет отчёт браузерных ошибок.

Vercel: импортируйте этот репозиторий с framework Next.js, корень проекта `./` и Node.js 24.x. `vercel.json` задаёт чистую установку и сборку; при подключённой Git integration push в main запускает production deployment. Стандартная Git integration Vercel запускает deployment независимо от GitHub Actions; этот workflow не блокирует её автоматически. Для контроля публикации настройте защищённую main с обязательным успешным CI перед merge. Backend и отдельный сервер блогу не нужны.

`NEXT_PUBLIC_SITE_URL` — origin публичного production-сайта, по умолчанию `https://blog-seo-swart.vercel.app`. При смене домена задайте его в Vercel и пересоберите проект; для preview оставляйте production origin. Каждая страница имеет canonical и Open Graph URL, статьи — article metadata и BlogPosting JSON-LD. `/sitemap.xml`, `/robots.txt` и `/og-default.png` генерируются при сборке. Inter включён в npm-пакет и раздаётся локально: build не обращается к Google Fonts. Вход демонстрационный, без сервера, аккаунтов и постоянной сессии.

Для сохранения существующего дизайна используется Tailwind 3.4.19; его транзитивный `postcss-selector-parser` закреплён через override на совместимую исправленную ветку 7.1.6+. ESLint 9 выбран по peer requirements плагинов React и доступности; ESLint 10 пока выходит за их заявленные диапазоны. Обновления проверяются не только audit, но и production-сборкой и E2E.
