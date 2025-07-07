import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { InstitucionesTiposDocumentosComponent } from './instituciones-tipos-documentos.component';
import { DocumentTypeService } from '../../../../services/documenttype/document-type.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { TestingModule } from '../../../../../testing/test-module';
import { DocumentType } from '../../../../models/document-type';

describe('InstitucionesTiposDocumentosComponent', () => {
  let component: InstitucionesTiposDocumentosComponent;
  let fixture: ComponentFixture<InstitucionesTiposDocumentosComponent>;
  let documentTypeServiceSpy: jasmine.SpyObj<DocumentTypeService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    documentTypeServiceSpy = jasmine.createSpyObj('DocumentTypeService', ['getByUserId', 'create', 'update']);
    authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      currentUser: { id: 'test-user-id' }
    });
    
    documentTypeServiceSpy.getByUserId.and.returnValue(of([]));
    documentTypeServiceSpy.create.and.returnValue(of({} as DocumentType));
    documentTypeServiceSpy.update.and.returnValue(of({} as DocumentType));

    await TestBed.configureTestingModule({
      imports: [InstitucionesTiposDocumentosComponent, TestingModule],
      providers: [
        { provide: DocumentTypeService, useValue: documentTypeServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitucionesTiposDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
