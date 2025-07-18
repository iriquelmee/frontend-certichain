import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { SelectComponent } from '../../../shared/select/select.component';
import { TableComponent } from '../../../shared/table/table.component';
import { ModalService } from '../../../../services/shared/modal.service';
import { ToastService } from '../../../../services/shared/toast.service';
import { UserDataService } from '../../../../services/userdata/user-data.service';
import { DocumentTypeService } from '../../../../services/documenttype/document-type.service';
import { DocumentServiceService } from '../../../../services/document/document-service.service';
import { DocumentRequest } from '../../../../models/document-request';
import { SearchDocumentRequestInfo } from '../../../../models/search-document-request-info';
import { AuthService } from '../../../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-usuarios-informacion',
    standalone: true,
    imports: [CommonModule, CardModule, ChipModule, ButtonModule, ReactiveFormsModule, InputTextModule, ToastModule, SelectComponent, TableComponent],
    templateUrl: './usuarios-informacion.component.html',
    styleUrl: './usuarios-informacion.component.scss'
})
export class UsuariosInformacionComponent implements OnInit, OnDestroy {
    title: string = "Info";
    userData: any = {};
    userForm!: FormGroup;
    solicitudForm!: FormGroup;

    documentos: any[] = [];
    tableColumns: any[] = [];

    instituciones: any[] = [];
    tiposDocumentos: any[] = [];

    loading: boolean = false;
    loadingInstituciones: boolean = false;
    noInstituciones: boolean = false;

    loadingTiposDocumentos: boolean = false;
    noTiposDocumentos: boolean = false;

    private subscriptions: Subscription = new Subscription();
    constructor(
        private userDataService: UserDataService,
        private documentTypeService: DocumentTypeService,
        private documentService: DocumentServiceService,
        private authService: AuthService,
        private toastService: ToastService
    ) { }

