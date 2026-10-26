import Link from "next/link";

export function CTA() {
  return (
    <section className="py-6 sm:py-8" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-container px-4 sm:px-8">
        <div className="rounded-card bg-surface-light dark:bg-surface-dark border border-line p-6 sm:p-8 text-center shadow-card dark:shadow-card-dark">
          <h2 id="cta-heading" className="mb-2 text-text-primary-light dark:text-text-primary-dark">
            Больше статей в блоге
          </h2>
          <p className="mb-4 text-body text-secondary max-w-xl mx-auto">
            Переходите в раздел «Блог» и читайте все материалы по Next.js, SEO и фронтенду.
          </p>
          <Link
            href="/blog"
            className="inline-block rounded-button bg-primary px-6 py-3 text-body font-medium text-white hover:bg-blue-700 shadow-card"
          >
            Перейти в блог
          </Link>
        </div>
      </div>
    </section>
  );
}
