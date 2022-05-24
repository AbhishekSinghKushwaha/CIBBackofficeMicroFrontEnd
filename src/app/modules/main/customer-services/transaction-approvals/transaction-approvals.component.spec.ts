import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionApprovalsComponent } from './transaction-approvals.component';

describe('TransactionApprovalsComponent', () => {
  let component: TransactionApprovalsComponent;
  let fixture: ComponentFixture<TransactionApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionApprovalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
