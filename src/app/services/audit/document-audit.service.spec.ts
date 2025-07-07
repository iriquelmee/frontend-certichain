import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { DocumentAuditService } from './document-audit.service';
import { TestingModule } from '../../../testing/test-module';

describe('DocumentAuditService', () => {
  let service: DocumentAuditService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [DocumentAuditService]
    });
    service = TestBed.inject(DocumentAuditService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
