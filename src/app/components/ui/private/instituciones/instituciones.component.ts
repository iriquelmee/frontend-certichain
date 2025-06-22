import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TabComponent } from '../../shared/tab/tab.component';

@Component({
  selector: 'app-instituciones',
  imports: [CardModule,TabComponent],
  templateUrl: './instituciones.component.html',
  styleUrl: './instituciones.component.scss'
})
export class InstitucionesComponent implements OnInit {
  tabs: { title: string; value: number; content: string }[] = [];

  ngOnInit() {
      this.tabs = [
          { title: 'Administrar Solicitudes', value: 0, content: 'Tab 1 Content' },
          { title: 'Administrar Tipos Documentos', value: 1, content: 'Tab 2 Content' },
          { title: 'Administrar Otras Solicitudes', value: 2, content: 'Tab 3 Content' },
      ];
  }
  title:string = "Instituciones";
}
