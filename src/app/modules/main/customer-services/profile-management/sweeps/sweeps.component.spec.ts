import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SweepsComponent } from './sweeps.component';

describe('SweepsComponent', () => {
  let component: SweepsComponent;
  let fixture: ComponentFixture<SweepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SweepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SweepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
