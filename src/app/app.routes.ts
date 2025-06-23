import { Routes } from '@angular/router';
import { InstitucionesComponent } from './components/ui/private/instituciones/instituciones.component';
import { UsuariosComponent } from './components/ui/private/usuarios/usuarios.component';
import { LoginComponent } from './components/ui/shared/login/login.component';
import { RegistroComponent } from './components/ui/shared/registro/registro.component';
import { ConfirmarRegistroComponent } from './components/ui/shared/confirmar-registro/confirmar-registro.component';
import { Error400Component } from './components/ui/sys/error-400/error-400.component';
import { Error500Component } from './components/ui/sys/error-500/error-500.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './components/ui/private/admin/admin.component';

export const routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'registro',
      component: RegistroComponent
    },
    {
      path: 'confirmar-registro',
      component: ConfirmarRegistroComponent
    },
    {
      path: 'admin',
      component: AdminComponent      
    },
    {
      path: 'instituciones',
      component: InstitucionesComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'usuarios',
      component: UsuariosComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'error-400',
      component: Error400Component
    },
    {
      path: 'error-500',
      component: Error500Component
    },
    {
      path: '**',
      redirectTo: 'login'
    }
  ];
