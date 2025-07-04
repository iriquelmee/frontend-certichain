import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { UserTypeService } from './user-type.service';
import { TestingModule } from '../../../testing/test-module';

describe('UserTypeService', () => {
  let service: UserTypeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [UserTypeService]
    });
    
    service = TestBed.inject(UserTypeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all user types', () => {
    const mockUserTypes = [
      { id: '1', name: 'Administrador', description: 'Rol de administracion' },
      { id: '2', name: 'Usuario', description: 'Rol de usuario' }
    ];
    
  service.getAll().subscribe((userTypes: any[]) => {
    expect(userTypes.length).toBe(2);
    expect(userTypes[0].name).toBe('Administrador');
    expect(userTypes[1].name).toBe('Usuario');
  });
    
  const req = httpTestingController.expectOne(`http://certichainbff.ddns.net:8082/api/userTypes`);
  expect(req.request.method).toBe('GET');
  req.flush(mockUserTypes);
  });
});
