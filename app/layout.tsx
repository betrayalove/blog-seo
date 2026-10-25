import type { Metadata } from "next";
import "@fontsource-variable/inter";
import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
    <html lang="ru" suppressHydrationWarning>
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
