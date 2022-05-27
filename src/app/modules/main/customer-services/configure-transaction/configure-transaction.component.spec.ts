import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureTransactionComponent } from './configure-transaction.component';

describe('ConfigureTransactionComponent', () => {
  let component: ConfigureTransactionComponent;
  let fixture: ComponentFixture<ConfigureTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
