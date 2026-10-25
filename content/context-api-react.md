---
title: "React Context API для темы и состояния"
description: "Как организовать глобальное состояние без Redux: тема и mock-авторизация через Context."
date: "2024-04-01"
category: "Разработка"
---

Context API встроен в React и подходит для «неглубокого» глобального состояния: тема, локаль, флаг авторизации. Разберём на примере переключателя темы и mock-пользователя.

## Создание контекста

```tsx
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

Провайдер оборачивает дерево в корневом layout; любой дочерний компонент может вызвать `useContext(ThemeContext)` и получить тему и переключатель.

## Когда уместен Context

- Тема (light/dark).
- Простой флаг «залогинен/не залогинен» и имя пользователя (mock без бэкенда).
- Локаль, настройки отображения.

Для сложных и часто обновляемых данных лучше рассмотреть Zustand или Redux. Для темы и одного пользователя Context достаточно.

## Итог

Context API — минималистичный способ передать значение и функции вниз по дереву без prop drilling. Используйте его для темы и простого auth-mock в учебных и небольших проектах.
