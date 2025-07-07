import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TestingModule } from '../../../testing/test-module';
import { BehaviorSubject } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });
    
    service = TestBed.inject(AuthService);
    
    spyOn(service as any, 'checkSession').and.returnValue(undefined);
    
    (service as any).userPool = jasmine.createSpyObj('CognitoUserPool', ['signUp', 'getCurrentUser']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  describe('login', () => {
    it('should set loading state when called', () => {
      spyOn(service as any, 'setLoading').and.callThrough();
      const mockCognitoUser = jasmine.createSpyObj('CognitoUser', ['authenticateUser']);
      mockCognitoUser.authenticateUser.and.callFake((authDetails: any, callbacks: any) => {
        callbacks.onFailure({ message: 'Error' });
      });
      service.login('testuser', 'password').catch(() => {});
      expect((service as any).setLoading).toHaveBeenCalled();
    });
  });

  describe('getters', () => {
    it('should return currentUser', () => {
      const testUser = { id: '1', username: 'ghost', email: 'i.riquelmee@duocuc.cl', groups: [''], isAuthenticated: true };
      (service as any).authStateSubject.next({ user: testUser, isLoading: false, error: null });
      expect(service.currentUser).toEqual(testUser);
    });

    it('should return isAuthenticated = true when user is authenticated', () => {
      const testUser = { id: '1', username: 'ghost', email: 'i.riquelmee@duocuc.cl', groups: [''], isAuthenticated: true };
      (service as any).authStateSubject.next({ user: testUser, isLoading: false, error: null });
      expect(service.isAuthenticated).toBeTrue();
    });

    it('should return isAuthenticated = false when no user', () => {
      (service as any).authStateSubject.next({ user: null, isLoading: false, error: null });
      expect(service.isAuthenticated).toBeFalse();
    });
    
    it('should return isAdmin = true for user in admin group', () => {
      const adminUser = { 
        id: '1', username: 'admin', email: 'admin@example.com', 
        groups: ['admin'], isAuthenticated: true 
      };
      (service as any).authStateSubject.next({ user: adminUser, isLoading: false, error: null });
      expect(service.isAdmin).toBeTrue();
    });
  });

  describe('JWT token management', () => {
    it('should set and get JWT token', () => {
      const testToken = 'test-jwt-token';
      expect(service.getJwtToken()).toBeNull();
      
      service.setJwt(testToken);
      
      expect(service.getJwtToken()).toBe(testToken);
    });
  });
  
  describe('register', () => {
    it('should set loading state and call signUp', () => {
      spyOn(service as any, 'setLoading').and.callThrough();
      
      (service as any).userPool.signUp.and.callFake((username: string, password: string, attributes: any[], validation: any[], callback: any) => {
        callback({ message: 'Error de prueba' }, null);
      });
      
      service.register('testuser', 'password', 'test@example.com', 'usuario', 'Test User')
        .catch(() => {});
      
      expect((service as any).setLoading).toHaveBeenCalled();
      expect((service as any).userPool.signUp).toHaveBeenCalled();
    });
  });
  
  describe('confirmRegistration', () => {
    it('should set loading state when called', () => {
      (service as any).setLoading();
      expect((service as any).authStateSubject.value.isLoading).toBeTrue();
    });
  });
  
  describe('logout', () => {
    it('should sign out user and navigate to login', () => {
      const mockCognitoUser = jasmine.createSpyObj('CognitoUser', ['signOut']);
      (service as any).userPool.getCurrentUser.and.returnValue(mockCognitoUser);
      spyOn(localStorage, 'clear');
      spyOn(sessionStorage, 'clear');
      service.logout();
      expect(mockCognitoUser.signOut).toHaveBeenCalled();
      expect(localStorage.clear).toHaveBeenCalled();
      expect(sessionStorage.clear).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
    
    it('should handle logout when no user is logged in', () => {
      (service as any).userPool.getCurrentUser.and.returnValue(null);
      
      service.logout();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
  });
});
