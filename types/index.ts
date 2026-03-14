export type Theme = "light" | "dark";

export interface ArticleMeta {
  title: string;
  description: string;
  date: string;
  slug: string;
  excerpt?: string;
  category?: string;
}

export interface Article extends ArticleMeta {
  content: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  userName: string | null;
}
