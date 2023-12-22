import { TestBed } from '@angular/core/testing';

import { GeneralHttpInterceptor } from './general-http.interceptor';

describe('GeneralHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GeneralHttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GeneralHttpInterceptor = TestBed.inject(GeneralHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
