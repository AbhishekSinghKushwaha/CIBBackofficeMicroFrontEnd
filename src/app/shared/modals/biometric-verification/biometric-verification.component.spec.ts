import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiometricVerificationComponent } from './biometric-verification.component';

describe('BiometricVerificationComponent', () => {
  let component: BiometricVerificationComponent;
  let fixture: ComponentFixture<BiometricVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiometricVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiometricVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
