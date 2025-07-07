import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpResponse, HttpHandlerFn } from '@angular/common/http';
import { of } from 'rxjs';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth/auth.service';

describe('AuthInterceptor', () => {
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let httpHandlerSpy: jasmine.Spy<HttpHandlerFn>;
  let nextHandlerResult: HttpResponse<unknown>;

  beforeEach(() => {

    authServiceMock = jasmine.createSpyObj('AuthService', ['getJwtToken']);
    
    nextHandlerResult = new HttpResponse({ status: 200 });
    httpHandlerSpy = jasmine.createSpy().and.returnValue(of(nextHandlerResult));

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    });
  });

  it('should be created', () => {
    expect(authInterceptor).toBeTruthy();
  });

  it('should add Authorization header when token exists', async () => {
    const token = 'test-token-12345';
    authServiceMock.getJwtToken.and.returnValue(token);
    
    const req = new HttpRequest('GET', '/api/test');
    
    TestBed.runInInjectionContext(() => {
      authInterceptor(req, httpHandlerSpy);
    });
    
    expect(httpHandlerSpy).toHaveBeenCalled();
    const modifiedRequest = httpHandlerSpy.calls.mostRecent().args[0] as HttpRequest<unknown>;
    expect(modifiedRequest.headers.has('Authorization')).toBeTrue();
    expect(modifiedRequest.headers.get('Authorization')).toBe(`Bearer ${token}`);
  });

  it('should not add Authorization header when token does not exist', async () => {
    authServiceMock.getJwtToken.and.returnValue(null);
    
    const req = new HttpRequest('GET', '/api/test');

    TestBed.runInInjectionContext(() => {
      authInterceptor(req, httpHandlerSpy);
    });
    
    expect(httpHandlerSpy).toHaveBeenCalled();
    const modifiedRequest = httpHandlerSpy.calls.mostRecent().args[0] as HttpRequest<unknown>;
    expect(modifiedRequest.headers.has('Authorization')).toBeFalse();
  });

  it('should maintain original headers when adding Authorization', async () => {
    const token = 'test-token-12345';
    authServiceMock.getJwtToken.and.returnValue(token);

    const req = new HttpRequest('GET', '/api/test', null, {
      headers: new HttpRequest<unknown>('GET', '').headers.set('X-Custom-Header', 'test-value')
    });
    
    TestBed.runInInjectionContext(() => {
      authInterceptor(req, httpHandlerSpy);
    });

    expect(httpHandlerSpy).toHaveBeenCalled();
    const modifiedRequest = httpHandlerSpy.calls.mostRecent().args[0] as HttpRequest<unknown>;
    expect(modifiedRequest.headers.has('Authorization')).toBeTrue();
    expect(modifiedRequest.headers.has('X-Custom-Header')).toBeTrue();
    expect(modifiedRequest.headers.get('X-Custom-Header')).toBe('test-value');
  });

  it('should not modify URL or method when adding token', async () => {
    const token = 'test-token-12345';
    authServiceMock.getJwtToken.and.returnValue(token);

    const testUrl = '/api/data';
    const testMethod = 'POST';
    const testBody = { data: 'test' };
    const req = new HttpRequest(testMethod, testUrl, testBody);
    
    TestBed.runInInjectionContext(() => {
      authInterceptor(req, httpHandlerSpy);
    });
    
    expect(httpHandlerSpy).toHaveBeenCalled();
    const modifiedRequest = httpHandlerSpy.calls.mostRecent().args[0] as HttpRequest<unknown>;
    expect(modifiedRequest.method).toBe(testMethod);
    expect(modifiedRequest.url).toBe(testUrl);
    expect(modifiedRequest.body).toBe(testBody);
  });

  it('should handle empty token as if there is no token', async () => {

    authServiceMock.getJwtToken.and.returnValue('');

    const req = new HttpRequest('GET', '/api/test');
    
    TestBed.runInInjectionContext(() => {
      authInterceptor(req, httpHandlerSpy);
    });
    
    expect(httpHandlerSpy).toHaveBeenCalled();
    const passedRequest = httpHandlerSpy.calls.mostRecent().args[0] as HttpRequest<unknown>;
    expect(passedRequest.headers.has('Authorization')).toBeFalse();
  });
});
