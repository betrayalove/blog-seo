interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-card bg-surface-light dark:bg-surface-dark border border-line p-8 text-center shadow-card dark:shadow-card-dark">
      <p className="text-body font-medium text-secondary mb-1" aria-hidden="true">
        📭
      </p>
      <h2 className="text-h2 text-secondary mb-2">{title}</h2>
      {description && (
        <p className="text-body text-secondary max-w-md mx-auto">{description}</p>
      )}
    </div>
  );
}
