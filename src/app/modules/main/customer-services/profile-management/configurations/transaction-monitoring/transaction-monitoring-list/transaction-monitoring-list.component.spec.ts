import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionMonitoringListComponent } from './transaction-monitoring-list.component';

describe('TransactionMonitoringListComponent', () => {
  let component: TransactionMonitoringListComponent;
  let fixture: ComponentFixture<TransactionMonitoringListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionMonitoringListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionMonitoringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
