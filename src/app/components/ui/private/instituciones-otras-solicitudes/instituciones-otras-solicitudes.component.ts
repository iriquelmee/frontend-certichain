import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { institucionSolicitudes, institucionSolicitudesColumns } from '../../../../../data';
import { TableComponent } from '../../../shared/table/table.component';

@Component({
  selector: 'app-instituciones-otras-solicitudes',
  imports: [CardModule, TableComponent],
  templateUrl: './instituciones-otras-solicitudes.component.html',
  styleUrl: './instituciones-otras-solicitudes.component.scss'
})
export class InstitucionesOtrasSolicitudesComponent implements OnInit {
  title : string = "Otras Solicitudes";

  data!: any[];
  tableSolicitudesColumns! :any[];

  ngOnInit(){
    this.callApiSolicitudes();
    
    if(this.data!=undefined){
      this.setTableColumnsHeaders();
    }

  }

  callApiSolicitudes(){
    this.data = institucionSolicitudes;
  }

  setTableColumnsHeaders(){
    this.tableSolicitudesColumns = institucionSolicitudesColumns;
  }
}
