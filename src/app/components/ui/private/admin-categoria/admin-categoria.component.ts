import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { UserSubType } from '../../../../models/user-sub-type';
import { UserTypeService } from '../../../../services/usertype/user-type.service';
import { UserSubTypeService } from '../../../../services/usersubtype/user-sub-type.service';
import { UserType } from '../../../../models/user-type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-admin-categoria',
    imports: [CommonModule,FormsModule,CardModule],
    templateUrl: './admin-categoria.component.html',
    styleUrl: './admin-categoria.component.scss'
})
export class AdminCategoriaComponent {
    title: string = "Categoria ";
    userTypes: UserType[] = [];
    userSubTypes: UserSubType[] = [];
    newUserTypeName = '';
    newUserSubTypeName = '';

    constructor(
        private userTypeSvc: UserTypeService,
        private userSubTypeSvc: UserSubTypeService
    ) { }

    ngOnInit() {
        this.loadUserTypes();
        this.loadUserSubTypes();
    }

    loadUserTypes() {
        this.userTypeSvc.getAll().subscribe(list => this.userTypes = list);
    }

    loadUserSubTypes() {
        this.userSubTypeSvc.getAll().subscribe(list => this.userSubTypes = list);
    }

    createUserType() {
        if (!this.newUserTypeName.trim()) return;
        const payload: UserType = { id: null, name: this.newUserTypeName, state: 'Activo' };
        this.userTypeSvc.create(payload)
            .subscribe(() => {
                this.newUserTypeName = '';
                this.loadUserTypes();
            });
    }

    toggleUserTypeState(t: UserType) {
        const updated = { ...t, state: t.state === 'Activo' ? 'Inactivo' : 'Activo' };
        if (t.id) {
            this.userTypeSvc.update(t.id, updated)
            .subscribe(() => this.loadUserTypes());
        }
    }

    createUserSubType() {
        if (!this.newUserSubTypeName.trim()) return;
        const payload: UserSubType = { id: null, name: this.newUserSubTypeName, state: 'Activo' };
        this.userSubTypeSvc.create(payload)
            .subscribe(() => {
                this.newUserSubTypeName = '';
                this.loadUserSubTypes();
            });
    }

    toggleUserSubTypeState(st: UserSubType) {
        const updated = { ...st, state: st.state === 'Activo' ? 'Inactivo' : 'Activo' };
        if (st.id) {
            this.userSubTypeSvc.update(st.id, updated)
            .subscribe(() => this.loadUserSubTypes());
        }
    }

}
