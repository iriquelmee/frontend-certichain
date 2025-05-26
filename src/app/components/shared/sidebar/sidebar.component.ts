import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuModule, BadgeModule, RippleModule, AvatarModule, RouterModule, CardModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  items: MenuItem[] | undefined;
  isSidebarOpen = false;
  
  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: '/dashboard'
      },
      {
        label: 'Certificados',
        icon: 'pi pi-fw pi-file',
        routerLink: '/certificados'
      },
      {
        label: 'Instituciones',
        icon: 'pi pi-fw pi-building',
        routerLink: '/instituciones'
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-users',
        routerLink: '/usuarios'
      },
      {
        label: 'Perfil',
        icon: 'pi pi-fw pi-user',
        routerLink: '/perfil'
      },      
      {
        label: 'Demo',
        icon: 'pi pi-bookmark-fill',
        routerLink: '/demo'
      },
      {
        separator: true
      },
      {
        label: 'error-400',
        icon: 'pi pi-fw pi-exclamation-triangle',
        routerLink: '/error-400'
      },
      {
        label: 'error-500',
        icon: 'pi pi-fw pi-times',
        routerLink: '/error-500'
      },
      {
        separator: true
      },
      {
        label: 'Login',
        icon: 'pi pi-fw pi-sign-in',
        routerLink: '/login'
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => {
          console.log('Cerrando sesión...');
        }
      },

    ];
    
  }
}
