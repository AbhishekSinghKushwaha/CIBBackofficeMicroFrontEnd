import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalLimitsComponent } from './global-limits.component';

describe('GlobalLimitsComponent', () => {
  let component: GlobalLimitsComponent;
  let fixture: ComponentFixture<GlobalLimitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalLimitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
