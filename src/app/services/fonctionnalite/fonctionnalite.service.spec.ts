import { TestBed } from '@angular/core/testing';

import { FonctionnaliteService } from './fonctionnalite.service';

describe('FonctionnaliteService', () => {
  let service: FonctionnaliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FonctionnaliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
