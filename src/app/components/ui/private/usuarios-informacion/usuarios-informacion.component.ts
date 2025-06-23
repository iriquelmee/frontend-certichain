import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-usuarios-informacion',
  imports: [CardModule],
  templateUrl: './usuarios-informacion.component.html',
  styleUrl: './usuarios-informacion.component.scss'
})
export class UsuariosInformacionComponent {
  title : string = "Informacion";
}
