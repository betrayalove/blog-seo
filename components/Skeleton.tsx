export function SkeletonCard() {
  return (
    <div className="rounded-card bg-muted dark:bg-muted animate-pulse p-6 shadow-card dark:shadow-card-dark">
      <div className="mb-2 h-4 w-24 rounded bg-muted dark:bg-muted" />
      <div className="mb-2 h-6 w-3/4 rounded bg-muted dark:bg-muted" />
      <div className="h-4 w-full rounded bg-muted dark:bg-muted" />
      <div className="mt-2 h-4 w-1/2 rounded bg-muted dark:bg-muted" />
    </div>
  );
}

export function SkeletonArticle() {
  return (
    <div className="mx-auto max-w-container px-4 sm:px-8">
      <div className="mb-4 h-4 w-32 animate-pulse rounded bg-muted" />
      <div className="mb-4 h-10 w-full max-w-xl animate-pulse rounded bg-muted" />
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-4 animate-pulse rounded bg-muted"
            style={{ width: i === 3 ? "80%" : "100%" }}
          />
        ))}
      </div>
    </div>
  );
}
