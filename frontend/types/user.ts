export type Role = "admin" | "staff";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}
