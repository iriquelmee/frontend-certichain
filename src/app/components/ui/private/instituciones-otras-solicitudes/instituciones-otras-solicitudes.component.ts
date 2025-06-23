import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-instituciones-otras-solicitudes',
  imports: [CardModule],
  templateUrl: './instituciones-otras-solicitudes.component.html',
  styleUrl: './instituciones-otras-solicitudes.component.scss'
})
export class InstitucionesOtrasSolicitudesComponent {
  title : string = "Otras Solicitudes ";
}
