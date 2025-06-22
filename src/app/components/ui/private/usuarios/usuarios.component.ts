import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TabComponent } from '../../shared/tab/tab.component';

@Component({
  selector: 'app-usuarios',
  imports: [CardModule, TabComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {
  tabs: { title: string; value: number; content: string }[] = [];

  ngOnInit() {
      this.tabs = [
          { title: 'Informacion Usuario', value: 0, content: 'Tab 1 Content' },
          { title: 'Solicitudes', value: 1, content: 'Tab 2 Content' },
      ];
  }
  title:string = "Usuarios";
}
