import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TabComponent } from '../../shared/tab/tab.component';
import { tabsInstituciones } from '../../../../../data';

@Component({
  selector: 'app-instituciones',
  imports: [CardModule,TabComponent],
  templateUrl: './instituciones.component.html',
  styleUrl: './instituciones.component.scss'
})
export class InstitucionesComponent implements OnInit {
  tabs: any[] = [];

  ngOnInit() {
      this.tabs = tabsInstituciones;
  }
  title:string = "Instituciones";
}
