export interface User {
  id: string | null;
  username: string;
  email?: string;
  groups?: string[];
  isAuthenticated: boolean;
  userTypeId?: string;
  userTypeName?:string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}
