import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    RouterModule
  ]
})
export class RegistroComponent implements OnInit {
  title: string = "Registro en CertiChain";
  subtitle: string = "Crea tu cuenta para acceder a la plataforma";
  loading = false;
  errorMessage = '';
  registroForm!: FormGroup;

  perfilOptions = [
    { label: 'Institución', value: 'institucion' },
    { label: 'Usuario Final', value: 'usuario' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registroForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      nickname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      perfil: ['usuario', [Validators.required]]
    });
  }

  async onRegistro() {
    if (this.registroForm.invalid) {
      return;
    }

    this.errorMessage = '';
    this.loading = true;

    try {
      const { username, nickname, password, email, perfil } = this.registroForm.value;
      
      await this.authService.register(username, password, email, perfil, nickname);
    
      localStorage.setItem('temp_confirm_username', username);
      
      this.errorMessage = 'Registro exitoso. Ahora debes verificar tu cuenta con el código enviado a tu correo.';
      
      setTimeout(() => {
        this.router.navigate(['/confirmar-registro']);
      }, 2000);
    } 
    catch (error: any) {
      this.errorMessage = error.message || 'Error al registrar usuario.';
    } 
    finally {
      this.loading = false;
    }
  }
}
