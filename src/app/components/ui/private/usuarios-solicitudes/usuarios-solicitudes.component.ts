import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableComponent } from '../../../shared/table/table.component';
import { documentos, documentosColumns} from '../../../../../data';

@Component({
  selector: 'app-usuarios-solicitudes',
  imports: [CardModule, TableComponent],
  templateUrl: './usuarios-solicitudes.component.html',
  styleUrl: './usuarios-solicitudes.component.scss'
})
export class UsuariosSolicitudesComponent implements OnInit {
  title : string = "Solicitudes";

  data!: any[];
  tableDocumentColumns! :any[];

  ngOnInit(){
    this.callApiDocumentos();
    
    if(this.data!=undefined){
      this.setTableColumnsHeaders();
    }

  }

  callApiDocumentos(){
    this.data = documentos;
  }

  setTableColumnsHeaders(){
    this.tableDocumentColumns = documentosColumns;
  }
}
