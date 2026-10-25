import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { Header } from "@/components/Header";

function renderWithTheme() {
  return render(
    <ThemeProvider>
      <AuthProvider>
        <Header />
      </AuthProvider>
    </ThemeProvider>
  );
}

describe("Переключатель темы", () => {
  it("кнопка темы имеет data-theme и меняет значение после клика", async () => {
    renderWithTheme();
    const themeButton = screen.getByRole("button", {
      name: /включить (светлую|тёмную) тему/i,
    });
    expect(themeButton).toHaveAttribute("data-theme");
    const initialTheme = themeButton.getAttribute("data-theme");

    await userEvent.click(themeButton);
    expect(themeButton.getAttribute("data-theme")).not.toBe(initialTheme);

    await userEvent.click(themeButton);
    expect(themeButton.getAttribute("data-theme")).toBe(initialTheme);
  });

  it("still switches the theme when storage writes are blocked", async () => {
    localStorage.setItem("blog-seo-theme", "light");
    const storageWrite = jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Storage disabled", "QuotaExceededError");
    });
    renderWithTheme();
    const button = screen.getByRole("button", { name: "Включить тёмную тему" });
    await userEvent.click(button);
    expect(button).toHaveAttribute("data-theme", "dark");
    expect(document.documentElement).toHaveClass("dark");
    storageWrite.mockRestore();
  });
});
