import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DocumentTypeService } from '../../../../services/documenttype/document-type.service';
import { DocumentType } from '../../../../models/document-type';
import { AuthService } from '../../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-instituciones-tipos-documentos',
    imports: [CommonModule, FormsModule, CardModule],
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

    constructor(private documentTypeService: DocumentTypeService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.loadAll();
    }

    private loadAll() {
        this.userId = this.authService.currentUser?.id || '';
        this.documentTypeService.getByUserId(this.userId)
            .subscribe(types => {
                this.allTypes = types;
                this.filteredTypes = [...types];
            });
    }

    onSearch(): void {
        const id = this.searchId.trim();
        const nombre = this.searchNombre.trim().toLowerCase();
        this.filteredTypes = this.allTypes.filter(t =>
            (!id || t.id?.includes(id)) &&
            (!nombre || t.name.toLowerCase().includes(nombre))
        );
    }

    onCreate(): void {
        const nombre = this.createNombre.trim();
        if (!nombre && !this.userId) return;
        const newDocumentType: DocumentType = {
            id: '',
            userID: this.userId,
            name: nombre,
            state: 'Activo'
        }
        this.documentTypeService.create(newDocumentType)
            .subscribe(() => {
                this.createNombre = '';
                this.loadAll();
            });
    }

    toggleEstado(item: DocumentType): void {
        if (!item.id) return;
        item.state = item.state === 'Activo' ? 'Inactivo' : 'Activo';
        this.documentTypeService.update(item.id, item)
            .subscribe(() => {
                this.loadAll();
            });
    }
}
