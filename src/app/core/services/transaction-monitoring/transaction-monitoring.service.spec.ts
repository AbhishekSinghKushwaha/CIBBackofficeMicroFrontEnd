import { TestBed } from '@angular/core/testing';

import { TransactionMonitoringService } from './transaction-monitoring.service';

describe('TransactionMonitoringService', () => {
  let service: TransactionMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
