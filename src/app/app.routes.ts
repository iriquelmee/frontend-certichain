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
import { AuthGuard } from './guards/auth.guard';

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
      canActivate: [AuthGuard]
    },
    {
      path: 'certificados',
      component: CertificadosComponent,
      canActivate: [AuthGuard]
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
      path: 'perfil',
      component: ProfileComponent,
      canActivate: [AuthGuard]
    },    
    {
      path: 'demo',
      component: DemoComponent,
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
