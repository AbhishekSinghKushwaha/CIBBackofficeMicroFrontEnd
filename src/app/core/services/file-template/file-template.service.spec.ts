import { TestBed } from '@angular/core/testing';

import { FileTemplateService } from './file-template.service';

describe('FileTemplateService', () => {
  let service: FileTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
