import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { DocumentRequestService } from './document-request.service';
import { TestingModule } from '../../../testing/test-module';

describe('DocumentRequestService', () => {
  let service: DocumentRequestService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [DocumentRequestService]
    });
    service = TestBed.inject(DocumentRequestService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
