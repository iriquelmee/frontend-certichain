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
import { TableComponent } from '../../../shared/table/table.component';
import { SelectComponent } from '../../../shared/select/select.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonComponent } from '../../../shared/button/button.component';
import { DatePickerModule } from 'primeng/datepicker';
import { ToastService } from '../../../../services/shared/toast.service';

@Component({
    selector: 'app-instituciones-otras-solicitudes',
    imports: [CommonModule, CardModule, ReactiveFormsModule, FormsModule, TableComponent, SelectComponent, InputTextModule, ButtonComponent, DatePickerModule],
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
    requestColumns: any[] = [];

    loading = false;
    errorMsg: string | null = null;

    constructor(
        private fb: FormBuilder,
        private docSvc: DocumentServiceService,
        private authService: AuthService,
        private userTypeService: UserTypeService,
        private userDataService: UserDataService,
        private documentTypeServcie: DocumentTypeService,
        private toastService: ToastService
    ) { }

    ngOnInit(): void {
        const currentUser = this.authService.currentUser;
        this.getUserTypes();
        this.setRequestColumns();
        

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
                this.toastService.info('Tipos de usuario', 'Tipos de usuario cargados correctamente');
                this.getInstitutions()
            },
            error: (err) => {
                this.toastService.error('Error', 'Error al obtener tipos de usuarios: ' + err.message);
                console.error('Error al obtener tipos de usuarios:', err);
            }
        })
    }

    getInstitutions() {
        this.userDataService.getByUserTypeId(this.getInstitutionID()).subscribe({
            next: (data) => {
                this.institutions = data;
                this.toastService.info('Instituciones', 'Instituciones cargadas correctamente');
            },
            error: (err) => {
                this.toastService.error('Error', 'Error al buscar instituciones: ' + err.message);
                console.error('Error al buscar instituciones:', err);
                this.institutions = [];
            }
        })
    }

    getInstitutionDocTypes(){
        if (!this.requestForm.value.institution) {
            this.toastService.warning('Advertencia', 'Debe seleccionar una institución primero');
            return;
        }
        
        this.documentTypeServcie.getByUserId(this.requestForm.value.institution).subscribe({
            next: (data) => {
                this.documentsType = data.filter(item =>
                    item.state?.toLowerCase() === 'activo'
                );
                this.toastService.info('Tipos de documentos', 'Tipos de documentos de la institución cargados correctamente');
            },
            error: (err) => {
                this.toastService.error('Error', 'Error al cargar tipos de documentos: ' + err.message);
                console.error('Error al buscar instituciones:', err);
                this.documentsType = [];
            }
        })
    }

    onSolicitar() {
        if (!this.requestForm.value.institution) {
            this.toastService.warning('Advertencia', 'Debe seleccionar una institución');
            return;
        }
        
        if (!this.requestForm.value.documentType) {
            this.toastService.warning('Advertencia', 'Debe seleccionar un tipo de documento');
            return;
        }
        
        const dto: DocumentRequest = {
            id: null,
            requesterID: this.userData.Id,
            issuerID: this.requestForm.value.institution,
            date: new Date().toISOString(),
            documentTypeID: this.requestForm.value.documentType,
            state: null
        };
        this.docSvc.createRequest(dto).subscribe({
            next: (res) => {
                this.toastService.success('Solicitud creada', `Solicitud creada con ID ${res.id}`);
                this.requestForm.reset();
                this.searchForm.reset();
                this.onSearch();
            },
            error: (err) => {
                this.toastService.error('Error', 'Error al crear la solicitud: ' + err.message);
                console.error('Error al crear solicitud:', err);
            }
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
                    // Formatear fechas para la tabla
                    this.results = data.map(item => {
                        if (item.documentRequest && item.documentRequest.date) {
                            const date = new Date(item.documentRequest.date);
                            const formattedDate = date.toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            });
                            return {...item,documentRequest: {...item.documentRequest,issuerID: this.getInstitutionName(item.documentRequest.issuerID),date: formattedDate}};
                        }
                        return item;
                    });
                    this.loading = false;
                    this.toastService.success('Búsqueda', 'Búsqueda realizada correctamente');
                },
                error: err => {
                    this.errorMsg = err.message || 'Error al buscar.';
                    this.loading = false;
                    this.toastService.error('Error', this.errorMsg || '');
                }
            });
    }

    getInstitutionName(id: string): string{
        const intitution = this.institutions.find(item => item.id === id);
        return intitution ? intitution.name : id;
    }
    
    setRequestColumns() {
        this.requestColumns = [
            { header: 'ID', campo: 'documentRequest.id' },
            { header: 'Emisor', campo: 'documentRequest.issuerID' },
            { header: 'Nombre', campo: 'privateDocument.name' },
            { header: 'Fecha', campo: 'documentRequest.date' },
            { header: 'Estado', campo: 'documentRequest.state' }
        ];
    }

}
