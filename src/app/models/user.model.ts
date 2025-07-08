export interface User {
  id: string | null;
  username: string;
  email?: string;
  groups?: string[];
  isAuthenticated: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}
