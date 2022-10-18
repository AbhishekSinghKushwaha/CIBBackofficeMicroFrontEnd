import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupSweepComponent } from './setup-sweep.component';

describe('SetupSweepComponent', () => {
  let component: SetupSweepComponent;
  let fixture: ComponentFixture<SetupSweepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupSweepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupSweepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
