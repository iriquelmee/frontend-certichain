import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-instituciones-solicitudes',
  imports: [CardModule],
  templateUrl: './instituciones-solicitudes.component.html',
  styleUrl: './instituciones-solicitudes.component.scss'
})
export class InstitucionesSolicitudesComponent {
  title : string = "Solicitudes ";
}
