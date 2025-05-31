export interface User {
  username: string;
  email?: string;
  groups?: string[];
  isAuthenticated: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
