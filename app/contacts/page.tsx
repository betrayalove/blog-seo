import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Страница контактов блога. Связь с автором проекта.",
  openGraph: {
    title: "Контакты | Блог SEO",
    description: "Страница контактов блога. Связь с автором проекта.",
  },
};

export default function ContactsPage() {
  return (
    <div className="py-4 sm:py-6">
      <div className="mx-auto max-w-container px-4 sm:px-6 max-w-2xl">
        <h1>Контакты</h1>
        <div className="mt-4 space-y-4 text-body text-secondary">
          <p>
            Это учебный pet-проект без реального бэкенда. Форма обратной связи не подключена.
          </p>
          <p>
            По вопросам сотрудничества или предложений можно написать на условный адрес: <strong className="text-text-primary-light dark:text-text-primary-dark">blog@example.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
