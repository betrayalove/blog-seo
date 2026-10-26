"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

const MOCK_LOGIN_NAME = "Пользователь";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, userName, login, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-surface-light dark:bg-surface-dark shadow-card dark:shadow-card-dark">
      <div className="mx-auto flex max-w-container flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-8">
        <Link
          href="/"
          className="text-h2 text-link hover:opacity-90 dark:text-link"
        >
          Блог SEO
        </Link>
        <span id="mock-auth-description" className="sr-only">Демонстрационный вход без аккаунта и сервера. После обновления страницы вход сбрасывается.</span>
        <nav className="flex flex-wrap items-center gap-2 sm:gap-4" aria-label="Основная навигация">
          <Link
            href="/blog"
            className="rounded-button px-3 py-2 text-body text-secondary hover:bg-muted hover:text-link dark:hover:bg-muted"
          >
            Блог
          </Link>
          <Link
            href="/about"
            className="rounded-button px-3 py-2 text-body text-secondary hover:bg-muted hover:text-link dark:hover:bg-muted"
          >
            О проекте
          </Link>
          <Link
            href="/contacts"
            className="rounded-button px-3 py-2 text-body text-secondary hover:bg-muted hover:text-link dark:hover:bg-muted"
          >
            Контакты
          </Link>
          <div className="ml-2 flex items-center gap-2 border-l border-line pl-2 sm:ml-4 sm:pl-4">
            <span
              className="text-body text-secondary"
              aria-live="polite"
            >
              {isLoggedIn && userName ? userName : "Гость"}
            </span>
            {isLoggedIn ? (
              <button
                type="button"
                onClick={logout}
                className="rounded-button px-2 py-2 text-body text-secondary hover:bg-muted hover:text-link dark:hover:bg-muted"
              >
                Выйти
              </button>
            ) : (
              <button
                type="button"
                onClick={() => login(MOCK_LOGIN_NAME)}
                aria-describedby="mock-auth-description"
                className="rounded-button px-2 py-2 text-body text-secondary hover:bg-muted hover:text-link dark:hover:bg-muted"
              >
                Войти
              </button>
            )}
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-button flex h-10 w-10 items-center justify-center bg-muted text-secondary hover:bg-primary hover:text-white dark:hover:bg-primary"
              aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
              data-theme={theme}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
