import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TabComponent } from '../../shared/tab/tab.component';
import { tabsUsuarios } from '../../../../../data';

@Component({
  selector: 'app-usuarios',
  imports: [CardModule, TabComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {
  tabs: any[] = [];

  ngOnInit() {
      this.tabs = tabsUsuarios;
  }
  title:string = "Usuarios";
}
