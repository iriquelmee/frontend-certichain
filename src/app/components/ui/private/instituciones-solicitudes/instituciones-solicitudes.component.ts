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
import { TableComponent } from '../../../shared/table/table.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonComponent } from '../../../shared/button/button.component';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'app-instituciones-solicitudes',
    imports: [CardModule, CommonModule, ReactiveFormsModule, FormsModule, TableComponent, InputTextModule, ButtonComponent, DatePickerModule],
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
    requestColumns: any[] = [];

    userList: UserData[] = [];

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
        this.setRequestColumns();

        this.searchForm = this.fb.group({
            id: [''],
            solicitante: [''],
            inicio: [''],
            fin: ['']
        });

        this.uploadForm = this.fb.group({
            requestId: [{ value: '', disabled: true }, Validators.required],
            requesterId: [{ value: '', disabled: true }, Validators.required],
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

        this.onSearch();
        this.loadUserData();
    }

    loadUserData() {
        this.userDataService.getAll().subscribe({
            next: (data) => {
                this.userList = data;
            },
            error: (err) => {
                console.error('Error al buscar usuarios:', err);
                this.userList = [];
            }
        })
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

        const { solicitante, inicio, fin } = this.searchForm.value;

        this.docSvc.institutionSearchRequests(
            solicitante, 
            this.userData.Id, 
            inicio instanceof Date ? inicio.toISOString() : undefined, 
            fin instanceof Date ? fin.toISOString() : undefined)
            .subscribe({
                next: data => {
                    console.log(data.toString())
                    // formateando fechas para la tabla
                    this.results = data.map(item => {
                        if (item.documentRequest && item.documentRequest.date) {
                            const date = new Date(item.documentRequest.date);
                            const formattedDate = date.toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            });
                            
                            // se crea copia para no modificar objeto original
                            return {...item,documentRequest: {...item.documentRequest,date: formattedDate}};
                        }
                        return item;
                    });
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
            requesterId: item.documentRequest.requesterID,
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
    
    setRequestColumns() {
        this.requestColumns = [
            { header: 'ID', campo: 'documentRequest.id' },
            { header: 'Solicitante', campo: 'documentRequest.requesterID' },
            { header: 'Nombre', campo: 'privateDocument.name' },
            { header: 'Fecha', campo: 'documentRequest.date' },
            { header: 'Estado', campo: 'documentRequest.state' },
            { header: 'Acción', campo: 'actions' }
        ];
    }
    
    handleTableAction(item: any) {
        if (item.documentRequest.state === 'UPLOADED') {
            this.onDownload(item);
        } 
        else {
            this.onStartUpload(item);
        }
    }

    getUserName(id: string): string {
        const type = this.userList.find(t => t.userID === id);
        return type ? type.name : id;
    }
}
