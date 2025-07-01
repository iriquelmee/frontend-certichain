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
    users: UserData[] = [];
    filteredUsers: UserData[] = [];
    selectedUser: UserData | null = null;

    tipos: UserType[] = [];
    subtipos: UserSubType[] = [];

    constructor(private fb: FormBuilder,private userDataService: UserDataService, private authService: AuthService) { }

    ngOnInit(): void {
        this.searchForm = this.fb.group({
            id: [''],
            nombre: ['']
        });
        this.editForm = this.fb.group({
            nombre: [{ value: '', disabled: true }, Validators.required],
            tipo: [null, Validators.required],
            subtipo: [null],
            activo: [false]
        });
        this.userDataService.getAll().subscribe({
            next: (data) => {
                this.filteredUsers = data
            },
            error: (err) => {
                console.error('Error al buscar usuarios:', err);
                this.filteredUsers = [...this.users];
            }
        })
        
    }

    onSearch(): void {
        const { id, nombre } = this.searchForm.value;
        this.filteredUsers = this.users.filter(u =>
            (!id || u.id === id) &&
            (!nombre || u.name.toLowerCase().includes(nombre.toLowerCase()))
        );
    }

    onEdit(user: UserData): void {
        this.selectedUser = { ...user };
        this.editForm.reset({
            nombre: this.selectedUser.name,
            tipo: this.selectedUser.userTypeId,
            subtipo: this.selectedUser.userSubTypeId,
            activo: this.selectedUser.status
        });
        this.editForm.get('nombre')!.disable();
    }

    onToggleActive(user: UserData): void {
        
    }

    onApplyChanges(): void {
        if (!this.selectedUser || this.editForm.invalid) return;
        const cambios = this.editForm.getRawValue();
        Object.assign(this.selectedUser, cambios);
        const idx = this.users.findIndex(u => u.id === this.selectedUser!.id);
        this.users[idx] = this.selectedUser!;
        this.filteredUsers = [...this.users];
        this.cancelEdit();
    }

    cancelEdit(): void {
        this.selectedUser = null;
        this.editForm.reset();
    }

}
