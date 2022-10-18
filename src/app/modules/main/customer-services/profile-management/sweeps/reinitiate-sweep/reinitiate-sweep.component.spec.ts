import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinitiateSweepComponent } from './reinitiate-sweep.component';

describe('ReinitiateSweepComponent', () => {
  let component: ReinitiateSweepComponent;
  let fixture: ComponentFixture<ReinitiateSweepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReinitiateSweepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReinitiateSweepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
