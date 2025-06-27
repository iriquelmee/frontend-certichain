import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, FormsModule]
})
export class TableComponent implements OnInit {

  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Input() label: string = '';
  @Input() rows: number = 5;
  @Input() showCurrentPageReport: boolean = true;
  @Input() currentPageReportTemplate: string = 'Mostrando {first} hasta {last} de {totalRecords} registros';
  @Input() tableStyle: { [klass: string]: any } = { width: '100%' };

  @Output() onPageChange = new EventEmitter<any>();

  first: number = 0;
  filteredData: any[] = [];
  searchValue: string = '';

  ngOnInit() {
    this.filteredData = [...this.data];
  }

  ngOnChanges() {
    this.filteredData = [...this.data];
  }

  filterData() {
    if (!this.searchValue.trim()) {
      this.filteredData = [...this.data];
    } else {
      this.filteredData = this.data.filter(item => {
        return this.columns.some(col => {
          let value;
          
          // usa label si esta disponible para determinar como acceder a los datos
          if (this.label && col.campo.startsWith(this.label + '.')) {
            // si el campo comienza con el label, ej:user.name, eliminar el prefijo
            const campoSinLabel = col.campo.substring(this.label.length + 1);
            value = this.getCamposAnidados(item, campoSinLabel);
          } 
          else {
            // cualquier cosa
            value = col.campo.includes('.') ? 
              this.getCamposAnidados(item, col.campo) : 
              item[col.campo];
          }
          
          return value && value.toString().toLowerCase().includes(this.searchValue.toLowerCase());
        });
      });
    }
    this.first = 0;
  }

  getCamposAnidados(object: any, campo: string): any {
    // si el campo no incluye un punto, devuelve el preperty a secas
    if (!campo.includes('.')) {
      return object[campo];
    }
    
    // busca campos anidados dentro de un objeto
    return campo.split('.').reduce((valorActual, clave) => valorActual?.[clave], object);
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.onPageChange.emit(event);
  }

  isLastPage(): boolean {
    return this.filteredData ? this.first + this.rows >= this.filteredData.length : true;
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }
}
