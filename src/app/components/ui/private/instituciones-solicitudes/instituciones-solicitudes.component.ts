import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { institucionSolicitudes, institucionSolicitudesColumns } from '../../../../../data';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentServiceService } from '../../../../services/document/document-service.service';
import { DocumentRequest } from '../../../../models/document-request';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth/auth.service';
import { UserTypeService } from '../../../../services/usertype/user-type.service';
import { UserDataService } from '../../../../services/userdata/user-data.service';
import { UserType } from '../../../../models/user-type';
import { UserData } from '../../../../models/user-data';
import { SearchDocumentRequestInfo } from '../../../../models/search-document-request-info';

@Component({
    selector: 'app-instituciones-solicitudes',
    imports: [CardModule, CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './instituciones-solicitudes.component.html',
    styleUrl: './instituciones-solicitudes.component.scss'
})
export class InstitucionesSolicitudesComponent implements OnInit {
    title: string = "Emitir";
    userData: any = {};

    uploadForm!: FormGroup;
    searchForm!: FormGroup;

    foundRequest?: DocumentRequest;
    selectedFile?: File;

    tipos: UserType[] = [];
    institutions: UserData[] = [];
    results: SearchDocumentRequestInfo[] = [];
    selectedRequest: SearchDocumentRequestInfo | null = null;

    loading = false;
    errorMsg: string | null = null;

    constructor(
        private fb: FormBuilder,
        private docSvc: DocumentServiceService,
        private authService: AuthService,
        private userTypeService: UserTypeService,
        private userDataService: UserDataService
    ) { }

    ngOnInit(): void {
        const currentUser = this.authService.currentUser;
        this.getUserTypes();

        this.searchForm = this.fb.group({
            id: [''],
            emisor: [''],
            inicio: [''],
            fin: ['']
        });

        this.uploadForm = this.fb.group({
            requestId: [{ value: '', disabled: true }, Validators.required],
            issuerId: [{ value: '', disabled: true }, Validators.required],
            documentTypeId: [{ value: '', disabled: true }, Validators.required],
            file: [null, Validators.required]
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

    onStartUpload(item: SearchDocumentRequestInfo): void {
        this.selectedRequest = item;
        this.uploadForm.patchValue({
            requestId: item.documentRequest.id,
            issuerId: item.documentRequest.issuerID,
            documentTypeId: item.documentRequest.documentTypeID
        });
    }

    onFileChange(ev: Event) {
        const input = ev.target as HTMLInputElement;
        if (input.files && input.files.length) {
            this.uploadForm.patchValue({ file: input.files[0] });
        }
    }

    onUploadSubmit(): void {
        if (!this.selectedRequest || this.uploadForm.invalid || !this.selectedRequest.documentRequest.id) { return; }

        this.docSvc.uploadDocument(this.selectedRequest.documentRequest.id, this.uploadForm.value.file)
            .subscribe({
                next: () => {
                    alert('Carga exitosa');
                    this.selectedRequest = null;
                    this.uploadForm.reset();
                },
                error: err => {
                    alert(`Error al cargar: ${err.message}`);
                }
            });
    }

    onCancelUpload(): void {
        this.selectedRequest = null;
        this.uploadForm.reset();
    }

    onDownload(item: SearchDocumentRequestInfo): void {
        window.open(item.privateDocument?.path, '_blank');
    }
}
