import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User, AuthState } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute, CognitoUserSession, ISignUpResult} from 'amazon-cognito-identity-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private jwtToken: string|null = null;
  private authStateSubject = new BehaviorSubject<AuthState>({user: null, isLoading: false, error: null});
  public authState$ = this.authStateSubject.asObservable();
  private userPool: CognitoUserPool;

  constructor(private router: Router) {
    this.userPool = new CognitoUserPool({UserPoolId: environment.auth.userPoolId, ClientId: environment.auth.clientId});
    this.checkSession();
  }

  private checkSession(): void {
    const cognitoUser = this.userPool.getCurrentUser();
    
    if (cognitoUser) {
      cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
        if (err) {
          console.error('Error al recuperar sesión:', err);
          return;
        }
        
        if (session && session.isValid()) {
          cognitoUser.getUserAttributes((err, attributes) => {
            if (err) {
              console.error('Error al obtener atributos:', err);
              return;
            }
            
            if (attributes) {
              const userData: any = {};
              attributes.forEach(attr => {
                userData[attr.getName()] = attr.getValue();
              });
              
              const idToken = session.getIdToken().getJwtToken();
              this.jwtToken = idToken;
              try {
                const tokenPayload = JSON.parse(atob(idToken.split('.')[1]));
                userData['cognito:groups'] = tokenPayload['cognito:groups'] || [];
              } 
              catch (e) {
                userData['cognito:groups'] = [];
              }
              this.setUserAuthenticated(userData);
            }
          });
        }

      });
    }
  }

  login(username: string, password: string): Promise<CognitoUserSession> {
    this.setLoading();

    const authData = { Username: username, Password: password };
    
    return new Promise((resolve, reject) => {
      try {
        // Enfoque más directo usando AuthenticationDetails y CognitoUser
        // Configuramos el objeto de usuario de manera explícita
        const authDetails = new AuthenticationDetails(authData); 
        const userData = { Username: username,Pool: this.userPool };
        const cognitoUser = new CognitoUser(userData);
        
        console.log('Intentando login para usuario:', username);
        
        const authenticationFlow = {
          onSuccess: (session: CognitoUserSession) => {
            console.log('Login exitoso, obteniendo atributos');
            
            cognitoUser.getUserAttributes((err, attributes) => {
              if (err) {
                console.error('Error al obtener atributos:', err);
                this.setError('Error al obtener datos del usuario');
                reject(err);
                return;
              }
              
              if (attributes) {
                const userData: any = {};
                attributes.forEach(attr => {
                  userData[attr.getName()] = attr.getValue();
                  console.log(`Atributo obtenido: ${attr.getName()} = ${attr.getValue()}`);
                });
                
                // Agregar grupos si están disponibles
                const idToken = session.getIdToken().getJwtToken();
                this.jwtToken = idToken;
                try {
                  const tokenPayload = JSON.parse(atob(idToken.split('.')[1]));
                  userData['cognito:groups'] = tokenPayload['cognito:groups'] || [];
                } catch (e) {
                  console.error('Error al decodificar token:', e);
                  userData['cognito:groups'] = [];
                }
                
                console.log('Usuario autenticado con éxito, navegando a dashboard');
                this.setUserAuthenticated(userData);
                this.router.navigate(['/dashboard']);
                resolve(session);
              }
            });
          },
          onFailure: (err: any) => {
            console.error('Error específico de autenticación:', err);
            
            // Handle errores comunes
            if (err.code === 'UserNotConfirmedException') {
              this.setError('La cuenta no ha sido verificada. Revisa tu correo para confirmar tu cuenta.');
            } 
            else if (err.code === 'NotAuthorizedException') {
              this.setError('Credenciales incorrectas. Verifica tu usuario o contraseña.');
            } 
            else if (err.code === 'UserNotFoundException') {
              this.setError('El usuario no existe.');
            } 
            else {
              this.setError(err.message || 'Error al iniciar sesión');
            }
            
            reject(err);
          },
          newPasswordRequired: (userAttributes: any, requiredAttributes: any) => {
            // Handle usuarios que necesitan cambiar contraseña
            console.log('Se requiere cambio de contraseña');
            this.setError('Se requiere cambiar la contraseña');
            reject(new Error('Se requiere cambiar la contraseña'));
          }
        };
        
        cognitoUser.authenticateUser(authDetails, authenticationFlow);
        
      } catch (error: any) {
        console.error('Error general en el proceso de login:', error);
        this.setError('Error en la autenticación: ' + (error.message || 'Error desconocido'));
        reject(error);
      }
    });
  }

  register(username: string, password: string, email: string, perfil: string, nickname: string): Promise<ISignUpResult> {
    this.setLoading();
    
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({ Name: 'nickname', Value: nickname }),
      new CognitoUserAttribute({ Name: 'custom:perfil', Value: perfil })
    ];
    
    return new Promise((resolve, reject) => {
      this.userPool.signUp(username, password, attributeList, [], (err, result) => {
        if (err) {
          console.error('Error en registro:', err);
          this.setError(err.message || 'Error al registrar usuario');
          reject(err);
          return;
        }
        
        if (result) {
          console.log('Registro exitoso, verificación requerida:', !result.userConfirmed);
          this.setError(result.userConfirmed ? 'Registro exitoso, ya puede iniciar sesión' : 'Registro exitoso, por favor verifique su correo electrónico');
          resolve(result);
        }
      });
    });
  }

  confirmRegistration(username: string, code: string): Promise<string> {
    this.setLoading();
    
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.userPool
    });
    
    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          console.error('Error al confirmar registro:', err);
          this.setError(err.message || 'Error al confirmar registro');
          reject(err);
          return;
        }
        
        this.setError('Registro confirmado, ya puede iniciar sesión');
        resolve(result);
      });
    });
  }

  private setUserAuthenticated(userData: any): void {
    const user: User = {
      id: userData.sub,
      username: userData.preferred_username || userData['cognito:username'] || userData.sub || userData.email || 'User',
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
    this.authStateSubject.next({ ...this.authStateSubject.value, isLoading: false, error: message });
  }

  logout(): void {
    const cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      this.authStateSubject.next({ user: null, isLoading: false, error: null });
      window.sessionStorage.clear();
      window.localStorage.clear();
      this.router.navigate(['/login']);
    }
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

  setJwt(token: string) { this.jwtToken = token; }

  getJwtToken(): string|null { return this.jwtToken; }

}