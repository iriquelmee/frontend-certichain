import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SidebarComponent, CardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'certichain';
}
