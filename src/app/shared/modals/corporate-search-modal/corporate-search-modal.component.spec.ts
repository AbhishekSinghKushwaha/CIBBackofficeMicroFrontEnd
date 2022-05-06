import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateSearchModalComponent } from './corporate-search-modal.component';

describe('CorporateSearchModalComponent', () => {
  let component: CorporateSearchModalComponent;
  let fixture: ComponentFixture<CorporateSearchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateSearchModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateSearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
