import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DocumentTypeService } from '../../../../services/documenttype/document-type.service';
import { DocumentType } from '../../../../models/document-type';
import { AuthService } from '../../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../../shared/table/table.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonComponent } from '../../../shared/button/button.component';
import { DatePickerModule } from 'primeng/datepicker';
import { ToastService } from '../../../../services/shared/toast.service';

@Component({
    selector: 'app-instituciones-tipos-documentos',
    imports: [CommonModule, FormsModule, CardModule, TableComponent,InputTextModule, ButtonComponent, DatePickerModule],
    templateUrl: './instituciones-tipos-documentos.component.html',
    styleUrl: './instituciones-tipos-documentos.component.scss'
})
export class InstitucionesTiposDocumentosComponent implements OnInit {
    title: string = "Tipos docuemntos";
    userId = '';
    allTypes: DocumentType[] = [];
    filteredTypes: DocumentType[] = [];
    searchId: string = '';
    searchNombre: string = '';
    createNombre: string = '';
    documentTypeColumns : any[] = [];

    constructor(private documentTypeService: DocumentTypeService,
        private authService: AuthService,
        private toastService: ToastService
    ) { }

    ngOnInit(): void {
        this.loadAll();
        this.setDocumentTypeColumns();
    }

    private loadAll() {
        this.userId = this.authService.currentUser?.id || '';
        this.documentTypeService.getByUserId(this.userId)
            .subscribe({
                next: types => {
                    this.allTypes = types;
                    this.filteredTypes = [...types];
                    console.log("this.filteredTypes",this.filteredTypes);
                    this.toastService.success('Tipos de Documentos', 'Tipos de documentos cargados correctamente');
                },
                error: err => {
                    this.toastService.error('Error', 'Error al cargar tipos de documentos: ' + err.message);
                    console.error('Error al cargar tipos de documentos:', err);
                }
            });
    }

    onSearch(): void {
        const id = this.searchId.trim();
        const nombre = this.searchNombre.trim().toLowerCase();
        this.filteredTypes = this.allTypes.filter(t =>
            (!id || t.id?.includes(id)) &&
            (!nombre || t.name.toLowerCase().includes(nombre))
        );
        
        const resultCount = this.filteredTypes.length;
        this.toastService.info('Búsqueda', `Se encontraron ${resultCount} tipos de documentos`);
    }

    onCreate(): void {
        const nombre = this.createNombre.trim();
        if (!nombre) {
            this.toastService.warning('Advertencia', 'Debe ingresar un nombre para el tipo de documento');
            return;
        }
        
        if (!this.userId) {
            this.toastService.error('Error', 'No se puede identificar el usuario actual');
            return;
        }
        
        const newDocumentType: DocumentType = {
            id: '',
            userID: this.userId,
            name: nombre,
            state: 'Activo'
        }
        
        this.documentTypeService.create(newDocumentType)
            .subscribe({
                next: () => {
                    this.toastService.success('Éxito', `Tipo de documento "${nombre}" creado correctamente`);
                    this.createNombre = '';
                    this.loadAll();
                },
                error: err => {
                    this.toastService.error('Error', `Error al crear tipo de documento: ${err.message}`);
                    console.error('Error al crear tipo de documento:', err);
                }
            });
    }

    toggleEstado(item: DocumentType): void {
        if (!item.id) {
            this.toastService.warning('Advertencia', 'ID de documento no válido');
            return;
        }
        
        const nuevoEstado = item.state === 'Activo' ? 'Inactivo' : 'Activo';
        item.state = nuevoEstado;
        
        this.documentTypeService.update(item.id, item)
            .subscribe({
                next: () => {
                    this.toastService.success('Estado Actualizado', `Tipo de documento "${item.name}" cambiado a "${nuevoEstado}"`);
                    this.loadAll();
                },
                error: err => {
                    this.toastService.error('Error', `Error al actualizar estado: ${err.message}`);
                    console.error('Error al actualizar estado:', err);
                    item.state = item.state === 'Activo' ? 'Inactivo' : 'Activo';
                }
            });
    }

    setDocumentTypeColumns() {
        this.documentTypeColumns = [
            { header: 'ID', campo: 'id' },
            { header: 'Nombre Tipo', campo: 'name' },
            { header: 'Estado', campo: 'state' },
            { header: 'Acción', campo: 'actions' }
        ];
    }   
}
