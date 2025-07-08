import { Component, OnInit, OnDestroy } from '@angular/core';
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
  successMessage = '';
  confirmarForm!: FormGroup;
  username: string = '';
  private authSubscription: any;

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
    
    this.authSubscription = this.authService.authState$.subscribe(authState => {
      this.loading = authState.isLoading;
      this.errorMessage = authState.error || '';
      this.successMessage = authState.successMessage || '';
    });
  }
  
  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
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

    try {
      const { username, code } = this.confirmarForm.value;
      await this.authService.confirmRegistration(username, code);
      
      // Esperar un momento para mostrar el mensaje de éxito
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } 
    catch (error: any) {
      console.error('Error en confirmación:', error);
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
