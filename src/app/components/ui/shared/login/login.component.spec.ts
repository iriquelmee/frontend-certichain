import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let authServiceMock: any;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // mockeando login
    authServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(Promise.resolve({})),
      authState$: of({ user: null, isLoading: false, error: null })
    };

    routerMock = jasmine.createSpyObj('Router', ['navigate']);
  });

  // prueba simple verificando que el componente existe
  it('should exist', () => {
    expect(LoginComponent).toBeTruthy();
  });

  // revisando que la clase tenga las propiedades esperadas
  it('should have the expected properties', () => {
    expect(LoginComponent.prototype.hasOwnProperty('ngOnInit')).toBeTruthy();
    expect(LoginComponent.prototype.hasOwnProperty('onLogin')).toBeTruthy();
  });
});
