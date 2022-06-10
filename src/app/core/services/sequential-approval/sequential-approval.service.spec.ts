import { TestBed } from '@angular/core/testing';

import { SequentialApprovalService } from './sequential-approval.service';

describe('SequentialApprovalService', () => {
  let service: SequentialApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SequentialApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
