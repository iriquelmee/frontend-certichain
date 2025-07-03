import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { UserData } from '../../../../models/user-data';
import { UserDataService } from '../../../../services/userdata/user-data.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { UserType } from '../../../../models/user-type';
import { UserSubType } from '../../../../models/user-sub-type';
import { UserSubTypeService } from '../../../../services/usersubtype/user-sub-type.service';
import { UserTypeService } from '../../../../services/usertype/user-type.service';

@Component({
    selector: 'app-admin-usuarios',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CardModule],
    templateUrl: './admin-usuarios.component.html',
    styleUrl: './admin-usuarios.component.scss'
})
export class AdminUsuariosComponent {
    title: string = "Usuarios ";
    searchForm!: FormGroup;
    editForm!: FormGroup;
    filteredUsers: UserData[] = [];
    selectedUser: UserData | null = null;

    tipos: UserType[] = [];
    subtipos: UserSubType[] = [];

    constructor(
        private fb: FormBuilder,
        private userDataService: UserDataService,
        private authService: AuthService,
        private userSubTypeService: UserSubTypeService,
        private userTypeService: UserTypeService
    ) { }

    ngOnInit(): void {
        this.searchForm = this.fb.group({
            nombre: ['']
        });
        this.editForm = this.fb.group({
            nombre: [{ value: '', disabled: true }, Validators.required],
            tipo: [null, Validators.required],
            subtipo: [null],
            activo: [false]
        });
        this.userTypeService.getAll().subscribe({
            next: (data) => {
                this.tipos = data.filter(item =>
                    item.state?.toLowerCase() === 'activo'
                );
            },
            error: (err) => {
                console.error('Error al obtener tipos de usuarios:', err);
            }
        })
        this.userSubTypeService.getAll().subscribe({
            next: (data) => {
                this.subtipos = data.filter(item =>
                    item.state?.toLowerCase() === 'activo'
                );
            },
            error: (err) => {
                console.error('Error al obtener subtipos de usuarios:', err);
            }
        })
        this.loadUserData();
    }

    loadUserData() {
        this.userDataService.getAll().subscribe({
            next: (data) => {
                this.filteredUsers = data;
            },
            error: (err) => {
                console.error('Error al buscar usuarios:', err);
                this.filteredUsers = [];
            }
        })
    }

    updateUserData(updated: UserData){
        if (updated.id) {
            this.userDataService.update(updated.id, updated).subscribe({
                next: (data) => {
                    this.loadUserData();
                },
                error: (err) => {
                    console.error('Error al actualizar usuarios:', err);
                    return;
                }
            })
        }
    }

    onSearch(): void {
        const nombre = this.searchForm.value;
        this.filteredUsers = this.filteredUsers.filter(u => u.name.toLowerCase().includes(nombre.toLowerCase()) );
    }

    onEdit(user: UserData): void {
        this.selectedUser = { ...user };
        this.editForm.reset({
            nombre: this.selectedUser.name,
            tipo: this.selectedUser.userTypeId,
            subtipo: this.selectedUser.userSubTypeId,
            activo: this.selectedUser.status === 'Activo'
        });
        this.editForm.get('nombre')!.disable();
    }

    onToggleActive(user: UserData): void {
        const updated = { ...user, status: user.status === 'Activo' ? 'Inactivo' : 'Activo' };
        this.updateUserData(updated);
    }

    onApplyChanges(): void {
        if (!this.selectedUser || this.editForm.invalid) return;
        const cambios = this.editForm.getRawValue();
        this.selectedUser.userSubTypeId = cambios.subtipo;
        this.selectedUser.userTypeId = cambios.tipo;
        this.selectedUser.status = cambios.activo ? 'Activo' : 'Inactivo';
        this.updateUserData(this.selectedUser);
    }

    cancelEdit(): void {
        this.selectedUser = null;
        this.editForm.reset();
    }

    getUserTypeName(id: string): string {
        const type = this.tipos.find(t => t.id === id);
        return type ? type.name : id;
    }

}
