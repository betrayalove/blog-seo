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
        secondary: "var(--text-secondary)",
        link: "var(--link)",
        line: "var(--border)",
        muted: "var(--surface-muted)",
        accent: "var(--accent)",
        background: {
          light: TOKENS.colors.backgroundLight,
          dark: TOKENS.colors.backgroundDark,
        },
        surface: {
          light: TOKENS.colors.surfaceLight,
          dark: TOKENS.colors.surfaceDark,
        },
        success: TOKENS.colors.success,
        error: TOKENS.colors.danger,
        text: {
          primary: { light: TOKENS.colors.textLight, dark: TOKENS.colors.textDark },
          secondary: "var(--text-secondary)",
        },
      },
      fontFamily: {
        sans: ["Inter Variable", TOKENS.fontFamily],
      },
      fontSize: {
        h1: ["clamp(1.75rem, 3vw, 2rem)", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["clamp(1.25rem, 2.5vw, 1.5rem)", { lineHeight: "1.3", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.6" }],
      },
      borderRadius: {
        card: "12px",
        button: "8px",
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
