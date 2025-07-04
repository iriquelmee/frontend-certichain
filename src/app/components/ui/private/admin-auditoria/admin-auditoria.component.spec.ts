import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AdminAuditoriaComponent } from './admin-auditoria.component';
import { DocumentAuditService } from '../../../../services/audit/document-audit.service';
import { PublicDocumentAuditLog } from '../../../../models/public-document-audit-log';
import { TestingModule } from '../../../../../testing/test-module';
import { CardModule } from 'primeng/card';
import { of } from 'rxjs';

describe('AdminAuditoriaComponent', () => {
  let component: AdminAuditoriaComponent;
  let fixture: ComponentFixture<AdminAuditoriaComponent>;
  let documentAuditServiceMock: jasmine.SpyObj<DocumentAuditService>;

  beforeEach(async () => {
    // mockeanding auditoria
    const mockAuditLogs: PublicDocumentAuditLog[] = [
      {
        txID: '1',
        operation: 'VIEW',
        documentId: '123',
        userId: 'ghost',
        institution: 'Duoc Test',
        timestamp: new Date().toISOString()
      }
    ];
    
    // mockeando docs
    documentAuditServiceMock = jasmine.createSpyObj('DocumentAuditService', ['getPublicAuditLogs']);
    documentAuditServiceMock.getPublicAuditLogs.and.returnValue(of(mockAuditLogs));
    
    // configurando modulo de pruebas
    await TestBed.configureTestingModule({
      imports: [
        AdminAuditoriaComponent, 
        TestingModule,
        FormsModule,
        CardModule
      ],
      providers: [
        { provide: DocumentAuditService, useValue: documentAuditServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
