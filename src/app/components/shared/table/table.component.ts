import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class TableComponent implements OnInit, OnChanges {

  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Input() label: string = '';
  @Input() rows: number = 5;
  @Input() showCurrentPageReport: boolean = true;
  @Input() currentPageReportTemplate: string = 'Mostrando {first} hasta {last} de {totalRecords} registros';
  @Input() tableStyle: { [klass: string]: any } = { width: '100%' };
  @Input() showActions: boolean = false;
  @Input() getUserTypeName: Function = (id: string) => id;

  @Output() onPageChange = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onToggleActive = new EventEmitter<any>();

  first: number = 0;
  filteredData: any[] = [];
  searchValue: string = '';

  ngOnInit() {
    this.filteredData = [...this.data];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (this.searchValue && this.searchValue.trim()) {
        this.filterData();
      } 
      else {
        this.filteredData = [...this.data];
      }
    }
  }

  filterData() {
    if (!this.searchValue.trim()) {
      this.filteredData = [...this.data];
      return;
    }

    const searchText = this.searchValue.toLowerCase();
    
    // aplicando filtro para toda la data
    this.filteredData = this.data.filter(row => {
      try {
        const rowStr = JSON.stringify(row).toLowerCase();
        return rowStr.includes(searchText);
      } catch (e) {
        console.warn('Error filtering row:', e);
        return false;
      }
    });
    
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

  handleEdit(row: any) {
    this.onEdit.emit(row);
  }

  handleToggleActive(row: any) {
    this.onToggleActive.emit(row);
  }
}
