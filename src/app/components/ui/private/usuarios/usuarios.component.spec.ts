import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosComponent } from './usuarios.component';
import { TestingModule } from '../../../../../testing/test-module';
import { DocumentServiceService } from '../../../../services/document/document-service.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { CardModule } from 'primeng/card';
import { of } from 'rxjs';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;
  let documentServiceMock: jasmine.SpyObj<DocumentServiceService>;
  let authServiceMock: any;

  beforeEach(async () => {
    // creando mocks para los servicios
    documentServiceMock = jasmine.createSpyObj('DocumentServiceService', ['userSearchRequests']);
    documentServiceMock.userSearchRequests.and.returnValue(of([]));

    authServiceMock = {
      authState$: of({ user: { id: '123' }, isLoading: false, error: null })
    };

    // configurando TestBed con mocks
    await TestBed.configureTestingModule({
      imports: [UsuariosComponent, TestingModule, CardModule],
      providers: [
        { provide: DocumentServiceService, useValue: documentServiceMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    // mock para tabsUsuarios
    (window as any).tabsUsuarios = [];

    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
