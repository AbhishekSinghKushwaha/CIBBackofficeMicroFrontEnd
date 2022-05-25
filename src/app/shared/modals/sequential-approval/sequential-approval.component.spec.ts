import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequentialApprovalComponent } from './sequential-approval.component';

describe('SequentialApprovalComponent', () => {
  let component: SequentialApprovalComponent;
  let fixture: ComponentFixture<SequentialApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SequentialApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SequentialApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
