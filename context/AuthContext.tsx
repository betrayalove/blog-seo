"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { AuthState } from "@/types";

interface AuthContextValue extends AuthState {
  login: (userName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const MOCK_USER_NAME = "Гость";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
    userName: null,
  });

  const login = useCallback((userName: string) => {
    setState({ isLoggedIn: true, userName: userName || MOCK_USER_NAME });
  }, []);

  const logout = useCallback(() => {
    setState({ isLoggedIn: false, userName: null });
  }, []);

  const value: AuthContextValue = {
    ...state,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
