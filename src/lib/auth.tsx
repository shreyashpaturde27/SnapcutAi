/**
 * Auth context — UI-layer only.
 *
 * Backend-ready: replace the body of `signIn`, `signUp`, `signOut`,
 * `requestPasswordReset`, and `verifyEmail` with calls to your Supabase
 * client (or any auth provider). The shape of `AuthUser` and the context
 * API are stable; UI components only depend on this surface.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  plan: "free" | "pro";
  creditsRemaining: number;
  dailyQuota: number;
};

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
};

const STORAGE_KEY = "snapcut.auth.user";

const AuthContext = createContext<AuthState | null>(null);

function loadUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function persistUser(user: AuthUser | null) {
  if (typeof window === "undefined") return;
  if (user) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  else window.localStorage.removeItem(STORAGE_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(loadUser());
    setIsLoading(false);
  }, []);

  const signIn = useCallback(async (email: string, _password: string) => {
    const next: AuthUser = {
      id: crypto.randomUUID(),
      email,
      name: email.split("@")[0],
      plan: "free",
      creditsRemaining: 5,
      dailyQuota: 5,
    };
    setUser(next);
    persistUser(next);
  }, []);

  const signUp = useCallback(async (email: string, _password: string, name: string) => {
    const next: AuthUser = {
      id: crypto.randomUUID(),
      email,
      name,
      plan: "free",
      creditsRemaining: 5,
      dailyQuota: 5,
    };
    setUser(next);
    persistUser(next);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    persistUser(null);
  }, []);

  const requestPasswordReset = useCallback(async (_email: string) => {
    // Wire to supabase.auth.resetPasswordForEmail
    await new Promise((r) => setTimeout(r, 600));
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const next: AuthUser = {
      id: crypto.randomUUID(),
      email: "user@google.com",
      name: "Google User",
      plan: "free",
      creditsRemaining: 5,
      dailyQuota: 5,
    };
    setUser(next);
    persistUser(next);
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      signIn,
      signUp,
      signOut,
      requestPasswordReset,
      signInWithGoogle,
    }),
    [user, isLoading, signIn, signUp, signOut, requestPasswordReset, signInWithGoogle],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
