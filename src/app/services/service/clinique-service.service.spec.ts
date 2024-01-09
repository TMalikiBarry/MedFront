import { TestBed } from '@angular/core/testing';

import { CliniqueServiceService } from './clinique-service.service';

describe('CliniqueServiceService', () => {
  let service: CliniqueServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CliniqueServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
