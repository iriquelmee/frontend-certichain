import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { AuthState } from '../models/user.model';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let authStateSubject: BehaviorSubject<AuthState>;

  beforeEach(() => {
    authStateSubject = new BehaviorSubject<AuthState>({ user: null, isLoading: false, error: null });
    
    authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      authState$: authStateSubject.asObservable()
    });

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
    
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when user is authenticated', (done) => {
    authStateSubject.next({
      user: { id: '1', username: 'testuser', email: 'test@example.com', isAuthenticated: true, groups: [] },
      isLoading: false,
      error: null
    });

    guard.canActivate().subscribe(result => {
      expect(result).toBeTrue();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should redirect to login when user is not authenticated', (done) => {
    authStateSubject.next({
      user: { id: '1', username: 'testuser', email: 'test@example.com', isAuthenticated: false, groups: [] },
      isLoading: false,
      error: null
    });

    guard.canActivate().subscribe(result => {
      expect(result).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });

  it('should redirect to login when there is no user', (done) => {
    authStateSubject.next({
      user: null,
      isLoading: false,
      error: null
    });

    guard.canActivate().subscribe(result => {
      expect(result).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });

  it('should wait until loading is complete before making a decision', (done) => {
    authStateSubject.next({
      user: null,
      isLoading: true,
      error: null
    });

    setTimeout(() => {
      authStateSubject.next({
        user: { id: '1', username: 'testuser', email: 'test@example.com', isAuthenticated: true, groups: [] },
        isLoading: false,
        error: null
      });
    }, 100);

    guard.canActivate().subscribe(result => {
      expect(result).toBeTrue();
      done();
    });
  });

  it('should handle timeout and navigate to login', (done) => {
    authStateSubject.next({
      user: null,
      isLoading: true,
      error: null
    });

    const originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

    guard.canActivate().subscribe(result => {
      expect(result).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      done();
    });
  });
});
