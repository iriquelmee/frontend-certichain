import { Routes } from '@angular/router';
import { CertificadosComponent } from './components/ui/private/certificados/certificados.component';
import { DashboardComponent } from './components/ui/private/dashboard/dashboard.component';
import { InstitucionesComponent } from './components/ui/private/instituciones/instituciones.component';
import { UsuariosComponent } from './components/ui/private/usuarios/usuarios.component';
import { LoginComponent } from './components/ui/shared/login/login.component';
import { ProfileComponent } from './components/ui/shared/profile/profile.component';
import { DemoComponent } from './components/ui/shared/demo/demo.component';
import { Error400Component } from './components/ui/sys/error-400/error-400.component';
import { Error500Component } from './components/ui/sys/error-500/error-500.component';

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
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'certificados',
      component: CertificadosComponent,
  
    },
    {
      path: 'instituciones',
      component: InstitucionesComponent,
  
    },
    {
      path: 'usuarios',
      component: UsuariosComponent,
  
    },
    {
      path: 'perfil',
      component: ProfileComponent,
    
    },    
    {
      path: 'demo',
      component: DemoComponent,
    
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
      redirectTo: 'dashboard'
    }
  ];