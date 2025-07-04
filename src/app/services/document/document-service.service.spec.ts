import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { DocumentServiceService } from './document-service.service';
import { TestingModule } from '../../../testing/test-module';

describe('DocumentServiceService', () => {
  let service: DocumentServiceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [DocumentServiceService]
    });
    
    service = TestBed.inject(DocumentServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
