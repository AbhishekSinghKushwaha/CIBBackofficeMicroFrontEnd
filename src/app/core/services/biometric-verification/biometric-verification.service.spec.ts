import { TestBed } from '@angular/core/testing';

import { BiometricVerificationService } from './biometric-verification.service';

describe('BiometricVerificationService', () => {
  let service: BiometricVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiometricVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
