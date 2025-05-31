import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule
  ]
})
export class LoginComponent {
  title:string = "Bienvenido a CertiChain";
  subtitle:string= "Inicia sesión para acceder a la plataforma"
  loading = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async onLogin() {
    this.errorMessage = '';
    this.loading = true;

    try {
      await this.authService.login();
    } 
    catch (error: any) {
      this.errorMessage = error.message || 'Error al iniciar sesión.';
    } 
    finally {
      this.loading = false;
    }
  }
}
