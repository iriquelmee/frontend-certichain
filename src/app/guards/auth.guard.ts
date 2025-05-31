import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map, take, filter, timeout } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {  
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
          return true;
        } 
        else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
