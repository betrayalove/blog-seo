export function Hero() {
  return (
    <section className="py-8 sm:py-12" aria-labelledby="hero-heading">
      <div className="mx-auto max-w-container px-4 sm:px-8">
        <h1 id="hero-heading" className="mb-2 text-link">
          Блог с упором на SEO
        </h1>
        <p className="max-w-2xl text-body text-secondary">
          Статьи о Next.js, TypeScript, Tailwind и поисковой оптимизации. Учимся строить быстрые и удобные для поисковиков сайты.
        </p>
      </div>
    </section>
  );
}
