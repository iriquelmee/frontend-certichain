import { TestBed } from '@angular/core/testing';

import { UserSubTypeService } from './user-sub-type.service';

describe('UserSubTypeService', () => {
  let service: UserSubTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSubTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
