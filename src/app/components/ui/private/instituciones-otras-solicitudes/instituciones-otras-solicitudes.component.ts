import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentServiceService } from '../../../../services/document/document-service.service';
import { UserData } from '../../../../models/user-data';
import { SearchDocumentRequestInfo } from '../../../../models/search-document-request-info';
import { UserType } from '../../../../models/user-type';
import { DocumentRequest } from '../../../../models/document-request';
import { AuthService } from '../../../../services/auth/auth.service';
import { UserTypeService } from '../../../../services/usertype/user-type.service';
import { UserDataService } from '../../../../services/userdata/user-data.service';
import { CommonModule } from '@angular/common';
import { DocumentTypeService } from '../../../../services/documenttype/document-type.service';
import { DocumentType } from '../../../../models/document-type';

@Component({
    selector: 'app-instituciones-otras-solicitudes',
    imports: [CommonModule, CardModule, ReactiveFormsModule, FormsModule],
    templateUrl: './instituciones-otras-solicitudes.component.html',
    styleUrl: './instituciones-otras-solicitudes.component.scss'
})
export class InstitucionesOtrasSolicitudesComponent implements OnInit {
    title: string = "Solicitar";

    userData: any = {};

    requestForm!: FormGroup;
    emitForm!: FormGroup;
    searchForm!: FormGroup;

    foundRequest?: DocumentRequest;
    selectedFile?: File;

    tipos: UserType[] = [];
    institutions: UserData[] = [];
    results: SearchDocumentRequestInfo[] = [];
    documentsType: DocumentType[] = [];

    loading = false;
    errorMsg: string | null = null;

    constructor(
        private fb: FormBuilder,
        private docSvc: DocumentServiceService,
        private authService: AuthService,
        private userTypeService: UserTypeService,
        private userDataService: UserDataService,
        private documentTypeServcie: DocumentTypeService
    ) { }

    ngOnInit(): void {
        const currentUser = this.authService.currentUser;
        this.getUserTypes();
        

        this.requestForm = this.fb.group({
            institution: [null],
            documentType: [null],
        });
        this.emitForm = this.fb.group({
            id: [''],
            name: [{ value: '', disabled: true }],
            documentType: [null],
        });
        this.searchForm = this.fb.group({
            id: [''],
            emisor: [''],
            inicio: [''],
            fin: ['']
        });

        this.userData = {
            Id: currentUser?.id || '',
            UserID: currentUser?.username || '',
            UserTypeId: currentUser?.groups?.length ? currentUser.groups[0] : 'user',
            UserSubTypeId: 'user',
            name: currentUser?.username || '',
            email: currentUser?.email || ''
        };

        this.onSearch();
    }

    getUserTypes() {
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

    getInstitutions() {
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

    getInstitutionDocTypes(){
        if (!this.requestForm.value.institution) {
            return;
        }
        this.documentTypeServcie.getByUserId(this.userData.Id).subscribe({
            next: (data) => {
                this.documentsType = data.filter(item =>
                    item.state?.toLowerCase() === 'activo'
                );;
            },
            error: (err) => {
                console.error('Error al buscar instituciones:', err);
                this.documentsType = [];
            }
        })
    }

    onSolicitar() {
        const dto: DocumentRequest = {
            id: null,
            requesterID: this.userData.Id,
            issuerID: this.requestForm.value.institution,
            date: new Date().toISOString(),
            documentTypeID: this.requestForm.value.documentType,
            state: null
        };
        this.docSvc.createRequest(dto).subscribe(res => {
            alert(`Solicitud creada con ID ${res.id}`);
            this.requestForm.reset();
            this.searchForm.reset();
            this.onSearch();
        });
    }

    getInstitutionID(): string {
        return this.tipos.find(item =>
            item?.name.toLowerCase() === 'institucion'
        )?.id || '';
    }

    onSearch(): void {
        this.loading = true;
        this.errorMsg = null;

        const { emisor, inicio, fin } = this.searchForm.value;
        console.log(emisor);
        this.docSvc.userSearchRequests(this.userData.Id, emisor, inicio, fin)
            .subscribe({
                next: data => {
                    this.results = data;
                    this.loading = false;
                },
                error: err => {
                    this.errorMsg = err.message || 'Error al buscar.';
                    this.loading = false;
                }
            });
    }

    getInstitutionName(id: string): string{
        const intitution = this.institutions.find(item => item.id === id);
        return intitution ? intitution.name : id;
    }

}
