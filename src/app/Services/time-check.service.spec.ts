import { TestBed } from '@angular/core/testing';

import { TimeCheckService } from './time-check.service';

describe('TimeCheckService', () => {
  let service: TimeCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
