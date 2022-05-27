import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequentialApprovalDataComponent } from './sequential-approval-data.component';

describe('SequentialApprovalDataComponent', () => {
  let component: SequentialApprovalDataComponent;
  let fixture: ComponentFixture<SequentialApprovalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SequentialApprovalDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SequentialApprovalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
