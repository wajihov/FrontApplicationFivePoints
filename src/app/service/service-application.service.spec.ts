import { TestBed } from '@angular/core/testing';

import { ServiceApplicationService } from './service-application.service';

describe('ServiceApplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceApplicationService = TestBed.get(ServiceApplicationService);
    expect(service).toBeTruthy();
  });
});
