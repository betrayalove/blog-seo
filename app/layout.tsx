import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Блог SEO — Next.js, TypeScript, Tailwind",
    template: "%s | Блог SEO",
  },
  description:
    "Статьи о Next.js, TypeScript, Tailwind и поисковой оптимизации. Лендинг и блог с упором на SEO.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "Блог SEO",
    title: "Блог SEO — Next.js, TypeScript, Tailwind",
    description: "Статьи о Next.js, TypeScript, Tailwind и поисковой оптимизации.",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Блог SEO" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
