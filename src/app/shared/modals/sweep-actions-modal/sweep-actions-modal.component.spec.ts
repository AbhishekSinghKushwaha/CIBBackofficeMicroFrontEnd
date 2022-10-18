import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SweepActionsModalComponent } from './sweep-actions-modal.component';

describe('SweepActionsModalComponent', () => {
  let component: SweepActionsModalComponent;
  let fixture: ComponentFixture<SweepActionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SweepActionsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SweepActionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
