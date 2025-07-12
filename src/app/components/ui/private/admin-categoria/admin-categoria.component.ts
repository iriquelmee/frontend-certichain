import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { UserSubType } from '../../../../models/user-sub-type';
import { UserTypeService } from '../../../../services/usertype/user-type.service';
import { UserSubTypeService } from '../../../../services/usersubtype/user-sub-type.service';
import { UserType } from '../../../../models/user-type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../../shared/table/table.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ToastService } from '../../../../services/shared/toast.service';

@Component({
    selector: 'app-admin-categoria',
    imports: [CommonModule,FormsModule,CardModule,TableComponent, InputTextModule, ButtonComponent],
    templateUrl: './admin-categoria.component.html',
    styleUrl: './admin-categoria.component.scss'
})
export class AdminCategoriaComponent {
    title: string = "Categoria ";
    userTypes: UserType[] = [];
    userSubTypes: UserSubType[] = [];
    newUserTypeName = '';
    newUserSubTypeName = '';
    userTypeColumns: any[] = [];
    userSubTypeColumns: any[] = [];

    constructor(
        private userTypeSvc: UserTypeService,
        private userSubTypeSvc: UserSubTypeService,
        private toastService: ToastService
    ) { }

    ngOnInit() {
        this.loadUserTypes();
        this.loadUserSubTypes();
        this.setUserTypeColumns();
        this.setUserSubTypeColumns();
    }
    
    setUserTypeColumns() {
        this.userTypeColumns = [
            { header: 'ID', campo: 'id' },
            { header: 'Nombre', campo: 'name' },
            { header: 'Estado', campo: 'state' },
            { header: 'Acción', campo: 'actions' }
        ];
    }
    
    setUserSubTypeColumns() {
        this.userSubTypeColumns = [
            { header: 'ID', campo: 'id' },
            { header: 'Nombre', campo: 'name' },
            { header: 'Estado', campo: 'state' },
            { header: 'Acción', campo: 'actions' }
        ];
    }

    loadUserTypes() {
        this.userTypeSvc.getAll().subscribe({
            next: (list) => {
                this.userTypes = list;
                this.toastService.info('Tipos de Usuario', 'Tipos de usuario cargados correctamente');
            },
            error: (err) => {
                this.toastService.error('Error', 'Error al cargar tipos de usuario: ' + err.message);
                console.error('Error al cargar tipos de usuario:', err);
            }
        });
    }

    loadUserSubTypes() {
        this.userSubTypeSvc.getAll().subscribe({
            next: (list) => {
                this.userSubTypes = list;
                this.toastService.info('Subtipos de Usuario', 'Subtipos de usuario cargados correctamente');
            },
            error: (err) => {
                this.toastService.error('Error', 'Error al cargar subtipos de usuario: ' + err.message);
                console.error('Error al cargar subtipos de usuario:', err);
            }
        });
    }

    createUserType() {
        if (!this.newUserTypeName.trim()) {
            this.toastService.warning('Advertencia', 'Debe ingresar un nombre para el tipo de usuario');
            return;
        }
        const payload: UserType = { id: null, name: this.newUserTypeName, state: 'Activo' };
        this.userTypeSvc.create(payload)
            .subscribe({
                next: () => {
                    this.toastService.success('Éxito', `Tipo de usuario "${this.newUserTypeName}" creado correctamente`);
                    this.newUserTypeName = '';
                    this.loadUserTypes();
                },
                error: (err) => {
                    this.toastService.error('Error', 'Error al crear tipo de usuario: ' + err.message);
                    console.error('Error al crear tipo de usuario:', err);
                }
            });
    }

    toggleUserTypeState(t: UserType) {
        const nuevoEstado = t.state === 'Activo' ? 'Inactivo' : 'Activo';
        const updated = { ...t, state: nuevoEstado };
        if (t.id) {
            this.userTypeSvc.update(t.id, updated)
            .subscribe({
                next: () => {
                    this.toastService.success('Estado Actualizado', `Tipo de usuario "${t.name}" cambiado a "${nuevoEstado}"`);
                    this.loadUserTypes();
                },
                error: (err) => {
                    this.toastService.error('Error', 'Error al actualizar estado: ' + err.message);
                    console.error('Error al actualizar estado:', err);
                }
            });
        }
    }

    createUserSubType() {
        if (!this.newUserSubTypeName.trim()) {
            this.toastService.warning('Advertencia', 'Debe ingresar un nombre para el subtipo de usuario');
            return;
        }
        const payload: UserSubType = { id: null, name: this.newUserSubTypeName, state: 'Activo' };
        this.userSubTypeSvc.create(payload)
            .subscribe({
                next: () => {
                    this.toastService.success('Éxito', `Subtipo de usuario "${this.newUserSubTypeName}" creado correctamente`);
                    this.newUserSubTypeName = '';
                    this.loadUserSubTypes();
                },
                error: (err) => {
                    this.toastService.error('Error', 'Error al crear subtipo de usuario: ' + err.message);
                    console.error('Error al crear subtipo de usuario:', err);
                }
            });
    }

    toggleUserSubTypeState(st: UserSubType) {
        const nuevoEstado = st.state === 'Activo' ? 'Inactivo' : 'Activo';
        const updated = { ...st, state: nuevoEstado };
        if (st.id) {
            this.userSubTypeSvc.update(st.id, updated)
            .subscribe({
                next: () => {
                    this.toastService.success('Estado Actualizado', `Subtipo de usuario "${st.name}" cambiado a "${nuevoEstado}"`);
                    this.loadUserSubTypes();
                },
                error: (err) => {
                    this.toastService.error('Error', 'Error al actualizar estado: ' + err.message);
                    console.error('Error al actualizar estado:', err);
                }
            });
        }
    }

}
