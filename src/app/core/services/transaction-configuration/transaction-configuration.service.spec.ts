import { TestBed } from '@angular/core/testing';

import { TransactionConfigurationService } from './transaction-configuration.service';

describe('TransactionConfigurationService', () => {
  let service: TransactionConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
