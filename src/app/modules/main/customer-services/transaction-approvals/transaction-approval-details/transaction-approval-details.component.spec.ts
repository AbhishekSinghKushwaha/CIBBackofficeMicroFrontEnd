import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionApprovalDetailsComponent } from './transaction-approval-details.component';

describe('TransactionApprovalDetailsComponent', () => {
  let component: TransactionApprovalDetailsComponent;
  let fixture: ComponentFixture<TransactionApprovalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionApprovalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionApprovalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
