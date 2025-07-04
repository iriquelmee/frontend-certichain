import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { UserSubTypeService } from './user-sub-type.service';
import { TestingModule } from '../../../testing/test-module';

describe('UserSubTypeService', () => {
  let service: UserSubTypeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [UserSubTypeService]
    });
    
    service = TestBed.inject(UserSubTypeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all user subtypes', () => {
    const mockSubTypes = [
      { id: '1', name: 'Administrador', userTypeId: '100' },
      { id: '2', name: 'institucion', userTypeId: '100' }
    ];

    service.getAll().subscribe((subTypes: any[]) => {
      expect(subTypes.length).toBe(2);
      expect(subTypes[0].name).toBe('Administrador');
      expect(subTypes[1].name).toBe('Institucion');
    });

    const req = httpTestingController.expectOne(`http://certichainbff.ddns.net:8082/api/userSubTypes`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSubTypes);
  });
});
