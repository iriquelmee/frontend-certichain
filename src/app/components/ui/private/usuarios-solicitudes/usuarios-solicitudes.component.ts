import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DocumentInfo, DocumentListComponentComponent } from '../../../user-info/document-list-component/document-list-component.component';
import { SearchDocumentRequestInfo } from '../../../../models/search-document-request-info';

@Component({
  selector: 'app-usuarios-solicitudes',
  imports: [CardModule,DocumentListComponentComponent],
  templateUrl: './usuarios-solicitudes.component.html',
  styleUrl: './usuarios-solicitudes.component.scss'
})
export class UsuariosSolicitudesComponent {
  title : string = "Solicitudes ";
  @Input() isActive = false;
  @Input() requests: SearchDocumentRequestInfo[] = [];
  
  onDownload(doc: SearchDocumentRequestInfo) {
    console.log('Descargar', doc);
  }

  onView(doc: SearchDocumentRequestInfo) {
    console.log('Visualizar', doc);
  }
}
