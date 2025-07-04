import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TestingModule } from '../../../testing/test-module';
import { BehaviorSubject } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // creando spy para el Router
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });
    
    service = TestBed.inject(AuthService);
    
    // config para evitar errores con Cognito sin iniciar configuracion de sesion
    spyOn(service as any, 'checkSession').and.returnValue(undefined);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
  });

  describe('JWT token management', () => {
    it('should set and get JWT token', () => {
      const testToken = 'test-jwt-token';
      expect(service.getJwtToken()).toBeNull();
      
      service.setJwt(testToken);
      
      expect(service.getJwtToken()).toBe(testToken);
    });
  });
});
