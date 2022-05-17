import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayConfigurationComponent } from './holiday-configuration.component';

describe('HolidayConfigurationComponent', () => {
  let component: HolidayConfigurationComponent;
  let fixture: ComponentFixture<HolidayConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
