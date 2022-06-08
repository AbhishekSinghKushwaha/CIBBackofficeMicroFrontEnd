import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTransactionConfigurationComponent } from './list-transaction-configuration.component';

describe('ListTransactionConfigurationComponent', () => {
  let component: ListTransactionConfigurationComponent;
  let fixture: ComponentFixture<ListTransactionConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTransactionConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTransactionConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
