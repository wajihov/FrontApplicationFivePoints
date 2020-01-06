import { TestBed } from '@angular/core/testing';

import { ServProfileService } from './serv-profile.service';

describe('ServProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServProfileService = TestBed.get(ServProfileService);
    expect(service).toBeTruthy();
  });
});
