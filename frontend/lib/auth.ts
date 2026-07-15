import { User } from "@/types/user";

const TOKEN_KEY = "stockflow_token";
const USER_KEY = "stockflow_user";

// ===== Token Functions =====
export const saveToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const clearToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

// ===== User Functions =====
export const saveUser = (user: User) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const getUser = (): User | null => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem(USER_KEY);
    return user ? (JSON.parse(user) as User) : null;
  }
  return null;
};

// ===== Auth Check =====
export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(TOKEN_KEY);
    return token !== null && token !== "" && token !== "null" && token !== "undefined";
  }
  return false;
};
