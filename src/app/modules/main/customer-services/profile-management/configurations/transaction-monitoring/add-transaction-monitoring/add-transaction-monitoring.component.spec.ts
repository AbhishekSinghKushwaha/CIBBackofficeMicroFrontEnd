import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionMonitoringComponent } from './add-transaction-monitoring.component';

describe('AddTransactionMonitoringComponent', () => {
  let component: AddTransactionMonitoringComponent;
  let fixture: ComponentFixture<AddTransactionMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTransactionMonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransactionMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
