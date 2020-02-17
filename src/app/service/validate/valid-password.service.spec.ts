import { TestBed } from '@angular/core/testing';

import { ValidPasswordService } from './valid-password.service';

describe('ValidPasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidPasswordService = TestBed.get(ValidPasswordService);
    expect(service).toBeTruthy();
  });
});
