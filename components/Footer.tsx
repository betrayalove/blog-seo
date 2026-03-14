import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-6 border-t border-secondary/20 bg-surface-light dark:bg-surface-dark py-6 sm:py-8">
      <div className="mx-auto max-w-container px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body text-secondary">
            © {new Date().getFullYear()} Блог SEO. Pet-проект на Next.js.
          </p>
          <nav className="flex flex-wrap gap-4" aria-label="Футер навигация">
            <Link
              href="/blog"
              className="text-body text-secondary hover:text-primary hover:underline"
            >
              Блог
            </Link>
            <Link
              href="/about"
              className="text-body text-secondary hover:text-primary hover:underline"
            >
              О проекте
            </Link>
            <Link
              href="/contacts"
              className="text-body text-secondary hover:text-primary hover:underline"
            >
              Контакты
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
