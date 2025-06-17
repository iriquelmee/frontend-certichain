import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    RouterModule
  ]
})
export class LoginComponent implements OnInit {
  title: string = "Bienvenido a CertiChain";
  subtitle: string = "Inicia sesión y accede a la plataforma";
  loading = false;
  errorMessage = '';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.errorMessage = '';
    this.loading = true;

    try {
      const { username, password } = this.loginForm.value;
      await this.authService.login(username, password);
    } 
    catch (error: any) {
      this.errorMessage = error.message || 'Error al iniciar sesión.';
      
      // Manejar caso específico de usuario recién registrado sin verificar
      if (error.code === 'UserNotConfirmedException') {
        // Guardar el username para la pantalla de confirmación
        localStorage.setItem('temp_confirm_username', this.loginForm.value.username);
        this.errorMessage = 'Tu cuenta aún no ha sido verificada. Necesitas ingresar el código de verificación que recibiste por correo.';
        
        // Añadir un botón de redirección a la página de confirmación
        setTimeout(() => {
          this.router.navigate(['/confirmar-registro']);
        }, 2000);
      }
    } 
    finally {
      this.loading = false;
    }
  }
}
