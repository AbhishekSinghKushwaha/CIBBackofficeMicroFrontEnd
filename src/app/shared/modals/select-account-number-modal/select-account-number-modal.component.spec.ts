import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAccountNumberModalComponent } from './select-account-number-modal.component';

describe('SelectAccountNumberModalComponent', () => {
  let component: SelectAccountNumberModalComponent;
  let fixture: ComponentFixture<SelectAccountNumberModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAccountNumberModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAccountNumberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
