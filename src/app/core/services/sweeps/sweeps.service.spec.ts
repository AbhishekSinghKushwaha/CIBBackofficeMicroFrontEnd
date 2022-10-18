import { TestBed } from '@angular/core/testing';

import { SweepsService } from './sweeps.service';

describe('SweepsService', () => {
  let service: SweepsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SweepsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
