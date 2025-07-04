import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { DocumentTypeService } from './document-type.service';
import { TestingModule } from '../../../testing/test-module';

// se utiliza interfaz local para evitar conflictos con documentype del dom
interface TestDocType {
  id: string;
  userID: string;
  name: string;
  state: string;
}

describe('DocumentTypeService', () => {
  let service: DocumentTypeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [DocumentTypeService]
    });
    
    service = TestBed.inject(DocumentTypeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all document types', () => {
    const mockDocTypes: TestDocType[] = [
      { id: '1', userID: 'user1', name: 'Documento 1', state: 'ACTIVO' },
      { id: '2', userID: 'user1', name: 'Documento 2', state: 'ACTIVO' }
    ];
    
    service.getAll().subscribe((docTypes: any[]) => {
      expect(docTypes.length).toBe(2);
      expect(docTypes[0].id).toBe(mockDocTypes[0].id);
      expect(docTypes[0].name).toBe(mockDocTypes[0].name);
      expect(docTypes[1].id).toBe(mockDocTypes[1].id);
      expect(docTypes[1].name).toBe(mockDocTypes[1].name);
    });
    
    const req = httpTestingController.expectOne(`http://certichainbff.ddns.net:8082/api/documenttypes`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDocTypes);
  });
});
