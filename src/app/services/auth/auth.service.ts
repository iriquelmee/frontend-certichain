import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';
import { User, AuthState } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authStateSubject = new BehaviorSubject<AuthState>({
    user: null, isLoading: false, error: null
  });

  public authState$ = this.authStateSubject.asObservable();

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private router: Router
  ) {
    if (this.hasOAuthCallback() && this.isRecentManualLogin()) {
      this.processOAuthCallback();
    }
  }

  // verificando si la url actual contiene parametros de callback de OAuth
  private hasOAuthCallback(): boolean {
    const url = window.location.href;
    return ['code=', 'state=', 'session_state='].some(param => url.includes(param));
  }

  // comprobando si se inicio sesion manualmente
  private isRecentManualLogin(): boolean {
    const mark = window.sessionStorage.getItem('manual_login');
    const recent = mark && Date.now() - parseInt(mark, 10) < 30000;
    window.sessionStorage.removeItem('manual_login');
    return !!recent;
  }

  // procesa el callback de oauth para autenticar al usuario si es valido
  private processOAuthCallback(): void {
    this.oidcSecurityService.checkAuth().subscribe({
      next: ({ isAuthenticated }) => {
        if (!isAuthenticated) return;
        this.oidcSecurityService.userData$.pipe(take(1)).subscribe(userData => {
          if (userData) {
            this.setUserAuthenticated(userData);
            this.router.navigate(['/dashboard']);
          }
        });
      },
      error: (err) => {
        console.error('OAuth callback error:', err);
        this.setError('Error al verificar autenticación');
      }
    });
  }

  // setea estado de autenticación del usuario con los datos recibidos
  private setUserAuthenticated(userData: any): void {
    const user: User = {
      username: userData.preferred_username || userData.sub || userData.email || 'User',
      email: userData.email,
      groups: userData['cognito:groups'] || [],
      isAuthenticated: true
    };
    this.authStateSubject.next({ user, isLoading: false, error: null });
  }

  private setLoading(): void {
    this.authStateSubject.next({ ...this.authStateSubject.value, isLoading: true, error: null });
  }

  private setError(message: string): void {
    this.authStateSubject.next({ user: null, isLoading: false, error: message });
  }

  login(): void {
    this.setLoading();
    window.sessionStorage.setItem('manual_login', Date.now().toString());
    this.oidcSecurityService.logoffLocal();
    window.localStorage.clear();

    try {
      this.oidcSecurityService.authorize();
    } catch (err: any) {
      console.error('Login error:', err);
      this.setError(err.message || 'Error al iniciar sesión');
    }
  }

  // ejecuta cierre de sesion redirigiendo al logout de aws cognito
  logout(): void {
    window.sessionStorage.clear();
    window.location.href = `${environment.auth.logoutUrl}?client_id=${environment.auth.clientId}&logout_uri=${environment.auth.postLogoutRedirectUri}`;
  }

  get currentUser(): User | null {
    return this.authStateSubject.value.user;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUser?.isAuthenticated;
  }

  get isAdmin(): boolean {
    return this.currentUser?.groups?.includes('admin') || false;
  }
}