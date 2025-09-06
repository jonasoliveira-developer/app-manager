"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "@/lib/api";


type AccessLevel = "ROLE_ROOT" | "ROLE_ADMINISTRATOR" | "ROLE_USER" | "ROLE_CLIENT";

interface User {
  id: string;
  name: string;
  email: string;
  accessLevel: AccessLevel;
  imageUrl: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);


  useEffect(() => {
    const storedToken = localStorage.getItem("_authToken");
    if (storedToken) {
      const userData = parseJwt(storedToken);
      setUser(userData);
      setToken(storedToken);
    }
  }, []);
  async function login(email: string, password: string): Promise<User> {
    const response = await api.post("/auth/login", { email, password });
    const rawToken = response.data.token.replace("Bearer ", "");
    const userData = parseJwt(rawToken);

    localStorage.setItem("_authToken", rawToken);
    setUser(userData);
    setToken(rawToken);

    return userData;
  }

  function logout() {
    localStorage.removeItem("_authToken");
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
};

// Decodifica o JWT
function parseJwt(token: string): User {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join('')
  );

  const payload = JSON.parse(jsonPayload);

  return {
    id: payload.id,
    name: payload.name,
    email: payload.sub,
    accessLevel: payload.authorities?.[0]?.authority || "USER",
    imageUrl: payload.imageUrl ?? '', // usa se vier, senão string vazia
  };
}