import { TestBed } from '@angular/core/testing';

import { DocumentAuditService } from './document-audit.service';

describe('DocumentAuditService', () => {
  let service: DocumentAuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentAuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
