import { NgModule, Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// Componente vacío para usar en rutas de prueba
@Component({
  template: '<div></div>'
})
class EmptyComponent {}

// Rutas vacías para las pruebas
const routes = [
  { path: '', component: EmptyComponent },
  { path: 'login', component: EmptyComponent },
  { path: 'dashboard', component: EmptyComponent },
  { path: 'confirmar-registro', component: EmptyComponent }
];

// modulo para pruebas que proporciona los proveedores y modulos
// importando modulo de pruebas para evitar errores de inyeccion de dependencias
@NgModule({
  imports: [
    HttpClientTestingModule,
    RouterTestingModule.withRoutes(routes),
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
    MessageService,
    {
      provide: Router,
      useClass: class {
        navigate = jasmine.createSpy('navigate');
        navigateByUrl = jasmine.createSpy('navigateByUrl');
        createUrlTree = jasmine.createSpy('createUrlTree');
        parseUrl = jasmine.createSpy('parseUrl');
      }
    }
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TestingModule { }
