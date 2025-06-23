import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-instituciones-tipos-documentos',
  imports: [CardModule],
  templateUrl: './instituciones-tipos-documentos.component.html',
  styleUrl: './instituciones-tipos-documentos.component.scss'
})
export class InstitucionesTiposDocumentosComponent {
  title : string = "Tipos Documentos ";
}
