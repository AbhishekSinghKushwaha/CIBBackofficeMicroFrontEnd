import { TestBed } from '@angular/core/testing';

import { HolidayConfigurationService } from './holiday-configuration.service';

describe('HolidayConfigurationService', () => {
  let service: HolidayConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HolidayConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
