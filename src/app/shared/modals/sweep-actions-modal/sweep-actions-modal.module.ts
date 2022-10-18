import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SweepActionsModalComponent } from './sweep-actions-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { BiometricVerificationModule } from 'src/app/shared/modals/biometric-verification/biometric-verification.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SweepActionsModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    BiometricVerificationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SweepActionsModalModule { }
