import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { UserDataService } from './user-data.service';
import { TestingModule } from '../../../testing/test-module';

describe('UserDataService', () => {
  let service: UserDataService;
  let httpTestingController: HttpTestingController;

  // configura el entorno de pruebas con TestingModule que provee HttpClient
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [UserDataService]
    });

    service = TestBed.inject(UserDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  // verifica que no hayan solicitudes HTTP pendientes
  afterEach(() => {
    httpTestingController.verify();
  });
  
  // verifica que el servicio se instancie correctamente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user data by user ID', () => {
    const mockUserData = {
      id: '123',
      name: 'iriquelme',
      email: 'ieriquelme97@gmail.com'
    };
    
    const userId = '123';
    
    // consume servicio y obtiene respuesta
    service.getByUserID(userId).subscribe((userData: any) => {
      expect(userData).toBeTruthy();
      expect(userData.id).toBe(userId);
      expect(userData.name).toBe('iriquelme');
    });
    
    // intercepta la solicitud http y proporciona una respuesta mock
    const req = httpTestingController.expectOne(`http://certichainbff.ddns.net:8082/api/userdata/userid/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserData);
  });
});
