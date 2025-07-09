import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map, take, filter, timeout, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.authService.authState$.pipe(
            timeout(5000),
            filter(authState => {
                return !authState.isLoading;
            }),
            take(1),
            map(authState => {
                console.log('AuthGuard state:', authState);

                const isAuthenticated = authState.user?.isAuthenticated || false;

                if (isAuthenticated) {
                    const required: string[] = route.data['roles'] ?? [];
                    const has = required.some(role => this.authService.hasRole(role));
                    return has || required.length === 0;
                }
                else {
                    this.router.navigate(['/login']);
                    return false;
                }
            }),
            catchError(() => {
                console.error('AuthGuard timeout or error');
                this.router.navigate(['/login']);
                return of(false);
            })
        );
    }
}
