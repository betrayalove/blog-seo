import type { Config } from "tailwindcss";
import { TOKENS } from "./lib/tokens";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: TOKENS.colors.primary,
        secondary: TOKENS.colors.secondary,
        background: {
          light: TOKENS.colors.backgroundLight,
          dark: TOKENS.colors.backgroundDark,
        },
        surface: {
          light: TOKENS.colors.backgroundLight,
          dark: TOKENS.colors.backgroundDark,
        },
        success: TOKENS.colors.success,
        error: TOKENS.colors.danger,
        text: {
          primary: { light: TOKENS.colors.textLight, dark: TOKENS.colors.textDark },
          secondary: TOKENS.colors.secondary,
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", TOKENS.fontFamily],
      },
      fontSize: {
        h1: ["1.75rem", { lineHeight: "1.3" }],
        h2: ["1.35rem", { lineHeight: "1.4" }],
        body: ["1rem", { lineHeight: "1.6" }],
      },
      spacing: {
        "1": "8px",
        "2": "16px",
        "3": "24px",
        "4": "32px",
        "6": "48px",
      },
      borderRadius: {
        card: "8px",
        button: "6px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08)",
        "card-dark": "0 1px 3px rgba(0,0,0,0.2)",
      },
      maxWidth: {
        container: "1280px",
      },
      screens: {
        xs: "360px",
        sm: "768px",
        md: "1024px",
        lg: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
