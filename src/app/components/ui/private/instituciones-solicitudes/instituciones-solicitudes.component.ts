import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableComponent } from '../../../shared/table/table.component';
import { institucionSolicitudes, institucionSolicitudesColumns } from '../../../../../data';

@Component({
  selector: 'app-instituciones-solicitudes',
  imports: [CardModule,TableComponent],
  templateUrl: './instituciones-solicitudes.component.html',
  styleUrl: './instituciones-solicitudes.component.scss'
})
export class InstitucionesSolicitudesComponent implements OnInit {
  title : string = "Solicitudes";

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
