import { NgModule } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

// modulo para pruebas que proporciona los proveedores y modulos
// importando modulo de pruebas para evitar errores de inyeccion de dependencias
@NgModule({
  imports: [
    HttpClientTestingModule,
    RouterTestingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HttpClientTestingModule,
    RouterTestingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    MessageService
  ]
})
export class TestingModule { }
