import { TestBed } from '@angular/core/testing';

import { DhbService } from './dhb.service';

describe('DhbService', () => {
  let service: DhbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DhbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