    ngOnInit() {
        this.initForm();
        this.initSolicitudForm();
        this.getUserData();
        this.getInstituciones();
        this.setTableColumnsHeaders();
        this.getDocumentos();
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    initForm() {
        this.userForm = new FormGroup({
            Id: new FormControl({ value: this.userData.Id, disabled: true }, Validators.required),
            UserID: new FormControl({ value: this.userData.UserID, disabled: true }, Validators.required),
            UserTypeId: new FormControl(this.userData.UserTypeId, Validators.required),
            UserSubTypeId: new FormControl(this.userData.UserSubTypeId, Validators.required)
        });
    }

    get formFilled(): boolean {
        const institucionValue = this.solicitudForm?.get('institucion')?.value;
        const documentoValue = this.solicitudForm?.get('documento')?.value;
        return !!(institucionValue && documentoValue);
    }

    initSolicitudForm() {
        this.solicitudForm = new FormGroup({
            institucion: new FormControl('', Validators.required),
            documento: new FormControl('', Validators.required)
        });

        const formSub = this.solicitudForm.valueChanges.subscribe(() => {
            console.log('Formulario actualizado:', 'institucion=', this.solicitudForm.get('institucion')?.value, 'documento=', this.solicitudForm.get('documento')?.value);
        });

        this.subscriptions.add(formSub);
    }

    getUserData() {
        const currentUser = this.authService.currentUser;
        if (!currentUser || !currentUser.id) {
            console.error('No hay usuario autenticado');
            this.toastService.error('Error', 'No se pudo autenticar al usuario');
            return;
        }

        // asignar datos del usuario autenticado de Cognito
        this.userData = {
            Id: currentUser.id || '',
            UserID: currentUser.username || '',
            UserTypeId: currentUser.groups?.length ? currentUser.groups[0] : 'user',
            UserSubTypeId: 'user',
            name: currentUser.username || '',
            email: currentUser.email || ''
        };

        // inicializar el formulario con los datos basicos
        this.initForm();

        console.log('Usando datos basicos del usuario de Cognito:', this.userData);
        try {
            const userId = currentUser.id;

            const userDataSub = this.userDataService.getByUserID(userId).subscribe({
                next: (data) => {
                    if (data) {
                        console.log('Datos adicionales cargados correctamente:', data);
                        this.userData = {
                            ...this.userData,
                            UserTypeId: data.userTypeId || this.userData.UserTypeId,
                            UserSubTypeId: data.userSubTypeId || this.userData.UserSubTypeId
                        };
                        this.initForm();
                    }
                },
                error: (err) => {
                    console.error('Error cargando datos adicionales del usuario:', err);

                    this.toastService.info(
                        'Información',
                        'Algunos datos del perfil no están disponibles en este momento. Puede continuar usando la aplicacion.'
                    );

                    if (!this.userData.UserTypeId) {
                        this.userData.UserTypeId = 'user';
                    }

                    if (!this.userData.UserSubTypeId) {
                        this.userData.UserSubTypeId = 'user';
                    }

                    this.initForm();
                }
            });

            this.subscriptions.add(userDataSub);
        } catch (error) {
            console.error('Error en proceso de carga de datos:', error);
            this.initForm();
        }
    }

    getDocumentos() {
        const currentUser = this.authService.currentUser;
        if (!currentUser || !currentUser.id) {
            console.error('No hay usuario autenticado');
            return;
        }

        this.documentService.userSearchRequests(this.userData.Id, undefined, undefined, undefined)
            .subscribe({
                next: data => {
                    // Formatear fechas para la tabla
                    this.documentos = data.map(item => {
                        if (item.documentRequest && item.documentRequest.date) {
                            const date = new Date(item.documentRequest.date);
                            const formattedDate = date.toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            });
                            return { ...item, privateDocument: { ...item.privateDocument, name: item.privateDocument?.name ? item.privateDocument.name : 'Documento no Cargado' }, documentRequest: { ...item.documentRequest, issuerID: this.findInstitutionName(item.documentRequest.issuerID), date: formattedDate } };
                        }
                        return item;
                    });
                    this.loading = false;
                },
                error: err => {
                    this.documentos = [];
                    this.loading = false;
                }
            });
    }

    getInstituciones() {
        this.loadingInstituciones = true;
        this.noInstituciones = false;

        try {
            const institucionSub = this.userDataService.getByUserTypeId('68635ee1d7102f0ba8f7b3ad').subscribe({
                next: (instituciones) => {
                    this.loadingInstituciones = false;

                    if (instituciones && instituciones.length > 0) {
                        console.log('Instituciones cargadas correctamente:', instituciones);
                        this.instituciones = instituciones.map(inst => ({
                            label: inst.name || 'Sin nombre',
                            value: inst.userID || inst.id
                        }));
                        this.noInstituciones = false;
                    } else {
                        console.warn('No se encontraron instituciones en la base de datos');
                        this.instituciones = [];
                        this.noInstituciones = true;
                    }
                },
                error: (err) => {
                    this.loadingInstituciones = false;
                    console.error('Error cargando instituciones:', err);
                    this.instituciones = [];
                    this.noInstituciones = true;
                    this.toastService.info(
                        'Información',
                        'No se pudieron cargar las instituciones en este momento. Intente mas tarde.'
                    );
                }
            });

            this.subscriptions.add(institucionSub);
        } catch (error) {
            this.loadingInstituciones = false;
            this.noInstituciones = true;
            console.error('Error en proceso de carga de instituciones:', error);
            this.instituciones = [];
        }
    }

    getTiposDocumentos(institutionId: string) {
        this.loadingTiposDocumentos = true;
        this.noTiposDocumentos = false;
        this.tiposDocumentos = [];

        try {
            const docTypesSub = this.documentTypeService.getByUserId(institutionId).subscribe({
                next: (tipos) => {
                    this.loadingTiposDocumentos = false;

                    if (tipos && tipos.length > 0) {
                        this.tiposDocumentos = tipos.map(tipo => {
                            const docType = tipo as any;
                            return {
                                label: docType.name || 'Sin nombre',
                                value: docType.id || docType.userID || 'unknown'
                            };
                        });
                        this.noTiposDocumentos = false;
                    } else {
                        console.warn('No se encontraron tipos de documentos');
                        this.tiposDocumentos = [
                            { label: 'Certificado', value: 'certificado' },
                            { label: 'Declaración', value: 'declaracion' }
                        ];
                        this.noTiposDocumentos = false;
                    }
                },
                error: (err) => {
                    this.loadingTiposDocumentos = false;
                    console.error('Error cargando tipos de documentos:', err);
                    this.tiposDocumentos = [
                        { label: 'Certificado', value: 'certificado' },
                        { label: 'Declaración', value: 'declaracion' }
                    ];
                    this.noTiposDocumentos = false;
                }
            });

            this.subscriptions.add(docTypesSub);
        } catch (error) {
            this.loadingTiposDocumentos = false;
            console.error('Error en proceso de carga de tipos de documentos:', error);
            this.tiposDocumentos = [
                { label: 'Certificado', value: 'certificado' },
                { label: 'Declaración', value: 'declaracion' }
            ];
            this.noTiposDocumentos = false;
        }
    }

    setTableColumnsHeaders() {
        this.tableColumns = [
            { header: 'ID', campo: 'documentRequest.id' },
            { header: 'Emisor', campo: 'documentRequest.issuerID' },
            { header: 'Nombre', campo: 'privateDocument.name' },
            { header: 'Fecha', campo: 'documentRequest.date' },
            { header: 'Estado', campo: 'documentRequest.state' },
            { header: 'Accion', campo: 'docuView' }
        ];
    }

    saveUserData(data: any) {
        this.userData = { ...data };
        console.log('Datos guardados:', this.userData);
    }

    onSolicitar() {
        Object.keys(this.solicitudForm.controls).forEach(key => {
            const control = this.solicitudForm.get(key);
            control?.markAsTouched();
        });

        if (this.formFilled) {
            const currentUser = this.authService.currentUser;

            if (!currentUser || !currentUser.id) {
                this.toastService.error('Error', 'No hay usuario autenticado');
                return;
            }

            // obteniendo y validando data del formulario
            const institucionId = this.solicitudForm.value.institucion;
            const documentoId = this.solicitudForm.value.documento;

            // validando data vacia
            if (!institucionId || !documentoId) {
                this.toastService.error('Error', 'Institución y tipo de documento son obligatorios');
                return;
            }

            // mandando objeto solicitud
            const docRequest: DocumentRequest = {
                id: null,
                requesterID: currentUser.id,
                issuerID: institucionId.trim(),
                date: new Date().toISOString(),
                documentTypeID: documentoId.trim(),
                state: 'CREADO'
            };

            console.log('Enviando solicitud con datos:', JSON.stringify(docRequest, null, 2));

            this.loading = true;
            this.documentService.createRequest(docRequest).subscribe({
                next: (response) => {
                    this.loading = false;
                    this.toastService.success('Éxito', 'Solicitud creada correctamente');
                    console.log('Solicitud creada con éxito:', response);

                    this.getDocumentos();
                    this.solicitudForm.reset();
                },
                error: (err) => {
                    this.loading = false;
                    this.toastService.error('Error', 'No se pudo crear la solicitud');
                    console.error('Error al crear solicitud:', err);
                }
            });
        }
        else {
            console.warn('Formulario inválido. No se puede enviar la solicitud.');
            this.toastService.error('Error', 'Por favor complete todos los campos requeridos');
        }
    }

    // buscando nombre de la institucion con id mongo
    findInstitutionName(institutionId: string): string {
        if (!institutionId) return 'Sin institución';

        const institution = this.instituciones.find(inst => inst.value === institutionId);
        return institution ? institution.label : 'Institución no encontrada';
    }

    // buscandonombre del tipo de documentocon id mongo
    findDocumentTypeName(documentTypeId: string): string {
        if (!documentTypeId) return 'Sin tipo de documento';

        const documentType = this.tiposDocumentos.find(type => type.value === documentTypeId);
        return documentType ? documentType.label : 'Tipo de documento no encontrado';
    }


    onSelectInstitution(selectedValue: any) {
        if (typeof selectedValue === 'string') {
            this.getTiposDocumentos(selectedValue);
        }
    }

    openDocument(url: string): void {
        window.open(url, '_blank', 'noopener');
    }

}
