import { TestBed } from '@angular/core/testing';

import { CorporateSearchService } from './corporate-search.service';

describe('CorporateSearchService', () => {
  let service: CorporateSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
