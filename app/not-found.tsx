import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-12 text-center">
      <h1 className="mb-2">404</h1>
      <p className="text-body text-secondary mb-4">Страница не найдена.</p>
      <Link href="/" className="text-primary font-medium hover:underline">
        На главную
      </Link>
    </div>
  );
}
