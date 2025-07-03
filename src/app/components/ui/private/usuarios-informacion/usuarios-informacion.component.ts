import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ModalComponent } from '../../../shared/modal/modal.component';
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
import { User } from '../../../../models/user.model';
import { Subscription } from 'rxjs';
import { DocumentType } from '../../../../models/document-type';

@Component({
  selector: 'app-usuarios-informacion',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ChipModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    ToastModule,
    ModalComponent,
    SelectComponent,
    TableComponent
  ],
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
  
  private subscriptions: Subscription = new Subscription();
  
  userTypeOptions = [
    { label: 'Institucion', value: 'institucion' },
    { label: 'Usuario', value: 'user' },
    { label: 'Administrador', value: 'admin' }
  ];

  userSubTypeOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'Usuario', value: 'user' },
  ];
  
  @ViewChild(ModalComponent) modal!: ModalComponent;

  constructor(
    private modalService: ModalService,
    private userDataService: UserDataService,
    private documentTypeService: DocumentTypeService,
    private documentService: DocumentServiceService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.initForm();
    this.initSolicitudForm();
    this.getUserData();
    this.getInstituciones();
    this.getTiposDocumentos();
    this.setTableColumnsHeaders();
    this.getDocumentos();
  }
  
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  initForm() {
    this.userForm = new FormGroup({
      Id: new FormControl({value: this.userData.Id, disabled: true}, Validators.required),
      UserID: new FormControl({value: this.userData.UserID, disabled: true}, Validators.required),
      UserTypeId: new FormControl(this.userData.UserTypeId, Validators.required),
      UserSubTypeId: new FormControl(this.userData.UserSubTypeId, Validators.required)
    });
  }

  openEditModal() {
    // Reset form with current user data
    this.userForm.setValue({
      Id: this.userData.Id,
      UserID: this.userData.UserID,
      UserTypeId: this.userData.UserTypeId,
      UserSubTypeId: this.userData.UserSubTypeId
    });

    this.modalService.showForm(
      'Editar Informacion de Usuario',
      this.userForm,
      (data) => this.saveUserData(data),
      () => console.log('Modal cerrado')
    );
  }

  initSolicitudForm() {
    this.solicitudForm = new FormGroup({
      institucion: new FormControl('', Validators.required),
      documento: new FormControl('', Validators.required)
    });
  }

  getUserData() {
    const currentUser = this.authService.currentUser;
    if (!currentUser || !currentUser.id) {
      console.error('No hay usuario autenticado');
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
    
    // cargar datos adicionales desde el servicio UserDataService si es necesario
    const userId = currentUser.id;
    
    const userDataSub = this.userDataService.getByUserID(userId).subscribe({
      next: (data) => {
        if (data) {
          this.userData = {
            ...this.userData,
            UserTypeId: data.userTypeId || this.userData.UserTypeId,
            UserSubTypeId: data.userSubTypeId || this.userData.UserSubTypeId
          };
          this.initForm();
        }
      },
      error: (err) => console.error('Error cargando datos adicionales del usuario:', err)
    });
    
    this.subscriptions.add(userDataSub);
  }
  
  getDocumentos() {
    const currentUser = this.authService.currentUser;
    if (!currentUser || !currentUser.id) {
      console.error('No hay usuario autenticado');
      return;
    }
    
    // obtener documentos del usuario desde el servicio
    const docSub = this.documentService.userSearchRequests(currentUser.id).subscribe({
      next: (docs: SearchDocumentRequestInfo[]) => {
        // convertir los datos al formato esperado por la tabla
        this.documentos = docs.map((doc: SearchDocumentRequestInfo) => {
          return {
            name: doc.privateDocument?.name || 'Documento sin nombre',
            date: new Date(doc.documentRequest?.date || '').toLocaleDateString(),
            institution: doc.privateDocument?.institution || 'Sin institucion',
            action: 'Descargar Visualizar'
          };
        });
      },
      error: (err: any) => console.error('Error cargando documentos:', err)
    });
    
    this.subscriptions.add(docSub);
  }
  
  getInstituciones() {
    // dummy data conectar servicio
    this.instituciones = [
      { label: 'Notaria', value: 'notaria' },
      { label: 'Universidad', value: 'universidad' },
      { label: 'Municipalidad', value: 'municipalidad' }
    ];
  }
  
  getTiposDocumentos() {
    const docTypesSub = this.documentTypeService.getAll().subscribe({
      next: (tipos) => {
        this.tiposDocumentos = tipos.map(tipo => {
          const docType = tipo as any;
          return {
            label: docType.name || 'Sin nombre',
            value: docType.id || docType.userID || 'unknown'
          };
        });
      },
      error: (err) => console.error('Error cargando tipos de documentos:', err)
    });
    
    this.subscriptions.add(docTypesSub);
  }
  
  setTableColumnsHeaders() {
    this.tableColumns = [
      { header: 'Nombre', campo: 'name' },
      { header: 'Fecha', campo: 'date' },
      { header: 'Institucion', campo: 'institution' },
      { header: 'Accion', campo: 'action' }
    ];
  }

  saveUserData(data: any) {
    this.userData = { ...data };
    console.log('Datos guardados:', this.userData);
  }
  
  onSolicitar() {
    if (this.solicitudForm.valid) {
      const currentUser = this.authService.currentUser;
      if (!currentUser || !currentUser.id) {
        this.toastService.error('Error', 'No hay usuario autenticado');
        return;
      }
      
      const docRequest: DocumentRequest = {
        id: null,
        requesterID: currentUser.id,
        issuerID: this.solicitudForm.value.institucion,
        date: new Date().toISOString(),
        documentTypeID: this.solicitudForm.value.documento,
        state: 'CREADO'
      };
      
      this.loading = true;
      this.documentService.createRequest(docRequest).subscribe({
        next: (response) => {
          this.loading = false;
          this.toastService.success('exito', 'Solicitud creada correctamente');
        
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
  }

}
