import React, { createContext, useContext, useState, useEffect } from "react";
import { apiUrl, extractToken, getAuthToken, getJsonHeaders, readApiError } from "@/lib/api";

interface AuthContextType {
  isLoggedIn: boolean;
  user: { name?: string; email?: string } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: { name?: string; email?: string } | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedToken = getAuthToken();
    const savedUser = localStorage.getItem("auth_user");

    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(apiUrl("/api/auth/login"), {
      method: "POST",
      headers: getJsonHeaders(),
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error(await readApiError(res, "Login failed"));
    }

    const data = await res.json();
    const newToken = extractToken(data);

    if (!newToken) {
      throw new Error("No token in response");
    }

    setToken(newToken);
    setIsLoggedIn(true);
    setUser({ email });

    localStorage.setItem("auth_token", newToken);
    localStorage.setItem("auth_user", JSON.stringify({ email }));
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch(apiUrl("/api/auth/register"), {
      method: "POST",
      headers: getJsonHeaders(),
      body: JSON.stringify({ fullName: name, name, email, password, phone: "9999999999" }),
    });

    if (!res.ok) {
      throw new Error(await readApiError(res, "Registration failed"));
    }

    const data = await res.json();
    const newToken = extractToken(data);

    if (newToken) {
      setToken(newToken);
      setIsLoggedIn(true);
      setUser({ name, email });

      localStorage.setItem("auth_token", newToken);
      localStorage.setItem("auth_user", JSON.stringify({ name, email }));
    }
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        token,
        login,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
