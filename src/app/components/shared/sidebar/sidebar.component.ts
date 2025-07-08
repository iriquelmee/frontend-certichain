import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { RouterModule, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { AuthState } from '../../../models/user.model';
import { sidebarItems } from '../../../../data';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuModule, BadgeModule, RippleModule, AvatarModule, RouterModule, CardModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  items: MenuItem[] | undefined;
  isSidebarOpen = false;
  isAuthenticated = false;
  private authSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authSubscription = this.authService.authState$.subscribe((authState: AuthState) => {
      this.isAuthenticated = authState.user?.isAuthenticated || false;
      this.buildMenuItems();
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private buildMenuItems() {
    // filtrando items para eliminar cualquier boton de login/logout sobrante
    const filteredItems = sidebarItems.filter(item => 
      item.label !== 'Login' && item.label !== 'Logout'
    );
    
    this.items = [...filteredItems];

    if (this.isAuthenticated) {
      this.items.push({
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.logout()
      });
    } 
    else {
      this.items.push({
        label: 'Login',
        icon: 'pi pi-fw pi-sign-in',
        routerLink: '/login'
      });
    }
  }

  private logout() {
    this.authService.logout();
  }
}
