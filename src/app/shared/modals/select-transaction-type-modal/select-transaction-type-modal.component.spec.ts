import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTransactionTypeModalComponent } from './select-transaction-type-modal.component';

describe('SelectTransactionTypeModalComponent', () => {
  let component: SelectTransactionTypeModalComponent;
  let fixture: ComponentFixture<SelectTransactionTypeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTransactionTypeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTransactionTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
