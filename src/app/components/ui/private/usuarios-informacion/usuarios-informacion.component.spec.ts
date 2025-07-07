import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuariosInformacionComponent } from './usuarios-informacion.component';
import { TestingModule } from '../../../../../testing/test-module';
import { ModalService } from '../../../../services/shared/modal.service';
import { UserDataService } from '../../../../services/userdata/user-data.service';
import { DocumentTypeService } from '../../../../services/documenttype/document-type.service';
import { DocumentServiceService } from '../../../../services/document/document-service.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { ToastService } from '../../../../services/shared/toast.service';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { of } from 'rxjs';

describe('UsuariosInformacionComponent', () => {
  let component: UsuariosInformacionComponent;
  let fixture: ComponentFixture<UsuariosInformacionComponent>;
  let modalServiceMock: jasmine.SpyObj<ModalService>;
  let userDataServiceMock: jasmine.SpyObj<UserDataService>;
  let documentTypeServiceMock: jasmine.SpyObj<DocumentTypeService>;
  let documentServiceMock: jasmine.SpyObj<DocumentServiceService>;
  let authServiceMock: any;
  let toastServiceMock: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    // creando mocks para todos los servicios
    modalServiceMock = jasmine.createSpyObj('ModalService', ['showForm', 'register']);
    userDataServiceMock = jasmine.createSpyObj('UserDataService', ['getByUserID']);
    documentTypeServiceMock = jasmine.createSpyObj('DocumentTypeService', ['getAll']);
    documentServiceMock = jasmine.createSpyObj('DocumentServiceService', ['userSearchRequests', 'createRequest']);
    toastServiceMock = jasmine.createSpyObj('ToastService', ['success', 'error']);

    // configuracion de retornos de los mocks
    userDataServiceMock.getByUserID.and.returnValue(of({
      id: '123',
      userID: 'f4e8c4d8-e071-70f0-2026-9c8fa097b89f',
      name: 'ghost',
      userTypeId: '',
      userSubTypeId: '',
      status: 'active'
    }));

    // se usa any para evitar problemas de tipado en los mocks
    documentTypeServiceMock.getAll.and.returnValue(of([
      { id: '1', userID: 'ghost', name: 'Certificado', state: 'ACTIVO' }
    ] as any));

    documentServiceMock.userSearchRequests.and.returnValue(of([]));
    documentServiceMock.createRequest.and.returnValue(of({} as any));

    authServiceMock = {
      currentUser: {
        id: '',
        username: 'ghost',
        email: 'i.riquelmee@duocuc.cl',
        groups: [],
        isAuthenticated: true
      },
      authState$: of({
        user: {
          id: '',
          username: 'ghost',
          email: 'i.riquelmee@duocuc.cl',
          groups: [],
          isAuthenticated: true
        },
        isLoading: false,
        error: null
      })
    };

    // configurando TestBed
    await TestBed.configureTestingModule({
      imports: [UsuariosInformacionComponent, TestingModule, ReactiveFormsModule, CardModule, ChipModule, ButtonModule, InputTextModule, ToastModule],
      providers: [
        { provide: ModalService, useValue: modalServiceMock },
        { provide: UserDataService, useValue: userDataServiceMock },
        { provide: DocumentTypeService, useValue: documentTypeServiceMock },
        { provide: DocumentServiceService, useValue: documentServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastService, useValue: toastServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
