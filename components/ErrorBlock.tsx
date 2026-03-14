interface ErrorBlockProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorBlock({ message, onRetry }: ErrorBlockProps) {
  return (
    <div
      className="rounded-card border border-error/50 bg-error/10 dark:bg-error/20 p-6 text-center shadow-card dark:shadow-card-dark"
      role="alert"
    >
      <p className="text-body font-medium text-error mb-2" aria-hidden="true">
        ⚠️
      </p>
      <p className="text-body text-error mb-4">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-button bg-error/20 px-4 py-2 text-body font-medium text-error hover:bg-error/30"
        >
          Повторить
        </button>
      )}
    </div>
  );
}
