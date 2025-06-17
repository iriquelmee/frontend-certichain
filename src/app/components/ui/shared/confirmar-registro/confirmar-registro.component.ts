import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-confirmar-registro',
  templateUrl: './confirmar-registro.component.html',
  styleUrls: ['./confirmar-registro.component.scss'],
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
export class ConfirmarRegistroComponent implements OnInit {
  title: string = "Confirmar Registro";
  subtitle: string = "Ingresa el código de verificación que recibiste por correo";
  loading = false;
  errorMessage = '';
  confirmarForm!: FormGroup;
  username: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Intentar recuperar el username guardado durante el registro
    const savedUsername = localStorage.getItem('temp_confirm_username');
    if (savedUsername) {
      this.username = savedUsername;
      // Limpiar después de recuperarlo
      localStorage.removeItem('temp_confirm_username');
    }
    
    this.initForm();
  }

  initForm(): void {
    this.confirmarForm = this.fb.group({
      username: [this.username, [Validators.required]],
      code: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onConfirmar() {
    if (this.confirmarForm.invalid) {
      return;
    }

    this.errorMessage = '';
    this.loading = true;

    try {
      const { username, code } = this.confirmarForm.value;
      await this.authService.confirmRegistration(username, code);
      
      // Esperar un momento para mostrar el mensaje de éxito
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } 
    catch (error: any) {
      this.errorMessage = error.message || 'Error al confirmar el registro.';
    } 
    finally {
      this.loading = false;
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
