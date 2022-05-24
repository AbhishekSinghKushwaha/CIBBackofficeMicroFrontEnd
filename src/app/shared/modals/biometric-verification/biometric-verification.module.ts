import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BiometricVerificationComponent } from './biometric-verification.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BiometricVerificationService } from 'src/app/core/services/biometric-verification/biometric-verification.service';

@NgModule({
  declarations: [
    BiometricVerificationComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BiometricVerificationComponent
  ],
  providers: [
    BiometricVerificationService
  ]
})
export class BiometricVerificationModule { }
