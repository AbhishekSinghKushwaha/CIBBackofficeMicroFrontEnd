import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionMonitoringAmountModalComponent } from './transaction-monitoring-amount-modal.component';

describe('TransactionMonitoringAmountModalComponent', () => {
  let component: TransactionMonitoringAmountModalComponent;
  let fixture: ComponentFixture<TransactionMonitoringAmountModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionMonitoringAmountModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionMonitoringAmountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
