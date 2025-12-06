import { TestBed } from '@angular/core/testing';

import { AccelerationFunctionsService } from './acceleration-functions.service';

describe('AccelerationFunctionsService', () => {
  let service: AccelerationFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccelerationFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
