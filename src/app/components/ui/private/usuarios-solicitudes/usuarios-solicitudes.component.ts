import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DocumentInfo, DocumentListComponentComponent } from '../../../user-info/document-list-component/document-list-component.component';

@Component({
  selector: 'app-usuarios-solicitudes',
  imports: [CardModule,DocumentListComponentComponent],
  templateUrl: './usuarios-solicitudes.component.html',
  styleUrl: './usuarios-solicitudes.component.scss'
})
export class UsuariosSolicitudesComponent {
  title : string = "Solicitudes ";

  requests: DocumentInfo[] = [
    { name: 'Declaración Jurada', date: '01-01-2025', institution: 'Notaría' }
  ];
  
  onDownload(doc: DocumentInfo) {
    console.log('Descargar', doc);
  }

  onView(doc: DocumentInfo) {
    console.log('Visualizar', doc);
  }
}
