import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableComponent } from '../../../shared/table/table.component';
import { institucionTiposDocumento, institucionTiposDocumentoColumns } from '../../../../../data';

@Component({
  selector: 'app-instituciones-tipos-documentos',
  imports: [CardModule, TableComponent],
  templateUrl: './instituciones-tipos-documentos.component.html',
  styleUrl: './instituciones-tipos-documentos.component.scss'
})
export class InstitucionesTiposDocumentosComponent implements OnInit {
  title : string = "Tipos docuemntos";

  data!: any[];
  tableInstitucionTiposDocumentoColumns! :any[];

  ngOnInit(){
    this.callApiTipodocumento();
    
    if(this.data!=undefined){
      this.setTableColumnsHeaders();
    }

  }

  callApiTipodocumento(){
    this.data = institucionTiposDocumento;
  }

  setTableColumnsHeaders(){
    this.tableInstitucionTiposDocumentoColumns = institucionTiposDocumentoColumns;
  }
}
