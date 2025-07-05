import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableComponent } from '../../../shared/table/table.component';
import { institucionSolicitudes, institucionSolicitudesColumns } from '../../../../../data';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentServiceService } from '../../../../services/document/document-service.service';
import { DocumentRequest } from '../../../../models/document-request';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth/auth.service';
import { UserTypeService } from '../../../../services/usertype/user-type.service';
import { UserDataService } from '../../../../services/userdata/user-data.service';
import { UserType } from '../../../../models/user-type';
import { UserData } from '../../../../models/user-data';

@Component({
    selector: 'app-instituciones-solicitudes',
    imports: [CardModule, TableComponent, CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './instituciones-solicitudes.component.html',
    styleUrl: './instituciones-solicitudes.component.scss'
})
export class InstitucionesSolicitudesComponent implements OnInit {
    title: string = "Solicitudes";
    data!: any[];
    tableSolicitudesColumns!: any[];
    userData: any = {};
    mode: 'solicitar' | 'emitir' = 'solicitar';
    requestForm!: FormGroup;
    emitForm!: FormGroup;
    foundRequest?: DocumentRequest;
    selectedFile?: File;
    tipos: UserType[] = [];
    institutions: UserData[] = [];
    documents = [
        { id: 'doc1', name: 'Documento X' },
        { id: 'doc2', name: 'Documento Y' },
    ];

    constructor(
        private fb: FormBuilder,
        private docSvc: DocumentServiceService,
        private authService: AuthService,
        private userTypeService: UserTypeService,
        private userDataService: UserDataService
    ) { }

    ngOnInit(): void {
        const currentUser = this.authService.currentUser;
        this.callApiSolicitudes();
        this.getUserTypes();
        
        if (this.data != undefined) {
            this.setTableColumnsHeaders();
        }

        this.requestForm = this.fb.group({
            institution: [null],
            documentType: [null],
        });
        this.emitForm = this.fb.group({
            id: [''],
            name: [{ value: '', disabled: true }],
            documentType: [null],
        });

        this.userData = {
            Id: currentUser?.id || '',
            UserID: currentUser?.username || '',
            UserTypeId: currentUser?.groups?.length ? currentUser.groups[0] : 'user',
            UserSubTypeId: 'user',
            name: currentUser?.username || '',
            email: currentUser?.email || ''
        };

    }

    getUserTypes(){
        this.userTypeService.getAll().subscribe({
            next: (data) => {
                this.tipos = data.filter(item =>
                    item.state?.toLowerCase() === 'activo'
                );
                this.getInstitutions()
            },
            error: (err) => {
                console.error('Error al obtener tipos de usuarios:', err);
            }
        })
    }

    callApiSolicitudes() {
        this.data = institucionSolicitudes;
    }

    setTableColumnsHeaders() {
        this.tableSolicitudesColumns = institucionSolicitudesColumns;
    }

    getInstitutions(){
        this.userDataService.getByUserTypeId(this.getInstitutionID()).subscribe({
            next: (data) => {
                this.institutions = data;
            },
            error: (err) => {
                console.error('Error al buscar instituciones:', err);
                this.institutions = [];
            }
        })
    }

    setMode(m: 'solicitar' | 'emitir') {
        this.mode = m;
        this.requestForm.reset();
        this.emitForm.reset();
        this.foundRequest = undefined;
        this.selectedFile = undefined;
    }

    onSolicitar() {
        const dto: DocumentRequest = {
            id: null,
            requesterID: 'CURRENT_USER_ID',
            issuerID: this.requestForm.value.institution,
            date: new Date().toISOString(),
            documentTypeID: this.requestForm.value.documentType,
            state: 'REQUESTED'
        };
        this.docSvc.createRequest(dto).subscribe(res => {
            alert(`Solicitud creada con ID ${res.id}`);
            this.requestForm.reset();
        });
    }

    onBuscar() {
        const searchId = this.emitForm.value.id;

    }

    onFileSelected(ev: Event) {
        const input = ev.target as HTMLInputElement;
        if (input.files?.length) {
            this.selectedFile = input.files[0];
        }
    }

    onEmitir() {
        if (!this.foundRequest || !this.selectedFile) {
            alert('Primero busca la solicitud y carga un archivo.');
            return;
        }
        const dto: DocumentRequest = {
            id: null,
            requesterID: this.foundRequest.requesterID,
            issuerID: this.foundRequest.issuerID,
            date: new Date().toISOString(),
            documentTypeID: this.emitForm.value.documentType,
            state: 'EMITTED'
        };
        this.docSvc.createRequest(dto).pipe(
            switchMap(created => this.docSvc.uploadDocument(created.id!, this.selectedFile!))
        ).subscribe(() => {
            alert('Documento emitido correctamente.');
            this.emitForm.reset();
            this.foundRequest = undefined;
            this.selectedFile = undefined;
        });
    }

    getInstitutionID(): string{
        return this.tipos.find(item =>
                    item?.name.toLowerCase() === 'institucion'
                )?.id || '';
    }

}
