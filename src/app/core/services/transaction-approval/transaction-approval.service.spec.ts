import { TestBed } from '@angular/core/testing';

import { TransactionApprovalService } from './transaction-approval.service';

describe('TransactionApprovalService', () => {
  let service: TransactionApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
