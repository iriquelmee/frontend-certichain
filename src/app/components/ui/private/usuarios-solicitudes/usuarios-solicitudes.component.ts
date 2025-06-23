import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-usuarios-solicitudes',
  imports: [CardModule],
  templateUrl: './usuarios-solicitudes.component.html',
  styleUrl: './usuarios-solicitudes.component.scss'
})
export class UsuariosSolicitudesComponent {
  title : string = "Solicitudes ";
}
