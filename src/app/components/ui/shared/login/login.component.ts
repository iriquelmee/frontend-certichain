import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ]
})
export class LoginComponent {
  loading = false;
  errorMessage = '';

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private router: Router) {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async onSubmit() {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor completa los campos correctamente.';
      return;
    }

    this.loading = true;

    const username = this.username?.value ?? '';
    const password = this.password?.value ?? '';

    try {
      //const user = await signIn({ username, password });
      //console.log('Usuario autenticado:', user);
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      console.error('Error en login:', error);
      this.errorMessage = error.message || 'Error al iniciar sesión.';
    } finally {
      this.loading = false;
    }
  }
}
